(async () => {
    const searchForm = document.querySelector(".search-form");
    const searchInp = document.querySelector(".search-inp");
    const ListsContainer = document.querySelector(".search-lists-container");

    const response = await fetch("./recipes.json");
    const recipes = await response.json();

    const displayDetails = recipe => {
        const detailsDiv = document.querySelector(".details");
        detailsDiv.style.display = "block";
        detailsDiv.innerHTML = "";
        detailsDiv.innerHTML = `
        <h2 class="list-title">${recipe.title}</h2>
        <h3 class="ingredients-head">Ingredients:</h3>
        <ul>${recipe.ingredients.map(ingredient => "<li>" + ingredient + "</li>").join(" ")}</ul>
        <h3 class="instruction-head">Instruction:</h3>
        <p class="instruction-content">${recipe.instructions}</p>`;
        detailsDiv.appendChild(div);
    }

    const displayResult = recipes => {
        ListsContainer.innerHTML = "";
        for (const recipe of recipes) {
            const li = document.createElement("li");
            li.innerHTML = `
            <h3 class="title">${recipe.title}</h3>
            <p class="description">${recipe.description}</p>
            `;
            ListsContainer.appendChild(li);
            li.addEventListener("click", () => displayDetails(recipe));
        }
    }

    const search = recipes => {
        const query = searchInp.value.toLowerCase();
        const results = recipes.filter(recipe => {
            return (recipe.title.toLowerCase().includes(query) || recipe.ingredients.join(" ").toLowerCase().includes(query));
        });

        (!results.length) ? alert(`sorry ${query} is not available.`) : displayResult(results);
    }

    searchForm.addEventListener("submit", event => {
        event.preventDefault();
        search(recipes);
    })
})();