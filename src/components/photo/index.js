import React, {useState, useRef } from 'react';
import {Button, Banner} from '../../components';
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai';
import {FiChevronDown} from 'react-icons/fi';
import {IoCopyOutline} from 'react-icons/io5';

import './index.scss';

function Photo({data}) {
    const [ photoArray, setPhotoArray ] = useState(data);

    const bannerRef=useRef(null);    
    
    //Like button handler
    function handleLike(k){
        const newArray = photoArray.map((photo)=>{
            if(k===photo.date){
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
    function handleClick(j){        
        const newArray = photoArray.map((photo)=>{
            if(j===photo.date){
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
                        const id = photo.date
                        return(
                            <li className='NASA-Project-Photos__SinglePhoto' key={id} id={id}> 
                                <div className = 'NASA-Project-Photos__DescriptionSection'>
                                    <div className='NASA-Project-Photos__Expandable'>
                                        <h3 className='NASA-Project-Photos__Title'>{photo.title}</h3>
                                        <Button  
                                            onClick={()=>handleClick(id)}
                                            tooltipText='description'
                                            ariaLabel='Show description'
                                        >
                                            <FiChevronDown/>
                                        </Button>
                                    </div>                                    
                                    <p className={`NASA-Project-Photos__Description${photo.active ? '-show':''}`}>{photo.explanation}</p>
                                </div>                                  
                                <div className='NASA-Project-Photos__Picture'>
                                    <img src={photo.url} alt={`Photo of the ${id} day`}/>
                                    
                                </div>  
                                <p className='NASA-Project-Photos__Date'>{id}</p>                                                      
                                <div className='NASA-Project-Photos__Buttons'>
                                    <Button                                          
                                        tooltipText='like'
                                        ariaLabel='Like button'
                                        onClick={()=>handleLike(id)}
                                    >
                                        {photo.liked?(<AiFillHeart/>):(<AiOutlineHeart/>)}
                                    </Button>                       
                                    <Button 
                                        id={`button${id}`} 
                                        value={photo.url}
                                        tooltipText='copy URL' 
                                        onClick={()=>copyLink(id)}
                                        ariaLabel='Copcy link button'                                
                                        >
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