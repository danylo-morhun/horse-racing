<template>
  <div class="results">
    <h2>🏆 Race Results</h2>
    
    <div v-if="raceResults.length === 0" class="no-results">
      <div class="no-results-icon">📊</div>
      <h3>No Results Yet</h3>
      <p>Race results will appear here after each round</p>
    </div>
    
    <div v-else class="results-container">
      <div 
        v-for="result in raceResults" 
        :key="result.round"
        class="result-card"
        data-testid="result-card"
      >
        <div class="result-header">
          <h3>Round {{ result.round }}</h3>
          <span class="distance">{{ result.distance }}m</span>
        </div>
        
        <div class="winner-section">
          <div class="winner-badge">
            <div 
              class="winner-color"
              :style="{ backgroundColor: result.winner.color }"
            ></div>
            <span class="winner-name">{{ result.winner.name }}</span>
            <span class="winner-medal">🥇</span>
          </div>
        </div>
        
        <div class="podium">
          <div 
            v-for="(horse, index) in result.horses.slice(0, 3)" 
            :key="horse.id"
            class="podium-place"
            :class="`place-${index + 1}`"
          >
            <div class="place-number">{{ index + 1 }}</div>
            <div 
              class="horse-color"
              :style="{ backgroundColor: horse.color }"
            ></div>
            <div class="horse-details">
              <span class="horse-name">{{ horse.name }}</span>
              <span class="final-position">{{ Math.round(horse.position) }}m ({{ horse.finishTime ? Math.round(horse.finishTime / 1000) + 's' : 'DNF' }})</span>
            </div>
            <div class="medal">
              {{ index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉' }}
            </div>
          </div>
        </div>
        
        <div class="full-results">
          <h4>Full Results</h4>
          <div class="results-list">
            <div 
              v-for="(horse, index) in result.horses" 
              :key="horse.id"
              class="result-item"
            >
              <span class="position">{{ index + 1 }}</span>
              <div 
                class="horse-color"
                :style="{ backgroundColor: horse.color }"
              ></div>
              <span class="horse-name">{{ horse.name }}</span>
              <span class="final-position">{{ Math.round(horse.position) }}m ({{ horse.finishTime ? Math.round(horse.finishTime / 1000) + 's' : 'DNF' }})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div v-if="isGameComplete" class="game-complete" data-testid="race-complete">
      <div class="complete-icon">🎉</div>
      <h3>Game Complete!</h3>
      <p>All 6 rounds have been completed</p>
      <button @click="resetGame" class="reset-btn">Play Again</button>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Results',
  setup() {
    const store = useStore()
    
    const raceResults = computed(() => store.getters['race/raceResults'])
    const isGameComplete = computed(() => store.getters['race/isGameComplete'])
    
    const resetGame = () => {
      store.dispatch('game/resetGame')
    }
    
    return {
      raceResults,
      isGameComplete,
      resetGame
    }
  }
}
</script>

<style scoped>
.results {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.results h2 {
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1.5rem;
}

.no-results {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #666;
}

.no-results-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.no-results h3 {
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1.3rem;
}

.no-results p {
  margin: 0;
  font-size: 0.9rem;
}

.results-container {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.result-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  border: 2px solid #e9ecef;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #f8f9fa;
}

.result-header h3 {
  margin: 0;
  color: #333;
  font-size: 1.2rem;
}

.distance {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
}

.winner-section {
  margin-bottom: 1.5rem;
}

.winner-badge {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(255, 215, 0, 0.3);
}

.winner-color {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 2px solid white;
}

.winner-name {
  font-weight: 700;
  color: #333;
  font-size: 1.1rem;
  flex: 1;
}

.winner-medal {
  font-size: 1.5rem;
}

.podium {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.podium-place {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  border-radius: 8px;
  position: relative;
}

.place-1 {
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  transform: scale(1.1);
  z-index: 3;
}

.place-2 {
  background: linear-gradient(135deg, #c0c0c0 0%, #e8e8e8 100%);
  transform: scale(1.05);
  z-index: 2;
}

.place-3 {
  background: linear-gradient(135deg, #cd7f32 0%, #daa520 100%);
  z-index: 1;
}

.place-number {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.horse-color {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid white;
}

.horse-details {
  text-align: center;
}

.horse-name {
  display: block;
  font-weight: 600;
  color: #333;
  font-size: 0.8rem;
  margin-bottom: 0.25rem;
}

.final-position {
  font-size: 0.7rem;
  color: #666;
}

.medal {
  font-size: 1.2rem;
}

.full-results {
  border-top: 2px solid #f8f9fa;
  padding-top: 1rem;
}

.full-results h4 {
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1rem;
}

.results-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 200px;
  overflow-y: auto;
}

.result-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  background: #f8f9fa;
  border-radius: 6px;
}

.position {
  font-weight: bold;
  color: #333;
  min-width: 20px;
}

.horse-name {
  flex: 1;
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
}

.game-complete {
  margin-top: 1rem;
  text-align: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: white;
  border-radius: 12px;
}

.complete-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.game-complete h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
}

.game-complete p {
  margin: 0 0 1rem 0;
  font-size: 1rem;
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

/* Scrollbar styling */
.results-container::-webkit-scrollbar,
.results-list::-webkit-scrollbar {
  width: 6px;
}

.results-container::-webkit-scrollbar-track,
.results-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.results-container::-webkit-scrollbar-thumb,
.results-list::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.results-container::-webkit-scrollbar-thumb:hover,
.results-list::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style> 