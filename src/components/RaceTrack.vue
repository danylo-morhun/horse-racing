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
    
    <div v-else-if="isRacing && currentRace" class="active-race">
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
    
    <div v-else class="waiting-state">
      <div class="waiting-icon">⏳</div>
      <h3>Preparing Next Race...</h3>
      <p>Get ready for Round {{ currentRound }}</p>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'RaceTrack',
  setup() {
    const store = useStore()
    
    const scheduleGenerated = computed(() => store.getters['game/scheduleGenerated'])
    const isRacing = computed(() => store.getters['race/isRacing'])
    const currentRound = computed(() => store.getters['race/currentRound'])
    const currentRace = computed(() => store.getters['race/currentRace'])
    
    return {
      scheduleGenerated,
      isRacing,
      currentRound,
      currentRace
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
.ready-state,
.waiting-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #666;
}

.empty-icon,
.ready-icon,
.waiting-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-state h3,
.ready-state h3,
.waiting-state h3 {
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1.5rem;
}

.empty-state p,
.ready-state p,
.waiting-state p {
  margin: 0;
  font-size: 1rem;
}

.active-race {
  flex: 1;
  display: flex;
  flex-direction: column;
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
</style> 