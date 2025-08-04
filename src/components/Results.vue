<template>
  <div class="results">
    <div class="results-header">
      <div class="header-left">
        <h2>🏆 Race Results</h2>
      </div>
      <div class="header-right">
        <p class="subtitle">Complete race results and statistics</p>
        <div 
          v-if="raceResults.length > 0"
          @click="openRaceResultsDialog" 
          class="icon-button"
          data-tooltip="View Complete Race Results"
        >
          📊
        </div>
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
  align-items: flex-start;
  margin-bottom: 1rem;
}

.header-left {
  flex: 1;
}

.header-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
}

.subtitle {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
  text-align: right;
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
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.95);
  color: white;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 500;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  z-index: 1000;
  width: max-content;
  max-width: 300px;
  overflow: visible;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

.icon-button:hover::after {
  opacity: 1;
}

.results h2 {
  margin: 0;
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
  margin: 0.75rem 0;
}

.winner-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  padding: 0.75rem 1.25rem;
  border-radius: 12px;
  box-shadow: 0 3px 12px rgba(255, 215, 0, 0.25);
  min-width: 200px;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.winner-details {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.winner-name {
  font-weight: 600;
  color: #333;
  font-size: 1rem;
  line-height: 1.2;
}

.winner-time {
  font-size: 0.8rem;
  color: #555;
  font-weight: 500;
}

.horse-color {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
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

@media (max-width: 768px) {
  .results-header {
    flex-direction: column;
    gap: 0.75rem;
    align-items: flex-start;
  }
  
  .header-right {
    align-items: flex-start;
  }
  
  .subtitle {
    text-align: left;
  }
  
  .results h2 {
    font-size: 1.3rem;
    margin: 0;
  }
  
  .icon-button {
    width: 28px;
    height: 28px;
    font-size: 0.9rem;
  }
  
  .no-results-icon {
    font-size: 2.5rem;
  }
  
  .no-results h3 {
    font-size: 1.1rem;
  }
  
  .no-results p {
    font-size: 0.8rem;
  }
  
  .results-container {
    gap: 1rem;
  }
  
  .result-card {
    padding: 1rem;
  }
  
  .result-header {
    margin-bottom: 0.75rem;
  }
  
  .result-header h3 {
    font-size: 1.1rem;
  }
  
  .distance {
    padding: 0.2rem 0.6rem;
    font-size: 0.75rem;
  }
  
  .winner-card {
    padding: 0.625rem 1rem;
    min-width: 180px;
    gap: 0.5rem;
  }
  
  .winner-name {
    font-size: 0.9rem;
  }
  
  .winner-time {
    font-size: 0.75rem;
  }
  
  .horse-color {
    width: 18px;
    height: 18px;
  }
}

@media (max-width: 480px) {
  .results h2 {
    font-size: 1.1rem;
  }
  
  .icon-button {
    width: 26px;
    height: 26px;
    font-size: 0.85rem;
  }
  
  .no-results-icon {
    font-size: 2rem;
  }
  
  .no-results h3 {
    font-size: 1rem;
  }
  
  .no-results p {
    font-size: 0.75rem;
  }
  
  .results-container {
    gap: 0.75rem;
  }
  
  .result-card {
    padding: 0.75rem;
  }
  
  .result-header {
    margin-bottom: 0.5rem;
  }
  
  .result-header h3 {
    font-size: 1rem;
  }
  
  .distance {
    padding: 0.15rem 0.5rem;
    font-size: 0.7rem;
  }
  
  .winner-card {
    padding: 0.5rem 0.875rem;
    min-width: 160px;
    gap: 0.375rem;
  }
  
  .winner-name {
    font-size: 0.85rem;
  }
  
  .winner-time {
    font-size: 0.7rem;
  }
  
  .horse-color {
    width: 16px;
    height: 16px;
  }
}
</style> 