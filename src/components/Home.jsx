import { AiOutlineSearch } from "react-icons/ai";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

export default function Home({ data, isDarkMode, setIsDarkMode }) {
  const navigate = useNavigate();
  const [region, setRegion] = useState("");
  const [search, setSearch] = useState({ name: "" });
  const [filteredData, setFilteredData] = useState(data); 

  const navigateToDetails = (country) => {
    navigate(`/details/${encodeURIComponent(country.name)}`, {
      state: { country },
    });
  };

  const handleRegionChange = (e) => {
    const selectedRegion = e.target.value;
    setRegion(selectedRegion);

    const filtered = data.filter(
      (country) =>
        country.name.toLowerCase().includes(search.name.toLowerCase()) &&
        (selectedRegion === "" ||
          country.region.toLowerCase() === selectedRegion.toLowerCase())
    );

    setFilteredData(filtered);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setSearch((prev) => ({
      ...prev,
      [name]: value,
    }));
  
   
    const filtered = data.filter((country) =>
      country.name.toLowerCase().includes(value.toLowerCase()) &&
      (region === "" || country.region.toLowerCase() === region.toLowerCase())
    );
  
    setFilteredData(filtered);
  };
  

  return (
    <div
      className={`${
        isDarkMode ? "bg-[#121f26] text-white" : "bg-[#fafafa] text-black"
      } min-h-screen `}
    >
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      <section className="w-[90%] mx-auto mt-10 flex lg:flex-row flex-col lg:items-center justify-between gap-4">
        <div
          className={`${
            isDarkMode ? "bg-[#2b3945] text-white" : "bg-white"
          } shadow p-2 flex items-center gap-4 lg:w-[30%]`}
        >
          <AiOutlineSearch />
          <input
            type="text"
            name="name"
            value={search.name}
            onChange={handleChange}
            placeholder="Search for a country..."
            className={`w-full focus:outline-0 ${
              isDarkMode ? "bg-[#2b3945] text-white" : "bg-white text-black"
            }`}
          />
        </div>
        <select
          value={region}
          onChange={handleRegionChange}
          className={`p-4 shadow focus:outline-0 w-[80%] cursor-pointer ${
            isDarkMode ? "bg-[#2b3945] text-white" : "bg-white text-black"
          }`}
        >
          <option value="">Filter by Region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </section>

      <main className="w-[90%] mx-auto mt-10 grid lg:grid-cols-4 md:grid-cols-2 gap-4">
        {filteredData.map((country) => (
          <div
            onClick={() => navigateToDetails(country)}
            key={country.name}
            className={`${
              isDarkMode ? "bg-[#2b3945]" : "bg-white"
            } shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition duration-300 hover:scale-105 `}
          >
            <img
              src={country.flags.png}
              alt={country.name}
              className="w-full h-32 object-cover rounded-lg"
            />
            <h2 className="text-lg font-semibold mt-2">{country.name}</h2>
            <p className="text-gray-400">Population: {country.population}</p>
            <p className="text-gray-400">Region: {country.region}</p>
            <p className="text-gray-400">Capital: {country.capital}</p>
          </div>
        ))}
      </main>
    </div>
  );
}
