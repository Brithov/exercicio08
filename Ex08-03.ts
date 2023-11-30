/*
    3º Questão()
    Implemente como nos slides o lançamento da exceção no método sacar e realize
    um teste para saques que deixariam o saldo negativo.
*/

class Conta {

	private _numero: string;
	private _saldo: number;

	constructor(numero: string, saldoInicial: number) {
		this._numero = numero;
		this._saldo = saldoInicial;

	}

    get numero(): string {
		return this._numero;
	}

	get saldo(): number {
		return this._saldo;
	}

	sacar(valor: number): void {

        if (this._saldo >= valor) {
            this._saldo = this._saldo - valor;
        } else {
           // Exceção para saldo insuficiente: Implementação solicitada na questão 03
           throw new Error('Saldo insuficiente.');
        }
    }
}
//exemplificação
let conta: Conta = new Conta('1234', 10);
conta.sacar(11);
