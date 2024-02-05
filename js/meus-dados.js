let id = null
let userId = null
//-------------------------------------Caminhos para outras páginas---------------------------------------//
const meusResgates = (userId) => {
  window.location = `../html/meus-resgates.html?userId=${userId}`;
};

const meusDados = (userId) => {
  window.location = `../html/meus-dados.html?userId=${userId}`;
};

const minhasJoias = (userId) => {
  window.location = `../html/minhas-joias.html?userId=${userId}`;
};

const sair = () => {
  window.location = '../index.html'
};
const voltarPagina = () =>{
  window.location = `../html/home.html?userId=${userId}`
}
//-------------------------------------Mostrando dados na página do usuário e alguns botões---------------------------------------//
const mostrarDados = (dados, userId) => {
    let info
    if(userId === 'ef1'){
        info=dados[0]
    }else{
        info=dados[1]
    } 
  const navLateral = document.querySelector('.tab-menu')
  document.querySelector("#nome").value = info.nome;
  document.querySelector("#email").value = info.email;
  document.getElementById("foto-perfil").src = info.imagem

  navLateral.innerHTML += ` 
             <div class="tab-buttons">
                         <img class="icone-perfil" src="../img/icones-perfil-clicado/user-clicado.png" alt="icone de uma pessoa em formatos geometricos">
                         <button onclick="meusDados('${userId}')" type="button" class="tab-btn" content-id='meus-dados'>Meus Dados</button>
                     </div>
                     <div class="tab-buttons">
                         <img class="icone-perfil-normal" src="../img/icones-perfil/coupon-2-line.png" alt="icone de uma pessoa em formatos geometricos">
                         <button onclick="meusResgates('${userId}')" type="button" class="tab-btn" content-id='meus-dados'>Meus resgates</button>
                     </div>
                     <div class="tab-buttons">
                         <img class="icone-perfil-normal" src="../img/icones-perfil/diamond.png" alt="icone de uma jóia">
                         <button onclick="minhasJoias('${userId}')" type="button" class="tab-btn" content-id='meus-dados'>Minhas jóias</button>
                     </div>
                     <div class="tab-buttons">
                         <img class="icone-perfil-normal" src="../img/icones-perfil/logout-box-line.png" alt="icone de uma porta com direção para fora">
                         <button onclick="sair()" type="button" class="tab-btn" content-id='meus-dados'>Sair</button>
                     </div>`

};
//-------------------------------------Mostrar dados do usuário na navbar---------------------------------------//
const mostrarUsuario = async(userId) =>{
    const usuario = await(await fetch(`http://localhost:3000/usuarios/${userId}`)).json()
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
//-------------------------------------Ativando menu do mobile(hamburguer)---------------------------------------//
const menuOnClick = () => {
  const linkMenu = document.getElementById("menu-bar");
  if(linkMenu.style.display ==  "block"){
      linkMenu.style.display = "none";
      }else{
        linkMenu.style.display = "block"
}
}
//-------------------------------------Carregando e separando o id e userID que vem como parametro na URL---------------------------------------//
const carregarDados = async () => {
  
    const objetoParametros = new URLSearchParams(window.location.search)
    console.log(objetoParametros)
    id = objetoParametros.get('id')
    console.log(id)
    userId = objetoParametros.get("userId");
    console.log(userId)  
    mostrarUsuario(userId)

    const dados = await(await fetch("http://localhost:3000/usuarios")).json()
    console.log(dados);

  mostrarDados(dados, userId);
};
carregarDados();
