const { func } = require("prop-types");

describe("bloglist", function() {
  beforeEach(function() {
    cy.visit("http://localhost:3000");
  });

  describe("login", function() {
    it("is login form available", function() {
      cy.contains("Login form");
    });

    it("succeeds with correct credentials", function() {
      cy.get("#username").type("boskela");
      cy.get("#password").type("boskela");
      cy.get("#login-button").click()

      cy.contains("User boskelejmon is logged in");
    });

    it("fails with wrong credentials", function() {
      cy.get("#username").type(" ");
      cy.get("#password").type(" ");
      cy.get("#login-button").click()

      cy.contains("Invalid username or password");
    });

  });
});
