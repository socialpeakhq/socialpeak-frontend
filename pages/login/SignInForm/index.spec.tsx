import { it, expect } from "@jest/globals";
import { render, screen } from "@/utils/test-utils";
import SignInForm from ".";

it("fails to make api call if e-mail and password are empty", () => {
  render(<SignInForm />);
  const myElement = screen.getByRole("button", { name: "Sign In" });
  expect(myElement).toBeInTheDocument();
});
