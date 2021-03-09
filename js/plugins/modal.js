import { App } from '../base.js'

const createModal = (options) => {
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.insertAdjacentHTML('afterbegin', `
    <div class="modal_overlay" data-modal-close="true">
      <div class="modal_window" style="max-width: ${options.width || '600px'}">
        <div class="modal_header">
          <h5 class="modal_title">${options.title || ''}</h5>
          ${options.closable ? `<button class="btn modal_close" data-modal-close="true"></button>` : ''}
        </div>
        <div class="modal_body" data-content>
          ${options.content || ''}
        </div>
        <div class="modal_footer">
          <div class="btn_group">
            <button class="btn btn_transparent btn_transparent__dark" data-modal-close="true">Отменить</button>
            <button class="btn btn_accent">Принять</button>
          </div>
        </div>
      </div>
    </div>
  `);
  document.body.appendChild(modal);
  return modal;
}

export default App.modal = function (options) {
  const ANIMATION_SPEED = 200;
  const modal = createModal(options);
  let destroyed = false;

  const modalWindow = {
    open() {
      if (!destroyed) {
        modal.classList.add('open');
      }
      // isModalOpen = true;
    },
    close() {
      modal.classList.remove('open');
      modal.classList.add('hide');
      setTimeout(() => {
        modal.classList.remove('hide');
        // isModalOpen = false;
      }, ANIMATION_SPEED);
    },
  }
  // let isModalOpen = false:

  const listener = e => {
    if (e.target.dataset.modalClose) {
      modalWindow.close();
    } else if (e.target.dataset.modalOpen) {
      modalWindow.open();
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
