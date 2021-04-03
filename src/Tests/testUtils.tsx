import { render } from "@testing-library/react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import App from "../Components/App";
import { MemoryRouter } from "react-router";

export const Visit = (url: string, mockData: MockedResponse[] = []) => {
  render(
    <MockedProvider mocks={mockData} addTypename={false}>
      <MemoryRouter initialEntries={[url]}>
        <App />
      </MemoryRouter>
    </MockedProvider>
  );
};
