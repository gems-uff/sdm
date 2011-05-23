

public var project : Project;
public var pgjog : Pagamentos;
public var timer : GameTime;
public var contractWindow : ContractWindow;
public var msgFalha : String;
public var customGuiStyle : GUIStyle;
private var windowRect : Rect = Rect (700,125,300,395);

msgFalha = "\n Time's over \n\n We didn't finish the software in time.";
//--------------------------------------------FimdeProjeto-----------------------------------------------------------

//Funcao que exibe o resultado de conclusao do projeto
function WindowFunction(windowID : int){
	var aux : float;
	if(project.GetFractionDone() >= 100)							//Tela que projeto foi concluido a tempo
	{
		timer.PauseGame();
		GUI.Box (Rect (02,018,296,350), 
		"\n We conclude the requested project and we've delivered to the customer \n\n" +
		"Below is the project's data: \n" +
		"\n Complexity: " + project.GetProjectSizeString() +
		"\n Quality: " + project.GetProjectQuality() +
		"\n Required Code: " + project.GetLinguagem() + 
		"\n Completed: " + project.GetFractionDone() + " %" +
		"\n Validation: " + parseInt(project.GetSincronismo()).ToString() + " %" +
		"\n # Bugs not fixed: " + parseInt(project.GetNumBugs()).ToString() +
		"\n Bug Value: $" + project.GetBugValue() +
		"\n Payment: " + pgjog.GetPagamentoFinal() +
		"\n Validation Adjustment: " + pgjog.GetValidadionAdjustment() +
		"\n Penalty for Bugs: " + pgjog.GetBugPenalty() +
		"\n Final payment: " + pgjog.CalculaPagamentoFinal(), customGuiStyle);
		if (GUI.Button (Rect (02,368,296,25), "Close Window")) 
		{
			pgjog.PagarJogadorConclusao();
			project.ResetProject();
			contractWindow.SetShowWindow();
			aux = pgjog.CalculaPagamentoFinal() / pgjog.GetPagamentoFinal();
			BroadcastMessage("IncreaseMoraleFinishedProject", aux);
		}
	}
	else
	{
		timer.PauseGame();
		GUI.Box (Rect (02,018,296,350), 
		"\n Time's over \n\n We didn't finish the software in time. \n\n" +
		"Below is the project's data: \n" +
		"\n Required Code: " + project.GetLinguagem() + 
		"\n Completed: " + project.GetFractionDone() + " %" +
		"\n Validation: " + parseInt(project.GetSincronismo()).ToString() + " %" +
		"\n # Bugs not fixed: " + parseInt(project.GetNumBugs()).ToString() +
		"\n Final payment: $0 ", customGuiStyle);
		if (GUI.Button (Rect (02,368,296,25), "Close Window")) 
		{
			project.ResetProject();
			contractWindow.SetShowWindow();
			BroadcastMessage("DecreaseMoraleFailProject");
		}
	}
}

//--------------------------------------------OnGUI-----------------------------------------------------------

//Funcao da unity para a GUI
function OnGUI (){
	//Conclusão de projeto
	if(project.GetIscomplete())
		windowRect = GUI.Window (3, windowRect, WindowFunction, "Project Results");
}