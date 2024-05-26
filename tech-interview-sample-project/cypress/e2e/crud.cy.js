describe('Notes', () => {
  beforeEach(() => {
    cy.create()
  })


  it('edits and delete a note', () => {
    cy.get('.list-group').contains('My note').click()
    cy.get('#content').type(' updated')
    cy.contains('Save').click()
    cy.get('.list-group').should('contain', 'My note updated')
    cy.get('.list-group:contains(My note updated)').should('be.visible')
    cy.get('.list-group').contains('My note updated').click()
    cy.contains('Delete').click()
    cy.get('.list-group:contains(My note updated)').should('not.exist')

  })

 
})
