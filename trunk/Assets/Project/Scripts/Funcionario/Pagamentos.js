//Para usar este script:
//private var playerObj : GameObject;
//private var pagar : Pagamentos;
//playerObj = GameObject.Find("PlayerStats");
//pagar = playerObj.GetComponent(Pagamentos);

public var DIAS_PAGAMENTO : int = 28;
public var MORALE_MOD : int = 5.0;
public var PROJECT_MULT : int = 4;
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
	var morale : int;
	saldo = jogador.GetSaldo();
	salario = func.GetSalario() / DIAS_PAGAMENTO;
	if (saldo < salario)
	{
		saldo = 0;
		morale = func.GetMorale();
		morale = morale - MORALE_MOD;
		func.SetMorale(morale);
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
			if ((timer.GetGameTime() % 28) == 0 )
			{
				jogador.ChangeSaldo(project.GetPagamento());
			}
		}
	}
}

function PagarJogadorConclusao(){
	var isComplete : boolean;
	isComplete = project.GetIscomplete();
	if (isComplete == true)
	{
		if (project.GetNumLinesDone == 100)
		{
			if (isPago == false)
			{
				jogador.ChangeSaldo(CalculaPagamentoFinal());
				isPago = true;
			}
		}
	}
	else
		isPago = false;
}

function CalculaPagamentoFinal(){
	var pagamentofinal : int;
	pagamentofinal = project.GetPagamento();
	pagamentofinal = pagamentofinal * PROJECT_MULT;
	pagamentofinal = pagamentofinal * (project.GetSincronismo() / 100);	//reduz de acordo com o sincronismo
	pagamentofinal = pagamentofinal - (parseInt(project.GetNumBugs()) * project.GetBugValue());		//reduz de acordo com o numero de bugs
	
	return pagamentofinal;
}

//--------------------------------------------Awake-----------------------------------------------------------

function Awake () {

}
