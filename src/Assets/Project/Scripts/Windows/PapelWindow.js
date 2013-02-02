//Para usar este script:
//private var menuObj : GameObject;
//private var menuPapel : PapelWindow;
//menuObj = GameObject.Find("GUI");
//menuPapel = menuObj.GetComponent(PapelWindow);
//menuPapel.MudarPapel(func);
public var winCon : WindowController;
public var stringNames : StringNames;
public var timer : GameTime;
//public var managerSlot : Funcionario;
//public var marketingSlot : Funcionario;
public var equipe : Equipe;
public var playStyle : GameplayStyle;
private var newFunc : NewFuncionario;
private var fire : NewFuncionario;
private var func : Funcionario;
//private var windowRect : Rect = Rect (400,125,600,288);
//private var windowRect2 : Rect = Rect (400,125,300,100);
//private var windowRect3 : Rect = Rect (400,125,300,100);
//private var windowRect4 : Rect = Rect (400,125,300,100);
private var janelaPapel : boolean = false;
private var fireDialogEnable : boolean = false;
//private var promoteDialogEnable : boolean = false;
//private var promoteDialogEnable2 : boolean = false;
private var morale : MoraleControl;
private var hSliderValue : int = 0;
private var staminaBar : StaminaBar;
private var moraleBar : MoraleBar;

//public var log : HistoryLog;


//Initialization function. This is the function called from outside

function MudarPapel (funcionario : Funcionario, treino : Treinamento, a : int){
	func = funcionario;
	//fire = func.GetComponentInChildren(NewFuncionario);
	if(func.GetNome() != stringNames.fired)
	{
		if (treino.GetLockEscolha() == false)
			janelaPapel = true;
	}
}

function ChangeRole(funcionario : Funcionario)
{
	func = funcionario;
}

function ExecutaJanelaPapel(t : String){
	//If he was manager or marketing, then update the staff status (has manager and marketing)
	if(func.GetPapel() == stringNames.papelGerente)
		equipe.SetHasManager(false);
	if(func.GetPapel() == stringNames.papelMarketing)
		equipe.SetHasMarketing(false);
	func.SetPapel(t);
	//janelaPapel  = false;
}
function ExecutaJanelaPapelSec(t : String){
	if(func.GetPapel() != stringNames.papelNenhum)
		func.SetPapelSec(t);
	//janelaPapel  = false;
}
function ExecutaJanelaCargo(t : String){
	func.SetCargo(t);
	var action : ActionNode = new ActionNode();
	action.NewAction("Promotion", "Promotion", "Promotion", func, timer, "Promotion", "Promoted to "+ t, "", 100);
	func.behavior.AddAction(action);
	morale = func.GetComponentInChildren(MoraleControl);
	morale.IncreaseMoralePromotion();
	//janelaPapel  = false;
}
/*
function ExecutaJanelaFire(){
	fireDialogEnable = true;
	//janelaPapel  = false;
	winCon.DisableRoleWindow();
	
}
*/
function WindowFire(windowID : int){
	GUI.Box (Rect (02,20,296,25), "Name: " + func.GetNome());
	GUI.BeginGroup (Rect (02,45,300,100));
	if (GUI.Button (Rect (02,00,296,25), "Sure?")) {
		//fireDialogEnable = false;
		winCon.DisableFireWindow();
		//if(func == managerSlot)
		//	equipe.SetHasManager(false);
		//Create a fire action
		/*
		var slot : EmployeeList;
		slot = log.GetSlot(func);
		log.NewFiredAction(slot);
		*/
		//Fire employee
		//fire.FireFuncionario(func);
		func.FireEmployee(true);
	}
	if (GUI.Button (Rect (02,25,296,25), "Cancel")) 
	{
		//fireDialogEnable = false;
		winCon.DisableFireWindow();
	}
	GUI.EndGroup ();
}

function WindowFunction(windowID : int){
	timer.PauseGame();
	GUI.Box (Rect (02,18,196,25), "Main Role");
	GUI.Box (Rect (200,18,196,25), "Sec Role");
	GUI.BeginGroup (Rect (02,25,600,270));
	//---------------------------------------------------------------------------------------------------------------------
	//if gameplay style is micro, then player can change roles
	//if(playStyle.IsMacro() == false)
	//{		
		//Main Role
		if((func.GetPapel() != stringNames.papelAnalista))// && (managerSlot != func) && (marketingSlot != func))
		{    
			if (GUI.Button (Rect (02,18,198,25), GUIContent (stringNames.papelAnalista, "+ Validadtion")))
			{
				ExecutaJanelaPapel(stringNames.papelAnalista);
			}
		}
		if(func.GetPapel() == stringNames.papelAnalista)
			GUI.Box (Rect (02,18,198,25), stringNames.papelAnalista);
		
		//---------------------------------------------------------------------------------------------------------------------
		if((func.GetPapel() != stringNames.papelArquiteto))// && (managerSlot != func) && (marketingSlot != func))
			if (GUI.Button (Rect (02,43,198,25), GUIContent (stringNames.papelArquiteto, "+ finding bugs \n + Architecture"))) 
			{
				ExecutaJanelaPapel(stringNames.papelArquiteto);
			}
		if(func.GetPapel() == stringNames.papelArquiteto)
			GUI.Box (Rect (02,43,198,25), stringNames.papelArquiteto);
		
		//---------------------------------------------------------------------------------------------------------------------
		if((func.GetPapel() != stringNames.papelProg))// && (managerSlot != func) && (marketingSlot != func))
			if (GUI.Button (Rect (02,68,198,25), GUIContent (stringNames.papelProg, "+ Progress \n + Bugs"))) 
			{
				ExecutaJanelaPapel(stringNames.papelProg);
			}
		if(func.GetPapel() == stringNames.papelProg)
			GUI.Box (Rect (02,68,198,25), stringNames.papelProg);
		
		//---------------------------------------------------------------------------------------------------------------------
		if((func.GetPapel() != stringNames.papelTester))//	&& (managerSlot != func) && (marketingSlot != func))
			if (GUI.Button (Rect (02,93,198,25), GUIContent (stringNames.papelTester, "- Bugs"))) 
			{
				ExecutaJanelaPapel(stringNames.papelTester);
			}
		if(func.GetPapel() == stringNames.papelTester)
			GUI.Box (Rect (02,93,198,25), stringNames.papelTester);	
			
		//---------------------------------------------------------------------------------------------------------------------	
		//Sec Role
		if((func.GetPapel() != stringNames.papelAnalista) && (func.GetPapelSec() != stringNames.papelAnalista))
		{    
			if (GUI.Button (Rect (200,18,198,25), GUIContent (stringNames.papelAnalista, "+ Validadtion")))
			{
				ExecutaJanelaPapelSec(stringNames.papelAnalista);
			}
		}
		if(func.GetPapelSec() == stringNames.papelAnalista)
			GUI.Box (Rect (200,18,198,25), stringNames.papelAnalista);
		
		//---------------------------------------------------------------------------------------------------------------------
		if((func.GetPapel() != stringNames.papelArquiteto) && (func.GetPapelSec() != stringNames.papelArquiteto))
			if (GUI.Button (Rect (200,43,198,25), GUIContent (stringNames.papelArquiteto, "+ finding bugs \n + Architecture"))) 
			{
				ExecutaJanelaPapelSec(stringNames.papelArquiteto);
			}
		if(func.GetPapelSec() == stringNames.papelArquiteto)
			GUI.Box (Rect (200,43,198,25), stringNames.papelArquiteto);
		
		//---------------------------------------------------------------------------------------------------------------------
		if((func.GetPapel() != stringNames.papelProg) && (func.GetPapelSec() != stringNames.papelProg))
			if (GUI.Button (Rect (200,68,198,25), GUIContent (stringNames.papelProg, "+ Progress \n + Bugs"))) 
			{
				ExecutaJanelaPapelSec(stringNames.papelProg);
			}
		if(func.GetPapelSec() == stringNames.papelProg)
			GUI.Box (Rect (200,68,198,25), stringNames.papelProg);
		
		//---------------------------------------------------------------------------------------------------------------------
		if((func.GetPapel() != stringNames.papelTester) && (func.GetPapelSec() != stringNames.papelTester))
			if (GUI.Button (Rect (200,93,198,25), GUIContent (stringNames.papelTester, "- Bugs"))) 
			{
				ExecutaJanelaPapelSec(stringNames.papelTester);
			}
		if(func.GetPapelSec() == stringNames.papelTester)
			GUI.Box (Rect (200,93,198,25), stringNames.papelTester);	
	//}	
	//---------------------------------------------------------------------------------------------------------------------	
	//Both on micro and macro the player can assign the manager and marketing role
	//if((func.GetPapel() != stringNames.papelGerente) && (managerSlot != func))
	if((func.GetPapel() != stringNames.papelGerente) && (equipe.GetHasManager() == false))
		if (GUI.Button (Rect (02,118,198,25), GUIContent (stringNames.papelGerente, "+ Design \n + Development"))) 
		{
			//promoteDialogEnable = true;
			//janelaPapel  = false;
			equipe.SetHasManager(true);
			ExecutaJanelaPapel(stringNames.papelGerente);
		}
	if(func.GetPapel() == stringNames.papelGerente)
		GUI.Box (Rect (02,118,198,25), stringNames.papelGerente);
	
	//---------------------------------------------------------------------------------------------------------------------
	if((func.GetPapel() != stringNames.papelMarketing) && (equipe.GetHasMarketing() == false))// && (marketingSlot != func) && (managerSlot != func))
		if (GUI.Button (Rect (02,143,198,25), GUIContent (stringNames.papelMarketing, "+ Validation Bonus \n + Money"))) 
		{
			//promoteDialogEnable2 = true;
			//janelaPapel  = false;
			equipe.SetHasMarketing(true);
			ExecutaJanelaPapel(stringNames.papelMarketing);
		}
	if(func.GetPapel() == stringNames.papelMarketing)
		GUI.Box (Rect (02,143,198,25), stringNames.papelMarketing);
	//---------------------------------------------------------------------------------------------------------------------
	//Main
	if((func.GetPapel() != stringNames.papelNenhum))// && (managerSlot != func) && (marketingSlot != func))	
			if (GUI.Button (Rect (02,168,198,25), stringNames.papelNenhum)) 
			{
				ExecutaJanelaPapelSec(stringNames.papelNenhum);
				ExecutaJanelaPapel(stringNames.papelNenhum);				
			}
		if(func.GetPapel() == stringNames.papelNenhum)	
			GUI.Box (Rect (02,168,198,25), stringNames.papelNenhum);
			
	//Sec		
	if((func.GetPapelSec() != stringNames.papelNenhum))// && (managerSlot != func) && (marketingSlot != func))	
			if (GUI.Button (Rect (200,168,198,25), stringNames.papelNenhum)) 
			{
				func.SetPapelRate(100);
				func.SetPapelSecRate(0);
				ExecutaJanelaPapelSec(stringNames.papelNenhum);
			}
		if(func.GetPapelSec() == stringNames.papelNenhum)	
			GUI.Box (Rect (200,168,198,25), stringNames.papelNenhum);
			
		
	//Canto esquerdo
	//---------------------------------------------------------------------------------------------------------------------	
	GUI.Box (Rect (400,68,198,25), "Grades:");
	//---------------------------------------------------------------------------------------------------------------------	
	//if(func.GetCargo() != stringNames.jobJunior)	
	//	if (GUI.Button (Rect (200,43,198,25), stringNames.jobJunior)) {
	//		ExecutaJanelaCargo(stringNames.jobJunior);
	//	}
	if(func.GetCargo() == stringNames.jobJunior)	
		GUI.Box (Rect (400,93,198,25), stringNames.jobJunior);
	//---------------------------------------------------------------------------------------------------------------------	
	if(func.GetCargo() != stringNames.jobPleno && func.GetCargo() != stringNames.jobSenior)	
		if (GUI.Button (Rect (400,118,198,25), GUIContent (stringNames.jobPleno, "+ 20% Produtivity \n + 30% Salary"))) 
		{
			ExecutaJanelaCargo(stringNames.jobPleno);
		}
	if(func.GetCargo() == stringNames.jobPleno)	
		GUI.Box (Rect (400,118,198,25), stringNames.jobPleno);
	//---------------------------------------------------------------------------------------------------------------------	
	if(func.GetCargo() != stringNames.jobSenior)	
		if (GUI.Button (Rect (400,143,198,25), GUIContent (stringNames.jobSenior, "+ 40% Produtivity \n + 50% Salary"))) 
		{
			ExecutaJanelaCargo(stringNames.jobSenior);
		}
	if(func.GetCargo() == stringNames.jobSenior)	
		GUI.Box (Rect (400,143,198,25), stringNames.jobSenior);
	
	//---------------------------------------------------------------------------------------------------------------------
	if (GUI.Button (Rect (400,168,198,25), GUIContent ("Fire!", "Fire the employee"))) 
	{
		//ExecutaJanelaFire();
		winCon.ShowFireWindow();
	}
	
	//---------------------------------------------------------------------------------------------------------------------
	//Rates
	//---------------------------------------------------------------------------------------------------------------------
	GUI.Box (Rect (02,193,396,20), "Main: " +  func.GetPapelRate() + "%" + "     /     " + "Sec: " + func.GetPapelSecRate()+ "%");
	hSliderValue = func.GetPapelSecRate() / 10;
	hSliderValue = GUI.HorizontalSlider (Rect (02,213,396,25), hSliderValue, 0, 5);
	func.SetPapelRate(100 - (hSliderValue * 10));
	func.SetPapelSecRate((hSliderValue * 10));
	//---------------------------------------------------------------------------------------------------------------------
	//Botao de Cancel
	//---------------------------------------------------------------------------------------------------------------------
	//+40 02,193,396,25
	if (GUI.Button (Rect (02,240,396,25), "Close")) {
		//janelaPapel  = false;
		winCon.DisableRoleWindow();
		//timer.SpeedNormal();
	}
	GUI.Box (Rect (400,18,198,50), GUI.tooltip);
	GUI.EndGroup ();
	GUI.DragWindow();
}

/*
function PromoteToManager()
{
	fire.ClearFuncionario(managerSlot);
	managerSlot.GetComponentInChildren(MeshRenderer).enabled = false;
	managerSlot.SetPapel(stringNames.papelGerente);
	managerSlot.SetMorale(100);
	managerSlot.SetAtributos(func.GetAtributos());
	managerSlot.SetWorkingHours(40);
	managerSlot.SetEspecializacoes(func.GetEspecializacao());
	managerSlot.SetNome(func.GetNome());
	managerSlot.SetSalarioDefault(func.GetSalarioDefault());
	managerSlot.SetSalario(func.GetSalario());
	managerSlot.CopyLevel(func);
	
	staminaBar = managerSlot.GetComponentInChildren(StaminaBar);
	moraleBar = managerSlot.GetComponentInChildren(MoraleBar);
	staminaBar.Stamina_Bar();
	moraleBar.Morale_Bar();
	
	//
	//Need to change in the project list the slot.
	var empList : EmployeeList;
	var pjList : ProjectList;
	pjList = log.GetProjectList();
	empList = log.GetSlot(func);
	//Need to add an Fire Event in the slot 8 if it was not empty
	
	//Create a new node for the new manager in slot 8
	log.NewEmployeeNode(managerSlot, pjList.last.slot08);
	
	//
	fire.FireFuncionario(func);
	janelaPapel  = false;
	equipe.SetHasManager(true);
}

function WindowPromoteManager(windowID : int){
	GUI.Box (Rect (02,20,296,25), "Name: " + func.GetNome());
	GUI.BeginGroup (Rect (02,45,300,100));
	if (GUI.Button (Rect (02,00,296,25), "Sure? The last manager will be fired")) {
		promoteDialogEnable = false;
		PromoteToManager();
	}
	if (GUI.Button (Rect (02,25,296,25), "Cancel")) {
		promoteDialogEnable = false;
	}
	GUI.EndGroup ();
}

function PromoteToMarketing()
{
	fire.ClearFuncionario(marketingSlot);
	marketingSlot.GetComponentInChildren(MeshRenderer).enabled = false;
	marketingSlot.SetPapel(stringNames.papelMarketing);
	marketingSlot.SetMorale(100);
	marketingSlot.SetAtributos(func.GetAtributos());
	marketingSlot.SetWorkingHours(40);
	marketingSlot.SetEspecializacoes(func.GetEspecializacao());
	marketingSlot.SetNome(func.GetNome());
	marketingSlot.SetSalarioDefault(func.GetSalarioDefault());
	marketingSlot.SetSalario(func.GetSalario());
	marketingSlot.CopyLevel(func);
	
	staminaBar = marketingSlot.GetComponentInChildren(StaminaBar);
	moraleBar = marketingSlot.GetComponentInChildren(MoraleBar);
	staminaBar.Stamina_Bar();
	moraleBar.Morale_Bar();
	
	fire.FireFuncionario(func);
	janelaPapel  = false;
	equipe.SetHasMarketing(true);
}

function WindowPromoteMarketing(windowID : int){
	GUI.Box (Rect (02,20,296,25), "Name: " + func.GetNome());
	GUI.BeginGroup (Rect (02,45,300,100));
	if (GUI.Button (Rect (02,00,296,25), "Sure? The last marketing will be fired")) {
		promoteDialogEnable2 = false;
		PromoteToMarketing();
	}
	if (GUI.Button (Rect (02,25,296,25), "Cancel")) {
		promoteDialogEnable2 = false;
	}
	GUI.EndGroup ();
}
*/
//--------------------------------------------Awake-----------------------------------------------------------

function Awake () {

}
//--------------------------------------------OnGUI-----------------------------------------------------------

//Funcao da lista Popup para cada um das 8 janelas de funcionarios
function OnGUI () {
	//GUI.backgroundColor = Color.yellow;
	//GUI.contentColor = Color.green;
	//if(janelaPapel)
	//	windowRect = GUI.Window (2, windowRect, WindowFunction, func.GetNome() + " Roles");
	//if(fireDialogEnable)
	//	windowRect2 = GUI.Window (10, windowRect2, WindowFire, "Confirmation: Firing employee");
	/*
	if(promoteDialogEnable)
		windowRect3 = GUI.Window (10, windowRect3, WindowPromoteManager, "Confirmation: Promote employee");
	if(promoteDialogEnable2)
		windowRect4 = GUI.Window (10, windowRect4, WindowPromoteMarketing, "Confirmation: Promote employee");
		*/
}