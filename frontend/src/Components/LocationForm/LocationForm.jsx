import React, { useState } from "react";
import "./LocationForm.css";
const LocationForm = ({ history }) => {
  const [zipcode, setZipcode] = useState("");
  const [distance, setDistance] = useState("");

  const submitLocationForm = (e) => {
    e.preventDefault();
    history.push(`/restaurants/location/${zipcode}/${distance}`);
  };
  return (
    <div className='location-form-div'>
      <h2>Search Restaurants Near You</h2>
      <form className="location-fields" onSubmit={submitLocationForm}>
        <input
          type="text"
          value={zipcode}
          onChange={(e) => setZipcode(e.target.value)}
          placeholder="Enter your Zipcode"
          className="zipcode-input"
        />
        <input
          type="text"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          placeholder="Enter Distance in Km"
          className="distance-input"
        />

        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default LocationForm;
