let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarAlCarrito(nombre, precio) {
  const productoExistente = carrito.find(item => item.nombre === nombre);
  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }
  guardarCarrito();
  alert(`${nombre} ha sido agregado al carrito.`);
}

function eliminarDelCarrito(nombre) {
  carrito = carrito.filter(item => item.nombre !== nombre);
  guardarCarrito();
  mostrarCarrito();
}

function vaciarCarrito() {
  carrito = [];
  guardarCarrito();
  mostrarCarrito();
}

function mostrarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const total = document.getElementById("total");
  if (!lista || !total) return;

  lista.innerHTML = "";
  let totalCompra = 0;

  carrito.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("tarjeta-producto");
    div.innerHTML = `
      <h2>${producto.nombre}</h2>
      <p>Cantidad: ${producto.cantidad}</p>
      <p>Precio unitario: $${producto.precio.toFixed(2)}</p>
      <p>Subtotal: $${(producto.precio * producto.cantidad).toFixed(2)}</p>
      <button onclick="eliminarDelCarrito('${producto.nombre}')">Eliminar</button>
    `;
    lista.appendChild(div);
    totalCompra += producto.precio * producto.cantidad;
  });

  total.innerHTML = `<h2>Total: $${totalCompra.toFixed(2)}</h2>`;
}

document.addEventListener("DOMContentLoaded", mostrarCarrito);
