import { Conta } from "../model/Conta";
import { ContaRepository } from "../repository/ContaRepository";
import { Colors } from "../util/Colors";
import { formatarMoeda } from "../util/Currency";

export class ContaController implements ContaRepository {


    private listaContas = new Array<Conta>();//é um array de contas

    public numero: number = 0;

    // Métodos de contrução do CRUD


    procurarPorNumero(numero: number): void {//procurarPorNumero(parâmetro) recebe como parâmetro o número digitado pelo usuário
        const buscaConta = this.buscarNoArray(numero);
        //A constante buscarConta chama o método buscarNoArray() para tentar encontrar a conta
        if (buscaConta !== null)//Se encontrar: Chama visualizar() → mostra os dados da conta - Se não encontrar:Exibe mensagem de erro em vermelho
            buscaConta.visualizar();
        else
            console.log(Colors.fg.red, "\nConta não Encontrada!", Colors.reset);
        //📌 Importante: Esse método não retorna nada (void), ele só executa ações (mostrar dados ou mensagem)
    }

    listarTodas(): void {
        for (let conta of this.listaContas) {
            conta.visualizar();
        }
    }

    procurarPorTitular(titular: string): void {//procurarPorTitular(parâmetro) recebe como parâmetro o nome digitado pelo usuário
        //Retorna void → não retorna valor, apenas executa ações (listar contas ou mostrar mensagem)

        // Filtragem dos dados

        //Cada posição do array listaContas é um objeto do tipo Conta -> Ex:[ { titular: "João", saldo: 1000 },{ titular: "Maria", saldo: 2000 } ]
        const buscaPorTitular = this.listaContas.filter(conta => conta.titular.toUpperCase().includes(titular.toUpperCase())
            //O filter varre todo o array e retorna um novo array apenas com os elementos que atendem à condição
            //conta => ... Arrow function, Para cada item do array: conta representa uma conta por vez
            //conta.titular acessa o nome do titular daquela conta específica 
            //Os dois toUpperCase() Convertem os textos para letras maiúsculas
            //includes(...) Verifica se o nome da conta contém o texto digitado, permite buscas parciais: "JOÃO SILVA".includes("JOÃO") → ✅ true
            //
        );

        // Listagem dos dados filtrados
        if (buscaPorTitular.length > 0) {//length > 0 → significa que uma ou mais contas foram encontradas
            buscaPorTitular.forEach(conta => conta.visualizar());//forEach percorre todas as contas encontradas
            //Para cada conta: Chama o método visualizar() que exibe os atributos da conta 
            /*this._numero = numero; this._agencia = agencia; this._titular = titular; this._tipo = tipo; this._saldo = saldo; + os atributos 
             exclusivos de cada conta ->  this._limite = limite; /  this._aniversario = aniversario, Ou seja: mostra os dados da conta no console */ 
        } else {
            console.log(Colors.fg.red, `\nNenhuma conta foi encontrada!`, Colors.reset);
            //Se o array estiver vazio exibe a mensagem:"Nenhuma conta foi encontrada!"
        }

    }

    //Crud(Create)
    //cadastrar = criar e armazenar uma nova conta no sistema
    // O Método cadastrar irá criar uma conta no final do array através da função function criarContasTeste() lá no Menu

    //Método chamado cadastrar Recebe um objeto do tipo Conta, pode ser ContaCorrente, ContaPoupanca, etc (polimorfismo), Não retorna nada (void)
    cadastrar(conta: Conta): void {
        this.listaContas.push(conta);//this.listaContas → é um array de contas (private listaContas: Array<Conta>) = [];
        //push(conta) → adiciona a conta no final do array
        console.log(Colors.fg.green,
            `\nA Conta número ${conta.numero} foi cadastrada com sucesso!`, Colors.reset);
        // Exibe uma mensagem no terminal Usa cores para deixar o texto verde
        //  conta.numero acessa o número da conta criada
    }

    atualizar(conta: Conta): void {//atualizar(parâmetro) recebe como parâmetro o número da conta digitado pelo usuário
        const buscaConta = this.buscarNoArray(conta.numero);
        //A constante buscarConta chama o método buscarNoArray() para tentar encontrar a conta 
        if (buscaConta !== null) {//Se encontrar
            this.listaContas[this.listaContas.indexOf(buscaConta)] = conta;
            /*Acessa o Array de contas this.listaContas, depois acessa o indice da conta através do numero da conta indexOf(buscaConta) 
            e envia todos os dados atualizados que vinheram do Menu para a mesma conta -> = conta*/
            console.log(Colors.fg.green,
                `\nA Conta número ${conta.numero} foi Atualizada com Sucesso!`, Colors.reset);
        } else
            console.log(Colors.fg.red, "\nConta não Encontrada!", Colors.reset);
    }

    deletar(numero: number): void {//deletar(parâmetro) recebe como parâmetro o número digitado pelo usuário
        const buscaConta = this.buscarNoArray(numero);
        //A constante buscarConta chama o método buscarNoArray() para tentar encontrar a conta
        if (buscaConta !== null) {//Se encontrar
            this.listaContas.splice(this.listaContas.indexOf(buscaConta), 1);
            /*Acessa o Array de contas (listaContas) e "splice" exclui a conta do Array de contas acessando o
             indice dela pelo número dela e excluindo somente ela (1) */
            console.log(Colors.fg.green,
                `\nA Conta número ${numero} foi Deletada com Sucesso!`, Colors.reset);
        } else
            console.log(Colors.fg.red, "\nConta não Encontrada!", Colors.reset);
    }

    // Métodos Bancários
    sacar(numero: number, valor: number): void {//Recebe o número da conta e o valor de saque digitado pelo usuário 
        const buscaConta = this.buscarNoArray(numero);
        //A constante buscarConta chama o método buscarNoArray() para tentar encontrar a conta
        if (buscaConta !== null) {//Se encontrar
            if (buscaConta.sacar(valor) === true)/*Chama o Método Auxiliar publico sacar na Super Classe Conta passando como parâmetro  
            o valor do saque recebido do usuário e retornando true já que o Metodo Auxiliar público sacar retorna boolean */
                console.log(Colors.fg.green,
                    `\nO Saque no valor de ${formatarMoeda(valor)} na Conta número ${numero} foi realizado com sucesso!`, Colors.reset);
            //Exibe a mensagem: "O Saque no valor de ${formatarMoeda(valor)} na Conta número ${numero} foi realizado com sucesso!"
        } else
            console.log(Colors.fg.red, `\nA Conta número ${numero} não foi encontrada!`, Colors.reset);
        //Se a conta não existir exibe a mensagem: "A Conta número ${numero} não foi encontrada!"
    }

    depositar(numero: number, valor: number): void {//Recebe o número da conta e o valor de saque digitado pelo usuário 
        const buscaConta = this.buscarNoArray(numero);
        //A constante buscarConta chama o método buscarNoArray() para tentar encontrar a conta
        if (buscaConta !== null) {//Se encontrar
            buscaConta.depositar(valor)/*Chama o Método Auxiliar publico depositar na Super Classe Conta passando como parâmetro  
            o valor do depósito recebido do usuário, daí o método depositar soma o saldo da conta + o valor de depósito digitado pelo usuário*/
            console.log(Colors.fg.green,
                `\nO Depósito no valor de ${formatarMoeda(valor)} na Conta número ${numero} foi realizado com sucesso!`, Colors.reset);
            //Exibe a mensagem: "O Depósito no valor de ${formatarMoeda(valor)} na Conta número ${numero} foi realizado com sucesso!"
        } else
            console.log(Colors.fg.red, `\nA Conta número ${numero} não foi encontrada!`, Colors.reset);
        //Se a conta não existir exibe a mensagem: "A Conta número ${numero} não foi encontrada!"
    }

    transferir(numeroOrigem: number, numeroDestino: number, valor: number): void {
        //Recebe o número da conta de origem, o número da conta de destino e o valor de transferência digitado pelo usuário 
        const buscaContaOrigem = this.buscarNoArray(numeroOrigem);
        //A constante buscarContaOrigem chama o método buscarNoArray() para tentar encontrar a conta
        const buscaContaDestino = this.buscarNoArray(numeroDestino);
        //A constante buscarConta chama o método buscarNoArray() para tentar encontrar a conta
        if (buscaContaOrigem !== null && buscaContaDestino !== null) {//Se encontrar a conta de origem e de destino
            if (buscaContaOrigem.sacar(valor) === true) {/*Chama o Método Auxiliar publico sacar na Super Classe Conta passando como parâmetro  
        o valor do saque digitado pelo usuario em Conta de Origem(Menu) cujo número da conta foi digitado pelo usuário e recebido como parâmetro
        no método tranferir - transferir(numeroOrigem: number..), e retorna true já que o Metodo Auxiliar público sacar retorna boolean */

                buscaContaDestino.depositar(valor);/*Chama o Método Auxiliar publico depositar na Super Classe Conta passando como parâmetro  
o valor do depósito digitado pelo usuario em Conta de Destino(Menu) cujo número da conta foi digitado pelo usuário e recebido como parâmetro
no método tranferir - transferir(numeroDestino: number..)daí o método depositar soma o saldo da conta + o valor de depósito digitado pelo usuário*/

                console.log(Colors.fg.green,
                    `\nA Transferência no valor de ${formatarMoeda(valor)} da Conta número ${numeroOrigem} 
                 \npara a Conta número ${numeroDestino} foi realizado com sucesso!`, Colors.reset);
            }/*Exibe a mensagem: "A Transferência no valor de ${formatarMoeda(valor)} da Conta número ${numeroOrigem} 
                para a Conta número ${numeroDestino} foi realizado com sucesso!"*/
        } else
            console.log(Colors.fg.red, `\nA Conta de origem e/ou destino não foram encontradas!`, Colors.reset);
        //Se uma das contas ou ambas não existirem exibe a mensagem: "A Conta de origem e/ou destino não foram encontradas!"
    }


    // Métodos Auxiliares

    public gerarNumero(): number {//Sempre que essa funçao é chamada ela gera um número sucessor do número anterior, ela começa 
        //transformando 0 em 1 (  public numero: number = 0;) 0++ = numero = 1 -> depois 1++ = numero = 2 -> depois 2++ = numero = 3...
        return ++this.numero;
    }

    //Método buscarNoArray, esse método é o coração da busca
    public buscarNoArray(numero: number): Conta | null {//Conta(Encontrou → retorna Conta) - Null(Não encontrou → retorna null)
        for (let conta of this.listaContas) {//Percorre todas as contas do array
            if (conta.numero === numero)//Se o número da conta for igual ao número procurado:
                return conta//Retorna o objeto Conta (A conta que ele estava procurando no Array seja ela conta corrente ou poupança)
        }

        return null;//Se terminar o loop e não encontrar: Retorna null
    }
}