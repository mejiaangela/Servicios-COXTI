let tablaProductos = document.getElementById('productos');
    let filas = tablaProductos.getElementsByTagName('tbody')[0];
    document.getElementById('resultado').innerText = filas.children.length;