import "./Home.css"
import pet from "../assets/pet.svg"

function Home() {
    return (
        <div className = "Home">
            <img className = "pet" src = {pet} alt = "sample neuropet"/>
            <nav className = "navbar">
                <ul className = "navlist">
                    <li className = "editGoalIcon"/>
                    <li className = "homeIcon"/>
                    <li className = "settingsIcon"/>
                </ul>
            </nav>
        </div>
    );
}

export default Home;
