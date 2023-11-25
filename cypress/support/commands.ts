/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
        getByClass(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>
    }
}

Cypress.Commands.add("getByClass", (selector) => {
    return cy.get(`[class*=${selector}]`)
})