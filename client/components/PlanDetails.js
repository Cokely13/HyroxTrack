import React from 'react';

function PlanDetails({ plan }) {

  console.log("plan", plan)
  return (
    <div>
      <h2>Plan Details</h2>
      <p>{plan}</p>
    </div>
  );
}

export default PlanDetails;
