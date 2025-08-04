<template>
  <div id="app">
    <header class="app-header">
      <h1>🐎 Horse Racing Game</h1>
    </header>
    
    <main class="app-main">
      <Controls />
      
      <div class="game-content">
        <div class="left-panel">
          <HorseList />
        </div>
        
        <div class="center-panel">
          <RaceTrack />
        </div>
        
        <div class="right-panel">
          <Results />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import Controls from './components/Controls.vue'
import HorseList from './components/HorseList.vue'
import RaceTrack from './components/RaceTrack.vue'
import Results from './components/Results.vue'

export default {
  name: 'App',
  components: {
    Controls,
    HorseList,
    RaceTrack,
    Results
  },
  setup() {
    const store = useStore()
    
    onMounted(() => {
      store.dispatch('game/initializeGame')
    })
  }
}
</script>

<style scoped>
#app {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Arial', sans-serif;
}

.app-header {
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.app-header h1 {
  margin: 0;
  font-size: 2.5rem;
  font-weight: bold;
}

.app-main {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.game-content {
  display: grid;
  grid-template-columns: 300px 1fr 300px;
  gap: 2rem;
  margin-top: 2rem;
}

.left-panel,
.right-panel {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  max-height: 600px;
  overflow-y: auto;
}

.center-panel {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  min-height: 600px;
}

@media (max-width: 1200px) {
  .game-content {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .left-panel,
  .right-panel {
    max-height: 300px;
  }
}
</style> 