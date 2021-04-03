import {
  screen,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";
import { LaunchesPastDocument } from "../generated/graphql";
import { GraphQLError } from "graphql";
import { TestData } from "./testData";
import { text_truncate } from "../utils";
import { Visit } from "./testUtils";

describe("Website Banner", () => {
  test("Should display SpaceX Brand and Github Repo Links", () => {
    Visit("/");

    let banner = screen.getByRole("banner");
    expect(
      within(banner).getByRole("link", { name: /spacex/i })
    ).toBeInTheDocument();
    expect(
      within(banner).getByRole("link", { name: /github/i })
    ).toBeInTheDocument();
  });
});

describe("Launch Index Page", () => {
  test("Should display website banner", () => {
    Visit("/");

    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  test("When page is loaded, should display loading panel", () => {
    Visit("/");

    let loadingPanel = screen.getByRole("loading-panel");
    expect(loadingPanel).toBeInTheDocument();
    expect(within(loadingPanel).getByText(/loading.../i)).toBeInTheDocument();
    expect(within(loadingPanel).getByRole("progressbar")).toBeInTheDocument();
  });

  test("WHEN there is a network error communicating with the graphql server, Should display error After displaying loading msg", async () => {
    const mockData = [
      {
        request: {
          query: LaunchesPastDocument,
        },
        error: new Error("some random error!"),
      },
    ];

    Visit("/", mockData);

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
      within(errorPanel).getByText(/"Graphql server responded with an error!"/i)
    ).toBeInTheDocument();
  });

  test("WHEN api server responds successfully, Should display a card for each launch", async () => {
    const mockData = [
      {
        request: {
          query: LaunchesPastDocument,
        },
        result: TestData,
      },
    ];

    Visit("/", mockData);

    await waitForElementToBeRemoved(screen.getByRole("loading-panel"));

    let dataPanel = screen.getByRole("data-panel");
    expect(dataPanel).toBeInTheDocument();
    const launchCard = within(dataPanel).getAllByRole("launch-card");
    expect(launchCard).toHaveLength(3);
    expect(
      within(launchCard[0]).getByRole("launch-card-header")
    ).toHaveTextContent(TestData.data.launchesPast[0].mission_name);
    expect(
      within(launchCard[1]).getByRole("launch-card-header")
    ).toHaveTextContent(TestData.data.launchesPast[1].mission_name);
    expect(
      within(launchCard[2]).getByRole("launch-card-header")
    ).toHaveTextContent(TestData.data.launchesPast[2].mission_name);
  });

  test("Launch Card header Should display mission name, launch date and avatar", async () => {
    const mockData = [
      {
        request: { query: LaunchesPastDocument },
        result: { data: { launchesPast: [TestData.data.launchesPast[0]] } },
      },
    ];

    Visit("/", mockData);

    await waitForElementToBeRemoved(screen.getByRole("loading-panel"));

    let cardHeader = screen.getByRole("launch-card-header");
    expect(cardHeader).toHaveTextContent(
      TestData.data.launchesPast[0].mission_name
    );
    expect(cardHeader).toHaveTextContent(
      new Date(TestData.data.launchesPast[0].launch_date_utc).toDateString()
    );
    expect(within(cardHeader).getByRole("img")).toHaveAttribute(
      "src",
      TestData.data.launchesPast[0].links.mission_patch_small
    );
  });

  test("Launch Card header Should display a clickable image link for navigating to launch details", async () => {
    const mockData = [
      {
        request: { query: LaunchesPastDocument },
        result: { data: { launchesPast: [TestData.data.launchesPast[0]] } },
      },
    ];

    Visit("/", mockData);

    await waitForElementToBeRemoved(screen.getByRole("loading-panel"));

    let card = screen.getByRole("launch-card");

    const linkToDetails = within(card).getByRole("link", {
      name: TestData.data.launchesPast[0].mission_name,
    });
    expect(linkToDetails).toHaveAttribute(
      "href",
      `/${TestData.data.launchesPast[0].id}`
    );
    expect(within(linkToDetails).getByRole("img")).toHaveAttribute(
      "src",
      TestData.data.launchesPast[0].links.flickr_images[0]
    );
  });

  test("Launch Card header Should display truncated launch details", async () => {
    const mockData = [
      {
        request: { query: LaunchesPastDocument },
        result: { data: { launchesPast: [TestData.data.launchesPast[0]] } },
      },
    ];

    Visit("/", mockData);

    await waitForElementToBeRemoved(screen.getByRole("loading-panel"));

    let card = screen.getByRole("launch-card");

    expect(
      within(card).getByText(
        text_truncate(TestData.data.launchesPast[0].details)
      )
    ).toBeInTheDocument();
  });

  test("Launch Card header Should display media Links", async () => {
    const mockData = [
      {
        request: { query: LaunchesPastDocument },
        result: { data: { launchesPast: [TestData.data.launchesPast[0]] } },
      },
    ];

    Visit("/", mockData);

    await waitForElementToBeRemoved(screen.getByRole("loading-panel"));

    expect(screen.getByRole("link", { name: "video" })).toHaveAttribute(
      "href",
      TestData.data.launchesPast[0].links.video_link
    );
    expect(screen.getByRole("link", { name: "article" })).toHaveAttribute(
      "href",
      TestData.data.launchesPast[0].links.article_link
    );
    expect(screen.getByRole("link", { name: "reddit" })).toHaveAttribute(
      "href",
      TestData.data.launchesPast[0].links.reddit_launch
    );
    expect(screen.getByRole("link", { name: "wikipedia" })).toHaveAttribute(
      "href",
      TestData.data.launchesPast[0].links.wikipedia
    );
  });
});
