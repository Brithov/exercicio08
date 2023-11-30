import * as fs from 'fs';
export { Banco, Conta, Poupanca, ContaImposto }

class Conta {

	private _numero: string;
	private _saldo: number;

	constructor(numero: string, saldoInicial: number) {
		this._numero = numero;
		this._saldo = saldoInicial;
		 
		//Implementação solicitada na questão 06
		if(saldoInicial <  0){
			throw new ContaInexistenteError("Valor nao pode ser negativo! ");
		}
	}

	sacar(valor: number): void {
		//Implementação solicitada na questão 06
		if(valor < 0){
			throw new Error("Valor do saque nao pode ser negativo! ")
		}
        if (this._saldo >= valor) {
            this._saldo = this._saldo - valor;
        } else {
           // Exceção para saldo insuficiente: Implementação solicitada na questão 03
            throw new SaldoInsuficienteError ("Saldo Insuficiente");
        }
    }

	depositar(valor: number): void {
		if(valor < 0){
			throw new Error("Valor do deposito nao pode ser negativo! ")
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
class ValorInvalidoError extends AplicacaoError {
	constructor (mensagem: string){
		super(mensagem);
		this.name = 'ValorInvalidoError'
	}
}


class Banco {
	
	private contas: Conta[] = [];
	private CAMINHO_ARQUIVO: string = "exercícios/Exercicio08/ImportContas.txt";

	public inserir(conta: Conta): void {
		let contaConsultada = this.consultar(conta.numero);

		if (contaConsultada == null) {
			this.contas.push(conta);

		} else {
			console.log(`Conta ${conta.numero} já cadastrada`);
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
/*

	let b: Banco = new Banco();
	b.inserir(new Poupanca("222", 100, 0.5));
	b.renderJuros("222")
	b.salvarEmArquivo();
	console.log(b.consultar("222"));
	b.carregarDeArquivo();
	b.inserir(new Conta("777", 70));
	b.inserir(new Poupanca("888", 80, 0.5));
	b.inserir(new Poupanca("999", 90, 0.38));
	b.salvarEmArquivo();


	b.inserir(new Conta("11111-1", 100));
	b.inserir(new Conta("22222-2", 150));
	b.inserir(new Conta("33333-3", 300));

	b.transferir("11111-1", "22222-2", 71);
	console.log(b.consultar("11111-1"));
	console.log(b.consultar("22222-2"));
	console.log(b.consultar("33333-3"));
	console.log(b.getTotalDepositado());
	console.log(b.getMediaDepositada());


	let poupanca: Poupanca = new Poupanca("1-1", 100, 0.5);

	poupanca.depositar(100);

	console.log(poupanca.saldo);
	poupanca.renderJuros();
	console.log(poupanca.saldo);


	let conta1: Poupanca = new Poupanca("1-2", 100, 0.5);
	console.log(conta1 instanceof Poupanca);
	console.log(conta1 instanceof Conta);
	console.log(conta1 instanceof Object);

	let banco: Banco = new Banco();
	let conta2: Conta = new Conta("22222-2", 150);
	banco.inserir(conta2);
	banco.inserir(poupanca);
	banco.inserir(conta1);


*/