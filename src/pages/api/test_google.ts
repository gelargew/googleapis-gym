// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createEvents } from "@/lib/createEvents";
import { getCalendar, getGoogleAccessToken } from "@/lib/googleAuth";
import type { NextApiRequest, NextApiResponse } from "next";

const dummy = {
  summary: "Google I/O 2015",
  location: "800 Howard St., San Francisco, CA 94103",
  description: "A chance to hear more about Google's developer products.",
  start: {
    dateTime: "2023-02-18T09:00:00-07:00",
  },
  end: {
    dateTime: "2023-02-19T17:00:00-07:00",
  },
  attendees: [
    { email: "gelar@plabs.id" },
    { email: "gelargew@gmail.com", resource: true },
  ],
};
const dummy2 = {
  summary: "Google I/O 2015",
  location: "800 Howard St., San Francisco, CA 94103",
  description: "A chance to hear more about Google's developer products.",
  start: {
    dateTime: "2023-02-18T09:00:00-07:00",
  },
  end: {
    dateTime: "2023-02-19T17:00:00-07:00",
  },
  attendees: [{ email: "gelargew@gmail.com", resource: true }],
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const body = JSON.parse(req.body);
  const events = await createEvents({ events: [dummy, dummy2] });
  console.log(events);
  res.status(200).json(events);
}
