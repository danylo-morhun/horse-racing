<template>
  <Dialog 
    :is-open="isOpen" 
    title="📖 Game Rules & Description" 
    @close="$emit('close')"
  >
    <div class="rules-content">
      <section class="rules-section">
        <h4>🎮 How to Play</h4>
        <ol class="rules-list">
          <li><strong>Initialize:</strong> Horses are automatically generated when the game loads</li>
          <li><strong>Generate Schedule:</strong> Click "Generate Race Schedule" to create 6 rounds</li>
          <li><strong>Start Racing:</strong> Click "Start Race" to begin the competition</li>
          <li><strong>Watch Races:</strong> Observe horses racing with real-time animations</li>
          <li><strong>View Results:</strong> Check results panel for outcomes and statistics</li>
          <li><strong>Reset:</strong> Use "Reset Game" to start over</li>
        </ol>
      </section>

      <section class="rules-section">
        <h4>🐎 Horse System</h4>
        <div class="rules-grid">
          <div class="rule-item">
            <h5>Horse Generation</h5>
            <p>20 unique horses are generated with:</p>
            <ul>
              <li>Unique names and colors</li>
              <li>Random condition scores (1-100)</li>
              <li>Individual performance characteristics</li>
            </ul>
          </div>
          
          <div class="rule-item">
            <h5>Condition Scores</h5>
            <ul>
              <li><span class="condition-excellent">80-100:</span> Excellent performance</li>
              <li><span class="condition-good">60-79:</span> Good performance</li>
              <li><span class="condition-fair">40-59:</span> Fair performance</li>
              <li><span class="condition-poor">1-39:</span> Poor performance</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="rules-section">
        <h4>🏁 Race System</h4>
        <div class="rules-grid">
          <div class="rule-item">
            <h5>Race Schedule</h5>
            <p>6 rounds with increasing distances:</p>
            <ul>
              <li>Round 1: 1,200 meters</li>
              <li>Round 2: 1,400 meters</li>
              <li>Round 3: 1,600 meters</li>
              <li>Round 4: 1,800 meters</li>
              <li>Round 5: 2,000 meters</li>
              <li>Round 6: 2,200 meters</li>
            </ul>
          </div>
          
          <div class="rule-item">
            <h5>Race Mechanics</h5>
            <ul>
              <li>10 horses per race (randomly selected)</li>
              <li>Horses race to the finish line</li>
              <li>Speed based on condition + randomness</li>
              <li>Real-time position updates</li>
              <li>Finish times determine rankings</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="rules-section">
        <h4>🎯 Game Features</h4>
        <div class="features-grid">
          <div class="feature-item">
            <h5>🎮 Controls</h5>
            <ul>
              <li><strong>Generate Schedule:</strong> Create race rounds</li>
              <li><strong>Start Race:</strong> Begin the competition</li>
              <li><strong>Skip Round:</strong> Fast-forward current race</li>
              <li><strong>Reset Game:</strong> Start over with new horses</li>
            </ul>
          </div>
          
          <div class="feature-item">
            <h5>📊 Results</h5>
            <ul>
              <li>Round-by-round results</li>
              <li>Winner highlights with medals</li>
              <li>Complete rankings</li>
              <li>Finish times and distances</li>
            </ul>
          </div>
          
          <div class="feature-item">
            <h5>📋 Data Views</h5>
            <ul>
              <li>Horse stable overview</li>
              <li>Complete race results table</li>
              <li>Individual horse statistics</li>
              <li>Performance tracking</li>
            </ul>
          </div>
          
          <div class="feature-item">
            <h5>🎨 Visual Features</h5>
            <ul>
              <li>Animated race track</li>
              <li>Real-time horse movement</li>
              <li>Color-coded condition bars</li>
              <li>Responsive design</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="rules-section">
        <h4>🏆 Winning</h4>
        <p>Horses are ranked by:</p>
        <ol>
          <li><strong>Finish Time:</strong> Who crosses the finish line first</li>
          <li><strong>Distance Covered:</strong> If multiple horses finish simultaneously</li>
          <li><strong>Condition:</strong> Higher condition horses generally perform better</li>
        </ol>
        <p class="note">Note: Random factors ensure every race is unpredictable!</p>
      </section>

      <section class="rules-section">
        <h4>💡 Tips</h4>
        <ul class="tips-list">
          <li>Watch the condition bars to identify strong horses</li>
          <li>Use the skip round feature to speed up long races</li>
          <li>Check the horse stable for detailed statistics</li>
          <li>Review race results to track performance trends</li>
          <li>Reset the game to try different horse combinations</li>
        </ul>
      </section>
    </div>
    
    <template #footer>
      <button @click="$emit('close')" class="btn btn-primary">Got it!</button>
    </template>
  </Dialog>
</template>

<script>
import Dialog from './Dialog.vue'

export default {
  name: 'GameRulesDialog',
  components: {
    Dialog
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close']
}
</script>

<style scoped>
.rules-content {
  max-height: 60vh;
  overflow-y: auto;
}

.rules-section {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #f8f9fa;
}

.rules-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.rules-section h4 {
  color: #333;
  font-size: 1.3rem;
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.rules-list {
  padding-left: 1.5rem;
  margin: 0;
}

.rules-list li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.rules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.rule-item {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.rule-item h5 {
  margin: 0 0 0.75rem 0;
  color: #333;
  font-size: 1.1rem;
}

.rule-item ul {
  margin: 0;
  padding-left: 1.25rem;
}

.rule-item li {
  margin-bottom: 0.25rem;
  line-height: 1.5;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.feature-item {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #dee2e6;
}

.feature-item h5 {
  margin: 0 0 0.75rem 0;
  color: #333;
  font-size: 1rem;
}

.feature-item ul {
  margin: 0;
  padding-left: 1.25rem;
  font-size: 0.9rem;
}

.feature-item li {
  margin-bottom: 0.25rem;
  line-height: 1.4;
}

.condition-excellent {
  color: #28a745;
  font-weight: 600;
}

.condition-good {
  color: #17a2b8;
  font-weight: 600;
}

.condition-fair {
  color: #ffc107;
  font-weight: 600;
}

.condition-poor {
  color: #dc3545;
  font-weight: 600;
}

.tips-list {
  background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
  padding: 1rem 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #ffc107;
  margin: 0;
}

.tips-list li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.note {
  background: #e7f3ff;
  padding: 0.75rem;
  border-radius: 6px;
  border-left: 4px solid #007bff;
  margin: 1rem 0 0 0;
  font-style: italic;
  color: #0056b3;
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