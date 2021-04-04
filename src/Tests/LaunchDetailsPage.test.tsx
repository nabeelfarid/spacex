import {
  screen,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";
import {
  LaunchDetailsDocument,
  LaunchesPastDocument,
} from "../generated/graphql";
import { GraphQLError } from "graphql";
import { TestData_LaunchDetails } from "./testData";
import { Visit } from "./testUtils";

const launchId = TestData_LaunchDetails.data.launch.id;
const url = `/${launchId}`;

describe("Launch Details Page", () => {
  test("Should display website banner", () => {
    Visit(url);

    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  test("When page is loaded, should display loading panel", () => {
    Visit(url);

    let loadingPanel = screen.getByRole("loading-panel");
    expect(loadingPanel).toBeInTheDocument();
    expect(within(loadingPanel).getByText(/loading.../i)).toBeInTheDocument();
    expect(within(loadingPanel).getByRole("progressbar")).toBeInTheDocument();
  });

  test("WHEN there is a network error communicating with the graphql server, Should display error After displaying loading msg", async () => {
    const mockData = [
      {
        request: {
          query: LaunchDetailsDocument,
          variables: {
            id: launchId,
          },
        },
        error: new Error("some random error!"),
      },
    ];

    Visit(url, mockData);

    await waitForElementToBeRemoved(screen.getByRole("loading-panel"));

    let errorPanel = screen.getByRole("error-panel");
    expect(errorPanel).toBeInTheDocument();
    expect(within(errorPanel).getByText("ERROR:")).toBeInTheDocument();
    expect(
      within(errorPanel).getByText(/"message":"some random error!"/i)
    ).toBeInTheDocument();
  });

  test("WHEN there is an error response from graphql server, Should display error After displaying loading msg", async () => {
    const mockData = [
      {
        request: {
          query: LaunchesPastDocument,
        },
        result: {
          errors: [new GraphQLError("Graphql server responded with an error!")],
        },
      },
    ];

    Visit("/", mockData);

    await waitForElementToBeRemoved(screen.getByRole("loading-panel"));

    let errorPanel = screen.getByRole("error-panel");
    expect(errorPanel).toBeInTheDocument();
    expect(within(errorPanel).getByText("ERROR:")).toBeInTheDocument();
    expect(
      within(errorPanel).getByText(
        /"graphQLErrors":\[{"message":"Graphql server responded with an error!"}\]/i
      )
    ).toBeInTheDocument();
  });
});
