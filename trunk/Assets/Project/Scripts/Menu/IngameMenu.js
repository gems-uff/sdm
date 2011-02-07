	
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
	
	public var atributos : Atributos = new Atributos();
	
	private var project : Project;
	private var playerstats : PlayerStats;


	//Funcao que seta os atributos do funcionario corrente, chamada pelo script DialogInstance, item Qualificacao. Primeiro atributo eh para abilitar a janela, os demais sao os atributos em ordem alfabetica
	function SetJanelatributo(t : boolean, a1 : Atributos )
	{
		janelatributo = t;
		atributos = a1;
	}
	
	//Funcao que exibe na tela os status do funcionario
	function MostraJanelaFunc()
	{
		if(!janelatributo)
			{
				GUI.Box (Rect (250,125,300,25), ("Mesa: "+ atributos.nummesa));
				GUI.Box (Rect (250,150,300,25), ("Adaptabilidade: "+ atributos.adaptabilidade));
				GUI.Box (Rect (250,175,300,25), ("AutoDitada: "+ atributos.autoDitada));
				GUI.Box (Rect (250,200,300,25), ("Detalhista: "+ atributos.detalhista));
				GUI.Box (Rect (250,225,300,25), ("Negociacao: "+ atributos.negociacao));
				GUI.Box (Rect (250,250,300,25), ("Objetividade: "+ atributos.objetividade));
				GUI.Box (Rect (250,275,300,25), ("Organizacao: "+ atributos.organizacao));
				GUI.Box (Rect (250,300,300,25), ("Paciencia: "+ atributos.paciencia));
				GUI.Box (Rect (250,325,300,25), ("RaciocinioLogico: "+ atributos.raciocinioLogico));
				GUI.Box (Rect (250,350,300,25), ("RelacionamentoHumano: "+ atributos.relacionamentoHumano));
				GUI.Box (Rect (250,375,300,25), ("Papel: "+ atributos.papel));
				GUI.Box (Rect (250,400,300,25), ("Salario: "+ atributos.salario));
				if (GUI.Button (Rect (250,425,300,25), "Close Window")) 
				{
								janelatributo  = true;
				}
			}
	}
	
	//Funcao que exibe os detalhes do andamento do projeto na HUD
	function StatusProjeto()
	{
		GUI.Box (Rect (00,00,90,25), "Saldo");
		GUI.Box (Rect (00,25,90,25), "Time");
		GUI.Box (Rect (00,50,90,25), "Deadline");
		GUI.Box (Rect (00,75,90,25), "% concluido");
		GUI.Box (Rect (00,100,90,25), "# bugs");
		GUI.Box (Rect (00,125,90,25), "Sincronismo");
		
		saldoText = playerstats.GetSaldo().ToString();
		timeText = project.GetTime().ToString();
		deadlineText = project.GetDeadLine().ToString();
		bugsText = parseInt(project.GetNumBugs()).ToString();							//parseint para converter o float para inteiro
		completedText = (project.GetNumLinesDone().ToString() + " %");
		sincronismoText = (parseInt(project.GetSincronismo()).ToString() + " %");	//parseint para converter o float para inteiro
		
		saldoText = GUI.TextField (Rect (92,00,120,25), saldoText);
		timeText = GUI.TextField (Rect (92,25,120,25), timeText);
		deadlineText = GUI.TextField (Rect (92,50,120,25), deadlineText);
		completedText = GUI.TextField (Rect (92,75,120,25), completedText);
		bugsText = GUI.TextField (Rect (92,100,120,25), bugsText);
		sincronismoText = GUI.TextField (Rect (92,125,120,25), sincronismoText);
	}
	
	//Funcao da Main Menu
	function MainMenu()
	{
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
				Time.timeScale = 1 ;
				Screen.lockCursor = true;

			}
		}
	}
	
	//Funcao que permite alterar o gamespeed do jogo
	function GameSpeed()
	{
		if (GUI.Button (Rect (00,150, 130, 20), "Game Speed: x1")) {
					Time.timeScale = 1 ;
		}
		if (GUI.Button (Rect (00,175, 130, 20), "Game Speed: x2")) {
					Time.timeScale = 2 ;
		}
		if (GUI.Button (Rect (00,200, 130, 20), "Game Speed: x4")) {
					Time.timeScale = 4 ;
		}
		if (GUI.Button (Rect (00,225, 130, 20), "Game Speed: x8")) {
					Time.timeScale = 8 ;
		}
	}
	
	//Funcao que exibe o resultado de conclusao do projeto
	function ProjetoTermina()
	{
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
	
	//Funcao que captura quando a tecla ESC eh precionada
	function EscapePressed()
	{
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
			Time.timeScale = 1 ;	// unPause,
		}
	}
	
	
	function Awake () 
	{
		project = GetComponentInChildren(Project);
		playerstats = GetComponentInChildren(PlayerStats);
	}

//Funcao da unity de updates
	function Update()
	{
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
	

//Funcao da unity para a GUI
	function OnGUI ()
	{
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
	}

	