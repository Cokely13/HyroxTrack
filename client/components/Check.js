import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchEvent } from '../store/singleEventStore';

function Check() {
  const dispatch = useDispatch();
  // const { eventId } = useParams();
  const event = useSelector((state) => state.singleEvent);

  useEffect(() => {
    dispatch(fetchEvent(1));
  }, [dispatch]);

  return (
    <div className='testing'>
hey

    </div>
  );
}

export default Check;
