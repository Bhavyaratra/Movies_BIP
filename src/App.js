import { useEffect, useState } from "react";
import Loader from "./util/Loader";
import Main from "./views/Main";

function App() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  async function setInitialData() {
    try {
      const res = await fetch(
        "https://movie-task.vercel.app/api/popular?page=1"
      );
      const resJson = await res.json();
      setMovies(resJson.data.results);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError("server error");
      console.log("error while fetching", error);
    }
  }

  useEffect(() => {
    setInitialData();
  }, []);

  return (
    <div>
      {isLoading ? <Loader /> : <Main initMovies={movies} />}
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
}

export default App;
