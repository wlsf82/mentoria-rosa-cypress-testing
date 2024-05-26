describe('Notes', () => {
  beforeEach(() => {
    // Arrange
    cy.login()
    cy.visit('/')
  })

  it('CRUDs (Create, Read, Update, and Delete) a note', () => {
    const noteDescription = 'My note'
    const newNoteDescription = 'My note updated'

    // Act
    cy.createNote(noteDescription)

    // Assert
    cy.contains('.list-group-item', noteDescription).should('be.visible')

    // Act
    cy.editNote(noteDescription, newNoteDescription)

    // Assert
    cy.contains('.list-group-item', newNoteDescription).should('be.visible')

    // Act
    cy.deleteNote(newNoteDescription)

    // Assert
    cy.get('.list-group').should('be.visible')
    cy.contains('.list-group-item', newNoteDescription).should('not.exist')
  }) 
})
