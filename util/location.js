import {GOOGLE_MAPS_APIKEY} from '@env';

export const getAddress = async (lat, lng) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_APIKEY}`;
    const response = await fetch(url);
  
    if (!response.ok) {
      throw new Error('Failed to fetch address');
    }
    
    const data = await response.json();

    const address = data.results[0].formatted_address;
    console.log('====================================');
    console.log(address);
    console.log('====================================');
    return address; 
  };