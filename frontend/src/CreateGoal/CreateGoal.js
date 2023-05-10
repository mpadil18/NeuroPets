import "./CreateGoal.css"
import ProfText from "../assets/ProfTextA.svg"
function CreateGoal() {
  console.log('Rendering CreateGoal component');
    return (
      <div className="CreateGoal">
        <div className="InputBubble">
          <p className="BubbleHeader">Create Goal</p>
          <textarea className="bubbleField" rows="5" cols="33"
          placeholder="Example: Brush Teeth, Floss, Manage Addiction, Drink Water.."
          />

          <button className="bubbleButton"> 
            Save Goal
          </button>
        </div>

        <img className = "ProfessorText" src={ProfText} alt="Professor speech bubble"></img>

      </div>
    );
  }
  
  export default CreateGoal;