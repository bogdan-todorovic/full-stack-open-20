import React from 'react';

const Filter = ({ search, handleSearch }) => (
  <div>
    Filter: <input type="text" value={search} onChange={handleSearch} />
  </div>
);

export default Filter;