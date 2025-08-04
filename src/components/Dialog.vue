<template>
  <Teleport to="body">
    <div v-if="isOpen" class="dialog-overlay" @click="handleOverlayClick">
      <div class="dialog-content" @click.stop>
        <div class="dialog-header">
          <h3>{{ title }}</h3>
          <button @click="$emit('close')" class="close-btn">×</button>
        </div>
        <div class="dialog-body">
          <slot></slot>
        </div>
        <div v-if="$slots.footer" class="dialog-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: true
    },
    closeOnOverlay: {
      type: Boolean,
      default: true
    }
  },
  emits: ['close'],
  methods: {
    handleOverlayClick() {
      if (this.closeOnOverlay) {
        this.$emit('close')
      }
    }
  }
}
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.dialog-content {
  background: white;
  border-radius: 15px;
  max-width: 90vw;
  max-height: 90vh;
  width: 600px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  animation: dialogSlideIn 0.3s ease-out;
}

@keyframes dialogSlideIn {
  from {
    opacity: 0;
    transform: translateY(-50px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 2px solid #f8f9fa;
}

.dialog-header h3 {
  margin: 0;
  color: #333;
  font-size: 1.5rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  color: #666;
  cursor: pointer;
  padding: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: #f8f9fa;
  color: #333;
}

.dialog-body {
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
}

.dialog-footer {
  padding: 1.5rem;
  border-top: 2px solid #f8f9fa;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}
</style> 