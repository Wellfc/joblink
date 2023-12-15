'use strict';

import { onEvent, select, print } from './utils.js';

const usernameInput = select('.input-username');
const passwordInput = select('.input-password');
const loginButton = select('.button-login');
const invalidLogin = select('.invalid-login');

// Store the user's login info in localStorage
localStorage.setItem('username', 'jobseeker');
localStorage.setItem('password', 'hired1234');

// Validate the user's login info