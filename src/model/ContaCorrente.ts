import { Conta } from "./Conta";
import { Colors } from "../util/Colors"; 

export class ContaCorrente extends Conta {//Isso significa: ContaCorrente é uma Conta e pode ser usada onde o tipo Conta é esperado
// Exemplo: cadastrar(conta: Conta) Pode receber: new ContaCorrente(...) ➡️ Isso é polimorfismo

    // Atributos expecificos da conta corrente
    private _limite: number;


    constructor
    //Atributos 
        (numero: number, agencia: number, titular: string, tipo: number, saldo: number, limite: number) {
        // numero → valor recebido como parâmetro no construtor - esse valor será setado no Menu quando formos criar conta

        super(numero, agencia,titular, tipo,saldo,)//super(...) → chama o construtor da classe Conta
        // Inicializa: número, agência, titular, tipo, saldo
        this._limite = limite; //Depois define o atributo específico: _limite - Polimorfismo
    }


    //Métodos Get e Set específicos da Classe Conta Corrente

	public get limite(/*parâmetro*/): number {
		return this._limite;
	}

	public set limite(/*parâmetro*/value: number) {
		this._limite = value;
	}

    //Método Sacar Conta Corrente
     public sacar(valor: number): boolean {
            if (valor <= 0) {
                console.log(Colors.fg.red, "\nValor inválido para saque!", Colors.reset);
                return false;
            }
    
            if (valor > this.saldo + this._limite) {
    
                console.log(Colors.fg.red, "\nSaldo insuficiente!", Colors.reset);
                return false;
            }
            this.saldo -= valor;
            return true;
        }

    //Método visualizar sobrescrito(Polimorfismo)
    public visualizar(): void {
        super.visualizar();//Pegou de COnta
        console.log(`Limite da conta: ${this.limite.toFixed(2)}`);
    }

}

