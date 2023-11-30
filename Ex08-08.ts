/*
    8º Questão()
    Implemente na classe Banco os métodos consultar e consultarPorIndice para que,
    caso a conta procurada não seja encontrada, a exceção ContaInexistente seja
    lançada.

    Resolução:

    public consultar(numero: String): Conta {
    let contaConsultada!: Conta;
    
        for (let conta of this.contas) {
            if (conta.numero == numero) {
                contaConsultada = conta;
                break;
            } 
        }
        //Exceção quando a conta não for encontrada
        if(!contaConsultada){
            throw new ContaInexistenteError(`Conta ${numero} inexistente!`);
        }
    return contaConsultada;
    }

    private consultarPorIndice(numero: String): number {
        let indice: number = -1;

        for (let i: number = 0; i < this.contas.length; i++) {

            if (this.contas[i].numero == numero) {
                indice = i;
                break;
            }
        }
        if(indice === -1){
            throw new ContaInexistenteError(`Conta ${numero} inexistente!`);
        }
        return indice;
    }


*/

