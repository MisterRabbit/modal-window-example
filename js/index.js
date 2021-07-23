import { App } from './base.js';
import './plugins/modal.js';

const modal = App.modal({
  title: 'Modal window title',
  closable: true,
  content: `
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
  `,
  width: '400px',
});

document.addEventListener('click', e => {
  e.preventDefault();
  const isOpenModalButton = e.target.dataset.modalOpen;
  if (isOpenModalButton) {
    modal.open();
  }
});