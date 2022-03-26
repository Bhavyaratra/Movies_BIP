import './Loader.css'
export default function Loader(){

    return (<>
    <div className='loader_container'>
        <div className="spinner-border l" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
   
    </>)
}