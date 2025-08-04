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

  startRace({ commit, state, dispatch }) {
    commit('SET_RACING_STATE', true)
    commit('SET_CURRENT_ROUND', 1)
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
    
    // Wait 2 seconds before next round
    setTimeout(() => {
      commit('SET_CURRENT_ROUND', state.currentRound + 1)
      dispatch('runCurrentRound')
    }, 2000)
  },

  async simulateRace({ commit }, race) {
    return new Promise((resolve) => {
      const horses = [...race.horses]
      const raceDuration = 5000 // 5 seconds
      const updateInterval = 100 // Update every 100ms
      const updates = raceDuration / updateInterval
      
      let currentUpdate = 0
      
      const interval = setInterval(() => {
        // Update horse positions based on condition and randomness
        horses.forEach(horse => {
          const speed = (horse.condition / 100) * (0.5 + Math.random() * 0.5)
          horse.position += speed * (race.distance / updates)
        })
        
        currentUpdate++
        
        if (currentUpdate >= updates) {
          clearInterval(interval)
          
          // Sort horses by final position
          const sortedHorses = horses.sort((a, b) => b.position - a.position)
          
          resolve({
            round: race.round,
            distance: race.distance,
            horses: sortedHorses,
            winner: sortedHorses[0]
          })
        }
      }, updateInterval)
    })
  },

  resetRace({ commit }) {
    commit('RESET_RACE_STATE')
  }
}

const getters = {
  raceSchedule: state => state.raceSchedule,
  currentRound: state => state.currentRound,
  isRacing: state => state.isRacing,
  raceResults: state => state.raceResults,
  currentRace: state => state.raceSchedule[state.currentRound - 1] || null,
  isGameComplete: state => state.currentRound > 6 && !state.isRacing
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
} 