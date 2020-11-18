export const renderFlights = (suggestion, passengers) => {


  console.log(suggestion);

    //select conatainer
    const container=document.getElementById("suggestioncontainer");
  
    //reset the container
    container.innerHTML = "";

    //generate markup
      const markup=`
          <div class="card" style="width: 38rem;" id="suggestion">
          <div class="card-header">
            OUR SUGGESTION
          </div>
          <ul class="list-group list-group-flush">
          <li class="list-group-item">Outbound Route: ${suggestion.id}</li>
          <li class="list-group-item">Outbound Cost: £${suggestion.distance * passengers * 0.1}</li>
          </br>
          <li class="list-group-item">Inbound Route: ${null}</li>
          <li class="list-group-item">Inbound Cost: ${null}</li>
      </br>
          <li class="list-group-item">Vehicle Type: ${null}</li>
          <li class="list-group-item">Vehicle Return Cost: ${null}</li>
          </br>
          <li class="list-group-item" >TOTAL COST: ${null}</li>
          
          </ul>
      </div>
      `;

    //insert markup into the container
    container.insertAdjacentHTML('beforeend', markup);


}