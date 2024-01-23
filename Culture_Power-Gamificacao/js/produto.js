const divProdutosSelecionados = document.querySelector('.produtoSelecionado')
let id = null
let dados = null
let produtos = null

const getProdutos = async(id) => {
    let resposta = await fetch(`http://localhost:3000/produtos?id=
    ${id}`)  //Busca o produto com base no ID passado como parâmetro na URL
    dados = await resposta.json()   //Transforma a resposta
    return dados[0]      //Retorna apenas um único produto, pois estamos buscando por ID e não por array de produtos
}

const resgatarProduto = async(id) =>{
    const produto = {
        id
    }
    await salvarResgate(produto)
    window.location = `../html/produtoResgatado.html?id=${id}`
}

const salvarResgate = async() => {
    
    const url = 'http://localhost:3000/resgates'
    const options = {
        month:"long",
        day:"numeric"
    }
    const data = {
        produtoId: produtos.id,
        nome: produtos.nome,
        imagem: produtos.imagem,
        joias: produtos.preco,
        horario: new Date().toLocaleDateString('pt-BR', options)
        
    }

    const resposta = await fetch(url,{
        method: 'POST',
        headers:{
            "Accept": 'application/json, text/plain, */*', 
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
}


const mostrarProdutos = (produtos) => {
    divProdutosSelecionados.innerHTML +=
    `
    <div>
        <img src="${produtos.imagem}" alt="">
    </div>
    <div>
        <h2 class='nome-produto'>${produtos.nome}</h2>
        <span> Por: <b>${produtos.preco}</b> <i class="fa-regular fa-gem"></i></span>
        <p>${produtos.descricao}</p>
        <button class='resgatar' onclick="resgatarProduto('${produtos.id}')">Resgatar</button>
    </div>
    `
}

const carregarSelecionado = async() => {
    const parametros = window.location.search
    console.log(parametros)
    const objetoParametros = new URLSearchParams(parametros)
    console.log(objetoParametros)
    id = objetoParametros.get('id')
    console.log(id)

    produtos = await getProdutos(id)
    mostrarProdutos(produtos)

}
carregarSelecionado()