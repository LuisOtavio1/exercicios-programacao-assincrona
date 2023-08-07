const { listarPokemons, detalharPokemon } = require('utils-playground');

const buscarPokemons = async (req, res) => {
    const { pagina } = req.query;
    const pokemons = await listarPokemons(pagina);
    const listaDePokemons = pokemons.results;
    res.status(200).json(listaDePokemons);
};

const idPokemon = async (req, res) => {

    const { idOuNome } = req.params;
    const pokemon = await detalharPokemon(idOuNome);


    const {
        id,
        name,
        height,
        weight,
        base_experience,
        forms,
        abilities,
        species,
    } = pokemon;

    const pokemonEscolhido = {
        id,
        name,
        height,
        weight,
        base_experience,
        forms,
        abilities,
        species,
    };
    res.status(200).json(pokemonEscolhido);
}
module.exports = { buscarPokemons, idPokemon };