import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEvents } from '../store/allEventsStore';
import { fetchSingleUser } from '../store/singleUserStore'
import { fetchTargets } from '../store/allTargetsStore';
import { fetchAverages } from '../store/allAveragesStore';


function Test() {
  const dispatch = useDispatch();
  const {id} = useSelector((state) => state.auth )
  const user = useSelector((state) => state.singleUser )
  const events = useSelector((state) => state.allEvents);
  const averages = useSelector((state) => state.allAverages);
  const targets = useSelector((state) => state.allTargets);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const [refreshTargets, setRefreshTargets] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTestEvent, setSelectedTestEvent] = useState(null);
  const [eventWeights, setEventWeights] = useState([]);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchAverages());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTargets());
    setRefreshTargets(false)
  }, [dispatch, refreshTargets]);

  useEffect(() => {
    dispatch(fetchSingleUser(id))
    // Safe to add dispatch to the dependencies array
  }, [dispatch,])

  const userTargets = targets.filter(target => target.userId === id);
  const userAverages = averages.filter(average => average.userId === id);

  const getTargetTimeForEvent = (eventId) => {
    const userTarget = userTargets.find(target => target.eventId === eventId);
    return userTarget ? userTarget.duration : 'No Target selected yet';
  };


  const getAverageTimeForEvent = (eventId) => {
    const userAverage = userAverages.find(average => average.eventId === eventId);
    return userAverage ? userAverage.duration : 'No Average yet';
  };

  const timeStringToSeconds = (time) => {
    const [minutes, seconds] = time.split(':').map(Number);
    return (minutes * 60) + seconds;
};

const secondsToTimeString = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const formatUpdatedAt = (eventId) => {
  const userAverage = userAverages.find(average => average.eventId === eventId);
  return userAverage ? new Date(userAverage.updatedAt).toLocaleDateString() : '---';
};

const calculateDifference = (eventId) => {
  const target = getTargetTimeForEvent(eventId);
  const average = getAverageTimeForEvent(eventId);

  if (target !== 'No Target selected yet' && average !== 'No Average yet') {
      const targetInSeconds = timeStringToSeconds(target);
      const averageInSeconds = timeStringToSeconds(average);
      const differenceInSeconds = targetInSeconds - averageInSeconds;

      return {
        difference: secondsToTimeString(Math.abs(differenceInSeconds)),
        isOver: averageInSeconds > targetInSeconds,
      };
  }
  return { difference: '---', isOver: null };
};

const eligibleEventsForTest = () => {
  return events.filter(event => {
    const average = getAverageTimeForEvent(event.id);
    const target = getTargetTimeForEvent(event.id);
    return average === 'No Average yet' || (timeStringToSeconds(average) > timeStringToSeconds(target));
  });
};

const eligibleEvents = eligibleEventsForTest();

const percents = eligibleEvents.map(event => {
    const lastTestDays = event.updatedAt ? (new Date() - new Date(event.updatedAt)) / (1000 * 60 * 60 * 24) : 20; // 20% weight if no last test
    const { difference, isOver } = calculateDifference(event.id);
    const differenceWeight = isOver ? Math.ceil(timeStringToSeconds(difference) / 5) : 0; // 1% for every 5 seconds over

    return {
      event,
      weight: 1 + lastTestDays + differenceWeight // Base weight of 1
    };
  });



  const rowWeight = percents.filter(percent => percent.event.id == 2)



const handleTestButtonClick = () => {
  const eligibleEvents = eligibleEventsForTest();
  if (eligibleEvents.length > 0) {
    // Calculate weights for each eligible event
    const eventWeights = eligibleEvents.map(event => {
      const lastTestDays = event.updatedAt ? (new Date() - new Date(event.updatedAt)) / (1000 * 60 * 60 * 24) : 50; // 20% weight if no last test
      console.log("last", lastTestDays)
      const { difference, isOver } = calculateDifference(event.id);
      const differenceWeight = isOver ? Math.ceil(timeStringToSeconds(difference) / 5) : 0; // 1% for every 5 seconds over

      return {
        event,
        weight: 1 + lastTestDays + differenceWeight // Base weight of 1
      };
    });



    // Sum of all weights
    const totalWeight = eventWeights.reduce((sum, ew) => sum + ew.weight, 0);



    // Get a random event based on weights
    let randomNum = Math.random() * totalWeight;
    let cumulativeWeight = 0;

    for (const ew of eventWeights) {
      cumulativeWeight += ew.weight;
      if (randomNum <= cumulativeWeight) {
        setSelectedTestEvent(ew.event);
        setShowPopup(true);
        break;
      }
    }
  }
};




  return (
    <div style={{ paddingLeft: '15px', paddingRight: '15px' }}>
      <h1 className="profile rounded text-center add" style={{ marginBottom: "15px", marginTop: "15px",  marginLeft: "auto", marginRight: "auto", width: "35%" }}><b>Target Times</b></h1>
      <table className="table table-bordered text-center profile rounded text-center add" style= {{backgroundColor:"rgb(211, 211, 211)"}}>
        <thead>
          <tr style= {{fontSize:"30px"}}>
            <th>Event Name</th>
            <th>Target Time</th>
            <th>Average Time</th>
            <th>Last Test</th>
            <th>Difference</th>
            <th>Test Weight</th>
          </tr>
        </thead>
        <tbody style= {{fontSize:"20px"}}>
          {events.map((event) => {
    const { difference, isOver } = calculateDifference(event.id);
    const differenceStyle = {
      color: isOver === null ? 'inherit' : isOver ? 'red' : 'green',
    };
    const differenceSign = isOver === null ? '' : isOver ? '+' : '-';
    const eventWeight = eventWeights.find(ew => ew.event.id === event.id);
    const rowWeight = percents.filter(percent => percent.event.id == event.id)
    const totalWeight = percents.reduce((sum, ew) => sum + ew.weight, 0);
    return (
      <tr key={event.id}>
        <td>{event.name}</td>
       <td>
                {selectedEventId == event.id ? (
                  <div>
                    <select value={minutes} onChange={(e) => setMinutes(e.target.value)}>
                      {Array.from(Array(60).keys()).map((num) => (
                        <option key={num} value={num.toString().padStart(2, '0')}>
                          {num.toString().padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                    :
                    <select value={seconds} onChange={(e) => setSeconds(e.target.value)}>
                      {Array.from(Array(60).keys()).map((num) => (
                        <option key={num} value={num.toString().padStart(2, '0')}>
                          {num.toString().padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  getTargetTimeForEvent(event.id)
                )}
              </td>
              <td>
                    <div>{getAverageTimeForEvent(event.id)}</div>
              </td>
              <td>{formatUpdatedAt(event.id)}</td>
        <td style={differenceStyle}>
          {differenceSign}{difference}
        </td>
        <td>{rowWeight[0]? `${((rowWeight[0].weight/ totalWeight)* 100).toFixed(2)}%` : '--!-'}</td>
      </tr>
    );
  })}
        </tbody>
      </table>
      <button className="btn btn-primary" onClick={handleTestButtonClick}>Test</button>

      {showPopup && (
        <div className="popup">
          Test {selectedTestEvent.name}
          <button onClick={() => setShowPopup(false)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default Test
