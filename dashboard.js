fetch("data/data.json")
.then(response => response.json())
.then(data => {

document.getElementById("disponibilidad").textContent =
data.kpis.disponibilidad + "%";

document.getElementById("cumplimiento").textContent =
data.kpis.cumplimiento + "%";

document.getElementById("revision").textContent =
data.kpis.revision + "%";


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

