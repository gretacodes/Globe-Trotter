import { flightsModel } from "./js/models/flights";
import { renderFlights } from "./js/views/flightview";

//selectors
const inbound=document.getElementById("inbound");
const outbound=document.getElementById("outbound");
const distance=document.getElementById("distance");
const passengers=document.getElementById("passengers");

//app state - all info/data that app holds at a certain time. we set it as null there is no state, there can be if check
const state={
    input: {
        inbound: null,
        outbound: null,
        distance: null,
        passengers: null
    },
    output: {
        suggestion:null
    },
}

//event handlers
inbound.addEventListener("change", function(event) {
    // console.log(event);
    // console.log(event.target);
    // console.log(event.target.value);
    state.input.inbound=event.target.value;

    console.log(state);


    // renderFlights("123456");

    state.output.suggestion = flightsModel.getClosestFlight(state.input.inbound, state.input.outbound);
    console.log(state);

    if (state.output.suggestion && state.input.passengers) renderFlights(state.output.suggestion, state.input.passengers);

})

outbound.addEventListener("change", function(event) {

    state.input.outbound=event.target.value;

    console.log(state);

    const availableFlights = flightsModel.getClosestFlight(state.input.inbound, state.input.outbound);
    console.log(availableFlights);

    state.output.suggestion = flightsModel.getClosestFlight(state.input.inbound, state.input.outbound);
    console.log(state);

    if (state.output.suggestion && state.input.passengers) renderFlights(state.output.suggestion, state.input.passengers);


})


distance.addEventListener("change", function(event) {

    state.input.distance=parseInt(event.target.value);

    console.log(state);
})

//parseInt - used to change from type string to type number
passengers.addEventListener("change", function(event) {

    state.input.passengers=parseInt(event.target.value);

    console.log(state);

    if (state.output.suggestion && state.input.passengers) renderFlights(state.output.suggestion, state.input.passengers);
})

console.log(flightsModel);


