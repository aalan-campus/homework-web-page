const form = document.getElementById('practice-form');
const nameInput = document.getElementById('name-input');
const emailInput = document.getElementById('email-input');
const messageInput = document.getElementById('message-input');
const formStatus = document.getElementById('form-status');
const tipButton = document.getElementById('tip-button');
const tipResult = document.getElementById('tip-result');

function showError(input, message) {
  const error = document.getElementById(`${input.id.replace('-input', '')}-error`);
  error.textContent = message;
  input.setAttribute('aria-invalid', message ? 'true' : 'false');
}

function validateForm() {
  let isValid = true;

  [nameInput, emailInput, messageInput].forEach((input) => {
    if (!input.value.trim()) {
      showError(input, 'This field is required.');
      isValid = false;
    } else {
      showError(input, '');
    }
  });

  if (emailInput.value.trim() && !emailInput.validity.valid) {
    showError(emailInput, 'Please enter a valid email address.');
    isValid = false;
  }

  return isValid;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  formStatus.textContent = '';

  if (validateForm()) {
    formStatus.textContent = 'Thanks! Your message passed validation.';
  }
});

[nameInput, emailInput, messageInput].forEach((input) => {
  input.addEventListener('input', () => showError(input, ''));
});

tipButton.addEventListener('click', () => {
  tipResult.textContent = 'Loading a programming joke...';

  fetch('https://official-joke-api.appspot.com/jokes/programming/random')
    .then((response) => {
      if (!response.ok) {
        throw new Error('The API request failed.');
      }
      return response.json();
    })
    .then((data) => {
      const joke = data[0];
      tipResult.textContent = `${joke.setup} ${joke.punchline}`;
    })
    .catch(() => {
      tipResult.textContent = 'Sorry, no programming joke is available right now.';
    });
});
