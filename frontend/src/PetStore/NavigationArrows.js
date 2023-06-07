import "./PetStore.css"
import backArrow from "../assets/elements/backArrow.png";
import frwdArrow from "../assets/elements/frwdArrow.png";

// Props displayedRange is a list of 2 vals.
// The backLimit = number that requires back arrow to exist
// The frwdLimit = number requiring frwd arrow to appear
function NavigationArrows(props) {

    return (

    <div className="buttonArea">

        {(props.displayedRange[0] >= props.backLimit) ?

        <button className="backArrow" onClick={props.backFunc}><img src={backArrow}/></button> 
        :
        <div className="backArrow">

        </div> 

        }

        {props.middleComponent}

        {(props.displayedRange[1] < props.frwdLimit) ?

        <button className="frwdArrow" onClick={props.frwdFunc}><img src={frwdArrow}/></button>
        :
        <div className="frwdArrow">
        
        </div>

        }

    </div>

    );
    
}

export default NavigationArrows;