const SearchProduct = ({
  search,
  setSearch,
  call,
  foundData,
  debouncedSearch,
}) => {
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
      <span>
        {debouncedSearch === ""
          ? ""
          : foundData && foundData.length === 0
          ? `no products!`
          : foundData && foundData.length + ` products found...`}
      </span>
      <hr />
      <span> called api {call} times</span>
      <hr />
    </section>
  );
};

export default SearchProduct;
