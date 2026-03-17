async function cargarDashboard() {
  try {
    /* KPI DATA */
    const response = await fetch("data/data.json");
    const data = await response.json();

    document.getElementById("disponibilidad").innerText = data.kpis.disponibilidad + "%";
    document.getElementById("cumplimiento").innerText = data.kpis.cumplimiento + "%";
    document.getElementById("revision").innerText = data.kpis.revision + "%";

    document.getElementById("puntualidad").innerText = data.operacion.puntualidad + "%";
    document.getElementById("fallas_promedio").innerText = data.operacion.fallas_promedio;
    document.getElementById("tiempo_reparacion").innerText = data.operacion.tiempo_reparacion + " hrs";

    document.getElementById("flota_total").innerText = data.flota.total;
    document.getElementById("flota_operativos").innerText = data.flota.operativos;
    document.getElementById("flota_mantencion").innerText = data.flota.mantencion;
    document.getElementById("flota_fuera").innerText = data.flota.fuera_servicio;

    crearGraficos(data);

    /* ALERTAS BUSES */
    const responseBuses = await fetch("data/buses.json");
    const busesData = await responseBuses.json();

    const tabla = document.querySelector("#alertasTabla tbody");
    tabla.innerHTML = "";

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    busesData.buses.forEach(bus => {
      const documentos = bus.documentos || {};

      const docs = [
        {
          nombre: "Revisión Técnica",
          fecha: documentos.revision_tecnica?.fecha || ""
        },
        {
          nombre: "Permiso Circulación",
          fecha: documentos.permiso_circulacion?.fecha || ""
        },
        {
          nombre: "Seguro",
          fecha: documentos.seguro?.fecha || ""
        },
        {
          nombre: "Cartola",
          fecha: documentos.cartola?.fecha || ""
        },
        {
          nombre: "Certificación Minera",
          fecha: documentos.certificacion_minera?.fecha || ""
        }
      ];

      docs.forEach(doc => {
        if (!doc.fecha) return;

        const fecha = new Date(doc.fecha + "T00:00:00");
        const diff = (fecha - hoy) / (1000 * 60 * 60 * 24);

        let estado = "";
        let clase = "";

        if (diff < 0) {
          estado = "Vencido";
          clase = "estado-vencido";
        } else if (diff <= 30) {
          estado = "Vence pronto";
          clase = "estado-alerta";
        } else {
          return;
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
        `;
      });
    });
  } catch (error) {
    console.error("Error al cargar el dashboard:", error);
  }
}

function crearGraficos(data) {
  new Chart(document.getElementById("graficoDisponibilidad"), {
    type: "line",
    data: {
      labels: data.meses,
      datasets: [{
        label: "Disponibilidad %",
        data: data.disponibilidad_mensual
      }]
    }
  });

  new Chart(document.getElementById("graficoCumplimiento"), {
    type: "line",
    data: {
      labels: data.meses,
      datasets: [{
        label: "Cumplimiento %",
        data: data.cumplimiento_mensual
      }]
    }
  });

  new Chart(document.getElementById("graficoFallas"), {
    type: "bar",
    data: {
      labels: data.meses,
      datasets: [{
        label: "Fallas",
        data: data.fallas
      }]
    }
  });
}

cargarDashboard();