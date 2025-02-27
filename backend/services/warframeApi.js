const axios = require('axios');

const getLiveData = async () => {
  try {
    // Example API URL (replace with a real API if needed)
    const response = await axios.get('https://api.warframe.market/v1/items');
    return response.data;
  } catch (error) {
    console.error('Error fetching live data:', error);
    throw new Error('Unable to fetch live data');
  }
};

module.exports = { getLiveData };
