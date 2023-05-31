
import React from "react"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";

// Props that need to be passed is goalText

function PetContract(goalText){

    const goalText = goalText; 
    const [petName, setPetName] = useState(null);

    return(
      <div className="PetContract">

        NeuroPet Adoption Form & Contract to Myself
        
        I <input placeholder="Name"></input> vow to look after my NeuroPet

        <input placeholder="Enter Pet Name" value = {petName} onChange = {(e) => setPetName(e.target.value)}></input>
        by working towards {goalText} everyday for 60 days. 

        I understand that my pet’s growth depends on my dedication to my goal.

        I will change, and achieve my goal, by signing up for it one day at a time, in a row.


      </div>  
    )
}

export default PetContract; 