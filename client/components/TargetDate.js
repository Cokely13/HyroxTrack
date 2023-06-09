
import React, { useState } from 'react';
import CountdownTimer from './CountdownTimer';

export default function TargetDate() {
  const [targetDate, setTargetDate] = useState(new Date('June 11, 2023 09:00:00').getTime());
  const [showDateSelection, setShowDateSelection] = useState(false);

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value).getTime();
    setTargetDate(selectedDate);
    setShowDateSelection(false); // Hide the date selection section after selecting a new date
  };

  const handleToggleDateSelection = () => {
    setShowDateSelection(!showDateSelection);
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
      <CountdownTimer targetDate={targetDate} />
    </div>
  );
}
