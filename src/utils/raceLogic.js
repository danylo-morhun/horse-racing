/**
 * Race Logic Utilities
 * Contains pure functions for race simulation and calculations
 */

/**
 * Calculate horse speed based on condition and randomness
 * @param {number} condition - Horse condition score (1-100)
 * @param {number} randomFactor - Random factor (0-1)
 * @returns {number} Speed multiplier
 */
export function calculateHorseSpeed(condition, randomFactor = Math.random()) {
  if (condition < 1 || condition > 100) {
    throw new Error('Condition must be between 1 and 100')
  }
  
  if (randomFactor < 0 || randomFactor > 1) {
    throw new Error('Random factor must be between 0 and 1')
  }
  
  // Base speed from condition (0.5 to 1.0)
  const baseSpeed = condition / 100
  
  // Random variation (0.5 to 1.0)
  const variation = 0.5 + (randomFactor * 0.5)
  
  return baseSpeed * variation
}

/**
 * Update horse position based on speed and distance
 * @param {number} currentPosition - Current position in meters
 * @param {number} speed - Speed multiplier
 * @param {number} distance - Total race distance
 * @param {number} updates - Total number of updates
 * @returns {number} New position
 */
export function updateHorsePosition(currentPosition, speed, distance, updates) {
  if (currentPosition < 0) {
    throw new Error('Current position cannot be negative')
  }
  
  if (speed < 0) {
    throw new Error('Speed cannot be negative')
  }
  
  if (distance <= 0) {
    throw new Error('Distance must be positive')
  }
  
  if (updates <= 0) {
    throw new Error('Updates must be positive')
  }
  
  const positionIncrement = speed * (distance / updates)
  return currentPosition + positionIncrement
}

/**
 * Simulate a complete race
 * @param {Array} horses - Array of horse objects
 * @param {number} distance - Race distance in meters
 * @param {number} duration - Race duration in milliseconds
 * @param {number} updateInterval - Update interval in milliseconds
 * @returns {Promise<Object>} Race result
 */
export function simulateRace(horses, distance, duration = 5000, updateInterval = 100) {
  return new Promise((resolve) => {
    if (!Array.isArray(horses) || horses.length === 0) {
      throw new Error('Horses must be a non-empty array')
    }
    
    if (distance <= 0) {
      throw new Error('Distance must be positive')
    }
    
    if (duration <= 0) {
      throw new Error('Duration must be positive')
    }
    
    if (updateInterval <= 0) {
      throw new Error('Update interval must be positive')
    }
    
    const raceHorses = horses.map(horse => ({
      ...horse,
      position: 0
    }))
    
    const updates = duration / updateInterval
    let currentUpdate = 0
    
    const interval = setInterval(() => {
      // Update each horse's position
      raceHorses.forEach(horse => {
        const speed = calculateHorseSpeed(horse.condition)
        horse.position = updateHorsePosition(horse.position, speed, distance, updates)
      })
      
      currentUpdate++
      
      if (currentUpdate >= updates) {
        clearInterval(interval)
        
        // Sort horses by final position (highest first)
        const sortedHorses = raceHorses.sort((a, b) => b.position - a.position)
        
        resolve({
          horses: sortedHorses,
          winner: sortedHorses[0],
          distance,
          duration
        })
      }
    }, updateInterval)
  })
}

/**
 * Generate random horses for a race
 * @param {Array} allHorses - All available horses
 * @param {number} count - Number of horses to select
 * @returns {Array} Selected horses
 */
export function selectRandomHorses(allHorses, count) {
  if (!Array.isArray(allHorses)) {
    throw new Error('All horses must be an array')
  }
  
  if (count <= 0) {
    throw new Error('Count must be positive')
  }
  
  if (count > allHorses.length) {
    throw new Error('Count cannot exceed available horses')
  }
  
  // Fisher-Yates shuffle algorithm
  const shuffled = [...allHorses]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  
  return shuffled.slice(0, count)
}

/**
 * Generate race schedule
 * @param {Array} horses - All available horses
 * @param {Array} distances - Array of race distances
 * @param {number} horsesPerRace - Number of horses per race
 * @returns {Array} Race schedule
 */
export function generateRaceSchedule(horses, distances, horsesPerRace = 10) {
  if (!Array.isArray(horses)) {
    throw new Error('Horses must be an array')
  }
  
  if (!Array.isArray(distances)) {
    throw new Error('Distances must be an array')
  }
  
  if (horsesPerRace <= 0) {
    throw new Error('Horses per race must be positive')
  }
  
  if (horsesPerRace > horses.length) {
    throw new Error('Horses per race cannot exceed available horses')
  }
  
  return distances.map((distance, index) => ({
    round: index + 1,
    distance,
    horses: selectRandomHorses(horses, horsesPerRace)
  }))
}

/**
 * Validate horse data
 * @param {Object} horse - Horse object
 * @returns {boolean} True if valid
 */
export function validateHorse(horse) {
  if (!horse || typeof horse !== 'object') {
    return false
  }
  
  if (!horse.id || typeof horse.id !== 'number') {
    return false
  }
  
  if (!horse.name || typeof horse.name !== 'string') {
    return false
  }
  
  if (!horse.color || typeof horse.color !== 'string') {
    return false
  }
  
  if (!horse.condition || typeof horse.condition !== 'number' || horse.condition < 1 || horse.condition > 100) {
    return false
  }
  
  return true
} 