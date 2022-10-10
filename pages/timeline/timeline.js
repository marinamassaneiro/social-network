import { logout, auth } from '../../lib/auth.js';
import recipe from './recipe.js';
import { printPostagem } from '../../lib/firestore.js';
import post from './post.js';

export default async () => {
  const container = document.createElement('div');
  container.id = 'container-timeline';

  container.innerHTML = `
    <section id="header-timeline">
        <figure class="box">
            <img id="gif-timeline" src="assets/104313-cooking-chef.gif">
        </figure>
        <div id="text-header">
          <p> Olá!</p>
          <h3>O que vamos cozinhar hoje?</h3>
        </div>
    </section>  
    <section id="body-timeline">
        <button id="btn-modal">Clique aqui para publicar sua receita!</button>
        <section id="divModal"></section>
        <section id="timeline-post"></section>
    </section>
    <footer>
      <nav>
        <ul>
          <li><a id="btn-home"><i class="fa-solid fa-house fa-2xl"></i></a></li>
          <li><a id="btn-logout"><i class="fa-solid fa-right-from-bracket fa-2xl"></i></a></li>
        </ul>
      </nav>
    </footer>
    `;

  const timelinePost = container.querySelector('#timeline-post');
  const btnModal = container.querySelector('#btn-modal');
  const btnLogout = container.querySelector('#btn-logout');
  const btnHome = container.querySelector('#btn-home');
  
  post(await printPostagem(), timelinePost, auth.currentUser);

  btnModal.addEventListener('click', (event) => {
    event.preventDefault();
    const divModal = container.querySelector('#divModal');
    divModal.appendChild(recipe());
  });

  btnHome.addEventListener('click', (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  btnLogout.addEventListener('click', () => {
    logout()
      .then(() => {
        window.location.hash = '#login';
      });
  });

  return container;
};