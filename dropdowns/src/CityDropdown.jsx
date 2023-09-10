import { useState, useEffect } from "react";
import "./Dropdown.css"; 

const CityDropdown = ({ selectedStateId }) => {
  const [cities, setCities] = useState({ data: [] });
  const [selectedCityId, setSelectedCityId] = useState("");

  useEffect(() => {
    // Function to fetch cities based on the selected state ID
    const fetchCities = async () => {
      if (!selectedStateId) {
        setCities({ data: [] });
        return;
      }

      const response = await fetch(
        `https://d32sbion19muhj.cloudfront.net/pub/interview/cities`
      ); 
      if (response.ok) {
        const data = await response.json();

        // After getting cities data, filter them only if they match with state_id
        const filteredData = data.data.filter((item) => {
          return item.state_id == selectedStateId;
        });

        setCities({ data: filteredData });
      }
    };

    fetchCities();
  }, [selectedStateId]);

  const handleCityChange = (e) => {
    const cityId = e.target.value; 
    setSelectedCityId(cityId);
  };

  return (
    <div>
      <select value={selectedCityId} onChange={handleCityChange}>
        <option value="">Select City</option>
        {cities.data.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CityDropdown;
