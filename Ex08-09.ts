/*
    9º Questão()

    Altere os métodos alterar, depositar, sacar, transferir, renderJuros removendo os
    “ifs/elses”, pois caso haja exceção no método consultar, os respectivos códigos
    não serão mais necessários.

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

