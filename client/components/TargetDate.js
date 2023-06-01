import React from 'react';
import CountdownTimer from './CountdownTimer';


export default function TargetDate() {
  const THREE_DAYS_IN_MS = new Date('June 11, 2023 09:00:00').getTime()
  const NOW_IN_MS = new Date().getTime();

  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;

  return (
    <div>
      <h1>Countdown To Hyrox!</h1>
      <CountdownTimer targetDate={THREE_DAYS_IN_MS} />
    </div>
  );
}
