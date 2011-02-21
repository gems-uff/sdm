
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
	var pagamentofinal : int;
	isComplete = project.GetIscomplete();
	if (isComplete == true)
	{
		if (isPago == false)
		{
			pagamentofinal = project.GetPagamento();
			pagamentofinal = pagamentofinal * 4;
			pagamentofinal = pagamentofinal * (project.GetSincronismo() / 100);	//reduz de acordo com o sincronismo
			pagamentofinal = pagamentofinal - (project.GetNumBugs() * BUG_VALUE);		//reduz de acordo com o numero de bugs
			jogador.ChangeSaldo(pagamentofinal);
			isPago = true;
		}
	}
	else
		isPago = false;
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
