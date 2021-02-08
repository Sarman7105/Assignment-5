//accessing search button 
const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', function () {
    document.getElementById('error-container').style.display = "none";
    document.getElementById('foods').innerHTML = "";
    document.getElementById('food-info').innerHTML = "";
    const searchForm = document.getElementById('search-foods');
    foodName = searchForm.value;
    

    //if the search string length is 1 then search by first letter else search by full name
    if (foodName.length > 1)
        searchFoodByFullName(foodName);
    else
        searchFoodByFirstLetter(foodName);
});

const searchFoodByFirstLetter = (foodName) =>{
    
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${foodName}`)
    .then(res => res.json())
    .then(data => {
        const foods = data.meals;
        creatingFoodsInfo(foods);
    })
    .catch(error => {
        document.getElementById('error-container').style.display = "block";
    })
};

//implementing search by FullName
const searchFoodByFullName=(foodName) =>{
    
     var result = fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`)

    .then(res => res.json())
    .then(data => {
        const foods = data.meals;
        creatingFoodsInfo(foods);
    })
    .catch(error => {
        document.getElementById('error-container').style.display = "block";
    })
};

const creatingFoodsInfo = (foods) => {
    foods.forEach(element => {

            const foodDiv = document.createElement('div');
            const htmlTag = `<img src="${element.strMealThumb}">
                            <h3>${element.strMeal}</h3>
                            <p>click to get ingredients</p>`;
            
            foodDiv.innerHTML = htmlTag;
            foodDiv.addEventListener('click',foodDivClick)
            document.getElementById("foods").appendChild(foodDiv);
        });
};

//showing particular food ingredients
function foodDivClick(){
    
    var childFoodName = this.children[1];
    let foodName = childFoodName.innerText;
    var result = fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`)
        .then(res => res.json())
        .then(data => {
            // const element=[];
            let name = "";
            let url = "";
            for (let i = 0; i < data.meals.length; i++){
                if (foodName === data.meals[i].strMeal) {
                    name = data.meals[i].strMeal;
                    url = data.meals[i].strMealThumb;
                    break;
                }
            }
            const element = data.meals[0];
            const foodDiv = document.createElement('div');
            const htmlTag = `<img src="${url}">
                            <h2>${name}</h2>
                            <h4>Ingredients</h4>
                            <ul>
                                <li>${element.strIngredient1}</li>
                                <li>${element.strIngredient2}</li>
                                <li>${element.strIngredient3}</li>
                                <li>${element.strIngredient4}</li>
                                <li>${element.strIngredient5}</li>
                            </ul>
                            `;
            foodDiv.innerHTML = htmlTag;
            document.getElementById("food-info").appendChild(foodDiv);
    })
}