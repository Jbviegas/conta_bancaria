import { Conta } from "../model/Conta";
import { ContaRepository } from "../repository/ContaRepository";
import { Colors } from "../util/Colors";

export class ContaController implements ContaRepository{
    
    private listaContas = new Array<Conta>();//é um array de contas

    public numero: number = 0;

    // Métodos de contrução do CRUD


    procurarPorNumero(numero: number): void {
        const buscaConta = this.buscarNoArray(numero);

        if(buscaConta !== null)
            buscaConta.visualizar();
        else
            console.log(Colors.fg.red, "\nConta não Encontrada!", Colors.reset);

    }
    
    listarTodas(): void {
        for (let conta of this.listaContas){
            conta.visualizar();
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

    atualizar(conta: Conta): void {
        const buscaConta = this.buscarNoArray(conta.numero);

        if(buscaConta !== null){
            this.listaContas[this.listaContas.indexOf(buscaConta)] = conta;
            console.log(Colors.fg.green, 
                `\nA Conta número ${conta.numero} foi Atualizada com Sucesso!`, Colors.reset);
        }else
            console.log(Colors.fg.red, "\nConta não Encontrada!", Colors.reset);
    }

    deletar(numero: number): void {
        const buscaConta = this.buscarNoArray(numero);

        if(buscaConta !== null){
            this.listaContas.splice(this.listaContas.indexOf(buscaConta), 1);
            console.log(Colors.fg.green, 
                `\nA Conta número ${numero} foi Deletada com Sucesso!`, Colors.reset);
        }else
            console.log(Colors.fg.red, "\nConta não Encontrada!", Colors.reset);
    }

    // Métodos Bancários
    sacar(numero: number, valor: number): void {
        throw new Error("Method not implemented.");
    }

    depositar(numero: number, valor: number): void {
        throw new Error("Method not implemented.");
    }

    transferir(numeroOrigem: number, numeroDestino: number, valor: number): void {
        throw new Error("Method not implemented.");
    }

    // Métodos Auxiliares
    
    public gerarNumero(): number{
        return ++ this.numero;
    }

    public buscarNoArray(numero: number): Conta | null {
        for (let conta of this.listaContas){
            if (conta.numero === numero)
                return conta
        }

        return null;
    }
}