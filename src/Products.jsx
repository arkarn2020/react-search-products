import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

import useDebounce from "./useDebounce";
import SearchProduct from "./SearchProduct";
import "./App.css";

// search list
const searchProducts = async (searchitem, setCount) => {
  const list = await axios
    .get("https://dummyjson.com/products?limit=100")
    .then((res) => res.data?.products)
    .catch((err) => console.log(err.message));

  if (searchitem === "") return list;
  setCount((c) => c + 1);

  const found = list?.filter((prod) =>
    prod.title.toLowerCase().match(searchitem.toLowerCase())
  );

  return found;
};

const Products = () => {
  const [search, setSearch] = useState("");
  const [call, setCall] = useState(0);

  const { debouncedValue: debouncedSearch } = useDebounce(search, 1000);

  const { isLoading, data } = useQuery(
    ["searchlist", debouncedSearch, setCall],
    () => searchProducts(debouncedSearch, setCall)
  );

  if (isLoading) return <>loading...</>;

  return (
    <main>
      <SearchProduct
        search={search}
        setSearch={setSearch}
        call={call}
        foundData={data}
        debouncedSearch={debouncedSearch}
      />
      <table>
        <thead>
          <tr className="heading">
            <td>#</td>
            <td>title</td>
            <td>brand</td>
            <td>category</td>
            <td>description</td>
            <td>rating</td>
            <td>price</td>
          </tr>
        </thead>
        <tbody>
          {search === "" ? (
            data.map((product, idx) => (
              <tr key={product.id} className="item">
                <td>{idx + 1}</td>
                <td>{product.title}</td>
                <td>{product.brand}</td>
                <td>{product.category}</td>
                <td>{product.description}</td>
                <td>{product.rating}</td>
                <td>{product.price}</td>
              </tr>
            ))
          ) : data && data.length === 0 ? (
            <tr>
              <td>nothing was found!</td>
            </tr>
          ) : (
            data.map((product, idx) => (
              <tr key={product.id} className="item">
                <td>{idx + 1}</td>
                <td>{product.title}</td>
                <td>{product.brand}</td>
                <td>{product.category}</td>
                <td>{product.description}</td>
                <td>{product.rating}</td>
                <td>{product.price}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </main>
  );
};

export default Products;
