import React, {useEffect} from 'react'
import  axios from 'axios';
function useBookSearch(searchText: string, page: number) {
    useEffect(() => {
        let cancel;
        axios({
            method: 'GET',
            url: 'http://openlibrary.org/search.json',
            params: { q: searchText, page },
            cancelToken: new axios.CancelToken(c => cancel = c)
          })
    })
  return null
}

export default useBookSearch