/*
    9º Questão()
	
   	Crie uma exceção chamada ValorInvalidoError que herda de AplicacaoException e
	altere a classe Conta para que ao receber um crédito/depósito, caso o valor seja
	menor ou igual a zero, seja lançada a exceção ValorInvalidoError. Altere também o
	construtor da classe Conta para que o saldo inicial seja atribuído utilizando o
	método depositar.

    MÉTODOS ANTES DA IMPELMENTAÇÃO DAS EXCEÇÕES EM CONSULTAS

    public alterar(conta: Conta): void {
		let indice: number = this.consultarPorIndice(conta.numero);

		if (indice != -1) {
			this.contas[indice] = conta;
		}
	}

    public depositar(numero: String, valor: number): void {
		let contaConsultada = this.consultar(numero);

		if (contaConsultada != null) {
			contaConsultada.depositar(valor);
		}
	}

	public sacar(numero: String, valor: number): void {
		let contaConsultada = this.consultar(numero);

		if (contaConsultada != null) {
			contaConsultada.sacar(valor);
		}
	}

	public transferir(numeroCredito: string, numeroDebito: string, valor: number): void {
		let contaCredito = this.consultar(numeroCredito);
		let contaDebito = this.consultar(numeroDebito);

		if (contaDebito && contaCredito) {
			try{
				contaDebito.transferir(contaCredito, valor);
			} catch (erro){
				console.log("Erro ao transferir:", erro);
			}
		} 
	}

    renderJuros(numero: string) {
		let conta: Conta = this.consultar(numero);
		if (conta instanceof Poupanca) {
			conta.renderJuros();
			// (conta as Poupanca).renderJuros();
			//(<Poupanca> conta).renderJuros()
		}

	}

*/

