let carrito = [];
let total = 0;
let isAuth = JSON.parse(localStorage.getItem("autenticacion"));

if (isAuth === null) {
  isAuth = { isLogin: false };
}

const bbdd = [
  {
    usuario: 'Nico',
    contraseña: '123'
  },
  {
    usuario: 'Naty',
    contraseña: '1234'
  },
  {
    usuario: 'Mate',
    contraseña: '12345'
  }
];

const user = {
  usuario: '',
  contraseña: ''
};

function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  total += precio;
  actualizarCarrito();
  mostrarMensajeProductoAgregado(nombre);
}

function actualizarCarrito() {
  const carritoLista = document.getElementById('carrito-lista');
  const carritoTotal = document.getElementById('carrito-total');

  const opciones = {
    useGrouping: true,
    minimumFractionDigits: 3,
    maximumFractionDigits: 3
  };

  carritoLista.innerHTML = '';
  carrito.forEach(item => {
    const li = document.createElement('li');
    li.innerText = `${item.nombre} - $${item.precio.toLocaleString(undefined, opciones)}`;
    carritoLista.appendChild(li);
  });

  carritoTotal.innerText = `Total: $${total.toLocaleString(undefined, opciones)}`;
}
function mostrarMensajeProductoAgregado(nombre) {
  Swal.fire({
    icon: 'success',
    title: 'Producto agregado',
    text: `Se ha agregado "${nombre}" al carrito.`,
    timer: 1500, // Duración en milisegundos del mensaje (2 segundos en este caso)
    timerProgressBar: true,
  });
}
function comprar() {
  if (!isAuth.isLogin) {
    Swal.fire({
      icon: 'error',
      title: 'No estás logeado',
      text: 'Debes iniciar sesión para comprar.',
    });
    return;
  }

  if (carrito.length === 0) {
    Swal.fire({
      icon: 'error',
      title: 'Carrito vacío',
      text: 'No puedes realizar la compra porque el carrito está vacío.',
    });
    return;
  }

  // Código para realizar la compra
  // ...

  Swal.fire({
    icon: 'success',
    title: 'Compra realizada',
    text: '¡Gracias por su compra!',
    timer: 2000, // Duración en milisegundos del mensaje (2 segundos en este caso)
    timerProgressBar: true,
  });

  // Vaciar el carrito después de la compra
  vaciarCarrito();
}



function vaciarCarrito() {
  carrito = [];
  total = 0;
  actualizarCarrito();
}

const buttonLogin = document.getElementById('login-button');
const app = document.querySelector('#app');
const inputs = document.querySelectorAll('input');

const bienvenidaAlUsuario = nombre => {
  app.innerHTML = `<h1 class='title'>Bienvenido sr/sra ${nombre}</h1>`;
};

if (isAuth.isLogin) {
  bienvenidaAlUsuario(isAuth.name);
}

buttonLogin.addEventListener('click', () => {
  const usuarioEncontrado = bbdd.find(el => el.usuario === user.usuario && el.contraseña === user.contraseña);
  if (usuarioEncontrado) {
    bienvenidaAlUsuario(usuarioEncontrado.usuario);
    isAuth = { name: usuarioEncontrado.usuario, isLogin: true };
    localStorage.setItem('autenticacion', JSON.stringify(isAuth));
  } else {
    console.log('Usuario Incorrecto.');
  }
});

inputs.forEach(elemento => {
  elemento.addEventListener('input', e => {
    const { target } = e;
    const { name, value } = target;
    user[name] = value;
  });
});
buttonLogin.addEventListener('click', () => {
  const usuarioEncontrado = bbdd.find(el => el.usuario === user.usuario && el.contraseña === user.contraseña);
  if (usuarioEncontrado) {
    bienvenidaAlUsuario(usuarioEncontrado.usuario);
    isAuth = { name: usuarioEncontrado.usuario, isLogin: true };
    localStorage.setItem('autenticacion', JSON.stringify(isAuth));
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Usuario Incorrecto',
      text: 'El usuario o la contraseña ingresados son incorrectos.',
    });
  }
});