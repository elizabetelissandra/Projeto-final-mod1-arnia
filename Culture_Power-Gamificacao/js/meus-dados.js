let id = null
let userId = null

const meusResgates = () => {
  window.location = `../html/meus-resgates.html?id=${id}&userId=${userId}`;
};

const minhasJoias = () => {
  window.location = `../html/minhas-joias.html?id=${id}&userId=${userId}`;
};

const sair = () => {
  window.location = "../html/abertura.html";
};

const mostrarDados = (dados, userId) => {
    let info
    if(userId === 'ef1'){
        info=dados[0]
    }else{
        info=dados[1]
    } 
    
  document.querySelector("#nome").value = info.nome;
  document.querySelector("#email").value = info.email;
  document.getElementById("foto-perfil").src = info.imagem

};

const mostrarUsuario = async(userId) =>{
    const usuario = await(await fetch(`http://localhost:3000/usuarios/${userId}`)).json()
    const bloco = document.querySelector('.usuario')
    
    
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

  mostrarDados(dados, userId);
  
};
carregarDados();
