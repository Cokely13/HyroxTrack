import React from 'react';

function ActivityCell({ weekNumber, day, program }) {
  const getActivityForDay = () => {
    if (program.schedule) {
      const weekIndex = weekNumber - 1;
      const dayIndex = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].indexOf(day);

      if (weekIndex >= 0 && weekIndex < program.schedule.length && dayIndex >= 0) {
        return program.schedule[weekIndex].activities[dayIndex].activity;
      }
    }
    return '';
  };

  return (
    <td>
      <span>{getActivityForDay()}</span>
    </td>
  );
}

export default ActivityCell;
