describe('Horse Racing Game - Complete Flow', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should complete a full game cycle', () => {
    // Wait for horses to be generated
    cy.get('.horse-card').should('have.length', 20)
    
    // Check initial state
    cy.get('.controls').should('be.visible')
    cy.get('.horse-list').should('be.visible')
    cy.get('.race-track').should('be.visible')
    cy.get('.results').should('be.visible')
    
    // Generate race schedule
    cy.get('button').contains('Generate Race Schedule').click()
    cy.get('.status-value').contains('✅').should('be.visible')
    
    // Start race
    cy.get('button').contains('Start Race').click()
    
    // Wait for race to start
    cy.get('.active-race').should('be.visible')
    
    // Wait for first round to complete
    cy.get('.result-card', { timeout: 10000 }).should('be.visible')
    
    // Wait for all rounds to complete
    cy.get('.game-complete', { timeout: 60000 }).should('be.visible')
    
    // Verify results
    cy.get('.result-card').should('have.length', 6)
    
    // Reset game
    cy.get('button').contains('Play Again').click()
    
    // Verify reset
    cy.get('.horse-card').should('have.length', 20)
    cy.get('.result-card').should('not.exist')
  })

  it('should display horse information correctly', () => {
    cy.get('.horse-card').first().within(() => {
      cy.get('.horse-name').should('be.visible')
      cy.get('.horse-color').should('be.visible')
      cy.get('.condition-bar').should('be.visible')
      cy.get('.condition-value').should('match', /\d+\/100/)
    })
  })

  it('should show race progress correctly', () => {
    // Generate schedule and start race
    cy.get('button').contains('Generate Race Schedule').click()
    cy.get('button').contains('Start Race').click()
    
    // Check race progress
    cy.get('.race-progress').should('be.visible')
    cy.get('.progress-text').should('contain', 'Race 1/6')
  })

  it('should display race results with winners', () => {
    // Generate schedule and start race
    cy.get('button').contains('Generate Race Schedule').click()
    cy.get('button').contains('Start Race').click()
    
    // Wait for first result
    cy.get('.result-card', { timeout: 10000 }).should('be.visible')
    
    // Check winner display (updated for new simplified layout)
    cy.get('.winner-only').should('be.visible')
    cy.get('.winner-card').should('be.visible')
  })

  it('should show game rules dialog', () => {
    cy.get('button').contains('📖 Game Rules').click()
    cy.get('.dialog').should('be.visible')
    cy.get('.dialog-title').should('contain', 'Game Rules')
  })

  it('should show complete results dialog', () => {
    // Generate schedule and start race
    cy.get('button').contains('Generate Race Schedule').click()
    cy.get('button').contains('Start Race').click()
    
    // Wait for first result
    cy.get('.result-card', { timeout: 10000 }).should('be.visible')
    
    // Click complete results button
    cy.get('.icon-button').contains('📊').click()
    cy.get('.dialog').should('be.visible')
    cy.get('.dialog-title').should('contain', 'Complete Race Results')
  })

  it('should show horse stable dialog', () => {
    cy.get('.icon-button').contains('📋').click()
    cy.get('.dialog').should('be.visible')
    cy.get('.dialog-title').should('contain', 'Horse Stable')
  })

  it('should skip rounds and complete game', () => {
    // Generate schedule and start race
    cy.get('button').contains('Generate Race Schedule').click()
    cy.get('button').contains('Start Race').click()
    
    // Wait for race to start
    cy.get('.active-race').should('be.visible')
    
    // Skip to end
    cy.get('button').contains('Skip to End').click()
    
    // Wait for game complete
    cy.get('.game-complete', { timeout: 10000 }).should('be.visible')
    
    // Check complete results button
    cy.get('button').contains('📊 See Complete Results').should('be.visible')
  })
}) 