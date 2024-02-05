class Usuario {
  constructor(email, id, imagem, nome, joias, login, resgates, senha) {
    this.email = email
    this.id = id
    this.imagem = imagem
    this.nome = nome
    this.joias = joias
    this.login = login
    this.resgates = resgates
    this.senha = senha
  }
}
class Produto {
  constructor(descricao, id, imagem, nome, preco, data) {
    this.descricao = descricao
    this.id = id
    this.imagem = imagem
    this.nome = nome
    this.preco = preco
    this.data = data
  }
}

let id = null;
let userId = null;
let produto = null;
//-------------------------------------Caminhos para outras páginas---------------------------------------//
const meusDados = () => {
  window.location = `../html/meus-dados.html?id=${id}&userId=${userId}`;
};
const home = () => {
  window.location = `../html/home.html?id=${id}&userId=${userId}`;
};
const voltarPagina = () =>{
  window.location = `../html/home.html?userId=${userId}`
}
const resgatarProduto = async (userId, id)  => {
  salvarResgate(userId, id, produto);
};
//-------------------------------------Salvando o resgate na API---------------------------------------//
const salvarResgate = async (userId, id, produto) => {
  const options = {
    month: "long",
    day: "numeric"
  };
console.log(produto)
  const data = new Date().toLocaleDateString("pt-BR", options);
  const usuario = await (await fetch(`http://localhost:3000/usuarios/${userId}`)).json();
  let resgates = usuario.resgates;

  const produt = new Produto(
    produto[0].descricao,
    produto[0].id,
    produto[0].imagem,
    produto[0].nome,
    produto[0].preco,
    data
  );

  resgates.push(produt);

  const user = new Usuario(
    usuario.email,
    usuario.id,
    usuario.imagem,
    usuario.nome,
    `${parseInt(usuario.joias) - parseInt(produto[0].preco)}`,
    usuario.login,
    resgates,
    usuario.senha
  );
  const resposta = await fetch(`http://localhost:3000/usuarios/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  });
  window.location = `../html/produtoResgatado.html?id=${id}&userId=${userId}`;
};

//-------------------------------------Mostrando dados do produto selecionado via ID---------------------------------------//
const mostrarProdutos = async(userId) => {

  produto = await(await fetch(`http://localhost:3000/produtos?id=${id}`)).json()

  const divProdutosSelecionados = document.querySelector(".produtoSelecionado");

  divProdutosSelecionados.innerHTML = `
    <div>
        <img src="${produto[0].imagem}" alt="">
    </div>
    <div>
        <h2 class='nome-produto'>${produto[0].nome}</h2>
        <span> Por: <b>${produto[0].preco}</b> <i class="fa-regular fa-gem"></i></span>
        <p>${produto[0].descricao}</p>
        <button class='resgatar' onclick="resgatarProduto('${userId}','${id}', '${produto}')"> Resgatar</button>
    </div>
    `;
};
//-------------------------------------Mostrando dados na navbar---------------------------------------//
const mostrarUsuario = async userId => {
  const usuario = await (await fetch(`http://localhost:3000/usuarios/${userId}`)).json();
  const bloco = document.querySelector(".usuario");
  const itensNav = document.querySelector('.linksNavbar')
  const itensNavMobile = document.querySelector('.linksNavbarMobile')

  bloco.innerHTML = `
    <img src="${usuario.imagem}" alt="">
    <span class="usuario-nome">Olá, <b>${usuario.nome}</b></span>
    `
    itensNav.innerHTML = `
    <a href="#" onclick="voltarPagina('${userId}')">Home</a>
    <a href="#">Produtos</a>
    <a href="#" onclick="meusDados('${id}','${userId}')">Meu Perfil</a>`

    itensNavMobile.innerHTML = `
    <li><a href="#" onclick="voltarPagina('${userId}')">Home</a></li>
    <li><a href="#">Produtos</a></li>
    <li><a href="#" onclick="meusDados('${id}','${userId}')">Meu Perfil</a></li>`
};

//-------------------------------------Função de ativação do menu(botão hamburguer)---------------------------------------//
const menuOnClick = () => {
  const linkMenu = document.getElementById("menu-bar");
  if(linkMenu.style.display ==  "block"){
      linkMenu.style.display = "none";
      }else{
        linkMenu.style.display = "block"
}
}
//-------------------------------------Selecionando o id e u vindo na url---------------------------------------//
const carregarSelecionado = async () => {
  const objetoParametros = new URLSearchParams(window.location.search);
  id = objetoParametros.get("id");

  userId = objetoParametros.get("userId");
  mostrarUsuario(userId);

  mostrarProdutos(userId);
};
carregarSelecionado();
