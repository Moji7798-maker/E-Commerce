import { useEffect, useState } from "react";
import axios from "axios";

export default function useBookSearch(query) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API}/api/product/by/search`,
      params: { search: query },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setProducts((prevProducts) => {
          return [...new Set([...prevProducts, ...res.data.products])];
        });
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [query]);

  return { loading, error, products };
}
