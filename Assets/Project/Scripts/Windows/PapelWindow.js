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

private var janelaPapel : boolean = false;

function ExecutaJanelaPapel(t : String){
	func.SetPapel(t);
	janelaPapel  = false;
	timer.SpeedNormal();
}

function MudarPapel (funcionario : Funcionario){
	func = funcionario;
	janelaPapel = true;
}
function Janela_Papel(){
	if(janelaPapel)
	{
		GUI.BeginGroup(Rect (425,325,400,225));
		timer.PauseGame();
		GUI.Box (Rect (00,00,200,25), "----Roles----");	
		//---------------------------------------------------------------------------------------------------------------------
		if(func.GetPapel() != "Analyst")
			if (GUI.Button (Rect (00,25,200,25), "Analyst")) {
				ExecutaJanelaPapel("Analyst");
			}
		if(func.GetPapel() == "Analyst")
			GUI.Box (Rect (00,25,200,25), "Analyst");
		
		//---------------------------------------------------------------------------------------------------------------------
		if(func.GetPapel() != "Architect")
			if (GUI.Button (Rect (00,50,200,25), "Architect")) {
				ExecutaJanelaPapel("Architect");
			}
		if(func.GetPapel() == "Architect")
			GUI.Box (Rect (00,50,200,25), "Architect");
		
		//---------------------------------------------------------------------------------------------------------------------
		if(func.GetPapel() != "Manager")
			if (GUI.Button (Rect (00,75,200,25), "Manager")) {
				ExecutaJanelaPapel("Manager");
			}
		if(func.GetPapel() == "Manager")
			GUI.Box (Rect (00,75,200,25), "Manager");
		
		//---------------------------------------------------------------------------------------------------------------------
		if(func.GetPapel() != "Marketing")
			if (GUI.Button (Rect (00,100,200,25), "Marketing")) {
				ExecutaJanelaPapel("Marketing");
			}
		if(func.GetPapel() == "Marketing")
			GUI.Box (Rect (00,100,200,25), "Marketing");
			
		//---------------------------------------------------------------------------------------------------------------------
		if(func.GetPapel() != "Programmer")
			if (GUI.Button (Rect (00,125,200,25), "Programmer")) {
				ExecutaJanelaPapel("Programmer");
			}
		if(func.GetPapel() == "Programmer")
			GUI.Box (Rect (00,125,200,25), "Programmer");
		
		//---------------------------------------------------------------------------------------------------------------------
		if(func.GetPapel() != "Tester")	
			if (GUI.Button (Rect (00,150,200,25), "Tester")) {
				ExecutaJanelaPapel("Tester");
			}
		if(func.GetPapel() == "Tester")
			GUI.Box (Rect (00,150,200,25), "Tester");	
			
		//---------------------------------------------------------------------------------------------------------------------	
		if(func.GetPapel() != "None")	
			if (GUI.Button (Rect (00,175,200,25), "None")) {
				ExecutaJanelaPapel("None");
			}
		if(func.GetPapel() == "None")	
			GUI.Box (Rect (00,175,200,25), "None");
		
		//---------------------------------------------------------------------------------------------------------------------
		//Botao de Cancel
		if (GUI.Button (Rect (00,200,200,25), "Cancel")) {
			janelaPapel  = false;
			timer.SpeedNormal();
		}
		GUI.EndGroup ();
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
	Janela_Papel();
}