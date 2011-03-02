//Para usar este scrip:
//private var workHoursObj : GameObject;
//private var workHours : WorkingHoursWindow;
//workHoursObj = GameObject.Find("GUI");
//workHours = workHoursObj.GetComponent(WorkingHoursWindow);
//workHours.ChangeWorkHours(func);

private var func : Funcionario;
private var timerObj : GameObject;
private var timer : GameTime;
private var windowRect : Rect = Rect (700,325,300,120);
private var hSliderValue : float = 8.0;
private var showWindow : boolean = false;

function ChangeWorkHours (funcionario : Funcionario){
	func = funcionario;
	showWindow = true;
}

function WindowFunction(windowID : int){
	var aux : int;
	timer.PauseGame();
	GUI.Box (Rect (02,18,296,25), func.GetNome());
	hSliderValue = GUI.HorizontalSlider (Rect (022, 75, 246, 25), hSliderValue, 0.0, 16.0);
	aux = parseInt(hSliderValue);
	aux = aux * 5;
	GUI.Box (Rect (02,043,296, 25), "Weekly: " + aux);
	func.SetWorkingHours(aux);	
	//Botao de Cancel
	if (GUI.Button (Rect (02,93,296,25), "Close")) {
		showWindow  = false;
		//timer.SpeedNormal();
	}
}


//--------------------------------------------Awake-----------------------------------------------------------

function Awake () {
	timerObj = GameObject.Find("Timer");
	timer = timerObj.GetComponent(GameTime);
}

function OnGUI () {
	if (showWindow)
		windowRect = GUI.Window (6, windowRect, WindowFunction, "Working Hours");
}