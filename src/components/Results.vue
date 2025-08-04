<template>
  <div class="results">
    <div class="results-header">
      <h2>🏆 Race Results</h2>
              <div 
          v-if="raceResults.length > 0"
          @click="openRaceResultsDialog" 
          class="icon-button"
          data-tooltip="View Complete Race Results"
        >
          📊
        </div>
    </div>
    
    <div v-if="!raceResults || raceResults.length === 0" class="no-results">
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
        
        <div class="winner-only">
          <div class="winner-card">
            <div class="winner-medal">🥇</div>
            <div 
              class="horse-color"
              :style="{ backgroundColor: result.winner.color }"
            ></div>
            <div class="winner-details">
              <span class="winner-name">{{ result.winner.name }}</span>
              <span class="winner-time">{{ Math.round(result.winner.finishTime / 1000) }}s</span>
            </div>
          </div>
        </div>
        

      </div>
    </div>
    

    
    <!-- Race Results Dialog -->
    <RaceResultsDialog 
      :is-open="showRaceResultsDialog"
      :race-results="raceResults"
      @close="closeRaceResultsDialog"
    />
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import RaceResultsDialog from './RaceResultsDialog.vue'

export default {
  name: 'Results',
  components: {
    RaceResultsDialog
  },
  setup() {
    const store = useStore()
    
    const raceResults = computed(() => store.getters['race/raceResults'] || [])
    const showRaceResultsDialog = ref(false)
    
    const openRaceResultsDialog = () => {
      showRaceResultsDialog.value = true
    }
    
    const closeRaceResultsDialog = () => {
      showRaceResultsDialog.value = false
    }
    
    return {
      raceResults,
      showRaceResultsDialog,
      openRaceResultsDialog,
      closeRaceResultsDialog
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

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.icon-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.2);
  position: relative;
}

.icon-button:hover {
  transform: translateY(-2px) scale(1.1);
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
}

.icon-button::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: -35px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-size: 0.8rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  z-index: 1000;
  min-width: max-content;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.icon-button:hover::after {
  opacity: 1;
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



.winner-only {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}

.winner-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  padding: 1.5rem 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 16px rgba(255, 215, 0, 0.3);
  min-width: 250px;
}

.winner-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.winner-name {
  font-weight: 700;
  color: #333;
  font-size: 1.2rem;
}

.winner-time {
  font-size: 0.9rem;
  color: #666;
  font-weight: 600;
}

.horse-color {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 2px solid white;
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