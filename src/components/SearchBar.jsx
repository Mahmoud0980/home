import { useState } from 'react';

function SearchBar({ onFilter }) {
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleFilter = () => {
    console.log({ location, type, maxPrice }); // للتأكد من الضغط
    onFilter({ location, type, maxPrice });
  };

  return (
   <div className="bg-red-200 p-4 rounded-lg shadow-md mb-6 flex flex-col md:flex-row gap-4 items-center">

      <input
        type="text"
        placeholder="Location"
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
        <option value="Rent">Rent</option>
        <option value="Sale">Sale</option>
      </select>
      <input
        type="number"
        placeholder="Max Price"
        className="border rounded p-2"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />
      <button
        onClick={handleFilter}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Filter
      </button>
    </div>
  );
}

export default SearchBar;
