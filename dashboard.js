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


