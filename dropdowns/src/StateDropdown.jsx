import { useState, useEffect } from "react";
import "./Dropdown.css"; 

const StateDropdown = ({ selectedCountryId, onSelectState }) => {
  const [states, setStates] = useState({ data: [] });
  const [selectedStateId, setSelectedStateId] = useState(""); 

  useEffect(() => {
  
    const fetchStates = async () => {
      if (!selectedCountryId) {
        setStates({ data: [] });
        return;
      }

      const response = await fetch(
        `https://d32sbion19muhj.cloudfront.net/pub/interview/states`
      ); 
      if (response.ok) {
        const data = await response.json();
        // After getting states data, filter them only if they match with country_id
        const filteredData = data.data.filter((item) => {
          return item.country_id == selectedCountryId;
        });

        setStates({ data: filteredData });
      }
    };

    fetchStates();
  }, [selectedCountryId]);

  const handleStateChange = (e) => {
    const stateId = e.target.value;
    setSelectedStateId(stateId);
    onSelectState(stateId);
  };

  return (
    <div>
      <select value={selectedStateId} onChange={handleStateChange}>
        <option value="">Select State</option>
        {states.data.map((state) => (
          <option key={state.id} value={state.id}>
            {state.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StateDropdown;
