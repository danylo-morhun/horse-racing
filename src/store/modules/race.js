import { selectRandomHorses } from '../../utils/raceLogic'

const state = {
  raceSchedule: [],
  currentRound: 0,
  isRacing: false,
  raceResults: [],
  distances: [1200, 1400, 1600, 1800, 2000, 2200]
}

const mutations = {
  SET_RACE_SCHEDULE(state, schedule) {
    state.raceSchedule = schedule
  },
  SET_CURRENT_ROUND(state, round) {
    state.currentRound = round
  },
  SET_RACING_STATE(state, isRacing) {
    state.isRacing = isRacing
  },
  ADD_RACE_RESULT(state, result) {
    state.raceResults.push(result)
  },
  RESET_RACE_STATE(state) {
    state.currentRound = 0
    state.isRacing = false
    state.raceResults = []
  }
}

const actions = {
  generateRaceSchedule({ commit, rootGetters, state }) {
    const schedule = []
    const horses = rootGetters['horses/allHorses']
    
    for (let round = 1; round <= 6; round++) {
      const selectedHorses = selectRandomHorses(horses, 10)
      schedule.push({
        round,
        distance: state.distances[round - 1],
        horses: selectedHorses.map(horse => ({
          ...horse,
          position: 0,
          isRacing: false
        }))
      })
    }
    
    commit('SET_RACE_SCHEDULE', schedule)
  },

  startRace({ commit, state, dispatch, rootGetters }) {
    commit('SET_RACING_STATE', true)
    commit('SET_CURRENT_ROUND', 1)
    
    // Update racing status for horses in the first race
    const currentRace = state.raceSchedule[0]
    if (currentRace) {
      const horseIds = currentRace.horses.map(horse => horse.id)
      dispatch('horses/updateHorseRacingStatus', { horseIds, isRacing: true }, { root: true })
    }
    
    dispatch('runCurrentRound')
  },

  async runCurrentRound({ commit, state, dispatch, rootGetters }) {
    if (state.currentRound > 6) {
      commit('SET_RACING_STATE', false)
      return
    }

    const currentRace = state.raceSchedule[state.currentRound - 1]
    const result = await dispatch('simulateRace', currentRace)
    
    commit('ADD_RACE_RESULT', result)
    
    // Check if this was the final round
    if (state.currentRound === 6) {
      commit('SET_RACING_STATE', false)
      // Reset racing status for all horses when game is complete
      dispatch('horses/updateHorseRacingStatus', { horseIds: [], isRacing: false }, { root: true })
      return
    }
    
    // Wait 2 seconds before next round
    setTimeout(() => {
      // Update racing status for horses in the next race
      const nextRace = state.raceSchedule[state.currentRound]
      if (nextRace) {
        const horseIds = nextRace.horses.map(horse => horse.id)
        dispatch('horses/updateHorseRacingStatus', { horseIds, isRacing: true }, { root: true })
      }
      
      commit('SET_CURRENT_ROUND', state.currentRound + 1)
      dispatch('runCurrentRound')
    }, 2000)
  },

  async simulateRace({ commit }, race) {
    return new Promise((resolve) => {
      const horses = [...race.horses]
      const updateInterval = 100 // Update every 100ms
      const maxDuration = 30000 // Maximum 30 seconds to prevent infinite loops
      
      let raceTime = 0
      let finishedHorses = []
      
      const interval = setInterval(() => {
        raceTime += updateInterval
        
        // Update horse positions based on condition and randomness
        horses.forEach(horse => {
          if (!horse.finished) {
            // Calculate speed based on condition (1-100) and randomness
            const baseSpeed = horse.condition / 100 // 0.01 to 1.0
            const randomFactor = 0.5 + Math.random() * 0.5 // 0.5 to 1.0
            const speed = baseSpeed * randomFactor * 20 // Scale up for reasonable movement
            
            horse.position += speed
            
            // Check if horse has finished
            if (horse.position >= race.distance) {
              horse.position = race.distance
              horse.finished = true
              horse.finishTime = raceTime
              finishedHorses.push(horse)
            }
          }
        })
        
        // Check if all horses have finished or max time reached
        if (finishedHorses.length === horses.length || raceTime >= maxDuration) {
          clearInterval(interval)
          
          // Mark remaining horses as finished at current position
          horses.forEach(horse => {
            if (!horse.finished) {
              horse.finished = true
              horse.finishTime = raceTime
              finishedHorses.push(horse)
            }
          })
          
          // Sort horses by finish time (faster first), then by position
          const sortedHorses = horses.sort((a, b) => {
            if (a.finished && b.finished) {
              return a.finishTime - b.finishTime
            }
            return b.position - a.position
          })
          
          resolve({
            round: race.round,
            distance: race.distance,
            horses: sortedHorses,
            winner: sortedHorses[0],
            raceTime: raceTime
          })
        }
      }, updateInterval)
    })
  },

  resetRace({ commit, dispatch }) {
    commit('RESET_RACE_STATE')
    // Reset racing status for all horses
    dispatch('horses/updateHorseRacingStatus', { horseIds: [], isRacing: false }, { root: true })
  },

  skipCurrentRound({ commit, state, dispatch }) {
    if (state.currentRound > 0 && state.currentRound <= 6) {
      const currentRace = state.raceSchedule[state.currentRound - 1]
      if (currentRace) {
        // Create a quick result without waiting for simulation
        const horses = [...currentRace.horses]
        
        // Simulate final positions quickly
        horses.forEach(horse => {
          const speed = (horse.condition / 100) * (0.5 + Math.random() * 0.5)
          horse.position = currentRace.distance * speed
          horse.finished = true
          horse.finishTime = Math.random() * 10000 + 5000 // Random finish time
        })
        
        // Sort by position (highest first)
        const sortedHorses = horses.sort((a, b) => b.position - a.position)
        
        const result = {
          round: currentRace.round,
          distance: currentRace.distance,
          horses: sortedHorses,
          winner: sortedHorses[0],
          raceTime: 5000
        }
        
        commit('ADD_RACE_RESULT', result)
        
        // Move to next round immediately and start it
        if (state.currentRound < 6) {
          // Update racing status for horses in the next race
          const nextRace = state.raceSchedule[state.currentRound]
          if (nextRace) {
            const horseIds = nextRace.horses.map(horse => horse.id)
            dispatch('horses/updateHorseRacingStatus', { horseIds, isRacing: true }, { root: true })
          }
          
          commit('SET_CURRENT_ROUND', state.currentRound + 1)
          // Start the next round immediately
          dispatch('runCurrentRound')
        } else {
          commit('SET_RACING_STATE', false)
          // Reset racing status for all horses when game is complete
          dispatch('horses/updateHorseRacingStatus', { horseIds: [], isRacing: false }, { root: true })
        }
      }
    }
  },

  skipToEnd({ commit, state, dispatch }) {
    // Complete all remaining rounds immediately
    for (let round = state.currentRound; round <= 6; round++) {
      const currentRace = state.raceSchedule[round - 1]
      if (currentRace) {
        // Create a quick result without waiting for simulation
        const horses = [...currentRace.horses]
        
        // Simulate final positions quickly
        horses.forEach(horse => {
          const speed = (horse.condition / 100) * (0.5 + Math.random() * 0.5)
          horse.position = currentRace.distance * speed
          horse.finished = true
          horse.finishTime = Math.random() * 10000 + 5000 // Random finish time
        })
        
        // Sort by position (highest first)
        const sortedHorses = horses.sort((a, b) => b.position - a.position)
        
        const result = {
          round: currentRace.round,
          distance: currentRace.distance,
          horses: sortedHorses,
          winner: sortedHorses[0],
          raceTime: 5000
        }
        
        commit('ADD_RACE_RESULT', result)
      }
    }
    
    // Set to final state
    commit('SET_CURRENT_ROUND', 6)
    commit('SET_RACING_STATE', false)
    // Reset racing status for all horses when game is complete
    dispatch('horses/updateHorseRacingStatus', { horseIds: [], isRacing: false }, { root: true })
  }
}

const getters = {
  raceSchedule: state => state.raceSchedule,
  currentRound: state => state.currentRound,
  isRacing: state => state.isRacing,
  raceResults: state => state.raceResults,
  currentRace: state => state.raceSchedule[state.currentRound - 1] || null,
  isGameComplete: state => state.raceResults.length === 6 && !state.isRacing
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
} 