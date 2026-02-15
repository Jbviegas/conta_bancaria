import { Conta } from "./Conta";
import { Colors } from "../util/Colors";
import { formatarMoeda } from "../util/Currency";

export class ContaCorrente extends Conta {//Isso significa: ContaCorrente é uma Conta e pode ser usada onde o tipo Conta é esperado
    // Exemplo: cadastrar(conta: Conta) Pode receber:contas.cadastrar(new ContaCorrente(1, 5698, "João", 2, 15000, 15)); ➡️ Isso é polimorfismo

    // Atributos expecificos de ContaCorrente
    private _limite: number;//private significa que esses atributos só podem ser acessados dentro da própria classe Conta 


    constructor
        //Atributos 
        (numero: number, agencia: number, titular: string, tipo: number, saldo: number, limite: number) {
        // numero → valor recebido como parâmetro no construtor - esse valor será setado no Menu quando formos criar conta

        super(numero, agencia, titular, tipo, saldo,)//super(...) → chama o construtor da classe Conta
        // Inicializa: número, agência, titular, tipo, saldo
        this._limite = limite; //Depois define o atributo específico: _limite - Polimorfismo
    }


    //Métodos Get e Set específicos da Classe Conta Corrente

    public get limite(/*parâmetro*/): number {// É acessado pelo método auxiliar visualizar para exibir os dados da conta
        return this._limite;
    }

    public set limite(/*parâmetro*/value: number) {
        this._limite = value;
    }

    //Método Sacar Conta Corrente
    public sacar(valor: number): boolean {//A classe ContaCorrente tem seu próprio método de saque(Polimorfismo) por causa do limite 
        if (valor <= 0) {// Se o valor de saque for menor ou igual a 0, exibe a mensagem "Valor inválido para saque!" retorna false
            console.log(Colors.fg.red, "\nValor inválido para saque!", Colors.reset);
            return false;
        }

        if (valor > this.saldo + this._limite) {
            // Acessa o método get saldo + get limit, verifica se o valor de saque é maior que saldo + limite da conta
            console.log(Colors.fg.red, "\nSaldo insuficiente!", Colors.reset);// Se for exibe a mensagem "Saldo insuficiente!"
            return false;// Retona false
        }
        //this._saldo -= valor;
        this.saldo = this.saldo - valor;//this.saldo no lado direito → chama o getter - this.saldo no lado esquerdo → chama o setter
        //A subtração acontece fora dos métodos getter e setter, o saldo é atualizado com segurança
        console.log(`✅ Saque de R$ ${valor} realizado com sucesso.`);
        return true;// Se o valor de saque for menor ou igual ao saldo disponível subtrai o valor de saque do saldo e retorna true
    }

    //Método visualizar sobrescrito(Polimorfismo)
    public visualizar(): void {
        super.visualizar();//Pega o método visualizar de Conta para exibir os dados da conta
       console.log(`Limite da conta: R$ ${formatarMoeda(this._limite)}`)//this.limite acessa o método get limit para exibir o limite da conta
    }

}

