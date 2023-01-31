import React from "react";

export default function SearchBar({
  displayText,
  handleClick,
}: {
  displayText: string;
  handleClick: (e: React.MouseEvent) => void;
}) {
  return (
    <div className="w-4/5 max-w-sm rounded-lg">
      <form>
        <div className="relative">
          <input
            id="location-input"
            type="search"
            className="peer w-full rounded-lg px-3 py-2  bg-gray-500/10 shadow-md text-white shadow-sm placeholder-transparent cursor-pointer focus:outline-none"
            placeholder="Search Location"
            value={displayText}
            onClick={handleClick}
            readOnly
          />
          <label
            htmlFor="location-input"
            className="absolute left-0 -top-5 text-white/50 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-white/50 peer-placeholder-shown:top-2 peer-placeholder-shown:left-3 transition-all peer-focus:-top-5 peer-focus:left-0 peer-focus:text-white/50 peer-focus:text-sm"
          >
            Search Location
          </label>
        </div>
      </form>
    </div>
  );
}
