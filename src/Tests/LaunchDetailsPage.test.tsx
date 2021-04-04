import {
  screen,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";
import { LaunchDetailsDocument } from "../generated/graphql";
import { GraphQLError } from "graphql";
import { TestData_LaunchDetails } from "./testData";
import { Visit } from "./testUtils";
import escapeStringRegexp from "escape-string-regexp";

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
          query: LaunchDetailsDocument,
          variables: {
            id: launchId,
          },
        },
        result: {
          errors: [new GraphQLError("Graphql server responded with an error!")],
        },
      },
    ];

    Visit(url, mockData);

    await waitForElementToBeRemoved(screen.getByRole("loading-panel"));

    let errorPanel = screen.getByRole("error-panel");
    expect(errorPanel).toBeInTheDocument();
    expect(within(errorPanel).getByText("ERROR:")).toBeInTheDocument();
    expect(
      within(errorPanel).getByText(
        new RegExp(
          escapeStringRegexp(
            `"graphQLErrors":[{"message":"Graphql server responded with an error!"}]`
          )
        )
      )
    ).toBeInTheDocument();
  });

  test("WHEN api server responds successfully, Should display Mission Name in the header", async () => {
    const mockData = [
      {
        request: {
          query: LaunchDetailsDocument,
          variables: {
            id: launchId,
          },
        },
        result: TestData_LaunchDetails,
      },
    ];

    Visit(url, mockData);

    await waitForElementToBeRemoved(screen.getByRole("loading-panel"));

    expect(
      screen.getByRole("heading", {
        name: new RegExp(
          escapeStringRegexp(TestData_LaunchDetails.data.launch.mission_name)
        ),
      })
    ).toBeInTheDocument;
  });

  test("WHEN api server responds successfully, Should display summary card", async () => {
    const mockData = [
      {
        request: {
          query: LaunchDetailsDocument,
          variables: {
            id: launchId,
          },
        },
        result: TestData_LaunchDetails,
      },
    ];

    Visit(url, mockData);

    await waitForElementToBeRemoved(screen.getByRole("loading-panel"));

    let summaryCard = screen.getByTestId("summary-card");
    expect(
      within(summaryCard).getByText(
        TestData_LaunchDetails.data.launch.launch_site.site_name,
        { exact: false }
      )
    ).toBeInTheDocument();
    expect(
      within(summaryCard).getByText(
        TestData_LaunchDetails.data.launch.launch_site.site_name_long,
        { exact: false }
      )
    ).toBeInTheDocument();
    expect(
      within(summaryCard).getByText(
        new Date(
          TestData_LaunchDetails.data.launch.launch_date_utc
        ).toDateString(),
        { exact: false }
      )
    ).toBeInTheDocument();
    expect(
      within(summaryCard).getByText(
        TestData_LaunchDetails.data.launch.launch_success
          ? "Success"
          : "Failed",
        { exact: false }
      )
    ).toBeInTheDocument();
    expect(
      within(summaryCard).getByText(
        TestData_LaunchDetails.data.launch.rocket.rocket_name,
        { exact: false }
      )
    ).toBeInTheDocument();
    expect(
      within(summaryCard).getByText(
        TestData_LaunchDetails.data.launch.rocket.rocket_type,
        { exact: false }
      )
    ).toBeInTheDocument();
  });

  test("WHEN api server responds successfully, Should display details card", async () => {
    const mockData = [
      {
        request: {
          query: LaunchDetailsDocument,
          variables: {
            id: launchId,
          },
        },
        result: TestData_LaunchDetails,
      },
    ];

    Visit(url, mockData);

    await waitForElementToBeRemoved(screen.getByRole("loading-panel"));

    let detailsCard = screen.getByTestId("launch-details-card");
    expect(
      within(detailsCard).getByText(
        new RegExp(
          escapeStringRegexp(TestData_LaunchDetails.data.launch.details)
        )
      )
    ).toBeInTheDocument();
  });
});
