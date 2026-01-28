const items = [
    {id:1, objetivo:"DOMINIO", condicion:"Antigua"},
    {id:2, objetivo:"SIL-", condicion:"Nueva"},
    {id:3, objetivo:"EJE-", condicion:"Nueva"},
    {id:4, objetivo:"SOBACO", condicion:"Antigua"},
    {id:5, objetivo:"DIA-", condicion:"Nueva"},
    {id:6, objetivo:"AMARILLO", condicion:"Antigua"},
    {id:7, objetivo:"CANASTO", condicion:"Antigua"},
    {id:8, objetivo:"CUENTO", condicion:"Antigua"},
    {id:9, objetivo:"ALB-", condicion:"Nueva"},
    {id:10, objetivo:"CAM-", condicion:"Nueva"},
    {id:11, objetivo:"BOM-", condicion:"Nueva"},
    {id:12, objetivo:"BAR-", condicion:"Nueva"},
    {id:13, objetivo:"FER-", condicion:"Nueva"},
    {id:14, objetivo:"CATÓLICO", condicion:"Antigua"},
    {id:15, objetivo:"ACTIVIDAD", condicion:"Antigua"},
    {id:16, objetivo:"ESCAMAS", condicion:"Antigua"},
    {id:17, objetivo:"FORZADA", condicion:"Antigua"},
    {id:18, objetivo:"TRABAJO", condicion:"Antigua"},
    {id:19, objetivo:"NAVE", condicion:"Antigua"},
    {id:20, objetivo:"ESP-", condicion:"Nueva"},
    {id:21, objetivo:"IMP-", condicion:"Nueva"},
    {id:22, objetivo:"PERMISO", condicion:"Antigua"},
    {id:23, objetivo:"COM-", condicion:"Nueva"},
    {id:24, objetivo:"JUNTA", condicion:"Antigua"},
    {id:25, objetivo:"TRO-", condicion:"Nueva"},
    {id:26, objetivo:"INC-", condicion:"Nueva"},
    {id:27, objetivo:"MASAJE", condicion:"Antigua"},
    {id:28, objetivo:"PUN-", condicion:"Nueva"},
    {id:29, objetivo:"JAB-", condicion:"Nueva"},
    {id:30, objetivo:"ENTRADA", condicion:"Antigua"},
    {id:31, objetivo:"GRI-", condicion:"Nueva"},
    {id:32, objetivo:"CON-", condicion:"Nueva"},
    {id:33, objetivo:"TIR-", condicion:"Nueva"},
    {id:34, objetivo:"CIE-", condicion:"Nueva"},
    {id:35, objetivo:"SECTOR", condicion:"Antigua"},
    {id:36, objetivo:"SIM-", condicion:"Nueva"},
    {id:37, objetivo:"DES-", condicion:"Nueva"},
    {id:38, objetivo:"POL-", condicion:"Nueva"},
    {id:39, objetivo:"PARTE", condicion:"Antigua"},
    {id:40, objetivo:"GUAPO", condicion:"Antigua"}
];

let chart = null;

function renderizar() {
    const tbody = document.getElementById("tabla-items");
    items.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.id}</td>
            <td style="text-align:left"><strong>${item.objetivo}</strong></td>
            <td><input type="number" min="0" max="1" id="resp-${index}" value="0" style="width:40px; text-align:center"></td>
            <td>${item.condicion.toUpperCase()}</td>
        `;
        tbody.appendChild(row);
    });
}

function procesar() {
    const aciertos = { "Antiguo": 0, "Nuevo": 0 };
    const totales = { "Antiguo": 0, "Nuevo": 0 };

    items.forEach((item, index) => {
        const val = Number(document.getElementById(`resp-${index}`).value) || 0;
        totales[item.condicion]++;
        if(val === 1) aciertos[item.condicion]++;
    });

    const p1 = (aciertos["Antiguo"] / totales["Antiguo"]) * 100 || 0;
    const p2 = (aciertos["Nuevo"] / totales["Nuevo"]) * 100 || 0;
    const diff = (p1 - p2).toFixed(1);

    document.getElementById("calculo-detallado").innerHTML = `
        <strong style="display:block; margin-bottom:10px">ANÁLISIS DE PROPORCIONES</strong>
        <div class="math-row"><span>Proporción Aciertos (Presentadas)</span> <span>${aciertos["Antiguo"]} / ${totales["Antiguo"]} = <strong>${p1.toFixed(1)}%</strong></span></div>
        <div class="math-row"><span>Proporción Falsas Alarmas (No presentadas)</span> <span>${aciertos["Nuevo"]} / ${totales["Nuevo"]} = <strong>${p2.toFixed(1)}%</strong></span></div>
        <div class="math-row" style="margin-top:10px; border-top:1px solid #eee; padding-top:10px">
            <strong>Proporción Aciertos - Falsas Alarmas </strong> <strong>${diff}%</strong>
        </div>
    `;

    document.getElementById("seccion-resultados").style.display = "block";
    document.getElementById("val-Aciertos").innerText = p1.toFixed(1) + "%";
    document.getElementById("val-Falsas Alarmas").innerText = p2.toFixed(1) + "%";
    
    const feedback = document.getElementById("condicionFinal");
    if (parseFloat(diff) > 0) {
        feedback.innerText = `Efecto de Priming detectado: facilitación del ${diff}%.`;
        feedback.style.backgroundColor = "#e3f2fd";
        feedback.style.borderLeftColor = "#3498db";
    } else {
        feedback.innerText = `No se ha encontrado el efecto priming (Diferencia: ${diff}%).`;
        feedback.style.backgroundColor = "#ffebee";
        feedback.style.borderLeftColor = "#ef5350";
    }

    dibujarGrafica(p1, p2);
}

function dibujarGrafica(p1, p2) {
    const ctx = document.getElementById("grafica").getContext("2d");
    if (chart) chart.destroy();
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Antiguas (Presentadas)', 'Nuevas (No Presentadas)'],
            datasets: [{
                data: [p1, p2],
                backgroundColor: ['#A8E6CF', '#bdc3c7'],
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { 
                y: { 
                    beginAtZero: true, 
                    max: 100, 
                    title: { display: true, text: '% de compleción de raíces' } 
                } 
            }
        }
    });
}

window.onload = renderizar;