import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import { act } from "@testing-library/react";
import { render, screen, waitFor } from "@/utils/test-utils";
import useAuthStore from "@/stores/useAuthStore";
import { useAuthDetails } from "./useAuthDetails";

const user = { id: 1, full_name: "Jane Doe", email: "jane@example.com" };

const authDetailsHandler = jest.fn(({ request }: { request: Request }) =>
  request.headers.get("Authorization") === "Bearer valid-token"
    ? HttpResponse.json({ statusCode: 200, data: user })
    : new HttpResponse(null, { status: 401 }),
);

const server = setupServer(
  http.get(
    `${process.env.NEXT_PUBLIC_BACKEND_API}auth/auth-details`,
    authDetailsHandler,
  ),
);

beforeAll(() => server.listen());
afterAll(() => server.close());

afterEach(() => {
  authDetailsHandler.mockClear();
  act(() => {
    useAuthStore.getState().clearAuthentication();
  });
});

function AuthDetailsProbe() {
  const { data } = useAuthDetails();
  return <p>{data?.full_name ?? "no user"}</p>;
}

describe("useAuthDetails", () => {
  it("loads the user with the stored token as the Bearer header", async () => {
    act(() => {
      useAuthStore.getState().setAuthentication("valid-token", "refresh");
    });

    render(<AuthDetailsProbe />);

    await waitFor(() => expect(screen.getByText("Jane Doe")).toBeTruthy());
    expect(authDetailsHandler).toHaveBeenCalledTimes(1);
  });

  it("does not call the API when there is no token", () => {
    render(<AuthDetailsProbe />);

    expect(screen.getByText("no user")).toBeTruthy();
    expect(authDetailsHandler).not.toHaveBeenCalled();
  });
});
