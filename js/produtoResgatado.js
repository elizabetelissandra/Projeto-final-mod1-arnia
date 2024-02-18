let id = null
let dados = null
let userId = null
//-------------------------------------Caminhos para outras páginas---------------------------------------//
const meusDados = (id, userId) => {
    window.location = `../html/meus-resgates.html?id=${id}&userId=${userId}`;
};

const voltarPagina = () =>{
    window.location = `../html/home.html?userId=${userId}`
}
//-------------------------------------Resgatando produto da API, e mostrando na página via innerHTML---------------------------------------//
const mostrarProdutos = async(id, userId) => {
    const produtos = await(await fetch(`https://api-projeto-final-arnia-ws0l.onrender.com/produtos?id=${id}`)).json()
    const usuario = await(await fetch(`https://api-projeto-final-arnia-ws0l.onrender.com/usuarios/${userId}`)).json()
    const conteudoResgatado = document.querySelector('.produtoresgatado')
    conteudoResgatado.innerHTML +=
    `
    <div class=informacoes-produto>
        <p class='resgatado'>Produto resgatado com sucesso!</p>
        <div class=conteudo-produto>
            <div>
                <img class='imagem-produto' src="${produtos[0].imagem}" alt="">
            </div>   
            <div>
                <h2 class='nome-produto'>${produtos[0].nome}</h2>
                <span class='valor-produto'> Por: <b>${produtos[0].preco}</b> <i class="fa-regular fa-gem"></i></span>
            </div>
        </div>
        <div>
            <p class='texto-retirada'>Parabéns por resgatar seu produto! Você pode retirá-lo em nossa loja física localizada no endereço:
            <br><br>
            Rua das Inovações, 123<br>
            Bairro Tecnológico<br>
            Cidade Digital
            <br><br>
            Estamos ansiosos para recebê-lo e proporcionar uma experiência incrível ao retirar o seu produto. Agradecemos por fazer parte do nosso programa de fidelidade. Qualquer dúvida, entre em contato conosco. Até breve!</p>
            <span class='saldo-total'><span>Meu saldo:</span> ${usuario.joias} <i class="fa-regular fa-gem"></i></span>
        </div>
        <button class='voltarInicial' onclick="voltarPagina('${id}', '${userId}')">Voltar à página inicial</button>
    </div>
    `
}
//-------------------------------------Mostrando dados na navbar---------------------------------------//
const mostrarUsuario = async(id, userId) =>{
    const usuario = await(await fetch(`https://api-projeto-final-arnia-ws0l.onrender.com/usuarios/${userId}`)).json()
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
const carregarSelecionado = async() => {
    const objetoParametros = new URLSearchParams(window.location.search)
    id = objetoParametros.get('id')
    userId = objetoParametros.get("userId");  
    mostrarUsuario(id, userId)

    
    mostrarProdutos(id, userId)
}
carregarSelecionado()