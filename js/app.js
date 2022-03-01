const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);

    // clear search input value
    searchField.value = '';

    const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(phone => displayPhone(phone.data))
}

const displayPhone = phones => {
    // console.log(phones);
    const searchResult = document.getElementById('search-result');
    // searchResult clean;
    searchResult.textContent = '';

    phones.forEach(phone => {
        // console.log(phone);
        const div = document.createElement('div');
        div.innerHTML = `
                <div class="rounded-lg shadow-lg bg-white max-w-sm text-center bg-teal-200">
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

const SpecificationsPhone = phoneId => {
    // console.log(phone);
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    // console.log(url);

    fetch(url)
        .then(res => res.json())
        .then(phone => displayPhoneDetail(phone.data))
}

const displayPhoneDetail = phone => {
    console.log(phone);
    const phoneDetail = document.getElementById('phone-details');
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg bg-teal-200">
                
            <img class=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
                src="${phone.image}" alt="" />
            <div class="p-6 flex flex-col justify-start">
            <h4 class="text-gray-900 text-3xl font-medium mb-2">
                     ${phone.brand}
                </h4>
                <h5 class="text-gray-900 text-xl font-medium mb-2">${phone.name}</h5>
                <p class="text-gray-700 text-base mb-4">

                <p class="text-gray-600 text-xs">Last updated 3 mins ago</p>
            </div>
        </div>`;
    phoneDetail.appendChild(div);
}