import { useEffect, useState } from "react"
import Loader from "../util/Loader";
import './Modal.css'
export default function Modal(props){

    const [movie,setMovie] = useState();
    const [count,setCount] = useState(0);
    const [isLoading,setIsLoading] = useState(true);

    useEffect(()=>{
        getMovieInfo();
    },[])

    useEffect(()=>{
        setIsLoading(false);
    },[count])

    async function getMovieInfo(){
        try{
            const res = await fetch(`https://movie-task.vercel.app/api/movie?movieId=${props.id}`);
            const resJson = await res.json();
            setMovie(resJson.data);
        }catch(error){
            console.log("error while fetching",error);
        }
    } 

    return(
    <div className="mymodal" onClick={()=>props.setShowModal(false)}>
        {isLoading ? <Loader/> 
            : <>
            {movie && <div className="mymodal_content" onClick={(e)=>e.stopPropagation()}>
            <div className="mymodal_close d-flex justify-content-between" >
                <span><strong>{movie.original_title}</strong></span>
                <button type="button" className="btn-close" onClick={()=>{
                    props.setShowModal(false);
                }}></button>
            </div>
            <img className="mymodal_media rounded" src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt=""
                    onError={(e)=>{e.target.onerror = null; e.target.src=`https://image.tmdb.org/t/p/original${movie.poster_path}`}}
                    onLoad = {(e)=>{
                        setCount(count+1);
                    }}
                />
            <div className="">
                <h5>overview</h5>
                <p className="lh-sm justify ">{movie.overview}</p>
                <p className="">Runtime : {movie.runtime} min</p>
            </div>
            </div>}
            </>
        }
    </div>
    )
}