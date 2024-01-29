const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", async event => {
    event.preventDefault();

    let email = document.querySelector("#email").value;
    let senha = document.querySelector("#senha").value;

    const usuarioValido = await verificarCredenciaisUsuario(email, senha);

    if(usuarioValido.length > 0){
        window.location = `../html/home.html?id=${usuarioValido[0].id}`
    }else{
        alert('E-mail ou Senha inválidos!')
    }
   
});

const verificarCredenciaisUsuario = async (email, senha) => {
    const url = 'http://localhost:3000/usuarios';

    const respostaUsuarios = await fetch(url);
    const usuarios = await respostaUsuarios.json();
    const user = []

    for (const usuario of usuarios) {
        if (usuario.email === email && usuario.senha === senha) {
            user.push(usuario)
        }
    }
    return user    
};


