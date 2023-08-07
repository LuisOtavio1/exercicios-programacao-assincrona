const express = require('express');
const { listarProdutos, detalharProduto, calcularFrete } = require('./controladores/vendas');
const app = express();

app.use(express.json());

app.get('/produtos', listarProdutos);

app.get('/produtos/:idProduto', detalharProduto);

app.get('/produtos/:idProduto/frete/:cep', calcularFrete);

app.listen(3000);