// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const weatherData = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${req.query.lat}&lon=${req.query.lon}&appid=${process.env.API_KEY}`
  ).then((res) => res.json());
  
  const airQualityData = await fetch(
    `http://api.openweathermap.org/data/2.5/air_pollution?lat=${req.query.lat}&lon=${req.query.lon}&appid=${process.env.API_KEY}`
  ).then((res) => res.json());

  const data = {
    weather: weatherData,
    airQuality: airQualityData,
  }

  res.json(data);
}
