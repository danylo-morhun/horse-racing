<template>
  <Dialog 
    :is-open="isOpen" 
    title="🐎 Horse Stable - Complete Data" 
    @close="$emit('close')"
  >
    <div class="stable-table">
      <table class="horses-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Color</th>
            <th>Condition</th>
            <th>Status</th>
            <th>Performance</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="horse in horses" 
            :key="horse.id"
            :class="{ 'racing': horse.isRacing }"
          >
            <td class="horse-id">#{{ horse.id }}</td>
            <td class="horse-name">{{ horse.name }}</td>
            <td class="horse-color">
              <div 
                class="color-indicator"
                :style="{ backgroundColor: horse.color }"
              ></div>
              <span class="color-code">{{ horse.color }}</span>
            </td>
            <td class="condition">
              <div class="condition-bar">
                <div 
                  class="condition-fill"
                  :style="{ width: `${horse.condition}%` }"
                  :class="getConditionClass(horse.condition)"
                ></div>
              </div>
              <span class="condition-value">{{ horse.condition }}/100</span>
            </td>
            <td class="status">
              <span :class="{ 'racing': horse.isRacing }">
                {{ horse.isRacing ? '🏁 Racing' : '⏸️ Ready' }}
              </span>
            </td>
            <td class="performance">
              <div class="performance-stats">
                <div class="stat">
                  <span class="label">Wins:</span>
                  <span class="value">{{ getHorseWins(horse.id) }}</span>
                </div>
                <div class="stat">
                  <span class="label">Races:</span>
                  <span class="value">{{ getHorseRaces(horse.id) }}</span>
                </div>
                <div class="stat">
                  <span class="label">Avg Time:</span>
                  <span class="value">{{ getHorseAvgTime(horse.id) }}</span>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      
      <div class="stable-summary">
        <div class="summary-stats">
          <div class="stat-card">
            <h4>Total Horses</h4>
            <span class="stat-value">{{ horses.length }}</span>
          </div>
          <div class="stat-card">
            <h4>Average Condition</h4>
            <span class="stat-value">{{ Math.round(averageCondition) }}/100</span>
          </div>
          <div class="stat-card">
            <h4>Best Condition</h4>
            <span class="stat-value">{{ bestCondition }}/100</span>
          </div>
          <div class="stat-card">
            <h4>Racing Now</h4>
            <span class="stat-value">{{ racingCount }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <template #footer>
      <button @click="$emit('close')" class="btn btn-primary">Close</button>
    </template>
  </Dialog>
</template>

<script>
import { computed } from 'vue'
import Dialog from './Dialog.vue'

export default {
  name: 'HorseStableDialog',
  components: {
    Dialog
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    horses: {
      type: Array,
      default: () => []
    },
    raceResults: {
      type: Array,
      default: () => []
    }
  },
  emits: ['close'],
  setup(props) {
    const averageCondition = computed(() => {
      if (props.horses.length === 0) return 0
      const total = props.horses.reduce((sum, horse) => sum + horse.condition, 0)
      return total / props.horses.length
    })

    const bestCondition = computed(() => {
      if (props.horses.length === 0) return 0
      return Math.max(...props.horses.map(horse => horse.condition))
    })

    const racingCount = computed(() => {
      return props.horses.filter(horse => horse.isRacing).length
    })

    const getConditionClass = (condition) => {
      if (condition >= 80) return 'excellent'
      if (condition >= 60) return 'good'
      if (condition >= 40) return 'fair'
      return 'poor'
    }

    const getHorseWins = (horseId) => {
      let wins = 0
      props.raceResults.forEach(result => {
        if (result.winner && result.winner.id === horseId) {
          wins++
        }
      })
      return wins
    }

    const getHorseRaces = (horseId) => {
      let races = 0
      props.raceResults.forEach(result => {
        if (result.horses.some(horse => horse.id === horseId)) {
          races++
        }
      })
      return races
    }

    const getHorseAvgTime = (horseId) => {
      let totalTime = 0
      let raceCount = 0
      
      props.raceResults.forEach(result => {
        const horse = result.horses.find(h => h.id === horseId)
        if (horse && horse.finishTime) {
          totalTime += horse.finishTime
          raceCount++
        }
      })
      
      if (raceCount === 0) return 'N/A'
      return Math.round(totalTime / raceCount / 1000) + 's'
    }

    return {
      averageCondition,
      bestCondition,
      racingCount,
      getConditionClass,
      getHorseWins,
      getHorseRaces,
      getHorseAvgTime
    }
  }
}
</script>

<style scoped>
.stable-table {
  max-height: 60vh;
  overflow-y: auto;
}

.horses-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.horses-table th,
.horses-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #e9ecef;
}

.horses-table th {
  background: #f8f9fa;
  font-weight: 600;
  color: #333;
  position: sticky;
  top: 0;
  z-index: 10;
}

.horses-table tr:hover {
  background: #f8f9fa;
}

.horses-table tr.racing {
  background: linear-gradient(135deg, #f8fff9 0%, #e8f5e8 100%);
}

.horse-id {
  font-weight: bold;
  text-align: center;
  min-width: 50px;
}

.horse-name {
  font-weight: 600;
  min-width: 120px;
}

.horse-color {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 100px;
}

.color-indicator {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #ddd;
}

.color-code {
  font-size: 0.8rem;
  color: #666;
  font-family: monospace;
}

.condition {
  min-width: 120px;
}

.condition-bar {
  width: 100%;
  height: 8px;
  background: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.25rem;
}

.condition-fill {
  height: 100%;
  transition: width 0.3s ease;
}

.condition-fill.excellent {
  background: linear-gradient(90deg, #28a745, #20c997);
}

.condition-fill.good {
  background: linear-gradient(90deg, #17a2b8, #6f42c1);
}

.condition-fill.fair {
  background: linear-gradient(90deg, #ffc107, #fd7e14);
}

.condition-fill.poor {
  background: linear-gradient(90deg, #dc3545, #e83e8c);
}

.condition-value {
  font-size: 0.8rem;
  font-weight: 600;
  color: #333;
}

.status {
  text-align: center;
  min-width: 80px;
}

.status .racing {
  color: #28a745;
  font-weight: 600;
}

.performance {
  min-width: 150px;
}

.performance-stats {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
}

.stat .label {
  color: #666;
}

.stat .value {
  font-weight: 600;
  color: #333;
}

.stable-summary {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 2px solid #e9ecef;
}

.summary-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.stat-card {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
}

.stat-card h4 {
  margin: 0 0 0.5rem 0;
  color: #666;
  font-size: 0.9rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
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