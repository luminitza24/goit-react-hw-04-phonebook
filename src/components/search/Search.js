import './Search.css';
import { useState } from 'react';
import PropTypes from 'prop-types';

export const Search = ({ onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const handleChange = evt => {
    const { value } = evt.target;
    setSearchTerm(value);
    onFilter(value);
  };
  return (
    <>
      <h3 className="info">Find contacts by name</h3>
      <label className="filter">
        <input
          autoComplete="off"
          type="text"
          className="input"
          value={searchTerm}
          onChange={handleChange}
        />
      </label>
    </>
  );
};

Search.propTypes = {
  onFilter: PropTypes.func.isRequired,
};
