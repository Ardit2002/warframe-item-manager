import React from 'react';

const LiveData = ({ liveDrops }) => {
  return (
    <div>
      <h3>Live Drops</h3>
      {liveDrops.length === 0 ? (
        <p>No live data available.</p>
      ) : (
        <ul>
          {liveDrops.map((drop) => (
            <li key={drop.id}>{drop.name} - {drop.rarity}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LiveData;
