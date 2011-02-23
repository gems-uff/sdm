//Para usar este script:
//private var menuObj : GameObject;
//private var menuPapel : PapelWindow;
//menuObj = GameObject.Find("GUI");
//menuPapel = menuObj.GetComponent(PapelWindow);
//menuPapel.MudarPapel(func);

//Usa Time.timeScale = 0.5;

private var func : Funcionario;

private var janelaPapel : boolean = false;

function ExecutaJanelaPapel(t : String){
	func.SetPapel(t);
	janelaPapel  = false;
}

function MudarPapel (funcionario : Funcionario){
	func = funcionario;
	janelaPapel = true;
	Time.timeScale = 0.5;
}
function Janela_Papel(){
	if(janelaPapel)
	{
		Time.timeScale = 0.0;
		GUI.BeginGroup(Rect (425,325,400,225));
		
		GUI.Box (Rect (00,00,200,25), "----Papeis----");	
		//---------------------------------------------------------------------------------------------------------------------
		if(func.GetPapel() != "Analista")
			if (GUI.Button (Rect (00,25,200,25), "Analista")) {
				ExecutaJanelaPapel("Analista");
			}
		if(func.GetPapel() == "Analista")
			GUI.Box (Rect (00,25,200,25), "Analista");
		
		//---------------------------------------------------------------------------------------------------------------------
		if(func.GetPapel() != "Arquiteto")
			if (GUI.Button (Rect (00,50,200,25), "Arquiteto")) {
				ExecutaJanelaPapel("Arquiteto");
			}
		if(func.GetPapel() == "Arquiteto")
			GUI.Box (Rect (00,50,200,25), "Arquiteto");
		
		//---------------------------------------------------------------------------------------------------------------------
		if(func.GetPapel() != "Gerente")
			if (GUI.Button (Rect (00,75,200,25), "Gerente")) {
				ExecutaJanelaPapel("Gerente");
			}
		if(func.GetPapel() == "Gerente")
			GUI.Box (Rect (00,75,200,25), "Gerente");
		
		//---------------------------------------------------------------------------------------------------------------------
		if(func.GetPapel() != "Marketing")
			if (GUI.Button (Rect (00,100,200,25), "Marketing")) {
				ExecutaJanelaPapel("Marketing");
			}
		if(func.GetPapel() == "Marketing")
			GUI.Box (Rect (00,100,200,25), "Marketing");
			
		//---------------------------------------------------------------------------------------------------------------------
		if(func.GetPapel() != "Programador")
			if (GUI.Button (Rect (00,125,200,25), "Programador")) {
				ExecutaJanelaPapel("Programador");
			}
		if(func.GetPapel() == "Programador")
			GUI.Box (Rect (00,125,200,25), "Programador");
		
		//---------------------------------------------------------------------------------------------------------------------
		if(func.GetPapel() != "Testador")	
			if (GUI.Button (Rect (00,150,200,25), "Testador")) {
				ExecutaJanelaPapel("Testador");
			}
		if(func.GetPapel() == "Testador")
			GUI.Box (Rect (00,150,200,25), "Testador");	
			
		//---------------------------------------------------------------------------------------------------------------------	
		if(func.GetPapel() != "Nenhum")	
			if (GUI.Button (Rect (00,175,200,25), "Nenhum")) {
				ExecutaJanelaPapel("Nenhum");
			}
		if(func.GetPapel() == "Nenhum")	
			GUI.Box (Rect (00,175,200,25), "Nenhum");
		
		//---------------------------------------------------------------------------------------------------------------------
		//Botao de Cancel
		if (GUI.Button (Rect (00,200,200,25), "Cancel")) {
			janelaPapel  = false;
			Time.timeScale = 0.5;
		}
		GUI.EndGroup ();
	}
}

//--------------------------------------------OnGUI-----------------------------------------------------------

//Funcao da lista Popup para cada um das 8 janelas de funcionarios
function OnGUI () {
	GUI.backgroundColor = Color.yellow;
	GUI.backgroundColor = Color.yellow;
	GUI.contentColor = Color.green;
	Janela_Papel();
}