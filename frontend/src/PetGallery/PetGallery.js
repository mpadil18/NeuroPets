
import bunny0svg from "../assets/sprites/bunny0.svg";
import bunny1svg from "../assets/sprites/bunny1.svg";
import bunny0 from "../assets/sprites/bunny0.jpg";
import bunny1 from "../assets/sprites/bunny1.jpg";
import bunny2 from "../assets/sprites/bunny2.jpg";

function PetGallery() {

    return (
     <div>
          <img className = "pet" src = {bunny0svg} alt= "bunny0" />
          <img className = "pet" src = {bunny1svg} alt= "bunny1svg"/>
          <img className = "pet" src = {bunny0} alt= "stage 0"/>
          <img className = "pet" src = {bunny1} alt= "stage 1"/>
          <img className = "pet" src = {bunny2} alt= "stage 2"/>
    </div>
    );
}

export default PetGallery;