import { useState, useRef, useCallback } from "react";
import useBookSearch from "./useBookSearch";

const App = () => {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, error, books, hasMore] = useBookSearch(query, pageNumber);

  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNum) => prevPageNum + 1);
        } else if (!hasMore) {
          console.log("더없음");
        }
      });

      if (node) observer.current.observe(node);
      console.log(node);
    },
    [loading, hasMore]
  );

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setPageNumber(1);
  };

  return (
    <div>
      <input type='text' onChange={handleSearch} value={query} />
      {books.map((book, index) => {
        if (books.length === index + 1) {
          return (
            <div key={Math.random()} ref={lastElementRef}>
              <span>{book}</span>
            </div>
          );
        } else {
          return (
            <div key={Math.random()}>
              <span>{book}</span>;
            </div>
          );
        }
      })}
      {loading && <div>loading...</div>}
      {error && <div>error...</div>}
    </div>
  );
};

export default App;
