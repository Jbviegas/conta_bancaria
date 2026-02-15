import { formatarMoeda } from '../util/Currency';
import { Conta } from './Conta';

export class ContaPoupanca extends Conta {//Isso significa: ContaCorrente é uma Conta e pode ser usada onde o tipo Conta é esperado
	// Exemplo: cadastrar(conta: Conta) Pode receber:contas.cadastrar(new ContaCorrente(1, 5698, "João", 2, 15000, 15)); ➡️ Isso é polimorfismo


	// Atributos específicos de Conta Poupança
	private _aniversario: number//private significa que esses atributos só podem ser acessados dentro da própria classe Conta 

	// Construtor com a chamada para a Super Classe
	constructor
		//Atributos 
		(numero: number, agencia: number, titular: string, tipo: number, saldo: number, aniversario: number,) {
		// numero → valor recebido como parâmetro no construtor - esse valor será setado no Menu quando formos criar conta
		super(numero, agencia, titular, tipo, saldo); // Chama o Construtor da Super Classe(Conta)
		// Inicializa: número, agência, titular, tipo, saldo
		this._aniversario = aniversario;//Depois define o atributo específico: _aniversario - Polimorfismo
	}

	// Métodos GET e SET específicos da Classe Conta Poupanca
	public get aniversario(): number {// É acessado pelo método auxiliar visualizar para exibir os dados da conta
		return this._aniversario
	}

	public set aniversario(value: number) {
		this._aniversario = value
	}

	// Método visualizar sobrescrito (Polimorfismo)
	public visualizar(): void {
		super.visualizar()//Pega o método visualizar de Conta para exibir os dados da conta
		console.log(`Limite da conta: R$ ${formatarMoeda(this._aniversario)}`)
		//this.aniversario acessa o método get aniversario para exibir o aniversario da conta
	}
}