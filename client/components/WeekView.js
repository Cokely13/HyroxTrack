import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchPrograms } from '../store/allProgramsStore';
import { fetchProgram } from '../store/singleProgramStore';

function WeekView() {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(null);
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [workoutCompleted, setWorkoutCompleted] = useState([]);

  useEffect(() => {
    dispatch(fetchProgram(1));
  }, []);

  const program = useSelector((state) => state.singleProgram);
  const schedule = program.schedule ? program.schedule[0] : 0

  console.log("program", schedule)

  // Function to handle the date selection
  const handleStartDateChange = (event) => {
    const selectedDate = event.target.value;
    setStartDate(selectedDate);
  };

  // Function to lock in the selected date
  const lockInDate = () => {
    setIsDateSelected(true);
  };

  // Function to change the selected date
  const changeDate = () => {
    setIsDateSelected(false);
  };

  // Function to handle checkbox click
  const handleCheckboxClick = (index) => {
    const updatedWorkoutCompleted = [...workoutCompleted];
    updatedWorkoutCompleted[index] = !updatedWorkoutCompleted[index];
    setWorkoutCompleted(updatedWorkoutCompleted);
  };

  // Function to calculate the start date for each week
  const calculateWeekStartDate = (weekNumber) => {
    if (startDate && isDateSelected) {
      const startDateParts = startDate.split('-');
      const year = parseInt(startDateParts[0]);
      const month = parseInt(startDateParts[1]) - 1; // Months are 0-based
      const day = parseInt(startDateParts[2]);

      const startDateObj = new Date(year, month, day);
      const daysToAdd = 7 * (weekNumber - 1);
      startDateObj.setDate(startDateObj.getDate() + daysToAdd);

      const formattedStartDate = `${startDateObj.getMonth() + 1}/${startDateObj.getDate()}/${startDateObj.getFullYear()}`;
      return formattedStartDate;
    }
    return '';
  };

  // Days of the week labels
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="week-view">
      {!isDateSelected ? (
        <>
          <h2>Select Start Date</h2>
          <input type="date" onChange={handleStartDateChange} />
          <button onClick={lockInDate}>Lock In Date</button>
        </>
      ) : (
        <>
          <h2>Start Date</h2>
          <p>{startDate}</p>
          <button onClick={changeDate}>Change Date</button>
        </>
      )}

      <table>
        <thead>
          <tr>
            <th>Week</th>
            <th>Start Date</th>
            {daysOfWeek.map((day, index) => (
              <React.Fragment key={index}>
                <th></th>
                <th>{day}</th>
                <th>Workout Completed</th>
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((weekNumber, weekIndex) => (
            <tr key={weekNumber}>
              <td>{`Week ${weekNumber}`}</td>
              <td>{calculateWeekStartDate(weekNumber)}</td>
              {daysOfWeek.map((day, dayIndex) => (
                <React.Fragment key={dayIndex}>
                  <td></td>
                  <td></td>
                  <td>
                    <input
                      type="checkbox"
                      checked={workoutCompleted[weekIndex * 7 + dayIndex]}
                      onChange={() => handleCheckboxClick(weekIndex * 7 + dayIndex)}
                    />
                  </td>
                </React.Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WeekView;


