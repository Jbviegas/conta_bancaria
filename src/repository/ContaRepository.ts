import { Conta } from "../model/Conta";


export interface ContaRepository {//Interface define o que deve existir, não como funciona.

    //Métodos do Crud(Create, Read, Update, Delete)

    //Isso NÃO tem código, só a regra do contrato
    procurarPorNumero(numero: number): void;
    listarTodas(): void;
    cadastrar(conta: Conta): void;/*Toda classe que implementar ContaRepository é obrigada a ter um método cadastrar que receba uma Conta e
     não retorne nada (void).” */
    atualizar(conta: Conta): void;
    deletar(numero: number): void;

    //Métodos Bancários
    sacar(numero: number, valor: number): void;
    depositar(numero: number, valor: number): void;
    transferir(numeroOrigem: number, numeroDestino: number, valor: number): void;
}