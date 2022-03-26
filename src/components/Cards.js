import { useEffect } from "react";

export default function Cards(props){
    
    const data = props.data;
    useEffect(()=>{
        console.log(data);
    },[data])
    return(<>
        <div className="">
            <div className="row row-cols-sm-3 row-cols-md-4 row-cols-lg-6 mt-3">
                {data.map((movie,i)=>(
                    <div key={i} className="col d-flex justify-content-center">
                        <div style={{"maxWidth":"200px","minWidth":"150px"}}>
                            <img className="rounded" src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} style={{"width":"100%"}} alt=""/>
                            <p style={{"letterSpacing":"0.1px"}}>{movie.title}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>)
}