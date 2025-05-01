import { BsArrowLeft, BsMoon } from "react-icons/bs";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "./Header";

export default function Details({ data, isDarkMode, setIsDarkMode }) {

  const navigate = useNavigate();
  const { countryName } = useParams();

  const country = data.find((c) => c.name === countryName);

  console.log(country);

  if (!country) {
    return <div className="p-8">Country not found.</div>;
  }

  const getBorderCountryObjects = () => {
   return country.borders?.map((borderCode) => {
    const borderCountry = data.find((c) => c.alpha3Code === borderCode )

    return borderCountry || null
  })
  .filter(Boolean)
};

  return (
    <div
      className={` min-h-screen ${
        isDarkMode ? "bg-[#121f26] text-white" : "bg-[#fafafa] text-black"
      }`}
    >
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <span className="w-[90%] mx-auto flex items-center justify-between ">
        <div
          onClick={() => navigate("/")}
          className={`lg:w-[10%] mt-15 flex items-center gap-2 shadow p-1 cursor-pointer justify-center ${
            isDarkMode ? "bg-[#2b3945] text-white" : "bg-white text-black"
          }`}
        >
          <BsArrowLeft /> Back
        </div>
      </span>

      <section className="lg:w-[90%] mx-auto mt-10 flex md:flex-row flex-col items-center gap-20 lg:p-0 p-1">
        <div className="lg:w-[30%] min-w-[250px]">
          <img src={country.flag} alt={country.name} />
        </div>

        <div className="flex flex-col gap-4">
          <section className="flex flex-wrap gap-10 w-full">
            <div>
              <h1 className="font-bold text-2xl mb-2">{country.name}</h1>
              <p>
                <b>Native Name</b>: {country.nativeName}
              </p>
              <p>
                <b>Population</b>: {country.population}
              </p>
              <p>
                <b>Region</b>: {country.region}
              </p>
              <p>
                <b>Sub Region</b>: {country.subregion}
              </p>
              <p>
                <b>Capital</b>: {country.capital}
              </p>
            </div>

            <div>
              <p>
                <b>Top Level Domain</b>: {country.topLevelDomain}
              </p>
              <p>
                <b>Currencies</b>:{" "}
                {country.currencies.map((c) => c.name).join(", ")}
              </p>
              <p>
                <b>Languages</b>:{" "}
                {country.languages.map((l) => l.name).join(", ")}
              </p>
            </div>
          </section>

          <div className="mt-10">
            <div className="flex flex-wrap items-center gap-2">
              <b>Border Countries:</b>
              {country.borders && country.borders.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {getBorderCountryObjects().map((borderCountry) => (
                    <p
                      key={borderCountry.name}
                      className={`shadow px-3 py-1 rounded-md text-sm cursor-pointer ${
                        isDarkMode
                          ? "bg-[#2b3945] text-white"
                          : "bg-white text-black"
                      }`}
                      onClick={() =>
                        navigate(
                          `/details/${encodeURIComponent(borderCountry.name)}`
                        )
                      }
                    >
                      {borderCountry.name}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No border countries</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
