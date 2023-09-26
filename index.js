let search = "13";
let inputSearch = document.getElementById("inputSearch");
let valueInput = inputSearch.value;
// const api_url = `https://openapi.programming-hero.com/api/phones?search=${search}`;

window.addEventListener("load", async function () {
  try {
     let response = await callApi(search);
    console.log(response);
    let getClass = document.querySelector(".mobileList");
    for(let i = 0; i<response.length; i++){
       let  ele=  createElement(response[i].image, response[i].phone_name,"",response[i].slug);
      getClass.appendChild(ele);
      console.log(ele);
    }
    
    // console.log(getClass);
    
  }
   catch (err) {
    console.log(err);
  }
});
async function searchPhone(){
    // search = "";
    let phoneValue = document.getElementById("inputSearch");
    console.log(phoneValue.value);
    let response = await callApi(phoneValue.value);
    
    let getClass = document.querySelector(".mobileList");
    console.log(getClass);
    for(let i = 0; i<response.length; i++){
        let ele = createElement(response[i].image, response[i].phone_name,"")
        getClass.appendChild(ele);
        console.log(ele);
    }
}

async function callApi(searchValue){
    const api_url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
    let apiSearch = await fetch(api_url);
    let response = await apiSearch.json();
    return response.data;
}
function createElement(img_Url,phoneName, desc, slug){
  
    let div = document.createElement('div');
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
async function callModel(id){
  const api_url = `https://openapi.programming-hero.com/api/phones?search=${id}`;
  let apiSearch = await fetch(api_url);
  let response = await apiSearch.json();
  return response.data;
  console.log(response.data);
}

//----show details----
 async function showDetails(slug){
  let response = await callModel(slug);
  console.log(response);
    let div = document.createElement('div');
    div.innerHTML = `<div class="mobileItem">
    <img src="${img_Url}" alt="" / width="" height="" id="imageList">
    <h2>${phoneName}</h2>
    <p>
    Brand:${phoneName}
    </p>
    <p>
    storage:${phoneName}
    </p>
    <p>
    displaySize:${phoneName}
    </p>
    <p>
    memory:${phoneName}
    </p>
    <p>
    sensors:${phoneName}
    </p>
    <p>
    Brand:${phoneName}
    </p>

    <div>
      <button class="btn redbtn" id="btn " onclick=closeTab()>CLOSE </button>
    </div>
  </div> `;

}

