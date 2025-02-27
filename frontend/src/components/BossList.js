import React from 'react';

const BossList = ({ bossData }) => {
  return (
    <div>
      <h3>Boss Farming Locations</h3>
      {bossData.length === 0 ? (
        <p>No boss data available.</p>
      ) : (
        <ul>
          {bossData.map((boss) => (
            <li key={boss.id}>{boss.name} - Location: {boss.location}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BossList;
