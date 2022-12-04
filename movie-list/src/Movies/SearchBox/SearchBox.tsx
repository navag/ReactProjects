import React from 'react'

import './SearchBox.css';

interface ISearchBox {
  onChange: (value: string) => void;
  value: string;
  defaultValue?: string;
  validationFun?: (value: string) => boolean;
  inValidError?: string;
}

function SearchBox({ value, defaultValue, onChange, validationFun, inValidError }: ISearchBox) {
  return (
    <div className='SearchBox'>
      <input name='movieSearchInput' onChange={(e) => onChange(e.target.value)} value={value || defaultValue || ''} />
      {validationFun && validationFun(value) && inValidError && <div>{inValidError}</div>}
    </div>
  )
}

export default SearchBox