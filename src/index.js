/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import './styles.css';
import { createGrid } from './DOM.js';

document.addEventListener('DOMContentLoaded', () => {
  createGrid('player');
  createGrid('AI');
});
