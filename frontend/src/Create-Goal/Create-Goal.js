function CreateGoal() {
    return (
      <div className="Create-Goal">
        Create Goal
        <input type="text"  
        placeholder="Example: Brush Teeth, Floss, Manage Addiction, Drink Water.."
        > 
        </input>

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