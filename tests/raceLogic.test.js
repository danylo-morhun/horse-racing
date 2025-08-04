import { describe, it, expect } from 'vitest'
import {
  calculateHorseSpeed,
  updateHorsePosition,
  simulateRace,
  selectRandomHorses,
  generateRaceSchedule,
  validateHorse
} from '../src/utils/raceLogic.js'

describe('Race Logic Utilities', () => {
  describe('calculateHorseSpeed', () => {
    it('should calculate speed based on condition', () => {
      const speed = calculateHorseSpeed(80, 0.5)
      expect(speed).toBeGreaterThan(0)
      expect(speed).toBeLessThanOrEqual(1)
    })

    it('should throw error for invalid condition', () => {
      expect(() => calculateHorseSpeed(0)).toThrow('Condition must be between 1 and 100')
      expect(() => calculateHorseSpeed(101)).toThrow('Condition must be between 1 and 100')
      expect(() => calculateHorseSpeed(-1)).toThrow('Condition must be between 1 and 100')
    })

    it('should throw error for invalid random factor', () => {
      expect(() => calculateHorseSpeed(50, -0.1)).toThrow('Random factor must be between 0 and 1')
      expect(() => calculateHorseSpeed(50, 1.1)).toThrow('Random factor must be between 0 and 1')
    })
  })

  describe('updateHorsePosition', () => {
    it('should update position correctly', () => {
      const newPosition = updateHorsePosition(100, 0.5, 1000, 50)
      expect(newPosition).toBe(110) // 100 + (0.5 * 1000 / 50)
    })

    it('should throw error for invalid inputs', () => {
      expect(() => updateHorsePosition(-1, 0.5, 1000, 50)).toThrow('Current position cannot be negative')
      expect(() => updateHorsePosition(100, -0.5, 1000, 50)).toThrow('Speed cannot be negative')
      expect(() => updateHorsePosition(100, 0.5, 0, 50)).toThrow('Distance must be positive')
      expect(() => updateHorsePosition(100, 0.5, 1000, 0)).toThrow('Updates must be positive')
    })
  })

  describe('selectRandomHorses', () => {
    const testHorses = [
      { id: 1, name: 'Horse 1', color: '#ff0000', condition: 80 },
      { id: 2, name: 'Horse 2', color: '#00ff00', condition: 70 },
      { id: 3, name: 'Horse 3', color: '#0000ff', condition: 90 },
      { id: 4, name: 'Horse 4', color: '#ffff00', condition: 60 },
      { id: 5, name: 'Horse 5', color: '#ff00ff', condition: 85 }
    ]

    it('should select correct number of horses', () => {
      const selected = selectRandomHorses(testHorses, 3)
      expect(selected).toHaveLength(3)
    })

    it('should not modify original array', () => {
      const original = [...testHorses]
      selectRandomHorses(testHorses, 3)
      expect(testHorses).toEqual(original)
    })

    it('should throw error for invalid inputs', () => {
      expect(() => selectRandomHorses(null, 3)).toThrow('All horses must be an array')
      expect(() => selectRandomHorses(testHorses, 0)).toThrow('Count must be positive')
      expect(() => selectRandomHorses(testHorses, 10)).toThrow('Count cannot exceed available horses')
    })
  })

  describe('generateRaceSchedule', () => {
    const testHorses = [
      { id: 1, name: 'Horse 1', color: '#ff0000', condition: 80 },
      { id: 2, name: 'Horse 2', color: '#00ff00', condition: 70 },
      { id: 3, name: 'Horse 3', color: '#0000ff', condition: 90 },
      { id: 4, name: 'Horse 4', color: '#ffff00', condition: 60 },
      { id: 5, name: 'Horse 5', color: '#ff00ff', condition: 85 }
    ]

    const testDistances = [1200, 1400, 1600]

    it('should generate correct schedule structure', () => {
      const schedule = generateRaceSchedule(testHorses, testDistances, 3)
      expect(schedule).toHaveLength(3)
      
      schedule.forEach((race, index) => {
        expect(race.round).toBe(index + 1)
        expect(race.distance).toBe(testDistances[index])
        expect(race.horses).toHaveLength(3)
      })
    })

    it('should throw error for invalid inputs', () => {
      expect(() => generateRaceSchedule(null, testDistances, 3)).toThrow('Horses must be an array')
      expect(() => generateRaceSchedule(testHorses, null, 3)).toThrow('Distances must be an array')
      expect(() => generateRaceSchedule(testHorses, testDistances, 0)).toThrow('Horses per race must be positive')
      expect(() => generateRaceSchedule(testHorses, testDistances, 10)).toThrow('Horses per race cannot exceed available horses')
    })
  })

  describe('validateHorse', () => {
    it('should validate correct horse data', () => {
      const validHorse = {
        id: 1,
        name: 'Test Horse',
        color: '#ff0000',
        condition: 80
      }
      expect(validateHorse(validHorse)).toBe(true)
    })

    it('should reject invalid horse data', () => {
      expect(validateHorse(null)).toBe(false)
      expect(validateHorse({})).toBe(false)
      expect(validateHorse({ id: 1, name: 'Test', color: '#ff0000' })).toBe(false) // missing condition
      expect(validateHorse({ id: 1, name: 'Test', color: '#ff0000', condition: 0 })).toBe(false) // invalid condition
      expect(validateHorse({ id: 1, name: 'Test', color: '#ff0000', condition: 101 })).toBe(false) // invalid condition
      expect(validateHorse({ id: '1', name: 'Test', color: '#ff0000', condition: 80 })).toBe(false) // invalid id type
    })
  })

  describe('simulateRace', () => {
    const testHorses = [
      { id: 1, name: 'Horse 1', color: '#ff0000', condition: 80 },
      { id: 2, name: 'Horse 2', color: '#00ff00', condition: 70 },
      { id: 3, name: 'Horse 3', color: '#0000ff', condition: 90 }
    ]

    it('should simulate race and return results', async () => {
      const result = await simulateRace(testHorses, 1000, 100, 10)
      
      expect(result).toHaveProperty('horses')
      expect(result).toHaveProperty('winner')
      expect(result).toHaveProperty('distance')
      expect(result).toHaveProperty('duration')
      
      expect(result.horses).toHaveLength(3)
      expect(result.winner).toBe(result.horses[0])
      expect(result.distance).toBe(1000)
      expect(result.duration).toBe(100)
      
      // Check that horses are sorted by position (highest first)
      for (let i = 0; i < result.horses.length - 1; i++) {
        expect(result.horses[i].position).toBeGreaterThanOrEqual(result.horses[i + 1].position)
      }
    })

    it('should throw error for invalid inputs', async () => {
      await expect(simulateRace([], 1000)).rejects.toThrow('Horses must be a non-empty array')
      await expect(simulateRace(testHorses, 0)).rejects.toThrow('Distance must be positive')
      await expect(simulateRace(testHorses, 1000, 0)).rejects.toThrow('Duration must be positive')
      await expect(simulateRace(testHorses, 1000, 100, 0)).rejects.toThrow('Update interval must be positive')
    })
  })
}) 