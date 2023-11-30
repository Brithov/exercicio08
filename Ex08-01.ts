/*
    1º Questão()

    Enumere os 3 tipos mais comuns de tratamento de erros e exemplifique com
    códigos seus ou pesquisados na internet.

    1º-> Tratamento de exceções : é uma técnica de programação que permite lidar 
    com erros ou situações inesperadas que podem ocorrer durante a execução de um programa.
   
    2º -> Verificação de erros de retorno é uma técnica que consiste em verificar o valor 
    de retorno de uma função para verificar se ocorreu um erro. Se o erro ocorrer, 
    a função lança uma exceção.

    3º-> Programação defensiva é uma técnica que consiste em assumir que erros podem 
    ocorrer e tomar medidas para lidar com eles.
*/

function divisaoSegura(a: number, b: number): number | string {
    // Programação defensiva: verifica se b é zero antes de realizar a divisão
    if (b === 0) {
        // Verificação de erros de retorno: retorna uma mensagem em caso de divisão por zero
        return "Erro: divisão por zero";
    }

    // Retorna o resultado da divisão
    return a / b;
}

function main() {
    // Tratamento de exceções: tenta executar a divisão
    let result: number | string = divisaoSegura(10, 2);

    // Verificação de erros de retorno: verifica o tipo de retorno
    if (typeof result === "number") {
        console.log("Resultado:", result);
    } else {
        console.log(result); // Imprime a mensagem de erro
    }

    let x: number = 1;

    // Tratamento de exceções: tenta executar a divisão
    result = divisaoSegura(x, 0);

    // Verificação de erros de retorno: verifica o tipo de retorno
    if (typeof result === "number") {
        console.log("Resultado:", result);
    } else {
        console.log(result); // Imprime a mensagem de erro
    }
}

main();

