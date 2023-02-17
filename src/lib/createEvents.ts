import { getGoogleAccessToken } from "./googleAuth";
import { v4 as uuid } from "uuid";

const calendarId = process.env.GOOGLE_CALENDAR_ID as string;

interface Event {
  summary: string;
  location?: string;
  description?: string;
  start: {
    dateTime: string;
  };
  end: {
    dateTime: string;
  };
  attendees: { email: string }[];
  conferenceData?: {
    createRequest: {
      conferenceSolutionKey: {
        type: string;
      };
      requestId: string;
    };
  };
}

export const createEvents = async ({ events }: { events: Event[] }) => {
  const accessToken = await getGoogleAccessToken();

  const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?conferenceDataVersion=1`;
  let request = {
    method: "POST",
    headers: new Headers({
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    }),
  };

  const insertEvent = async (event: any) => {
    const res = await fetch(url, {
      ...request,
      body: JSON.stringify({
        ...event,
        conferenceData: {
          createRequest: {
            conferenceSolutionKey: {
              type: "hangoutsMeet",
            },
            requestId: uuid(),
          },
        },
      }),
    });
    return await res.json();
  };

  const data = await Promise.all(events.map(insertEvent));
  return data;
};
