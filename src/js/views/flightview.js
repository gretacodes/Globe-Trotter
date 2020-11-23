//view

//render function to display the results
export const renderFlights = (suggestion,passengers, transport) => {

    //select conatainer
    const container=document.getElementById("suggestioncontainer");
  
    // //reset the container
    container.innerHTML = "";

    //generate markup
      const markup=`
        <div class="card" style="width: 38rem;" id="suggestion">
        <div class="card-header"> Globe-Trotter Suggestion </div>
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
    
    //generate markup if one of the flights is not valid
    const noFlightsMarkup=`
    <div class="card" style="width: 38rem;" id="suggestion">
    <div class="card-header"> Globe-Trotter Suggestion </div>
    <ul class="list-group list-group-flush">
    <li class="list-group-item">Outbound Route:${suggestion?.outbound?.id ? suggestion?.outbound?.id : "No Flight"} </li>
    <li class="list-group-item">Outbound Cost: ${suggestion?.outbound?.distance ? `£${suggestion?.outbound?.distance * passengers * 0.1}` : "0"}</li>
    </br>
    <li class="list-group-item">Inbound Route:${suggestion?.inbound?.id ? suggestion?.inbound?.id : "No Flight"} </li>
    <li class="list-group-item">Inbound Cost: ${suggestion?.inbound?.distance ? `£${suggestion?.inbound?.distance * passengers * 0.1}` : "0"} </li>
    </br>
    <li class="list-group-item"> Return Travel to Airport Cost & Type: £${transport?.cost} (${transport?.type}) </li> 
    </br>
    <li class="list-group-item" >TOTAL COST: £${"0"} </li>
    </ul>
</div>`;

    //insert markup into the container, used conditional (ternary) operator for displaying the results
    container.insertAdjacentHTML('beforeend', suggestion?.outbound && suggestion?.inbound ? markup : noFlightsMarkup);

}