import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import fetchEvent from '../store/singleEventStore'

function EventDetail() {
  const dispatch = useDispatch()
  const {  eventId } = useParams();
  const event = useSelector((state) => state.singleEvent)
  useEffect(() => {
    dispatch(fetchEvent(eventId))
    // Safe to add dispatch to the dependencies array
  }, [])

  console.log("EVENT", eventId)

  return (
    <div>EventDetail</div>
  )
}

export default EventDetail
