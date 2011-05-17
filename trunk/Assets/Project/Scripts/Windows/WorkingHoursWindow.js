//Para usar este scrip:
//private var workHoursObj : GameObject;
//private var workHours : WorkingHoursWindow;
//workHoursObj = GameObject.Find("GUI");
//workHours = workHoursObj.GetComponent(WorkingHoursWindow);
//workHours.ChangeWorkHours(func);
public var stringNames : StringNames;
private var func : Funcionario;
public var timer : GameTime;
private var windowRect : Rect = Rect (700,325,300,120);
private var hSliderValue : float = 8.0;
private var showWindow : boolean = false;

private var hSliderValue2 : float = 8.0;
private var barValue : int;
public var func1 : Funcionario;
public var func2 : Funcionario;
public var func3 : Funcionario;
public var func4 : Funcionario;
public var func5 : Funcionario;
public var func6 : Funcionario;
public var func7 : Funcionario;
public var func8 : Funcionario;

function ChangeWorkHours (funcionario : Funcionario){
	func = funcionario;
	hSliderValue = func.GetWorkingHours() / 5;
	if(funcionario.GetNome() != stringNames.fired)
		showWindow = true;
}

function WindowFunction(windowID : int){
	var aux : int;
	timer.PauseGame();
	GUI.Box (Rect (02,18,296,25), func.GetNome());
	//hSliderValue = func.GetWorkingHours() / 5;
	hSliderValue = GUI.HorizontalSlider (Rect (022, 75, 246, 25), hSliderValue, 0.0, 16.0);
	aux = parseInt(hSliderValue);
	aux = aux * 5;
	GUI.Box (Rect (02,043,296, 25), "Weekly: " + aux);
	func.SetWorkingHours(aux);	
	//Botao de Cancel
	if (GUI.Button (Rect (02,93,296,25), "Close")) {
		showWindow  = false;
	}
}

//Função para setar as horas de trabalho de todos os funcionarios
function TeamWorkHoursBar()
{
	GUI.BeginGroup (Rect (900,00,400,300));
	GUI.Box (Rect (00,00,110,20), "Team's Hours");
	hSliderValue2 = GUI.HorizontalSlider (Rect (00, 20, 110, 15), hSliderValue2, 0.0, 16.0);
	barValue = parseInt(hSliderValue2);
	barValue = barValue * 5;
	GUI.Box (Rect (00,35,110, 25), "Weekly: " + barValue);
	if (GUI.Button (Rect (00,60,110,20), "Set")) {
		func1.SetWorkingHours(barValue);
		func2.SetWorkingHours(barValue);
		func3.SetWorkingHours(barValue);
		func4.SetWorkingHours(barValue);
		func5.SetWorkingHours(barValue);
		func6.SetWorkingHours(barValue);
		func7.SetWorkingHours(barValue);
		func8.SetWorkingHours(barValue);
	}
	GUI.EndGroup ();
}
//--------------------------------------------Awake-----------------------------------------------------------

function Awake () {
}

function OnGUI () {
	TeamWorkHoursBar();
	if (showWindow)
		windowRect = GUI.Window (6, windowRect, WindowFunction, "Working Hours");
}