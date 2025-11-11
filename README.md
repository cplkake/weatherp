# Weatherp

Weatherp is a weather app built with Next.js 15 powered by the Open-Meteo API.

## Features

* **Automatic location detection** using the user’s IP address for a personalized weather view on load
* **Command Palette (⌘ + K / Ctrl + K)** for quick city search: fully keyboard-accessible and built with `cmdk`
* **Debounced search suggestions**: queries trigger after a short pause to reduce API calls
* **Live data refresh** whenever the tab regains focus, keeping forecasts up to date automatically
* **Dynamic day/night theming** based on the local time of the displayed location
* **Temperature unit toggle (°C / °F)** with persisted user preference


## Demo

A working demo of the application can be found here: https://weatherp.vercel.app 

## Description

### Technical Highlights

* Migrated from **Next.js Pages Router → App Router (Next 15)** for server components and better data-fetching patterns
* **Server-first architecture**:
  * Server components (page.tsx) handle initial data fetching
  * The `/api` layer fetches from external APIs, validates the payload with Zod schemas, transforms it, and sends only clean, typed data to the client
* **Client component** (WeatherApp) use SWR for revalidation and focus-based updates
* **Reusable fetchers** (fetchWeather, fetchSuggestions, fetchLocationFromIp) provide type-safe access to the app’s internal API endpoints, abstracting away external services
* **Schema validation** with Zod ensures resilience against malformed or unexpected external API data
* **Transformer functions** on the server reduce payload size and move business logic out of the UI layer
* **Memoized hooks** like useBackgroundColour minimize re-renders while creating a dynamic visual experience
* API routes that implement **caching and graceful degradation** for performance and reliability while allowing noncritical data failures to fail silently without breaking the app


### Data displayed
* Current conditions:
  * temperature, weather description, and the day's high and low
* Hourly forecast (for the next 24 hours):
  * weather icon and temperature
  * Sunrise/sunset times
* 7-Day forecast:
  * weather icon
  * daily temperature range relative to the highs and lows of the next 7 days
* Current air quality indicator
  * based on 15-minutely weather model data
  * uses the United States Air Quality Index (AQI), with values ranging from 0-50 (good), 51-100 (moderate), 101-150 (unhealthy for sensitive groups), 151-200 (unhealthy), 201-300 (very unhealthy) and 301-500 (hazardous)
* Feels like temperature
  * measurement of the current temperature accounting for human perception of weather
* Humidity level

## Screenshots

### Dynamic day/night background
<img width="1270" height="655" alt="Weatherp app displaying weather information for Tokyo with a daytime gradient background" src="https://github.com/user-attachments/assets/ca81e6d4-1495-47c2-b3a3-4ae603943c75" />

<img width="1270" height="653" alt="Weatherp app displaying weather information for Toronto with a sunset gradient background" src="https://github.com/user-attachments/assets/2dd3bbf8-2cd4-4908-b941-3ff5b72731aa" />

<img width="1270" height="656" alt="Weatherp app displaying weather information for Kathmandu with a nighttime gradient background" src="https://github.com/user-attachments/assets/1f4e2616-4acb-4655-91d9-e3641640f88f" />


### Search Palette with location suggestions
<img width="1269" height="652" alt="Weatherp app with the search palette open and displaying location suggestions" src="https://github.com/user-attachments/assets/3c97536d-c992-44e6-aab2-3d3bcc8eb7af" />
