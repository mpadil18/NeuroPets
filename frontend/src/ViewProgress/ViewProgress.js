import "./ViewProgress.css"
import { useState, useEffect } from "react";
import {useLocation} from 'react-router-dom';
import NavBar from "../Navbar/Navbar";
import GoldProgress from "../assets/elements/GoldProgress.png"
import GreenProgress from "../assets/elements/GreenProgress.png"
import Close from "../assets/elements/Close.svg"

function ViewProgress() {
    const location = useLocation();
    const [listOfLogs] = useState(location.state.logs);
    const [currGoal] = useState(location.state.goal);
    const [allMonths] = useState(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]);
    const [months, setMonths] = useState(["", ""]);
    const [years, setYears] = useState(["", ""]);
    const [popupDisplay, setPopupDisplay] = useState(false);
    const [displayedDateLog, setDisplayedDateLog] = useState([]);

    const closePopup = () => {
        setPopupDisplay(false);
    }

    const imageClick = (logIndex) => {
        let dateObj = new Date((listOfLogs[logIndex].date).seconds * 1000);
        let selectedMo = dateObj.getMonth();
        let selectedDay = dateObj.getDate();
        let selectedYr = dateObj.getFullYear() % 100;
        var displayDate = selectedMo + "." + selectedDay + "." + selectedYr;
        setDisplayedDateLog([displayDate, listOfLogs[logIndex].log])
        setPopupDisplay(true);
    }

    useEffect(() => {
        //TEST: console.log(location.state.logs);
        const setHeaderDateForGoal = () => {
            if (listOfLogs.length > 0) {
                let dateObj = new Date((listOfLogs[0].date).seconds * 1000);
                let firstMonth = dateObj.getMonth();
                let firstYear = dateObj.getFullYear();
                dateObj = new Date((listOfLogs[listOfLogs.length-1].date).seconds * 1000);
                let secondMonth = dateObj.getMonth();
                let secondYear = dateObj.getFullYear();

                setMonths([allMonths[firstMonth], allMonths[secondMonth]]);
                setYears([(firstYear % 100), (secondYear % 100)]);
            }
        }
        setHeaderDateForGoal();
    }, [location, listOfLogs, allMonths])

    return (
        <div className="ViewProgress">
            <div className = "GoalBubble">
                <p className = "BubbleText">{months[0]} {years[0]} - {months[1]} {years[1]}</p>
            </div>
            <div className="InputBubble">
                <div className="gridContents">
                    { (listOfLogs.length > 0) ?
                    listOfLogs.map((logDatePair, index) => (
                        (logDatePair.log.length > 0 ? <img id={index} src={GoldProgress} style={{"width":40, "margin":"8px 3px"}} alt="Journal Entry available" onClick={() => imageClick(index)} /> : <img src={GreenProgress} style={{"width":40,"margin":"8px 3px"}} alt="No journal entry available"/>)
                    )) : null
                    }
                </div>
            </div>
            {popupDisplay &&
                <div className="Popup">
                    <div className="InputBubble">
                        <button className="close-btn" onClick={closePopup}><img src={Close} alt="close popup button"/></button>
                        <p className="Bubble-Header">{currGoal}</p>
                        <p className="ViewDatePopup">{displayedDateLog[0]}</p>
                        <p className="ViewGoalTextPopup">{displayedDateLog[1]}</p>
                    </div>
                </div>
            }
            <NavBar/>
        </div>
   );
}

export default ViewProgress;