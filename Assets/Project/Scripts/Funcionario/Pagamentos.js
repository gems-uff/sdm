//Para usar este script:
//private var playerObj : GameObject;
//private var pagar : Pagamentos;
//playerObj = GameObject.Find("PlayerStats");
//pagar = playerObj.GetComponent(Pagamentos);

public var DIAS_PAGAMENTO : int = 28;
private var BUG_VALUE : int = 1000;
private var isPago : boolean = false;

private var func1Obj : GameObject;
private var func2Obj : GameObject;
private var func3Obj : GameObject;
private var func4Obj : GameObject;
private var func5Obj : GameObject;
private var func6Obj : GameObject;
private var func7Obj : GameObject;
private var func8Obj : GameObject;
private var menuObj : GameObject;
private var projectObj : GameObject;
private var playerObj : GameObject;
private var timerObj : GameObject;

private var func1 : Funcionario;
private var func2 : Funcionario;
private var func3 : Funcionario;
private var func4 : Funcionario;
private var func5 : Funcionario;
private var func6 : Funcionario;
private var func7 : Funcionario;
private var func8 : Funcionario;
private var project : Project;
private var jogador : PlayerStats;
private var timer : GameTime;


//--------------------------------------------PagamentoDoFuncionario-----------------------------------------------------------

function PagarFuncionario(){
	jogador.ChangeSaldo(- func1.GetSalario() / DIAS_PAGAMENTO);
	jogador.ChangeSaldo(- func2.GetSalario() / DIAS_PAGAMENTO);
	jogador.ChangeSaldo(- func3.GetSalario() / DIAS_PAGAMENTO);
	jogador.ChangeSaldo(- func4.GetSalario() / DIAS_PAGAMENTO);
	jogador.ChangeSaldo(- func5.GetSalario() / DIAS_PAGAMENTO);
	jogador.ChangeSaldo(- func6.GetSalario() / DIAS_PAGAMENTO);
	jogador.ChangeSaldo(- func7.GetSalario() / DIAS_PAGAMENTO);
	jogador.ChangeSaldo(- func8.GetSalario() / DIAS_PAGAMENTO);
}

function PagarFuncionarioTreinamento(preco : int){
	jogador.ChangeSaldo(- preco);
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
	pagamentofinal = pagamentofinal * 4;
	pagamentofinal = pagamentofinal * (project.GetSincronismo() / 100);	//reduz de acordo com o sincronismo
	pagamentofinal = pagamentofinal - (parseInt(project.GetNumBugs()) * BUG_VALUE);		//reduz de acordo com o numero de bugs
	
	return pagamentofinal;
}

//--------------------------------------------Awake-----------------------------------------------------------

function Awake () {
	func1Obj = GameObject.Find("Funcionario1");
	func1 = func1Obj.GetComponent(Funcionario);
	func2Obj = GameObject.Find("Funcionario2");
	func2 = func2Obj.GetComponent(Funcionario);
	func3Obj = GameObject.Find("Funcionario3");
	func3 = func3Obj.GetComponent(Funcionario);
	func4Obj = GameObject.Find("Funcionario4");
	func4 = func4Obj.GetComponent(Funcionario);
	func5Obj = GameObject.Find("Funcionario5");
	func5 = func5Obj.GetComponent(Funcionario);
	func6Obj = GameObject.Find("Funcionario6");
	func6 = func6Obj.GetComponent(Funcionario);
	func7Obj = GameObject.Find("Funcionario7");
	func7 = func7Obj.GetComponent(Funcionario);
	func8Obj = GameObject.Find("Funcionario8");
	func8 = func8Obj.GetComponent(Funcionario);
	projectObj = GameObject.Find("Project");
	project = projectObj.GetComponent(Project);
	playerObj = GameObject.Find("PlayerStats");
	jogador = playerObj.GetComponent(PlayerStats);
	timerObj = GameObject.Find("Timer");
	timer = timerObj.GetComponent(GameTime);
}
