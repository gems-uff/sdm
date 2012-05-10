//Este script tem apenas um proposito, exibir a janela com os dados do projeto
//Para usar este scrip precisa de:
//private var projectW : ProjectWindow;
//projectW = GetComponentInChildren(ProjectWindow);



private var project : Project;
private var timerObj : GameObject;
public var timer : GameTime;
private var showWindow : boolean = false;
private var showCloseButton : boolean = true;
//Variavel do Style da GUI
public var customGuiStyle : GUIStyle;
private var windowRect : Rect = Rect (700,125,300,395);

//Funcao que permite a exibicao da janela com os dados do projeto
function SetShowWindow(projectShow : Project, closeButton : boolean){
	showCloseButton = closeButton;
	project = projectShow;
	showWindow = true;
}
function DisableShowWindow(){
	showWindow = false;
}
function WindowFunction(windowID : int){
	timer.PauseGame();
	GUI.Box (Rect (02,018,296,350), 
	("\n\t" + project.GetNome() + "\n" +
	"\n\tDescription: " + project.GetDescription() + "\n\n" +
	"\tComplexity: " + project.GetProjectSizeString() + "\n" +
	"\tQuality: " + project.GetProjectQuality() + "\n" +
	"\tDeadline: " + project.GetDeadLine() + "\n"+ 
	"\tPrograming Language: " + project.GetLinguagem() + "\n" +
	"\tMonthly Payment: " + project.GetPagamento() + "\n" +
	"\tFinal Payment: " + project.GetPagamento()*4), customGuiStyle);
	if(showCloseButton)
		if (GUI.Button (Rect (02,368,296,25), "Close Window")) 
		{
			showWindow = false;
		}
}
//--------------------------------------------OnGUI-----------------------------------------------------------

function OnGUI () {
	if(showWindow)
		windowRect = GUI.Window (4, windowRect, WindowFunction, "Project Details");
}