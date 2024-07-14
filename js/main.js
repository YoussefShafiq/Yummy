/// <reference types="../@types/jquery" />
import { Meal } from "./Meal.js";

// DisplayRadomMeals
DisplayRandomMeals()
async function DisplayRandomMeals() {
    let meal = new Meal()
    let meals = await meal.fetchRandomMeals()
    document.getElementById('randomMeals').innerHTML = ``
    for (let i = 0; i < Math.min(meals.length, 20); i++) {
        document.getElementById('randomMeals').innerHTML += `
        <div class="col-md-3 my-3">
        <div mealid=${meals[i].idMeal} class="meal position-relative rounded overflow-hidden">
        <div class="pic overflow-hidden ">
        <img src="${meals[i].strMealThumb}" class="mealimg w-100" alt="">
        </div>
        <div class="mealinfo position-absolute start-0 top-100 w-100 h-100 d-grid">
        <div class="m-auto text-black fw-bold fs-2">${meals[i].strMeal}</div>
        </div>
            </div>
            </div>
        `
        $('.meal').on('click', function () {
            let id = $(this).attr('mealid')
            DisplayMealDetails(id)
        })
    }
}

// display searched meals by name
$('#searchByName').on('input',
    async function DisplaySearchedMeals() {
        let name = $(this).val()
        let meal = new Meal()
        let meals = await meal.fetchMealByName(name)

        // console.log(meals);
        document.getElementById('searchedMeals').innerHTML = ``
        for (let i = 0; i < Math.min(meals.length, 20); i++) {
            document.getElementById('searchedMeals').innerHTML += `
            <div class="col-md-3 my-3">
            <div mealid=${meals[i].idMeal} class="meal position-relative rounded overflow-hidden">
            <div class="pic overflow-hidden ">
            <img src="${meals[i].strMealThumb}" class="mealimg w-100" alt="">
            </div>
            <div class="mealinfo position-absolute start-0 top-100 w-100 h-100 d-grid">
            <div class="m-auto text-black fw-bold fs-2">${meals[i].strMeal}</div>
            </div>
                </div>
                </div>
            `
            $('.meal').on('click', function () {
                let id = $(this).attr('mealid')
                DisplayMealDetails(id)
            })
        }
    }
)
$('#searchByLetter').on('input',
    async function DisplaySearchedMeals() {
        let letter = $(this).val()
        let meal = new Meal()
        let meals = await meal.fetchMealByLetter(letter)
        // console.log(meals);
        document.getElementById('searchedMeals').innerHTML = ``
        for (let i = 0; i < meals.length; i++) {
            document.getElementById('searchedMeals').innerHTML += `
            <div class="col-md-3 my-3">
            <div mealid=${meals[i].idMeal} class="meal position-relative rounded overflow-hidden">
            <div class="pic overflow-hidden ">
            <img src="${meals[i].strMealThumb}" class="mealimg w-100" alt="">
            </div>
            <div class="mealinfo position-absolute start-0 top-100 w-100 h-100 d-grid">
            <div class="m-auto text-black fw-bold fs-2">${meals[i].strMeal}</div>
            </div>
                </div>
                </div>
            `
            $('.meal').on('click', function () {
                let id = $(this).attr('mealid')
                DisplayMealDetails(id)
            })
        }
    }
)

// display areas
DisplayAllAreas()
async function DisplayAllAreas() {
    let meal = new Meal()
    let areas = await meal.fetchAllAreas()
    document.getElementById('allAreas').innerHTML = ``
    for (let i = 0; i < areas.length; i++) {
        document.getElementById('allAreas').innerHTML += `
                <div area="${areas[i].strArea}" class="area col-md-3 my-3">
                    <div class="d-flex flex-column justify-content-center align-items-center text-light">
                        <i class="fa-solid fa-house-flag fs-1"></i>
                        <h2>${areas[i].strArea}</h2>
                    </div>
                </div>
        `
        $('.area').on('click', function () {
            let area = $(this).attr('area')
            displayAreaMeals(area)
        })
    }
}

// display area meals
async function displayAreaMeals(area) {
    $('.container').fadeOut(100)
    $('#areaMealsPage').fadeIn(150)
    let meal = new Meal()
    let meals = await meal.fetchArea(area)
    // console.log(meals);
    document.getElementById('areaMeals').innerHTML = ``
    for (let i = 0; i < Math.min(meals.length, 20); i++) {
        document.getElementById('areaMeals').innerHTML += `
            <div class="col-md-3 my-3">
            <div mealid=${meals[i].idMeal} class="meal position-relative rounded overflow-hidden">
            <div class="pic overflow-hidden ">
            <img src="${meals[i].strMealThumb}" class="mealimg w-100" alt="">
            </div>
            <div class="mealinfo position-absolute start-0 top-100 w-100 h-100 d-grid">
            <div class="m-auto text-black fw-bold fs-2">${meals[i].strMeal}</div>
            </div>
                </div>
                </div>
            `
        $('.meal').on('click', function () {
            let id = $(this).attr('mealid')
            DisplayMealDetails(id)
        })
    }
}

// display ingredients
DisplayAllIngredients()
async function DisplayAllIngredients() {
    let meal = new Meal()
    let ingredients = await meal.fetchAllIngredients()
    document.getElementById('allIngredients').innerHTML = ``
    for (let i = 0; i < ingredients.length; i++) {
        const ingredient = ingredients[i].strDescription;
        const truncatedIngredient = ingredient.slice(0, 200) + '...';
        document.getElementById('allIngredients').innerHTML += `
                <div ingredient="${ingredients[i].strIngredient}" class="ingredient col-md-3 my-3">
                    <div class="ingredient d-flex flex-column text-center text-light">
                        <i class="fa-solid fa-utensils fs-1"></i>
                        <h2>${ingredients[i].strIngredient}</h2>
                        <p>${truncatedIngredient}</p>
                    </div>
                </div>
        `
        $('.ingredient').on('click', function () {

            let ingredient = $(this).attr('ingredient')
            setTimeout(() => {

            }, 100);
            if (ingredient) {
                // console.log(ingredient);
                displayIngredientMeals(ingredient)
            }
        })
    }
}

// display ingredient meals
async function displayIngredientMeals(ingredient) {
    // console.log('ingredient is:' + ingredient);
    document.getElementById('ingredientMeals').innerHTML = `
    <div class="d-grid spincont">
                    <span class="loader m-auto"></span>
                </div>
    `
    $('.container').fadeOut(100)
    $('#ingredientMealsPage').fadeIn(150)
    let meals = [];
    let meal = new Meal()
    meals = await meal.fetchIngredient(ingredient)

    if (!meals) {
        document.getElementById('ingredientMeals').innerHTML = `
                <h1 class="text-center text-warning mt-5">no meals found</h1>
        `

    } else {
        document.getElementById('ingredientMeals').innerHTML = ``

        for (let i = 0; i < Math.min(meals.length, 20); i++) {
            document.getElementById('ingredientMeals').innerHTML += `
            <div class="col-md-3 my-3">
            <div mealid=${meals[i].idMeal} class="meal position-relative rounded overflow-hidden">
            <div class="pic overflow-hidden ">
            <img src="${meals[i].strMealThumb}" class="mealimg w-100" alt="">
            </div>
            <div class="mealinfo position-absolute start-0 top-100 w-100 h-100 d-grid">
            <div class="m-auto text-black fw-bold fs-2">${meals[i].strMeal}</div>
            </div>
                </div>
                </div>
            `
            $('.meal').on('click', function () {
                let id = $(this).attr('mealid')
                DisplayMealDetails(id)
            })
        }
    }
}

// display all categories
DisplayAllCategories()
async function DisplayAllCategories() {
    let meal = new Meal()
    let Categories = await meal.fetchAllCategories()
    document.getElementById('allCategories').innerHTML = ``
    for (let i = 0; i < Categories.length; i++) {
        let desc = Categories[i].strCategoryDescription
        let truncateddesc = desc.slice(0, 100) + '...'
        document.getElementById('allCategories').innerHTML += `
                <div class=" col-md-3 my-3">
                    <div category='${Categories[i].strCategory}' class="category categoryimg position-relative rounded overflow-hidden">
                        <div class="pic overflow-hidden ">
                            <img src="${Categories[i].strCategoryThumb}" class="mealimg w-100" alt="">
                        </div>
                        <div class="categoryinfo position-absolute start-0 top-100 w-100 d-grid">
                            <div class="m-auto text-black fw-bold">
                                <h2>${Categories[i].strCategory}</h2>
                                <p>${truncateddesc}</p>
                            </div>
                        </div>
                    </div>
                </div>
        `
        $('.category').on('click', function () {
            let category = $(this).attr('category')
            setTimeout(() => {
            }, 100);
            if (category) {
                // console.log(category);
                displayCategoryMeals(category)
            }
        })
    }
}

// display category meals
async function displayCategoryMeals(category) {
    document.getElementById('categoryMeals').innerHTML = `
    <div class="d-grid spincont">
                    <span class="loader m-auto"></span>
                </div>
    `
    $('.container').fadeOut(100)
    $('#categoryMealsPage').fadeIn(150)
    let meals = [];
    let meal = new Meal()
    meals = await meal.fetchCategory(category)

    if (!meals) {
        document.getElementById('categoryMeals').innerHTML = `
                <h1 class="text-center text-warning mt-5">no meals found</h1>
        `

    } else {
        document.getElementById('categoryMeals').innerHTML = ``

        for (let i = 0; i < Math.min(meals.length, 20); i++) {
            document.getElementById('categoryMeals').innerHTML += `
            <div class="col-md-3 my-3">
            <div mealid=${meals[i].idMeal} class="meal position-relative rounded overflow-hidden">
            <div class="pic overflow-hidden ">
            <img src="${meals[i].strMealThumb}" class="mealimg w-100" alt="">
            </div>
            <div class="mealinfo position-absolute start-0 top-100 w-100 h-100 d-grid">
            <div class="m-auto text-black fw-bold fs-2">${meals[i].strMeal}</div>
            </div>
                </div>
                </div>
            `
            $('.meal').on('click', function () {
                let id = $(this).attr('mealid')
                DisplayMealDetails(id)
            })
        }
    }
}



// DisplayMealDetails
async function DisplayMealDetails(id) {
    $('#mealDetailsContainer').fadeIn(500)
    let meal = new Meal()
    let mealDetails = await meal.fetchMealDetails(id)
    let recipesUI = ''
    let tagsArr = []
    if (mealDetails.strTags) {
        let tags = mealDetails.strTags
        tagsArr = tags.split(',');
    }
    let tagsUI = ``
    if (tagsArr.length > 0) {
        for (let i = 0; i < tagsArr.length; i++) {
            tagsUI += `
        <div class="tag">${tagsArr[i]}</div>
        `

        }
    }


    if (mealDetails.strIngredient1 != '' && mealDetails.strIngredient1 != null)
        recipesUI += `<div class="recipe">${mealDetails.strIngredient1}</div>`
    if (mealDetails.strIngredient2 != '' && mealDetails.strIngredient2 != null)
        recipesUI += `<div class="recipe">${mealDetails.strIngredient2}</div>`
    if (mealDetails.strIngredient3 != '' && mealDetails.strIngredient3 != null)
        recipesUI += `<div class="recipe">${mealDetails.strIngredient3}</div>`
    if (mealDetails.strIngredient4 != '' && mealDetails.strIngredient4 != null)
        recipesUI += `<div class="recipe">${mealDetails.strIngredient4}</div>`
    if (mealDetails.strIngredient5 != '' && mealDetails.strIngredient5 != null)
        recipesUI += `<div class="recipe">${mealDetails.strIngredient5}</div>`
    if (mealDetails.strIngredient6 != '' && mealDetails.strIngredient6 != null)
        recipesUI += `<div class="recipe">${mealDetails.strIngredient6}</div>`
    if (mealDetails.strIngredient7 != '' && mealDetails.strIngredient7 != null)
        recipesUI += `<div class="recipe">${mealDetails.strIngredient7}</div>`
    if (mealDetails.strIngredient8 != '' && mealDetails.strIngredient8 != null)
        recipesUI += `<div class="recipe">${mealDetails.strIngredient8}</div>`
    if (mealDetails.strIngredient9 != '' && mealDetails.strIngredient9 != null)
        recipesUI += `<div class="recipe">${mealDetails.strIngredient9}</div>`
    if (mealDetails.strIngredient10 != '' && mealDetails.strIngredient10 != null)
        recipesUI += `<div class="recipe">${mealDetails.strIngredient10}</div>`
    if (mealDetails.strIngredient11 != '' && mealDetails.strIngredient11 != null)
        recipesUI += `<div class="recipe">${mealDetails.strIngredient11}</div>`
    if (mealDetails.strIngredient12 != '' && mealDetails.strIngredient12 != null)
        recipesUI += `<div class="recipe">${mealDetails.strIngredient12}</div>`
    if (mealDetails.strIngredient13 != '' && mealDetails.strIngredient13 != null)
        recipesUI += `<div class="recipe">${mealDetails.strIngredient13}</div>`
    if (mealDetails.strIngredient14 != '' && mealDetails.strIngredient14 != null)
        recipesUI += `<div class="recipe">${mealDetails.strIngredient14}</div>`
    if (mealDetails.strIngredient15 != '' && mealDetails.strIngredient15 != null)
        recipesUI += `<div class="recipe">${mealDetails.strIngredient15}</div>`
    if (mealDetails.strIngredient16 != '' && mealDetails.strIngredient16 != null)
        recipesUI += `<div class="recipe">${mealDetails.strIngredient16}</div>`
    if (mealDetails.strIngredient17 != '' && mealDetails.strIngredient17 != null)
        recipesUI += `<div class="recipe">${mealDetails.strIngredient17}</div>`
    if (mealDetails.strIngredient18 != '' && mealDetails.strIngredient18 != null)
        recipesUI += `<div class="recipe">${mealDetails.strIngredient18}</div>`
    if (mealDetails.strIngredient19 != '' && mealDetails.strIngredient19 != null)
        recipesUI += `<div class="recipe">${mealDetails.strIngredient19}</div>`
    if (mealDetails.strIngredient20 != '' && mealDetails.strIngredient20 != null)
        recipesUI += `<div class="recipe">${mealDetails.strIngredient20}</div>`

    let strsrcUI = ``;
    if (mealDetails.strSource == null) {
        strsrcUI = ``
    } else {
        strsrcUI = `<a href="${mealDetails.strSource}" target="_blank" class="btn btn-success">Source</a>`
    }

    let details = `
                <div class="col-md-3">
                    <img src="${mealDetails.strMealThumb}" class="w-100 rounded" alt="">
                    <h2>${mealDetails.strMeal}</h2>
                </div>
                <div class="col-md-9">
                    <div class="d-flex flex-column">
                        <h2>Instructions</h2>
                        <p>${mealDetails.strInstructions}</p>
                        <div class="d-flex align-items-center gap-2">
                            <h2>Area:</h2>
                            <h3>${mealDetails.strArea}</h3>
                        </div>
                        <div class="d-flex align-items-center gap-2">
                            <h2>category:</h2>
                            <h3>${mealDetails.strCategory}</h3>
                        </div>
                        <h2>Recipes:</h2>
                        <div class="recipes d-flex gap-2 flex-wrap ps-2">
                            ${recipesUI}
                        </div>
                        <h2>Tags:</h2>
                        <div class="tags d-flex gap-2 flex-wrap ps-2">
                            ${tagsUI}
                        </div>
                        <div class="d-flex my-4 gap-3">
                            ${strsrcUI}
                            <a href="${mealDetails.strYoutube}" class="btn btn-danger">Youtube</a>
                        </div>
                    </div>
                </div>
    `
    document.getElementById('mealDetails').innerHTML = details



}

// sidenav toggle
let sidenav = false;

$('.show').on('click', function () {
    if (sidenav) {
        $('.copyright').animate({ left: '-150px' }, 200)
        $('.navitem').animate({ top: 22 }, 200);
        $('#itemicon').removeClass('fa-xmark')
        $('#itemicon').addClass('fa-bars')
        $('.sidenav').animate({ width: `0` }, 500)
        $('#navshow').animate({ left: `0px` }, 500)
        sidenav = !sidenav
    } else {
        $('.copyright').animate({ left: '0px' }, 500)
        $('.navitem').animate({ top: 0 }, 200);
        $('#itemicon').removeClass('fa-bars')
        $('#itemicon').addClass('fa-xmark')
        $('.sidenav').animate({ width: `200` }, 500)
        $('#navshow').animate({ left: `200px` }, 500)
        sidenav = !sidenav
    }
})


$('#closiIcon').on('click', function () {
    $('#mealDetailsContainer').fadeOut(500)
    setTimeout(() => {
        document.getElementById('mealDetails').innerHTML = `
        <div class="d-grid spincont">
                        <span class="loader m-auto"></span>
                    </div>
        `
    }, 500);

})

let emailregex = new RegExp(`^[a-z]+[a-z0-9]+@[a-z]+[.][a-z]{2,3}$`);
let phregex = new RegExp(`01[0-2,5]+[0-9]{8}`)

$('.contactUsInputs').on('input', function formCheck() {

    if (emailregex.test($('#emailInput').val()) && phregex.test($('#phoneInput').val()) && $('#ageInput').val() > 0 && $('#passwordInput').val() == $('#repasswordInput').val() && $('#nameInput').val().length > 3 && $('#passwordInput').val().length > 0) {
        $('#contactUsSubmitBtn').removeClass('disabled')
        // console.log('disabled');
    } else {
        $('#contactUsSubmitBtn').addClass('disabled')
    }
})





// ! navigation
$('.navitem').on('click', function () {
    // close details if open
    $('#mealDetailsContainer').fadeOut(500)
    setTimeout(() => {
        document.getElementById('mealDetails').innerHTML = `
        <div class="d-grid spincont">
                        <span class="loader m-auto"></span>
                    </div>
        `
    }, 500);

    // get the target
    let target = $(this).attr('myatr')
    target = '#' + target

    // let link active
    $('.navitem').removeClass('active')
    $(this).addClass('active')

    // get to the top of target page
    window.scrollTo({
        top: 0
    });

    // display the target
    $('.container').fadeOut(100)
    $(target).fadeIn(400)

    // close the sidenav
    $('.copyright').animate({ left: '-150px' }, 200)
    $('.navitem').animate({ top: 22 }, 200);
    $('#itemicon').removeClass('fa-xmark')
    $('#itemicon').addClass('fa-bars')
    $('.sidenav').animate({ width: `0` }, 500)
    $('#navshow').animate({ left: `0px` }, 500)
    sidenav = !sidenav
})


