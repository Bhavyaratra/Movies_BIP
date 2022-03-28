import { useState,useEffect } from "react";
import Cards from "../components/Cards";
import Loader from "../util/Loader";

export default function Main(){

    const [data,setData] = useState([]);
    const [filtered,setFiltered] = useState([]);
    const [years,setYears] = useState([]);
    const [timer,setTimer] = useState();
    const [error,setError] = useState("");
    const [isLoading,setIsLoading] = useState(true);
    const [q,setQ] = useState("default");

    useEffect(()=>{
        setInitialData();
        const d = new Date();
        let year = d.getFullYear();
        let arr=new Array(100).fill();
        arr = arr.map((idx,i)=>{
            return (year-i).toString();
        })
        setYears(arr);

    },[])

    useEffect(()=>{
        setFiltered(data);
        setQ("default")
    },[data])

    async function setInitialData(){
        try{
            const res = await fetch("https://movie-task.vercel.app/api/popular?page=1");
            const resJson = await res.json();
            setData(resJson.data.results);
            setIsLoading(false);

        }catch(error){
            setIsLoading(false);
            setError(error.message);
            console.log("error while fetching",error);
        }
    } 

    const searchData =async (query)=>{
        setIsLoading(true);
        if(query!==""){
            try{
                const res = await fetch(`https://movie-task.vercel.app/api/search?page=1&query=${query}`);
                const resJson = await res.json();
                if(!resJson.data.results.length) setError("No results found");
                else setError("");
                setData(resJson.data.results);
                setIsLoading(false);
            }catch(err){
                setError(err);
                setIsLoading(false);
            }
        }else{
            setInitialData();
        }
        
    }

    const handleSearch = (e)=>{
        clearTimeout(timer);
        const timeout = setTimeout(()=>searchData(e.target.value),300);
        setTimer(timeout);
    }

    const handleSelect = (e)=>{
        setQ(e.target.value);
        if(e.target.value==="default"){
            setFiltered(data);
        } else{
        setFiltered(data.filter((movie)=>{
            if(movie.release_date)
                return movie.release_date.split("-")[0]===e.target.value;
            else return false;
        }))}
    }

    return(<>
        <div className="container">
            <nav className="navbar navbar-light bg-white">
                <div className="container-fluid">
                    <span className="navbar-brand">Movies</span>
                    <form className="d-flex w-50">
                        <input className="form-control rounded-pill" type="search" placeholder="Search" aria-label="Search" onChange={handleSearch}/>
                    </form>
                </div>
            </nav>
                <span>Filter</span> 
                <select className="mx-2" value={q} onChange={(e)=>handleSelect(e)}>
                    <option value={"default"}>
                        select year
                    </option>
                    {years.map((year,i)=>(
                        <option key={i} value={year}>{year}</option>
                    ))}
                </select>
            
            {error && <p className="text-danger">{error}</p>}
            {isLoading ? 
                <Loader/>
                :
                <div className="row row-cols-sm-3 row-cols-md-4 row-cols-lg-6 mt-3" >
                    {filtered.map((movie,i)=>(
                        <Cards key={i} movie={movie}/>
                    ))}
                </div>
            }
            
        </div>
    </>)
}