// import React, { useState } from 'react';

// function WeekView() {
//   const [startDate, setStartDate] = useState(null);

//   // Function to handle the date selection
//   const handleStartDateChange = (event) => {
//     const selectedDate = event.target.value;
//     setStartDate(selectedDate);
//   };

//   // Function to calculate the start date for each week
//   const calculateWeekStartDate = (weekNumber) => {
//     console.log("start", startDate)
//     if (startDate) {
//       const startDateObj = new Date(startDate);
//       console.log("startObj", startDateObj)
//       const daysToAdd = 7 * (weekNumber - 1);
//       const newDate = new Date(startDateObj.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
//       return newDate.toLocaleDateString();
//     }
//     return '';
//   };

//   // Days of the week labels
//   const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

//   return (
//     <div className="week-view">
//       <h2>Select Start Date</h2>
//       <input type="date" onChange={handleStartDateChange} />

//       <table>
//         <thead>
//           <tr>
//             <th>Week</th>
//             <th>Start Date</th>
//             {daysOfWeek.map((day, index) => (
//               <th key={index +1}>{day}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {[1, 2, 3, 4, 5, 6, 7, 8].map((weekNumber) => (
//             <tr key={weekNumber}>
//               <td>{`Week ${weekNumber}`}</td>
//               <td>{calculateWeekStartDate(weekNumber)}</td>
//               {/* {daysOfWeek.map((day, index) => (
//                 <td key={index}>{calculateWeekStartDate(weekNumber)}</td>
//               ))} */}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default WeekView;

import React, { useState } from 'react';

function WeekView() {
  const [startDate, setStartDate] = useState(null);

  // Function to handle the date selection
  const handleStartDateChange = (event) => {
    const selectedDate = event.target.value;
    setStartDate(selectedDate);
  };

  // Function to calculate the start date for each week
  const calculateWeekStartDate = (weekNumber) => {
    if (startDate) {
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
      <h2>Select Start Date</h2>
      <input type="date" onChange={handleStartDateChange} />

      <table>
        <thead>
          <tr>
            <th>Week</th>
            <th>Start Date</th>
            {daysOfWeek.map((day, index) => (
              <th key={index}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((weekNumber) => (
            <tr key={weekNumber}>
              <td>{`Week ${weekNumber}`}</td>
              <td>{calculateWeekStartDate(weekNumber)}</td>
              {/* {daysOfWeek.map((day, index) => (
                <td key={index}>{calculateWeekStartDate(weekNumber)}</td>
              ))} */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WeekView;

