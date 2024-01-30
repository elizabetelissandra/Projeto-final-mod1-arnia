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
    window.location = '../html/abertura.html'
}

const mostrarUsuario = async(userId) =>{
    const usuario = await(await fetch(`http://localhost:3000/usuarios/${userId}`)).json()
    const bloco = document.querySelector('.usuario')
    const itensNav = document.querySelector('.linksNavbar')

    itensNav.innerHTML = `
    <a href="#" onclick="voltarPagina('${userId}')">Home</a>
    <a href="#">Produtos</a>
    <a href="#" onclick="meusDados('${id}','${userId}')">Meu Perfil</a>`
        
    bloco.innerHTML = `
    <img src="${usuario.imagem}" alt="">
    <span class="usuario-nome">Olá, <b>${usuario.nome}</b></span>
    `  
} 
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