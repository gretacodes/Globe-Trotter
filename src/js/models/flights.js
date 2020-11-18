import { flights } from '../data';

// OOP
// Class for the flights model
class Flights {

    constructor (flights){

        //variable to parse out the appropriate flight data
        const flightData=flights.map(function(el){

            //parse out flight id
            const id = el;

            //parse out departure
            const departure=el.slice(0,1);

            //parse out destination
            const destination=el.slice(1,2);

            //parse out distance
            const distance=parseInt(el.slice(2,5));

            //return result
            return {
                id, departure, destination, distance
            }
        })

        //assign the flight data to the property
        this.baseFlights=flightData;

        // Direct flights
        const directFlights = flightData;


        let singleRedirectFlights = [];

        // generate transfer flights for each single flight
        flightData.forEach(function(flight){

            // filter out the flights that fly from the destination
            const existingFlights = flightData.filter(function(el) {

                return el.departure === flight.destination;

            })

            // generate redirected flights
            const redirectedFlights = existingFlights.map(function(existingFlight) {

                return {
                    id: `${flight.id}-${existingFlight.id}`,
                    departure: flight.departure,
                    transfer1: flight.destination,
                    destination: existingFlight.destination,
                    distance: flight.distance + existingFlight.distance
                }

            });


            singleRedirectFlights = [ ...singleRedirectFlights, ...redirectedFlights ];

            // add them to the single transfer variable

        });



        let doubleRedirectFlights = [];

        //generate all flights with 2 transfers
        singleRedirectFlights.forEach(function(flight) {


            const existingFlights = flightData.filter(function(el) {

                return el.destination === flight.transfer1

            });

            const redirectedFlights = existingFlights.map(function(existingFlight) {

                return {
                    id: `${flight.id}-${existingFlight.id}`,
                    departure: flight.departure,
                    transfer1: flight.transfer1,
                    transfer2: flight.destination,
                    destination: existingFlight.destination,
                    distance: flight.distance + existingFlight.distance
                }

            });



            doubleRedirectFlights = [ ...doubleRedirectFlights, ...redirectedFlights ];
            

        })

        this.possibleFlights=[ ...directFlights, ...singleRedirectFlights, ...doubleRedirectFlights ];

    }

    getClosestFlight(departure, destination, passengers) {


        // get appropriate flights
        const filteredFlights= this.possibleFlights.filter(function(el) {
            return el.departure === departure && el.destination === destination;
        });

        // sorting based on lowest distance
        filteredFlights.sort(function(a, b){return a.distance - b.distance});


        // [1, 2] [] if array is empty come back as null - if no trips/combinations available
        return filteredFlights[0] ? filteredFlights[0] : null;

    }



};

// Create the instance of the Flgiht class
export const flightsModel= new Flights(flights);







