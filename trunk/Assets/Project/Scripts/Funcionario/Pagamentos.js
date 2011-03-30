//Para usar este script:
//private var playerObj : GameObject;
//private var pagar : Pagamentos;
//playerObj = GameObject.Find("PlayerStats");
//pagar = playerObj.GetComponent(Pagamentos);

public var DIAS_PAGAMENTO : int = 28;
public var PROJECT_MULT : int = 2;
private var isPago : boolean = false;

public var func1 : Funcionario;
public var func2 : Funcionario;
public var func3 : Funcionario;
public var func4 : Funcionario;
public var func5 : Funcionario;
public var func6 : Funcionario;
public var func7 : Funcionario;
public var func8 : Funcionario;
public var project : Project;
public var jogador : PlayerStats;
public var timer : GameTime;
private var morale : MoraleControl;


//--------------------------------------------PagamentoDoFuncionario-----------------------------------------------------------

function PagarFuncionario(){
	VerificaSaldo(func1);
	VerificaSaldo(func2);
	VerificaSaldo(func3);
	VerificaSaldo(func4);
	VerificaSaldo(func5);
	VerificaSaldo(func6);
	VerificaSaldo(func7);
	VerificaSaldo(func8);
}

function PagarFuncionarioTreinamento(preco : int){
	jogador.ChangeSaldo(- preco);
}

//--------------------------------------------VerificaSaldo-----------------------------------------------------------

function VerificaSaldo(func : Funcionario){
	var saldo : int;
	var salario : int;
	saldo = jogador.GetSaldo();
	salario = func.GetSalario() / DIAS_PAGAMENTO;
	if (saldo < salario)
	{
		morale = func.GetComponentInChildren(MoraleControl);
		morale.DecreaseMoralePayment(func);
	}
	else
		jogador.ChangeSaldo(- salario);
}
//--------------------------------------------PagamentoDoProjeto-----------------------------------------------------------

function PagarJogadorMensal(){
	var isComplete : boolean;
	isComplete = project.GetIscomplete();
	if ( timer.GetGameTime()  != 0)
	{
		if (isComplete == false)
		{
			if ((timer.GetGameTime() % 28) == 1 )
			{
				ProjetoPagarMensal();
			}
		}
	}
}
function ProjetoPagarMensal(){
	var aux : int = 0;
	var auxTime : int = 0;
	aux = project.GetProjectSize() / project.GetDeadlineDays();		//Producao por dia planejada
	aux = aux * 28;																	//Producao por mes
	aux = aux * 100 / project.GetProjectSize();								//Percentagem completada por mes planejada
	auxTime = timer.GetGameTime() - project.GetStartDay();			//Quanto tempo desde que o projeto iniciou
	auxTime = auxTime / 28;														//Quantos meses se passaram desde que iniciou
	aux = aux * auxTime;															//Multiplica a producao planejada por mes pela quantidade de meses que ja passou
	
	if (aux <= (10 + project.GetFractionDone()))
	{
		jogador.ChangeSaldo(project.GetPagamento());
	}
}
function PagarJogadorConclusao(){
	jogador.ChangeSaldo(CalculaPagamentoFinal());
}

function CalculaPagamentoFinal(){
	var pagamentofinal : int;
	pagamentofinal = project.GetPagamento();
	pagamentofinal = pagamentofinal * PROJECT_MULT;
	pagamentofinal = pagamentofinal * (parseInt(project.GetSincronismo()) / 100);	//reduz de acordo com o sincronismo
	pagamentofinal = pagamentofinal - (parseInt(project.GetNumBugs()) * project.GetBugValue());		//reduz de acordo com o numero de bugs
	
	return pagamentofinal;
}

//--------------------------------------------Awake-----------------------------------------------------------

function Awake () {

}
