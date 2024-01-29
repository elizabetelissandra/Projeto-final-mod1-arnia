const resgatarProduto = id => {
  window.location.href = `../html/produto.html?id=${id}`;
};

// Função para obter o nome do usuário com base no email
const obterNomeUsuario = async login => {
  try {
    // Faz uma requisição à sua API para obter informações do usuário com base no email
    const resposta = await fetch(`http://localhost:3000/usuarios`);
    const dadosUsuario = await resposta.json();
    console.log(dadosUsuario);

    const dadosLogin = await login;
    console.log(dadosLogin);
    let usuarioLogado = "";
    // Verifica se a resposta foi bem-sucedida (status 200)
    if (resposta.ok) {
      usuarioLogado = dadosUsuario.find(user => user.email === login.email);
      if (usuarioLogado) {
        return usuarioLogado.nome;
      } else {
        console.log("Usuário não encontrado");
      }
      return usuarioLogado;
    }
    exibirDadosUsuario();
    console.log(usuarioLogado);
  } catch (error) {
    console.error(error);
  }
};

const exibirDadosUsuario = async login => {
  // Obtém os dados do usuário usando a função obterNomeUsuario
  const nomeUsuario = await obterNomeUsuario(login);

  if (nomeUsuario) {
    // Se o nome do usuário foi obtido com sucesso, exibe na tela
    const container = document.querySelector(".usuario-nome");
    container.innerHTML = `Bem-vindo, <b>${nomeUsuario}</b>!`;
  } else {
    // Se ocorreu algum erro ao obter os dados, exibe uma mensagem de erro
    console.error("Erro ao exibir dados do usuário na tela.");
  }
};

const filtrarProdutos = produtos => {
  const listaProdutos = document.querySelector(".listaProdutos");

  produtos.forEach(produto => {
    let itemProduto = document.createElement("li");
    itemProduto.innerHTML += `
        <div class='itemProduto'>
        <a href="../html/produto.html?id=${produto.id}">
            <img src='${produto.imagem}'>
            <h2>${produto.nome}</h2>
        </a>
        `;
    listaProdutos.appendChild(itemProduto);
  });
};

const input = document.getElementById("buscar");
input.addEventListener("keyup", function(e) {
  const texto = input.value;
  if (texto === "") {
    filtrar();
  } else if (e.key === "Enter") {
    filtrar(texto);
  }
});

const filtrar = () => {
  //pegar elementos do html
  let ul = document.querySelector(".listaProdutos");
  //pegar as li do objeto
  const li = ul.getElementsByTagName("li");

  // filtrar os valores
  const busca = document.getElementById("buscar").value.toUpperCase();
  let count = 0;
  let span;

  //percorrer as li's
  for (let i = 0; i < li.length; i++) {
    let a = li[i].getElementsByTagName("a")[0];
    let txtValue = a.textContent || a.innerText;
    //Verificando se o usuario digitou bate
    if (txtValue.toUpperCase().indexOf(busca) > -1 && busca != "") {
      li[i].style.display = "";
      //se o valor bater adicionar mais 1 no count
      count++;
      //depois pegar a tag span
      span = li[i].querySelector(".listaDeProdutos");
      //se existir
      if (span) {
        span.innerHTML = txtValue.replace(new RegExp(busca, "gi"), match => {
          return "<strong>" + match + "</strong>";
        });
      }
    } else {
      //nao mostrar o item da lista
      li[i].style.display = "none";
    }
  }
  if (count === 0) {
    ul.style.display = "none";
  } else {
    ul.style.display = "flex";
  }
};

const mostrarDados = produtos => {
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

const carregarDados = async () => {
  const dados = await fetch("http://localhost:3000/produtos");
  console.log(dados);
  const produtos = await dados.json();
  console.log(produtos);

  const login = await fetch("http://localhost:3000/login");
  const usuarioLogado = await login.json();
  console.log(usuarioLogado);

  await obterNomeUsuario(usuarioLogado);
  mostrarDados(produtos);
  filtrarProdutos(produtos);
};
carregarDados();
