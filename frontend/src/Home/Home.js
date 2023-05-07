import "./Home.css"
import ProfText from "../assets/ProfTextB.svg"
import Pet from "../assets/pet.svg"

function Home() {
    return (
        <div className = "Home">
            <div className = "GoalBubble">
                <p className = "BubbleText">Drink Water</p>
            </div>
            <img className = "pet" src = {Pet} alt = "sample neuropet"/>
            <div className = "GoalButton">
                <p className = "G1Text">1/60 Days</p>
                <p className = "G2Text">Complete...?</p>
            </div>
            <img className = "ProfessorText" src={ProfText} alt="Professor speech bubble"></img>
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
