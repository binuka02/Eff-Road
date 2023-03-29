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


  export const getDistanceDuration = async (orgin,destination)=>{
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?&origins=${orgin.lat},${orgin.lng}&destinations=${destination.lat},${destination.lng}&key=${GOOGLE_MAPS_APIKEY}`;
    const response = await fetch(url);
  
    if (!response.ok) {
      throw new Error('Failed to fetch distance and duration');
    }
    
    const data = await response.json();
    const distance = data.rows[0].elements[0].distance.text;
    const duration = data.rows[0].elements[0].duration.text;
    return {distance,duration};
  }
  