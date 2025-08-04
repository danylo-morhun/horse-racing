// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom command to wait for horses to be generated
Cypress.Commands.add('waitForHorses', () => {
  cy.get('[data-testid="horse-card"]', { timeout: 10000 }).should('have.length', 20)
})

// Custom command to generate race schedule
Cypress.Commands.add('generateSchedule', () => {
  cy.get('[data-testid="generate-schedule-btn"]').click()
  cy.get('[data-testid="schedule-generated"]').should('be.visible')
})

// Custom command to start race
Cypress.Commands.add('startRace', () => {
  cy.get('[data-testid="start-race-btn"]').click()
  cy.get('[data-testid="race-in-progress"]').should('be.visible')
})

// Custom command to wait for race completion
Cypress.Commands.add('waitForRaceCompletion', () => {
  cy.get('[data-testid="race-complete"]', { timeout: 60000 }).should('be.visible')
}) 