async function fetchCountries() {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();
    return data.map(country => ({
        name: country.name.common,
        flag: country.flags.svg,
        population: country.population.toLocaleString(),
        capital: country.capital ? country.capital[0] : 'No capital' 
    }));
}

async function searchCountries() {
    const query = document.getElementById('search').value.toLowerCase();
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; 

    if (!query) return; 
    const countries = await fetchCountries(); 
    const filtered = countries.filter(c => c.name.toLowerCase().startsWith(query)); 

    if (filtered.length === 0) {
        resultsContainer.innerHTML = '<p>No countries found.</p>';
    } else {
        filtered.forEach(c => {
            resultsContainer.innerHTML += `
                <div class="country">
                    <span>${c.name}</span>
                    <span>${c.population} people</span>
                    <span>Capital: ${c.capital}</span> <!-- Show capital city -->
                    <img class="flag" src="${c.flag}" alt="Flag of ${c.name}">
                </div>
            `;
        });
    }
}

document.getElementById('search').addEventListener('input', searchCountries);
