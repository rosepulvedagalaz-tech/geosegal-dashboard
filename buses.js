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