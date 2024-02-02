const mostrarProdutos = async(id, userId) => {
  let produtos = await(await fetch(`http://localhost:3000/produtos?id=${id}`)).json()
  const divProdutosSelecionados = document.querySelector(".produtoSelecionado")
  console.log(produtos)
  console.log(id)
  divProdutosSelecionados.innerHTML = `<div>
  <img src="${produtos[0].imagem}" alt="">
</div>
<div>
  <h2 class='nome-produto'>${produtos[0].nome}</h2>
  <span> Por: <b>${produtos[0].preco}</b> <i class="fa-regular fa-gem"></i></span>
  <p>${produtos[0].descricao}</p>
  <button class='resgatar' onclick="resgatarProduto('${id}','${userId}')"> Resgatar</button>
</div>`
}

const mostrarUsuario = async(userId) => {
  const usuario = await(await fetch(`http://localhost:3000/usuarios/${userId}`)).json()
  console.log(usuario)
  const bloco = document.querySelector(".usuario")
  
  bloco.innerHTML = `<img src="${usuario.imagem}" alt="">
  <span class="usuario-nome">Olá, <b>${usuario.nome}</b></span>`
  
}

const carregarDados = () => {
  const parametros = new URLSearchParams(window.location.search)
  let id = parametros.get('id') 
  let userId = parametros.get('userId')

  mostrarUsuario(userId)
  mostrarProdutos(id, userId)
}
carregarDados()