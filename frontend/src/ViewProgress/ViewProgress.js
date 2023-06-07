import "./ViewProgress.css"
import { useState, useEffect } from "react";
import {useLocation} from 'react-router-dom';
import NavBar from "../Navbar/Navbar";
import GoldProgress from "../assets/elements/GoldProgress.png"
import GreenProgress from "../assets/elements/GreenProgress.png"
import Close from "../assets/elements/Close.svg"

function ViewProgress() {
    // ViewProgress is navigated to from another page (PetGallery)
    // We then get the log and goal data that PetGallery passed by using location.
    const location = useLocation();
    
    // In this case, we get the list of all goals (used for caching in the PetGallery),
    // the current goal, and the list of logs associated with the current goal
    const [goalArray] = useState(location.state.goalArray);
    const [listOfLogs] = useState(location.state.goalArray[location.state.goalId].logs);
    const [currGoal] = useState(location.state.goal);

    /* VARIABLE DEFINITIONS:
       allMonths: Defined list of all month possibilities
       months: Initialized 2 element list of empty strings, 
                     to be substituted with the month the user STARTED their goal,
                     and the month they LAST MADE PROGRESS towards their goal 
       years:  Same idea as months, except it's the YEAR the user STARTED, 
                     and the YEAR the user LAST MADE PROGRESS 
       displayedDateLog: Will contain the date and log associated with the checkmark
                         that the user clicked on, and is then rendered on the popup 
                         component */
    const [allMonths] = useState(["Jan", "Feb", "Mar", "Apr", "May", 
                                  "Jun", "Jul", "Aug", "Sep", "Oct", 
                                  "Nov", "Dec"]);
    const [months, setMonths] = useState(["", ""]);
    const [years, setYears] = useState(["", ""]);
    const [displayedDateLog, setDisplayedDateLog] = useState([]);
    
    // popupDisplay triggers the progress popup
    const [popupDisplay, setPopupDisplay] = useState(false);

    const closePopup = () => {

        setPopupDisplay(false);

    }

    // Triggered when user clicks on checkmark.
    // Converts the Firebase timestamp into a JS Date object, and 
    // converts the date object into a readable string with DateObject.get()
    // sets the displayedDateLog with the converted date, and the associated log.
    const checkMarkClick = (logIndex) => {

        let dateObj = new Date((listOfLogs[logIndex].date).seconds * 1000);

        // Edge case check: if object is result of recent cache, it's a JS date object
        // Otherwise, it's a firebase timestamp
        if (isNaN(dateObj)) {
            dateObj = listOfLogs[logIndex].date;
        }

        let selectedMo = (dateObj.getMonth() + 1);
        let selectedDay = dateObj.getDate();
        let selectedYr = dateObj.getFullYear() % 100;

        var displayDate = selectedMo + "." + selectedDay + "." + selectedYr;

        setDisplayedDateLog([displayDate, listOfLogs[logIndex].log])

        // Render popup with newly converted data

        setPopupDisplay(true);

    }

    useEffect(() => {

        // Sets the First Month/Year and Last Month/Year the user worked on their goal
        // by getting the first and last items in the list of logs, 
        // and converting the Mo/Yr timestamp into a readable string
        const setHeaderDateForGoal = () => {

            if (listOfLogs.length > 0) {

                // If these date conversions are successful, then it means they were Firebase timestamps
                let firstDateObj = new Date((listOfLogs[0].date).seconds * 1000);
                let secondDateObj = new Date((listOfLogs[listOfLogs.length-1].date).seconds * 1000);

                /* If User accesses viewprogress RIGHT AFTER making progress on Home,
                then the current timestamp is a JS one, and should be converted as such */

                if (isNaN(firstDateObj)) {

                    firstDateObj = listOfLogs[0].date

                }
                if (isNaN(secondDateObj)) {

                    secondDateObj = listOfLogs[listOfLogs.length-1].date;

                }

                let firstMonth = firstDateObj.getMonth()
                let firstYear = firstDateObj.getYear()
                let secondMonth = secondDateObj.getMonth()
                let secondYear = secondDateObj.getFullYear()

                setMonths([allMonths[firstMonth], allMonths[secondMonth]]);
                setYears([(firstYear % 100), (secondYear % 100)]);

            }

        }

        setHeaderDateForGoal();

    }, [location, listOfLogs, allMonths])

    return (

        <div className="ViewProgress">

            {/* Renders the head bubble with the first & last month/year progress was made for this goal */}
            <div className = "GoalBubble">

                <p className = "BubbleText">{months[0]} {years[0]} - {months[1]} {years[1]}</p>

            </div>

            <div className="InputBubble">

                <div className="gridContents">

                    {/* If there are no logs to display, render nothing.
                        Else if there are logs to display, then iterate over each logDatePair and render 
                        a green checkmark if user didn't make a journal entry. 
                             else, render a clickable yellow checkmark that triggers the 
                             popup to display the log for the selected goal */}
                    { (listOfLogs.length > 0) ?

                    listOfLogs.map((logDatePair, index) => (

                        (logDatePair.log.length > 0 ? 

                        <img id={index} key={index} src={GoldProgress} style={{"width":40, "margin":"8px 3px"}}
                             alt="Journal Entry available" onClick={() => checkMarkClick(index)} />

                        : <img id={index} key={index} src={GreenProgress} style={{"width":40,"margin":"8px 3px"}} 
                               alt="No journal entry available"/>)

                    )) : null

                    }

                </div>

            </div>

            {/* POPUP CODE: When user clicks on yellow checkmark, 
                Display the popup with the goal, date progress made, and the log itself */}
            {popupDisplay &&

                <div className="Popup">

                    <div className="InputBubble">

                        <button className="close-btn" onClick={closePopup}>
                            
                            <img src={Close} alt="close popup button"/>
                            
                        </button>

                        <p className="Bubble-Header">{currGoal}</p>

                        <p className="ViewDatePopup">{displayedDateLog[0]}</p>

                        <p className="ViewGoalTextPopup">{displayedDateLog[1]}</p>

                    </div>

                </div>

            }

            {/* Pass goalPetList to navbar, to emulate caching */}

            <NavBar goalArray={goalArray}/>
            
        </div>
   );
}

export default ViewProgress;