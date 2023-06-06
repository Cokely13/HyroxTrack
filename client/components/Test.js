import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchEvent } from '../store/singleEventStore';
import Graph from './Graph';

function Test() {
  const dispatch = useDispatch();
  // const { eventId } = useParams();
  const event = useSelector((state) => state.singleEvent);

  useEffect(() => {
    dispatch(fetchEvent(1));
  }, [dispatch]);

  return (
    <div>
      {event && (
        <div>
          <h1 className="text-center">{event.name}</h1>
          <Graph event={event} />
          <div className="card border border-5 border-warning rounded mx-auto text-center" key={event.id} style={{ width: '28rem' }}>
            {/* Render the rest of the component */}
          </div>
        </div>
      )}
    </div>
  );
}

export default Test;
