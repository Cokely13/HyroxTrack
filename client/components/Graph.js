// import React from 'react';
// import { VictoryChart, VictoryLine, VictoryAxis } from 'victory';

// const convertTimeToSeconds = (time) => {
//   const [minutes, seconds] = time.split(':');
//   return parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
// };

// function Graph({ event }) {
//   const data = event.results || [];
//   const targetTime = event.targetTime || '00:00';

//   const targetTimeInSeconds = convertTimeToSeconds(targetTime);

//   // const chartData = data.map((result) => ({
//   //   x: new Date(result.date),
//   //   y: convertTimeToSeconds(result.duration),
//   // }));

//   const chartData = data
//   .filter((result) => {
//     const resultDate = new Date(result.date);
//     const sixWeeksAgo = new Date();
//     sixWeeksAgo.setDate(sixWeeksAgo.getDate() - 6 * 7); // Subtract 6 weeks (42 days)
//     return resultDate >= sixWeeksAgo;
//   })
//   .map((result) => ({
//     x: new Date(result.date),
//     y: convertTimeToSeconds(result.duration),
//   }));

//   // Generate dates for the X-axis labels
//   const generateDates = () => {
//     const dates = [];
//     const today = new Date();
//     for (let i = 6; i >= 0; i--) {
//       const date = new Date();
//       date.setDate(today.getDate() - i * 7);
//       dates.push(date);
//     }
//     return dates;
//   };

//   // Generate Y-axis labels for time in seconds
//   const generateTimeLabels = () => {
//     const labels = [];
//     for (let i = 0; i <= 7 * 60; i += 30) {
//       const minutes = Math.floor(i / 60);
//       const seconds = i % 60;
//       labels.push(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
//     }
//     return labels;
//   };

//   const xDates = generateDates();
//   const yLabels = generateTimeLabels();

//   return (
//     <div>
//       <h1 className="text-center">Graph</h1>
//       <VictoryChart>
//         <VictoryAxis
//           label="Date"
//           tickFormat={(date) => new Date(date).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
//           style={{ tickLabels: { fontSize: 8, padding: 5, angle: -45 } }}
//           tickValues={xDates}
//         />
//         <VictoryAxis
//           dependentAxis
//           label="Time"
//           tickFormat={(time) => `${Math.floor(time / 60)}:${(time % 60).toString().padStart(2, '0')}`}
//           style={{ tickLabels: { fontSize: 8, padding: 5 } }}
//           tickValues={yLabels.map((_, index) => index * 30)}
//         />
//         <VictoryLine
//           data={[
//             { x: xDates[0], y: targetTimeInSeconds },
//             { x: xDates[xDates.length - 1], y: targetTimeInSeconds },
//           ]}
//           style={{ data: { stroke: 'red', strokeWidth: 2 } }}
//         />
//         <VictoryLine
//           data={chartData}
//           x="x"
//           y="y"
//           style={{ data: { stroke: 'blue', strokeWidth: 2 } }}
//           interpolation="monotoneX"
//         />
//       </VictoryChart>
//     </div>
//   );
// }

// export default Graph;

import React from 'react';
import { VictoryChart, VictoryScatter, VictoryLine, VictoryAxis } from 'victory';

const convertTimeToSeconds = (time) => {
  const [minutes, seconds] = time.split(':');
  return parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
};

function Graph({ event }) {
  const data = event.results || [];
  const targetTime = event.targetTime || '00:00';

  const targetTimeInSeconds = convertTimeToSeconds(targetTime);

  const chartData = data
    .filter((result) => {
      const resultDate = new Date(result.date);
      const sixWeeksAgo = new Date();
      sixWeeksAgo.setDate(sixWeeksAgo.getDate() - 6 * 7); // Subtract 6 weeks (42 days)
      return resultDate >= sixWeeksAgo;
    })
    .map((result) => ({
      x: new Date(result.date),
      y: convertTimeToSeconds(result.duration),
    }));

  // Generate dates for the X-axis labels
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 10; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i * 7);
      dates.push(date);
    }
    return dates;
  };

  // Generate Y-axis labels for time in seconds
  const generateTimeLabels = () => {
    const labels = [];
    for (let i = 0; i <= 7 * 60; i += 30) {
      const minutes = Math.floor(i / 60);
      const seconds = i % 60;
      labels.push(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }
    return labels;
  };

  const xDates = generateDates();
  const yLabels = generateTimeLabels();

  return (
    <div>
      <h1 className="text-center">Graph</h1>
      <VictoryChart>
        <VictoryAxis
          label="Date"
          tickFormat={(date) => new Date(date).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
          style={{ tickLabels: { fontSize: 8, padding: 5, angle: -45 } }}
          tickValues={xDates}
        />
        <VictoryAxis
          dependentAxis
          label="Time"
          tickFormat={(time) => `${Math.floor(time / 60)}:${(time % 60).toString().padStart(2, '0')}`}
          style={{ tickLabels: { fontSize: 8, padding: 5 } }}
          tickValues={yLabels.map((_, index) => index * 30)}
        />
        <VictoryScatter
          data={chartData}
          x="x"
          y="y"
          style={{ data: { fill: 'blue' } }}
          size={4}
        />
        <VictoryLine
          data={chartData}
          x="x"
          y="y"
          style={{ data: { stroke: 'blue', strokeWidth: 2 } }}
          interpolation="monotoneX"
        />
        <VictoryLine
          data={[
            { x: xDates[0], y: targetTimeInSeconds },
            { x: xDates[xDates.length - 1], y: targetTimeInSeconds },
          ]}
          style={{ data: { stroke: 'red', strokeWidth: 2 } }}
        />
      </VictoryChart>
    </div>
  );
}

export default Graph;
