
document.getElementById('loginBtn').onclick = () => {
  document.getElementById('loginModal').style.display = 'flex';
};

document.querySelector('.closeBtn').onclick = () => {
  document.getElementById('loginModal').style.display = 'none';
};

document.getElementById('submitLogin').onclick = () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  if (email === 'solimangaming@hotmail.com' && password === 'Soliman@1234') {
    document.getElementById('adminBtn').style.display = 'inline-block';
    alert("Logged in as Admin");
  } else {
    alert("Incorrect credentials");
  }
  document.getElementById('loginModal').style.display = 'none';
};

document.getElementById('adminBtn').onclick = () => {
  const panel = document.getElementById('adminPanel');
  panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
};

const dropZone = document.getElementById('dropZone');
dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.style.borderColor = 'lime';
});
dropZone.addEventListener('dragleave', () => {
  dropZone.style.borderColor = 'white';
});
dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  alert("Dropped file: " + e.dataTransfer.files[0].name);
  dropZone.style.borderColor = 'white';
});
