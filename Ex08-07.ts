/*
    7º Questão()
    Crie as classes AplicacaoError descendente de Error. Crie também classes
    ContaInexistenteError e SaldoInsuficienteError. Todas decendentes da classe
    AplicacaoError.
    
    Ao implementar o exceção no construtor para saldo menor que zero e executar o código 
    temos uma interrupção do código uma vez que o saldo menor que zero impossibilita a criação
    da instancia conta.
    Da forma análoga acontece com os métodos Transferir e depositar, ambos são interrompidos ao 
    ser inserido valores onde a exceção é lançada.
*/
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