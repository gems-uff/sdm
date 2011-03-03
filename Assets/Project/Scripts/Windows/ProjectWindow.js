//Este script tem apenas um proposito, exibir a janela com os dados do projeto
//Para usar este scrip precisa de:
//private var projectW : ProjectWindow;
//projectW = GetComponentInChildren(ProjectWindow);



public var project : Project;
private var timerObj : GameObject;
public var timer : GameTime;
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
	var projectSize = project.GetProjectSizeString();
	timer.PauseGame();
	GUI.Box (Rect (02,018,296,350), 
	("\t<Fazer descricao> \n \n" +
	" Size: " + projectSize + "\n" +
	" Deadline: " + deadline + "\n"+ 
	" Programing Language: " + linguagem + "\n" +
	" Monthly Payment: " + pagamento +
	"\n Final Payment: " + pagamento*4 +
	"\n\n\n\n PS: The last payment value can change due to the project quality."), customGuiStyle);
	
	if (GUI.Button (Rect (02,368,296,25), "Close Window")) 
	{
		showWindow = false;

	}
}

//--------------------------------------------Awake-----------------------------------------------------------

function Awake () {

}

//--------------------------------------------OnGUI-----------------------------------------------------------

function OnGUI () {
	if(showWindow)
		windowRect = GUI.Window (4, windowRect, WindowFunction, "Project Details");
}