
import React, { useState,useEffect } from 'react';
import CountdownTimer from './CountdownTimer';
import { useSelector, useDispatch } from 'react-redux'
import { fetchSingleUser } from '../store/singleUserStore'
import { updateSingleUser } from '../store/singleUserStore';

export default function TargetDate() {
  const dispatch = useDispatch()
  const {id} = useSelector((state) => state.auth )
  const user = useSelector((state) => state.singleUser )
  const [targetDate, setTargetDate] = useState(new Date('June 11, 2023 09:00:00').getTime());
  const [showDateSelection, setShowDateSelection] = useState(false);

  useEffect(() => {
    dispatch(fetchSingleUser(id))
    // Safe to add dispatch to the dependencies array
  }, [dispatch,])

  const handleDateChange = (e) => {
    const selectedDate = e.target.value; // This will be in 'YYYY-MM-DD' format
    const formattedDate = new Date(selectedDate + ' 09:00:00').toString();

    setTargetDate(new Date(formattedDate).getTime());
    console.log("selec", formattedDate)
    setShowDateSelection(false); // Hide the date selection section after selecting a new date
    const updatedUser = {
      ...user,
      targetDate: formattedDate
    };

    dispatch(updateSingleUser(updatedUser));
  };

  const handleToggleDateSelection = () => {
    setShowDateSelection(!showDateSelection);

    // Update targetDate state to current date or user's target date
    if (!showDateSelection) {
      const currentDate = user.targetDate ? new Date(user.targetDate) : new Date();
      setTargetDate(currentDate.toISOString().split('T')[0]);
    }
  };

  return (
    <div>
      <h1 className="profile rounded text-center add" style={{ marginBottom: "15px", marginLeft: "auto", marginRight: "auto", width: "35%" }}><b>Countdown To Hyrox!</b></h1>
      <div className="text-center mb-3">
        {showDateSelection ? (
          <>
            <label htmlFor="dateInput">Select a new date:</label>
            <input
              type="date"
              id="dateInput"
              value={new Date(targetDate).toISOString().split('T')[0]}
              onChange={handleDateChange}
            />
            <button className="btn btn-primary" style={{marginLeft: "10px"}} onClick={handleToggleDateSelection}>
              Cancel
            </button>
          </>
        ) : (
          <button className="btn btn-primary" onClick={handleToggleDateSelection}>
            Change Date
          </button>
        )}
      </div>
      <CountdownTimer targetDate={user.targetDate} />
    </div>
  );
}
