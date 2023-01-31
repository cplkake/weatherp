// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${req.query.search}&limit=5&appid=${process.env.API_KEY}`
  ).then((res) => res.json());

  res.json(data);
}
