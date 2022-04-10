function Header({ text, handleSearch }) {
  return (
    <nav className="navbar navbar-light bg-white">
      <div className="container-fluid">
        <span className="navbar-brand">{text}</span>
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

Header.defaultProps = {
  text: "Movies",
};

export default Header;
