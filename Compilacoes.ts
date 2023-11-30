import { Banco, Conta, Poupanca, ContaImposto } from "./BancoModify";

// Criando instâncias de contas
const contaCredito: Conta = new Conta("11111-1", 10);
const contaDebito: Conta = new Conta("22222-2", 50);

// Criando instância do banco
const banco: Banco = new Banco();

// Inserindo as contas no banco
banco.inserir(contaCredito);
banco.inserir(contaDebito);

/*
ry {//O bloco try é usado para executar um código que pode gerar um erro
    banco.transferir("11111-1", "22222-2", 50);// 
    console.log("Transferência realizada com sucesso!");
} catch (error) { //  bloco catch é usado para capturar um erro que foi gerado no bloco try.
    console.log("Erro ao transferir:", error);
}
*/

console.log("\n Saldo após a transferência:");
console.log("Conta Credito:", contaCredito.saldo); 
console.log("Conta Deibito:", contaDebito.saldo);//0,0

// Execução da questão 06
console.log("\n Teste questão 06:");
try {
    const contaCredito: Conta = new Conta("11111-1", -1);;// 
    banco.transferir("11111-1", "22222-2", -1);// 
    banco.depositar("11111-1", -1);// 
    console.log("Testes realizados!");
} catch (error) { //  bloco catch é usado para capturar um erro que foi gerado no bloco try.
    console.log("Erro ao criar conta:", error);
    console.log("Erro ao transferir:", error);
    console.log("\n Erro ao depositar:", error);
}