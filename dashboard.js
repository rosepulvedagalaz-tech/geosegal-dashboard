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

/* KPI DATA */

const response = await fetch("data/data.json")
const data = await response.json()

document.getElementById("disponibilidad").innerText = data.kpis.disponibilidad + "%"
document.getElementById("cumplimiento").innerText = data.kpis.cumplimiento + "%"
document.getElementById("revision").innerText = data.kpis.revision + "%"

document.getElementById("puntualidad").innerText = data.operacion.puntualidad + "%"
document.getElementById("fallas_promedio").innerText = data.operacion.fallas_promedio
document.getElementById("tiempo_reparacion").innerText = data.operacion.tiempo_reparacion + " hrs"


document.getElementById("flota_total").innerText = data.flota.total
document.getElementById("flota_operativos").innerText = data.flota.operativos
document.getElementById("flota_mantencion").innerText = data.flota.mantencion
document.getElementById("flota_fuera").innerText = data.flota.fuera_servicio
crearGraficos(data)

/* ALERTAS BUSES */

const responseBuses = await fetch("data/buses.json")
const busesData = await responseBuses.json()

const tabla = document.querySelector("#alertasTabla tbody")

const hoy = new Date()

busesData.buses.forEach(bus => {

const docs = [

{nombre:"Revisión Técnica",fecha:bus.revision_tecnica},
{nombre:"Permiso Circulación",fecha:bus.permiso_circulacion},
{nombre:"Seguro",fecha:bus.seguro},
{nombre:"Cartola",fecha:bus.cartola}

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

<td>
<a class="patente-link" href="bus.html?patente=${bus.patente}">
${bus.patente}
</a>
</td>

<td>${doc.nombre}</td>
<td>${doc.fecha}</td>
<td class="${clase}">${estado}</td>

</tr>
`

})

})

}

function crearGraficos(data){

new Chart(document.getElementById("graficoDisponibilidad"),{
type:"line",
data:{
labels:data.meses,
datasets:[{
label:"Disponibilidad %",
data:data.disponibilidad_mensual
}]
}
})

new Chart(document.getElementById("graficoCumplimiento"),{
type:"line",
data:{
labels:data.meses,
datasets:[{
label:"Cumplimiento %",
data:data.cumplimiento_mensual
}]
}
})

new Chart(document.getElementById("graficoFallas"),{
type:"bar",
data:{
labels:data.meses,
datasets:[{
label:"Fallas",
data:data.fallas
}]
}
})

}

cargarDashboard()