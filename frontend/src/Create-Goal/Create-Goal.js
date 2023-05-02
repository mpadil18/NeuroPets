import "./Create-Goal.css"

function CreateGoal() {
    return (
      <div className="Create-Goal">
        Create Goal
        <textarea className="GoalText" rows="5" cols="33"
        placeholder="Example: Brush Teeth, Floss, Manage Addiction, Drink Water.."
        />

        <button> 
          Save Goal
        </button>

        <div className = "text-box"> 
          Any goal is a good goal, no matter how small !
        </div>

      </div>
    );
  }
  
  export default CreateGoal;