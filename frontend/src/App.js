import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';
import WarframeMap from './components/Map'; // This may be another map component, not used here
import MapComponent from './components/MapComponent'; // Assuming this is the main map component
import Login from './components/Login';
import Register from './components/Register';
import BossFarm from './components/BossFarm'; // New BossFarm component
import OpenWorlds from './components/OpenWorlds'; // New OpenWorlds component
import LiveData from './components/LiveData'; // Existing component for live data (drops)

const API_URL = 'http://localhost:5000/api/items';

function App() {
  const [items, setItems] = useState([]); // For items data
  const [editingItem, setEditingItem] = useState(null); // For editing an item
  const [bossData, setBossData] = useState([]); // For boss farming data
  const [liveDrops, setLiveDrops] = useState([]); // For live drops data
  const [isAuthenticated, setIsAuthenticated] = useState(false); // For authentication state
  const [warframe, setWarframe] = useState('Mag'); // Example: Default to Mag

  // Fetch items from the backend API
  const fetchItems = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  // Fetch boss farming data
  const fetchBossData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/warframe/bosses');
      const data = await response.json();
      setBossData(data);
    } catch (error) {
      console.error('Error fetching boss data:', error);
    }
  };

  // Fetch live drops data
  const fetchLiveDrops = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/warframe/live-drops');
      const data = await response.json();
      setLiveDrops(data);
    } catch (error) {
      console.error('Error fetching live drops data:', error);
    }
  };

  // Using useEffect hook to fetch data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchItems();
    }
    fetchBossData();
    fetchLiveDrops();
  }, [isAuthenticated]);

  // Handle form submission for adding/editing items
  const handleSubmit = async (item) => {
    try {
      if (editingItem) {
        const response = await fetch(`${API_URL}/${editingItem._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item),
        });
        await response.json();
      } else {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item),
        });
        await response.json();
      }
      setEditingItem(null); // Reset the editing state
      fetchItems(); // Re-fetch the items after submission
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  // Handle item deletion
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchItems(); // Re-fetch after deletion
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  // Handle item edit
  const handleEdit = (item) => {
    setEditingItem(item);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Warframe Item Manager</h1>

      <Routes>
        {/* Authentication routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Main route */}
        <Route path="/" element={
          <div>
            {/* Item Form for adding/editing items */}
            <ItemForm onSubmit={handleSubmit} editingItem={editingItem} />
            
            {/* List of items */}
            <ItemList items={items} onDelete={handleDelete} onEdit={handleEdit} />
            
            {/* Live drops data */}
            <h2 className="text-2xl font-semibold mt-6">Live Warframe Drops</h2>
            <LiveData liveDrops={liveDrops} />
            
            {/* Map component */}
            <MapComponent />
          </div>
        } />

        {/* Add BossFarm route */}
        <Route path="/bosses" element={<BossFarm warframe={warframe} />} />

        {/* Add OpenWorlds route */}
        <Route path="/open-worlds" element={<OpenWorlds />} />
      </Routes>
    </div>
  );
}

export default App;
