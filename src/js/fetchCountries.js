
export default function fetchCountries(searchQuery) {
    if (searchQuery) {
        return fetch(`https://restcountries.com/v2/name/${searchQuery}`)
            .then(response => {
                if (response.ok) return response.json();
                throw new Error('Error fetching data');
            })
            .catch(error => {
                console.error('Error: ', error);
            });
    };
};