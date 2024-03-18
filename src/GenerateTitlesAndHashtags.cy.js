import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GenerateTitlesAndHashtags } from "./GenerateTitlesAndHashtags";

describe("<GenerateTitlesAndHashtags />", () => {
  it("renders", () => {
    const queryClient = new QueryClient();

    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <QueryClientProvider client={queryClient}>
        <GenerateTitlesAndHashtags />
      </QueryClientProvider>
    );
  });
});
