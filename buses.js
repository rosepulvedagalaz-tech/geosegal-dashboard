let listaBuses = [];

function obtenerClaseEstado(estado){
if(!estado) return "estado-operativo";

const valor = estado.toLowerCase();

if(valor.includes("mant")) return "estado-mantencion";
if(valor.includes("fuera")) return "estado-fuera";
return "estado-operativo";
}

function renderizarBuses(buses){

const tabla = document.querySelector("#tablaBuses tbody");
const contador = document.getElementById("contadorBuses");

tabla.innerHTML = "";
contador.innerText = buses.length;

if(buses.length === 0){
tabla.innerHTML = `
<tr>
<td colspan="7">No se encontraron buses con ese criterio.</td>
</tr>
`;
return;
}

buses.forEach(bus => {

const claseEstado = obtenerClaseEstado(bus.estado);

tabla.innerHTML += `
<tr>
<td>${bus.numero_bus ?? "-"}</td>
<td>
<a class="patente-link" href="bus.html?patente=${bus.patente}">
${bus.patente}
</a>
</td>
<td>${bus.marca ?? "-"}</td>
<td>${bus.modelo ?? "-"}</td>
<td>${bus.anio ?? "-"}</td>
<td>
<span class="badge-estado ${claseEstado}">
${bus.estado ?? "Operativo"}
</span>
</td>
<td>
<button onclick="verBus('${bus.patente}')">Ver ficha</button>
</td>
</tr>
`;
});

}

async function cargarBuses(){

const response = await fetch("data/buses.json");
const data = await response.json();

listaBuses = data.buses;
renderizarBuses(listaBuses);

}

function verBus(patente){
window.location.href = "bus.html?patente=" + patente;
}

function buscarBus(){

const patente = document.getElementById("buscador").value.trim().toUpperCase();
const resultado = document.getElementById("resultado");

if(!patente){
resultado.innerText = "Ingresa una patente para buscar.";
resultado.className = "mensaje-resultado mensaje-alerta";
renderizarBuses(listaBuses);
return;
}

const bus = listaBuses.find(b => b.patente.toUpperCase() === patente);

if(bus){
window.location.href = "bus.html?patente=" + patente;
}else{
resultado.innerText = "No se encontró un bus con esa patente.";
resultado.className = "mensaje-resultado mensaje-error";
}
}

function filtrarBuses(){

const texto = document.getElementById("buscador").value.trim().toUpperCase();
const resultado = document.getElementById("resultado");

if(!texto){
resultado.innerText = "";
resultado.className = "mensaje-resultado";
renderizarBuses(listaBuses);
return;
}

const filtrados = listaBuses.filter(bus =>
(bus.patente && bus.patente.toUpperCase().includes(texto)) ||
(bus.marca && bus.marca.toUpperCase().includes(texto)) ||
(bus.modelo && bus.modelo.toUpperCase().includes(texto))
);

resultado.innerText = "";
resultado.className = "mensaje-resultado";
renderizarBuses(filtrados);

}

cargarBuses();