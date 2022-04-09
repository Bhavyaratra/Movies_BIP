function Header({ handleSearch }) {
  return (
    <nav className="navbar navbar-light bg-white">
      <div className="container-fluid">
        <span className="navbar-brand">Movies</span>
        <form className="d-flex w-50">
          <input
            className="form-control rounded-pill"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={handleSearch}
          />
        </form>
      </div>
    </nav>
  );
}

export default Header;
