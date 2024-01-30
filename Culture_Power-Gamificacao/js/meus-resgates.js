let id = null
let userId

const meusDados = () => {
    window.location = `../html/meus-dados.html?id=${id}&userId=${userId}`
}

const minhasJoias = () => {
    window.location = `../html/minhas-joias.html?id=${id}&userId=${userId}`
}

const sair = () => {
    window.location = `../html/abertura.html`
}

const voltarPagina = () =>{
    window.location = `../html/home.html?userId=${userId}`
}

const mostrarResgates = (dadosApi) => {
    const resgate = document.querySelector('.resgates')
    

    

    dadosApi.forEach(resgatados => {
        const data = resgatados.horario
        const imagem = resgatados.imagem
        const nome = resgatados.nome
        const preco = resgatados.joias

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
const mostrarUsuario = async userId => {
    const usuario = await (await fetch(`http://localhost:3000/usuarios/${userId}`)).json();
    console.log(userId)
    const bloco = document.querySelector(".usuario");
    const itensNav = document.querySelector('.linksNavbar')

    itensNav.innerHTML = `
    <a href="#" onclick="voltarPagina('${userId}')">Home</a>
    <a href="#">Produtos</a>
    <a href="#" onclick="meusDados('${id}','${userId}')">Meu Perfil</a>`
  
    bloco.innerHTML = `
      <img src="${usuario.imagem}" alt="">
      <span class="usuario-nome">Olá, <b>${usuario.nome}</b></span>
      `;
  };

const carregarResgates = async() => {
    const objetoParametros = new URLSearchParams(window.location.search);
    console.log(objetoParametros);

    userId = objetoParametros.get("userId");
    console.log(userId);
    mostrarUsuario(userId);
    
    const resposta = await(await fetch(`http://localhost:3000/resgates-${userId}`)).json()
    console.log(resposta)

   mostrarResgates(resposta)
}
carregarResgates()
