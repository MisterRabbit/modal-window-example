import { App } from '../base.js'

const createModal = (options) => {
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.insertAdjacentHTML('afterbegin', `
    <div class="modal__overlay" data-modal-close="true">
      <div class="modal__window" style="max-width: ${options.width || '600px'}">
        <div class="modal__header">
          <h5 class="modal__title">${options.title || ''}</h5>
          ${options.closable ? `<button class="btn modal__close" data-modal-close="true"></button>` : ''}
        </div>
        <div class="modal__body" data-content>
          ${options.content || ''}
        </div>
        <div class="modal__footer">
          <div class="btn__group">
            <button class="btn btn__transparent btn__transparent__dark" data-modal-close="true">Close</button>
            <button class="btn btn__accent">Accept</button>
          </div>
        </div>
      </div>
    </div>
  `);
  document.body.appendChild(modal);
  return modal;
}

export default App.modal = options => {
  const ANIMATION_SPEED = 350;
  const modal = createModal(options);
  let destroyed = false;

  const modalWindow = {
    open() {
      if (!destroyed) {
        modal.classList.add('open');
        setTimeout(() => {
          modal.classList.add('show');
        }, 0);
      }
      isModalOpen = true;
    },
    close() {
      modal.classList.remove('show');
      modal.classList.add('hide');
      setTimeout(() => {
        modal.classList.remove('hide');
        modal.classList.remove('open');
        isModalOpen = false;
      }, ANIMATION_SPEED * 2);
    },
  }
  let isModalOpen = false;

  const listener = e => {
    if (e.target.dataset.modalClose) {
      modalWindow.close();
    }
  }

  modal.addEventListener('click', listener);

  return Object.assign(modalWindow, {
    destroy() {
      modal.parentNode.removeChild(modal);
      modal.removeEventListener('click', listener)
      destroyed = true;
    },
    setContent(html) {
      modal.querySelector('[data-content]').innerHTML = html;
    }
  });
}
