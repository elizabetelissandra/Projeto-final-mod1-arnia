//-------------------------------------Caminhos para outras páginas---------------------------------------//
const meusDados = () => {
    window.location = `../html/meus-dados.html?userId=${userId}`
}

const meusResgates = () => {
    window.location = `../html/meus-resgates.html?userId=${userId}`
}

const minhasJoias = () => {
    window.location = `../html/minhas-joias.html?userId=${userId}`
}
const voltarPagina = () =>{
    window.location = `../html/home.html?userId=${userId}`
}

const sair = () => {
    window.location = '../index.html'
}
//-------------------------------------Mostrando dados na navbar---------------------------------------//
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
;

};
carregarDados();