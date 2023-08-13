const { OAuth2Client } = require("google-auth-library");

async function getUser(accessToken) {
  try {
    const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    const client = new OAuth2Client(CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: accessToken,
      audience: CLIENT_ID,
    });
    return ticket.getPayload();
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { getUser };
