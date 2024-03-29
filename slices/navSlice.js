import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    origin: null,
    destination: null,
    travelTimeInformation: null,
    startClicked:false,
    featureLocationsData:[]
};

export const navSlice = createSlice({
    name: "nav",
    initialState,
    reducers: {
        setOrigin: (state, action) => {
            state.origin = action.payload;
        },  
        setDestination: (state, action) => {
            state.destination = action.payload;
        },
        setTravelTimeInformation: (state, action) => {
            state.travelTimeInformation = action.payload;
        },
        toggleStartClicked:(state)=>{
            console.log("ssss")
            state.startClicked = !state.startClicked;
        },
        setFeatureLocationsData:(state,action)=>{
            state.featureLocationsData = action.payload;
        }
    },
});

export const { setOrigin, setDestination, setTravelTimeInformation,toggleStartClicked,setFeatureLocationsData } = navSlice.actions;


//Selectors
export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) => state.nav.travelTimeInformation;
export const selectStartClicked = (state) => state.nav.startClicked;
export const featureLocationsData = (state)=>state.nav.featureLocationsData;

export default navSlice.reducer;