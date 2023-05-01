import {GOOGLE_MAPS_APIKEY} from '@env';
import { current } from '@reduxjs/toolkit';

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


  export const  getNearestpinDistance = async (orgin)=>{
    const lat = 6.8649
    const lng = 79.8997

   
   
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?&origins=${orgin.lat},${orgin.lng}&destinations=${lat},${lng}&key=${GOOGLE_MAPS_APIKEY}`;
    
    const response = await fetch(url);
    // console.log(response);
  
    if (!response.ok) {
      throw new Error('Failed to fetch distance to nearest pin');
      
    }
    
    const data2 = await response.json();
    console.log(data2)
    const distance2 = data2.rows[0].elements[0].distance.text;

    return {distance2};
    
  }

  // export const checkIfThereNearbyPins = async (origin)=>{
  //   const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${origin.lat},${origin.lng}&radius=2000&type=point_of_interest&key=${GOOGLE_MAPS_APIKEY}`
  //   const response = await fetch(url)
  //   if(!response.ok){
  //     throw new Error('Failed to fetch nearby pins')
  //   }
  //   const data = await response.json();
  //   const nearbyPins = data?.results?.length
  //   console.log(nearbyPins)
  //   return nearbyPins
  // }


  export const getNearbyPlace = async(nearbyPlace,location)=>{
    console.log("location",location)
    const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=formatted_address%2Cname%2Crating%2Cplace_id%2Copening_hours%2Cgeometry&input=${nearbyPlace}&inputtype=textquery&international_phone_number&locationbias=circle%3A2000%40${location.latitude}%2C${location.longitude}&key=${GOOGLE_MAPS_APIKEY}`
   const response  = await fetch(url)
    if(!response.ok){
      throw new Error('Failed to fetch nearby places')
    }
    const data = await response.json();
    const place = data?.candidates[0]?.name
    console.log(place)
    const placeId = data?.candidates[0]?.place_id
    if(!place){
return {place}
    }
    const phNoUrl = `https://maps.googleapis.com/maps/api/place/details/json?fields=name%2Crating%2Cformatted_phone_number&place_id=${placeId}&key=${GOOGLE_MAPS_APIKEY}`
    const phNoResponse = await fetch(phNoUrl)
    if(!phNoResponse.ok){
      throw new Error('Failed to fetch phone number')
    }
    const phNoData = await phNoResponse.json()
    const phNo = phNoData.result.formatted_phone_number
    console.log(phNoData)
    return {place,phNo}
  }

