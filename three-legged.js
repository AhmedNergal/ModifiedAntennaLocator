var existingAntennasLegA = [];
var existingAntennasLegB = [];
var existingAntennasLegC = [];
var blockedHeights = [];
var availableAntennaLocationsLegA = [];
var availableAntennaLocationsLegB = [];
var availableAntennaLocationsLegC = [];
var towerHeightInput = document.querySelector("#tower-height");
var towerHeightSubmit = document.querySelector("#tower-height-submit");
var towerHeightValue = document.querySelector("#tower-height-value");
var existingAntennaLegA = document.querySelector("#leg-a-height");
var existingAntennaLegB = document.querySelector("#leg-b-height");
var existingAntennaLegC = document.querySelector("#leg-c-height");
var existingAntennaLegASubmit = document.querySelector("#leg-a-submit");
var existingAntennaLegBSubmit = document.querySelector("#leg-b-submit");
var existingAntennaLegCSubmit = document.querySelector("#leg-c-submit");
var initButton = document.querySelector("#init");
var listLegA = document.querySelector("#list-leg-a");
var listLegB = document.querySelector("#list-leg-b");
var listLegC = document.querySelector("#list-leg-c");
var listLegD = document.querySelector("#list-leg-d");
var availableLocationsLegA = document.querySelector("#available-locations-leg-a");
var availableLocationsLegB = document.querySelector("#available-locations-leg-b");
var availableLocationsLegC = document.querySelector("#available-locations-leg-c");

towerHeight = 0;

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

initButton.addEventListener("click", function(){

  var availableLocationsForStandaloneLegA = availableLocationsInLeg(existingAntennasLegA);
  var availableLocationsForStandaloneLegB = availableLocationsInLeg(existingAntennasLegB);
  var availableLocationsForStandaloneLegC = availableLocationsInLeg(existingAntennasLegC);

  var blockedHeights = unavailableLocationsInTower(availableLocationsForStandaloneLegA, availableLocationsForStandaloneLegB, availableLocationsForStandaloneLegC);
    
  var finalAntennaLocationsLegA = availableAntennaLocationsForWholeTowerLeg(blockedHeights, availableLocationsForStandaloneLegA);
  var finalAntennaLocationsLegB = availableAntennaLocationsForWholeTowerLeg(blockedHeights, availableLocationsForStandaloneLegB);
  var finalAntennaLocationsLegC = availableAntennaLocationsForWholeTowerLeg(blockedHeights, availableLocationsForStandaloneLegC);
  
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

function unavailableLocationsInTower(legA, legB, legC){
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

    if (numberOfOccurences < 1){
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