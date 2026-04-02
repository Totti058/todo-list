const form = document.getElementById("form-alumnos");
const tabla = document.getElementById("tabla-alumnos");
let filaEditando = null;
let alumnos = JSON.parse(localStorage.getItem("alumnos")) || [];

function guardarEnStorage() {
    localStorage.setItem("alumnos", JSON.stringify(alumnos));
}

function crearFila(alumno, index) {
    const fila = document.createElement("tr");
    fila.dataset.index = index;
    fila.innerHTML = `
        <td>${alumno.nombre}</td>
        <td>${alumno.edad}</td>
        <td>${alumno.curso}</td>
        <td>${alumno.email}</td>
        <td><span class="${alumno.estado}">${alumno.estado}</span></td>
        <td>
            <button onclick="editar(this)"><img src="./assest/img/logo/editar.png" alt="editar"></button>
            <button onclick="eliminar(this)"><img src="./assest/img/logo/eliminar.png" alt="eliminar"></button>
        </td>
    `;
    return fila;
}

function renderTabla() {
    tabla.innerHTML = "";
    alumnos.forEach((alumno, index) => {
        const fila = crearFila(alumno, index);
        tabla.appendChild(fila);
    });
}

form.addEventListener("submit", function(e) {
    e.preventDefault();
    const datos = new FormData(form);
    const alumno = Object.fromEntries(datos.entries());

    if (filaEditando !== null) {
        alumnos[filaEditando] = alumno;
        filaEditando = null;
        form.querySelector("button[type='submit']").textContent = "Agregar Alumno";
    } else {
        alumnos.push(alumno);
    }

    guardarEnStorage();
    renderTabla();
    form.reset();
});

function editar(boton) {
    const fila = boton.parentElement.parentElement;
    const index = parseInt(fila.dataset.index);
    filaEditando = index;

    const alumno = alumnos[index];
    form.nombre.value = alumno.nombre;
    form.edad.value = alumno.edad;
    form.curso.value = alumno.curso;
    form.email.value = alumno.email;
    form.estado.value = alumno.estado;

    form.querySelector("button[type='submit']").textContent = "Guardar Cambios";
}

function eliminar(boton) {
    const fila = boton.parentElement.parentElement;
    const index = parseInt(fila.dataset.index);
    alumnos.splice(index, 1);
    guardarEnStorage();
    renderTabla();
}

renderTabla();