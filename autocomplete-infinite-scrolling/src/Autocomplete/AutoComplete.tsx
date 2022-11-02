import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ISearchItem } from '../helper';

import './AutoComplete.css';

interface IAutoCompleteProps {
  list: ISearchItem[];
  onSelect: (item: ISearchItem) => void;
  onInputChange: (searchText: string, page: number) => void;
  getTemplate: (item: ISearchItem) => JSX.Element;
  isLoading?: boolean;
  hasMore?: boolean;
  error?: boolean;
}

function AutoComplete(props: IAutoCompleteProps) {
  const { list = [], onInputChange, onSelect, getTemplate, isLoading = false, hasMore = false, error } = props;

  const [searchText, setSearchText] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hideSearchResult, setHideSearchResult] = useState<boolean>(true);

  useEffect(() => {
    if (isLoading) {

      const theElement = document.getElementById('autocomplete-search-result');

      const scrollToBottom = (node: any) => {
        node.scrollTop = node.scrollHeight;
      }

      scrollToBottom(theElement); // The specified node scrolls to the bottom.
    }

  }, [isLoading]);

  const observer = useRef<any>();
  const lastBookElement = useCallback((node: any) => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        console.log('visible');
        onInputChange(searchText, currentPage + 1);
        setCurrentPage(page => page + 1);
      }
    });
    if (node) observer.current.observe(node);

    console.log(node);
  }, [isLoading, hasMore]);

  const onSearchStringChange = (e: any) => {
    const value = e.target.value;
    setHideSearchResult(false);
    onInputChange(value, 1);
    setSearchText(value);
  };

  const onSearchItemClick = (item: any) => {
    onSelect(item);
    setSearchText(item);
    setHideSearchResult(true);
  };

  return (
    <div className='auto-complete'>
      <div className='autocomplete-container'>
        <label htmlFor='search-input' >Search book</label>
        <input name='search-input' value={searchText} type='text' onChange={onSearchStringChange}></input>
        {
          !hideSearchResult && searchText ? (
            <div className='search-result' id='autocomplete-search-result'>
              {list.length === 0 && !isLoading && <div className='search-result-item'>No results found.</div>}
              {
                list.map((item: ISearchItem, index: number) => {
                  if (index === list.length - 1) {
                    return <div ref={lastBookElement} className='search-result-item' onClick={() => onSearchItemClick(item)}>{getTemplate(item)} </div>
                  } else {
                    return <div className='search-result-item' onClick={() => onSearchItemClick(item)}>{getTemplate(item)} </div>
                  }
                })
              }
              {isLoading && <div className='loader-container'><div className='loader'></div></div>}
              {error && <div className='search-result-item'>Something went wrong.</div>}
            </div>
          ) : null
        }
      </div>
    </div>
  )
}

export default AutoComplete