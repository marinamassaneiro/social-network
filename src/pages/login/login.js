import { loginUserEmail, signinGoogle } from "../../lib/auth.js";

//Gerar os elementos HTML da página:
export default () => {
  const container = document.createElement("div");
  container.id = "container-login";

  const template = `
        <img id="logo" src="assets/cooking.png">
        <h1>Eu Chef</h1>
        <h3 id="h3-login">Sua Rede de Receitas</h3>
        <form>
            <input type="email" id="email" placeholder="Insira seu e-mail">
            <input type="password" id="password" placeholder="Digite sua senha">
            <input id="btn-login" type="submit" value="Logar" />
            <button id="btn-google"><img id= "img-google" src="assets/btn_google_signin_light_normal_web@2x.png" alt="botão de login com conta google"></button>
        </form>
        <h4>Não possui conta?<a id="btn-register" href="#register"> Cadastre-se</a></h4>
    `;

  container.innerHTML = template;

  //Definir o comportamento da página de login:
  const inputEmail = container.querySelector('#email');
  const inputPassword = container.querySelector('#password');
  const btnLogin = container.querySelector('#btn-login');
  const btnGoogle = container.querySelector('#btn-google');
  const btnRegister = container.querySelector('#btn-register');

  btnRegister.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.hash = '#register';
  });

  //Login por e-mail e senha
  btnLogin.addEventListener('click', (event) => {
    event.preventDefault();
    loginUserEmail(inputEmail.value, inputPassword.value)
      .then(() => {
        window.location.hash = '#timeline';
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  });

  //Login pelo Google:
  //Inserir o código do firebase aqui
  btnGoogle.addEventListener('click', (eventTwo) => {
    eventTwo.preventDefault();
    signinGoogle().then(() => {
      window.location.hash = '#timeline';
    })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  })

  return container;
}