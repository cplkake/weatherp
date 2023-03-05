# Weatherp

Weatherp is a weather app powered by the OpenWeather API.

## Tech

Weatherp makes use of the following:
- TypeScript
- Next.js framework
- Tailwind CSS
- Headless UI


## Demo

A working demo of the application can be found here: https://weatherp.vercel.app 

## Description

### Features

* A search palette (opened by pressing "/") for locations
* Search suggestions when user pauses their input
* Automatic refresh of displayed data on page focus
* Dynamic day/night background based on the location being displayed
* Celsius/Fahrenheit toggle

### Data displayed
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

## Screenshots

### Dynamic day/night background

![sunrise-background](https://user-images.githubusercontent.com/42398320/222928858-d13740b1-d45c-47f0-a9f9-b77fd70f1ced.png) 

![night-background](https://user-images.githubusercontent.com/42398320/222928901-2c74d4df-b83b-4d9a-8954-e26f16cc50db.png) 

### Search Palette with location suggestions
![search-palette](https://user-images.githubusercontent.com/42398320/222928952-b00adf00-dd93-4d83-8ad7-e33a0295c9e1.png)
