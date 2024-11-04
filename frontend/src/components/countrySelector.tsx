import React from 'react';
import { getData } from 'country-list';

const CountrySelector: React.FC = () => {
  const countries = getData();

  return (
    <select
    id="billingCountry"
    className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-purple-500"
    >
      {countries.map((country) => (
        <option key={country.code} value={country.code}>
          {country.name}
        </option>
      ))}
    </select>
  );
};

export default CountrySelector;
