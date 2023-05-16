import bunny0 from "../assets/sprites/bunny0.jpg";
import bunny1 from "../assets/sprites/bunny1.jpg";
import bunny2 from "../assets/sprites/bunny2.jpg";

import penguin1 from "../assets/sprites/penguin1.png"
import penguin2 from "../assets/sprites/penguin2.png"
import penguin3 from "../assets/sprites/penguin3.png"
function PetGallery() {

    return (
     <div style={{backgroundColor: 'pink'}}>
          <img className = "pet" src = {bunny0} alt= "stage 0"/>
          <img className = "pet" src = {bunny1} alt= "stage 1"/>
          <img className = "pet" src = {bunny2} alt= "stage 2"/>
          <img className = "pet" src = {penguin1} alt= "stage 1"/>
          <img className = "pet" src = {penguin2} alt= "stage 2"/>
          <img className = "pet" src = {penguin3} alt= "stage 3"/>
    </div>
    );
}

export default PetGallery;