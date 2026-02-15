import { Colors } from "../util/Colors";
import { formatarMoeda } from "../util/Currency";
export abstract class Conta {

    //Os atributos representam as características / dados que cada objeto da classe Conta vai ter.

    //Os Atributos da Classe Conta São:
    private _numero: number;/*private significa que esses atributos só podem ser acessados dentro da própria classe Conta 
    Isso garante:  Segurança dos dados, Controle de acesso (normalmente usando getters e setters)*/
    private _agencia: number;
    private _titular: string;
    private _tipo: number;
    private _saldo: number;

    //Método Construtor
    //O construtor é um método especial que é executado automaticamente quando um objeto é criado a partir da classe.
    //Para que ele serve? Inicializar (dar valor inicial) aos atributos da classe.

    constructor(numero: number, agencia: number, titular: string, tipo: number, saldo: number) {
        //O que significa this? O this faz referência ao objeto que está sendo criado.

        //Objetos Criados
        this._numero = numero;//this._numero → atributo da classe - numero → valor recebido como parâmetro no construtor
        this._agencia = agencia;
        this._titular = titular;
        this._tipo = tipo;
        this._saldo = saldo;
    }


    //Métodos Getters e Setters

    // Servem para criar validações. 
    // sem eles qualquer código pode alterar os dados livremente
    // Se a regra mudar: Você precisa revisar o sistema inteiro, Com getter/setter, muda só em um lugar 
    // Um erro pequeno pode quebrar todo o sistema.

    public get numero(): number {
        return this._numero;
    }


    public get agencia(): number {
        return this._agencia;
    }


    public get titular(): string {
        return this._titular;
    }


    public get tipo(): number {
        return this._tipo;
    }

    public get saldo(): number {// É acessado pelo método auxiliar sacar para fazer a validação do saldo
        return this._saldo;
    }


    public set numero(value: number) {
        this._numero = value;
    }


    public set agencia(value: number) {
        this._agencia = value;
    }


    public set titular(value: string) {
        this._titular = value;
    }


    public set tipo(value: number) {
        this._tipo = value;
    }


    public set saldo(value: number) {
        this._saldo = value;
    }


    //Métodos Auxiliares
    
    public depositar(/*parâmetro*/valor: number ): void {
        if (valor <= 0) {// Se o valor de depósito for menor ou igual a 0, exibe a mensagem "Valor inválido para depósito!" 
            console.log(Colors.fg.red, "\nValor inválido para depósito!", Colors.reset);
            return;
        }
         // this._saldo += valor;
        this.saldo = this.saldo + valor;//this.saldo no lado direito → chama o getter - this.saldo no lado esquerdo → chama o setter
        //A soma acontece fora dos métodos getter e setter, o saldo é atualizado com segurança
        console.log(`✅ Depósito de R$ ${valor} realizado com sucesso.`);
    }

    public sacar(valor: number): boolean {
        if (valor <= 0) {// Se o valor de saque for menor ou igual a 0, exibe a mensagem "Valor inválido para saque!" retorna false
            console.log(Colors.fg.red, "\nValor inválido para saque!", Colors.reset);
            return false;
        }

        if (valor > this._saldo) {// Acessa o método get saldo, verifica o saldo e faz a validação

            console.log(Colors.fg.red, "\nSaldo insuficiente!", Colors.reset);// Se o valor de saque for menor que o saldo existente, 
            // exibe a mesagem "Saldo insuficiente!" e retorna false mantendo o saldo atual.
            return false;
        }
         //this._saldo -= valor;
        this.saldo = this.saldo - valor;//this.saldo no lado direito → chama o getter - this.saldo no lado esquerdo → chama o setter
          //A subtração acontece fora dos métodos getter e setter, o saldo é atualizado com segurança
        console.log(`✅ Saque de R$ ${valor} realizado com sucesso.`);
        return true;// Se o valor de saque for menor ou igual ao saldo disponível subtrai o valor de saque do saldo e retorna true
    }

    public visualizar(/*parâmetro vazio*/): void {
        let tipo: string;
        switch (this._tipo) {//Acessa o método get tipo acessa o tipo e faz a validação
            case 1:// Caso o tipo seja igual 1, o tipo de conta vai ser conta corrente
                tipo = "Conta Corrente";
                break;//Para o código
            case 2:
                tipo = "Conta Poupança";// Caso o tipo seja igual 2, o tipo de conta vai ser conta poupança
                break;//Para o código
            default:
                tipo = "Inválido";
        }

        console.log("\n===============================");
        console.log("\nDados da Conta:");
        console.log("===============================\n");
        console.log(`Número da Conta: ${this._numero}`);//Acessa o método get numero, acessa o numero da conta e exibe no painel
        console.log(`Número da Agência: ${this._agencia}`);//Acessa o método get agencia, acessa o numero da agência exibe no painel
        console.log(`Nome do Titular: ${this._titular}`);//Acessa o método get titular, acessa o nome do titular e exibe no painel
        console.log(`Tipo de Conta: ${tipo}`);//Acessa o método get tipo, acessa o tipo de conta (Corrente, poupança..) e exibe no painel
        console.log(`Saldo da conta: R$ ${formatarMoeda(this._saldo)}`)// //Acessa o método get saldo, acessa o saldo e exibe no painel
    }
}