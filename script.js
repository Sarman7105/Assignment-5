const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', function () {
    const searchForm = document.getElementById('search-foods');
    foodName = searchForm.value;
    console.log(foodName);
    searchFood(foodName);
});

function searchFood(foodName) {
     var result = fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${foodName}`)

    .then(res => res.json())
    .then(data => {
        console.log("data", data);
        console.log(data.meals[0].strMealThumb);
        var array = data.meals;
        array.forEach(element => {
            const foodDiv = document.createElement('div');
            const htmlTag = `<img src="${element.strMealThumb}">
                            <h3>${element.strMeal}</h3>
                            `;
            // const img = document.createElement('img');
            // img.src = element.strMealThumb;
            // foodDiv.appendChild(img);
            foodDiv.innerHTML = htmlTag;
            document.getElementById("foods").appendChild(foodDiv);
        });
    })
 }