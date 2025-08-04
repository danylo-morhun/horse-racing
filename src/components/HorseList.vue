<template>
  <div class="horse-list">
    <div class="horse-list-header">
      <div class="header-left">
        <h2>🐎 Horse Stable</h2>
      </div>
      <div class="header-right">
        <div class="icon-button" @click="openStableDialog" data-tooltip="View Complete Horse Data">
          📋
        </div>
      </div>
    </div>
    
    <div class="horses-grid">
      <div 
        v-for="horse in horses" 
        :key="horse.id"
        class="horse-card"
        :class="{ racing: horse.isRacing }"
        data-testid="horse-card"
      >
        <div class="horse-header">
          <div 
            class="horse-color"
            :style="{ backgroundColor: horse.color }"
          ></div>
          <span class="horse-name">{{ horse.name }}</span>
        </div>
        
        <div class="horse-details">
          <div class="detail-item">
            <span class="label">ID:</span>
            <span class="value">#{{ horse.id }}</span>
          </div>
          
          <div class="detail-item">
            <span class="label">Condition:</span>
            <div class="condition-bar">
              <div 
                class="condition-fill"
                :style="{ width: `${horse.condition}%` }"
                :class="getConditionClass(horse.condition)"
              ></div>
            </div>
            <span class="condition-value">{{ horse.condition }}/100</span>
          </div>
          
          <div class="detail-item">
            <span class="label">Status:</span>
            <span class="status" :class="{ racing: horse.isRacing }">
              {{ horse.isRacing ? '🏁 Racing' : '⏸️ Ready' }}
            </span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Horse Stable Dialog -->
    <HorseStableDialog 
      :is-open="showStableDialog"
      :horses="horses"
      :race-results="raceResults"
      @close="closeStableDialog"
    />
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import HorseStableDialog from './HorseStableDialog.vue'

export default {
  name: 'HorseList',
  components: {
    HorseStableDialog
  },
  setup() {
    const store = useStore()
    
    const horses = computed(() => store.getters['horses/allHorses'] || [])
    const raceResults = computed(() => store.getters['race/raceResults'] || [])
    const showStableDialog = ref(false)
    
    const getConditionClass = (condition) => {
      if (condition >= 80) return 'excellent'
      if (condition >= 60) return 'good'
      if (condition >= 40) return 'fair'
      return 'poor'
    }
    
    const openStableDialog = () => {
      showStableDialog.value = true
    }
    
    const closeStableDialog = () => {
      showStableDialog.value = false
    }
    
    return {
      horses,
      raceResults,
      showStableDialog,
      getConditionClass,
      openStableDialog,
      closeStableDialog
    }
  }
}
</script>

<style scoped>
.horse-list {
  height: 100%;
  overflow: visible;
}

.horse-list-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  overflow: visible;
}

.header-left {
  flex: 1;
}

.header-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
  overflow: visible;
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
  bottom: -60px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.95);
  color: white;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 500;
  white-space: normal;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  z-index: 99999;
  width: max-content;
  max-width: 400px;
  overflow: visible;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  text-align: center;
}

.icon-button:hover::after {
  opacity: 1;
}

.horse-list h2 {
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1.5rem;
}

.subtitle {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
  text-align: right;
}

.horses-grid {
  display: grid;
  gap: 1rem;
  max-height: 500px;
  overflow-y: auto;
}

.horse-card {
  background: white;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.horse-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.horse-card.racing {
  border-color: #28a745;
  background: linear-gradient(135deg, #f8fff9 0%, #e8f5e8 100%);
}

.horse-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.horse-color {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #ddd;
}

.horse-name {
  font-weight: 600;
  color: #333;
  font-size: 1rem;
}

.horse-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.label {
  font-size: 0.8rem;
  color: #666;
  min-width: 60px;
}

.value {
  font-weight: 600;
  color: #333;
}

.condition-bar {
  flex: 1;
  height: 8px;
  background: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
  margin: 0 0.5rem;
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
  min-width: 45px;
}

.status {
  font-size: 0.8rem;
  font-weight: 600;
  color: #666;
}

.status.racing {
  color: #28a745;
}

/* Scrollbar styling */
.horses-grid::-webkit-scrollbar {
  width: 6px;
}

.horses-grid::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.horses-grid::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.horses-grid::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

@media (max-width: 768px) {
  .horse-list-header {
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
  
  .horse-list-header h2 {
    font-size: 1.3rem;
  }
  
  .horse-list-header .subtitle {
    font-size: 0.85rem;
  }
  
  .icon-button {
    width: 28px;
    height: 28px;
    font-size: 0.9rem;
  }
  
  .horses-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  
  .horse-card {
    padding: 0.875rem;
  }
  
  .horse-header {
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }
  
  .horse-name {
    font-size: 0.9rem;
  }
  
  .horse-details {
    gap: 0.375rem;
  }
  
  .detail-item {
    gap: 0.375rem;
  }
  
  .label {
    font-size: 0.75rem;
    min-width: 50px;
  }
  
  .value {
    font-size: 0.85rem;
  }
  
  .condition-bar {
    height: 6px;
    margin: 0 0.375rem;
  }
  
  .condition-value {
    font-size: 0.75rem;
    min-width: 40px;
  }
  
  .status {
    font-size: 0.75rem;
  }
}

@media (max-width: 480px) {
  .horse-list-header h2 {
    font-size: 1.1rem;
  }
  
  .horse-list-header .subtitle {
    font-size: 0.8rem;
  }
  
  .icon-button {
    width: 26px;
    height: 26px;
    font-size: 0.85rem;
  }
  
  .horses-grid {
    gap: 0.5rem;
  }
  
  .horse-card {
    padding: 0.75rem;
  }
  
  .horse-header {
    gap: 0.375rem;
    margin-bottom: 0.5rem;
  }
  
  .horse-name {
    font-size: 0.85rem;
  }
  
  .horse-details {
    gap: 0.25rem;
  }
  
  .detail-item {
    gap: 0.25rem;
  }
  
  .label {
    font-size: 0.7rem;
    min-width: 45px;
  }
  
  .value {
    font-size: 0.8rem;
  }
  
  .condition-bar {
    height: 5px;
    margin: 0 0.25rem;
  }
  
  .condition-value {
    font-size: 0.7rem;
    min-width: 35px;
  }
  
  .status {
    font-size: 0.7rem;
  }
}
</style> 