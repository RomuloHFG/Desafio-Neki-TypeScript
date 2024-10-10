import React from 'react';
import { useTranslation } from "react-i18next";
import i18n from '../components/i18n';

interface SearchBarProps {
  searchText: string;
  setSearchText: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchText, setSearchText }) => {
  const { t } = useTranslation();
  return (
    <input
      type="text"
      placeholder={t("Pesquisar...")}
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
