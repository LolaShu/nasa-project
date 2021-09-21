import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import {Photo,Loader, Button} from './components';
import './styles/styles.scss';
function App() {
  //Initialize states
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);  ;
  const [page, setPage]=useState(0);
  
  //Fetching data from API
  useEffect(()=>{
    const getPhotos = async()=>{
      try{
        setLoading(true)
        const response = await axios.get('https://api.nasa.gov/planetary/apod?api_key=xjfSliLrfZ67EBQPdwZghDnwqGuXsTfDlKziIc51',
        {
          params:{              
            count:4
          }
        }          
        );        
        setPhotos((photos)=>[...photos,...response.data]);        
        console.log(response.data);

      }catch(error){
        alert(error);
      }finally{
        setLoading(false);
      }      
    }

    getPhotos() 
  },[page]);

  const loadMore=()=>{    
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
            {loading?(
              <> 
                <Photo data={photos}/>
                <Loader/>
              </>):(
                 
                  <Photo data={photos}/>
                  
                
              
              )}
          </main>          
          <Button 
            preset='viewMore'
            onClick={()=>loadMore()} ariaLabel='View more button'>
            View More
          </Button>          
          <footer>
            <p>Created by Olga Shnurenko</p>
          </footer>
        </div>
      </div>   
    </div>
  );
}
export default App;
