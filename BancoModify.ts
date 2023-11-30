				
				
				// CÓDIGO FINAL APÓS TODAS AS IMPLEMENTAÇÕES SOLICITADAS

export { Banco, Conta, Poupanca, ContaImposto, AplicacaoError, ContaInexistenteError, SaldoInsuficienteError, ValorInvalidoError, PoupancaInvalidaError }
import * as fs from 'fs';
import { question } from 'readline-sync';

class Conta {
 
	private _numero: string;
	//_saldo será inicializado no construtor 
	private _saldo!: number;

	constructor(numero: string, saldoInicial: number) {
		this._numero = numero;
		// Utiliza o método depositar para atribuir o saldo inicial-Aolicitada pela questão 10
		this.depositar(saldoInicial);
	}

	sacar(valor: number): void {
		//Implementação solicitada na questão 06
		if (valor < 0) {
			throw new ValorInvalidoError("Valor do saque não pode ser negativo!");
		}
		if (this._saldo >= valor) {
			this._saldo = this._saldo - valor;
		} else {
			// Exceção para saldo insuficiente: Implementação solicitada na questão 03
			throw new SaldoInsuficienteError("Saldo Insuficiente");
		}
	}

	depositar(valor: number): void {
		if (valor < 0) {
			throw new ValorInvalidoError("Valor do deposito nao pode ser negativo! ")
		}
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

// Aplicações Erros solicitadas pela questão 07
class AplicacaoError extends Error {
	constructor(mensagem: string) {
		super(mensagem);
		this.name = "aplicacaoError";
	}
}

class ContaInexistenteError extends AplicacaoError {
	constructor(mensagem: string) {
		super(mensagem);
		this.name = 'ContaInexistenteError';
	}
}

class SaldoInsuficienteError extends AplicacaoError {
	constructor(mensagem: string) {
		super(mensagem);
		this.name = 'SaldoInsuficienteError';
	}
}
// Aplicações Erros solicitadas pela questão 10
class ValorInvalidoError extends AplicacaoError {
	constructor(mensagem: string) {
		super(mensagem);
		this.name = 'ValorInvalidoError'
	}


}
class PoupancaInvalidaError extends AplicacaoError {
	constructor(mensagem: string) {
		super(mensagem);
		this.name = 'PoupancaInvalidaError';
	}
}

class EntradaInvalidaError extends AplicacaoError {
	constructor(mensagem: string) {
		super(mensagem);
		this.name = 'EntradaInvalidaError';
	}
}

function validarEntrada(entrada: string): string {
	if (!entrada.trim()) {
		throw new EntradaInvalidaError("Entrada não pode ser vazia.");
	}
	return entrada;
}

function validarNumero(entrada: string): number {
	const valor = parseFloat(entrada);
	if (isNaN(valor) || valor < 0) {
		throw new EntradaInvalidaError("Valor inválido. Digite um número maior ou igual a zero.");
	}
	return valor;
}

function validarTipoConta(entrada: string): string {
	const tipoConta = entrada.toUpperCase();
	if (!['C', 'CP', 'CI'].includes(tipoConta)) {
		throw new EntradaInvalidaError("Tipo de conta inválido.");
	}
	return tipoConta;
}


class Banco {

	private contas: Conta[] = [];
	//private CAMINHO_ARQUIVO: string = "./ImportContas.csv";
	//private DESTINO_ARQUIVO: string = "./ExportContas.csv";

	public inserir(conta: Conta): void {
		try {
		  this.consultar(conta.numero);
		  console.log(`Conta ${conta.numero} já cadastrada`);
		} catch (error) {
		  if (error instanceof ContaInexistenteError) {
			// Se a exceção for do tipo ContaInexistenteError, então a conta não existe e pode ser inserida
			this.contas.push(conta);
			console.log(`Conta ${conta.numero} inserida, Saldo: ${conta.saldo}`);
		  } else {
			// Se for outra exceção, propague o erro
			throw error;
		  }
		}
	  }

	//Inserida exceções 
	public consultar(numero: String): Conta {
	
		let contaConsultada!: Conta;
		for (let conta of this.contas) {
		  if (conta.numero == numero) {
			contaConsultada = conta;
			break;
		  }
		}
		if (!contaConsultada) {
		  throw new ContaInexistenteError(`Conta ${numero} nao cadastrada`);
		}
		return contaConsultada;
	  }

	private consultarPorIndice(numero: String): number {
		let indice: number = -1;
		//Procurar a conta a partir de um numero de conta e rtorna a posiçao da mesma
		for (let i: number = 0; i < this.contas.length; i++) {

			if (this.contas[i].numero == numero) {
				indice = i;
				break;
			}
		}

		//Lança exceção caso o índice seja inexistente
		if (indice === -1) {
			throw new ContaInexistenteError(`Conta ${numero} inexistente!`);
		}
		return indice;
	}

	// Método após as exceções em consulta por indice
	public alterar(conta: Conta): void {
		// consultarPorIndice retorna a posição da conta no array
		let indice: number = this.consultarPorIndice(conta.numero);
		this.contas[indice] = conta;
	}

	public excluir(numero: string): void {
		let indice: number = this.consultarPorIndice(numero);

		for (let i: number = indice; i < this.contas.length; i++) {
			this.contas[i] = this.contas[i + 1];
		}

		this.contas.pop();

	}

	// Método após as exceções em consulta
	public depositar(numero: String, valor: number): void {
		let contaConsultada = this.consultar(numero)
		contaConsultada.depositar(valor);
	}

	// Método após as exceções em consulta
	public sacar(numero: String, valor: number): void {
		let contaConsultada = this.consultar(numero);
		contaConsultada.sacar(valor);
	}

	// Método após as exceções em consulta
	public transferir(numeroCredito: string, numeroDebito: string, valor: number): void {
		let contaCredito = this.consultar(numeroCredito);
		let contaDebito = this.consultar(numeroDebito);
		contaDebito.transferir(contaCredito, valor);
	}

	public getTotalDepositado(): number {
		let totalDepositado =
			this.contas.reduce((totalAcumulado: number, conta: Conta) => {
				return totalAcumulado + conta.saldo;
			}, 0);

		return totalDepositado;
	}

	renderJuros(numero: string) {
		try {
			let conta: Conta = this.consultar(numero);

			// Verifica se a conta é uma instância de Poupanca
			if (conta instanceof Poupanca) {
				conta.renderJuros();
			} else {
				// Lança a exceção se a conta não for uma poupança
				throw new PoupancaInvalidaError("A conta não é uma poupança, portanto, não pode render juros.");
			}
		} catch (error) {

			if (error instanceof AplicacaoError) {
				// Se for uma instância de AplicacaoError, exibe a mensagem personalizada
				console.error(`Erro ao render juros: ${error.message}`);
			} else {
				// Se for outro tipo de erro, exibe a mensagem padrão do erro
				console.error(`Erro ao render juros: ${error}`);
			}
		}
	}

	public getTotalContas(): number {
		return this.contas.length;
	}

	public getMediaDepositada(): number {
		return this.getTotalDepositado() / this.getTotalContas();
	}

	
}
class Poupanca extends Conta {
	private _taxaDeJuros: number;

	constructor(numero: string, saldo: number, taxaDeJuros: number) {
		super(numero, saldo);
		this._taxaDeJuros = taxaDeJuros;
	}

	renderJuros(): void {
		let juros: number = this.saldo * this._taxaDeJuros / 100;
		this.depositar(juros);
	}

	get taxaDeJuros(): number {
		return this._taxaDeJuros;
	}
}

class ContaImposto extends Conta {
	private _taxaDesconto: number;

	constructor(numero: string, saldo: number, taxaDesconto: number) {
		super(numero, saldo);
		this._taxaDesconto = taxaDesconto
	}

	sacar(valor: number): void {
		let valorDesconto = this.saldo * this._taxaDesconto / 100;
		super.sacar(valor + valorDesconto);
	}

	get taxaDesconto(): number {
		return this._taxaDesconto;
	}
}