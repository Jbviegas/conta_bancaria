import { formatarMoeda } from './src/util/Currency';
import { ContaController } from './src/Controller/ContaController';
import { ContaCorrente } from './src/model/ContaCorrente';
import { ContaPoupanca } from './src/model/ContaPoupanca';
import { Colors } from './src/util/Colors';
import { Input } from "./src/util/Input";

//Criar um objeto global da classe ContaController
const contas = new ContaController();//Permite a constante contas acessar ContaController e instanciar seus métodos 

// Criar um array contendo os tipos de conta
const tipoContas = ['Conta Corrente', 'Conta Poupanca'];

export function main() {

    let opcao: number;

    criarContasTeste();

    while (true) {

        console.log(Colors.bg.black, Colors.fg.yellow,
            "*****************************************************");
        console.log("                                                     ");
        console.log("                BANCO DO BRAZIL COM Z                ");
        console.log("                                                     ");
        console.log("*****************************************************");
        console.log("                                                     ");
        console.log("            1 - Criar Conta                          ");
        console.log("            2 - Listar todas as Contas               ");
        console.log("            3 - Buscar Conta por Numero              ");
        console.log("            4 - Atualizar Dados da Conta             ");
        console.log("            5 - Apagar Conta                         ");
        console.log("            6 - Sacar                                ");
        console.log("            7 - Depositar                            ");
        console.log("            8 - Transferir valores entre Contas      ");
        console.log("            0 - Sair                                 ");
        console.log("                                                     ");
        console.log("*****************************************************");
        console.log("                                                     ",
            Colors.reset);

        console.log("Entre com a opção desejada: ");
        opcao = Input.questionInt("");

        if (opcao === 0) {
            console.log(Colors.fg.greenstrong, "\nBanco do Brazil com Z - O seu Futuro começa aqui!");
            sobre();
            console.log(Colors.reset, "");
            process.exit(0);
        }

        switch (opcao) {
            case 1:
                console.log(Colors.fg.whitestrong, "\n\nCriar Conta\n\n", Colors.reset);
                criarConta();//Chama a função criarConta();
                keyPress()
                break;
            case 2:
                console.log(Colors.fg.whitestrong, "\n\nListar todas as Contas\n\n", Colors.reset);
                contas.listarTodas();//contas acessa a classe ContaController e instancia a função listarTodas() para exibir todas as contas
                keyPress()
                break;
            case 3:
                console.log(Colors.fg.whitestrong, "\n\nConsultar dados da Conta - por número\n\n", Colors.reset);

                buscarContaPorNumero();//Chama a função  buscarContaPorNumero();

                keyPress()
                break;
            case 4:
                console.log(Colors.fg.whitestrong, "\n\nAtualizar dados da Conta\n\n", Colors.reset);

                atualizarConta();///Chama a função  atualizarConta();

                keyPress()
                break;
            case 5:
                console.log(Colors.fg.whitestrong, "\n\nApagar uma Conta\n\n", Colors.reset);

                deletarContaPorNumero();//Chama a função deletarContaPorNumero();

                keyPress()
                break;
            case 6:
                console.log(Colors.fg.whitestrong, "\n\nSaque\n\n", Colors.reset);

                sacar();///Chama a função  sacar();

                keyPress()
                break;
            case 7:
                console.log(Colors.fg.whitestrong, "\n\nDepósito\n\n", Colors.reset);

                depositar();///Chama a função  depositar();

                keyPress()
                break;
            case 8:
                console.log(Colors.fg.whitestrong, "\n\nTransferência entre Contas\n\n", Colors.reset);

                transferir();///Chama a função  transferir();

                keyPress()
                break;

            case 9:
                console.log(Colors.fg.whitestrong, "\n\nProcurar Conta por Nome do Titular\n\n", Colors.reset);

                procurarPorTitular();//Chama a função procurarPorTitular();

                keyPress()
                break;

            default:
                console.log(Colors.fg.whitestrong, "\nOpção Inválida!\n", Colors.reset);

                keyPress()
        }
    }

}

/* Opção 1: Criar uma nova Conta */

function criarConta() {

    console.log("Digite o número da agência: ")
    const agencia = Input.questionInt("");

    console.log("Digite o nome do titular: ")
    const titular = Input.question("");

    console.log("Selecione o tipo da conta: ")
    const tipo = Input.keyInSelect(tipoContas, "", { cancel: false }) + 1;//Input.keyInSelect Exibe um menu de opções para o usuário escolher
    //tipoContas é um Array  contendo os tipo de contas const tipoContas = ['Conta Corrente[0]', 'Conta Poupanca'[1]];
    //"" (string vazia) É a mensagem extra que poderia aparecer acima do menu, como está vazia, não aparece nada adicional.
    //{ cancel: false } Desativa a opção "Cancelar" no menu de opções -> [1] Conta Corrente [2] Conta Poupanca [3] Cancel
    //O keyInSelect não retorna 1 ou 2, ele retorna o índice do array: tipoContas = ['Conta Corrente[0]', 'Conta Poupanca'[1]]
    //+1 ajusta o valor ao switch que vem depois: switch (tipo) { case 1: Conta Corrente case 2: // Conta Poupança}

    console.log("Digite o saldo da conta: ")
    const saldo = Input.questionFloat("");

    switch (tipo) {
        case 1: // Conta Corrente
            console.log("Digite o limite da conta: ");
            const limite = Input.questionFloat("");
            contas.cadastrar(new ContaCorrente(//A variável contas acessa o método cadastrar em ContaController e cria uma conta corrente
                contas.gerarNumero(), agencia, titular, tipo, saldo, limite));
            //A variável contas acessa o método auxiliar gerarNumero()  em ContaController e gera o número da conta sucessor ao número anterior     
            break;//para o código após criar a conta

        case 2: // Conta Poupança
            console.log("Digite o dia do aniversário da conta: ");
            const aniversario = Input.questionInt("");
            contas.cadastrar(new ContaPoupanca(//A variável contas acessa o método cadastrar em ContaController e cria uma conta poupança
                contas.gerarNumero(), agencia, titular, tipo, saldo, aniversario));
            //A variável contas acessa o método auxiliar gerarNumero()  em ContaController e gera o número da conta sucessor ao número anterior     
            break;//para o código após criar a conta

    }

}

/* Opção 2: Veja o case 2 do Menu */

/* Opção 3: Procurar uma Conta pelo número */

function buscarContaPorNumero(): void {

    console.log("Digite o número da conta: ");//O usuário digita um número de conta
    const numero = Input.questionInt("");//Esse número é adicionado a variável número

    contas.procurarPorNumero(numero);//A constante número envia esse número digitado pelo usuário como parâmetro para o método procurarPorNumero
    //contas é uma instância de ContaController -  Chama o método que faz a busca
    /* 
    O Menu não se preocupa com a lógica
    
    O Controller resolve tudo
    
    📌 Isso é separação de responsabilidades (MVC):
    
    Menu → interação com usuário
    
    Controller → regras e lógica
    
    Model (Conta) → dados
        */
}

/* Opção 4: Atualizar os dados de uma Conta */

function atualizarConta(): void {

    // Solicita o número da conta
    console.log("Digite o número da conta: ");
    const numero = Input.questionInt("");

    // Verifica se a conta existe
    const conta = contas.buscarNoArray(numero);//Busca a conta no Array de contas listaContas em ContaController pelo número que o usuario digitou
    //contas é uma instância de ContaController 

    // Se a conta existir...
    if (conta !== null) {

        /**
         * Guarda os valores atuais da conta em variáveis
         * Exceto tipo que será aramazenado em uma constante
         * porque não terá o seu valor modificado
         */
        let agencia: number = conta.agencia; //Se a conta existir, guarda o valor da agência em variáveis
        let titular: string = conta.titular; //Se a conta existir, guarda o valor do titular em variáveis
        const tipo: number = conta.tipo;//Tipo que será aramazenado em uma constante
        let saldo: number = conta.saldo; //Se a conta existir, guarda o valor do saldo em variáveis

      
        console.log(`\nAgência atual: ${agencia}`);//Exibe o valor atual da agência
        console.log("Digite o novo número da agência: ");//Se pressionar ENTER o valor atual será mantido
        console.log("(Pressione ENTER para manter o valor atual)");//Para o ENTER funcionar, passamos o parâmetro  default input
        agencia = Input.questionInt("", { defaultInput: agencia });//default input, que indica o valor padrão (solução mais simples)

        // Atualização do Titular
        console.log(`\nTitular atual: ${titular}`);//Exibe o nome atual do titular
        console.log("Digite o novo nome do titular: ");//Se pressionar ENTER o valor atual será mantido
        console.log("(Pressione ENTER para manter o valor atual)");//Para o ENTER funcionar, passamos o parâmetro  default input
        titular = Input.question("", { defaultInput: titular });//default input, que indica o valor padrão (solução mais simples)

        // Atualização do Saldo
        console.log(`\nSaldo atual: ${formatarMoeda(saldo)}`);//Exibe o saldo atual
        console.log("Digite o valor do novo saldo: ");//Se pressionar ENTER o saldo atual será mantido
        console.log("(Pressione ENTER para manter o valor atual)");//Para o ENTER funcionar, passamos o parâmetro  default input
        saldo = Input.questionFloat("", { defaultInput: saldo });//default input, que indica o valor padrão (solução mais simples)

        // Atualização do Tipo
        switch (tipo) {
            case 1: // Conta Corrente

                /**
                 * Como o objeto 'conta' é do tipo genérico Conta, 
                 * precisamos converter o objeto (casting) para o tipo 
                 * ContaCorrente.
                 * Isso é necessário porque apenas a classe ContaCorrente 
                 * possui o atributo 'limite'.
                 * Após o casting, conseguimos acessar o atributo limite.
                 * O mesmo será feito com o atributo aniversario da classe
                 * ContaPoupanca
                 */
                let limite: number = (conta as ContaCorrente).limite;
                //conta é a conta do usuário que foi buscado pelo número, ela por padrão é Conta, e é convertida em conta corrente
                //Isso é necessário porque apenas a classe ContaCorrente possui o atributo 'limite'
                //Após o casting, conseguimos acessar o atributo limite.

                // Atualização do Limite
                console.log(`\nLimite atual: ${formatarMoeda(limite)}`);//Exibe o limite atual da conta
                console.log("Digite o valor do novo limite: ");//Se pressionar ENTER o valor atual será mantido
                console.log("(Pressione ENTER para manter o valor atual)");//Para o ENTER funcionar, passamos o parâmetro  default input
                limite = Input.questionFloat("", { defaultInput: limite });//default input, que indica o valor padrão (solução mais simples)

                /**
                * Na atualização não utilizamos o método gerarNumero() no atributo 'numero'.
                * O número da conta já existe e identifica unicamente essa conta.
                * 
                * Se chamarmos o método 'gerarNumero()', um novo número seria criado e 
                * substituiria o antigo, o que impediria a atualização dos dados.
                * 
                * O mesmo vale para a classe ContaPoupanca
                */
                contas.atualizar(new ContaCorrente(numero, agencia, titular, tipo, saldo, limite));
                //Instanciamos o método atualizar que está em ContaController e passamos os novos dados repetindo o número e tipo
                break;//para o código após atualizar a conta

            case 2: // Conta Poupança

                let aniversario: number = (conta as ContaPoupanca).aniversario;
                //conta é a conta do usuário que foi buscado pelo número, ela por padrão é Conta, e é convertida em conta poupança
                //Isso é necessário porque apenas a classe ContaPoupança possui o atributo 'aniversário'
                //Após o casting, conseguimos acessar o atributo aniversário.

                // Atualização do Aniversário
                console.log(`\nAniversário Atual: ${aniversario}`);// Exibe o dia do aniversário da conta
                console.log("Digite o novo dia do aniversário: ");//Se pressionar ENTER o valor atual será mantido
                console.log("(Pressione ENTER para manter o valor atual)");//Para o ENTER funcionar, passamos o parâmetro  default input
                aniversario = Input.questionInt("", { defaultInput: aniversario });//default input, que indica o valor padrão (solução mais simples)

                contas.atualizar(new ContaPoupanca(numero, agencia, titular, tipo, saldo, aniversario));
                //Instanciamos o método atualizar que está em ContaController e passamos os novos dados repetindo o número e tipo
                break;//para o código após atualizar a conta
        }

    } else {
        console.log(Colors.fg.red, `A conta número ${numero} não foi encontrada!`, Colors.reset);
    }
}

/* Opção 5: Deletar uma Conta pelo número */

function deletarContaPorNumero(): void {

    console.log("Digite o número da conta: ");//O usuário digita um número de conta
    const numero = Input.questionInt("");//Esse número é adicionado a variável número

    contas.deletar(numero);//A constante número envia esse número digitado pelo usuário como parâmetro para o método deletar
    //contas é uma instância de ContaController -  Chama o método deletar que faz a exclusão da conta

}

function sacar(): void {

    console.log("Digite o número da conta: ");//O usuário digita o número da conta
    const numero = Input.questionInt("");//O sistema recebe o número digitado e guarda na constante número

    //contas é a constante que acessa a classe  ContaController e instancia seus métodos, neste caso instancia o método buscarNoArray();
    const conta = contas.buscarNoArray(numero);//Busca a conta no Array de contas listaContas em ContaController pelo número que o usuario digitou
    //contas é uma instância de ContaController 

    // Se a conta existir...
    if (conta !== null) {//Diferente de nulo
        console.log("Digite o valor do saque: ");//Pede ao usuário que digite o valor de saque
        const valor = Input.questionFloat("");// Guarde o valor que o usuário digitou na constante valor

        contas.sacar(numero, valor);/* A constante contas acessa a classe ContaController e instancia o método sacar();
        passando como parãmetro o numero da conta e o valor de saque */
    } else {
        console.log(Colors.fg.red, `A conta número ${numero} não foi encontrada!`, Colors.reset);
        //Se a conta não existir exibe a mensagem "A conta número ${numero}(número digitado pelo usuário) não foi encontrada!"
    }
}

function depositar(): void {

    console.log("Digite o número da conta: ");//O usuário digita o número da conta
    const numero = Input.questionInt("");//O sistema recebe o número digitado e guarda na constante número

    //contas é a constante que acessa a classe  ContaController e instancia seus métodos, neste caso instancia o método buscarNoArray();
    const conta = contas.buscarNoArray(numero);//Busca a conta no Array de contas listaContas em ContaController pelo número que o usuario digitou
    //contas é uma instância de ContaController 

    // Se a conta existir...
    if (conta !== null) {//Diferente de nulo
        console.log("Digite o valor do depósito: ");//Pede ao usuário que digite o valor de depósito
        const valor = Input.questionFloat("");//Guarde o valor que o usuário digitou na constante valor

        contas.depositar(numero, valor);/* A constante contas acessa a classe ContaController e instancia o método depositar();
        passando como parãmetro o numero da conta e o valor de depósito */
    } else {
        console.log(Colors.fg.red, `A conta número ${numero} não foi encontrada!`, Colors.reset);
        //Se a conta não existir exibe a mensagem "A conta número ${numero}(número digitado pelo usuário) não foi encontrada!"
    }
}

function transferir(): void {

    console.log("Digite o número da Conta de Origem: ");//O usuário digita o número da conta de origem
    const numeroOrigem = Input.questionInt("");//O sistema recebe o número digitado e guarda na constante númeroOrigem

    console.log("Digite o número da Conta de Destino: ");//O usuário digita o número da conta de destino
    const numeroDestino = Input.questionInt("");//O sistema recebe o número digitado e guarda na constante númeroDestino

    //contas é a constante que acessa a classe  ContaController e instancia seus métodos, neste caso instancia o método buscarNoArray();
    const contaOrigem = contas.buscarNoArray(numeroOrigem);/*Busca a conta no Array de contas listaContas em ContaController pelo número 
    de origem que o usuario digitou */

    const contaDestino = contas.buscarNoArray(numeroDestino);/*Busca a conta no Array de contas listaContas em ContaController pelo número 
    de destino que o usuario digitou */

    // Se a conta não existir...
    if (contaOrigem === null) {//Igual a nulo

        console.log(Colors.fg.red, `A Conta de Origem número ${numeroOrigem} não foi encontrada!`, Colors.reset);
        //Se a conta de origem não existir exibe a mensagem: "A Conta de Origem número ${numeroOrigem} não foi encontrada!"
    } else if (contaDestino === null) {

        console.log(Colors.fg.red, `A Conta de Destino número ${numeroDestino} não foi encontrada!`, Colors.reset);
        //Se a conta de destino não existir exibe a mensagem: "A Conta de Destino número ${numeroOrigem} não foi encontrada!""
    } else {
        // Se a conta existir...
        console.log("Digite o valor da Transferência: ");//Pede ao usuário que digite o valor da tranferência
        const valor = Input.questionFloat("");//Guarde o valor que o usuário digitou na constante valor

        //Chamando o método transferir em ContaController
        contas.transferir(numeroOrigem, numeroDestino, valor);/*Passa os valores que o usuário digitou como parâmetros do método tranferir 
        através da constante contas que é a constante que acessa a classe  ContaController e instancia seus métodos*/
    }
}

function procurarPorTitular(): void {

    // Solicita o nome do titular
    console.log("Digite o Nome do Titular: ");//Pede ao usuário que digite o nome do titular da conta
    const titular = Input.question("");//Guarda o nome do titular da conta na constante titular


    // Localiza a conta a partir do nome do titular

    //contas é a constante que acessa a classe  ContaController e instancia seus métodos, neste caso instancia o método procurarPorTitular(titular);
    contas.procurarPorTitular(titular);//Busca a conta no Array de contas listaContas em ContaController pelo nome que o usuario digitou

}

/* Função com os dados da pessoa desenvolvedora */
function sobre(): void {
    console.log("\n*****************************************************");
    console.log("Projeto Desenvolvido por: ");
    console.log("Josue barreto Viegas");
    console.log("github.com/conteudoGeneration");
    console.log("*****************************************************");
}


/* Função de pausa entre as opções do menu */
function keyPress(): void {
    console.log(Colors.reset, "\nPressione enter para continuar...");
    Input.prompt();
}

/* Constas para Testes  */
function criarContasTeste(): void {

    //      cadastrar(conta: Conta): void -   número   -  agência - titular  -   tipo  - saldo  -  limite
    contas.cadastrar(new ContaCorrente(contas.gerarNumero(), 1234, 'Amanda Magro', 1, 2000.00, 1000.00));
    //contas está pegando os métodos da classe ContaController(cadastrar) - const contas = new ContaController();
    // new ContaCorrente(...) Cria um objeto ContaCorrente
    // A função gerarNumeros através de contas.gerarNumero(), irá cadastrar o próximo número de conta no Array listaContas em ContaController.
    // O objeto é enviado para o Método cadastrar, - cadastrar(conta: Conta)
    // Mesmo sendo ContaCorrente, ele entra como Conta.
    // listaContas.push(conta), - A conta é armazenada na lista 
    // Mensagem aparece no console
    // Conta cadastrada com sucesso
    contas.cadastrar(new ContaCorrente(contas.gerarNumero(), 4578, 'João da Silva', 1, 1000.00, 100.00));



    // Instâncias da Classe ContaPoupança

    //     cadastrar(conta: Conta): void -   número   -  agência -  titular  -   tipo - saldo - Data de aniversário da conta
    contas.cadastrar(new ContaPoupanca(contas.gerarNumero(), 5789, "Geana Almeida", 2, 1000.00, 10));
    //contas está pegando os métodos da classe ContaController(cadastrar) - const contas = new ContaController();
    // new ContaPoupança(...) Cria um objeto ContaPoupança
    // A função gerarNumeros através de contas.gerarNumero(), irá cadastrar o próximo número de conta no Array listaContas em ContaController.
    // O objeto é enviado para o Método cadastrar, - cadastrar(conta: Conta)
    // Mesmo sendo ContaPoupança, ele entra como Conta.
    // listaContas.push(conta), - A conta é armazenada na lista 
    // Mensagem aparece no console
    // Conta cadastrada com sucesso


    contas.cadastrar(new ContaPoupanca(contas.gerarNumero(), 5698, "Jean Lima", 2, 15000, 15));

}

main();