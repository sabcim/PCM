/// <reference types="cypress" />

describe("Testing the search engine", () => {

    it("Visit PCM", () => {

        cy.visit("localhost:3000")

        cy.get("#searchBar").type("Blastoise")
        cy.get('#searchBar').type('{enter}')

        cy.url().should('contain', '/Blastoise')
    })
})