import { Switch } from "@headlessui/react";
import { TempUnits } from "@/types";


export default function TempUnitSelector({
  tempUnit,
  setTempUnit,
}: {
  tempUnit: TempUnits;
  setTempUnit: React.Dispatch<React.SetStateAction<TempUnits>>;
}) {
  const isCelsius = tempUnit === TempUnits.Celsius;

  function updateCurrentTemperatureUnit(isCelsius: boolean) {
    if (isCelsius) setTempUnit(TempUnits.Celsius);
    else setTempUnit(TempUnits.Fahrenheit);
  }
  
  return (
    <div className="flex gap-1 mt-14 absolute top-0 left-[75%] sm:left-2/3">
      <Switch
        checked={isCelsius}
        onChange={updateCurrentTemperatureUnit}
        className='bg-gray-400/30 relative inline-flex h-11 w-6 items-center rounded-full'
      >
        <span className="sr-only">Set temperature unit to celsius</span>
        <span
          className={`${
            isCelsius ? 'translate-x-1 translate-y-2.5' : 'translate-x-1 -translate-y-2.5'
          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
        />
      </Switch>
      <div className="text-xs ">
        {
          // TODO: it's better to use flexbox on container rather than using padding on child to make both child distant
          //  eg: display: flex;
          //      flex-direction: column;
          //      justify-content: space-between;
        }
        <p className={`pb-3 ${!isCelsius ? 'text-white' : 'text-white/60'}`}>{'\u00B0F'}</p>
        <p className={`${isCelsius ? 'text-white' : 'text-white/60'}`}>{'\u00B0C'}</p>
      </div>
    </div>
  )
}