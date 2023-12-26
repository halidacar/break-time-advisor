import React, { useState } from 'react';

const App = () => {
  const [activity, setActivity] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [result, setResult] = useState('');

  const calculateRemainingTime = (currentTime, cutoffTime) => {
    const [currentHour, currentMinute] = currentTime.split(':').map(Number);
    const [cutoffHour, cutoffMinute] = cutoffTime.split(':').map(Number);

    const remainingMinutes = (cutoffHour - currentHour) * 60 + cutoffMinute - currentMinute;
    return remainingMinutes;
  };

  const getActivityDuration = (selectedActivity) => {
    const activityDurations = {
      cafeteria: 7,
      groceryStore: 9,
      restroom: 5,
      professorOffice: 6,
      friends: 8,
      smoking: 10,
    };
    return activityDurations[selectedActivity] || 0;
  };

  const handleCalculate = () => {
    const cutoffTime = new Date();
    cutoffTime.setHours(currentTime.split(':')[0] <= 11 ? 11 : 12, 15, 0);

    const remainingTime = calculateRemainingTime(currentTime, cutoffTime.toLocaleTimeString());
    const activityDuration = getActivityDuration(activity);

    const latest = cutoffTime.getMinutes() - activityDuration
    cutoffTime.setMinutes(latest)

    if (activityDuration <= remainingTime) {
      setResult(`You can do the activity. Latest departure time:  ${cutoffTime.toLocaleTimeString()}`);
    } else {
      setResult(`You cannot do this activity in this break!`);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', marginTop: '20px' }}>
      <h1 style={{ color: '#333' }}>Break Time Decision Support System</h1>
      <label style={{ display: 'block', marginBottom: '8px' }}>
        Select Activity:
        <select
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          style={{ padding: '8px', marginBottom: '16px' }}
        >
          <option value="">Select an activity</option>
          <option value="cafeteria">Cafeteria</option>
          <option value="groceryStore">Grocery Store</option>
          <option value="restroom">Restroom</option>
          <option value="professorOffice">Professor's Office</option>
          <option value="friends">Hang out with Friends</option>
          <option value="smoking">Go out to Smoke</option>
        </select>
      </label>
      <br />
      <label style={{ display: 'block', marginBottom: '8px' }}>
        Enter Current Time:
        <input
          type="time"
          value={currentTime}
          onChange={(e) => setCurrentTime(e.target.value)}
          style={{ padding: '8px', marginBottom: '16px' }}
        />
      </label>
      <br />
      <button
        onClick={handleCalculate}
        style={{
          backgroundColor: '#4caf50',
          color: 'white',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          border: 'none',
          borderRadius: '4px',
        }}
      >
        Calculate
      </button>
      <div className="result" style={{ marginTop: '20px' }}>
        <h2 style={{ color: '#333' }}>Result:</h2>
        <p style={{ color: '#555' }}>{result}</p>
      </div>
    </div>
  );
};

export default App;
