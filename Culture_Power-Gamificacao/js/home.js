let id = null
let userId = null

const resgatarProduto = (id) => {
  window.location = `../html/produto.html?id=${id}&userId=${userId}`;
};

const meusDados = () => {
  window.location = `../html/meus-dados.html?userId=${userId}`
}

const home = ()  => {
  window.location = `../html/home.html?id=${id}&userId=${userId}`
}

const mostrarDados = (produtos) => {
  const divProdutos = document.querySelector(".produtosResgatar");

  produtos.forEach(produto => {
    const id = produto.id;
    const nome = produto.nome;
    const preco = produto.preco;
    const imagem = produto.imagem;

    divProdutos.innerHTML += `   <div>
                <img src="${imagem}">
                <h2>${nome}</h2>
                <span>${preco} jóias</span>
                <button class="resgatar" onclick="resgatarProduto('${id}')">Resgatar</button>
            </div> `;
  });
};

const mostrarUsuario = async(userId) =>{
  const usuario = await(await fetch(`http://localhost:3000/usuarios/${userId}`)).json()
  console.log(usuario)
  const bloco = document.querySelector('.usuario')
  const blocoSaldo = document.querySelector('.saldo_home')
  const itensNav = document.querySelector('.linksNavbar')
  const itensNavMobile = document.querySelector('.linksNavbarMobile')
  
  bloco.innerHTML = `
  <img src="${usuario.imagem}" alt="">
  <span class="usuario-nome">Olá, <b>${usuario.nome}</b></span>
  `
  blocoSaldo.innerHTML = `<h2>Meu saldo</h2>
  <h3>${usuario.joias}</h3>
  <h4>jóias</h4> `

  itensNav.innerHTML = `
    <a href="#" onclick='voltarPagina('${userId}')>Home</a>
    <a href="#">Produtos</a>
    <a href="#" onclick="meusDados('${id}','${userId}')">Meu Perfil</a>`

  itensNavMobile.innerHTML = `
    <li><a href="#" onclick='voltarPagina('${userId}')>Home</a></li>
    <li><a href="#">Produtos</a></li>
    <li><a href="#" onclick="meusDados('${id}','${userId}')">Meu Perfil</a></li>`
} 
const menuOnClick = () => {
  document.getElementById("menu-bar").classList.toggle("change");
  document.getElementById("nav").classList.toggle("change");
  document.getElementById("menu-bg").classList.toggle("change-bg");
}


const carregarDados = async () => {
  const parametros = new URLSearchParams(window.location.search);
   userId = parametros.get("userId");
   id = parametros.get('id')
   
  mostrarUsuario(userId)

  const dados = await fetch("http://localhost:3000/produtos");
  console.log(dados);
  const produtos = await dados.json();
  console.log(produtos);
  
  mostrarDados(produtos);
};
carregarDados();
