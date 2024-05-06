function nextPage(){
    let quantidadeMatrix = FindElement("qtdMatriz")
    let qtdLinhasMatrix = FindElement("qtdLin")
    let qtdColunasMatrix = FindElement("qtdCol")



    alert(`A quantidade de matrizes são: ${quantidadeMatrix};
A quantidade de Linhas são: ${qtdLinhasMatrix};
a quantidade de Colunas são: ${qtdColunasMatrix}`)
}

function FindElement(nameId){
    return document.getElementById(nameId).value
}