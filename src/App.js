import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import {Loader,Photo} from './components';
import './styles/styles.scss';
function App() {
  //Initialize states
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [count, setCount] = useState(6);
  const [page, setPage]=useState(0);
  
  //Fetching data from API
  useEffect(()=>{
    const getPhotos = async()=>{
      try{
        setLoading(true)
        const response = await axios.get('https://api.nasa.gov/planetary/apod?api_key=xjfSliLrfZ67EBQPdwZghDnwqGuXsTfDlKziIc51',
        {
          params:{              
            count:2
          }
        }          
        );        
        setPhotos((photos)=>[...photos,...response.data]);
        console.log(photos)
        
        
      }catch(error){
        alert(error);
      }finally{
        setLoading(false);
      }
      
    }

    getPhotos() 
  },[page]);

  const loadMore=()=>{
    setLoading(false)
    setPage((page)=>page +1);    
    console.log(page)
  }
  
  return (    
    <div className='NASA-Project_Container'>      
     <div className='wrapper'>
        <div className='parentDiv'>
           
           <main>

            <h1>Photo of the day</h1>
            <p className='header-extended'>by NASA's Astromomy Photo of the day (APOD) API</p> 
              {(loading)?(
                <>
                
          <Loader/>
          </>
        ):( 
        <>
            <Photo data={photos}/>
            
            <button onClick={loadMore}>View More</button>
            
          </>        
        )}
        </main>
       
        <footer>
              <p>Created by Olga Shnurenko</p>
        </footer>
        </div>
       
      </div>   
    </div>
  );
}
export default App;
