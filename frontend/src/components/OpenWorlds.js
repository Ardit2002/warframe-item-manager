import React, { useState, useEffect } from 'react';

const OpenWorlds = () => {
  const [openWorlds, setOpenWorlds] = useState([]);

  useEffect(() => {
    const fetchOpenWorlds = async () => {
      const response = await fetch('http://localhost:5000/api/warframe/open-worlds');
      const data = await response.json();
      setOpenWorlds(data);
    };

    fetchOpenWorlds();
  }, []);

  return (
    <div>
      <h2>Open Worlds Activities</h2>
      {openWorlds.length > 0 ? (
        <ul>
          {openWorlds.map((world) => (
            <li key={world._id} className="mb-4">
              <h3 className="text-xl font-semibold">{world.name}</h3>
              <p><strong>Fishing:</strong> {world.activities.fishing.join(', ')}</p>
              <p><strong>Mining:</strong> {world.activities.mining.join(', ')}</p>
              <p><strong>Hunting:</strong> {world.activities.hunting.join(', ')}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No open world data available.</p>
      )}
    </div>
  );
};

export default OpenWorlds;
