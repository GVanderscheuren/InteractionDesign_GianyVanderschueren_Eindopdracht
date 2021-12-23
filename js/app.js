//Display the json data from the bored API
let showResult = (queryResponse) => {
  let html = "";
  //If there is no task that matches the given parameters, the API will return an error
  if (queryResponse.error != null) {
    const error = queryResponse.error;
    html = `
    <div class="c-errormsg">
        <p >${error}.</p>
        <p>Try again with other parameters.</p>
    </div>
    <hr>
    `;
  } else {
    const accessibility = queryResponse.accessibility,
      activity = queryResponse.activity,
      key = queryResponse.key,
      link = queryResponse.link,
      participants = queryResponse.participants,
      price = queryResponse.price,
      type = queryResponse.type;

    // console.log(link);

    //transform the received data to readable html
    html = `
            <h2 class="c-activity">${activity}</h2>
            <p class="c-activityKey">#${key}</p>
            <label for="type">Type of activity</label>
            <p class="c-activityType" id="type">${type}</p>
            <label for="participants">Participants</label>
            <div class="c-activityParticipants" id="participants">`;
    //Data visualization of the amount of participants needed
    let i = 0;
    for (i = 0; i < participants; i++) {
      html += `<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 384"><defs><style>.cls-1{fill:#fff;}</style></defs><path class="cls-1" d="M114,588V204H498V588Zm191.64-12H447.78c9.93,0,14.33-4.46,14.34-14.47,0-18.63.07-37.25-.05-55.87a100.52,100.52,0,0,0-1-15.32C453.16,441.58,413.53,408,364,408q-57.94,0-115.89,0a102.83,102.83,0,0,0-15.7,1c-48.48,7.7-82.39,47.48-82.46,96.58q0,27.93,0,55.87c0,10.17,4.39,14.54,14.63,14.54ZM306,384A84,84,0,1,0,222,300,84.07,84.07,0,0,0,306,384Z" transform="translate(-114 -204)"/><path d="M305.64,576h-141c-10.24,0-14.63-4.37-14.63-14.54q0-27.94,0-55.87c.07-49.1,34-88.88,82.46-96.58a102.83,102.83,0,0,1,15.7-1q57.94-.12,115.89,0c49.5,0,89.13,33.62,97,82.38a100.52,100.52,0,0,1,1,15.32c.12,18.62.05,37.24.05,55.87,0,10-4.41,14.46-14.34,14.47Z" transform="translate(-114 -204)"/><path d="M306,384a84,84,0,1,1,84.06-83.89A84.08,84.08,0,0,1,306,384Z" transform="translate(-114 -204)"/></svg>`;
    }
    html += `</div>
            <label for="price">Price</label>
            <div class="c-activityBar" id="price">
                <div class="c-activityBar--progress" style="width:${
                  price * 100
                }%;"> 
                </div>
            </div>
            <label for="access">Accessibility</label>
            <div class="c-activityBar" id="access">
                <div class="c-activityBar--progress" style="width:${
                  accessibility * 100
                }%;"> 
                </div>
            </div>`;
    if (link != "") {
      html += `<a href="${link}" class="c-activityLink" target="blank">More info</a>
      <hr>`;
    } else {
      html += `<hr>`;
    }
  }
  document.querySelector(".js-response").innerHTML = html;
};

//Function to send a request to the bored API
let getAPI = async (
  type = "",
  participants = "",
  accessibility = "",
  price = ""
) => {
  //If the search terms are empty, the bored API will return a random task
  let searchTerm = `?type=${type.toLowerCase()}&participants=${participants}&accessibility=${accessibility}&price=${price}`;
  //   console.log(searchTerm);

  const ENDPOINT = `http://www.boredapi.com/api/activity`;

  const request = await fetch(`${ENDPOINT}${searchTerm}`);
  //   console.log(request);
  const data = await request.json();
  //   console.log(data);

  showResult(data);
};

// Add eventListeners on the buttons
let clickEventHandler = function () {
  //Eventlistener for the "random" button
  const randomBtn = document.querySelector(".js-randombtn");
  randomBtn.addEventListener("click", function (e) {
    e.preventDefault;
    randomBtn.classList.add("success");
    randomBtn.classList.add("animate");
    getAPI();
  });

  //EventListener for the "search" button
  const form = document.getElementsByName("bored-form")[0];
  let search = document.querySelector(".js-searchbtn");
  search.addEventListener("click", function (e) {
    e.preventDefault();
    search.classList.add("success");
    search.classList.add("animate");
    //Read value for each input of the form
    let type = document.getElementById("type").value;
    // console.log(type);
    let participants = document.getElementById("participants").value;
    let accessibility = document.getElementById("accessibility").value;
    accessibility = accessibility / 10;
    let price = document.getElementById("price").value;
    price = price / 10;

    if (accessibility == 0) {
      accessibility = "";
    }
    if (price == 0 || price == null) {
      price = "";
    }
    form.reset();
    getAPI(type, participants, accessibility, price);
  });
};

// Load in DOMContent and initialize js
document.addEventListener("DOMContentLoaded", function () {
  clickEventHandler();
});
