
// //  
// class that calculates the transport costs
export class Transport {

    constructor(transport) {}
 
    //method
    
    getTransportCost(transport, passengers, transportType) {
        
        //calculating taxi
        let travelTaxi; 
        if (passengers <= 4) {
            travelTaxi= transport * 0.4 * 2;
        } else if (passengers > 4 && passengers <9) {
            travelTaxi= transport * 0.4 * 2 * 2;
        } else {
            travelTaxi= transport * 0.4 * 2 * 3;
        }
        console.log(travelTaxi);

        //calculating car

        let travelCar;
        if (passengers <= 4) {
            travelCar= transport * 0.2 * 2 + 3; 
        } else if (passengers > 4 && passengers < 9) {
            travelCar= transport * 0.2 * 2 * 2 + 6;
        } else {
            travelCar= transport * 0.2 * 2 * 3 + 9;
        }

        console.log(travelCar);

       if (transportType==="Car") {
           
           return {
                type: "Car",
                cost: travelCar
           }

       }   else {
           return {
               type: "Taxi",
               cost: travelTaxi
           }
        }

    }

}
export const transportModel = new Transport(); 