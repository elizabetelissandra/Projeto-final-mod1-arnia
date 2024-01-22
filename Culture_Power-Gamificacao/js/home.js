const resgatarProduto = (id) => {
        window.location.href = `../html/produto.html?id=${id}`
    }

const mostrarDados = (produtos) => {
    const divProdutos = document.querySelector('.produtosResgatar')

    produtos.forEach(produto => {
        const id = produto.id
        const nome = produto.nome
        const preco = produto.preco
        const descricao = produto.descricao
        const imagem = produto.imagem

        divProdutos.innerHTML += 
        `   <div>
                <img src="${imagem}">
                <h2>${nome}</h2>
                <span>${preco} jóias</span>
                <button class="resgatar" onclick="resgatarProduto('${id}')">Resgatar</button>
            </div> `
    })
}

const carregarDados = async() => {
    const dados = await fetch ('http://localhost:3000/produtos')
    console.log(dados)
    const produtos = await dados.json()
    console.log(produtos)

    mostrarDados(produtos)
}
carregarDados()