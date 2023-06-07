import './DocIntro.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import doc1 from '../assets/DocFlow/Doc1.png';
import doc2 from '../assets/DocFlow/Doc2.png';
import doc3 from '../assets/DocFlow/Doc3.png';

function DocIntro() {

  const navigate = useNavigate();
  const [imageIndex, setImageIndex] = useState(0);
  const images = [doc1, doc2, doc3];

  function changeImage() {

    if (imageIndex === images.length - 1) {

      navigate('../CreateGoal');

    } else {

      setImageIndex(imageIndex + 1);

    }
  }

  return (

    <div className = "DocIntro">

      <img className = "Images" src={images[imageIndex]} alt="top speech bubble"></img>

      <button className = "NextBubble" onClick={changeImage}></button>

    </div>
    
  );
}

export default DocIntro;