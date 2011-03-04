

public var project : Project;
public var pgjog : Pagamentos;
public var timer : GameTime;
public var contractWindow : ContractWindow;
public var msgFalha : String;
public var customGuiStyle : GUIStyle;
private var windowRect : Rect = Rect (700,125,300,395);

msgFalha = "\n Fim do Prazo \n\n Nos nao conseguimos terminar a tempo e perdemos o contrato !";
//--------------------------------------------FimdeProjeto-----------------------------------------------------------

//Funcao que exibe o resultado de conclusao do projeto
function WindowFunction(windowID : int){
	if(project.GetFractionDone() >= 100)							//Tela que projeto foi concluido a tempo
	{
		timer.PauseGame();
		GUI.Box (Rect (02,018,296,350), 
		"\n Concluimos o projeto requisitado e ja podemos entreguar ao cliente \n\n" +
		"Segue abaixo os dados do projeto entregue: \n" +
		"Sincronismo: " + parseInt(project.GetSincronismo()).ToString() + " %" +
		"\n # Bugs encontrados: " + parseInt(project.GetNumBugs()).ToString() +
		"\n Dinheiro recebido: " + pgjog.CalculaPagamentoFinal(), customGuiStyle);
		if (GUI.Button (Rect (02,368,296,25), "Close Window")) 
		{
			project.SetIscomplete(false);
			contractWindow.SetShowWindow();
		}
	}
	else
	{
		timer.PauseGame();
		GUI.Box (Rect (02,018,296,350), msgFalha, customGuiStyle);
		if (GUI.Button (Rect (02,368,296,25), "Close Window")) 
		{
			project.SetIscomplete(false);
			contractWindow.SetShowWindow();
		}
	}
}

//--------------------------------------------Awake-----------------------------------------------------------

function Awake () {

}

//--------------------------------------------OnGUI-----------------------------------------------------------

//Funcao da unity para a GUI
function OnGUI (){
	//Conclusão de projeto
	if(project.GetIscomplete())
	{
		windowRect = GUI.Window (3, windowRect, WindowFunction, "Project Results");
	}
}