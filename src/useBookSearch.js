import axios from "axios";
import { useState, useEffect } from "react";

const useBookSearch = (query, pageNumber) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => setBooks([]), [query]);
  useEffect(() => {
    let cancel;

    const tryUseEffect = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await axios({
          method: "GET",
          url: "http://openlibrary.org/search.json",
          params: { q: query, page: pageNumber },
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        });

        setBooks((books) => [
          ...books,
          ...response.data.docs.map((doc) => doc.title),
        ]);

        setLoading(false);

        setHasMore(books.length > 0);
        console.log(response.data.docs[response.data.docs.length - 1]);
      } catch (e) {
        if (axios.isCancel(e)) return;
        setError(true);
      }
    };

    tryUseEffect();

    return () => cancel();
  }, [query, pageNumber]);

  return [loading, error, books, hasMore];
};

export default useBookSearch;
