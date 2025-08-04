<template>
  <Dialog 
    :is-open="isOpen" 
    title="🏆 Complete Race Results" 
    @close="$emit('close')"
  >
    <div class="race-results-table">
      <div v-for="(result, index) in raceResults" :key="result.round" class="round-section">
        <h4>Round {{ result.round }} - {{ result.distance }}m</h4>
        
        <div class="table-container">
          <table class="results-table">
          <thead>
            <tr>
              <th>Position</th>
              <th>Horse</th>
              <th>Color</th>
              <th>Condition</th>
              <th>Distance</th>
              <th>Time</th>
              <th>Medal</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="(horse, horseIndex) in result.horses" 
              :key="horse.id"
              :class="{ 
                'winner': horseIndex === 0,
                'podium': horseIndex < 3
              }"
            >
              <td class="position">{{ horseIndex + 1 }}</td>
              <td class="horse-name">{{ horse.name }}</td>
              <td class="horse-color">
                <div 
                  class="color-indicator"
                  :style="{ backgroundColor: horse.color }"
                ></div>
              </td>
              <td class="condition">{{ horse.condition }}/100</td>
              <td class="distance">{{ Math.round(horse.position) }}m</td>
              <td class="time">
                {{ horse.finishTime ? Math.round(horse.finishTime / 1000) + 's' : 'DNF' }}
              </td>
              <td class="medal">
                {{ horseIndex === 0 ? '🥇' : horseIndex === 1 ? '🥈' : horseIndex === 2 ? '🥉' : '' }}
              </td>
            </tr>
          </tbody>
        </table>
        </div>
        
        <div class="round-summary">
          <div class="winner-highlight">
            <strong>Winner:</strong> {{ result.winner.name }} 
            <span class="winner-time">({{ result.winner.finishTime ? Math.round(result.winner.finishTime / 1000) + 's' : 'DNF' }})</span>
          </div>
        </div>
      </div>
      
      <div v-if="!raceResults || raceResults.length === 0" class="no-results">
        <p>No race results available yet.</p>
      </div>
    </div>
    
    <template #footer>
      <button @click="$emit('close')" class="btn btn-primary">Close</button>
    </template>
  </Dialog>
</template>

<script>
import Dialog from './Dialog.vue'

export default {
  name: 'RaceResultsDialog',
  components: {
    Dialog
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    raceResults: {
      type: Array,
      default: () => []
    }
  },
  emits: ['close']
}
</script>

<style scoped>
.race-results-table {
  max-height: 60vh;
  overflow-y: auto;
}

.table-container {
  overflow-x: auto;
  margin: 0 -1rem;
  padding: 0 1rem;
}

.round-section {
  margin-bottom: 2rem;
  border: 2px solid #e9ecef;
  border-radius: 10px;
  overflow: hidden;
}

.round-section h4 {
  margin: 0;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 1.2rem;
}

.results-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.results-table th,
.results-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #e9ecef;
}

.results-table th {
  background: #f8f9fa;
  font-weight: 600;
  color: #333;
}

.results-table tr:hover {
  background: #f8f9fa;
}

.results-table tr.winner {
  background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
}

.results-table tr.podium {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.position {
  font-weight: bold;
  text-align: center;
  min-width: 50px;
}

.horse-name {
  font-weight: 600;
  min-width: 120px;
}

.horse-color {
  text-align: center;
  min-width: 60px;
}

.color-indicator {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #ddd;
  margin: 0 auto;
}

.condition {
  text-align: center;
  min-width: 80px;
}

.distance {
  text-align: center;
  min-width: 80px;
}

.time {
  text-align: center;
  min-width: 60px;
  font-weight: 600;
}

.medal {
  text-align: center;
  min-width: 50px;
  font-size: 1.2rem;
}

.round-summary {
  padding: 1rem;
  background: #f8f9fa;
  border-top: 1px solid #e9ecef;
}

.winner-highlight {
  color: #333;
  font-size: 1rem;
}

.winner-time {
  color: #28a745;
  font-weight: 600;
}

.no-results {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}
</style> 