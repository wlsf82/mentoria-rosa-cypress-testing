Cypress.Commands.add('login', (
  email = Cypress.env('USER_EMAIL'),
  password = Cypress.env('USER_PASSWORD')
) => {
  const login = () => {
    cy.visit('/login')
    cy.get('#email').type(email)
    cy.get('#password').type(password, { log: false })
    cy.get('button[type="submit"]').click()
    cy.contains('h1', 'Your Notes', {timeout: 10000}).should('be.visible')
  }

  cy.session(email, login)
})

Cypress.Commands.add('createNote', noteDescription => {
  cy.intercept('POST', '**/notes').as('createNote')
  cy.contains('Create a new note').click()
  cy.get('#content').type(noteDescription)
  cy.contains('button', 'Create').click()
  cy.wait('@createNote').its('response.statusCode]').should('be.equal', 200)
 })

 Cypress.Commands.add('editNote', (note, newValue) => {
  cy.intercept('PUT', '**/notes/*').as('editNote')
  cy.contains('.list-group-item', note).click()
  cy.get('#content').clear().type(newValue)
  cy.contains('button', 'Save').click()
  cy.wait('@editNote').its('response.statusCode]').should('be.equal', 200)
 })

 Cypress.Commands.add('deleteNote', note => {
  cy.intercept('DELETE', '**/notes/*').as('deleteNote')
  cy.contains('.list-group-item', note)
    .should('be.visible')
    .click()
  cy.contains('button', 'Delete').click()
  cy.wait('@deleteNote').its('response.statusCode]').should('be.equal', 200)
 })
