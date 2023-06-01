import React from 'react';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchEvents } from '../store/allEventsStore'
import {fetchSingleUser} from '../store/singleUserStore'
import { createResult } from '../store/allResultsStore'
import { fetchResults } from '../store/allResultsStore';

const EventAverages = () => {
  const dispatch = useDispatch()
  const events = useSelector((state) => state.allEvents )
  const results = useSelector((state) => state.allResults )
  const {id} = useSelector((state) => state.auth )
  const user = useSelector((state) => state.singleUser )
  const [adding, setAdding] = useState()
  const [time, setTime] = useState()
  const [eventName, setEventName] = useState()
  const [addResult, setAddResult] = useState({})
  useEffect(() => {
    dispatch(fetchEvents())
  }, [])

  useEffect(() => {
    dispatch(fetchResults())
  }, [])
  useEffect(() => {
    dispatch(fetchSingleUser(id))
    // Safe to add dispatch to the dependencies array
  }, [])


  const userResults = results.filter((result) => result.userId ==id)


  return (


<div className="container-fluid bg-3 text-center">
          <div className="row align-items-stretch">
          {events.length ? events.map((zone) => {
        return (
            <div className="col-sm-3 mx-auto mb-4 d-flex" key={zone.id}>
                          <div className='col'>
                        <h1>{zone.name}</h1>
                        <h1>{zone.targetTime.slice(0,5)}</h1>
                        {userResults.length ? userResults.filter((result)=> result.eventId == zone.id).map((zone) => {
        return (
          <h1>{zone.time}</h1>)}) : <div></div>}
            </div></div>)}) :<div></div>}
          </div>
        </div>
  );
};

export default EventAverages;
