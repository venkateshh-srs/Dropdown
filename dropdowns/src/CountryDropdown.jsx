import { useState, useEffect } from "react";
import "./Dropdown.css"; 

const CountryDropdown = ({ onSelectCountry }) => {
  const [countries, setCountries] = useState({ data: [] });
  const [selectedCountryId, setSelectedCountryId] = useState("");

  useEffect(() => {
    // Function to fetch countries from an API on mount
    const fetchCountries = async () => {
      const response = await fetch(
        "https://d32sbion19muhj.cloudfront.net/pub/interview/countries"
      );
      if (response.ok) {
        const data = await response.json();
        setCountries(data);
      }
    };

    fetchCountries();
  }, []);

  const handleCountryChange = (e) => {
    const countryId = e.target.value;
    setSelectedCountryId(countryId);
    onSelectCountry(countryId);
  };

  return (
    <div>
      <select value={selectedCountryId} onChange={handleCountryChange}>
        <option value="">Select Country</option>
        {countries.data.map((country) => (
          <option key={country.id} value={country.id}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountryDropdown;
