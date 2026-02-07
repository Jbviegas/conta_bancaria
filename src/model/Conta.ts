import { Colors } from "../util/Colors";
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

    public get saldo(): number {
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
        if (valor <= 0) {
            console.log(Colors.fg.red, "\nValor inválido para depósito!", Colors.reset);
            return;
        }
        this._saldo += valor;
    }

    public sacar(valor: number): boolean {
        if (valor <= 0) {
            console.log(Colors.fg.red, "\nValor inválido para saque!", Colors.reset);
            return false;
        }

        if (valor > this._saldo) {

            console.log(Colors.fg.red, "\nSaldo insuficiente!", Colors.reset);
            return false;
        }
        this._saldo -= valor;
        return true;
    }

    public visualizar(/*parâmetro vazio*/): void {
        let tipo: string;
        switch (this._tipo) {
            case 1:
                tipo = "Conta Corrente";
                break;
            case 2:
                tipo = "Conta Poupança";
                break;
            default:
                tipo = "Inválido";
        }

        console.log("\n===============================");
        console.log("\nDados da Conta:");
        console.log("===============================\n");
        console.log(`Número da Conta: ${this._numero}`);
        console.log(`Número da Agência: ${this._agencia}`);
        console.log(`Nome do Titular: ${this._titular}`);
        console.log(`Tipo de Conta: ${tipo}`);
        console.log(`Saldo da Conta: R$ ${this._saldo.toFixed(2)}\n`);
    }
}