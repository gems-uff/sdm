public var gameStyle : GameplayStyle;
public var jogador : PlayerStats;
public var project : Project;
public var equipe : Equipe;
public var pgjog : Pagamentos;
public var timer : GameTime;
public var windowController : WindowController;
//public var contractWindow : ContractWindow;
public var customGuiStyle : GUIStyle;
private var windowRect : Rect = Rect (700,125,300,395);
private var enableOptionEnd : boolean = false;
private var locked : boolean = false;

private var aux_projectsize : int = 1;

//--------------------------------------------FimdeProjeto-----------------------------------------------------------
function Unlock()
{
	locked = false;
}

function EndProjectQuestion()
{
	if(!locked)
	{
		if(timer.GetGameTime() < project.GetDeadline())	//Se não chegou no deadline
		{
			if(project.GetFractionDone() >= 100)	//Se ja terminou a codificação
			{
				enableOptionEnd = true;
			}
		}
		else
		{
			enableOptionEnd = false;
			project.SetIscomplete(true);
			locked = true;
		}
	}
}

function ShowEndOption()
{
	if(enableOptionEnd)
	{
		if (GUI.Button (Rect (00,500,120,50), "Deliver Product")) 
		{
			locked = true;
			project.SetIscomplete(true);
			enableOptionEnd = false;
		}
	}
}
//Funcao que exibe o resultado de conclusao do projeto
function WindowFunction(windowID : int){
	var aux : float;
	var experience : int = 0;
	aux_projectsize = 1;
	if(project.GetProjectSizeString() == "Regular")
				aux_projectsize = 2;
			else
				if(project.GetProjectSizeString() == "Complex")
					aux_projectsize = 3;
				else
					if(project.GetProjectSizeString() == "Insane")
						aux_projectsize = 4;	
	if(project.GetFractionDone() >= 100)							//Tela que projeto foi concluido a tempo
	{
		var auxBugs : int;
		auxBugs = parseInt(project.GetTotalBugsNotFixed());
		timer.PauseGame();
		GUI.Box (Rect (02,018,296,350), 
		"\n We conclude the requested project and we've delivered to the customer \n\n" +
		"Below is the project's data: \n" +
		"\n Complexity: " + project.GetProjectSizeString() +
		"\n Quality: " + project.GetProjectQuality() +
		"\n Required Code: " + project.GetLinguagem() + 
		"\n Completed: " + project.GetFractionDone() + " %" +
		"\n Validation: " + parseInt(project.GetSincronismo()).ToString() + " %" +
		"\n # Bugs not fixed: " + auxBugs.ToString() +
		"\n Bug Value: $" + project.GetBugValue() +
		"\n Payment: " + pgjog.GetPagamentoFinal() +
		"\n Validation Adjustment: " + pgjog.GetValidadionAdjustment() +
		"\n Penalty for Bugs: " + pgjog.GetBugPenalty(auxBugs) +
		"\n Final payment: " + pgjog.CalculaPagamentoFinal() + 
		"\n Earned Company Experience: " + (aux_projectsize * parseInt(project.GetSincronismo()) - 5 * auxBugs), customGuiStyle);
		if (GUI.Button (Rect (02,368,296,25), "Close Window")) 
		{
			pgjog.PagarJogadorConclusao();
			windowController.ShowContractWindow();
			aux = pgjog.CalculaPagamentoFinal() / pgjog.GetPagamentoFinal();
			BroadcastMessage("IncreaseMoraleFinishedProject", aux);
			BroadcastMessage("SetExperienceDaysModifier", (timer.GetGameTime() - project.GetStartDay()));
			BroadcastMessage("IncreaseExp", aux_projectsize);
			jogador.ChangeCompleted();
			jogador.CompanyIncreaseExp(aux_projectsize, parseInt(project.GetSincronismo()), parseInt(project.GetNumBugs()));
			project.ResetProject();
			equipe.influences.StartNew();
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
		"\n Final payment: $0 " + 
		"\n Earned Company Experience: " + (-aux_projectsize * parseInt(project.GetSincronismo())), customGuiStyle);
		
		if (GUI.Button (Rect (02,368,296,25), "Close Window")) 
		{
			project.ResetProject();
			equipe.influences.StartNew();
			windowController.ShowContractWindow();
			BroadcastMessage("DecreaseMoraleFailProject");
			BroadcastMessage("SetExperienceDaysModifier", (timer.GetGameTime() - project.GetStartDay()));
			BroadcastMessage("IncreaseExp", (aux_projectsize / 10));
			jogador.ChangeFailed();
			jogador.CompanyIncreaseExp(-aux_projectsize, 150, 0);
		}
		
	}
	GUI.DragWindow();
}

//--------------------------------------------OnGUI-----------------------------------------------------------
function Update()
{
	EndProjectQuestion();
}
//Funcao da unity para a GUI
function OnGUI (){
	//Conclusão de projeto
	ShowEndOption();
	if(project.GetIscomplete())
		windowRect = GUI.Window (3, windowRect, WindowFunction, "Project Results");
}