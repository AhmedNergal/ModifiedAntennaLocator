var existingAntennasLegA = [];
var existingAntennasLegB = [];
var existingAntennasLegC = [];
var existingAntennasLegD = [];
var blockedHeights = [];
var availableAntennaLocationsLegA = [];
var availableAntennaLocationsLegB = [];
var availableAntennaLocationsLegC = [];
var availableAntennaLocationsLegD = [];
var towerHeightInput = document.querySelector("#tower-height");
var towerHeightSubmit = document.querySelector("#tower-height-submit");
var towerHeightValue = document.querySelector("#tower-height-value");
var existingAntennaLegA = document.querySelector("#leg-a-height");
var existingAntennaLegB = document.querySelector("#leg-b-height");
var existingAntennaLegC = document.querySelector("#leg-c-height");
var existingAntennaLegD = document.querySelector("#leg-d-height");
var existingAntennaLegASubmit = document.querySelector("#leg-a-submit");
var existingAntennaLegBSubmit = document.querySelector("#leg-b-submit");
var existingAntennaLegCSubmit = document.querySelector("#leg-c-submit");
var existingAntennaLegDSubmit = document.querySelector("#leg-d-submit");
var initButton = document.querySelector("#init");
var listLegA = document.querySelector("#list-leg-a");
var listLegB = document.querySelector("#list-leg-b");
var listLegC = document.querySelector("#list-leg-c");
var listLegD = document.querySelector("#list-leg-d");
var availableLocationsLegA = document.querySelector("#available-locations-leg-a");
var availableLocationsLegB = document.querySelector("#available-locations-leg-b");
var availableLocationsLegC = document.querySelector("#available-locations-leg-c");
var availableLocationsLegD = document.querySelector("#available-locations-leg-d");
var reset = document.querySelector("#reset");

towerHeight = 0;


// Tower Height

// On submit add element to page and set towerHeight to the entered input

towerHeightSubmit.addEventListener("click", function(){
  towerHeight = Number(towerHeightInput.value);
  towerHeightValue.textContent = towerHeight.toString();
  towerHeightInput.value = "";
});

// Leg #

// On existingAntennaLeg# submit parse the existingAntennaLeg# height to number and add it to listLeg#

existingAntennaLegASubmit.addEventListener("click", function(){
  existingAntennasLegA.push(Number(existingAntennaLegA.value));
  const antennaHeight = document.createElement("li");
  antennaHeight.innerHTML = existingAntennaLegA.value;
  listLegA.appendChild(antennaHeight);
  existingAntennaLegA.value = "";
});

existingAntennaLegBSubmit.addEventListener("click", function(){
  existingAntennasLegB.push(Number(existingAntennaLegB.value));
  const antennaHeight = document.createElement("li");
  antennaHeight.innerHTML = existingAntennaLegB.value;
  listLegB.appendChild(antennaHeight);
  existingAntennaLegB.value = "";
});

existingAntennaLegCSubmit.addEventListener("click", function(){
  existingAntennasLegC.push(Number(existingAntennaLegC.value));
  const antennaHeight = document.createElement("li");
  antennaHeight.innerHTML = existingAntennaLegC.value;
  listLegC.appendChild(antennaHeight);
  existingAntennaLegC.value = "";
});

existingAntennaLegDSubmit.addEventListener("click", function(){
  existingAntennasLegD.push(Number(existingAntennaLegD.value));
  const antennaHeight = document.createElement("li");
  antennaHeight.innerHTML = existingAntennaLegD.value;
  listLegD.appendChild(antennaHeight);
  existingAntennaLegD.value = "";
});

initButton.addEventListener("click", function(){

  var availableLocationsForStandaloneLegA = availableLocationsInLeg(existingAntennasLegA);
  var availableLocationsForStandaloneLegB = availableLocationsInLeg(existingAntennasLegB);
  var availableLocationsForStandaloneLegC = availableLocationsInLeg(existingAntennasLegC);
  var availableLocationsForStandaloneLegD = availableLocationsInLeg(existingAntennasLegD);

  var blockedHeights = unavailableLocationsInTower(availableLocationsForStandaloneLegA, availableLocationsForStandaloneLegB, availableLocationsForStandaloneLegC, availableLocationsForStandaloneLegD);
    
  var finalAntennaLocationsLegA = availableAntennaLocationsForWholeTowerLeg(blockedHeights, availableLocationsForStandaloneLegA);
  var finalAntennaLocationsLegB = availableAntennaLocationsForWholeTowerLeg(blockedHeights, availableLocationsForStandaloneLegB);
  var finalAntennaLocationsLegC = availableAntennaLocationsForWholeTowerLeg(blockedHeights, availableLocationsForStandaloneLegC);
  var finalAntennaLocationsLegD = availableAntennaLocationsForWholeTowerLeg(blockedHeights, availableLocationsForStandaloneLegD);
  
  finalAntennaLocationsLegA.forEach(function(antenna){
    const listElement = document.createElement("li");
    listElement.innerHTML = antenna.toString();
    availableLocationsLegA.appendChild(listElement);
  });

  finalAntennaLocationsLegB.forEach(function(antenna){
    const listElement = document.createElement("li");
    listElement.innerHTML = antenna.toString();
    availableLocationsLegB.appendChild(listElement);
  });

  finalAntennaLocationsLegC.forEach(function(antenna){
    const listElement = document.createElement("li");
    listElement.innerHTML = antenna.toString();
    availableLocationsLegC.appendChild(listElement);
  });

  finalAntennaLocationsLegD.forEach(function(antenna){
    const listElement = document.createElement("li");
    listElement.innerHTML = antenna.toString();
    availableLocationsLegD.appendChild(listElement);
  });

});

reset.addEventListener("click", function(){
  while (availableLocationsLegA.firstChild){
    availableLocationsLegA.removeChild(availableLocationsLegA.firstChild);
  }
  while (availableLocationsLegB.firstChild){
    availableLocationsLegB.removeChild(availableLocationsLegB.firstChild);
  }
  while (availableLocationsLegC.firstChild){
    availableLocationsLegC.removeChild(availableLocationsLegC.firstChild);
  }
  while (availableLocationsLegD.firstChild){
    availableLocationsLegD.removeChild(availableLocationsLegD.firstChild);
  }

  blockedHeights = [];
  availableAntennaLocationsLegA = [];
  availableAntennaLocationsLegB = [];
  availableAntennaLocationsLegC = [];
  availableAntennaLocationsLegD = [];
  availableLocationsForStandaloneLegA = [];
  availableLocationsForStandaloneLegB = [];
  availableLocationsForStandaloneLegC = [];
  availableLocationsForStandaloneLegD = [];
  finalAntennaLocationsLegA = [];
  finalAntennaLocationsLegB = [];
  finalAntennaLocationsLegC = [];
  finalAntennaLocationsLegD = [];
});


// Available Antenna Locations in One Leg

function availableLocationsInLeg(leg){
  validPoints = []
  validCounter = 0

  currentHeight = towerHeight - 2.6;
  while (currentHeight > 0){
    leg.forEach(function(antenna){
      if (Math.abs(currentHeight - antenna) < 4){
      } else {
        validCounter++;
      }
    });

    if (validCounter === leg.length){
      validPoints.push(parseFloat(currentHeight).toFixed(2));
    }
    validCounter = 0;
    currentHeight -= 0.1;
  }
  return validPoints;
}

// Available Antenna Locations For the Whole Tower

function unavailableLocationsInTower(legA, legB, legC, legD){
  currentHeight = towerHeight - 2.6;

  while (currentHeight > 0){
    let numberOfOccurences = 0;

    legA.forEach(function(antenna){
      if (Math.abs(antenna - currentHeight) < 0.001){
        numberOfOccurences++;
      }
    });

    legB.forEach(function(antenna){
      if (Math.abs(antenna - currentHeight) < 0.001){
        numberOfOccurences++;
      }
    });

    legC.forEach(function(antenna){
      if (Math.abs(antenna - currentHeight) < 0.001){
        numberOfOccurences++;
      }
    });

    legD.forEach(function(antenna){
      if (Math.abs(antenna - currentHeight) < 0.001){
        numberOfOccurences++;
      }
    });

    //console.log("Current Height: ", currentHeight);
    //console.log("Number of occurences: ", numberOfOccurences);

    if (numberOfOccurences <= 1){
      blockedHeights.push(currentHeight.toFixed(2));
    }

    currentHeight -= 0.1;
  }

  return blockedHeights;
}

// Generating Final Lists for Antenna Locations for Each Leg

function availableAntennaLocationsForWholeTowerLeg(blockedHeights, leg){
  var availableLocations = []
  for (antenna of leg){
    if (!blockedHeights.includes(antenna)){
      if (!availableLocations.includes(antenna)){
        availableLocations.push(antenna);
      }
    }
  }

  return availableLocations;
}


// Sorting Function

function sortList(list){
  list.sort(function(a, b){return b - a});
  return list
}