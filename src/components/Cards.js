import { useState } from 'react';
import './Cards.css'
import Modal from './Modal';

export default function Cards(props){
    
    const [showModal,setShowModal] = useState(false);

    const movie = props.movie;

    
    return(<>
            {showModal && <Modal id={movie.id} setShowModal={setShowModal}/>}
            <div className="col d-flex justify-content-center" onClick={(e)=>{
                setShowModal(true);
                }} >
                <div className="custom_card">
                    <img className="poster rounded" src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt=""
                        onError={(e)=>{e.target.onerror = null; e.target.src="https://i.imgur.com/VCMGiHY.png"}}
                    />
                    <div className="d-flex justify-content-between">
                    <p >{movie.title}</p>
                    {movie.release_date && <p>{movie.release_date.split("-")[0]}</p>}
                    </div>
                </div>
            </div>
            
    </>)
}