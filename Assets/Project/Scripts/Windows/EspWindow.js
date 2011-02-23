//Para usar este script:
//private var menuObj : GameObject;
//private var menuEsp : EspWindow;
//menuObj = GameObject.Find("GUI");
//menuEsp = menuObj.GetComponent(EspWindow);
//menuEsp.Especializar(func, treino);

//Usa Time.timeScale = 0.5;

private var func : Funcionario;
private var treino : Treinamento;

private var TEMPODETREINO : float = 14.0;
private 	var deadlineTreino : float = 0.0;
private var janelaEsp : boolean = false;

	
function ExecutaJanelaEsp(t : String){
	deadlineTreino = Time.timeSinceLevelLoad  + TEMPODETREINO;
	func.SetPapel("Treinamento");
	treino.SetAprendendo(t);
	janelaEsp  = false;
	Time.timeScale = 0.5;
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
		Time.timeScale = 0.0;
		GUI.BeginGroup(Rect (425,325,400,225));
		// ---------------Lado Esquerdo---------------
		GUI.Box (Rect (00,00,200,25), "---Linguagens---");	
		
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
			if (GUI.Button (Rect (00,175,200,25), "Metodo Agil")) {
				ExecutaJanelaEsp("metodoAgil");
			}
		if(func.GetM_agil() == true)
			GUI.Box (Rect (00,175,200,25), "Metodo Agil");	
			
			
		if(func.GetM_classico() == false)	
			if (GUI.Button (Rect (00,200,200,25), "Metodo Classico")) {
				ExecutaJanelaEsp("metodoClassico");
			}
		if(func.GetM_classico() == true)	
			GUI.Box (Rect (00,200,200,25), "Metodo Classico");
		
		
		// ---------------Lado Direito---------------

		GUI.Box (Rect (200,00,200,25), "---Ferramentas---");
		
		if(func.GetF_programas() == false)
			if (GUI.Button (Rect (200,25,200,25), "Analise de Programas")) {
				ExecutaJanelaEsp("analiseDeProgramas");
			}
		if(func.GetF_programas() == true)
			GUI.Box (Rect (200,25,200,25), "Analise de Programas");	
			
		if(func.GetF_versao() == false)	
			if (GUI.Button (Rect (200,50,200,25), "Controle de Versao")) {
				ExecutaJanelaEsp("controleDeVersao");
			}
		if(func.GetF_versao() == true)	
			GUI.Box (Rect (200,50,200,25), "Controle de Versao");	
			
			
		if(func.GetF_depuracao() == false)	
			if (GUI.Button (Rect (200,75,200,25), "Depuracao")) {
				ExecutaJanelaEsp("depuracao");
			}
		if(func.GetF_depuracao() == true)
			GUI.Box (Rect (200,75,200,25), "Depuracao");	
		
		
		if(func.GetF_projetos() == false)	
			if (GUI.Button (Rect (200,100,200,25), "Ger. de Projetos")) {
				ExecutaJanelaEsp("gerenciaDeProjetos");
			}
		if(func.GetF_projetos() == true)	
			GUI.Box (Rect (200,100,200,25), "Ger. de Projetos");	
		
		
		if(func.GetF_metricas() == false)	
			if (GUI.Button (Rect (200,125,200,25), "Metricas")) {
				ExecutaJanelaEsp("metricas");
			}
		if(func.GetF_metricas() == true)	
			GUI.Box (Rect (200,125,200,25), "Metricas");	
		
		
		if(func.GetF_planejamento() == false)	
			if (GUI.Button (Rect (200,150,200,25), "Planejamento")) {
				ExecutaJanelaEsp("planejamento");
			}
		if(func.GetF_planejamento() == true)
			GUI.Box (Rect (200,150,200,25), "Planejamento");	
		
		
		if(func.GetF_teste() == false)	
			if (GUI.Button (Rect (200,175,200,25), "Teste")) {
				ExecutaJanelaEsp("teste");
			}
		if(func.GetF_teste() == true)	
			GUI.Box (Rect (200,175,200,25), "Teste");
		
		//Botao de Cancel
		if (GUI.Button (Rect (200,200,200,25), "Cancel")) {
			janelaEsp  = false;
			treino.SetLockEscolha(false);
			Time.timeScale = 0.5;
		}
		GUI.EndGroup ();
		treino.SetDeadline_Treino(deadlineTreino);
	}
}

//--------------------------------------------OnGUI-----------------------------------------------------------

//Funcao da lista Popup para cada um das 8 janelas de funcionarios
function OnGUI () {
	GUI.backgroundColor = Color.yellow;
	GUI.backgroundColor = Color.yellow;
	GUI.contentColor = Color.green;
	Janela_especializacao();
}
