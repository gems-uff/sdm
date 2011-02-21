//Script para escolher o papel para cada funcinario pelo menu de funcionarios na parte superior da HUD. Tambem serve para exibir a ficha dos funcs.
private var TEMPODETREINO : float = 14.0;

private var showList1 = false;	//Showlist para cada mesa
private var showList2 = false;
private var showList3 = false;
private var showList4 = false;
private var showList5 = false;
private var showList6 = false;
private var showList7 = false;
private var showList8 = false;

private var listEntry = 0;
private var list : GUIContent[];
private var listStyle : GUIStyle;

//Declaracao dos objetos de funcionarios e menu
private var funcObj : GameObject; //utilizado de forma geral uma vez que esteja na popup list
private var func1Obj : GameObject; //utilizados para pegar o papel desempenhado para imprimir no menu antes da popup list
private var func2Obj : GameObject;
private var func3Obj : GameObject;
private var func4Obj : GameObject;
private var func5Obj : GameObject;
private var func6Obj : GameObject;
private var func7Obj : GameObject;
private var func8Obj : GameObject;
private var menuObj : GameObject;

private var treino : Treinamento;
private var func : Funcionario;
private var func1 : Funcionario;
private var func2 : Funcionario;
private var func3 : Funcionario;
private var func4 : Funcionario;
private var func5 : Funcionario;
private var func6 : Funcionario;
private var func7 : Funcionario;
private var func8 : Funcionario;
private var menu : IngameMenu;

private var novopapel = "";
private var janelatributo : boolean = true;
private 	var deadlineTreino : float = 0.0;

//-----------------------------------------Funcoes da Popup List--------------------------------------------------------

//Funcao que executa as operacoes quando um item da lista popup eh selecionada
function ExecutaBotaoPopup(t : String, listEntry : int){
	funcObj = GameObject.Find(t);
	func = funcObj.GetComponent(Funcionario);
	treino = funcObj.GetComponent(Treinamento);
	if (listEntry != 0 && listEntry != 1)
	{
		switch(listEntry)
		{
		   case 9: 	//caso treinamento
				if (treino.GetLockEscolha() == false)
				{
					treino.SetLockEscolha(true);
					novopapel = TakePapel(listEntry);
					janelatributo = false;
				}
		   break;
		   
		   case 10: 	//caso ficha
				menu.SetJanelatributo(false, func.GetAtributos(), func.GetEspecializacao(), func.GetNumMesa(), func.GetPapel(),func.GetSalario());
		   break;
		   
		   default:
				if (treino.GetLockEscolha() == false)
				{
					novopapel = TakePapel(listEntry);
					func.SetPapel(novopapel);
				}
			break;
		}
	}
}

//Pega o papel correspondente ao box selecionado
function TakePapel(t: int)
{
	var papel : String;
	switch(t)
		{
		   case 2: 	//caso analista
			  papel = "Analista";
			  return papel;
		   break;
		   case 3:	//caso arquiteto
				papel = "Arquiteto";
				return papel;
		   break;
		   
		   case 4:	//caso gerente
				papel = "Gerente";
				return papel;
		   break;
		   
		   case 5:	//caso marketing
				papel = "Marketing";
				return papel;
		   break;
		   
		   case 6:	//caso programador
				papel = "Programador";
				return papel;
		   break;
		   
		   case 7:	//caso tester
				papel = "Testador";
				return papel;
		   break;
		   
		   case 8:	//caso nenhum papel
				papel = "Nenhum";
				return papel;
		   break;
		   
		   case 9:	//caso treinamento
				papel = "Treinamento";
				return papel;
		   break;

		   default:
				papel = "Nenhum";
				return papel;
			break;

		}
}

function ExecutaJanelaEsp(t : String){
	deadlineTreino = Time.timeSinceLevelLoad  + TEMPODETREINO;
	func.SetPapel(novopapel);
	treino.SetAprendendo(t);
	janelatributo  = true;
}

function Janela_especializacao(){
	if(!janelatributo)
	{
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
			janelatributo  = true;
			treino.SetLockEscolha(false);
		}
		GUI.EndGroup ();
		treino.SetDeadline_Treino(deadlineTreino);
	}
}

//--------------------------------------------PopUpList-----------------------------------------------------------

function PopupList(){
	GUI.BeginGroup(Rect (220,00,480,280));
	if (Popup.List (Rect(00, 00, 120, 20), showList1, listEntry, GUIContent("1: "+ func1.GetPapel()), list, listStyle)) {
		ExecutaBotaoPopup("Funcionario1", listEntry);
    }
	if (Popup.List (Rect(120, 00, 120, 20), showList2, listEntry, GUIContent("2: "+ func2.GetPapel()), list, listStyle)) {
		ExecutaBotaoPopup("Funcionario2", listEntry);
    }
	if (Popup.List (Rect(240, 00, 120, 20), showList3, listEntry, GUIContent("3: "+ func3.GetPapel()), list, listStyle)) {
		ExecutaBotaoPopup("Funcionario3", listEntry);
    }
	if (Popup.List (Rect(360, 00, 120, 20), showList4, listEntry, GUIContent("4: "+ func4.GetPapel()), list, listStyle)) {
		ExecutaBotaoPopup("Funcionario4", listEntry);
    }
	if (Popup.List (Rect(00, 20, 120, 20), showList5, listEntry, GUIContent("5: "+ func5.GetPapel()), list, listStyle)) {
		ExecutaBotaoPopup("Funcionario5", listEntry);
    }
	if (Popup.List (Rect(120, 20, 120, 20), showList6, listEntry, GUIContent("6: "+ func6.GetPapel()), list, listStyle)) {
		ExecutaBotaoPopup("Funcionario6", listEntry);
    }
	if (Popup.List (Rect(240, 20, 120, 20), showList7, listEntry, GUIContent("7: "+ func7.GetPapel()), list, listStyle)) {
		ExecutaBotaoPopup("Funcionario7", listEntry);
    }
	if (Popup.List (Rect(360, 20, 120, 20), showList8, listEntry, GUIContent("8: "+ func8.GetPapel()), list, listStyle)) {
		ExecutaBotaoPopup("Funcionario8", listEntry);
    }
	GUI.EndGroup ();
}

//--------------------------------------------Awake-----------------------------------------------------------

//"inicializa" cada funcionario
function Awake () {
		func1Obj = GameObject.Find("Funcionario1");
		func1 = func1Obj.GetComponent(Funcionario);
		func2Obj = GameObject.Find("Funcionario2");
		func2 = func2Obj.GetComponent(Funcionario);
		func3Obj = GameObject.Find("Funcionario3");
		func3 = func3Obj.GetComponent(Funcionario);
		func4Obj = GameObject.Find("Funcionario4");
		func4 = func4Obj.GetComponent(Funcionario);
		func5Obj = GameObject.Find("Funcionario5");
		func5 = func5Obj.GetComponent(Funcionario);
		func6Obj = GameObject.Find("Funcionario6");
		func6 = func6Obj.GetComponent(Funcionario);
		func7Obj = GameObject.Find("Funcionario7");
		func7 = func7Obj.GetComponent(Funcionario);
		func8Obj = GameObject.Find("Funcionario8");
		func8 = func8Obj.GetComponent(Funcionario);
		menuObj = GameObject.Find("GUI");
		menu = menuObj.GetComponent(IngameMenu);
	}
//--------------------------------------------Start-----------------------------------------------------------

//Funcao que cria a lista para selecao de papel e visualizacao da ficha do funcionario
function Start () {
    // Make some content for the popup list
    list = new GUIContent[11];
	list[0] = new GUIContent("");
	list[1] = new GUIContent("");
    list[2] = new GUIContent("Analista");
    list[3] = new GUIContent("Arquiteto");
    list[4] = new GUIContent("Gerente");
    list[5] = new GUIContent("Marketing");
    list[6] = new GUIContent("Programador");
	list[7] = new GUIContent("Testador");
	list[8] = new GUIContent("Nenhum");
	list[9] = new GUIContent("Treinamento");
	list[10] = new GUIContent("Ficha");
	
    
    // Make a GUIStyle that has a solid white hover/onHover background to indicate highlighted items
    listStyle = new GUIStyle();
    listStyle.normal.textColor = Color.green;
    var tex = new Texture2D(2, 2);
    listStyle.hover.background = tex;
    listStyle.onHover.background = tex;
    listStyle.padding.left = listStyle.padding.right = listStyle.padding.top = listStyle.padding.bottom = 4;
}


//--------------------------------------------OnGUI-----------------------------------------------------------

//Funcao da lista Popup para cada um das 8 janelas de funcionarios
function OnGUI () {
	PopupList();
	GUI.backgroundColor = Color.yellow;
	GUI.backgroundColor = Color.yellow;
	GUI.contentColor = Color.green;
	Janela_especializacao();
}
