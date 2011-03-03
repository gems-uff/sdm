//Para usar este script:
//private var menuObj : GameObject;
//private var menuPapel : PapelWindow;
//menuObj = GameObject.Find("GUI");
//menuPapel = menuObj.GetComponent(PapelWindow);
//menuPapel.MudarPapel(func);

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
	if(func.GetNome() != "Fired")
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
	if(func.GetPapel() != "Analyst")
		if (GUI.Button (Rect (02,18,198,25), "Analyst")) {
			ExecutaJanelaPapel("Analyst");
		}
	if(func.GetPapel() == "Analyst")
		GUI.Box (Rect (02,18,198,25), "Analyst");
	
	//---------------------------------------------------------------------------------------------------------------------
	if(func.GetPapel() != "Architect")
		if (GUI.Button (Rect (02,43,198,25), "Architect")) {
			ExecutaJanelaPapel("Architect");
		}
	if(func.GetPapel() == "Architect")
		GUI.Box (Rect (02,43,198,25), "Architect");
	
	//---------------------------------------------------------------------------------------------------------------------
	if(func.GetPapel() != "Manager")
		if (GUI.Button (Rect (02,68,198,25), "Manager")) {
			ExecutaJanelaPapel("Manager");
		}
	if(func.GetPapel() == "Manager")
		GUI.Box (Rect (02,68,198,25), "Manager");
	
	//---------------------------------------------------------------------------------------------------------------------
	if(func.GetPapel() != "Marketing")
		if (GUI.Button (Rect (02,93,198,25), "Marketing")) {
			ExecutaJanelaPapel("Marketing");
		}
	if(func.GetPapel() == "Marketing")
		GUI.Box (Rect (02,93,198,25), "Marketing");
		
	//---------------------------------------------------------------------------------------------------------------------
	if(func.GetPapel() != "Programmer")
		if (GUI.Button (Rect (02,118,198,25), "Programmer")) {
			ExecutaJanelaPapel("Programmer");
		}
	if(func.GetPapel() == "Programmer")
		GUI.Box (Rect (02,118,198,25), "Programmer");
	
	//---------------------------------------------------------------------------------------------------------------------
	if(func.GetPapel() != "Tester")	
		if (GUI.Button (Rect (02,143,198,25), "Tester")) {
			ExecutaJanelaPapel("Tester");
		}
	if(func.GetPapel() == "Tester")
		GUI.Box (Rect (02,143,198,25), "Tester");	
		
	//---------------------------------------------------------------------------------------------------------------------	
	if(func.GetPapel() != "None")	
		if (GUI.Button (Rect (02,168,198,25), "None")) {
			ExecutaJanelaPapel("None");
		}
	if(func.GetPapel() == "None")	
		GUI.Box (Rect (02,168,198,25), "None");
		
	//Lado esquerdo
	//---------------------------------------------------------------------------------------------------------------------	
	GUI.Box (Rect (200,18,198,25), "Grades:");
	//---------------------------------------------------------------------------------------------------------------------	
	if(func.GetCargo() != "Junior")	
		if (GUI.Button (Rect (200,43,198,25), "Junior")) {
			ExecutaJanelaCargo("Junior");
		}
	if(func.GetCargo() == "Junior")	
		GUI.Box (Rect (200,43,198,25), "Junior");
	
	//---------------------------------------------------------------------------------------------------------------------	
	if(func.GetCargo() != "Mid-Level")	
		if (GUI.Button (Rect (200,68,198,25), "Mid-Level")) {
			ExecutaJanelaCargo("Mid-Level");
		}
	if(func.GetCargo() == "Mid-Level")	
		GUI.Box (Rect (200,68,198,25), "Mid-Level");
	
	//---------------------------------------------------------------------------------------------------------------------	
	if(func.GetCargo() != "Senior")	
		if (GUI.Button (Rect (200,93,198,25), "Senior")) {
			ExecutaJanelaCargo("Senior");
		}
	if(func.GetCargo() == "Senior")	
		GUI.Box (Rect (200,93,198,25), "Senior");
	
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