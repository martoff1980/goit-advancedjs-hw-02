const formData = {
  email: '',
  message: '',
};

// Завантаження даних з локального сховища при завантаженні сторінки
document.addEventListener('DOMContentLoaded', () => {
  const savedData = localStorage.getItem('feedback-form-state');

  if (savedData) {
    const parsedData = JSON.parse(savedData);
    formData.email = parsedData.email || '';
    formData.message = parsedData.message || '';
    // Заповнення форми з даними з локального сховища
    document.querySelector('[name="email"]').value = formData.email;
    document.querySelector('[name="message"]').value = formData.message;
  }
});

// Обробка введених даних
document.querySelector('.feedback-form').addEventListener('input', event => {
  let { name, value } = event.target;
  value = value.trim();
  console.log(`Вводиться для поля ${name} значення: ${value}`);

  if (name in formData) {
    formData[name] = value;
    localStorage.setItem('feedback-form-state', JSON.stringify(formData)); // зберігаємо в локальне сховище
  }
});

// Перевірка перед відправленням форми
document.querySelector('.feedback-form').addEventListener('submit', event => {
  event.preventDefault();

  // Перевірка чи обидва поля заповнені
  if (!formData.email || !formData.message) {
    console.log(formData.email, formData.message);
    alert('Fill please all fields');
    return;
  }

  console.log('Відправити: ', formData);

  // Очищення локального сховища
  localStorage.removeItem('feedback-form-state');

  // Очищення форми
  formData.email = '';
  formData.message = '';
  document.querySelector('[name="email"]').value = '';
  document.querySelector('[name="message"]').value = '';
});
