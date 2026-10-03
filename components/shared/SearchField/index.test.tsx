import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchField from "./index";
import { describe, expect, it, jest } from "@jest/globals";

describe("SearchField", () => {
  it("shows the current searchValue", () => {
    render(<SearchField searchValue="hello" setSearchValue={() => {}} />);

    expect(screen.getByRole("textbox")).toHaveValue("hello");
  });

  it("falls back to a default placeholder", () => {
    render(<SearchField searchValue="" setSearchValue={() => {}} />);

    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
  });

  it("uses a custom placeholder when given one", () => {
    render(
      <SearchField
        searchValue=""
        setSearchValue={() => {}}
        placeholder="Search posts"
      />,
    );

    expect(screen.getByPlaceholderText("Search posts")).toBeInTheDocument();
  });

  it("calls setSearchValue with what the user typed", async () => {
    const setSearchValue = jest.fn();
    render(<SearchField searchValue="" setSearchValue={setSearchValue} />);

    await userEvent.type(screen.getByRole("textbox"), "cat");

    // Each keystroke fires onChange with the value at that point in time —
    // this is a controlled input, so the component itself never accumulates text.
    expect(setSearchValue).toHaveBeenCalledTimes(3);
    expect(setSearchValue).toHaveBeenNthCalledWith(1, "c");
    expect(setSearchValue).toHaveBeenNthCalledWith(2, "a");
    expect(setSearchValue).toHaveBeenNthCalledWith(3, "t");
  });
});
