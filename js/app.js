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
    console.log(phones);
    const searchResult = document.getElementById('search-result');
    // searchResult clean;
    searchResult.textContent = '';

    phones.forEach(phone => {
        console.log(phone);
        const div = document.createElement('div');
        div.innerHTML = `
                <div class="rounded-lg shadow-lg bg-white max-w-sm text-center bg-teal-300">
                    <h4 class="text-gray-900 text-3xl font-medium mb-2">
                     ${phone.brand}
                     </h4>
                        <div class ="px-20">
                             <img class="rounded-lg" src="${phone.image}" alt=""/>
                        </div>
                            <div class="p-6">
                                 <h5 class="text-gray-900 text-xl font-medium mb-2">${phone.phone_name}</h5>
                    
                                 <button onclick="('')" type="button"
                                 class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Specifications
                                 </button>
                        </div>
                </div>`;

        searchResult.appendChild(div);
    })
}