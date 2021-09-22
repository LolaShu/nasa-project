import React, {useState, useRef } from 'react';
import {Button, Banner} from '../../components';
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai';
import {FiChevronDown,FiChevronUp} from 'react-icons/fi';
import {IoCopyOutline} from 'react-icons/io5';

import './index.scss';

function Photo({data}) {
    const [ photoArray, setPhotoArray ] = useState(data);
    const bannerRef=useRef(null);    
    
    //Like button handler
    function handleLike(id){
        const newArray = photoArray.map((photo)=>{
            if(id===photo.date){
                const updatedItem = {
                    ...photo,
                    liked:!photo.liked
                }     
                return updatedItem;                
            };            
            return photo
        });
        setPhotoArray(newArray)
    }

    //Copy link button handler
    function copyLink(id){
        if(id!==undefined){
            const copyText = document.getElementById(`button${id}`);                                       
            navigator.clipboard.writeText(copyText.value);
            bannerRef.current.show();
        }else{            
            alert(`Sorry, we don't have an image URL`);
        }
    }    
    //Arrow button handler
    function handleClick(id){        
        const newArray = photoArray.map((photo)=>{
            if(id===photo.date){
                const updatedItem = {
                    ...photo,
                    active:!photo.active
                }
                return updatedItem
            };            
            return photo
            
        });
        setPhotoArray(newArray)
    }
    
    return(
        <>
            <Banner 
                ref={bannerRef}
                message='Image URL copied to the clipboard!'
                />
            <ul className = 'NASA-Project-Photos__Container'>
                {
                    photoArray.map((photo)=>{
                        const id = photo.date;
                        return(
                            <li className='NASA-Project-Photos__SinglePhoto' key={id} id={id}> 
                                <div className = 'NASA-Project-Photos__DescriptionSection'>
                                    <div className='NASA-Project-Photos__Expandable' onClick={()=>handleClick(id)}>
                                        <h3 className='NASA-Project-Photos__Title'>{photo.title}</h3>
                                        <Button   
                                            preset='default'                                            
                                            tooltipText='description'
                                            ariaLabel='Show description'>
                                            {photo.active?<FiChevronUp/>:<FiChevronDown/>}
                                        </Button>
                                    </div>                                    
                                    <p className={`NASA-Project-Photos__Description${photo.active ? '-show':''}`}>{photo.explanation}</p>
                                </div>                                  
                                <div className='NASA-Project-Photos__Picture'>
                                    <img src={photo.url} alt={`Selected on the ${id} day`}/>
                                    
                                </div>  
                                <p className='NASA-Project-Photos__Date'>{id}</p>                                                      
                                <div className='NASA-Project-Photos__Buttons'>
                                    {photo.liked?
                                        (<Button 
                                            preset='default'
                                            tooltipText='unlike' 
                                            ariaLabel='Like button' 
                                            onClick={()=>handleLike(id)}>
                                            <AiFillHeart/>
                                        </Button>):
                                        (<Button
                                            preset='default'
                                            tooltipText='like' 
                                            ariaLabel='Like button' 
                                            onClick={()=>handleLike(id)}>
                                            <AiOutlineHeart/>
                                        </Button>
                                        )
                                    }                                                         
                                    <Button 
                                        preset='default'
                                        id={`button${id}`} 
                                        value={photo.url}
                                        tooltipText='copy' 
                                        onClick={()=>copyLink(id)}
                                        ariaLabel='Copcy link button'>
                                        <IoCopyOutline/>
                                    </Button>
                                </div>                                
                            </li>
                        )
                    })
                }
            </ul>
        </>        
    )    
}

export default Photo;