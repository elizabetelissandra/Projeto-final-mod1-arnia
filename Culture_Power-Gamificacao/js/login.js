const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", async event => {
  event.preventDefault();

  let email = document.querySelector("#email").value;
  let senha = document.querySelector("#senha").value;

  const validacao = await verificarDados(email, senha);

  if (validacao) {
    alert("Login efetuado. Redirecionando para a página principal.");
    window.location = '../html/home.html'
  } else {
    alert("Erro no login! Tente novamente.");
  }
});

const verificarDados = async (email, senha) => {
  const dados = await fetch("http://localhost:3000/usuarios");
  console.log(dados);
  const dadosUsuario = await dados.json();
  console.log(dadosUsuario);

  for (const login of dadosUsuario) {
    
    if (login.email === email && login.senha === senha) {
      return true;
    }
  };
    return false;
};
