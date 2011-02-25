

public var customGuiStyle : GUIStyle;
private var project : Project;
private var playerObj : GameObject;
private var pgjog : Pagamentos;
private var timerObj : GameObject;
private var timer : GameTime;
public var msgFalha : String;
private var closeDialog : boolean = false;

//Funcoes Get/Set para serem utilizadas caso seja possivel aceitar outro projeto apois a conclusao do corrente. O set "reseta" este script
function GetCloseDialog(){
	return closeDialog;
}

function SetCloseDialog(){
	closeDialog = false;
}

msgFalha = "\n Fim do Prazo \n\n Nos nao conseguimos terminar a tempo e perdemos o contrato !";
//--------------------------------------------FimdeProjeto-----------------------------------------------------------

//Funcao que exibe o resultado de conclusao do projeto
function ProjetoTermina()	{
	if(!closeDialog)
	{
		GUI.BeginGroup(Rect (350,125,400,375));
		if(timer.GetGameTime() > project.GetDeadlineHours())		//Tela que Deadline Expiro
		{
			timer.PauseGame();
			GUI.Box (Rect (0,0,300,350), msgFalha, customGuiStyle);
			project.SetIscomplete(true);
			if (GUI.Button (Rect (0,350,300,25), "Close Window")) 
			{
				closeDialog = true;
				timer.SpeedNormal();
			}
		}
		if(project.GetNumLinesDone() >= 100)							//Tela que projeto foi concluido a tempo
		{
			timer.PauseGame();
			project.SetIscomplete(true);
			GUI.Box (Rect (0,0,300,350), 
			"\n Concluimos o projeto requisitado e ja podemos entreguar ao cliente \n\n" +
			"Segue abaixo os dados do projeto entregue: \n" +
			"Sincronismo: " + parseInt(project.GetSincronismo()).ToString() + " %" +
			"\n # Bugs encontrados: " + parseInt(project.GetNumBugs()).ToString() +
			"\n Dinheiro recebido: " + pgjog.CalculaPagamentoFinal()
			, customGuiStyle);
			if (GUI.Button (Rect (0,350,300,25), "Close Window")) 
			{
				closeDialog = true;
				timer.SpeedNormal();
			}
		}
		GUI.EndGroup ();
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
	ProjetoTermina();
}