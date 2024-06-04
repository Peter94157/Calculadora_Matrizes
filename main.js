


function criarField() {
    const calculoSelecionado = document.querySelector('input[name="operacao"]:checked').value
    const linhas = parseInt(document.getElementById('qtdLin').value);
    const colunas = parseInt(document.getElementById('qtdCol').value);
    if (isNaN(linhas) || isNaN(colunas)) {
        return alert("Preencha os campos em branco")
    }

    if(calculoSelecionado=='determinante' && linhas!==colunas){
        return
    }

    document.getElementById("Matrizes").innerHTML = `<fieldset>
    <legend>Matrizes</legend>

    <p style="font-size: 80px; width: 20px;">[</p>
    <div id="matrizA"></div>
    <p style="font-size: 80px; width: 20px;">]</p>
    <h1 id="operador"></h1>
    <p style="font-size: 80px; width: 20px;">[</p>
    <div id="matrizB"></div>
    <p style="font-size: 80px; width: 20px;">]</p>
    </fieldset>`


    if (calculoSelecionado == "determinante" || calculoSelecionado == "inversa") {
        excluirSecoes('#Matrizes > fieldset > p:nth-child(6)')
        excluirSecoes('#Matrizes > fieldset > p:nth-child(7)')
        excluirSecoes('matrizB')
    }

}

function reload() {
    window.location.reload()
}


function criarMatriz(id) {

    const linhas = parseInt(document.getElementById('qtdLin').value);
    const colunas = parseInt(document.getElementById('qtdCol').value);
    const operacao = document.querySelector('input[name="operacao"]:checked').value;
    const divMatriz = document.getElementById(id);

    if (isNaN(linhas) || isNaN(colunas)) {
        return
    }
    if (divMatriz == '') {
        divMatriz.innerHTML = '';
    }
    if(operacao=='determinante' && linhas!==colunas){
        alert('A matriz deve ser quadrada para calcular o determinante')
        
        return
    }


    for (let i = 0; i < linhas; i++) {
        for (let j = 0; j < colunas; j++) {
            const input = document.createElement('input');
            input.type = 'number';
            input.setAttribute('class', 'campoForms');
            console.log(input)
            divMatriz.appendChild(input);
        }
        divMatriz.appendChild(document.createElement('br'));
    }
    const sinal = document.getElementById("operador")
    switch (operacao) {
        case 'soma':
            sinal.innerHTML = '+';
            break
        case 'subtracao':
            sinal.innerHTML = '-';
            break;
        case 'multiplicacao':
            sinal.innerHTML = 'x';
            break
        case 'inversa':
            sinal.innerHTML = ' '
            break;
        case 'determinante':
            sinal.innerHTML = ' '
            break
        default:
            alert('erro no simbolo da operação')
            return;
    }

    document.getElementById("button").innerHTML = `<button onclick="calcularMatrizes(${operacao})">Calcular</button>`;
    document.getElementById("next").innerHTML = ""
    document.getElementById("next").innerHTML = '<button onclick="reload()">Menu</button>'
    document.querySelector('#matrizA > input:nth-child(1)').focus()



}

function calcularMatrizes(operacao) {
    operacao = operacao.value
    const linhas = parseInt(document.getElementById('qtdLin').value);
    const colunas = parseInt(document.getElementById('qtdCol').value);


    const matrizA = obterMatriz('matrizA', linhas, colunas);
    let matrizB = []
    if (operacao !== 'inversa' && operacao !== 'determinante') {
        matrizB = obterMatriz('matrizB', linhas, colunas);
    }

    var resultado = [];
    switch (operacao) {
        case 'soma':
            resultado = realizarOperacao(matrizA, matrizB, operacao)
            break;
        case 'multiplicacao':
            resultado = realizarOperacao(matrizA, matrizB, operacao)
            break;
        case 'subtracao':
            resultado = realizarOperacao(matrizA, matrizB, operacao)
            break;
        case 'determinante':
            resultado = calcularDeterminante(matrizA);
            break;
        case 'inversa':
            resultado = calcularInversa(matrizA)
            break;
        default:
            alert('operacao inválida');
            return;
    }

    return exibirResultado(resultado);


}

function obterMatriz(id, linhas, colunas) {
    const matriz = [];
    const inputs = document.getElementById(id).querySelectorAll('input');

    let index = 0;
    for (let i = 0; i < linhas; i++) {
        const row = [];
        for (let j = 0; j < colunas; j++) {
            if (inputs[index].value == "") {
                return alert("preencha os espaços em branco")
            }
            row.push(parseInt(inputs[index].value));
            index++;
        }
        matriz.push(row);
    }
    window.location.href = '#resultado'
    return matriz;
}

function realizarOperacao(matrizA, matrizB, operacao) {
    const resultado = [];

    for (let i = 0; i < matrizA.length; i++) {
        const row = [];
        for (let j = 0; j < matrizA[0].length; j++) {
            if (operacao === 'soma') {
                row.push(matrizA[i][j] + matrizB[i][j]);
            } else if (operacao === 'subtracao') {
                row.push(matrizA[i][j] - matrizB[i][j]);
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


    if (isNaN(resultado)) {
        divResultado.innerHTML = `<h3>Resultado:</h3>
        <p style="font-size: 90px; width: 20px;">[</p>
        <p id="pResult" style="font-size: 90px; width: 20px;">]</p>`;

        const table = document.createElement('table');
        const p = document.getElementById('pResult')

        for (const row of resultado) {
            const tr = document.createElement('tr');
            for (const cell of row) {
                const td = document.createElement('td');
                td.textContent = cell;
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }

        divResultado.insertBefore(table, p)
    } else {
        divResultado.innerHTML = `<h3>Resultado:</h3>`
        const h4 = document.createElement('h4');
        h4.textContent = resultado

        divResultado.appendChild(h4);

    }
    excluirSecoes('operacao')
    excluirSecoes('Quantidades')
    excluirSecoes('button')
    excluirSecoes('Matrizes')
}

function excluirSecoes(id) {
    try {
        const header = document.getElementById(id)
        header.parentNode.removeChild(header)
    } catch (error) {
        const header = document.querySelector(id)
        header.parentNode.removeChild(header)
    }

}

function    calcularInversa(matriz) {
    // Função para calcular a inversa de uma matriz
    const n = matriz.length;
    let identity = [];
    for (let i = 0; i < n; i++) {
        identity[i] = [];
        for (let j = 0; j < n; j++) {
            identity[i][j] = (i === j) ? 1 : 0;
        }
    }

    for (let i = 0; i < n; i++) {
        let factor = matriz[i][i];
        if (factor === 0) {
            for (let j = i + 1; j < n; j++) {
                if (matriz[j][i] !== 0) {
                    [matriz[i], matriz[j]] = [matriz[j], matriz[i]];
                    [identity[i], identity[j]] = [identity[j], identity[i]];
                    factor = matriz[i][i];
                    break;
                }
            }
            if (factor === 0) {
                alert('Matriz não tem inversa')
                throw new Error('Matriz não tem inversa');
                return
            }
        }

        for (let j = 0; j < n; j++) {
            matriz[i][j] /= factor;
            identity[i][j] /= factor;
        }

        for (let j = 0; j < n; j++) {
            if (j !== i) {
                factor = matriz[j][i];
                for (let k = 0; k < n; k++) {
                    matriz[j][k] -= factor * matriz[i][k];
                    identity[j][k] -= factor * identity[i][k];
                }
            }
        }
    }

    return identity;
}

function calcularDeterminante(matriz) {
    // Função para calcular o determinante de uma matriz
    const n = matriz.length;
    
    let det = 1;
    let copy = matriz.map(row => row.slice());

    for (let i = 0; i < n; i++) {
        let factor = copy[i][i];
        if (factor === 0) {
            for (let j = i + 1; j < n; j++) {
                if (copy[j][i] !== 0) {
                    [copy[i], copy[j]] = [copy[j], copy[i]];
                    factor = copy[i][i];
                    det *= -1;
                    break;
                }
            }
            if (factor === 0) {
                return 0;
            }
        }

        det *= factor;
        for (let j = i; j < n; j++) {
            copy[i][j] /= factor;
        }

        for (let j = i + 1; j < n; j++) {
            factor = copy[j][i];
            for (let k = i; k < n; k++) {
                copy[j][k] -= factor * copy[i][k];
            }
        }
    }

    return det;

}
function geradorMatrix() {
    const operacao = document.querySelector('input[name="operacao"]:checked').value;
    
    
    switch (operacao) {
        case 'soma':
            criarMatriz('matrizA')
            criarMatriz('matrizB')
            return
        case 'subtracao':
            criarMatriz('matrizA')
            criarMatriz('matrizB')
            return
        case 'multiplicacao':
            criarMatriz('matrizA')
            criarMatriz('matrizB')
            return
        case 'inversa':
            criarMatriz('matrizA')
            return
        case 'determinante':

            criarMatriz('matrizA')
            return
        default:
            alert('Nenhuma matriz selecionada')
            console.log()
            return

    }
}
