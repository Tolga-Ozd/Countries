let countries;

const getData = async () => {
    try{
    const URL = "https://restcountries.com/v3.1/all";
    const res = await fetch(URL)
    if(!res.ok){
        throw new Error("Country can not be fetched")
    }
    const data = await res.json()
    countries = data;
    getName(data);
    } catch(error){
      console.log(error);
    }
  }
  
const select = document.querySelector("#mySelect")

select.addEventListener("change", (e) => {
    const selected = e.currentTarget.value;
    console.log(selected);
    if (selected) {
      const selectedCountry = countries.filter((c) => {
        return c.name.common === selected;
      });
      console.log(selectedCountry);
      if (selectedCountry.length > 0) {
        writeDOM(selectedCountry);
      } else {
        console.log("Selected country not found");
      }
    }
  });

const getName = (arr) => {
    arr.map((item) => {
      const cName = item.name.common;
      // console.log(cName);
      select.innerHTML += `
      <option value=${cName}>${cName}</option>
      `;
    });
};

const writeDOM = (w) => {
    const {
      flags: { png },
      name: { common },
      region,
      capital,
      languages,
      currencies,
      population,
      borders,
      maps: { googleMaps },
    } = w[0];
  
    const cardSection = document.querySelector(".card");

    cardSection.innerHTML = `
    <div class="card m-auto pt-2 " style="width: 230px height:100px">
          <img src="${png}" class="card-img-top" alt="..." />
          <div class="card-body">
            <h6 class="card-title fs-4">${common}</h6>
          </div>
          <ul class="list-group list-group-flush">
      <li class="list-group-item">
        <i class="fa-solid fa-earth-oceania"></i><span class="fw-bold"> Region:</span> ${region}
      </li>
      <li class="list-group-item">
        <i class="fas fa-lg fa-landmark"></i>
        <span class="fw-bold"> Capitals:</span> ${capital}
      </li>
      <li class="list-group-item">
        <i class="fas fa-lg fa-comments"></i>
        <span class="fw-bold"> Languages:</span>${Object.values(languages)}
      </li>
      <li class="list-group-item">
        <i class="fas fa-lg fa-money-bill-wave"></i>
        <span class="fw-bold"> Currencies:</span> 
        ${Object.values(currencies)[0].name}, 
        ${Object.values(currencies)[0].symbol}
      </li>
      <li class="list-group-item">
      <i class="fa-solid fa-people-group"></i></i>
      <span class="fw-bold"> Population:</span> ${population}
    </li>
      <li class="list-group-item">
      <i class="fa-sharp fa-solid fa-road-barrier"></i>
      <span class="fw-bold"> Borders:</span> ${borders}
    </li>
    </li>
    <li class="list-group-item">
      <i class="fa-solid fa-map-location-dot"></i><span class="fw-bold"> Map:</span> <a href= ${googleMaps}
         target='_blank'> Go to google map</a> </li>
    </ul>
        </div>`;
};

window.addEventListener("load", () => {
    getData();
});