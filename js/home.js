let id = null
let userId = null

//Caminhos para outras páginas
const resgatarProduto = (id) => {
  window.location = `../html/produto.html?id=${id}&userId=${userId}`;
};

const meusDados = () => {
  window.location = `../html/meus-dados.html?userId=${userId}`
}

const home = ()  => {
  window.location = `../html/home.html?id=${id}&userId=${userId}`
}
//Mostrar produtos para a aba Produtos para você
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
//Mostrando informações no cabeçalho e carregar os dados do usuário
const mostrarUsuario = async(userId) =>{
  const usuario = await(await fetch(`https://api-projeto-final-arnia-ws0l.onrender.com/usuarios/${userId}`)).json()
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

//Ativando modo click do botão hamburguer
const menuOnClick = () => {
  const linkMenu = document.getElementById("menu-bar");
  if(linkMenu.style.display ==  "block"){
      linkMenu.style.display = "none";
      }else{
        linkMenu.style.display = "block"     
}
}

const carregarDados = async () => {
  const parametros = new URLSearchParams(window.location.search);
   userId = parametros.get("userId");
   id = parametros.get('id')
   
  mostrarUsuario(userId)

  const produtos = await(await fetch("https://api-projeto-final-arnia-ws0l.onrender.com/produtos")).json();  
  console.log(produtos);
  
  mostrarDados(produtos);
};
carregarDados();
