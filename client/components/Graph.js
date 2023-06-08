import React, { useState } from 'react';
import { VictoryChart, VictoryScatter, VictoryLine, VictoryAxis, VictoryLegend, VictoryLabel } from 'victory';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchUsers } from '../store/allUsersStore';

const convertTimeToSeconds = (time) => {
  const [minutes, seconds] = time.split(':');
  return parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
};

const usernameColors = {
  Ryan: 'green',
  Jamal: 'blue',
  // Add more usernames and their respective colors here
};

function Graph({ event }) {
  const { id } = useSelector((state) => state.auth);
  const users = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();
  const data = event.results || [];
  const targetTime = event.targetTime || '00:00';

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  console.log('users', users);
  console.log('data', data)

  const userNames = ['All', ...new Set(data.map((result) => result.userName))];

  const [selectedUser, setSelectedUser] = useState('All');

  const targetTimeInSeconds = convertTimeToSeconds(targetTime);

  const filteredData = data.filter((result) => selectedUser === 'All' || result.userName === selectedUser);

  const chartData = filteredData.map((result) => ({
    x: new Date(result.date),
    y: convertTimeToSeconds(result.duration),
    // label: result.duration,
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

  const filteredUserNames = userNames.filter((userName) => userName !== 'All');

  const userLines = filteredUserNames.map((userName, index) => {
    const userChartData = filteredData
      .filter((result) => result.userName === userName)
      .map((result) => ({
        x: new Date(result.date),
        y: convertTimeToSeconds(result.duration),
        // label: result.duration,
      }));

    const color = usernameColors[userName] || 'black'; // Assign a color for the username, default to black if not found

    return (
      <VictoryLine
        key={userName}
        data={userChartData}
        x="x"
        y="y"
        style={{ data: { stroke: color, strokeWidth: 2 } }}
        interpolation="monotoneX"
      />
    );
  });

  const userPlots = filteredUserNames.map((userName, index) => {
    const userChartData = filteredData
      .filter((result) => result.userName === userName)
      .map((result) => ({
        x: new Date(result.date),
        y: convertTimeToSeconds(result.duration),
        label: result.duration,
      }));

    const color = usernameColors[userName] || 'black'; // Assign a color for the username, default to black if not found

    return (
      <VictoryScatter
        key={userName}
        data={userChartData}
        x="x"
        y="y"
        style={{ data: { stroke: color, strokeWidth: 2 } }}
        size={6}
        labelComponent={
          <VictoryLabel
            style={{ fontSize: 5, angle: -55 }}
            // verticalAnchor="start"
            textAnchor="start"
          />
        }
      />
    );
  });

  const scatterColor = filteredUserNames.length > 0 ? 'yellow' : 'none'; // Hide scatter plots when no filtered users

  return (
    <div className="border rounded border-5" style={{ backgroundColor: 'white', margin: '50px 150px 150px', textAlign: 'center', padding: '50px', border: '1px solid black', borderRadius: "10px", fontSize: "25px"  }}>
      {/* <h1 className="text-center">Graph</h1> */}
      <select style={{ fontSize: "25px",  marginBottom: "0px",  marginRight: "75%", marginTop: "25px"}} value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
        {userNames.map((userName) => (
          <option key={userName} value={userName}>
            {userName}
          </option>
        ))}
      </select>
      <VictoryChart>
        <VictoryAxis
          label="Date"
          tickFormat={(date) => new Date(date).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
          style={{ tickLabels: { fontSize: 8, padding: 10, angle: -45 } }}
          tickValues={xDates}
        />
        <VictoryAxis
          dependentAxis
          label="Time"
          tickFormat={(time) => `${Math.floor(time / 60)}:${(time % 60).toString().padStart(2, '0')}`}
          style={{ tickLabels: { fontSize: 8, padding: 5 } }}
          tickValues={yLabels.map((_, index) => index * 30)}
        />
        {userLines}
        {userPlots}
        <VictoryLine
          data={[
            { x: xDates[0], y: targetTimeInSeconds },
            { x: xDates[xDates.length - 1], y: targetTimeInSeconds },
          ]}
          style={{ data: { stroke: 'red', strokeWidth: 2 } }}
        />
        <VictoryLegend
          x={125} y={50}
          centerTitle
          orientation="horizontal"
          gutter={11}
          style={{ border: { stroke: "black" },  labels: { fontSize: 6 } }}
          data={[
            ...filteredUserNames.map((userName) => ({
              name: userName,
              symbol: { fill: usernameColors[userName] },
            })),
            { name: 'Target Time', symbol: { fill: 'red' } },
          ]}
        />
      </VictoryChart>
    </div>
  );
}

export default Graph;
