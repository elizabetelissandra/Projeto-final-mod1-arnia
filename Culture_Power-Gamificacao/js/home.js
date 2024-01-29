let id = null
let userId = null

const resgatarProduto = () => {
  window.location.href = `../html/produto.html?id=${id}&userId=${userId}`;
};

const meusDados = () => {
  window.location = `../html/meus-dados.html?userId=${userId}`
}

const home = ()  => {
  window.location = `../html/home.html?id=${id}&userId=${userId}`
}

const mostrarDados = (produtos, userId) => {
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
                <button class="resgatar" onclick="resgatarProduto()">Resgatar</button>
            </div> `;
  });
};

const mostrarUsuario = async(userId) =>{
  const usuario = await(await fetch(`http://localhost:3000/usuarios/${userId}`)).json()
  console.log(usuario)
  const bloco = document.querySelector('.usuario')
  const blocoSaldo = document.querySelector('.saldo_home')
  
  bloco.innerHTML = `
  <img src="${usuario.imagem}" alt="">
  <span class="usuario-nome">Olá, <b>${usuario.nome}</b></span>
  `
  blocoSaldo.innerHTML = `<h2>Meu saldo</h2>
  <h3>${usuario.joias}</h3>
  <h4>jóias</h4> `

} 

const carregarDados = async () => {
  const parametros = new URLSearchParams(window.location.search);
   userId = parametros.get("id");
   
  

  mostrarUsuario(userId)

  const dados = await fetch("http://localhost:3000/produtos");
  console.log(dados);
  const produtos = await dados.json();
  console.log(produtos);
  
  mostrarDados(produtos, userId);
  // filtrarProdutos(produtos);
};
carregarDados();
