//Para usar este script:
//private var menuObj : GameObject;
//private var menuPapel : PapelWindow;
//menuObj = GameObject.Find("GUI");
//menuPapel = menuObj.GetComponent(PapelWindow);
//menuPapel.MudarPapel(func);
public var stringNames : StringNames;
public var timer : GameTime;
public var managerSlot : Funcionario;
public var equipe : Equipe;
private var newFunc : NewFuncionario;
private var fire : NewFuncionario;
private var func : Funcionario;
private var windowRect : Rect = Rect (400,125,400,248);
private var windowRect2 : Rect = Rect (400,125,300,100);
private var windowRect3 : Rect = Rect (400,125,300,100);
private var janelaPapel : boolean = false;
private var fireDialogEnable : boolean = false;
private var promoteDialogEnable : boolean = false;
private var morale : MoraleControl;

function MudarPapel (funcionario : Funcionario, treino : Treinamento){
	func = funcionario;
	fire = func.GetComponentInChildren(NewFuncionario);
	if(func.GetNome() != stringNames.fired)
	{
		if (treino.GetLockEscolha() == false)
			janelaPapel = true;
	}
}

function ExecutaJanelaPapel(t : String){
	func.SetPapel(t);
	janelaPapel  = false;
}
function ExecutaJanelaCargo(t : String){
	func.SetCargo(t);
	morale = func.GetComponentInChildren(MoraleControl);
	morale.IncreaseMoralePromotion();
	janelaPapel  = false;
}
function ExecutaJanelaFire(){
	fireDialogEnable = true;
	janelaPapel  = false;
}
function WindowFire(windowID : int){
	GUI.Box (Rect (02,20,296,25), "Name: " + func.GetNome());
	GUI.BeginGroup (Rect (02,45,300,100));
	if (GUI.Button (Rect (02,00,296,25), "Sure?")) {
		fireDialogEnable = false;
		if(func == managerSlot)
			equipe.SetHasManager(false);
		fire.FireFuncionario(func);
	}
	if (GUI.Button (Rect (02,25,296,25), "Cancel")) {
		fireDialogEnable = false;
	}
	GUI.EndGroup ();
}

function WindowFunction(windowID : int){
	timer.PauseGame();
	GUI.Box (Rect (02,18,396,25), func.GetNome());
	GUI.BeginGroup (Rect (02,25,400,220));
	//---------------------------------------------------------------------------------------------------------------------
	/*
	if(func.GetPapel() != stringNames.papelAnalista)
		if (GUI.Button (Rect (02,18,198,25), stringNames.papelAnalista)) {
			ExecutaJanelaPapel(stringNames.papelAnalista);
		}
	*/	
	if((func.GetPapel() != stringNames.papelAnalista) && (managerSlot != func))
	{    
		if (GUI.Button (Rect (02,18,198,25), GUIContent (stringNames.papelAnalista, "+ Validadtion")))
		{
			ExecutaJanelaPapel(stringNames.papelAnalista);
		}
	}
	if(func.GetPapel() == stringNames.papelAnalista)
		GUI.Box (Rect (02,18,198,25), stringNames.papelAnalista);
	
	//---------------------------------------------------------------------------------------------------------------------
	if((func.GetPapel() != stringNames.papelArquiteto) && (managerSlot != func))
		if (GUI.Button (Rect (02,43,198,25), GUIContent (stringNames.papelArquiteto, "+ finding bugs \n + Architecture"))) 
		{
			ExecutaJanelaPapel(stringNames.papelArquiteto);
		}
	if(func.GetPapel() == stringNames.papelArquiteto)
		GUI.Box (Rect (02,43,198,25), stringNames.papelArquiteto);
	
	//---------------------------------------------------------------------------------------------------------------------
	if((func.GetPapel() != stringNames.papelGerente) && (managerSlot != func))
		if (GUI.Button (Rect (02,68,198,25), GUIContent (stringNames.papelGerente, "+ Design \n + Development"))) 
		{
			//ExecutaJanelaPapel(stringNames.papelGerente);
			//PromoteToManager();
			promoteDialogEnable = true;
			janelaPapel  = false;
		}
	if(func.GetPapel() == stringNames.papelGerente)
		GUI.Box (Rect (02,68,198,25), stringNames.papelGerente);
	
	//---------------------------------------------------------------------------------------------------------------------
	if((func.GetPapel() != stringNames.papelMarketing) && (managerSlot != func))
		if (GUI.Button (Rect (02,93,198,25), GUIContent (stringNames.papelMarketing, "+ Validation Bonus \n + Money"))) 
		{
			ExecutaJanelaPapel(stringNames.papelMarketing);
		}
	if(func.GetPapel() == stringNames.papelMarketing)
		GUI.Box (Rect (02,93,198,25), stringNames.papelMarketing);
		
	//---------------------------------------------------------------------------------------------------------------------
	if((func.GetPapel() != stringNames.papelProg) && (managerSlot != func))
		if (GUI.Button (Rect (02,118,198,25), GUIContent (stringNames.papelProg, "+ Progress \n + Bugs"))) 
		{
			ExecutaJanelaPapel(stringNames.papelProg);
		}
	if(func.GetPapel() == stringNames.papelProg)
		GUI.Box (Rect (02,118,198,25), stringNames.papelProg);
	
	//---------------------------------------------------------------------------------------------------------------------
	if((func.GetPapel() != stringNames.papelTester)	&& (managerSlot != func))
		if (GUI.Button (Rect (02,143,198,25), GUIContent (stringNames.papelTester, "- Bugs"))) 
		{
			ExecutaJanelaPapel(stringNames.papelTester);
		}
	if(func.GetPapel() == stringNames.papelTester)
		GUI.Box (Rect (02,143,198,25), stringNames.papelTester);	
		
	//---------------------------------------------------------------------------------------------------------------------	
	if((func.GetPapel() != stringNames.papelNenhum) && (managerSlot != func))	
		if (GUI.Button (Rect (02,168,198,25), stringNames.papelNenhum)) {
			ExecutaJanelaPapel(stringNames.papelNenhum);
		}
	if(func.GetPapel() == stringNames.papelNenhum)	
		GUI.Box (Rect (02,168,198,25), stringNames.papelNenhum);
		
	//Lado esquerdo
	//---------------------------------------------------------------------------------------------------------------------	
	GUI.Box (Rect (200,68,198,25), "Grades:");
	//---------------------------------------------------------------------------------------------------------------------	
	//if(func.GetCargo() != stringNames.jobJunior)	
	//	if (GUI.Button (Rect (200,43,198,25), stringNames.jobJunior)) {
	//		ExecutaJanelaCargo(stringNames.jobJunior);
	//	}
	if(func.GetCargo() == stringNames.jobJunior)	
		GUI.Box (Rect (200,93,198,25), stringNames.jobJunior);
	//---------------------------------------------------------------------------------------------------------------------	
	if(func.GetCargo() != stringNames.jobPleno && func.GetCargo() != stringNames.jobSenior)	
		if (GUI.Button (Rect (200,118,198,25), GUIContent (stringNames.jobPleno, "+ 20% Produtivity \n + 30% Salary"))) 
		{
			ExecutaJanelaCargo(stringNames.jobPleno);
		}
	if(func.GetCargo() == stringNames.jobPleno)	
		GUI.Box (Rect (200,118,198,25), stringNames.jobPleno);
	//---------------------------------------------------------------------------------------------------------------------	
	if(func.GetCargo() != stringNames.jobSenior)	
		if (GUI.Button (Rect (200,143,198,25), GUIContent (stringNames.jobSenior, "+ 40% Produtivity \n + 50% Salary"))) 
		{
			ExecutaJanelaCargo(stringNames.jobSenior);
		}
	if(func.GetCargo() == stringNames.jobSenior)	
		GUI.Box (Rect (200,143,198,25), stringNames.jobSenior);
	
	//---------------------------------------------------------------------------------------------------------------------
	if (GUI.Button (Rect (200,168,198,25), GUIContent ("Fire!", "Fire the employee"))) 
	{
		ExecutaJanelaFire();
	}
	//Botao de Cancel
	if (GUI.Button (Rect (02,193,396,25), "Cancel")) {
		janelaPapel  = false;
		//timer.SpeedNormal();
	}
	GUI.Box (Rect (200,18,198,50), GUI.tooltip);
	GUI.EndGroup ();
}


function PromoteToManager()
{
	managerSlot.SetPapel(stringNames.papelGerente);
	managerSlot.SetMorale(100);
	managerSlot.SetAtributos(func.GetAtributos());
	managerSlot.SetWorkingHours(40);
	managerSlot.SetEspecializacoes(func.GetEspecializacao());
	managerSlot.SetNome(func.GetNome());
	managerSlot.SetSalarioDefault(func.GetSalarioDefault());
	managerSlot.SetSalario(func.GetSalario());
	managerSlot.GetComponentInChildren(MeshRenderer).enabled = false;
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
//--------------------------------------------Awake-----------------------------------------------------------

function Awake () {

}
//--------------------------------------------OnGUI-----------------------------------------------------------

//Funcao da lista Popup para cada um das 8 janelas de funcionarios
function OnGUI () {
	GUI.backgroundColor = Color.yellow;
	GUI.backgroundColor = Color.yellow;
	GUI.contentColor = Color.green;
	if(janelaPapel)
		windowRect = GUI.Window (2, windowRect, WindowFunction, "Roles");
	if(fireDialogEnable)
		windowRect2 = GUI.Window (10, windowRect2, WindowFire, "Confirmation: Firing employee");
	if(promoteDialogEnable)
		windowRect3 = GUI.Window (10, windowRect3, WindowPromoteManager, "Confirmation: Promote employee");
}