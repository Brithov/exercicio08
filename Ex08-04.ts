/*
    4º Questão()
    Crie duas contas e teste o método transferir de modo que a conta a ser debitada
    não possua saldo suficiente. Explique o que ocorreu.

    Após a implementação de exceção no método sacar da classe conta, e executar
    o teste, a operação entra na exceção planejada ( saldo insuficiente), porém
    há uma ruptura abrupta do código, fazendo com que o erro detectado aborte e pare
    o funcionamento do código.
    Um ponto a considerar seria implementar try e catch para possibilitar a fluidez ao código
*/
import * as fs from 'fs';
class Conta {

	private _numero: string;
	private _saldo: number;

	constructor(numero: string, saldoInicial: number) {
		this._numero = numero;
		this._saldo = saldoInicial;
	}

	sacar(valor: number): void {

        if (this._saldo >= valor) {
            this._saldo = this._saldo - valor;
        } else {
           // Exceção para saldo insuficiente: Implementação solicitada na questão 03
           throw new Error('Saldo insuficiente');
        }
    }

	depositar(valor: number): void {
		this._saldo = this._saldo + valor;
	}

	transferir(contaDestino: Conta, valor: number): void {
		this.sacar(valor);
		contaDestino.depositar(valor);
	}

	get numero(): string {
		return this._numero;
	}

	get saldo(): number {
		return this._saldo;
	}

}

// Criando duas contas
const conta1 = new Conta("123", 1000);
const conta2 = new Conta("456", 500);

// Exibindo saldos iniciais
console.log(`Saldo da Conta 1: ${conta1.saldo}`);
console.log(`Saldo da Conta 2: ${conta2.saldo}`);

// Tentando transferir um valor maior do que o saldo da Conta 1
try {
    conta1.transferir(conta2, 1500);
    console.log("Transferência bem-sucedida.");
} catch (error) {
    console.log(`Erro ao transferir: ${error}`);
}
