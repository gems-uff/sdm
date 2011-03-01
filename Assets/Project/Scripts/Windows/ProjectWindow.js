//Este script tem apenas um proposito, exibir a janela com os dados do projeto
//Para usar este scrip precisa de:
//private var projectW : ProjectWindow;
//projectW = GetComponentInChildren(ProjectWindow);



private var project : Project;
private var timerObj : GameObject;
private var timer : GameTime;
private var showWindow : boolean = false;
//Variavel do Style da GUI
public var customGuiStyle : GUIStyle;
private var windowRect : Rect = Rect (700,125,300,395);

//Funcao que permite a exibicao da janela com os dados do projeto
function SetShowWindow(){
	showWindow = true;
}

function WindowFunction(windowID : int){
	var deadline = project.GetDeadLine();
	var linguagem = project.GetLinguagem();
	var pagamento = project.GetPagamento();
	timer.PauseGame();
	GUI.Box (Rect (02,018,296,350), 
	("\t<Fazer descricao> \n \n" +
	" Deadline: " + deadline + "\n"+ 
	" Linguagem: " + linguagem + "\n" +
	" Pagamento Mensal: " + pagamento +
	"\n Pagamento de conclusao: " + pagamento*4 +
	"\n\n\n\n PS: O pagamento final pode sofrer variacoes de acordo com o produto entregue."), customGuiStyle);
	
	if (GUI.Button (Rect (02,368,296,25), "Close Window")) 
	{
		showWindow = false;
		//timer.SpeedNormal();
	}
}

//--------------------------------------------Awake-----------------------------------------------------------

function Awake () {
	project = GetComponentInChildren(Project);
	timerObj = GameObject.Find("Timer");
	timer = timerObj.GetComponent(GameTime);
}

//--------------------------------------------OnGUI-----------------------------------------------------------

function OnGUI () {
	if(showWindow)
		windowRect = GUI.Window (4, windowRect, WindowFunction, "Project Details");
}