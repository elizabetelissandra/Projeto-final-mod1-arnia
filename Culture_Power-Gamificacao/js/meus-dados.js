const meusResgates = () => {
    window.location = '../html/meus-resgates.html'
}

const minhasJoias = () => {
    window.location = '../html/minhas-joias.html'
}

const sair = () => {
    window.location = '../html/abertura.html'
}

const mostrarDados = (resposta) => {
    

    document.querySelector('#nome').value = resposta[0].nome
    document.querySelector('#email').value = resposta[0].email
    
}

const carregarDados = async() => {
    const dados = await fetch('http://localhost:3000/usuarios')
    console.log(dados)
    const resposta = await dados.json()
    console.log(resposta)

     mostrarDados(resposta)
}
carregarDados()