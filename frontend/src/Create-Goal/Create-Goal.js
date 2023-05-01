import "./Create-Goal.css"
import ProfText from "../assets/ProfTextA.svg"
function CreateGoal() {
    return (
      <div className="CreateGoal">
        <div className="CreateGoalBubble">
          <p className="BubbleHeader">Create Goal</p>
          <textarea className="GoalText" rows="5" cols="33"
          placeholder="Example: Brush Teeth, Floss, Manage Addiction, Drink Water.."
          />

          <button className="BubbleButton"> 
            Save Goal
          </button>
        </div>

        <img className = "ProfessorText" src={ProfText} alt="Professor speech bubble"></img>

      </div>
    );
  }
  
  export default CreateGoal;