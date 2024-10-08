import React from 'react';

interface SearchBarProps {
  searchText: string;
  setSearchText: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchText, setSearchText }) => {
  return (
    <input
      type="text"
      placeholder="Pesquisar..."
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      style={{
        padding: '8px',
        borderRadius: '5px',
        border: 'none',
        outline: 'none',
        boxShadow: '0px 4px 8px rgba(9, 9, 9, 0.4)',
        height: '30%',
      }}
    />
  );
};

export default SearchBar;
