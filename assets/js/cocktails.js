function getRandomCocktail(eventObj) {
    if (eventObj) {
        eventObj.preventDefault();
    }
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                response.json().then(function (data) {
                    displayRandomCocktail(data);
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}

getRandomCocktail();

function displayRandomCocktail(cocktail) {
    console.log(cocktail.drinks[0].strDrink);

    var drinkSection = document.querySelector('#drink-section');

    drinkSection.innerHTML= '';

    var drinkName = document.createElement('h3');
    drinkName.innerHTML = cocktail.drinks[0].strDrink;
    drinkName.classList = 'is-size-3 aligntext has-text-weight-bold mb-5'
    drinkSection.appendChild(drinkName);

    var img = document.createElement('img')
    img.src = cocktail.drinks[0].strDrinkThumb;
    drinkSection.appendChild(img);
}


var cocktailButton = document.querySelector('#cocktail-button')
cocktailButton.addEventListener('click', getRandomCocktail);