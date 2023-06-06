import React from 'react';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryLabel } from 'victory';

function Graph({ event }) {
  const data = event.results || [];
  const targetTime = event.targetTime || '';

  console.log("data", data)
  console.log("event", event)
  console.log("target", targetTime)

  // Prepare data for Victory.js line chart
  const chartData = data.map((result) => ({
    x: new Date(result.date),
    y: parseFloat(result.duration),
  }));

  return (
    <div>
      <h1 className="text-center">{event.name} Graph</h1>
     {data.length ? <VictoryChart>
        <VictoryAxis
          dependentAxis
          label="Duration"
          style={{ axisLabel: { padding: 30 } }}
          tickFormat={(tick) => `${tick} sec`}
        />
        <VictoryAxis
          label="Date"
          style={{ axisLabel: { padding: 30 } }}
          tickFormat={(date) => new Date(date).toLocaleDateString()}
        />
        <VictoryLine
          data={chartData}
          x="x"
          y="y"
          style={{ data: { stroke: 'blue' } }}
          interpolation="monotoneX"
        />
        {targetTime && (
          <VictoryLine
            data={[
              { x: chartData[0].x, y: parseFloat(targetTime) },
              { x: chartData[chartData.length - 1].x, y: parseFloat(targetTime) },
            ]}
            style={{ data: { stroke: 'red', strokeDasharray: '4' } }}
          />
        )}
      </VictoryChart> : <div>HEY</div>}
    </div>
  );
}

export default Graph;

/
