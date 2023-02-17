const calendarId = process.env.GOOGLE_CALENDAR_ID;
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN as string;
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;

// TRY TO REDUCE REFRESHING ACCESS TOKENS
export async function getGoogleAccessToken() {
  // from https://developers.google.com/identity/protocols/OAuth2WebServer#offline
  const refresh_url = "https://www.googleapis.com/oauth2/v4/token";
  console.log(REFRESH_TOKEN);
  const post_body = `grant_type=refresh_token&client_id=${encodeURIComponent(
    CLIENT_ID
  )}&client_secret=${encodeURIComponent(
    CLIENT_SECRET
  )}&refresh_token=${encodeURIComponent(REFRESH_TOKEN)}`;

  let refresh_request = {
    body: post_body,
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
    }),
  };

  const res = await fetch(refresh_url, refresh_request);
  const data = await res.json();
  return data.access_token;
}

// a quick and dirty function to list some Drive files using the newly acquired access token
export async function getCalendar(accessToken: string) {
  const drive_url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}`;
  let drive_request = {
    method: "GET",
    headers: new Headers({
      Authorization: "Bearer " + accessToken,
    }),
  };

  const res = await fetch(drive_url, drive_request);
  const data = res.json();

  return data;
}

export const insertEvent = async ({ accessToken = "", event = {} }) => {
  const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`;
  let request = {
    method: "POST",
    headers: new Headers({
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(event),
  };

  const res = await fetch(url, request);
  const data = res.json();

  return data;
};
