import { useState, useEffect } from "react";
import useBookSearch from "./useBookSearch";

const App = () => {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setPageNumber(1);
  };

  const [loading, error, books, hasMore] = useBookSearch(query, pageNumber);

  return (
    <div>
      <input type='text' onChange={handleSearch} value={query} />
      {books.map((book) => (
        <div>{book}</div>
      ))}
      {loading && <div>loading...</div>}
      {error && <div>error...</div>}
    </div>
  );
};

export default App;
