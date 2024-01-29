const divProdutosSelecionados = document.querySelector('.produtoSelecionado')
let id = null
let dados = null
let userId = null


const meusDados = () => {
    window.location = `../html/meus-dados.html?id=${id}&userId=${userId}`
  }
  const home = ()  => {
    window.location = `../html/home.html?id=${id}&userId=${userId}`
  }
  const resgatarProduto = async(id,userId) => {
    window.location = `../html/produtoResgatado.html?id=${id}&userId=${userId}`;
}

const getProdutos = async(id) => {
    let resposta = await fetch(`http://localhost:3000/produtos?id=
    ${id}`)  //Busca o produto com base no ID passado como parâmetro na URL
    dados = await resposta.json()   //Transforma a resposta
    return dados[0]      //Retorna apenas um único produto, pois estamos buscando por ID e não por array de produtos
}
const salvarResgate = async(userId) => {
    
    const resgates = `http://localhost:3000/usuarios/${userId}`
    const options = {
        month: "long",
        day: "numeric"
    };

    const data = {
        Nome: produtoId.nome,
        Imagem: produtoId.imagem,
        Joias: produtoId.joias,
        data: new Date().toLocaleDateString('pt-BR', options)
    };

        await fetch(resgates, {
        method: 'POST',
        headers: {
            "Accept": 'application/json, text/plain, */*',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
}

const mostrarProdutos = (produtos, userId) => {
    divProdutosSelecionados.innerHTML +=
    `
    <div>
        <img src="${produtos.imagem}" alt="">
    </div>
    <div>
        <h2 class='nome-produto'>${produtos.nome}</h2>
        <span> Por: <b>${produtos.preco}</b> <i class="fa-regular fa-gem"></i></span>
        <p>${produtos.descricao}</p>
        <button class='resgatar' onclick="resgatarProduto('${produtos.id}','${userId}')"> Resgatar</button>
    </div>
    `
}

const mostrarUsuario = async(userId) =>{
    const usuario = await(await fetch(`http://localhost:3000/usuarios/${userId}`)).json()
    const bloco = document.querySelector('.usuario')
    
    
    bloco.innerHTML = `
    <img src="${usuario.imagem}" alt="">
    <span class="usuario-nome">Olá, <b>${usuario.nome}</b></span>
    `
  
  } 

const carregarSelecionado = async() => {
    const objetoParametros = new URLSearchParams(window.location.search)
    console.log(objetoParametros)
    id = objetoParametros.get('id')
    console.log(id)

    userId = objetoParametros.get("userId");  
    mostrarUsuario(userId)
   

    dados = await(await fetch("http://localhost:3000/produtos")).json();
    console.log(dados);

    produtoId = await getProdutos(id)
    mostrarProdutos(produtoId, userId)
}
carregarSelecionado()