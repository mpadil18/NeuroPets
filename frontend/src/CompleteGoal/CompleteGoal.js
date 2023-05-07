import "./CompleteGoal.css"
import Pet from "../assets/pet.svg"
import GreenCheckmark from "../assets/GreenCheckmark.svg"

function Home() {

    return (
        <div className = "Home">
            <div className = "GoalBubble">
                <p className = "BubbleText">Drink Water</p>
            </div>
            <img className = "pet" src = {Pet} alt = "sample neuropet"/>
            <img className = "GreenCheck" src = {GreenCheckmark} alt = "green checkmark"/>
            <div className = "CompleteGoal">
                 <p className = "CompleteGoalText1">+1</p>
                 <p className = "CompleteGoalText1">2/60 Days</p>
            </div>
            <nav className = "navbar">
                <ul className = "navlist">
                    <li className = "editGoalIcon"/>
                    <li className = "petHabitatIcon"/>
                    <li className = "homeIcon"/>
                    <li className = "shopIcon"/>
                    <li className = "settingsIcon"/>
                </ul>
            </nav>
        </div>
    );
}

export default Home;
