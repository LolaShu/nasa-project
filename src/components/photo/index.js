import React, {useState, useRef } from 'react';
import {Button, Banner} from '../../components';
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai';
import {FiChevronDown,FiChevronUp} from 'react-icons/fi';
import {IoCopyOutline} from 'react-icons/io5';
import classNames from 'classnames';

import './index.scss';

function Photo({data,loading}) {
    const [likedPhotos, setLikedPhoto] = useState([]);
    const [photosWithDescription, setPhotosWithDescription] = useState([]);
    const bannerRef=useRef(null);       
    //Like button handler
    function handleLike(id){
        const isLiked = likedPhotos.includes(id)
        const newArray = isLiked ? 
            likedPhotos.filter(photo => photo !== id) : 
            [...likedPhotos, id]
        setTimeout(()=>{
            setLikedPhoto(newArray)
        },300)
        
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
    function handleArrowClick(id){ 
        const isActive = photosWithDescription.includes(id);
        const newArray = isActive ?
        photosWithDescription.filter(photo => photo!== id) :
        [...photosWithDescription,id];
        setPhotosWithDescription(newArray);
    }    
    
    return(
        <>
            <Banner 
                ref={bannerRef}
                message='Image URL copied to the clipboard!'
                />                
            <ul className = {classNames('NASA-Project-Photos__Container', {'loading':loading})}>
                {
                    data.map((photo)=>{
                        const id = photo.date;
                        return(
                            <li className='NASA-Project-Photos__SinglePhoto' key={id} id={id}> 
                                <div className = 'NASA-Project-Photos__DescriptionSection'>
                                    <div className='NASA-Project-Photos__Expandable' onClick={()=>handleArrowClick(id)}>
                                        <h3 className='NASA-Project-Photos__Title'>{photo.title}</h3>
                                        <Button   
                                            preset='default'                                            
                                            tooltipText='description'
                                            ariaLabel='Show description'
                                            >                                            
                                            {photosWithDescription.includes(id)?<FiChevronUp/>:<FiChevronDown/>}
                                        </Button>
                                    </div>                                    
                                    <p className={classNames('NASA-Project-Photos__Description',{'show':photosWithDescription.includes(id)})}>{photo.explanation}</p>
                                </div>                                  
                                <div className='NASA-Project-Photos__Picture'>
                                    <img src={photo.url} alt={`Selected on the ${id} day`}/>
                                    
                                </div>  
                                <p className='NASA-Project-Photos__Date'>{id}</p>                                                      
                                <div className='NASA-Project-Photos__Buttons'>                                   
                                    <Button
                                        preset='default'
                                        tooltipText={likedPhotos.includes(id) ? ('liked'):('like')}
                                        ariaLabel='Like button' 
                                        onClick={()=>handleLike(id)}>
                                        {likedPhotos.includes(id)?(<AiFillHeart/>):(<AiOutlineHeart/>)}
                                    </Button>                                
                                    <Button 
                                        preset='default'
                                        id={`button${id}`} 
                                        value={photo.url}
                                        tooltipText='copy' 
                                        onClick={()=>copyLink(id)}
                                        ariaLabel='Copy link button'>
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