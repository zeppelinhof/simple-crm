describe('Test Simple CRM', () => {
  it('Add user and delete user', () => {
    cy.visit('http://localhost:4200/')

    cy.contains("User").click()
    cy.get("mat-toolbar-row").contains("Simple CRM")
    cy.get('[class*="add-user-button"]').click()
    cy.get("input").eq(1).type("Hans")
    cy.get("input").eq(2).type("Testfelder")
    cy.get("input").eq(3).type("hansi@web.de")
    cy.get("mat-datepicker-toggle").click()
    cy.get('[class*="mat-calendar-body-cell-content"]').eq(15).click()
    cy.get("input").eq(5).type("Teststreet 17")
    cy.get("input").eq(6).type("123456")
    cy.get("input").eq(7).type("Testtown")
    cy.get('[class*="mdc-button__label"]').contains("Save").click()
    cy.contains("User")
    cy.contains("Testfelder").should("exist").click()
    cy.url().should('include', '/user/')
    cy.contains("123456 Testtown")
    cy.get('[class*="pin-right-upper-corner"]').eq(0).click()
    cy.get("button").eq(3).click()
    cy.get("Testfelder").should("not.exist")
  })


  // cy.get('.action-email').should('have.value', 'markusgede@email.com')
})