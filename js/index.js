import { App } from './base.js';

import './plugins/modal.js';

const modal = App.modal({
  title: 'Заголовок модального окна',
  closable: true,
  content: `
    <p>Описание содержимого окна</p>
    <ul>
      <li>Элемент списка 1</li>
      <li>Элемент списка 2</li>
    </ul>
  `,
  width: '400px',
});

