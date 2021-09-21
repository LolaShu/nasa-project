import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import {Loader,Photo} from './components';
import './styles/styles.scss';
function App() {
  //Initialize states
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  //Fetching data from API
  useEffect(()=>{
    const getPhotos = async()=>{
      try{
        const response = await axios.get('https://api.nasa.gov/planetary/apod?api_key=xjfSliLrfZ67EBQPdwZghDnwqGuXsTfDlKziIc51',
        {
          params:{              
            count:8
          }
        }          
        );        
        setPhotos(response.data);
        setLoading(false);
        
      }catch(error){
        alert(error);
      }
    }

    getPhotos() 
  },[]);
  
  return (    
    <div className='NASA-Project_Container'>      
      <div className='wrapper'>
        {/* loading state */}
        {loading?(
          <Loader/>
        ):(
          <>       
            <h1>Photo of the day</h1>
            <p className='header-extended'>by NASA's Astromomy Photo of the day (APOD) API</p>  
            <Photo data={photos}/>
            <footer>
              <p>Created by Olga Shnurenko</p>
            </footer>
          </>        
        )}
      </div>   
    </div>
  );
}
export default App;
