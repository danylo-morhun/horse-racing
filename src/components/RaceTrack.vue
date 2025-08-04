<template>
  <div class="race-track">
    <div class="race-header">
      <h2>🏁 Race Track</h2>
      <div v-if="currentRace" class="race-info">
        <span class="round-info">Round {{ currentRace.round }}/6</span>
        <span class="distance-info">{{ currentRace.distance }}m</span>
      </div>
    </div>
    
    <div v-if="!scheduleGenerated" class="empty-state">
      <div class="empty-icon">🐎</div>
      <h3>No Race Scheduled</h3>
      <p>Generate a race schedule to start racing!</p>
    </div>
    
    <div v-else-if="!isRacing && currentRound === 0" class="ready-state">
      <div class="ready-icon">🏁</div>
      <h3>Ready to Race!</h3>
      <p>Click "Start Race" to begin the competition</p>
    </div>
    
    <div v-else-if="isRacing && currentRace" class="active-race" data-testid="race-in-progress">
      <div class="race-controls">
        <button @click="skipCurrentRound" class="action-btn skip-btn">
          <span class="btn-icon">⏭️</span>
          <span class="btn-text">Skip Round</span>
        </button>
        <button @click="skipToEnd" class="action-btn skip-end-btn">
          <span class="btn-icon">🏁</span>
          <span class="btn-text">Skip to End</span>
        </button>
      </div>
      
      <div class="track-container">
        <div class="finish-line"></div>
        
        <div 
          v-for="(horse, index) in currentRace.horses" 
          :key="horse.id"
          class="horse-lane"
        >
          <div class="lane-number">{{ index + 1 }}</div>
          
          <div class="horse-runner">
            <div 
              class="horse-sprite"
              :style="{ 
                backgroundColor: horse.color,
                left: `${Math.min(horse.position / currentRace.distance * 100, 100)}%`
              }"
            >
              🐎
            </div>
            
            <div class="horse-info">
              <span class="horse-name">{{ horse.name }}</span>
              <span class="horse-position">{{ Math.round(horse.position) }}m</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="race-progress">
        <div class="progress-bar">
          <div 
            class="progress-fill"
            :style="{ width: `${(currentRound / 6) * 100}%` }"
          ></div>
        </div>
        <span class="progress-text">Race {{ currentRound }}/6</span>
      </div>
    </div>
    
    <div v-else-if="isGameComplete" class="game-complete" data-testid="race-complete">
      <div class="complete-icon">🎉</div>
      <h3>Game Complete!</h3>
      <p>All 6 rounds have been completed</p>
      <div class="game-complete-buttons">
        <button @click="showCompleteResults" class="results-btn">📊 See Complete Results</button>
        <button @click="resetGame" class="reset-btn">Play Again</button>
      </div>
    </div>
    
    <!-- Race Results Dialog -->
    <RaceResultsDialog 
      :is-open="showResultsDialog"
      :race-results="raceResults"
      @close="closeResultsDialog"
    />
    

  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import RaceResultsDialog from './RaceResultsDialog.vue'

export default {
  name: 'RaceTrack',
  components: {
    RaceResultsDialog
  },
  setup() {
    const store = useStore()
    
    const scheduleGenerated = computed(() => store.getters['game/scheduleGenerated'])
    const isRacing = computed(() => store.getters['race/isRacing'])
    const currentRound = computed(() => store.getters['race/currentRound'])
    const currentRace = computed(() => store.getters['race/currentRace'])
    const isGameComplete = computed(() => store.getters['race/isGameComplete'])
    const raceResults = computed(() => store.getters['race/raceResults'] || [])
    
    const showResultsDialog = ref(false)
    
    const skipCurrentRound = () => {
      store.dispatch('race/skipCurrentRound')
    }
    
    const skipToEnd = () => {
      store.dispatch('race/skipToEnd')
    }
    
    const resetGame = () => {
      store.dispatch('game/resetGame')
    }
    
    const showCompleteResults = () => {
      showResultsDialog.value = true
    }
    
    const closeResultsDialog = () => {
      showResultsDialog.value = false
    }
    
    return {
      scheduleGenerated,
      isRacing,
      currentRound,
      currentRace,
      isGameComplete,
      raceResults,
      showResultsDialog,
      skipCurrentRound,
      skipToEnd,
      resetGame,
      showCompleteResults,
      closeResultsDialog
    }
  }
}
</script>

<style scoped>
.race-track {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.race-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e9ecef;
}

.race-header h2 {
  margin: 0;
  color: #333;
  font-size: 1.5rem;
}

.race-info {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.round-info,
.distance-info {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
}

.empty-state,
.ready-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #666;
}

.empty-icon,
.ready-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-state h3,
.ready-state h3 {
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1.5rem;
}

.empty-state p,
.ready-state p {
  margin: 0;
  font-size: 1rem;
}

.active-race {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.race-controls {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.2);
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
}

.skip-btn {
  background: linear-gradient(135deg, #ffc107 0%, #fd7e14 100%);
  box-shadow: 0 2px 8px rgba(255, 193, 7, 0.2);
}

.skip-btn:hover {
  box-shadow: 0 4px 16px rgba(255, 193, 7, 0.3);
}

.skip-end-btn {
  background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
  box-shadow: 0 2px 8px rgba(220, 53, 69, 0.2);
}

.skip-end-btn:hover {
  box-shadow: 0 4px 16px rgba(220, 53, 69, 0.3);
}

.btn-icon {
  font-size: 1.1rem;
}

.btn-text {
  font-weight: 600;
}

.track-container {
  flex: 1;
  position: relative;
  background: linear-gradient(90deg, #8FBC8F 0%, #90EE90 100%);
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
  overflow: hidden;
}

.finish-line {
  position: absolute;
  right: 20px;
  top: 0;
  bottom: 0;
  width: 4px;
  background: repeating-linear-gradient(
    0deg,
    #fff 0px,
    #fff 10px,
    #000 10px,
    #000 20px
  );
  z-index: 10;
}

.horse-lane {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  position: relative;
  height: 40px;
}

.lane-number {
  width: 30px;
  height: 30px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.8rem;
  margin-right: 1rem;
  z-index: 5;
}

.horse-runner {
  flex: 1;
  position: relative;
  height: 100%;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  overflow: hidden;
}

.horse-sprite {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  transition: left 0.1s ease;
  z-index: 5;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.horse-info {
  position: absolute;
  left: 50px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  z-index: 5;
}

.horse-name {
  font-weight: 600;
  color: #333;
  font-size: 0.8rem;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
}

.horse-position {
  font-size: 0.7rem;
  color: #666;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
}

.race-progress {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}

.progress-bar {
  flex: 1;
  height: 10px;
  background: #e9ecef;
  border-radius: 5px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #28a745, #20c997);
  transition: width 0.3s ease;
}

.progress-text {
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
  min-width: 80px;
}

.game-complete {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: white;
  border-radius: 12px;
  margin: 1rem 0;
}

.complete-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.game-complete h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.8rem;
}

.game-complete p {
  margin: 0 0 1.5rem 0;
  font-size: 1.1rem;
}

.game-complete-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.results-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid white;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.results-btn:hover {
  background: white;
  color: #667eea;
}

.reset-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid white;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.reset-btn:hover {
  background: white;
  color: #28a745;
}

@media (max-width: 768px) {
  .race-header {
    flex-direction: column;
    gap: 0.75rem;
    align-items: flex-start;
  }
  
  .race-info {
    gap: 0.5rem;
  }
  
  .round-info,
  .distance-info {
    padding: 0.375rem 0.75rem;
    font-size: 0.8rem;
  }
  
  .empty-icon,
  .ready-icon,
  .waiting-icon {
    font-size: 3rem;
  }
  
  .empty-state h3,
  .ready-state h3,
  .waiting-state h3 {
    font-size: 1.3rem;
  }
  
  .empty-state p,
  .ready-state p,
  .waiting-state p {
    font-size: 0.9rem;
  }
  
  .race-controls {
    gap: 0.5rem;
  }
  
  .action-btn {
    padding: 0.625rem 1rem;
    font-size: 0.85rem;
  }
  
  .track-container {
    padding: 0.75rem;
  }
  
  .horse-lane {
    margin-bottom: 0.75rem;
    height: 35px;
  }
  
  .lane-number {
    width: 25px;
    height: 25px;
    font-size: 0.7rem;
    margin-right: 0.75rem;
  }
  
  .horse-sprite {
    width: 35px;
    height: 35px;
    font-size: 1.3rem;
  }
  
  .horse-info {
    left: 40px;
  }
  
  .horse-name {
    font-size: 0.75rem;
  }
  
  .horse-position {
    font-size: 0.65rem;
  }
  
  .race-progress {
    padding: 0.75rem;
    gap: 0.75rem;
  }
  
  .progress-text {
    font-size: 0.8rem;
    min-width: 70px;
  }
  
  .game-complete {
    padding: 1.5rem;
  }
  
  .complete-icon {
    font-size: 3rem;
  }
  
  .game-complete h3 {
    font-size: 1.5rem;
  }
  
  .game-complete p {
    font-size: 1rem;
  }
  
  .game-complete-buttons {
    gap: 0.75rem;
  }
  
  .results-btn,
  .reset-btn {
    padding: 0.625rem 1.25rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .race-header h2 {
    font-size: 1.3rem;
  }
  
  .round-info,
  .distance-info {
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
  }
  
  .empty-icon,
  .ready-icon,
  .waiting-icon {
    font-size: 2.5rem;
  }
  
  .empty-state h3,
  .ready-state h3,
  .waiting-state h3 {
    font-size: 1.1rem;
  }
  
  .empty-state p,
  .ready-state p,
  .waiting-state p {
    font-size: 0.8rem;
  }
  
  .action-btn {
    padding: 0.5rem 0.875rem;
    font-size: 0.8rem;
  }
  
  .track-container {
    padding: 0.5rem;
  }
  
  .horse-lane {
    margin-bottom: 0.5rem;
    height: 30px;
  }
  
  .lane-number {
    width: 22px;
    height: 22px;
    font-size: 0.65rem;
    margin-right: 0.5rem;
  }
  
  .horse-sprite {
    width: 30px;
    height: 30px;
    font-size: 1.1rem;
  }
  
  .horse-info {
    left: 35px;
  }
  
  .horse-name {
    font-size: 0.7rem;
  }
  
  .horse-position {
    font-size: 0.6rem;
  }
  
  .race-progress {
    padding: 0.5rem;
    gap: 0.5rem;
  }
  
  .progress-text {
    font-size: 0.75rem;
    min-width: 60px;
  }
  
  .game-complete {
    padding: 1rem;
  }
  
  .complete-icon {
    font-size: 2.5rem;
  }
  
  .game-complete h3 {
    font-size: 1.3rem;
  }
  
  .game-complete p {
    font-size: 0.9rem;
  }
  
  .game-complete-buttons {
    gap: 0.5rem;
    flex-direction: column;
  }
  
  .results-btn,
  .reset-btn {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }
}
</style> 