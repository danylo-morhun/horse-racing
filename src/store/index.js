import { createStore } from 'vuex'
import horses from './modules/horses'
import race from './modules/race'
import game from './modules/game'

export default createStore({
  modules: {
    horses,
    race,
    game
  }
}) 