import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

import useDebounce from "./useDebounce";
import SearchProduct from "./SearchProduct";
import "./App.css";

// fetch list
const fetchProducts = async () => {
  return await axios
    .get("https://dummyjson.com/products?limit=100")
    .then((res) => res.data?.products)
    .catch((err) => console.log(err.message));
};

// search list
const searchProducts = async (searchitem, setCount) => {
  const list = await fetchProducts();
  setCount((c) => c + 1);
  if (searchitem === "") return null;

  const found = list?.filter((prod) =>
    prod.title.toLowerCase().match(searchitem.toLowerCase())
  );
  if (found && found.length === 0) return 0;
  return found;
};

const Products = () => {
  const [search, setSearch] = useState("");
  const [call, setCall] = useState(0);

  const { isLoading, data } = useQuery("prodlist", () => fetchProducts());

  const { debouncedValue: debouncedSearch } = useDebounce(search, 1200);

  const { isLoading: isSearching, data: foundData } = useQuery(
    ["searchlist", debouncedSearch, setCall],
    () => searchProducts(debouncedSearch, setCall)
  );

  if (isLoading) return <>loading...</>;

  return (
    <main>
      <SearchProduct
        search={search}
        setSearch={setSearch}
        isSearching={isSearching}
        foundData={foundData}
        call={call}
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
          {foundData === null ? (
            data &&
            data.map((product) => (
              <tr key={product.id} className="item">
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.brand}</td>
                <td>{product.category}</td>
                <td>{product.description}</td>
                <td>{product.rating}</td>
                <td>{product.price}</td>
              </tr>
            ))
          ) : foundData === 0 ? (
            <tr>
              <td>nothing was found!</td>
            </tr>
          ) : (
            foundData?.map((product, idx) => (
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
