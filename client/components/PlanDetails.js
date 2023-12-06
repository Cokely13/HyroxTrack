import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchWorkout } from '../store/singleWorkoutStore';

function PlanDetails() {
  const dispatch = useDispatch();
  const workout = useSelector((state) => state.singleWorkout);

  const { planId } = useParams();

  useEffect(() => {
    dispatch(fetchWorkout(planId));
  }, [dispatch, planId]);

  console.log("plan", workout)
  return (
    <div>
      <h2>Plan Details</h2>
      <p>{workout.name}</p>
      <p>{workout.description}</p>
    </div>
  );
}

export default PlanDetails;
