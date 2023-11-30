/*
Crie exceções relacionadas a valores obtidos da entrada de dados que não sejam
aceitáveis, como valores vazios, números inválidos etc. Na aplicação, trate todas
as entradas de dados para que, caso o usuário infrinja regras de preenchimento, o
sistema lance e trate as exceções e informe que a entrada foi inválida.

*/
import { question } from "readline-sync";
import { Conta, Banco,Poupanca,ContaImposto } from "./BancoModify";
let b: Banco = new Banco();
let opcao: String = '';

class EntradaInvalidaError extends AplicacaoError {
    constructor(mensagem: string) {
      super(mensagem);
      this.name = 'EntradaInvalidaError';
    }
  }
  
  function inserir(): void {
    console.log("\nCadastrar conta\n");
  
    let numero: string, saldoInicial: number, tipoConta: string;
  
    try {
      numero = validarEntrada(question('Digite o número da conta:'));
      saldoInicial = validarNumero(question('Digite o saldo inicial:'));
      tipoConta = validarTipoConta(question('Digite o tipo de conta (C para Conta, CP para Poupança, CI para Conta Imposto):'));
  
      let conta: Conta;
  
      switch (tipoConta) {
        case 'C':
          conta = new Conta(numero, saldoInicial);
          break;
        case 'CP':
          conta = new Poupanca(numero, saldoInicial, validarNumero(question('Digite a taxa de juros para a Poupança:')));
          break;
        case 'CI':
          conta = new ContaImposto(numero, saldoInicial, validarNumero(question('Digite a taxa de desconto para a Conta Imposto:')));
          break;
        default:
          throw new EntradaInvalidaError("Tipo de conta inválido.");
      }
  
      b.inserir(conta);
      exibirConta(numero);
    } catch (error) {
      console.error(`Entrada inválida: ${ error}`);
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
  