/*
Altere a aplicação “app.ts” para que tenha um tratamento de exceções no do {}
while mostra a estrutura do slide “Aplicação Robusta”.
*/

import { question } from "readline-sync";
import { Conta, Banco,Poupanca,ContaImposto } from "./BancoModify";
let b: Banco = new Banco();
let opcao: String = '';

do {
    console.log('\nBem vindo\nDigite uma opção:');
    console.log('1 - Cadastrar       2 - Consultar saldo       3 - Sacar\n' +
        '4 - Depositar       5 - Excluir               6 - Transferir\n' +
        '7 - Totalizações' +
        '0 - Sair\n');
    opcao = question("Opção:");

    try {
        switch (opcao) {
            case "1":
                inserir();
                break;
            case "2":
                consultar();
                break;
            case "3":
                sacar();
                break;
            case "4":
                depositar();
                break;
            case "5":
                excluir();
                break;
            case "6":
                transferir();
                break;
            case "7":
                exibirTotalizacoes();
                break;
            // Adicionei a opção 0 para encerrar o programa
            case "0":
                console.log("Saindo...");
                break;
            default:
                console.log("Opção inválida. Tente novamente.");
        }
    } catch (error) {
        console.error(`Ocorreu um erro: ${error|| error}`);
    }

    if (opcao !== "0") {
        question("\nOperação finalizada. Digite <enter>");
    }
} while (opcao !== "0");

console.log("Aplicação encerrada");

function inserir(): void {
    console.log("\nCadastrar conta\n");
    let numero: string = question('Digite o número da conta:');
    let saldoInicial: number = parseFloat(question('Digite o saldo inicial:'));
    let tipoConta: string = question('Digite o tipo de conta (C para Conta, CP para Poupança, CI para Conta Imposto):').toUpperCase();

    let conta: Conta;

    switch (tipoConta) {
        case 'C':
            conta = new Conta(numero, saldoInicial);
            break;
        case 'CP':
            let taxaJuros: number = parseFloat(question('Digite a taxa de juros para a Poupança:'));
            conta = new Poupanca(numero, saldoInicial, taxaJuros);
            break;
        case 'CI':
            let taxaDesconto: number = parseFloat(question('Digite a taxa de desconto para a Conta Imposto:'));
            conta = new ContaImposto(numero, saldoInicial, taxaDesconto);
            break;
        default:
            throw new Error("Tipo de conta inválido.");
    }

    b.inserir(conta);
    exibirConta(numero);
}

function consultar() {
    console.log("\Consultar conta\n");
    let numero: string = question('Número da conta:');
    let conta: Conta = b.consultar(numero)

    exibirConta(conta.numero)
}


function sacar(): void {
    console.log("\nSacar de conta\n");
    let numero: string = question('Número da conta:');
    let valor: number = parseFloat(question('Valor a ser sacado:'));
    b.sacar(numero, valor);
    exibirConta(numero);
}

function depositar() {
    console.log("\Depositar em conta\n");
    let numero: string = question('Número da conta:');
    let valor: number = parseFloat(question('Valor:'));
    b.depositar(numero, valor);
    exibirConta(numero)
}
function transferir(): void {
    console.log("\nTransferir entre contas\n");
    let contaOrigem: string = question('Conta de origem:');
    let contaDestino: string = question('Conta de destino:');
    let valor: number = parseFloat(question('Valor da transferência: '));
    b.transferir(contaDestino, contaOrigem, valor);
    console.log(`Transferência de ${valor} da conta ${contaOrigem} para ${contaDestino} realizada.`);
}

function excluir(): void {
    console.log("\nExcluir conta\n");
    let numero: string = question('Número da conta:');
    b.excluir(numero);
    console.log(`Conta ${numero} excluída.`);
}
function exibirConta(numero: String): void {
    console.log(`Conta ${b.consultar(numero).numero} - Saldo: ${b.consultar(numero).saldo}`);
}

function exibirTotalizacoes(): void {
    console.log("\nTotalizações\n");
    console.log(`Total depositado em todas as contas: ${b.getTotalDepositado()}`);
    console.log(`Total de contas cadastradas: ${b.getTotalContas()}`);
    console.log(`Média de saldo nas contas: ${b.getMediaDepositada()}`);
}