<template>
  <div class="controls">
    <div class="control-buttons">
      <button 
        @click="generateSchedule" 
        :disabled="!canGenerateSchedule"
        class="btn btn-primary"
        data-testid="generate-schedule-btn"
      >
        Generate Race Schedule
      </button>
      
      <button 
        @click="startRace" 
        :disabled="!canStartRace"
        class="btn btn-success"
        data-testid="start-race-btn"
      >
        Start Race
      </button>
      

      
      <button 
        @click="resetGame" 
        class="btn btn-secondary"
      >
        Reset Game
      </button>
      
      <button 
        @click="showGameRules" 
        class="btn btn-info"
      >
        📖 Game Rules
      </button>
    </div>
    
    <div class="game-status">
      <div class="status-item">
        <span class="status-label">Horses Generated:</span>
        <span class="status-value" :class="{ active: horsesGenerated }">
          {{ horsesGenerated ? '✅' : '❌' }}
        </span>
      </div>
      
      <div class="status-item">
        <span class="status-label">Schedule Generated:</span>
        <span class="status-value" :class="{ active: scheduleGenerated }">
          {{ scheduleGenerated ? '✅' : '❌' }}
        </span>
      </div>
      
      <div class="status-item">
        <span class="status-label">Game Status:</span>
        <span class="status-value" :class="{ active: isRacing }">
          {{ gameStatus }}
        </span>
      </div>
      
      <div v-if="currentRound > 0" class="status-item">
        <span class="status-label">Current Round:</span>
        <span class="status-value active">{{ currentRound }}/6</span>
      </div>
    </div>
    
    <!-- Game Rules Dialog -->
    <GameRulesDialog 
      :is-open="showGameRulesDialog"
      @close="closeGameRules"
    />
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import GameRulesDialog from './GameRulesDialog.vue'

export default {
  name: 'Controls',
  components: {
    GameRulesDialog
  },
  setup() {
    const store = useStore()
    
    const horsesGenerated = computed(() => store.getters['game/horsesGenerated'])
    const scheduleGenerated = computed(() => store.getters['game/scheduleGenerated'])
    const canGenerateSchedule = computed(() => store.getters['game/canGenerateSchedule'])
    const canStartRace = computed(() => store.getters['game/canStartRace'])
    const isRacing = computed(() => store.getters['race/isRacing'])
    const currentRound = computed(() => store.getters['race/currentRound'])
    const horses = computed(() => store.getters['horses/allHorses'] || [])
    const raceResults = computed(() => store.getters['race/raceResults'] || [])
    
    const gameStatus = computed(() => {
      if (isRacing.value) return '🏁 Racing'
      if (scheduleGenerated.value) return '⏸️ Ready to Start'
      if (horsesGenerated.value) return '📋 Ready to Generate Schedule'
      return '🔄 Initializing'
    })
    
    const generateSchedule = () => {
      store.dispatch('game/generateSchedule')
    }
    
    const startRace = () => {
      store.dispatch('game/startGame')
    }
    
    const resetGame = () => {
      store.dispatch('game/resetGame')
    }
    

    
    // Dialog states
    const showGameRulesDialog = ref(false)
    

    
    const showGameRules = () => {
      showGameRulesDialog.value = true
    }
    
    const closeGameRules = () => {
      showGameRulesDialog.value = false
    }
    
    return {
      horsesGenerated,
      scheduleGenerated,
      canGenerateSchedule,
      canStartRace,
      isRacing,
      currentRound,
      horses,
      raceResults,
      gameStatus,
      generateSchedule,
      startRace,
      resetGame,

      showGameRules,
      showGameRulesDialog,
      closeGameRules
    }
  }
}
</script>

<style scoped>
.controls {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.control-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.btn-success {
  background: linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%);
  color: white;
}

.btn-success:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(86, 171, 47, 0.4);
}

.btn-secondary {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(240, 147, 251, 0.4);
}

.btn-warning {
  background: linear-gradient(135deg, #ffc107 0%, #fd7e14 100%);
  color: white;
}

.btn-warning:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(255, 193, 7, 0.4);
}

.btn-info {
  background: linear-gradient(135deg, #17a2b8 0%, #6f42c1 100%);
  color: white;
}

.btn-info:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(23, 162, 184, 0.4);
}



.game-status {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.status-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

.status-label {
  font-weight: 600;
  color: #333;
}

.status-value {
  font-weight: bold;
  color: #666;
}

.status-value.active {
  color: #28a745;
}

@media (max-width: 768px) {
  .control-buttons {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
  }
  
  .game-status {
    grid-template-columns: 1fr;
  }
}
</style> 