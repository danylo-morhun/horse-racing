const state = {
  horses: [],
  horseNames: [
    'Thunder Bolt', 'Silver Arrow', 'Golden Star', 'Midnight Run', 'Fire Storm',
    'Ocean Wave', 'Mountain Peak', 'Desert Wind', 'Forest Shadow', 'River Flow',
    'Lightning Flash', 'Storm Cloud', 'Sun Ray', 'Moon Beam', 'Star Light',
    'Wind Rider', 'Earth Shaker', 'Sky Dancer', 'Sea Spirit', 'Flame Runner'
  ]
}

const mutations = {
  SET_HORSES(state, horses) {
    state.horses = horses
  },
  UPDATE_HORSE_CONDITION(state, { horseId, condition }) {
    const horse = state.horses.find(h => h.id === horseId)
    if (horse) {
      horse.condition = condition
    }
  },
  UPDATE_HORSE_RACING_STATUS(state, { horseIds, isRacing }) {
    state.horses.forEach(horse => {
      if (horseIds.includes(horse.id)) {
        horse.isRacing = isRacing
      }
    })
  }
}

const actions = {
  generateHorses({ commit, state }) {
    const horses = []
    const colors = [
      '#8B4513', '#A0522D', '#CD853F', '#D2691E', '#B8860B',
      '#DAA520', '#F4A460', '#DEB887', '#F5DEB3', '#FFE4B5',
      '#8B7355', '#A0522D', '#CD853F', '#D2691E', '#B8860B',
      '#DAA520', '#F4A460', '#DEB887', '#F5DEB3', '#FFE4B5'
    ]

    for (let i = 0; i < 20; i++) {
      horses.push({
        id: i + 1,
        name: state.horseNames[i],
        color: colors[i],
        condition: Math.floor(Math.random() * 100) + 1,
        position: 0,
        isRacing: false
      })
    }

    commit('SET_HORSES', horses)
  },

  updateHorseCondition({ commit }, { horseId, condition }) {
    commit('UPDATE_HORSE_CONDITION', { horseId, condition })
  },
  
  updateHorseRacingStatus({ commit }, { horseIds, isRacing }) {
    commit('UPDATE_HORSE_RACING_STATUS', { horseIds, isRacing })
  }
}

const getters = {
  allHorses: state => state.horses,
  getHorseById: state => id => state.horses.find(h => h.id === id),
  availableHorses: state => state.horses.filter(h => !h.isRacing)
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
} 