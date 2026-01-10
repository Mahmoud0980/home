import { useState } from "react";

function SearchBar({ onFilter }) {
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");

  const handleFilter = () => {
    onFilter({
      location: location.trim(),
      type,
    });
  };

  return (
    <div className="bg-red-200 p-4 rounded-lg shadow-md mb-6 flex flex-col md:flex-row gap-4 items-center">
      <input
        type="text"
        placeholder="المنطقة (مثال: دمشق - جرمانا)"
        className="border rounded p-2 flex-1"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <select
        className="border rounded p-2"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="">All Types</option>
        <option value="بيع">Sale</option>
        <option value="إيجار">Rent</option>
        <option value="رهن">Mortgage</option>
      </select>

      <button
        onClick={handleFilter}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Filter
      </button>
    </div>
  );
}

export default SearchBar;
