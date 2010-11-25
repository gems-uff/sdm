	
	var timepaused				: boolean = false;
	var ingameMenuToggle 	: boolean = false;
	//var helpMenuToggle 		: boolean = false;
	//var scoreboardToggle		: boolean = false;
	var janelatributo				:boolean = false;
	var escolhapapel				:boolean = false;
	
	var icon : Texture2D;

	var timeText = "";
	var deadlineText = "";
	var bugsText = "";
	var completedText = "";
	var sincronismoText = "";
	
	//Variaveis para os atributos do funcionario corrente
	var adaptabilidade = 0;
	var autoDitada = 0;
	var detalhista = 0;
	var negociacao = 0;
	var objetividade = 0;
	var organizacao = 0;
	var paciencia = 0;
	var raciocinioLogico =0;
	var relacionamentoHumano = 0;
	var papel = "";
	
	var project : Project;

	
	function PapelToString(t: int)
	{
	
	}
	
	//Funcao que seta os atributos do funcionario corrente, chamada pelo script DialogInstance, item Qualificacao. Primeiro atributo eh para abilitar a janela, os demais sao os atributos em ordem alfabetica
	function SetJanelatributo(t : boolean, a1 : int, a2 : int, a3 : int, a4 : int, a5 : int, a6 : int, a7 : int, a8 : int, a9 : int, a10 : String)
	{
		janelatributo = t;
		adaptabilidade = a1;
		autoDitada = a2;
		detalhista = a3;
		negociacao = a4;
		objetividade = a5;
		organizacao = a6;
		paciencia = a7;
		raciocinioLogico =a8;
		relacionamentoHumano = a9;
		papel = a10;
	}
	
	function Awake () {
		project = GetComponentInChildren(Project);
	}

	function Update()
	{
		if (Input.GetKeyDown (KeyCode.Escape ))
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
	
	function EscapePressed()
	{
		//if (!ingameMenuToggle && !helpMenuToggle && !scoreboardToggle)
		if (!ingameMenuToggle)
		{
			ingameMenuToggle = true;
			Screen.lockCursor = false;
			Time.timeScale = 0 ;	// pauze
		}
		
		else 
		{
			Screen.lockCursor = true;
			ingameMenuToggle = false;
			//helpMenuToggle = false;
			//scoreboardToggle = false;
			Time.timeScale = 1 ;	// unPause,
		}
	}
	
	

	function OnGUI ()
	{
		GUI.Box (Rect (00,00,90,25), "Time");
		GUI.Box (Rect (00,25,90,25), "Deadline");
		GUI.Box (Rect (00,50,90,25), "% concluido");
		GUI.Box (Rect (00,75,90,25), "# bugs");
		GUI.Box (Rect (00,100,90,25), "Sincronismo");
		
		if (GUI.Button (Rect (00,125, 130, 20), "Game Speed: x1")) {
					Time.timeScale = 1 ;
		}
		if (GUI.Button (Rect (00,150, 130, 20), "Game Speed: x2")) {
					Time.timeScale = 2 ;
		}
		if (GUI.Button (Rect (00,175, 130, 20), "Game Speed: x4")) {
					Time.timeScale = 4 ;
		}
		if (GUI.Button (Rect (00,200, 130, 20), "Game Speed: x8")) {
					Time.timeScale = 8 ;
		}
	
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
		
		//Main Menu
		if (ingameMenuToggle)	
		{
		//Work-around: Need to check why dont work !
			if (GUI.Button (Rect (Screen.width - 100,0,100,50), icon)) {
					print ("Made with Unity 3d");
			}

			if (GUI.Button (Rect (Screen.width - 100,50, 100, 20), "1: Quit to Menu")) {
					Application.LoadLevel ("StartMenu");
			}
			if (Input.GetKeyDown("1")){
				Application.LoadLevel ("StartMenu");
			}
			if (Input.GetKeyDown("2")){
				ingameMenuToggle = false ;
				Time.timeScale = 1 ;
				Screen.lockCursor = true;
			}
			if (GUI.Button( Rect (Screen.width - 100,70,100,20), "2: Resume game") )
			{
				ingameMenuToggle = false ;
				Time.timeScale = 1 ;
				Screen.lockCursor = true;

			}
		}
		timeText = project.GetTime().ToString();
		deadlineText = project.GetDeadLine().ToString();
		bugsText = parseInt(project.GetNumBugs()).ToString();							//parseint para converter o float para inteiro
		completedText = (project.GetNumLinesDone().ToString() + " %");
		sincronismoText = (parseInt(project.GetSincronismo()).ToString() + " %");	//parseint para converter o float para inteiro
		timeText = GUI.TextField (Rect (92,00,120,25), timeText);
		deadlineText = GUI.TextField (Rect (92,25,120,25), deadlineText);
		completedText = GUI.TextField (Rect (92,50,120,25), completedText);
		bugsText = GUI.TextField (Rect (92,75,120,25), bugsText);
		sincronismoText = GUI.TextField (Rect (92,100,120,25), sincronismoText);

		//Janela das fichas dos funcionarios
		if(!janelatributo)
		{
			GUI.Box (Rect (250,150,300,25), ("Adaptabilidade: "+ adaptabilidade));
			GUI.Box (Rect (250,175,300,25), ("AutoDitada: "+ autoDitada));
			GUI.Box (Rect (250,200,300,25), ("Detalhista: "+ detalhista));
			GUI.Box (Rect (250,225,300,25), ("Negociacao: "+ negociacao));
			GUI.Box (Rect (250,250,300,25), ("Objetividade: "+ objetividade));
			GUI.Box (Rect (250,275,300,25), ("Organizacao: "+ organizacao));
			GUI.Box (Rect (250,300,300,25), ("Paciencia: "+ paciencia));
			GUI.Box (Rect (250,325,300,25), ("RaciocinioLogico: "+ raciocinioLogico));
			GUI.Box (Rect (250,350,300,25), ("RelacionamentoHumano: "+ relacionamentoHumano));
			GUI.Box (Rect (250,375,300,25), ("Papel: "+ papel));
			if (GUI.Button (Rect (250,400,300,25), "Close Window")) 
			{
							janelatributo  = true;
			}
		}
	}

	