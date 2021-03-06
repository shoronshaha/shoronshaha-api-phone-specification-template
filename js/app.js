// error message display none

document.getElementById('error-message').style.display = 'none';
document.getElementById('error2-message').style.display = 'none';

// search box function

const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    // clear data
    searchField.value = '';

    const phoneDetail = document.getElementById('phone-details');

    // replace the previous specification to new one
    phoneDetail.textContent = '';

    document.getElementById('error-message').style.display = 'none';
    document.getElementById('error2-message').style.display = 'none';

    // error handelar control

    if (searchText == '') {
        document.getElementById('error-message').style.display = 'block';
    }
    else {

        // load data
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(phone => displayPhone(phone.data));
    }
}

// display search results phone details 

const displayPhone = phones => {
    const searchResult = document.getElementById('search-result');
    const first20Phones = phones.slice(0, 20);

    // searchResult clean;
    searchResult.textContent = '';

    // error handeler function
    if (phones == '') {
        document.getElementById('error2-message').style.display = 'block';
    }

    first20Phones.forEach(phone => {
        const div = document.createElement('div');
        div.innerHTML = `
                <div class="rounded-lg shadow-lg bg-white max-w-sm text-center bg-teal-50">
                    <h4 class="text-gray-900 text-3xl font-medium mb-2">
                     ${phone.brand}
                     </h4>
                        <div class ="px-20">
                             <img class="rounded-lg" src="${phone.image}" alt=""/>
                        </div>
                            <div class="p-6">
                                 <h5 class="text-gray-900 text-xl font-medium mb-2">${phone.phone_name}</h5>
                    
                                 <button onclick="SpecificationsPhone('${phone.slug}')" type="button"
                                 class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Specifications
                                 </button>
                        </div>
                </div>`;

        searchResult.appendChild(div);
    })
};

// display phone specification details 

const SpecificationsPhone = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`

    fetch(url)
        .then(res => res.json())
        .then(phoneId => displayPhoneDetail(phoneId.data))
}

const displayPhoneDetail = specifications => {

    const phoneDetail = document.getElementById('phone-details');

    // replace the previous specification to new one
    phoneDetail.textContent = '';

    let release = '';
    let wlan = "";
    let bluetooth = "";
    let gps = "";
    let nfc = "";
    let radio = "";
    let usb = "";

    if (specifications.releaseDate == '') {
        release = 'Not Found';
    }
    else {
        release = specifications.releaseDate;
    }

    let other = specifications.others?.WLAN;
    if (other == undefined) {
        wlan = 'No info to show';
        bluetooth = 'No info to show';
        gps = 'No info to show';
        nfc = 'No info to show';
        radio = 'No info to show';
        usb = 'No info to show';
    }
    else {
        wlan = specifications.others.WLAN;
        bluetooth = specifications.others.Bluetooth;
        gps = specifications.others.GPS;
        nfc = specifications.others.NFC;
        radio = specifications.others.Radio;
        usb = specifications.others.USB;
    }

    const div = document.createElement('div');
    div.innerHTML = `

       <div class="flex flex-col md:flex-row md:max-w-full rounded-lg bg-white shadow-lg bg-teal-50 ">
                   
               <img class="w-full"
                   src="${specifications.image}" alt="" />
               <div class="p-6 flex flex-col justify-start">
                    <h4 class="text-gray-900 text-3xl font-medium mb-2">
                       Brand: ${specifications.brand}
                    </h4>
                   <h5 class="text-gray-900 text-xl font-medium mb-2">Name: ${specifications.name}</h5>
                   <p class="text-gray-900 text-sm font-medium mb-2">Release Date: ${release}</p>
                     <h5 class="text-gray-900 text-xl font-medium mb-2">Main Features </h5>
                   <p class="text-gray-900 text-sm font-medium mb-2">Chipset: ${specifications.mainFeatures.chipSet}</p>
                   <p class="text-gray-900 text-sm font-medium mb-2">Display Size: ${specifications.mainFeatures.displaySize}</p>
                   <p class="text-gray-900 text-sm font-medium mb-2">Memory: ${specifications.mainFeatures.memory}</p>
                   <p class="text-gray-900 text-sm font-medium mb-2">Storage: ${specifications.mainFeatures.storage}</p>
                    <h5 class="text-gray-900 text-xl font-medium mb-2">Sensors</h5>
                   <p class="text-gray-900 text-sm font-medium mb-2"> ${specifications.mainFeatures.sensors}</p>
                    <h5 class="text-gray-900 text-xl font-medium mb-2">Others </h5>
                   <p class="text-gray-900 text-sm font-medium mb-2">Bluetooth: ${bluetooth}</p>
                   <p class="text-gray-900 text-sm font-medium mb-2">GPS: ${gps}</p>
                   <p class="text-gray-900 text-sm font-medium mb-2">NFC: ${nfc}</p>
                   <p class="text-gray-900 text-sm font-medium mb-2">Radio: ${radio}</p>
                   <p class="text-gray-900 text-sm font-medium mb-2">USB: ${usb}</p>
                   <p class="text-gray-900 text-sm font-medium mb-2">WLAN: ${wlan}</p>

               </div>
           </div>`;
    phoneDetail.appendChild(div);


}

