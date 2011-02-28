//Para usar este script:
//private var menuObj : GameObject;
//private var menuEsp : EspWindow;
//menuObj = GameObject.Find("GUI");
//menuEsp = menuObj.GetComponent(EspWindow);
//menuEsp.Especializar(func, treino);

private var func : Funcionario;
private var treino : Treinamento;
private var timerObj : GameObject;
private var timer : GameTime;


private var TEMPODETREINO : float = 14.0;
private 	var deadlineTreino : float = 0.0;
private var janelaEsp : boolean = false;
private var windowRect : Rect = Rect (350,125,400,243);

	
function ExecutaJanelaEsp(t : String){
	deadlineTreino = Time.timeSinceLevelLoad  + TEMPODETREINO;
	func.SetPapel("Training");
	treino.SetAprendendo(t);
	janelaEsp  = false;
	timer.SpeedNormal();
}

function Especializar (funcionario : Funcionario, treinamento : Treinamento){
	func = funcionario;
	treino = treinamento;
	treino.SetLockEscolha(true);
	janelaEsp = true;
}
function WindowFunction(windowID : int){
	timer.PauseGame();
	// ---------------Lado Esquerdo---------------
	GUI.Box (Rect (02,018,198,25), "---Programming Language---");	
	
	if(func.GetL_assembly() == false)
		if (GUI.Button (Rect (02,043,198,25), "assembly")) {
			ExecutaJanelaEsp("assembly");
		}
	if(func.GetL_assembly() == true)
		GUI.Box (Rect (02,043,198,25), "assembly");
	
	
	if(func.GetL_csharp() == false)
		if (GUI.Button (Rect (02,068,198,25), "csharp")) {
			ExecutaJanelaEsp("csharp");
		}
	if(func.GetL_csharp() == true)
		GUI.Box (Rect (02,068,198,25), "csharp");
	
	
	if(func.GetL_java() == false)
		if (GUI.Button (Rect (02,093,198,25), "java")) {
			ExecutaJanelaEsp("java");
		}
	if(func.GetL_java() == true)
		GUI.Box (Rect (02,093,198,25), "java");
	
	
	if(func.GetL_perl() == false)
		if (GUI.Button (Rect (02,118,198,25), "perl")) {
			ExecutaJanelaEsp("perl");
		}
	if(func.GetL_perl() == true)
		GUI.Box (Rect (02,118,198,25), "perl");
		
	
	if(func.GetL_ruby() == false)
		if (GUI.Button (Rect (02,143,198,25), "ruby")) {
			ExecutaJanelaEsp("ruby");
		}
	if(func.GetL_ruby() == true)
		GUI.Box (Rect (02,143,198,25), "ruby");
		
	GUI.Box (Rect (02,168,198,25), "---Metodos---");	
		
	if(func.GetM_agil() == false)	
		if (GUI.Button (Rect (02,193,198,25), "Agile Method")) {
			ExecutaJanelaEsp("agileMethod");
		}
	if(func.GetM_agil() == true)
		GUI.Box (Rect (02,193,198,25), "Agile Method");	
		
		
	if(func.GetM_classico() == false)	
		if (GUI.Button (Rect (02,218,198,25), "Classic Method")) {
			ExecutaJanelaEsp("classicMethod");
		}
	if(func.GetM_classico() == true)	
		GUI.Box (Rect (02,218,198,25), "Classic Method");
	
	
	// ---------------Lado Direito---------------

	GUI.Box (Rect (200,018,198,25), "---Tools---");
	
	if(func.GetF_programas() == false)
		if (GUI.Button (Rect (200,043,198,25), "Analysis Program")) {
			ExecutaJanelaEsp("analysisProgram");
		}
	if(func.GetF_programas() == true)
		GUI.Box (Rect (200,043,198,25), "Analysis Program");	
		
	if(func.GetF_versao() == false)	
		if (GUI.Button (Rect (200,068,198,25), "Version Control")) {
			ExecutaJanelaEsp("versionControl");
		}
	if(func.GetF_versao() == true)	
		GUI.Box (Rect (200,068,198,25), "Version Control");	
		
		
	if(func.GetF_depuracao() == false)	
		if (GUI.Button (Rect (200,093,198,25), "Depuration")) {
			ExecutaJanelaEsp("depuration");
		}
	if(func.GetF_depuracao() == true)
		GUI.Box (Rect (200,093,198,25), "Depuration");	
	
	
	if(func.GetF_projetos() == false)	
		if (GUI.Button (Rect (200,118,198,25), "Project Management")) {
			ExecutaJanelaEsp("projectManagement");
		}
	if(func.GetF_projetos() == true)	
		GUI.Box (Rect (200,118,198,25), "Project Management");	
	
	
	if(func.GetF_metricas() == false)	
		if (GUI.Button (Rect (200,143,198,25), "Metrics")) {
			ExecutaJanelaEsp("metrics");
		}
	if(func.GetF_metricas() == true)	
		GUI.Box (Rect (200,143,198,25), "Metrics");	
	
	
	if(func.GetF_planejamento() == false)	
		if (GUI.Button (Rect (200,168,198,25), "Planning")) {
			ExecutaJanelaEsp("planning");
		}
	if(func.GetF_planejamento() == true)
		GUI.Box (Rect (200,168,198,25), "Planning");	
	
	
	if(func.GetF_teste() == false)	
		if (GUI.Button (Rect (200,193,198,25), "Test")) {
			ExecutaJanelaEsp("test");
		}
	if(func.GetF_teste() == true)	
		GUI.Box (Rect (200,193,198,25), "Test");
	
	//Botao de Cancel
	if (GUI.Button (Rect (200,218,198,25), "Cancel")) {
		janelaEsp  = false;
		treino.SetLockEscolha(false);
		timer.SpeedNormal();
	}
	treino.SetDeadline_Treino(deadlineTreino);
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
	if(janelaEsp)
		windowRect = GUI.Window (0, windowRect, WindowFunction, "Especializations");
}
