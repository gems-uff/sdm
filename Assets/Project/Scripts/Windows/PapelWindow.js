//Para usar este script:
//private var menuObj : GameObject;
//private var menuPapel : PapelWindow;
//menuObj = GameObject.Find("GUI");
//menuPapel = menuObj.GetComponent(PapelWindow);
//menuPapel.MudarPapel(func);
public var stringNames : StringNames;
public var timer : GameTime;
private var fire : NewFuncionario;
private var func : Funcionario;
private var windowRect : Rect = Rect (600,125,400,248);
private var windowRect2 : Rect = Rect (600,125,300,100);
private var janelaPapel : boolean = false;
private var fireDialogEnable : boolean = false;

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
	if(func.GetPapel() != stringNames.papelAnalista)
		if (GUI.Button (Rect (02,18,198,25), stringNames.papelAnalista)) {
			ExecutaJanelaPapel(stringNames.papelAnalista);
		}
	if(func.GetPapel() == stringNames.papelAnalista)
		GUI.Box (Rect (02,18,198,25), stringNames.papelAnalista);
	
	//---------------------------------------------------------------------------------------------------------------------
	if(func.GetPapel() != stringNames.papelArquiteto)
		if (GUI.Button (Rect (02,43,198,25), stringNames.papelArquiteto)) {
			ExecutaJanelaPapel(stringNames.papelArquiteto);
		}
	if(func.GetPapel() == stringNames.papelArquiteto)
		GUI.Box (Rect (02,43,198,25), stringNames.papelArquiteto);
	
	//---------------------------------------------------------------------------------------------------------------------
	if(func.GetPapel() != stringNames.papelGerente)
		if (GUI.Button (Rect (02,68,198,25), stringNames.papelGerente)) {
			ExecutaJanelaPapel(stringNames.papelGerente);
		}
	if(func.GetPapel() == stringNames.papelGerente)
		GUI.Box (Rect (02,68,198,25), stringNames.papelGerente);
	
	//---------------------------------------------------------------------------------------------------------------------
	if(func.GetPapel() != stringNames.papelMarketing)
		if (GUI.Button (Rect (02,93,198,25), stringNames.papelMarketing)) {
			ExecutaJanelaPapel(stringNames.papelMarketing);
		}
	if(func.GetPapel() == stringNames.papelMarketing)
		GUI.Box (Rect (02,93,198,25), stringNames.papelMarketing);
		
	//---------------------------------------------------------------------------------------------------------------------
	if(func.GetPapel() != stringNames.papelProg)
		if (GUI.Button (Rect (02,118,198,25), stringNames.papelProg)) {
			ExecutaJanelaPapel(stringNames.papelProg);
		}
	if(func.GetPapel() == stringNames.papelProg)
		GUI.Box (Rect (02,118,198,25), stringNames.papelProg);
	
	//---------------------------------------------------------------------------------------------------------------------
	if(func.GetPapel() != stringNames.papelTester)	
		if (GUI.Button (Rect (02,143,198,25), stringNames.papelTester)) {
			ExecutaJanelaPapel(stringNames.papelTester);
		}
	if(func.GetPapel() == stringNames.papelTester)
		GUI.Box (Rect (02,143,198,25), stringNames.papelTester);	
		
	//---------------------------------------------------------------------------------------------------------------------	
	if(func.GetPapel() != stringNames.papelNenhum)	
		if (GUI.Button (Rect (02,168,198,25), stringNames.papelNenhum)) {
			ExecutaJanelaPapel(stringNames.papelNenhum);
		}
	if(func.GetPapel() == stringNames.papelNenhum)	
		GUI.Box (Rect (02,168,198,25), stringNames.papelNenhum);
		
	//Lado esquerdo
	//---------------------------------------------------------------------------------------------------------------------	
	GUI.Box (Rect (200,18,198,25), "Grades:");
	//---------------------------------------------------------------------------------------------------------------------	
	if(func.GetCargo() != stringNames.jobJunior)	
		if (GUI.Button (Rect (200,43,198,25), stringNames.jobJunior)) {
			ExecutaJanelaCargo(stringNames.jobJunior);
		}
	if(func.GetCargo() == stringNames.jobJunior)	
		GUI.Box (Rect (200,43,198,25), stringNames.jobJunior);
	
	//---------------------------------------------------------------------------------------------------------------------	
	if(func.GetCargo() != stringNames.jobPleno)	
		if (GUI.Button (Rect (200,68,198,25), stringNames.jobPleno)) {
			ExecutaJanelaCargo(stringNames.jobPleno);
		}
	if(func.GetCargo() == stringNames.jobPleno)	
		GUI.Box (Rect (200,68,198,25), stringNames.jobPleno);
	
	//---------------------------------------------------------------------------------------------------------------------	
	if(func.GetCargo() != stringNames.jobSenior)	
		if (GUI.Button (Rect (200,93,198,25), stringNames.jobSenior)) {
			ExecutaJanelaCargo(stringNames.jobSenior);
		}
	if(func.GetCargo() == stringNames.jobSenior)	
		GUI.Box (Rect (200,93,198,25), stringNames.jobSenior);
	
	//---------------------------------------------------------------------------------------------------------------------
	if (GUI.Button (Rect (200,143,198,25), "Fire!")) {
		ExecutaJanelaFire();
	}
	//Botao de Cancel
	if (GUI.Button (Rect (02,193,396,25), "Cancel")) {
		janelaPapel  = false;
		//timer.SpeedNormal();
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
}