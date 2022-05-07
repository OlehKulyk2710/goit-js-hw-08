import throttle from 'lodash.throttle';

const KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  formInput: document.querySelector('input'),
  formTextarea: document.querySelector('textarea'),
};

refs.form.addEventListener('input', throttle(onInputChange, 500));
refs.form.addEventListener('submit', onFormSubmit);

let email = '';
let message = '';

getLocalStorageValue(KEY);

function getLocalStorageValue(key) {
  let localStorageValue = localStorage.getItem(key);
  if (!localStorageValue) {
    // console.log(`This key "${key}" doesn't exist.`);
    return;
  }

  localStorageValue = JSON.parse(localStorageValue);

  showSavedValue(localStorageValue.email, localStorageValue.message);
}

function showSavedValue(emailValue, messageValue) {
  email = !emailValue ? '' : emailValue;
  message = !messageValue ? '' : messageValue;

  refs.formInput.value = email;
  refs.formTextarea.value = message;
}

function onInputChange(event) {
  if (event.target.name === 'email') {
    email = event.target.value.trim();
  } else {
    message = event.target.value.trim();
  }

  const objOfInputValues = { email, message };

  localStorage.setItem(KEY, JSON.stringify(objOfInputValues));

  if (email.length === 0 && message.length === 0) {
    localStorage.removeItem(KEY);
  }
}

function onFormSubmit(event) {
  event.preventDefault();
  console.log(localStorage.getItem(KEY));
  localStorage.removeItem(KEY);
  event.currentTarget.reset();
  email = '';
  message = '';
}
