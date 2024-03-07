//TODO: Test if upload button is disabled if a selected file is not video
describe("Upload", () => {
  it("successfully shows the error message with empty input", () => {
    cy.visit("/");
    // cy.get('[data-cy="data-cy-url-input"]').type(" ");
    cy.get('[data-cy="data-cy-upload-button"]').click();
    // cy.contains("Please enter a valid video URL").should("exist");
  });


});
