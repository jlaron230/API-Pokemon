
let input = document.getElementById('pokemonName');
//variables lié aux div dans mon html pour l'affichage des pokémons
let pokemonDisplay = document.getElementById('pokemonDisplay');
const allPokemonsContainer = document.getElementById("allPokemonsDisplay");

async function fetchPokemon() {
    //on récupère les valeurs inscrite par l'utilisateur dans l'input
    const pokemonName = document.getElementById("pokemonName").value;
    //on récupère l'url de l'api pour chaque pokémon unique et on convertis les caractères en minuscules
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;

    try {
        // Attend la réponse de la requête fetch à l'URL construite.
        const response = await fetch(url);
    
        // Vérifie si la réponse n'est pas ok (par exemple, statut HTTP 404 ou 500).
        if (!response.ok) {
          // Affiche une erreur dans la console si la requête a échoué.
          console.error("Failed to fetch Pokémon:", response.status);
          // Met à jour l'élément HTML ayant l'id "pokemonDisplay" pour indiquer une erreur.
          pokemonDisplay.innerHTML = `Pokémon non trouvé ou erreur de requête.`;
          allPokemonsContainer.innerHTML = "";
          return; // Sort de la fonction si une erreur est rencontrée.
        }
    
        // Convertit la réponse en JSON si la réponse est ok.
        const reponseJSon = await response.json();

        // Affiche les données du Pokémon dans la console pour le débogage.
        console.log(reponseJSon);
    
        // Appelle la fonction GetPokemons pour afficher les informations du Pokémon.
        GetPokemons(reponseJSon);
      } catch (error) {

        // Capture et affiche les erreurs survenues pendant la requête fetch ou le traitement des données.
        console.error("Erreur lors de la récupération des données:", error);
      }
    }

function GetPokemons(response){
    // efface les données qui affiche toutes les infos des pokemons dans le html
    allPokemonsContainer.innerHTML = "";
    //on injecte en html le titre en h2 et l'image via les données json de l'api depuis le paramètres de la fonction
    pokemonDisplay.innerHTML = `<h2>${response.name}</h2> 
    <img src="${response.sprites.front_default}" alt="${response.name}">`
}

async function fetchAllPokemons() {
    //on efface les données de la barre de recherche pour l'utilisateur lorsqu'il click sur le bouton
    input.value = "";
    //on affecte dans une variable l'url d'une liste de 10 pokémons
    const url = `https://pokeapi.co/api/v2/pokemon?limit=10&offset=0`;

    try {
        // Attend la réponse de la requête fetch à l'URL construite.
        const response = await fetch(url);

        // Convertit la réponse en JSON si la réponse est ok.
        const data = await response.json();
        //efface les données en html de toutes la liste des pokémons
        allPokemonsContainer.innerHTML = "";
        //on attribu les données de l'api de l'ensemble des pokémons (10) dans une variable
        const pokemondata = data.results
        //on crée une boucle forEach lié a la variable pokemondata en ajoutant l'asynchrone pour l'api et l'élément pokémon
        pokemondata.forEach(async (pokemon) =>  {
            //on crée 2 variables une qui envoie une requête fetch et l'autre qui convertit la réponse en JSON
            const pokemonDetailsResponse = await fetch(pokemon.url);
                 const pokemonDetails = await pokemonDetailsResponse.json();
                 //test débogage
                 console.log(pokemonDetails);
                //On injecte en html le titre et l'image de l'ensemble des pokémons, formant une liste.
                 allPokemonsContainer.innerHTML += `<h2>${pokemonDetails.name}</h2> 
                 <img src="${pokemonDetails.sprites.front_default}" alt="${pokemonDetails.name}">`
                 // on nettoie le html lié a la recherche d'un pokémon
                 pokemonDisplay.innerHTML = "";
        });

      } catch (error) {
        // Capture et affiche les erreurs survenues pendant la requête fetch ou le traitement des données.
        console.error("Erreur lors de la récupération des données:", error);
      }
    }
