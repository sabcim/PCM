/// <reference types="cypress" />

describe("Testing user sign in, sign out, and modals", () => {

    it("Visit PCM", () => {

        cy.visit("localhost:3000")

        // Open modal
        cy.get("#sign-in-trigger").click()

        // Make sure it's visible
        cy.get("#modal-sign-in").should("have.css", "display", "block")

        // Type email and password to sign into fake account
        cy.get("#modal-sign-in").get("#email").type("theonlybaconsandwich@gmail.com")
        cy.get("#modal-sign-in").get("#password").type("password")
        cy.get("#modal-sign-in").get("#password").type("{enter}")

        // Close modal
        cy.get("#modal-sign-up").get("#close-modal-btn").click()

        // Make sure it's hidden
        cy.get("#modal-sign-in").should("have.css", "display", "none")

        // cy.get("#create-post-trigger").click()

        // cy.get("#modal-create-post").should("have.css", "display", "block")

        // cy.get("#modal-create-post").should("have.css", "display", "block")
        // cy.get("#modal-create-post").get("#close-modal-btn").click()
        // cy.get("#modal-create-post").should("have.css", "display", "none")

        const dropDown = cy.get("#account-dropdown")

        dropDown.click()
        dropDown.get("#sign-out").click()
    })
})