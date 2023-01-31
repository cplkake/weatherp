interface AirQualityData {
  coord: {
    lat: number;
    lon: number;
  };
  list: [
    {
      dt: number;
      main: {
        aqi: 1 | 2 | 3 | 4 | 5;
      };
      components: {
        co: number;
        no: number;
        no2: number;
        o3: number;
        s02: number;
        pm2_5: number;
        pm10: number;
        nh3: number;
      }
    }
  ]
}

export default function AirQualityContainer({
  airQualityData
}: {
  airQualityData: AirQualityData
}) {
  const AQI = airQualityData.list[0].main.aqi;
  const aqiDescription = {
    1: { 
      title: "Very Low Health Risk",
      paragraph: "good",
    },
    2: { 
      title: "Low Health Risk",
      paragraph: "fair",
    },
    3: { 
      title: "Medium Health Risk",
      paragraph: "moderate",
    },
    4: { 
      title: "High Health Risk",
      paragraph: "poor",
    },
    5: { 
      title: "Very High Health Risk",
      paragraph: "very poor",
    },
  }

   return (
    <div className="w-full mx-auto sm:container rounded-2xl p-3 sm:px-4 backdrop-blur-md bg-gray-500/10 shadow-md">
      <p className="text-xs text-white/50 pb-0.5">AIR QUALITY</p>
      <div className="text-white">
        <h3 className="mb-0.5 text-lg">{`${AQI} - ${aqiDescription[AQI].title}`}</h3>
        <p className="text-sm text-white/90 mb-2">{`Air quality is ${aqiDescription[AQI].paragraph} today.`}</p>
        <input type="range" disabled value={(AQI-1)/4*100} className="w-full appearance-none rounded-lg h-1 bg-gradient-to-r from-blue-500 via-yellow-400 to-red-900" />
      </div>
    </div>
  )
}