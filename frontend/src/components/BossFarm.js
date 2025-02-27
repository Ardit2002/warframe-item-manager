import React, { useState, useEffect } from 'react';

// Component to fetch and display bosses for a specific Warframe
const BossFarm = ({ warframe }) => {
  const [bossData, setBossData] = useState([]);

  useEffect(() => {
    const fetchBossData = async () => {
      const response = await fetch(`http://localhost:5000/api/warframe/bosses/${warframe}`);
      const data = await response.json();
      setBossData(data);
    };

    fetchBossData();
  }, [warframe]);

  return (
    <div>
      <h2>{warframe} Bosses</h2>
      {bossData.length > 0 ? (
        <ul>
          {bossData.map((boss) => (
            <li key={boss._id} className="mb-4">
              <h3 className="text-xl font-semibold">{boss.bossName}</h3>
              <p><strong>Location:</strong> {boss.location}</p>
              <p><strong>Planet:</strong> {boss.planet}</p>
              <p><strong>Common Drop Chance:</strong> {boss.dropChances.common}</p>
              <p><strong>Uncommon Drop Chance:</strong> {boss.dropChances.uncommon}</p>
              <p><strong>Rare Drop Chance:</strong> {boss.dropChances.rare}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No data available for this Warframe.</p>
      )}
    </div>
  );
};

export default BossFarm;
