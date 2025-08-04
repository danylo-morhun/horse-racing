const state = {
  gameStarted: false,
  horsesGenerated: false,
  scheduleGenerated: false
}

const mutations = {
  SET_GAME_STARTED(state, started) {
    state.gameStarted = started
  },
  SET_HORSES_GENERATED(state, generated) {
    state.horsesGenerated = generated
  },
  SET_SCHEDULE_GENERATED(state, generated) {
    state.scheduleGenerated = generated
  },
  RESET_GAME_STATE(state) {
    state.gameStarted = false
    state.horsesGenerated = false
    state.scheduleGenerated = false
  }
}

const actions = {
  initializeGame({ commit, dispatch }) {
    commit('RESET_GAME_STATE')
    dispatch('horses/generateHorses', null, { root: true })
    commit('SET_HORSES_GENERATED', true)
  },

  generateSchedule({ commit, dispatch }) {
    dispatch('race/generateRaceSchedule', null, { root: true })
    commit('SET_SCHEDULE_GENERATED', true)
  },

  startGame({ commit, dispatch }) {
    commit('SET_GAME_STARTED', true)
    dispatch('race/startRace', null, { root: true })
  },

  resetGame({ commit, dispatch }) {
    commit('RESET_GAME_STATE')
    dispatch('race/resetRace', null, { root: true })
    // Re-initialize the game to regenerate horses
    dispatch('initializeGame')
  }
}

const getters = {
  gameStarted: state => state.gameStarted,
  horsesGenerated: state => state.horsesGenerated,
  scheduleGenerated: state => state.scheduleGenerated,
  canGenerateSchedule: state => state.horsesGenerated && !state.gameStarted,
  canStartRace: state => state.scheduleGenerated && !state.gameStarted
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
} 