//Imports for Search Form to work
import { SearchManager } from "../core/searchManager.js";
import { SearchInfo } from "../models/happyTripModels.js";

//Variables for Search
var searchManager = null;
var oneWay = null;
var twoWay = null;
var fromCity = null;
var swapBtn = null;
var toCity = null;
var departDate = null;
var arriveOn = null;
var arriveOn1 = null;
var choice = null;
var airline = null;
var searchButton = null;
var adultField = null;
var flight = null;
var returnDate = null;
var adultFill = null;

//Default Method Called
window.onload = init();
// Initializing Search Component
function init() {
  //1. Creating object of SearchManageer to work with
  searchManager = new SearchManager();
  //2. Attach Listeners to the objects
  attachListeners();
  // for swap cities
  attachListener();
  //4. Set Default Direction : One Way - Two Way
  setDefaultValueTravelDirection();
  //5. Load Airports
  loadAirports();
  //  receiveManager();
  //6. Load Travel Classes
  loadTravelClasses();
  //7. Load Travel Adult Limit
  loadTravelAdultLimit();
  //8. Load Travel Children Limit
  loadTravelChildrenLimit();
  //9. Load Travel Infants Limit
  loadTravelInfantsLimit();
  //10. Set the Lower Limit of Date for Travel
  setMinDate();
}

//2. Attach listeners to controls
function attachListener() {
  swapBtn.addEventListener("click", swapCity);
  arriveOn.addEventListener("click", enableArriveOn);
  arriveOn1.addEventListener("click", disableArriveOn);
  searchButton.addEventListener("click", validateFields);
  toCity.addEventListener("change", sameCity);
  fromCity.addEventListener("change", sameCity);
  adultField.addEventListener("click", adultCheck);
  departDate.addEventListener("click", checkFlightPath);
  adultFill.addEventListener("change", adultValueFill);
  // returnDate.addEventListener("change", returnDateCheck);
}

//3. Get Access to controls in the form
function attachListeners() {
  oneWay = document.getElementById("OneWay");
  twoWay = document.getElementById("TwoWay");
  fromCity = document.getElementById("fromCity");
  swapBtn = document.getElementById("swap");
  toCity = document.getElementById("toCity");
  departDate = document.getElementById("dob");
  returnDate = document.getElementById("dob1");
  arriveOn = document.querySelector(".arriveOn");
  arriveOn1 = document.querySelector(".arriveOn1");
  choice = document.getElementById("travelClass");
  airline = document.getElementById("airline");
  searchButton = document.getElementById("search");
  adultField = document.getElementById("Infants");
  adultFill = document.getElementById("Adults");
}
console.log(returnDate);
//return date check
function returnDateCheck() {}
//Check flight add
function checkFlightPath() {
  if (fromCity.value == "" && toCity.value == "") {
    document.getElementById("flight_error").innerHTML =
      "Select flight path first";
  } else if (fromCity.value == "") {
    document.getElementById("flight_error").innerHTML =
      "Select flight source path first";
  } else if (toCity.value == "") {
    document.getElementById("flight_error").innerHTML =
      "Select destination path first";
  } else {
    document.getElementById("flight_error").innerHTML = " ";
  }
}
//Adult entry check
function adultCheck() {
  let selectElement1 = document.querySelector("#Adults");
  let output1 = selectElement1.value;
  if (output1 == "") {
    document.getElementById("adult_error").innerHTML = "Select atleast 1 adult";
  } else {
    document.getElementById("adult_error").innerHTML = " ";
  }
}

//Adult Value Check
function adultValueFill() {
  if (adultFill.value != "") {
    document.getElementById("adult_error").innerHTML = " ";
  }
}

//Function to same  cities check
function sameCity() {
  if (fromCity.value == toCity.value) {
    document.getElementById("city_error").innerHTML = "Select Different city";
  } else {
    document.getElementById("city_error").innerHTML = " ";
  }
}

//4. Set default value for travel direction
function setDefaultValueTravelDirection() {
  // Access the radio button control and make it checked
  let direction = searchManager.getDefaultTravelDirection();

  if (direction == "OneWay") {
    oneWay.checked = true;
  } else if (direction == "TwoWay") {
    twoWay.checked = true;
  }
}
//10. Function to set the minimum date of travel
function setMinDate() {
  departDate.min =
    new Date().getFullYear() +
    "-" +
    parseInt(new Date().getMonth() + 1) +
    "-" +
    new Date().getDate();
  console.log(departDate.min);
}

//-------Events and Actions performed by the user

//Function to swap cities when user clicks on button to swap
function swapCity() {
  let flag;
  flag = fromCity.value;
  fromCity.value = toCity.value;
  toCity.value = flag;
}

//Validations for Search
function validateFields() {
  var flag = 0;

  if (emptyFromCity()) {
    return false;
  } else if (emptytoCity()) {
    return false;
  } else if (checkSameCity()) {
    return false;
  } else if (emptyDate()) {
    return false;
  } else if (emptyAirline()) {
    return false;
  } else if (emptyClass()) {
    return false;
  } else if (getOption()) {
    return false;
  }

  //Create SearchInfo Object and storing data in the object  (1 - bug)
  //Take all the values from the form and then store in the Search Object
  var searchInfo = new SearchInfo();

  //To store the search information in local storage to access across other components when needed
  //Call the Manager method to set the search info for future use
  searchManager.setSearchInfo(searchInfo);
  document.getElementById("SearchForm").action = "../components/success.html";
  //Call to navigate to search success html and continue the flow
  // window.open("../components/success.html")
  // location.assign("../components/success.html");
}

function checkSameCity() {
  if (fromCity.value == toCity.value) {
    alert("Enter a valid city");
    return true;
  }
  return false;
}

function emptyClass() {
  if (choice.value == "") {
    alert("Enter a valid Class of Seat");
    return true;
  }
  return false;
}

function emptyAirline() {
  if (airline.value == "") {
    alert("Enter a valid Airline");
    return true;
  }
  return false;
}

function emptyFromCity() {
  if (fromCity.value == "") {
    alert("Enter a valid FromCity");
    return true;
  }
  return false;
}
function emptytoCity() {
  if (toCity.value == "") {
    alert("Enter a valid toCity");
    return true;
  }
  return false;
}
function emptyDate() {
  if (departDate.value == "") {
    alert("Enter a valid date");
    return true;
  }
  console.log(departDate.value);
  return false;
}

function getOption() {
  var selectElement1 = document.querySelector("#Adults");
  var output1 = selectElement1.value;
  console.log("Adults", output1);

  var selectElement2 = document.querySelector("#Children");
  var output2 = selectElement2.value;
  var selectElement3 = document.querySelector("#Infants");
  var output3 = selectElement3.value;
  var total = parseInt(output1) + parseInt(output2) + parseInt(output3);
  console.log(total);

  if (total >= 10) {
    console.log(total);
    alert("You can only book maximum 9 ticket at once!!");
    return true;
  } else if (parseInt(output1) < parseInt(output3)) {
    alert("Every infant should have an Adult to look after!!");
    return true;
  }

  return false;
}

function enableArriveOn() {
  document.getElementById(
    "disable"
  ).innerHTML = `<label for="exampleFormControlInput1" id="arriveOn">Return on </label>
            <input type="date" class="form-control" id="dob1">`;
  document.getElementById("dob1").min =
    new Date().getFullYear() +
    "-" +
    parseInt(new Date().getMonth() + 1) +
    "-" +
    new Date().getDate();
}

function disableArriveOn() {
  document.getElementById("disable").innerHTML = "";
}

//5. Function to load airports for the drop downs
async function loadAirports() {
  let searchManager = new SearchManager();

  //Call made to SearchCore - to get the list of Airports
  var airports = await searchManager.getAirports();
  // console.log("from core", airports);

  //Filling the data for from and to city drop downs
  for (let i = 0; i < airports.length; i++) {
    let airport = airports[i];

    //Get access to the city drop downs
    let fromCity = document.getElementById("fromCity");
    let fromCityOption = document.createElement("option");
    fromCityOption.text = `${airport.IATACode}: ${airport.airportName}, ${airport.city.name}`; //airports[i].airportName;

    let toCity = document.getElementById("toCity");
    let toCityOption = document.createElement("option");
    toCityOption.text = `${airport.IATACode}: ${airport.airportName}, ${airport.city.name}`; //airports[i].airportName;

    fromCity.add(fromCityOption);
    toCity.add(toCityOption);
  }
}

//6. Function to load travel classes for the drop down
async function loadTravelClasses() {
  //Call made to SearchCore - to get the list of travel classes
  let travelClasses = await searchManager.getTravelClasses();

  //Get access to the travel class drop down
  let travelClass = document.getElementById("travelClass");

  //Filling the data for travel class drop down
  for (let tClass in travelClasses) {
    //Creating option object for the drop down
    let travelClassOption = document.createElement("option");

    //Getting the object and formatting the way we need to display
    travelClassOption.text = travelClasses[tClass].title;
    travelClassOption.value = travelClasses[tClass].code;

    //Adding to the travel class drop down the dynamically created object
    travelClass.add(travelClassOption);
  }
}

//7. Function to load adult limit for the drop down
function loadTravelAdultLimit() {
  //Get access to the Object drop downs
  let adults = document.getElementById("Adults");

  //Filling the data for adults drop down
  for (let i in searchManager.getAdultLimit()) {
    //Creating option object for the drop down
    let adultOption = document.createElement("option");

    //Getting the object and formatting the way we need to display
    adultOption.text = i;
    adultOption.value = i;

    //Adding to the adults drop down the dynamically created object
    adults.add(adultOption);
  }
}

//8. Function to load children limit for the drop down
function loadTravelChildrenLimit() {
  //Get access to the Object drop downs
  let children = document.getElementById("Children");

  //Filling the data for children drop down
  for (let i in searchManager.getChildrenLimit()) {
    //Creating option object for the drop down
    let childOption = document.createElement("option");

    //Getting the object and formatting the way we need to display
    childOption.text = i;
    childOption.value = i;

    //Adding to the children drop down the dynamically created object
    children.add(childOption);
  }
}

//9. Function to load infants limit for the drop down
function loadTravelInfantsLimit() {
  //Get access to the Object drop downs
  let infants = document.getElementById("Infants");

  //Filling the data for adults drop down
  for (let i in searchManager.getInfantsLimit()) {
    //Creating option object for the drop down
    let infantOption = document.createElement("option");

    //Getting the object and formatting the way we need to display
    infantOption.text = i;
    infantOption.value = i;

    //Adding to the infants drop down the dynamically created object
    infants.add(infantOption);
  }
}
