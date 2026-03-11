async function cargarBuses(){

const response = await fetch("data/buses.json")
const data = await response.json()

const tabla = document.querySelector("#tablaBuses tbody")

data.buses.forEach(bus => {

tabla.innerHTML += `

<tr>

<td>${bus.patente}</td>
<td>${bus.marca}</td>
<td>${bus.modelo}</td>
<td>${bus.anio}</td>

<td>
<button onclick="verBus('${bus.patente}')">
Ver ficha
</button>
</td>

</tr>

`

})

}

function verBus(patente){

window.location.href = "bus.html?patente=" + patente

}

async function buscarBus(){

const patente = document.getElementById("buscador").value.toUpperCase()

const response = await fetch("data/buses.json")
const data = await response.json()

const bus = data.buses.find(b => b.patente === patente)

if(bus){

window.location.href = "bus.html?patente=" + patente

}else{

document.getElementById("resultado").innerHTML = "Bus no encontrado"

}

}

cargarBuses()