const express = require('express');
const { buscarPokemons, idPokemon } = require('./controladores/pokemons') 
const app = express();
app.use(express.json());
app.get('/pokemon', buscarPokemons);
app.get('/pokemon/:idOuNome', idPokemon);
app.listen(8000);