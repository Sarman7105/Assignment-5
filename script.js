//accessing search button 
const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', function () {
    document.getElementById('error-container').style.display = "none";
    document.getElementById('foods').innerHTML = "";
    const searchForm = document.getElementById('search-foods');
    foodName = searchForm.value;
    console.log('search string length', foodName.length);

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
        creatingFoodsIfo(foods);
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
        creatingFoodsIfo(foods);
    })
    .catch(error => {
        document.getElementById('error-container').style.display = "block";
    })
};

const creatingFoodsIfo = (foods) => {
    foods.forEach(element => {

            const foodDiv = document.createElement('div');
            const htmlTag = `<img src="${element.strMealThumb}">
                            <h3>${element.strMeal}</h3>`;
            
            foodDiv.innerHTML = htmlTag;
            foodDiv.addEventListener('click',foodDivClick)
            document.getElementById("foods").appendChild(foodDiv);
        });
};

function foodDivClick(){
    console.log(this)
    var childFoodName = this.children[1];
    foodName = childFoodName.innerText;
    console.log({ foodName });
    // console.log('children', childFoodName.innerText);
    var result = fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`)
        .then(res => res.json())
        .then(data => {
            // const element=[];
            let name = "";
            let url = "";
            console.log(data.meals.length);
            for (let i = 0; i < data.meals.length; i++){
                if (foodName === data.meals[i].strMeal) {
                    name = data.meals[i].strMeal;
                    url = data.meals[i].strMealThumb;
                    break;
                }
            }
            const element = data.meals[0];
            // console.log('img src', element.strMealThumb);
            // console.log('food name', element.strMeal);
            const foodDiv = document.createElement('div');
            const htmlTag = `<img src="${url}">
                            <h2>${name}</h2>
                            <h4>Ingridients</h4>
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