// Dados extraídos diretamente da planilha (2026 a 2032)
const anos = [
    '2026 (18 anos)',
    '2027 (19 anos)',
    '2028 (20 anos)',
    '2029 (21 anos)',
    '2030 (22 anos)',
    '2031 (23 anos)',
    '2032 (24 anos)'
];

const valorInicial = [0, 180.00, 387.00, 624.15, 894.94, 1203.22, 1553.28];
const reservaAnual = [180.00, 198.00, 217.80, 239.58, 263.54, 289.89, 318.88];
const rendimento = [0, 9.00, 19.35, 31.21, 44.75, 60.16, 77.66];
const salario = [1500.00, 1650.00, 1815.00, 1996.50, 2196.15, 2415.77, 2657.34];

const ctx = document.getElementById('meuGrafico').getContext('2d');
let tipoAtual = 'bar'; // Começa como gráfico de barras empilhadas

const configGrafico = {
    type: tipoAtual,
    data: {
        labels: anos,
        datasets: [
            {
                label: 'Valor Inicial Acumulado (R$)',
                data: valorInicial,
                backgroundColor: '#667eea',
                borderColor: '#5a67d8',
                borderWidth: 1,
                stack: 'Patrimonio'
            },
            {
                label: 'Reserva Anual Guardada (R$)',
                data: reservaAnual,
                backgroundColor: '#4fd1c5',
                borderColor: '#319795',
                borderWidth: 1,
                stack: 'Patrimonio'
            },
            {
                label: 'Rendimento de 5% (R$)',
                data: rendimento,
                backgroundColor: '#f6ad55',
                borderColor: '#dd6b20',
                borderWidth: 1,
                stack: 'Patrimonio'
            },
            {
                label: 'Salário Anual/Mensal Base (R$)',
                data: salario,
                type: 'line', // Linha sobreposta para comparar com o salário
                borderColor: '#e53e3e',
                backgroundColor: '#e53e3e',
                borderWidth: 2,
                tension: 0.3,
                fill: false
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                callbacks: {
                    // Formata os valores no balão para Reais (R$)
                    label: function(context) {
                        let valor = context.raw.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        });
                        return `${context.dataset.label}: ${valor}`;
                    }
                }
            },
            legend: {
                position: 'bottom'
            }
        },
        scales: {
            x: {
                stacked: true
            },
            y: {
                stacked: true,
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        return 'R$ ' + value;
                    }
                }
            }
        }
    }
};

// Renderiza o gráfico na tela
let grafico = new Chart(ctx, configGrafico);

// Botão para alternar visualização (Barras Empilhadas <-> Linhas)
document.getElementById('btnAlternar').addEventListener('click', function() {
    grafico.destroy();
    
    if (tipoAtual === 'bar') {
        tipoAtual = 'line';
        configGrafico.type = 'line';
        configGrafico.options.scales.x.stacked = false;
        configGrafico.options.scales.y.stacked = false;
        this.textContent = 'Alternar para Barras Empilhadas';
    } else {
        tipoAtual = 'bar';
        configGrafico.type = 'bar';
        configGrafico.options.scales.x.stacked = true;
        configGrafico.options.scales.y.stacked = true;
        this.textContent = 'Alternar para Gráfico de Linha';
    }

    grafico = new Chart(ctx, configGrafico);
});
