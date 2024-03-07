describe("Result", () => {
  it("successfully loads the results of all fields", () => {
    cy.visit("/");
    cy.get('[data-cy="data-cy-generate-button"]').click({ force: true });
    cy.contains("Topic");
    cy.contains("Title");
    cy.contains("Hashtags");
  });

  it("dynamically changes the results based on (un)checking each field", () => {
    cy.visit("/");
    cy.get('[data-cy="data-cy-checkbox-topic"]').click({ force: true });
    cy.get('[data-cy="data-cy-generate-button"]').click({ force: true });
    cy.contains("Topic").should("not.exist");
    cy.contains("Title");
    cy.contains("Hashtags");
  });

  it("disables generate button when all checkboxes are unchecked", () => {
    cy.visit("/");
    cy.get('[data-cy="data-cy-checkbox-topic"]').click({ force: true });
    cy.get('[data-cy="data-cy-checkbox-title"]').click({ force: true });
    cy.get('[data-cy="data-cy-checkbox-hashtag"]').click({ force: true });
    cy.get('[data-cy="data-cy-generate-button"]').click({ force: true });
    cy.contains("Please select one of the checkboxes");
  });
});
