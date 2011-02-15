
private var TIMESCALE : float = 0.5;
public var timepaused				: boolean = false;
public var ingameMenuToggle 	: boolean = false;
//var helpMenuToggle 		: boolean = false;
//var scoreboardToggle		: boolean = false;
public var janelatributo				:boolean = false;
public var escolhapapel				:boolean = false;

public var icon : Texture2D;

private var saldoText = "";
private var timeText = "";
private var deadlineText = "";
private var bugsText = "";
private var completedText = "";
private var sincronismoText = "";
private var reqlingText = "";
private var reqmetText = "";
private var especializacao_array = new Array(17);

public var atributos : Atributos = new Atributos();
private var mesa : int;

private var equipeObj : GameObject;
private var equipe : Equipe;
private var project : Project;
private var playerstats : PlayerStats;

private var listEntry = 0;
private var list : GUIContent[];
private var listStyle : GUIStyle;
private var showList = false;

//--------------------------------------------FichaFuncionarioEspecializacao-----------------------------------------------------------

//Funcao que seta os atributos do funcionario corrente, chamada pelo script DialogInstance, item Qualificacao. Primeiro atributo eh para abilitar a janela, os demais sao os atributos em ordem alfabetica
function SetJanelatributo(t : boolean, a1 : Atributos, a2 : Especializacoes, numMesa : int ){
	var i : int = 0;
	mesa = numMesa;
	janelatributo = t;
	atributos = a1;
	
	for (i=0;i<=17;i++)
		especializacao_array[i]  = "";
	
	i = 0;
	if ( a2.assembly == true )
	{
		especializacao_array[i] = "Assembly";
		i++;
	}
	if ( a2.csharp == true )
	{
		especializacao_array[i] = "Csharp";
		i++;
	}
	if ( a2.java == true )
	{
		especializacao_array[i] = "Java";
		i++;
	}
	if ( a2.perl == true )
	{
		especializacao_array[i] = "Perl";
		i++;
	}
	if ( a2.ruby == true )
	{
		especializacao_array[i] = "Ruby";
		i++;
	}
	if ( a2.metodoAgil == true )
	{
		especializacao_array[i] = "Metodo Agil";
		i++;
	}
	if ( a2.metodoClassico == true )
	{
		especializacao_array[i] = "Metodo Classico";
		i++;
	}
	if ( a2.desenvolvimentoAgil == true )
	{
		especializacao_array[i] = "Desen. Agil";
		i++;
	}
	if ( a2.desenvolvimentoEvolutivo == true )
	{
		especializacao_array[i] = "Desen. Evolutivo";
		i++;
	}
	if ( a2.desenvolvimentoIterativo == true )
	{
		especializacao_array[i] = "Desen. Iterativo";
		i++;
	}
	if ( a2.analiseDeProgramas == true )
	{
		especializacao_array[i] = "An. de Programas";
		i++;
	}
	if ( a2.controleDeVersao == true )
	{
		especializacao_array[i] = "Contr. de Versao";
		i++;
	}
	if ( a2.depuracao == true )
	{
		especializacao_array[i] = "Depuracao";
		i++;
	}
	if ( a2.gerenciaDeProjetos == true )
	{
		especializacao_array[i] = "Ger. de Projetos";
		i++;
	}
	if ( a2.metricas == true )
	{
		especializacao_array[i] = "Metricas";
		i++;
	}
	if ( a2.planejamento == true )
	{
		especializacao_array[i] = "Planejamento";
		i++;
	}
	if ( a2.teste == true )
	{
		especializacao_array[i] = "Teste";
		i++;
	}
}

//--------------------------------------------FichaFuncionario-----------------------------------------------------------

//Funcao que exibe na tela os status do funcionario
function MostraJanelaFunc()	{
	if(!janelatributo)
	{
		GUI.BeginGroup(Rect (350,125,750,350));
		//Lado esquerdo
		GUI.Box (Rect (0,0,200,25), ("Mesa: "+ mesa));
		GUI.Box (Rect (0,25,200,25), ("Adaptabilidade: "+ atributos.adaptabilidade));
		GUI.Box (Rect (0,50,200,25), ("AutoDitada: "+ atributos.autoDitada));
		GUI.Box (Rect (0,75,200,25), ("Detalhista: "+ atributos.detalhista));
		GUI.Box (Rect (0,100,200,25), ("Negociacao: "+ atributos.negociacao));
		GUI.Box (Rect (0,125,200,25), ("Objetividade: "+ atributos.objetividade));
		//Lado direito
		GUI.Box (Rect (200,0,200,25), ("Organizacao: "+ atributos.organizacao));
		GUI.Box (Rect (200,25,200,25), ("Paciencia: "+ atributos.paciencia));
		GUI.Box (Rect (200,50,200,25), ("RaciocinioLogico: "+ atributos.raciocinioLogico));
		GUI.Box (Rect (200,75,200,25), ("RelacionamentoHumano: "+ atributos.relacionamentoHumano));
		GUI.Box (Rect (200,100,200,25), ("Papel: "+ atributos.papel));
		GUI.Box (Rect (200,125,200,25), ("Salario: "+ atributos.salario));
		//Embaixo dos atributos
		GUI.Box (Rect (0,150,400,25), ("---------------------------------- Especialidades ----------------------------------"));
		GUI.Box (Rect (0,175,400,25), (especializacao_array[0].ToString()+ "    " + especializacao_array[1].ToString() + "    " + especializacao_array[2].ToString()));
		GUI.Box (Rect (0,200,400,25), (especializacao_array[3].ToString()+ "    " + especializacao_array[4].ToString() + "    " + especializacao_array[5].ToString()));
		GUI.Box (Rect (0,225,400,25), (especializacao_array[6].ToString()+ "    " + especializacao_array[7].ToString() + "    " + especializacao_array[8].ToString()));
		GUI.Box (Rect (0,250,400,25), (especializacao_array[9].ToString()+ "    " + especializacao_array[10].ToString() + "    " + especializacao_array[11].ToString()));
		GUI.Box (Rect (0,275,400,25), (especializacao_array[12].ToString()+ "    " + especializacao_array[13].ToString() + "    " + especializacao_array[14].ToString()));
		GUI.Box (Rect (0,300,400,25), (especializacao_array[15].ToString()+ "    " + especializacao_array[16].ToString() + "    " + especializacao_array[17].ToString()));
		
		if (GUI.Button (Rect (0,325,400,25), "Close Window")) 
		{
			janelatributo  = true;
		}
		GUI.EndGroup ();
	}
}

//--------------------------------------------StatusProj-----------------------------------------------------------

//Funcao que exibe os detalhes do andamento do projeto na HUD
function StatusProjeto()	{
	saldoText = playerstats.GetSaldo().ToString();
	timeText = project.GetTime().ToString();
	deadlineText = project.GetDeadLine().ToString();
	bugsText = parseInt(project.GetNumBugs()).ToString();							//parseint para converter o float para inteiro
	completedText = (project.GetNumLinesDone().ToString() + " %");
	sincronismoText = (parseInt(project.GetSincronismo()).ToString() + " %");	//parseint para converter o float para inteiro
	reqlingText = project.GetLinguagem ();
	reqmetText = project.GetMetodo ();
	
	GUI.BeginGroup(Rect (00,00,220,200));
	GUI.Box (Rect (00,00,90,25), "Saldo");
	GUI.Box (Rect (00,25,90,25), "Time");
	GUI.Box (Rect (00,50,90,25), "Deadline");
	GUI.Box (Rect (00,75,90,25), "% concluido");
	GUI.Box (Rect (00,100,90,25), "# bugs");
	GUI.Box (Rect (00,125,90,25), "Sincronismo");
	GUI.Box (Rect (00,150,90,25), "Req. Codigo");
	GUI.Box (Rect (00,175,90,25), "Req. Metodo");
	
	GUI.Box (Rect (90,00,130,25), saldoText);
	GUI.Box (Rect (90,25,130,25), timeText);
	GUI.Box (Rect (90,50,130,25), deadlineText);
	GUI.Box (Rect (90,75,130,25), completedText);
	GUI.Box (Rect (90,100,130,25), bugsText);
	GUI.Box (Rect (90,125,130,25), sincronismoText);
	GUI.Box (Rect (90,150,130,25), reqlingText);
	GUI.Box (Rect (90,175,130,25), reqmetText);
	GUI.EndGroup ();
}

//--------------------------------------------MetogologiaEquipe-----------------------------------------------------------

//Implementar para permitir alteracao na metodologia

function MostraMetodologia(){
	GUI.BeginGroup(Rect (00,200,220,75));
	GUI.Box (Rect (00,00,130,25), "Metogologia Equipe: "); //+ equipe.GetMetodologia())
	if (Popup.List (Rect(130, 00, 90, 25), showList, listEntry, GUIContent( equipe.GetMetodologia()), list, listStyle)) {
		if (listEntry != 0)
		{
			switch(listEntry)
			{
			   case 1: 	//caso Agil
					equipe.SetMetodologia("Agil");
			   break;
			   
			   case 2: 	//caso Classico
					equipe.SetMetodologia("Classico");
			   break;
			   
			   default:
				break;
			}
		}
	}
	GUI.EndGroup ();
	
}

//--------------------------------------------Gamespeed-----------------------------------------------------------

//Funcao que permite alterar o gamespeed do jogo
function GameSpeed()	{
	GUI.BeginGroup(Rect (00,225,130,120));
	if (GUI.Button (Rect (00,00, 130, 20), "Pause Game")) {
				Time.timeScale = 0 ;
	}
	if (GUI.Button (Rect (00,25, 130, 20), "Game Speed: x1")) {
				Time.timeScale = TIMESCALE ;
	}
	if (GUI.Button (Rect (00,50, 130, 20), "Game Speed: x2")) {
				Time.timeScale = TIMESCALE * 2 ;
	}
	if (GUI.Button (Rect (00,75, 130, 20), "Game Speed: x4")) {
				Time.timeScale = TIMESCALE * 4 ;
	}
	if (GUI.Button (Rect (00,100, 130, 20), "Game Speed: x8")) {
				Time.timeScale = TIMESCALE * 8 ;
	}
	GUI.EndGroup ();
}

//--------------------------------------------ESCPressed-----------------------------------------------------------

//Funcao que captura quando a tecla ESC eh precionada
function EscapePressed()	{
	if (!ingameMenuToggle)	//Se Menu aberto entao pausa
	{
		ingameMenuToggle = true;
		Screen.lockCursor = false;
		Time.timeScale = 0 ;	// pauze
	}
	
	else //Senao despausa
	{
		Screen.lockCursor = true;
		ingameMenuToggle = false;
		//helpMenuToggle = false;
		//scoreboardToggle = false;
		Time.timeScale = TIMESCALE ;	// unPause,
	}
}

//--------------------------------------------MainMenu-----------------------------------------------------------

//Funcao da Main Menu
function MainMenu(){
	if (ingameMenuToggle)	
	{
	//Work-around: Need to check why dont work !
		if (GUI.Button (Rect (Screen.width - 100,0,100,50), icon)) {
				print ("Made with Unity 3d");
		}

		if (GUI.Button (Rect (Screen.width - 100,50, 100, 20), "1: Quit")) {
				Application.LoadLevel ("StartMenu");
		}
		if (GUI.Button (Rect (Screen.width - 100,70, 100, 20), "2: Help")) {
				//Fazer o Help
		}
		/*
		if (Input.GetKeyDown("1")){
			Application.LoadLevel ("StartMenu");
		}
		if (Input.GetKeyDown("2")){
			ingameMenuToggle = false ;
			Time.timeScale = 1 ;
			Screen.lockCursor = true;
		}
		*/
		if (GUI.Button( Rect (Screen.width - 100,90,100,20), "3: Resume") )
		{
			ingameMenuToggle = false ;
			Time.timeScale = TIMESCALE ;
			Screen.lockCursor = true;

		}
	}
}

//--------------------------------------------FimdeProjeto-----------------------------------------------------------

//Funcao que exibe o resultado de conclusao do projeto
function ProjetoTermina()	{
	if((project.GetTimePassed() > project.GetDeadlineHours()))		//Tela que Deadline Expiro
	{
		GUI.Box (Rect (250,150,90,25), "Fim do Prazo !");
			if((project.GetTimePassed() > project.GetDeadlineHours()) && !(project.GetIscomplete()))		//Se passo do prazo e nao foi terminado, seta como terminado
			{
				project.SetIscomplete(true);
			}
	}
	
	if((project.GetNumLinesDone() >= 100))							//Tela que projeto foi concluido a tempo
	{
		project.SetIscomplete(true);
		GUI.Box (Rect (250,150,90,25), "PARABENS !");
	}
}

//--------------------------------------------Awake-----------------------------------------------------------

function Awake () {
	equipeObj = GameObject.Find("Equipe");
	equipe = equipeObj.GetComponent(Equipe);
	project = GetComponentInChildren(Project);
	playerstats = GetComponentInChildren(PlayerStats);
	Time.timeScale = TIMESCALE;
}

//--------------------------------------------Start-----------------------------------------------------------

//Funcao que cria a lista para selecao de papel e visualizacao da ficha do funcionario
function Start () {
    // Make some content for the popup list
    list = new GUIContent[3];
	list[0] = new GUIContent("");
	list[1] = new GUIContent("Agil");
	list[2] = new GUIContent("Classico");
    
    // Make a GUIStyle that has a solid white hover/onHover background to indicate highlighted items
    listStyle = new GUIStyle();
    listStyle.normal.textColor = Color.green;
    var tex = new Texture2D(2, 2);
    listStyle.hover.background = tex;
    listStyle.onHover.background = tex;
    listStyle.padding.left = listStyle.padding.right = listStyle.padding.top = listStyle.padding.bottom = 4;
}
//--------------------------------------------Update-----------------------------------------------------------

//Funcao da unity de updates
function Update(){
	if (Input.GetKeyDown (KeyCode.Escape )) //Se pressiono ESC
	{
		EscapePressed();
	}
	/*if (Input.GetButtonDown ("Helpmenu")) // Helpmenu == H button in key setup
	{
		HelpMenuCall();
	}
	
	if (Input.GetButtonDown ("scoreboard")) // Helpmenu == tab button in key setup
	{
		ScoreBoardCall();
	}*/
	
}
	

//--------------------------------------------OnGUI-----------------------------------------------------------

//Funcao da unity para a GUI
function OnGUI (){
	//Exibe o Main Menu
	MainMenu();
	//Exibe a janela de status do projeto
	StatusProjeto();
	//MenuGamespeed
	GameSpeed();
	//Janela das fichas dos funcionarios
	MostraJanelaFunc();
	//Conclusão de projeto
	ProjetoTermina();
	//Exibe a metogologia da equipe
	MostraMetodologia();
}

	