


private var funcObj : GameObject;
private var func : Funcionario;
private var projectObj : GameObject;
private var project : Project;
private var playerObj : GameObject;
private var jogador : PlayerStats;

function PagarFuncionarioMensal(){
	if ( Time.timeSinceLevelLoad  != 0)
		if ((Time.timeSinceLevelLoad % 2) == 0 )
			jogador.ChangeSaldo(- func.GetSalario());
}

function PagarFuncionarioTreinamento(preco : int){
	jogador.ChangeSaldo(- preco);
}
//--------------------------------------------Awake-----------------------------------------------------------

function Awake () {
	func = GetComponentInChildren(Funcionario);
	projectObj = GameObject.Find("Project");
	project = projectObj.GetComponent(Project);
	playerObj = GameObject.Find("PlayerStats");
	jogador = playerObj.GetComponent(PlayerStats);
}

//--------------------------------------------Update-----------------------------------------------------------

function FixedUpdate(){
	PagarFuncionarioMensal();
}
