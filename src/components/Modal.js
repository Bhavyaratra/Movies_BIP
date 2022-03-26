import { useEffect, useState } from "react"
import './Modal.css'
export default function Modal(props){

    const [movie,setMovie] = useState();

    useEffect(()=>{
        console.log(props)
        getMovieInfo();
    },[])

    async function getMovieInfo(){
        try{
            const res = await fetch(`https://movie-task.vercel.app/api/movie?movieId=${props.id}`);
            const resJson = await res.json();
            console.log(resJson);
            setMovie(resJson.data);
        }catch(error){
            console.log("error while fetching",error);
        }
    } 

    return(
    <div className="mymodal" onClick={()=>props.setShowModal(false)}>
        {movie && <div className="mymodal_content" onClick={(e)=>e.stopPropagation()}>
                    <div className="mymodal_close d-flex justify-content-between" >
                        <p><strong>{movie.original_title}</strong></p>
                        <button type="button" className="btn-close" onClick={()=>{
                            props.setShowModal(false);
                        }}></button>
                    </div>
                    <img className="mymodal_media rounded" src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt=""
                            onError={(e)=>{e.target.onerror = null; e.target.src="https://i.imgur.com/VCMGiHY.png"}}
                        />
                <div className="">
                    <h5>overview</h5>
                    <p className="lh-sm justify ">{movie.overview}</p>
                    <p className="">Runtime : {movie.runtime} min</p>
                </div>
            </div>
        }
    </div>
    )
}