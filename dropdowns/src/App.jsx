import  { useState } from 'react';
import './App.css';
import CountryDropdown from './CountryDropdown';
import StateDropdown from './StateDropdown';
import CityDropdown from './CityDropdown';

function App() {
  const [selectedCountryId, setSelectedCountryId] = useState('');
  const [selectedStateId, setSelectedStateId] = useState('');

  const handleCountrySelect = (countryId) => {
    setSelectedCountryId(countryId);
    setSelectedStateId(''); 
  };

  const handleStateSelect = (stateId) => {
    setSelectedStateId(stateId);
  };

  return (
    <div className="App">
      <h1>Select your location</h1>
      <CountryDropdown onSelectCountry={handleCountrySelect} />
      <StateDropdown
        selectedCountryId={selectedCountryId}
        onSelectState={handleStateSelect}
      />
      <CityDropdown selectedStateId={selectedStateId} />
    </div>
  );
}

export default App;
