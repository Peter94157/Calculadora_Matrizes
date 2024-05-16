function nextPage() {
    // Aqui você pode adicionar lógica para avançar para a próxima página, se necessário
}

function criarMatriz(id) {


    const linhas = parseInt(document.getElementById('qtdLin').value);
    const colunas = parseInt(document.getElementById('qtdCol').value);
    const operacao = document.querySelector('input[name="operacao"]:checked').value;

    const divMatriz = document.getElementById(id);
    divMatriz.innerHTML = '';

    alert(operacao)

    for (let i = 0; i < linhas; i++) {
        for (let j = 0; j < colunas; j++) {
            const input = document.createElement('input');
            input.type = 'number';
            input.setAttribute('class', 'campoForms');
            divMatriz.appendChild(input);
        }
        divMatriz.appendChild(document.createElement('br'));
    }
    if (operacao === 'soma') {
        document.getElementById("operador").innerHTML='+';
    } else if (operacao === 'multiplicacao') {
        document.getElementById("operador").innerHTML='x';
    }else{
        alert("erro no simbolo da operação")
    }

}

function calcularMatrizes() {
        
    const matrizA = obterMatriz('matrizA', qtdLin, qtdCol);
    const matrizB = obterMatriz('matrizB', qtdLin, qtdCol);

    const resultado = realizarOperacao(matrizA, matrizB, operacao);

    exibirResultado(resultado);
}

function obterMatriz(id, linhas, colunas) {
    const matriz = [];
    const inputs = document.getElementById(id).querySelectorAll('input');

    let index = 0;
    for (let i = 0; i < linhas; i++) {
        const row = [];
        for (let j = 0; j < colunas; j++) {
            row.push(parseInt(inputs[index].value));
            index++;
        }
        matriz.push(row);
    }

    return matriz;
}

function realizarOperacao(matrizA, matrizB, operacao) {
    const resultado = [];

    for (let i = 0; i < matrizA.length; i++) {
        const row = [];
        for (let j = 0; j < matrizA[0].length; j++) {
            if (operacao === 'soma') {
                row.push(matrizA[i][j] + matrizB[i][j]);
            } else if (operacao === 'multiplicacao') {
                let sum = 0;
                for (let k = 0; k < matrizA[0].length; k++) {
                    sum += matrizA[i][k] * matrizB[k][j];
                }
                row.push(sum);
            }
        }
        resultado.push(row);
    }

    return resultado;
}

function exibirResultado(resultado) {
    const divResultado = document.getElementById('resultado');
    divResultado.innerHTML = '<h3>Resultado:</h3>';

    const table = document.createElement('table');
    for (const row of resultado) {
        const tr = document.createElement('tr');
        for (const cell of row) {
            const td = document.createElement('td');
            td.textContent = cell;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    divResultado.appendChild(table);
}