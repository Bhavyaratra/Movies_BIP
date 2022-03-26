import { useState,useEffect } from "react";
import Cards from "../components/Cards";

export default function Main(){

    const [data,setData] = useState([]);
    const [timer,setTimer] = useState("");

    useEffect(()=>{
        setInitialData();
    },[])
    
    async function setInitialData(){
        try{
            const res = await fetch("https://movie-task.vercel.app/api/popular?page=1");
            const resJson = await res.json();
            setData(resJson.data.results);
        }catch(error){
            console.log("error while fetching",error);
        }
    } 

    const searchData =async (query)=>{
        if(query!==""){
            const res = await fetch(`https://movie-task.vercel.app/api/search?page=1&query=${query}`);
            const resJson = await res.json();
            console.log(resJson);
            setData(resJson.data.results);
        }else{
            setInitialData();
        }
    }

    const handleSearch = (e)=>{
        clearTimeout(timer);
        const timeout = setTimeout(()=>searchData(e.target.value),300);
        setTimer(timeout);
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
            <Cards data={data}/>
        </div>
    </>)
}