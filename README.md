# Weatherp

Weatherp is a Next.js app powered by the OpenWeather API.

## Description

The app currently has the following features:
* Command Palette for searching locations
* Search suggestions when user pauses their input
* Auto refresh of data upon page being focused on
* Dynamic day/night background based on the location being displayed
* Celsius/Fahrenheit toggle

Data shown:
* Current temperature, weather description, and the high and low for the day
* Hourly weather forecast (for the next 24 hours) 
  * weather icon, probability of precipitation, and temperature
  * Sunrise/sunset times
* 8 day forecast 
  * weather icon
  * probability of precipitation
  * daily temperature range relative to the highs and lows of the next 8 days
* Current air quality indicator
  * Air Quality Index on a scale from 1 to 5 with 5 being the worst
* Feels like temperature
  * measurement of the current temperature accounting for human perception of weather
* Humidity level