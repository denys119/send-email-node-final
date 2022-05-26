const form = document.querySelector('#sendEmailForm');
const message = document.querySelector("#message");

form.addEventListener('submit', function(event) {
  event.preventDefault();
  const payload = {};
  new FormData(this).forEach((value, key) => payload[key] = value);
  fetch("/send-email", {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  }).then(res => res.json()).then(data => {
    grecaptcha.reset();
    form.reset();
    message.style.color = data.error == true ? 'red' : 'green';
    message.innerText = data.message;
  }).catch(err => {
    message.style.color = 'red';
    message.innerText = err;
  });
})