
public var gameStyle : GameplayStyle;
public var DIAS_PAGAMENTO : int = 28;
public var PROJECT_MULT : int = 3;
private var isPago : boolean = false;
private var diasFaltando : int = 28;

public var func1 : Funcionario;
public var func2 : Funcionario;
public var func3 : Funcionario;
public var func4 : Funcionario;
public var func5 : Funcionario;
public var func6 : Funcionario;
public var func7 : Funcionario;
public var func8 : Funcionario;
private var morale1 : MoraleControl;
private var morale2 : MoraleControl;
private var morale3 : MoraleControl;
private var morale4 : MoraleControl;
private var morale5 : MoraleControl;
private var morale6 : MoraleControl;
private var morale7 : MoraleControl;
private var morale8 : MoraleControl;

public var project : Project;
public var jogador : PlayerStats;
public var timer : GameTime;
public var dialog : NoPaymentDialog;

private var pagouTodos : boolean = true;
//--------------------------------------------PagamentoDoFuncionario-----------------------------------------------------------

function PagarFuncionario(){
	VerificaSaldo(func1, morale1);
	VerificaSaldo(func2, morale2);
	VerificaSaldo(func3, morale3);
	VerificaSaldo(func4, morale4);
	VerificaSaldo(func5, morale5);
	VerificaSaldo(func6, morale6);
	VerificaSaldo(func7, morale7);
	VerificaSaldo(func8, morale8);
}

function PagarFuncionarioTreinamento(preco : int){
	jogador.ChangeSaldo(- preco);
}

function VerificaSaldo(func : Funcionario, morale : MoraleControl){
	var saldo : int;
	var salario : int;
	saldo = jogador.GetSaldo();
	salario = func.GetSalario() / DIAS_PAGAMENTO;
	//Mon to Fri
	if((timer.GetGameTime() % 7 != 5) && (timer.GetGameTime() % 7 != 6))
	{
		PayEmployee(salario, saldo, morale);
	}
	else
	{
		//Satuday
		if( (timer.GetGameTime() % 7 == 5) && func.behavior.GetSaturday())
		{
			PayEmployee(salario * 1.25, saldo, morale);
		}
		else
		{
			//Sunday
			if((timer.GetGameTime() % 7 == 6) && func.behavior.GetSunday())
			{
				PayEmployee(salario * 1.25, saldo, morale);
			}
		}
	}
	/*
	if (saldo < salario)
	{
		morale.DecreaseMoralePayment();
		pagouTodos = false;
	}
	else
	{
		jogador.ChangeSaldo(- salario);
	}
	*/
}
function PayEmployee(salario : int, saldo : int, morale : MoraleControl)
{
	if (saldo < salario)
	{
		morale.DecreaseMoralePayment();
		pagouTodos = false;
	}
	else
	{
		jogador.ChangeSaldo(- salario);
	}
}
//--------------------------------------------PagamentoDoProjeto-----------------------------------------------------------

function ProjetoPagarMensal(){
	jogador.ChangeSaldo(project.GetPagamento());
	/*
	var neededMonths : int = 0;
	var monthPercent : float = 0.0;
	var auxTime : int = 0;
	var expected : float = 0.0;
	
	neededMonths = (project.GetDeadline() / 28);							//Qnts meses pro projeto
	monthPercent = 100 / neededMonths; 									//Qnts % por meses
	auxTime = timer.GetGameTime() - project.GetStartDay();			//Quanto tempo desde que o projeto iniciou
	auxTime = parseInt(auxTime / 28);														//Quantos meses se passaram desde que iniciou
	expected = monthPercent * auxTime;										//% concluido esperado
	
	if (expected <= (20 + project.GetFractionDone()))
	{
		jogador.ChangeSaldo(project.GetPagamento());
	}
	else
	{
		dialog.ActiveShowWindow();
	}
	*/
}

function PagarJogadorConclusao(){
	jogador.ChangeSaldo(CalculaPagamentoFinal());
}

function PagarJogadorMensal(){
	var isComplete : boolean;
	isComplete = project.GetIscomplete();
	diasFaltando--;
	if ( timer.GetGameTime()  > 2)
	{
		if (isComplete == false)
		{
			if ((timer.GetGameTime() % 28) == 1 )
			{
				ProjetoPagarMensal();
				diasFaltando = 28;
				if (pagouTodos)
				{
					morale1.IncreaseMoraleMonthly();
					morale2.IncreaseMoraleMonthly();
					morale3.IncreaseMoraleMonthly();
					morale4.IncreaseMoraleMonthly();
					morale5.IncreaseMoraleMonthly();
					morale6.IncreaseMoraleMonthly();
					morale7.IncreaseMoraleMonthly();
					morale8.IncreaseMoraleMonthly();
				}
				else
					pagouTodos = true;
			}
		}
	}
}

function CalculaPagamentoFinal(){
	var pagamentofinal : int;
	var auxBugs : int;
	if(gameStyle.IsMacro())
	{
		auxBugs = parseInt(project.GetTotalBugsNotFixed());
	}
	else
	{
		auxBugs = parseInt(project.GetNumBugs());
	}
	pagamentofinal = project.GetPagamento();
	pagamentofinal = pagamentofinal * PROJECT_MULT;
	pagamentofinal = pagamentofinal * (parseInt(project.GetSincronismo())) / 100;	//reduz de acordo com o sincronismo
	pagamentofinal = pagamentofinal - (auxBugs * project.GetBugValue());		//reduz de acordo com o numero de bugs
	
	return pagamentofinal;
}

function GetPagamentoFinal()
{
	var pagamentofinal : int;
	pagamentofinal = project.GetPagamento();
	pagamentofinal = pagamentofinal * PROJECT_MULT;
	return pagamentofinal;
}

function GetBugPenalty(auxBugs : int)
{
	return (parseInt(auxBugs) * project.GetBugValue());
}

function GetValidadionAdjustment()
{
	return PROJECT_MULT * project.GetPagamento()* (parseInt(project.GetSincronismo())) / 100;
}

function GetDiasFaltando()
{
	return diasFaltando;
}
function SetDiasFaltando(t : int)
{
	diasFaltando = t;
}
//--------------------------------------------Awake-----------------------------------------------------------

function Awake () {
	morale1 = func1.GetComponentInChildren(MoraleControl);
	morale2 = func2.GetComponentInChildren(MoraleControl);
	morale3 = func3.GetComponentInChildren(MoraleControl);
	morale4 = func4.GetComponentInChildren(MoraleControl);
	morale5 = func5.GetComponentInChildren(MoraleControl);
	morale6 = func6.GetComponentInChildren(MoraleControl);
	morale7 = func7.GetComponentInChildren(MoraleControl);
	morale8 = func8.GetComponentInChildren(MoraleControl);

}
