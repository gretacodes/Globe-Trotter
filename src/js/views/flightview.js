//view

export const renderFlights = (suggestion,passengers, transport) => {


  console.log(suggestion);

    //select conatainer
    const container=document.getElementById("suggestioncontainer");
  
    // //reset the container
    container.innerHTML = "";

    //generate markup
      const markup=`
        <div class="card" style="width: 38rem;" id="suggestion">
        <div class="card-header">
          OUR SUGGESTION
        </div>
        <ul class="list-group list-group-flush">
        <li class="list-group-item">Outbound Route: ${suggestion?.outbound?.id} </li>
        <li class="list-group-item">Outbound Cost: £${suggestion?.outbound?.distance * passengers * 0.1}</li>
        </br>
        <li class="list-group-item">Inbound Route:${suggestion?.inbound?.id} </li>
        <li class="list-group-item">Inbound Cost: £${suggestion?.inbound?.distance * passengers * 0.1} </li>
    </br>
        <li class="list-group-item"> Return Travel to Airport Cost & Type: £${transport?.cost} (${transport?.type}) </li>
        
        </br>
        <li class="list-group-item" >TOTAL COST: £${suggestion?.inbound?.distance * passengers * 0.1 + suggestion?.outbound?.distance * passengers * 0.1 + transport?.cost} </li>
        
        </ul>
    </div>`;
    
    const noFlightsMarkup=`
    <p> No Flights </p>   
    `;


    //insert markup into the container
    container.insertAdjacentHTML('beforeend', suggestion?.outbound && suggestion?.inbound ? markup : noFlightsMarkup);

}