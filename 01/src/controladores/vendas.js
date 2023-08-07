const produtos = require('../bancodedados/produtos');
const { getStateFromZipcode } = require('utils-playground');

const listarProdutos = async (req, res) => {
    return res.status(200).json(produtos);
}

const detalharProduto = async (req, res) => {
    const { idProduto } = req.params;

    const produto = produtos.find((produto) => {
        return produto.id === Number(idProduto);
    })

    if (!produto) {
        return res.status(404).json({ mensagem: 'Produto não encontrado.' });
    }

    return res.status(200).json(produto);
}

const calcularFrete = async (req, res) => {
    const { idProduto, cep } = req.params;
    let pctfrete = 0.12;
    let precoFrete = 0;
    const estado = await getStateFromZipcode(cep);

    const produto = produtos.find((produto) => {
        return produto.id === Number(idProduto);
    })

    if (!produto) {
        return res.status(404).json({ mensagem: 'Produto não encontrado.' });
    }

    if (estado === "BA" || estado === "SE" || estado === "AL" ||
        estado === "PE" || estado === "PB") {
        pctfrete = 0.10;
    }
    if (estado === "SP" || estado === "RJ") {
        pctfrete = 0.15;
    }

    precoFrete = produto.valor * pctfrete;
    const produtoComFrete = {
        produto: {
            id: idProduto,
            nome: produto.nome,
            valor: produto.valor
        }, estado: estado,
        frete: precoFrete
    };
    res.status(200).json(produtoComFrete);
}

module.exports = { listarProdutos, detalharProduto, calcularFrete };