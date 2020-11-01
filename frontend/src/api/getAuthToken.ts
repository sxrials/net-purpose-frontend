export const getAuthToken = async (username: string, password: string) => {
  const tokenRequestPayload = new URLSearchParams();
  tokenRequestPayload.append("username", username);
  tokenRequestPayload.append("password", password);

  const tokenResponse = await fetch("/api/v1/login/access-token/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: tokenRequestPayload,
  });

  const { access_token: token } = await tokenResponse.json();

  return token;
};
