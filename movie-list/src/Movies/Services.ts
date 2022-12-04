export const getMovieList = async (searchText: string = '', page: number = 1) => {
  try {
    const response = await fetch(`https://www.omdbapi.com/?s=${searchText}&apikey=a4ab463a&page=${page}`);
    const inJsonRes = await response.json();
    return inJsonRes || {}
  } catch (error) {
    throw error;
  }
}