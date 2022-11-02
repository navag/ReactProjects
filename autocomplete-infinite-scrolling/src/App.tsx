import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';

import AutoComplete from './Autocomplete/AutoComplete';
import { debounce, ISearchItem } from './helper';

import './App.css';

function App() {

  const debounceRef = useRef<any>(null);
  const [booksList, setBooksList] = useState<ISearchItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getBooks = (searchText: string, page: number = 1) => {
    page === 1 && setBooksList([]);
    setIsLoading(true);
    error && setError(true);
    axios({
      method: 'GET',
      url: 'http://openlibrary.org/search.json',
      params: { q: searchText, page },
    })
      .then(res => {
        const newBooks = res?.data?.docs?.map((item: any) => item.title) || [];
        setHasMore(newBooks.length > 0)
        setBooksList(booksList => [...booksList, ...newBooks])
      })
      .catch(err => {
        console.log(err);
        setError(true);
      })
      .finally(() => setIsLoading(false))
  }

  debounceRef.current = debounce(getBooks, 500);

  const onInputChange = (input: any, page: number) => {
    debounceRef.current(input, page);
  }

  const onSelect = (selectedItem: ISearchItem) => {
    console.log(selectedItem)
  }
  const getTemplate = (item: any) => {
    return <span>{item}</span>
  };

  return (
    <div className="App">
      <h2>AutoComplete</h2>
      <AutoComplete
        getTemplate={getTemplate}
        onSelect={onSelect}
        onInputChange={onInputChange}
        list={booksList}
        isLoading={isLoading}
        hasMore={hasMore}
        error={error}
      />
    </div>
  );
}

export default App;
