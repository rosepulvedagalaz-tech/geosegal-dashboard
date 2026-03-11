fetch("data/data.json")
.then(response => response.json())
.then(data => {

document.getElementById("disponibilidad").textContent =
data.kpis.disponibilidad + "%";

document.getElementById("cumplimiento").textContent =
data.kpis.cumplimiento + "%";

document.getElementById("revision").textContent =
data.kpis.revision + "%";

document.getElementById("flotaTotal").textContent = data.flota.total;
document.getElementById("flotaOperativa").textContent = data.flota.operativos;
document.getElementById("flotaMantencion").textContent = data.flota.mantencion;
document.getElementById("flotaFuera").textContent = data.flota.fuera_servicio;


const ctx = document.getElementById('fallasChart');

new Chart(ctx,{
type:'line',
data:{
labels:data.meses,
datasets:[{
label:'Fallas por mes',
data:data.fallas
}]
}
});

});

async function cargarDashboard(){

const response = await fetch("data/buses.json")
const data = await response.json()

const buses = data.buses

document.getElementById("totalBuses").innerText = buses.length

let operativos = buses.filter(b => b.estado === "Operativo").length
let mantencion = buses.filter(b => b.estado === "Mantencion").length

document.getElementById("operativos").innerText = operativos
document.getElementById("mantencion").innerText = mantencion

const tabla = document.querySelector("#alertasTabla tbody")

const hoy = new Date()

buses.forEach(bus => {

const docs = [

{nombre:"Revisión Técnica",fecha:bus.revision_tecnica},
{nombre:"Permiso Circulación",fecha:bus.permiso_circulacion},
{nombre:"Certificación Minera",fecha:bus.certificacion_minera}

]

docs.forEach(doc => {

const fecha = new Date(doc.fecha)

const diff = (fecha - hoy) / (1000*60*60*24)

let estado = ""
let clase = ""

if(diff < 0){

estado = "Vencido"
clase = "estado-vencido"

}
else if(diff <= 30){

estado = "Vence pronto"
clase = "estado-alerta"

}
else{

return

}

tabla.innerHTML += `
<tr>
<td>${bus.patente}</td>
<td>${doc.nombre}</td>
<td>${doc.fecha}</td>
<td class="${clase}">${estado}</td>
</tr>
`

})

})

}

cargarDashboard()


