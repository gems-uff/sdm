
private var BUG_VALUE : int = 1000;

private var playerObj : GameObject;
private var jogador : PlayerStats;
private var project : Project;
private var isPago : boolean = false;

function PagarJogadorMensal(){
	var isComplete : boolean;
	isComplete = project.GetIscomplete();
	if ( Time.timeSinceLevelLoad  != 0)
	{
		if (isComplete == false)
		{
			if ((Time.timeSinceLevelLoad % 28) == 0 )
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
	pagamentofinal = pagamentofinal * (parseInt(project.GetSincronismo()) / 100);	//reduz de acordo com o sincronismo
	pagamentofinal = pagamentofinal - (parseInt(project.GetNumBugs()) * BUG_VALUE);		//reduz de acordo com o numero de bugs
	return pagamentofinal;
}
//--------------------------------------------Awake-----------------------------------------------------------

function Awake () {
	project = GetComponentInChildren(Project);
	playerObj = GameObject.Find("PlayerStats");
	jogador = playerObj.GetComponent(PlayerStats);
}

//--------------------------------------------Update-----------------------------------------------------------

function FixedUpdate(){
	PagarJogadorMensal();
	PagarJogadorConclusao();
}
