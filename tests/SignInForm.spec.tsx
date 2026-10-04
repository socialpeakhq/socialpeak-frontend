import { afterEach, describe, expect, it } from "@jest/globals";
import { act } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { render } from "@/utils/test-utils";
import SignInForm from "@/pages/login/SignInForm";
import useAuthStore from "@/stores/useAuthStore";

// jest.setup.ts mocks next/navigation with one shared router object.
const router = useRouter();

afterEach(() => {
  act(() => {
    useAuthStore.getState().clearAuthentication();
  });
});

describe("SignInForm", () => {
  it("redirects to the app when a remembered session exists", () => {
    act(() => {
      useAuthStore.getState().setAuthentication("access", "refresh", true);
    });

    render(<SignInForm />);

    expect(router.replace).toHaveBeenCalledWith("/app/dashboard");
  });

  it("shows the form when there is no session", () => {
    render(<SignInForm />);

    expect(router.replace).not.toHaveBeenCalled();
  });
});
