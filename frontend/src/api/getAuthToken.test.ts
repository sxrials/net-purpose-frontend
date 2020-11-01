import { getAuthToken } from "./getAuthToken";

describe("getAuthToken", () => {
  it("calls the login endpoint", async () => {
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ rates: { CAD: 1.42 } }),
      })
    );

    getAuthToken("someUsername", "somePassword");

    expect(global.fetch).toHaveBeenCalledWith("/api/v1/login/access-token/");
  });
});
