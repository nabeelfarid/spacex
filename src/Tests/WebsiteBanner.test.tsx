import { screen, within } from "@testing-library/react";
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
