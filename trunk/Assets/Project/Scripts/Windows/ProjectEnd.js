

public var customGuiStyle : GUIStyle;
private var project : Project;
private var playerObj : GameObject;
private var pgjog : Pagamentos;
private var timerObj : GameObject;
private var timer : GameTime;
public var msgFalha : String;
private var windowRect : Rect = Rect (700,125,300,395);
private var closeDialog : boolean = false;

//Funcoes Get/Set para serem utilizadas caso seja possivel aceitar outro projeto apois a conclusao do corrente. O set "reseta" este script
function GetCloseDialog(){
	return closeDialog;
}

function SetCloseDialog(){
	closeDialog = true;
}

msgFalha = "\n Fim do Prazo \n\n Nos nao conseguimos terminar a tempo e perdemos o contrato !";
//--------------------------------------------FimdeProjeto-----------------------------------------------------------

//Funcao que exibe o resultado de conclusao do projeto
function WindowFunction(windowID : int){
	if(timer.GetGameTime() > project.GetDeadlineDays())		//Tela que Deadline Expiro
	{
		timer.PauseGame();
		GUI.Box (Rect (02,018,296,350), msgFalha, customGuiStyle);
		project.SetIscomplete(true);
		if (GUI.Button (Rect (02,368,296,25), "Close Window")) 
		{
			closeDialog = true;
			//timer.SpeedNormal();
		}
	}
	if(project.GetNumLinesDone() >= 100)							//Tela que projeto foi concluido a tempo
	{
		timer.PauseGame();
		project.SetIscomplete(true);
		GUI.Box (Rect (02,018,296,350), 
		"\n Concluimos o projeto requisitado e ja podemos entreguar ao cliente \n\n" +
		"Segue abaixo os dados do projeto entregue: \n" +
		"Sincronismo: " + parseInt(project.GetSincronismo()).ToString() + " %" +
		"\n # Bugs encontrados: " + parseInt(project.GetNumBugs()).ToString() +
		"\n Dinheiro recebido: " + pgjog.CalculaPagamentoFinal()
		, customGuiStyle);
		if (GUI.Button (Rect (02,368,296,25), "Close Window")) 
		{
			closeDialog = false;
			//timer.SpeedNormal();
		}
	}
}

//--------------------------------------------Awake-----------------------------------------------------------

function Awake () {
	playerObj = GameObject.Find("PlayerStats");
	pgjog = playerObj.GetComponent(Pagamentos);
	project = GetComponentInChildren(Project);
	timerObj = GameObject.Find("Timer");
	timer = timerObj.GetComponent(GameTime);
}

//--------------------------------------------OnGUI-----------------------------------------------------------

//Funcao da unity para a GUI
function OnGUI (){
	//Conclusão de projeto
	if(closeDialog)
		windowRect = GUI.Window (3, windowRect, WindowFunction, "Project Results");
}