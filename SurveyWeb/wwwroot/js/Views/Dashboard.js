function GraficoPizza(x) {
    var valores = [];
    var cores = [];
    var legendas = [];
    for (i = 0; i < $(x).length; i++) {
        valores.push(Number(x[i].quantidade));
        legendas.push("Mês: " + x[i].mes);
        cores.push('#' + Math.floor(Math.random() * 16777215).toString(16));
    }
    var config = {
        type: 'pie',
        data: {
            datasets: [{
                data: valores,
                backgroundColor: cores
            }],
            labels: legendas
        },
        options: {
            resposive: true,
            legend: {
                display: true
            },
            tooltips: {
                enabled: true
            }
        }
    };

    if (typeof meuGraficoPizza !== 'undefined') {
        meuGraficoPizza.destroy();
    }

    var g = document.getElementById("grafPizza").getContext("2d");
    meuGraficoPizza = new Chart(g, config);
}


function GraficoBarra(x) {
    var valores = [];
    var cores = [];
    var legendas = [];
    for (i = 0; i < $(x).length; i++) {
        valores.push(Number(x[i].quantidade));
        legendas.push("Mês: " + x[i].mes);
        cores.push('#' + Math.floor(Math.random() * 16777215).toString(16));
    }
    var config = {
        type: 'bar',
        data: {
            datasets: [{
                data: valores,
                backgroundColor: cores
            }],
            labels: legendas
        },
        options: {
            resposive: true,
            scales: {
                xAxes: [{
                    stacked: true
                }],
                yAxes: [{
                    stacked: true
                }]
            },
            legend: {
                display: false
            },
            tooltips: {
                enabled: true
            }
        }
    };

    if (typeof meuGraficoBarra !== 'undefined') {
        meuGraficoBarra.destroy();
    }

    var g = document.getElementById("grafBarra").getContext("2d");
    meuGraficoBarra = new Chart(g, config);
}


function MontarGrafico(a) {
    $.ajax({
        cache: false,
        url: "/Dashboard/ObterQuestionariosInicio",
        data: { Ano: a },
        success: function (retorno) {
            GraficoPizza(retorno);
        },
        error: function (req, status, error) {
            alert(error);
        }
    });

    $.ajax({
        cache: false,
        url: "/Dashboard/ObterQuestionariosFim",
        data: { Ano: a },
        success: function (retorno) {
            GraficoBarra(retorno);
        },
        error: function (req, status, error) {
            alert(error);
        }
    });

}

window.onload = function () {
    var d = new Date();
    MontarGrafico(d.getFullYear());
}