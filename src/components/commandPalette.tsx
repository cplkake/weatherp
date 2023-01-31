import { useEffect, useState, Fragment } from "react";
import { Dialog, Combobox, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

type ResultsType = {
  name: string;
  local_names?: { [key: string]: string };
  lat: number;
  lon: number;
  country: string;
  state?: string;
};

type Location = {
  lat: number;
  lon: number;
  name: string;
  country: string;
};

export default function CommandPalette({
  displayText,
  onChange,
  searchSuggestions,
  setTargetLocation,
  isOpen,
  setIsOpen,
}: {
  displayText: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchSuggestions: ResultsType[];
  setTargetLocation: React.Dispatch<React.SetStateAction<Location>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  useEffect(() => {
    function onKeydown(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(!isOpen);
      }
    }
    window.addEventListener("keydown", onKeydown);
    return () => {
      window.removeEventListener("keydown", onKeydown);
    };
  }, [isOpen]);

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        onClose={setIsOpen}
        className="fixed inset-0 p-4 pt-16 overflow-y-auto"
      >
        <Transition.Child
          enter="duration-300 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-200 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          as={Fragment}
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-500/75" />
        </Transition.Child>
        <Transition.Child
          enter="duration-300 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-200 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
          as={Fragment}
        >
          <Combobox
            onChange={(location: Location) => {
              setIsOpen(false);
              setTargetLocation(location);
            }}
            as="div"
            className="relative bg-white max-w-xl mx-auto rounded-xl shadow-2xl ring-1 ring-black/5 divide-y divide-gray-100 overflow-hidden"
          >
            <div className="flex items-center px-4">
              <MagnifyingGlassIcon className="h-6 w-6 text-gray-500" />
              <Combobox.Input
                onChange={onChange}
                className="w-full bg-transparent border-0 text-sm focus:outline-none text-gray-800 placeholder-gray-400 h-12 px-2"
                placeholder="Search Location..."
                value={displayText}
              />
            </div>
            {searchSuggestions.length > 0 && (
              <Combobox.Options
                static
                className="max-h-96 py-4 text-sm overflow-y-auto"
              >
                {searchSuggestions.map((suggestion) => (
                  <Combobox.Option
                    key={`${suggestion.lat}, ${suggestion.lon}`}
                    value={{
                      lat: suggestion.lat,
                      lon: suggestion.lon,
                      name: suggestion.name,
                      country: suggestion.country,
                    }}
                  >
                    {({ active }) => (
                      <div
                        className={`px-4 py-2 ${
                          active ? "bg-indigo-600" : "bg-white"
                        }`}
                      >
                        <span
                          className={`font-medium ${
                            active ? "text-white" : "text-gray-900"
                          }`}
                        >{`${suggestion.name}, ${suggestion.country}`}</span>
                      </div>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
