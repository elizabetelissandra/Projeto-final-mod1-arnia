class Usuario {
  constructor(email, id, imagem, joias, login, nome, resgates, senha) {
    this.email = email;
    this.id = id;
    this.imagem = imagem;
    this.nome = nome;
    this.joias = joias;
    this.login = login;
    this.resgates = resgates;
    this.senha = senha;
  }
}
class Produto {
  constructor(descricao, id, imagem, nome, preco, data) {
    this.descricao = descricao;
    this.id = id;
    this.imagem = imagem;
    this.nome = nome;
    this.preco = preco;
    this.data = data;
  }
}

let id = null;
let userId = null;
let produto = null;

const meusDados = () => {
  window.location = `../html/meus-dados.html?id=${id}&userId=${userId}`;
};
const home = () => {
  window.location = `../html/home.html?id=${id}&userId=${userId}`;
};
const resgatarProduto = async (id, userId) => {
  salvarResgate(userId, produto);
  window.location = `../html/produtoResgatado.html?id=${id}&userId=${userId}`;
};

const salvarResgate = async (userId, produto) => {
  const options = {
    month: "long",
    day: "numeric"
  };
  const data = new Date().toLocaleDateString("pt-BR", options);
  const usuario = await (await fetch(
    `http://localhost:3000/usuarios/${userId}`
  )).json();

  let resgates = usuario.resgates;

  const produt = new Produto(
    produto.descricao,
    produto.id,
    produto.imagem,
    produto.nome,
    produto.preco,
    data
  );
  resgates.push(produt);

  const user = new Usuario(
    usuario.email,
    usuario.id,
    usuario.imagem,
    `${parseInt(usuario.joias) - parseInt(produto.preco)}`,
    usuario.login,
    usuario.nome,
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
};
const mostrarProdutos = async(userId) => {

  let dados = await fetch(
    `http://localhost:3000/produtos?id=${id}`
  )
  produto = await dados.json();
  const divProdutosSelecionados = document.querySelector(".produtoSelecionado");
  console.log(produto);
  console.log(userId)
  
  divProdutosSelecionados.innerHTML = `
    <div>
        <img src="${produto[0].imagem}" alt="">
    </div>
    <div>
        <h2 class='nome-produto'>${produto[0].nome}</h2>
        <span> Por: <b>${produto[0].preco}</b> <i class="fa-regular fa-gem"></i></span>
        <p>${produto[0].descricao}</p>
        <button class='resgatar' onclick="resgatarProduto('${id}','${userId}')"> Resgatar</button>
    </div>
    `;
};

const mostrarUsuario = async userId => {
  const usuario = await (await fetch(
    `http://localhost:3000/usuarios/${userId}`
  )).json();
  const bloco = document.querySelector(".usuario");
  const itensNav = document.querySelector('.linksNavbar')

  bloco.innerHTML = `
    <img src="${usuario.imagem}" alt="">
    <span class="usuario-nome">Olá, <b>${usuario.nome}</b></span>
    `;
    
    itensNav.innerHTML = `
    <a href="#" onclick='voltarPagina('${userId}')>Home</a>
    <a href="#">Produtos</a>
    <a href="#" onclick="meusDados('${id}','${userId}')">Meu Perfil</a>`
};

const carregarSelecionado = async () => {
  const objetoParametros = new URLSearchParams(window.location.search);
  id = objetoParametros.get("id");

  userId = objetoParametros.get("userId");
  mostrarUsuario(userId);

  mostrarProdutos(userId);
};
carregarSelecionado();
