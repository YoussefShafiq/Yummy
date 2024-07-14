export class Meal {

    async fetchRandomMeals() {
        let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
        let result = await api.json()
        return result.meals;
    }

    async fetchMealDetails(id) {
        let api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        let result = await api.json()
        return result.meals[0];
    }

    async fetchMealByName(name) {
        let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
        let result = await api.json()
        return result.meals;
    }
    async fetchMealByLetter(letter) {
        let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
        let result = await api.json()
        return result.meals;
    }
    async fetchAllAreas() {
        let api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
        let result = await api.json()
        return result.meals;
    }
    async fetchArea(area) {
        let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
        let result = await api.json()
        return result.meals;
    }
    async fetchAllIngredients() {
        let api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
        let result = await api.json()
        return result.meals;
    }
    async fetchIngredient(ingredient) {
        let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
        let result = await api.json()
        return result.meals;
    }
    async fetchAllCategories() {
        let api = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
        let result = await api.json()
        return result.categories;
    }
    async fetchCategory(category) {
        let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        let result = await api.json()
        return result.meals;
    }




}

