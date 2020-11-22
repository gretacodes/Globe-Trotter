//controller


import { flightsModel } from "./js/models/flights.js";
import { renderFlights } from "./js/views/flightview.js";
import { transportModel } from './js/models/transport.js';

//selectors
const inbound=document.getElementById("inbound");
const outbound=document.getElementById("outbound");
const distance=document.getElementById("distance");
const passengers=document.getElementById("passengers");
const transport=document.getElementById("transport");
const transportType=document.getElementById("typeoftransport");
// 
4

//app state - all info/data that app holds at a certain time. we set it as null there is no state, there can be if check
const state={
    input: {
        outbound: null,
        inbound: null,
        distance: null,
        passengers: null,
        transport: null,
        transportType:"Taxi",

    },
    output: {
        suggestion:null,
        transport: null
    },
}

//event handlers
outbound.addEventListener("change", function(event) {

    state.input.outbound=event.target.value;

    state.output.suggestion = flightsModel.getClosestFlight(state.input.inbound, state.input.outbound);


    if (state.output.suggestion && state.input.passengers) renderFlights(state.output.suggestion, state.input.passengers);


})
console.log(state);

inbound.addEventListener("change", function(event) {

    state.input.inbound=event.target.value;

    state.output.suggestion = flightsModel.getClosestFlight(state.input.inbound, state.input.outbound, state.input.passengers);

    if (state.output.suggestion && state.input.passengers) renderFlights(state.output.suggestion, state.input.passengers, state.transport);
    console.log(state);
})

//parseInt - used to change from type string to type number
passengers.addEventListener("change", function(event) {

    state.input.passengers=parseInt(event.target.value);

    state.output.transport = transportModel.getTransportCost(state.input.transport, state.input.passengers, state.input.transportType);

    if (state.output.suggestion && state.input.passengers && state.input.transport) renderFlights(state.output.suggestion, state.input.passengers, state.output.transport);
})

transport.addEventListener("change", function(event) {

    state.input.transport=parseInt(event.target.value);
    // if (state.output.suggestion && state.input.passengers) renderFlights(state.output.suggestion, state.input.passengers);
    console.log(state);

    state.output.transport = transportModel.getTransportCost(state.input.transport, state.input.passengers, state.input.transportType);

    if (state.output.suggestion && state.input.passengers && state.input.transport) renderFlights(state.output.suggestion, state.input.passengers, state.output.transport);
  
    console.log(state);
  
})

transportType.addEventListener("change", function(event) {

    state.input.transportType=event.target.value;
    
    state.output.transport = transportModel.getTransportCost(state.input.transport, state.input.passengers, state.input.transportType);

    if (state.output.suggestion && state.input.passengers && state.input.transport) renderFlights(state.output.suggestion, state.input.passengers, state.output.transport);
  
    console.log(state);
  
})



    console.log(state);




 