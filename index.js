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
var listLegA = document.querySelector("#list-leg-a");
var listLegB = document.querySelector("#list-leg-b");
var listLegC = document.querySelector("#list-leg-c");
var listLegD = document.querySelector("#list-leg-d");
var availableLocationsLegA = document.querySelector("#available-locations-leg-a");
var availableLocationsLegB = document.querySelector("#available-locations-leg-b");
var availableLocationsLegC = document.querySelector("#available-locations-leg-c");
var availableLocationsLegD = document.querySelector("#available-locations-leg-d");

towerHeight = 50;

// Test Material

/*
  towerHeight = 120;
  existingAntennasLegB = [];
  existingAntennasLegC = [];
  existingAntennasLegD = [];


*/

existingAntennasLegA = [46, 45, 40, 39, 18];
existingAntennasLegB = [46, 40, 45, 19, 25];
existingAntennasLegC = [46, 20, 30, 40, 50];
existingAntennasLegD = [];


// Tower Height

// On submit add element to page and set towerHeight to the entered input

towerHeightSubmit.addEventListener("click", function(){
  towerHeight = Number(towerHeightInput.value);
  towerHeightValue.textContent = towerHeight.toString();
});

// Leg #

// On existingAntennaLeg# submit parse the existingAntennaLeg# height to number and add it to listLeg#

/*
existingAntennaLegASubmit.addEventListener("click", function(){
  existingAntennasLegA.push(Number(existingAntennaLegA.value));
  const antennaHeight = document.createElement("li");
  antennaHeight.innerHTML = existingAntennaLegA.value;
  listLegA.appendChild(antennaHeight);
});

existingAntennaLegBSubmit.addEventListener("click", function(){
  existingAntennasLegB.push(Number(existingAntennaLegB.value));
  const antennaHeight = document.createElement("li");
  antennaHeight.innerHTML = existingAntennaLegB.value;
  listLegB.appendChild(antennaHeight);
});

existingAntennaLegCSubmit.addEventListener("click", function(){
  existingAntennasLegC.push(Number(existingAntennaLegC.value));
  const antennaHeight = document.createElement("li");
  antennaHeight.innerHTML = existingAntennaLegC.value;
  listLegC.appendChild(antennaHeight);
});

existingAntennaLegDSubmit.addEventListener("click", function(){
  existingAntennasLegD.push(Number(existingAntennaLegD.value));
  const antennaHeight = document.createElement("li");
  antennaHeight.innerHTML = existingAntennaLegD.value;
  listLegD.appendChild(antennaHeight);
});

*/


var availableLocationsForStandaloneLegA = availableLocationsInLeg(existingAntennasLegA);
var availableLocationsForStandaloneLegB = availableLocationsInLeg(existingAntennasLegB);
var availableLocationsForStandaloneLegC = availableLocationsInLeg(existingAntennasLegC);
var availableLocationsForStandaloneLegD = availableLocationsInLeg(existingAntennasLegD);

//console.log(availableLocationsForStandaloneLegA)
//console.log(availableLocationsForStandaloneLegB)
//console.log(availableLocationsForStandaloneLegC)
//console.log(availableLocationsForStandaloneLegD)

var blockedHeights = availableLocationsInTower(availableLocationsForStandaloneLegA, availableLocationsForStandaloneLegB, availableLocationsForStandaloneLegC, availableLocationsForStandaloneLegD);

//console.log(blockedHeights);

var finalAntennaLocationsLegA = availableAntennaLocationsForWholeTowerLegA(blockedHeights, availableLocationsForStandaloneLegA);
var finalAntennaLocationsLegB = availableAntennaLocationsForWholeTowerLegB(blockedHeights, availableLocationsForStandaloneLegB);
var finalAntennaLocationsLegC = availableAntennaLocationsForWholeTowerLegC(blockedHeights, availableLocationsForStandaloneLegC);
var finalAntennaLocationsLegD = availableAntennaLocationsForWholeTowerLegD(blockedHeights, availableLocationsForStandaloneLegD);

console.log(finalAntennaLocationsLegD);


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

function availableLocationsInTower(legA, legB, legC, legD){
  currentHeight = towerHeight - 2.6;
  console.log(towerHeight);

  while (currentHeight > 30){
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

function availableAntennaLocationsForWholeTowerLegA(blockedHeights, availableLocationsForStandaloneLegA){
  for (antenna of availableLocationsForStandaloneLegA){
    if (!blockedHeights.includes(antenna)){
      if (!availableAntennaLocationsLegA.includes(antenna)){
        availableAntennaLocationsLegA.push(antenna);
      }
    }
  }

  return availableAntennaLocationsLegA;
}

function availableAntennaLocationsForWholeTowerLegB(blockedHeights, availableLocationsForStandaloneLegB){
  for (antenna of availableLocationsForStandaloneLegB){
    if (!blockedHeights.includes(antenna)){
      if (!availableAntennaLocationsLegB.includes(antenna)){
        availableAntennaLocationsLegB.push(antenna);
      }
    }
  }

  return availableAntennaLocationsLegB;
}

function availableAntennaLocationsForWholeTowerLegC(blockedHeights, availableLocationsForStandaloneLegC){
  for (antenna of availableLocationsForStandaloneLegC){
    if (!blockedHeights.includes(antenna)){
      if (!availableAntennaLocationsLegC.includes(antenna)){
        availableAntennaLocationsLegC.push(antenna);
      }
    }
  }

  return availableAntennaLocationsLegC;
}

function availableAntennaLocationsForWholeTowerLegD(blockedHeights, availableLocationsForStandaloneLegD){
  for (antenna of availableLocationsForStandaloneLegD){
    if (!blockedHeights.includes(antenna)){
      if (!availableAntennaLocationsLegD.includes(antenna)){
        availableAntennaLocationsLegD.push(antenna);
      }
    }
  }

  return availableAntennaLocationsLegD;
}


// Sorting Function

function sortList(list){
  list.sort(function(a, b){return b - a});
  return list
}