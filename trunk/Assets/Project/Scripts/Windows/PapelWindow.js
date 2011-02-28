//Para usar este script:
//private var menuObj : GameObject;
//private var menuPapel : PapelWindow;
//menuObj = GameObject.Find("GUI");
//menuPapel = menuObj.GetComponent(PapelWindow);
//menuPapel.MudarPapel(func);

//Usa Time.timeScale = 0.5;

private var func : Funcionario;
private var timerObj : GameObject;
private var timer : GameTime;
private var windowRect : Rect = Rect (350,125,200,220);
private var janelaPapel : boolean = false;

function ExecutaJanelaPapel(t : String){
	func.SetPapel(t);
	janelaPapel  = false;
	timer.SpeedNormal();
}

function MudarPapel (funcionario : Funcionario, treino : Treinamento){
	func = funcionario;
	if (treino.GetLockEscolha() == false)
		janelaPapel = true;
}
function WindowFunction(windowID : int){
	timer.PauseGame();	
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
	
	//---------------------------------------------------------------------------------------------------------------------
	//Botao de Cancel
	if (GUI.Button (Rect (02,193,198,25), "Cancel")) {
		janelaPapel  = false;
		timer.SpeedNormal();
	}
}

//--------------------------------------------Awake-----------------------------------------------------------

function Awake () {
	timerObj = GameObject.Find("Timer");
	timer = timerObj.GetComponent(GameTime);
}
//--------------------------------------------OnGUI-----------------------------------------------------------

//Funcao da lista Popup para cada um das 8 janelas de funcionarios
function OnGUI () {
	GUI.backgroundColor = Color.yellow;
	GUI.backgroundColor = Color.yellow;
	GUI.contentColor = Color.green;
	if(janelaPapel)
		windowRect = GUI.Window (2, windowRect, WindowFunction, "Roles");
}