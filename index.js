let search = "11";
let inputSearch = document.getElementById("inputSearch");
let valueInput = inputSearch.value;
// const api_url = `https://openapi.programming-hero.com/api/phones?search=${search}`;

window.addEventListener("load", async function () {
  try {
    let response = await callApi(search);
    console.log(response);
    let getClass = document.querySelector(".mobileList");
    for (let i = 0; i < response.length; i++) {
      let ele = createElement(
        response[i].image,
        response[i].phone_name,
        "",
        response[i].slug
      );
      getClass.appendChild(ele);
      console.log(ele);
    }

    // console.log(getClass);
  } catch (err) {
    console.log(err);
  }
});
async function searchPhone() {
  // search = "";
  let getClass = document.querySelector(".mobileList");

  // Remove all child elements (previous search results)
  while (getClass.firstChild) {
    getClass.removeChild(getClass.firstChild);
  }

  console.log(getClass);

  let phoneValue = document.getElementById("inputSearch");
  console.log(phoneValue.value);
  let response = await callApi(phoneValue.value);

  for (let i = 0; i < response.length; i++) {
    let ele = createElement(
      response[i].image,
      response[i].phone_name,
      "",
      response[i].slug
    );
    getClass.appendChild(ele);
    console.log(ele);
  }
}

async function callApi(searchValue) {
  const api_url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
  let apiSearch = await fetch(api_url);
  let response = await apiSearch.json();
  return response.data;
}
function createElement(img_Url, phoneName, desc, slug) {
  let div = document.createElement("div");
  div.innerHTML = `
         <div class="mobileItem">
         <img src="${img_Url}" alt="" / width="" height="" id="imageList">
         <h2>${phoneName}</h2>
         <p>
           There are many variations of passages of available, but the <br />
           majority have suffered
         </p>
 
         <div>
           <button class="btn" id="btn" onclick=showDetails('${slug}')>SHOW DETAILS</button>
         </div>
       </div> `;

  return div;
}
async function callModel(id) {
  const api_url = ` https://openapi.programming-hero.com/api/phone/${id}`;
  let apiSearch = await fetch(api_url);
  let response = await apiSearch.json();
  return response.data;
  // console.log(response.data);
}

//----show details----
async function showDetails(slug) {
  // Fetch mobile phone details based on the slug
  let response = await callModel(slug);

  // Check if the API response contains the necessary properties
  if (response) {
    // Access the properties and store them in variables
    let brand = response.brand || "N/A"; // Default value if brand is missing
    let image = response.image || ""; // Default value if image URL is missing
    let mainFeatures = response.mainFeatures || {};
    let chipSet = mainFeatures.chipSet || "N/A";
    let displaySize = mainFeatures.displaySize || "N/A";
    let memory = mainFeatures.memory || "N/A";
    let sensors = mainFeatures.sensors || [];
    let storage = response.storage || "N/A";

    // Create a modal container
    let modal = document.createElement("div");
    modal.className = "modal";

    // Set the content of the modal
    modal.innerHTML = `
      <div class="modal-content">
      
        <img src="${image}" alt="${brand}" width="100px" height="80px" id="imageList">
        <h2>${brand}</h2>
        <p>Chipset: ${chipSet}</p>
        <p>Display Size: ${displaySize}</p>
        <p>Memory: ${memory}</p>
        <p>Storage: ${storage}</p>
        <p>Sensors: ${sensors.join(", ")}</p>
        <button onclick=closeTab()>CLOSE</button>
      </div>
    `;

    // Append the modal to the body
    document.body.appendChild(modal);
  } else {
    // Handle the case where the response is missing or undefined
    console.log("Phone details not available");
  }
}

function closeTab() {
  // Find and remove the modal
  let modal = document.querySelector(".modal");
  if (modal) {
    modal.parentNode.removeChild(modal);
  }
}
