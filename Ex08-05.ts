/*
    5º Questão()
    Instancie uma classe banco e crie duas contas. Adicione-as à instancia do banco.
    Chame o método transferir novamente passando um valor que lance a exceção na
    classe conta. Você considera que o lançamento da exceção foi “propagado” para o
    método conta.transferir(), banco.transferir() e o método transferir do script app?
    Como você avalia a confiabilidade dessa implementação.

    Não! Uma vez que ao ser detectado o saldo insuficiente no método sacar da classe conta
    a aplicação interrompe, fazendo com que a ação não se propague para o método trasferir da
    classe banco.
    A confiabilidade da implementação de exceção em sacar, possibilita lidar com a
    situação , mas não de maneira completa e controlada. Portanto faz-se necessário
    o uso de mais formas de tratamento do erro, como o por exemplo o bloco Try-Cath.    
*/