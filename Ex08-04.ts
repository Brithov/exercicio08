/*
    4º Questão()
    Crie duas contas e teste o método transferir de modo que a conta a ser debitada
    não possua saldo suficiente. Explique o que ocorreu.

    Após a implementação de exceção no método sacar da classe conta, e executar
    o teste, a operação entra na exceção planejada ( saldo insuficiente), porém
    há uma ruptura abrupta do código, fazendo com que o erro detectado aborte e pare
    o funcionamento do código.
    Um ponto a considerar seria implementar try e catch para possibilitar a fluidez ao código