import { useState, useEffect } from "react";
import Cards from "../components/Cards";
import Header from "../components/Header";
import Loader from "../util/Loader";

export default function Main({ initMovies, initError }) {
  const [data, setData] = useState(initMovies);
  const [filtered, setFiltered] = useState([]);
  const [timer, setTimer] = useState();
  const [error, setError] = useState(initError);
  const [isLoading, setIsLoading] = useState(false);
  const [q, setQ] = useState("default");

  const d = new Date();
  let year = d.getFullYear();
  let yearList = new Array(year - 1887).fill();
  yearList = yearList.map((idx, i) => {
    return (year - i).toString();
  });

  useEffect(() => {
    setFiltered(data);
    setQ("default");
  }, [data]);

  const searchData = async (query) => {
    setIsLoading(true);
    if (query !== "") {
      try {
        const res = await fetch(
          `https://movie-task.vercel.app/api/search?page=1&query=${query}`
        );
        const resJson = await res.json();
        if (!resJson.data.results.length) setError("No results found");
        else setError("");
        setData(resJson.data.results);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    } else {
      setError("");
      setData(initMovies);
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    clearTimeout(timer);
    const timeout = setTimeout(() => searchData(e.target.value), 300);
    setTimer(timeout);
  };

  const handleSelect = (e) => {
    setQ(e.target.value);
    if (e.target.value === "default") {
      setFiltered(data);
      setError("");
    } else {
      const filteredData = data.filter((movie) => {
        if (movie.release_date)
          return movie.release_date.split("-")[0] === e.target.value;
        else return false;
      });
      filteredData.length === 0 ? setError("No Result Found") : setError("");
      setFiltered(filteredData);
    }
  };

  return (
    <>
      <div className="container">
        <Header handleSearch={handleSearch} />
        <span>Filter</span>
        <select className="mx-2" value={q} onChange={(e) => handleSelect(e)}>
          <option value={"default"}>select year</option>
          {yearList.map((year, i) => (
            <option key={i} value={year}>
              {year}
            </option>
          ))}
        </select>

        {error && <p className="text-danger">{error}</p>}
        {isLoading ? (
          <Loader />
        ) : (
          <div className="row row-cols-sm-3 row-cols-md-4 row-cols-lg-6 mt-3">
            {filtered.map((movie, i) => (
              <Cards key={i} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
