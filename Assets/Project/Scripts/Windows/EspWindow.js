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
function Janela_especializacao(){
	if(janelaEsp)
	{
		timer.PauseGame();
		GUI.BeginGroup(Rect (425,325,400,225));
		// ---------------Lado Esquerdo---------------
		GUI.Box (Rect (00,00,200,25), "---Programming Language---");	
		
		if(func.GetL_assembly() == false)
			if (GUI.Button (Rect (00,25,200,25), "assembly")) {
				ExecutaJanelaEsp("assembly");
			}
		if(func.GetL_assembly() == true)
			GUI.Box (Rect (00,25,200,25), "assembly");
		
		
		if(func.GetL_csharp() == false)
			if (GUI.Button (Rect (00,50,200,25), "csharp")) {
				ExecutaJanelaEsp("csharp");
			}
		if(func.GetL_csharp() == true)
			GUI.Box (Rect (00,50,200,25), "csharp");
		
		
		if(func.GetL_java() == false)
			if (GUI.Button (Rect (00,75,200,25), "java")) {
				ExecutaJanelaEsp("java");
			}
		if(func.GetL_java() == true)
			GUI.Box (Rect (00,75,200,25), "java");
		
		
		if(func.GetL_perl() == false)
			if (GUI.Button (Rect (00,100,200,25), "perl")) {
				ExecutaJanelaEsp("perl");
			}
		if(func.GetL_perl() == true)
			GUI.Box (Rect (00,100,200,25), "perl");
			
		
		if(func.GetL_ruby() == false)
			if (GUI.Button (Rect (00,125,200,25), "ruby")) {
				ExecutaJanelaEsp("ruby");
			}
		if(func.GetL_ruby() == true)
			GUI.Box (Rect (00,125,200,25), "ruby");
			
		GUI.Box (Rect (00,150,200,25), "---Metodos---");	
			
		if(func.GetM_agil() == false)	
			if (GUI.Button (Rect (00,175,200,25), "Agile Method")) {
				ExecutaJanelaEsp("agileMethod");
			}
		if(func.GetM_agil() == true)
			GUI.Box (Rect (00,175,200,25), "Agile Method");	
			
			
		if(func.GetM_classico() == false)	
			if (GUI.Button (Rect (00,200,200,25), "Classic Method")) {
				ExecutaJanelaEsp("classicMethod");
			}
		if(func.GetM_classico() == true)	
			GUI.Box (Rect (00,200,200,25), "Classic Method");
		
		
		// ---------------Lado Direito---------------

		GUI.Box (Rect (200,00,200,25), "---Tools---");
		
		if(func.GetF_programas() == false)
			if (GUI.Button (Rect (200,25,200,25), "Analysis Program")) {
				ExecutaJanelaEsp("analysisProgram");
			}
		if(func.GetF_programas() == true)
			GUI.Box (Rect (200,25,200,25), "Analysis Program");	
			
		if(func.GetF_versao() == false)	
			if (GUI.Button (Rect (200,50,200,25), "Version Control")) {
				ExecutaJanelaEsp("versionControl");
			}
		if(func.GetF_versao() == true)	
			GUI.Box (Rect (200,50,200,25), "Version Control");	
			
			
		if(func.GetF_depuracao() == false)	
			if (GUI.Button (Rect (200,75,200,25), "Depuration")) {
				ExecutaJanelaEsp("depuration");
			}
		if(func.GetF_depuracao() == true)
			GUI.Box (Rect (200,75,200,25), "Depuration");	
		
		
		if(func.GetF_projetos() == false)	
			if (GUI.Button (Rect (200,100,200,25), "Project Management")) {
				ExecutaJanelaEsp("projectManagement");
			}
		if(func.GetF_projetos() == true)	
			GUI.Box (Rect (200,100,200,25), "Project Management");	
		
		
		if(func.GetF_metricas() == false)	
			if (GUI.Button (Rect (200,125,200,25), "Metrics")) {
				ExecutaJanelaEsp("metrics");
			}
		if(func.GetF_metricas() == true)	
			GUI.Box (Rect (200,125,200,25), "Metrics");	
		
		
		if(func.GetF_planejamento() == false)	
			if (GUI.Button (Rect (200,150,200,25), "Planning")) {
				ExecutaJanelaEsp("planning");
			}
		if(func.GetF_planejamento() == true)
			GUI.Box (Rect (200,150,200,25), "Planning");	
		
		
		if(func.GetF_teste() == false)	
			if (GUI.Button (Rect (200,175,200,25), "Test")) {
				ExecutaJanelaEsp("test");
			}
		if(func.GetF_teste() == true)	
			GUI.Box (Rect (200,175,200,25), "Test");
		
		//Botao de Cancel
		if (GUI.Button (Rect (200,200,200,25), "Cancel")) {
			janelaEsp  = false;
			treino.SetLockEscolha(false);
			timer.SpeedNormal();
		}
		GUI.EndGroup ();
		treino.SetDeadline_Treino(deadlineTreino);
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
	Janela_especializacao();
}
