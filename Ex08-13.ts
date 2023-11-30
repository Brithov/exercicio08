/*
    13º Questão()
   	Crie uma validação para não cadastrar mais de uma conta com o mesmo número.
	Para isso, chame o método consultar no método inserir da classe banco. Apenas
	se a exceção do método consultar for lançada, você deve incluir a conta. Para
	isso, consulte a conta dentro de um try e o faça a inclusão no catch
*/

import * as fs from 'fs';
export { Banco, Conta, Poupanca, ContaImposto }

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
		//Implementação solicitada na questão 11
		const saque : number = this.validarValor(valor);
		
        if (this._saldo >= saque) {
            this._saldo = this._saldo - saque;
        } else {

            throw new SaldoInsuficienteError ("Saldo Insuficiente");
        }
    }

	depositar(valor: number): void {
		//Implementação solicitada na questão 11
		const deposito : number = this.validarValor(valor);
		this._saldo = this._saldo + deposito;
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

	// Iplementação do método -Solicitada pela questão 11
	private validarValor(valor: number): number {
		if(valor <= 0){
			throw new ValorInvalidoError ("Valor nao pode ser negativo! ")
		} 
		return valor;
	}
	

}

class Poupanca extends Conta {
	private _taxaDeJuros: number;

	constructor(numero: string, saldo: number, taxaDeJuros: number) {
		super(numero, saldo);
		this._taxaDeJuros = taxaDeJuros;
	}

	renderJuros(): void {
		const juros: number = this.saldo * this._taxaDeJuros / 100;
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



// Aplicações Erros solicitadas pela questão 07
class AplicacaoError extends Error {
	constructor(mensagem : string){
		super(mensagem);
		this.name = "aplicacaoError";
	}
}

class ContaInexistenteError extends AplicacaoError{
	constructor(mensagem: string){
		super(mensagem);
		this.name = 'ContaInexistenteError';
	}
}

class SaldoInsuficienteError extends AplicacaoError{
	constructor(mensagem: string){
		super(mensagem);
		this.name = 'SaldoInsuficienteError';
	}
}
// Aplicações Erros solicitadas pela questão 10
class ValorInvalidoError extends AplicacaoError {
	constructor (mensagem: string){
		super(mensagem);
		this.name = 'ValorInvalidoError';
	}
}

// Aplicação Erro solicitada pela questão 12
class  PoupancaInvalidaError extends AplicacaoError {
	constructor (mensagem: string){
		super(mensagem);
		this.name = 'PoupancaInvalidaError';
	}
}


class Banco {
	
	private contas: Conta[] = [];
	private CAMINHO_ARQUIVO: string = "exercícios/Exercicio08/ImportContas.txt";

	// Imeplementação de exceção em inserir para o controle de contas duplicadas- Solicitada pela questão 13
	public inserir( conta: Conta): void {
		const contaVerificada = this.consultar(conta.numero);
		try {
			//verifica se a conta existe, existindo lançará uma exceção
			if(contaVerificada){
				throw new Error(`Conta ${conta.numero} já existe.`);
			}
		} catch (erro){ // Caso a consulta nao retorne uma conta ela nao existe e será inserida
			if(erro instanceof ContaInexistenteError){
				this.contas.push(conta);
        		console.log(`Conta ${conta.numero} cadastrada com sucesso.`);
			} else {
				throw erro;
			}
			
		}
	}

	//Inserida exceções 
	public consultar(numero: String): Conta {
		let contaConsultada!: Conta;
			//Procurar a conta a partir de um numero de conta e retorna a conta
			for (let conta of this.contas) {
				if (conta.numero == numero) {
					contaConsultada = conta;
					break;
				} 
			}
			// Lança uma exceção se a conta for inexistente 
			if(!contaConsultada){
				throw new ContaInexistenteError(`Conta ${numero} inexistente!`);
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
		if(indice === -1){
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
		let conta: Conta = this.consultar(numero);
		if (conta instanceof Poupanca) {
			conta.renderJuros();
		} else {
			throw new PoupancaInvalidaError(`Conta: ${numero} invalida, nao e uma conta poupanca!`)
		}
	}

	public getTotalContas(): number {
		return this.contas.length;
	}

	public getMediaDepositada(): number {
		return this.getTotalDepositado() / this.getTotalContas();
	}

	public carregarDeArquivo() {
		const arquivo: string = fs.readFileSync(this.CAMINHO_ARQUIVO, 'utf-8');
		//const linhas: string[] = arquivo.split('\n');
		const linhas: string[] = arquivo.split('\r\n');
		console.log("Iniciando leitura de arquivo");

		for (let i: number = 0; i < linhas.length; i++) {
			let linhaConta: string[] = linhas[i].split(";");
			let conta!: Conta;
			let tipo: string = linhaConta[2];
			if (tipo == 'C') {
				conta = new Conta(linhaConta[0], parseFloat(linhaConta[1]));
			} else if (tipo == 'CP') {
				conta = new Poupanca(linhaConta[0], parseFloat(linhaConta[1]), parseFloat(linhaConta[3]));
			} else if (tipo == 'CI') {
				conta = new ContaImposto(linhaConta[0], parseFloat(linhaConta[1]), parseFloat(linhaConta[3]));
			}

			this.inserir(conta);
			console.log(`Conta ${conta.numero} carregada`);
		}
		/*
				linhas.forEach(linha => {
					let linhaConta: string[] = linha.split(";");
					let conta!: Conta;
					let tipo: string  = linhaConta[2];
					if (tipo == 'C') {
						conta = new Conta(linhaConta[0], parseFloat(linhaConta[1]));
					} else if (tipo == 'CP') {
						conta = new Poupanca(linhaConta[0], parseFloat(linhaConta[1]),parseFloat(linhaConta[3]));
					} else if (tipo == 'CI') {
						conta = new ContaImposto(linhaConta[0], parseFloat(linhaConta[1]),parseFloat(linhaConta[3]));
					}
		
					this.inserir(conta);
					console.log(`Conta ${conta.numero} carregada`);
					
		
		
				});*/
		console.log("fim do arquivo")

	}

	public salvarEmArquivo() {
		console.log("Iniciando a gravação de contas em arquivo.")
		let stringContas: string = "";
		let linha: string = "";

		for (let conta of this.contas) {
			if (conta instanceof Poupanca) {
				linha = `${conta.numero};${conta.saldo};CP;${conta.taxaDeJuros}\r\n`;
			} else if ((conta instanceof ContaImposto)) {
				linha = `${conta.numero};${conta.saldo};CI;${conta.taxaDesconto}\r\n`;
			} else {
				linha = `${conta.numero};${conta.saldo};C\r\n`;
			}

			stringContas += linha;
		}
		//deleta os últimos \r\n da string que vai pro arquivo, evitando que grave uma linha vazia
		stringContas = stringContas.slice(0, stringContas.length - 2);

		fs.writeFileSync(this.CAMINHO_ARQUIVO, stringContas, 'utf-8');
		console.log("Contas salvas em arquivo.")
	}

}

