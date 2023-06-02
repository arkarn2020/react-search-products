const SearchProduct = ({ search, setSearch, isSearching, foundData, call }) => {
  return (
    <section>
      <input
        type="text"
        placeholder="search by title..."
        autoFocus
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      &nbsp;
      {isSearching ? "searching" : ""}
      <span>
        {foundData === null
          ? ""
          : foundData === 0
          ? `no products`
          : foundData && foundData.length + ` products found...`}
      </span>
      <span> called api {call} times</span>
      <hr />
    </section>
  );
};

export default SearchProduct;
