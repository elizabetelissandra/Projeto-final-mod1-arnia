let id = null
let userId
//-------------------------------------Caminhos para outras páginas---------------------------------------//
const meusDados = () => {
    window.location = `../html/meus-dados.html?id=${id}&userId=${userId}`
}

const minhasJoias = () => {
    window.location = `../html/minhas-joias.html?id=${id}&userId=${userId}`
}

const sair = () => {
    window.location = '../index.html'
}

const voltarPagina = () =>{
    window.location = `../html/home.html?userId=${userId}`
}
//-------------------------------------Resgatando "resgates" da API, e mostrando na página via innerHTML---------------------------------------//
const mostrarResgates = (dadosApi) => {
    const resgate = document.querySelector('.resgates')
    
    dadosApi.resgates.forEach(resgatados => {
        const data = resgatados.data
        const imagem = resgatados.imagem
        const nome = resgatados.nome
        const preco = resgatados.preco

       resgate.innerHTML += `
       <div class="card">
            <div class='data'>
                <span>${data}</span>
            </div>
            <div class='informacoes'>
                <img src='${imagem}'>
                <h3>${nome}</h3>
                <span>${preco} jóias</span>
            </div>
       </div>
       `
    });

}
//-------------------------------------Mostrando dados na navbar---------------------------------------//
const mostrarUsuario = async userId => {
    const usuario = await (await fetch(`http://localhost:3000/usuarios/${userId}`)).json();
    console.log(userId)
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
const carregarResgates = async() => {
    const objetoParametros = new URLSearchParams(window.location.search);
    console.log(objetoParametros);

    userId = objetoParametros.get("userId");
    console.log(userId);
    mostrarUsuario(userId);
    
    const resposta = await(await fetch(`http://localhost:3000/usuarios/${userId}`)).json()
    console.log(resposta)

   mostrarResgates(resposta)
}
carregarResgates()
