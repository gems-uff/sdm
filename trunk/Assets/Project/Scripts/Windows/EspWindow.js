//Para usar este script:
//private var menuObj : GameObject;
//private var menuEsp : EspWindow;
//menuObj = GameObject.Find("GUI");
//menuEsp = menuObj.GetComponent(EspWindow);
//menuEsp.Especializar(func, treino);
public var stringNames : StringNames;
public var timer : GameTime;
public var pagar : Pagamentos;
public var jogador : PlayerStats;
public var PRECO : int = 2500;
public var TEMPODETREINO : int = 12;
private var func : Funcionario;
private var treino : Treinamento;
private 	var deadlineTreino : float = 0.0;
private var janelaEsp : boolean = false;
private var windowRect : Rect = Rect (600,125,400,268);

	
function ExecutaJanelaEsp(t : String){
	if(jogador.GetSaldo() >= PRECO)
	{
		deadlineTreino = timer.GetGameTime() + TEMPODETREINO;
		func.SetPapel(stringNames.papelTreinando);
		treino.SetDeadline_Treino(deadlineTreino);
		treino.SetAprendendo(t);
		pagar.PagarFuncionarioTreinamento(PRECO);
		janelaEsp  = false;
	}
}

function Especializar (funcionario : Funcionario, treinamento : Treinamento){
	func = funcionario;
	treino = treinamento;
	if( func.GetNome() != stringNames.fired )
	{
		treino.SetLockEscolha(true);
		janelaEsp = true;
	}
}
function WindowFunction(windowID : int){
	timer.PauseGame();
	GUI.Box (Rect (02,18,396,25), func.GetNome());
	GUI.BeginGroup (Rect (02,25,400,243));
	// ---------------Lado Esquerdo---------------
	GUI.Box (Rect (02,018,198,25), "---Programming Language---");	
	
	if(func.GetL_assembly() == false)
		if (GUI.Button (Rect (02,043,198,25), stringNames.showEsp01)) {
			ExecutaJanelaEsp(stringNames.esp01);
		}
	if(func.GetL_assembly() == true)
		GUI.Box (Rect (02,043,198,25), stringNames.showEsp01);
	
	
	if(func.GetL_csharp() == false)
		if (GUI.Button (Rect (02,068,198,25), stringNames.showEsp02)) {
			ExecutaJanelaEsp(stringNames.esp02);
		}
	if(func.GetL_csharp() == true)
		GUI.Box (Rect (02,068,198,25), stringNames.showEsp02);
	
	
	if(func.GetL_java() == false)
		if (GUI.Button (Rect (02,093,198,25), stringNames.showEsp03)) {
			ExecutaJanelaEsp(stringNames.esp03);
		}
	if(func.GetL_java() == true)
		GUI.Box (Rect (02,093,198,25), stringNames.showEsp03);
	
	
	if(func.GetL_perl() == false)
		if (GUI.Button (Rect (02,118,198,25), stringNames.showEsp04)) {
			ExecutaJanelaEsp(stringNames.esp04);
		}
	if(func.GetL_perl() == true)
		GUI.Box (Rect (02,118,198,25), stringNames.showEsp04);
		
	
	if(func.GetL_ruby() == false)
		if (GUI.Button (Rect (02,143,198,25), stringNames.showEsp05)) {
			ExecutaJanelaEsp(stringNames.esp05);
		}
	if(func.GetL_ruby() == true)
		GUI.Box (Rect (02,143,198,25), stringNames.showEsp05);
		
	GUI.Box (Rect (02,168,198,25), "---Methods---");	
		
	if(func.GetM_agil() == false)	
		if (GUI.Button (Rect (02,193,198,25), stringNames.showEsp06)) {
			ExecutaJanelaEsp(stringNames.esp06);
		}
	if(func.GetM_agil() == true)
		GUI.Box (Rect (02,193,198,25), stringNames.showEsp06);	
		
		
	if(func.GetM_classico() == false)	
		if (GUI.Button (Rect (02,218,198,25), stringNames.showEsp07)) {
			ExecutaJanelaEsp(stringNames.esp07);
		}
	if(func.GetM_classico() == true)	
		GUI.Box (Rect (02,218,198,25), stringNames.showEsp07);
	
	
	// ---------------Lado Direito---------------

	GUI.Box (Rect (200,018,198,25), "---Tools---");
	
	if(func.GetF_programas() == false)
		if (GUI.Button (Rect (200,043,198,25), stringNames.showEsp08)) {
			ExecutaJanelaEsp(stringNames.esp08);
		}
	if(func.GetF_programas() == true)
		GUI.Box (Rect (200,043,198,25), stringNames.showEsp08);	
		
	if(func.GetF_versao() == false)	
		if (GUI.Button (Rect (200,068,198,25), stringNames.showEsp09)) {
			ExecutaJanelaEsp(stringNames.esp09);
		}
	if(func.GetF_versao() == true)	
		GUI.Box (Rect (200,068,198,25), stringNames.showEsp09);	
		
		
	if(func.GetF_depuracao() == false)	
		if (GUI.Button (Rect (200,093,198,25), stringNames.showEsp10)) {
			ExecutaJanelaEsp(stringNames.esp10);
		}
	if(func.GetF_depuracao() == true)
		GUI.Box (Rect (200,093,198,25), stringNames.showEsp10);	
	
	
	if(func.GetF_projetos() == false)	
		if (GUI.Button (Rect (200,118,198,25), stringNames.showEsp11)) {
			ExecutaJanelaEsp(stringNames.esp11);
		}
	if(func.GetF_projetos() == true)	
		GUI.Box (Rect (200,118,198,25), stringNames.showEsp11);	
	
	
	if(func.GetF_metricas() == false)	
		if (GUI.Button (Rect (200,143,198,25), stringNames.showEsp12)) {
			ExecutaJanelaEsp(stringNames.esp12);
		}
	if(func.GetF_metricas() == true)	
		GUI.Box (Rect (200,143,198,25), stringNames.showEsp12);	
	
	
	if(func.GetF_planejamento() == false)	
		if (GUI.Button (Rect (200,168,198,25), stringNames.showEsp13)) {
			ExecutaJanelaEsp(stringNames.esp13);
		}
	if(func.GetF_planejamento() == true)
		GUI.Box (Rect (200,168,198,25), stringNames.showEsp13);	
	
	
	if(func.GetF_teste() == false)	
		if (GUI.Button (Rect (200,193,198,25), stringNames.showEsp14)) {
			ExecutaJanelaEsp(stringNames.esp14);
		}
	if(func.GetF_teste() == true)	
		GUI.Box (Rect (200,193,198,25), stringNames.showEsp14);
	
	//Botao de Cancel
	if (GUI.Button (Rect (200,218,198,25), "Cancel")) {
		janelaEsp  = false;
		treino.SetLockEscolha(false);
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
	if(janelaEsp)
		windowRect = GUI.Window (0, windowRect, WindowFunction, ("Especializations / Price: " +PRECO) );
}
