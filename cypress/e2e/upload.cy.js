import { toBeDisabled } from "@testing-library/jest-dom/matchers";

describe("Upload", () => {
  it("successfully shows the upload button is initially disabled", () => {
    cy.visit("/");
    cy.get('[data-cy="data-cy-upload-button"]').should("be.disabled");
  });
});
