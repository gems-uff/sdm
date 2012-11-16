
public var stringNames : StringNames;
private var func : Funcionario;
private var behavior : BehaviorPlanner;
public var timer : GameTime;
public var playStyle : GameplayStyle;
private var windowRect : Rect = Rect (400,125,460,520);
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
	
	behavior = func.GetComponentInChildren(BehaviorPlanner);
	
	hSliderValue = func.GetWorkingHours();
	if(funcionario.GetNome() != stringNames.fired)
		showWindow = true;
}

function WindowFunction(windowID : int){
	var aux : int;
	timer.PauseGame();
	//Working hours
	GUI.Box (Rect (02,18,296,25), func.GetNome());
	hSliderValue = GUI.HorizontalSlider (Rect (022, 75, 246, 25), hSliderValue, 0.0, 16.0);
	aux = parseInt(hSliderValue);
	GUI.Box (Rect (02,043,296, 25), "Daily: " + aux);
	func.SetWorkingHours(aux);
	var saturday : boolean = behavior.GetSaturday();
	var sunday : boolean = behavior.GetSunday();
	
	saturday = GUI.Toggle (Rect (300, 25, 100, 25), saturday, "Saturday");
	if(saturday)
		behavior.SetSaturday(true);
	else
		behavior.SetSaturday(false);
	sunday = GUI.Toggle (Rect (300, 50, 100, 25), sunday, "Sunday");	
	if(sunday)
		behavior.SetSunday(true);
	else
		behavior.SetSunday(false);
	
	//Behavior
	//Programmer
	var progRepair : boolean = behavior.GetProgRepair();
	var progEvolution : boolean = behavior.GetProgEvolution();
	var isPressured : boolean = behavior.GetPressure();
	
	//Architect
	var archVerification : boolean = behavior.GetArchVerification();
	var archEvolution : boolean = behavior.GetArchEvolution();
	var archAnalysis : boolean = behavior.GetArchAnalysis();
	var archRounded : boolean = behavior.GetArchRounded();
	//var archTestCases : String = behavior.GetTestCases();
	var archIntegration : boolean = behavior.CheckTestCase("integration");
	var archSystem : boolean = behavior.CheckTestCase("system");
	var archBoth : boolean = behavior.CheckTestCase("both");
	
	//Analyst
	var anaElicitation : boolean = behavior.GetAnaElicitation();
	var anaEspecification : boolean = behavior.GetAnaEspecification();
	var anaQuality : boolean = behavior.GetAnaQuality();
	var anaRounded : boolean = behavior.GetAnaRounded();
	
	//Manager
	var manAnalysis : boolean = behavior.GetManagerAnalysis();
	var manCodification : boolean = behavior.GetManagerCodification();
	var manQuality : boolean = behavior.GetManagerQuality();
	var manBalanced : boolean = behavior.GetManagerBalanced();
	
	var manAnalyst : boolean = behavior.GetManagerAnalyst();
	var manArchitect : boolean = behavior.GetManagerArchitect();
	var manProgrammer : boolean = behavior.GetManagerProgrammer();
	
	var manAutonomous : boolean = behavior.managerAutonomous;
	var manDecideFocus : boolean = behavior.managerDecideFocus;
	
	
	//Programmer
	GUI.Box (Rect (02,100,210,25), "Programmer task");
	progRepair = GUI.Toggle (Rect (10, 125, 100, 25), progRepair, "Repair");
	if(progRepair)
	{
		progEvolution = false;
		behavior.ActivateProgRepair();
	}
	progEvolution = GUI.Toggle (Rect (10, 150, 100, 25), progEvolution, "Evolution");	
	if(progEvolution)
	{
		progRepair = false;
		behavior.ActivateProgEvolution();
	}
	isPressured = GUI.Toggle (Rect (110, 125, 100, 25), isPressured, "Pressure");
	if(isPressured)
	{
		behavior.SetPressure(true);
	}
	else
	{
		behavior.SetPressure(false);
	}
	//Architect
	GUI.Box (Rect (02,175,210,25), "Architect tasks");
	archVerification = GUI.Toggle (Rect (10, 200, 100, 25), archVerification, "Verification");
	if(archVerification)
	{
		archEvolution = false;
		archAnalysis = false;
		archRounded = false;
		behavior.ActivateArchVerification();
	}
	archEvolution = GUI.Toggle (Rect (10, 225, 100, 25), archEvolution, "Evolution");
	if(archEvolution)
	{
		archVerification = false;
		archAnalysis = false;
		archRounded = false;
		behavior.ActivateArchEvolution();
	}
	
	archAnalysis = GUI.Toggle (Rect (10, 250, 100, 25), archAnalysis, "Analysis");
	if(archAnalysis)
	{
		archEvolution = false;
		archVerification = false;
		archRounded = false;
		behavior.ActivateArchAnalysis();
	}
	archRounded = GUI.Toggle (Rect (10, 275, 100, 25), archRounded, "Balanced");
	if(archRounded)
	{
		archEvolution = false;
		archAnalysis = false;
		archVerification = false;
		behavior.ActivateArchRounded();
	}
	//Test Cases
	GUI.Box (Rect (110, 200, 100, 25), "Test Cases");
	archIntegration = GUI.Toggle (Rect (110, 225, 100, 25), archIntegration, "Integration");
	if(archIntegration)
	{
		archSystem = false;
		archBoth = false;
		behavior.SetTestCases("integration");
	}
	archSystem = GUI.Toggle (Rect (110, 250, 100, 25), archSystem, "System");
	if(archSystem)
	{
		archIntegration = false;
		archBoth = false;
		behavior.SetTestCases("system");
	}
	archBoth = GUI.Toggle (Rect (110, 275, 100, 25), archBoth, "Both");
	if(archBoth)
	{
		archIntegration = false;
		archSystem = false;
		behavior.SetTestCases("both");
	}
	
	//Analyst
	GUI.Box (Rect (02,325,210,25), "Analyst tasks");
	anaElicitation = GUI.Toggle (Rect (10, 350, 100, 25), anaElicitation, "Elicitation");
	if(anaElicitation)
	{
		anaEspecification = false;
		anaQuality = false;
		anaRounded = false;
		behavior.ActivateAnaElicitation();
	}
	anaEspecification = GUI.Toggle (Rect (10, 375, 100, 25), anaEspecification, "Especification");
	if(anaEspecification)
	{
		anaElicitation = false;
		anaQuality = false;
		anaRounded = false;
		behavior.ActivateAnaEspecification();
	}
	
	anaQuality = GUI.Toggle (Rect (10, 400, 100, 25), anaQuality, "Quality");
	if(anaQuality)
	{
		anaElicitation = false;
		anaEspecification = false;
		anaRounded = false;
		behavior.ActivateAnaQuality();
	}
	anaRounded = GUI.Toggle (Rect (10, 425, 100, 25), anaRounded, "Balanced");
	if(anaRounded)
	{
		anaElicitation = false;
		anaEspecification = false;
		anaRounded = false;
		behavior.ActivateAnaRounded();
	}
	
	//Manager
	GUI.Box (Rect (212,100,210,25), "Manager tasks");
	
	//Autonomy
	GUI.Box (Rect (212,125,100,25), "Autonomy");
	manAutonomous = GUI.Toggle (Rect (220, 150, 100, 25), manAutonomous, "Autonomy");
	if(manAutonomous)
	{
		behavior.managerAutonomous = true;
	}
	else
	{
		manDecideFocus = false;
		behavior.managerAutonomous = false;
		behavior.managerDecideFocus = false;
	}
	manDecideFocus = GUI.Toggle (Rect (220, 175, 100, 25), manDecideFocus, "Decide Mode");
	if(manDecideFocus)
	{
		behavior.managerAutonomous = true;
		behavior.managerDecideFocus = true;
	}
	else
	{
		behavior.managerDecideFocus = false;
	}
	//Modes
	GUI.Box (Rect (220, 200, 100, 25), "Priority");
	manAnalysis = GUI.Toggle (Rect (220, 225, 100, 25), manAnalysis, "Analysis");
	if(manAnalysis)
	{
		manCodification = false;
		manQuality = false;
		manBalanced = false;
		behavior.ActivateAnalysis();
	}
	manCodification = GUI.Toggle (Rect (220, 250, 100, 25), manCodification, "Codification");	
	if(manCodification)
	{
		manAnalysis = false;
		manQuality = false;
		manBalanced = false;
		behavior.ActivateCodification();
	}
	manQuality = GUI.Toggle (Rect (220, 275, 100, 25), manQuality, "Quality");	
	if(manQuality)
	{
		manAnalysis = false;
		manCodification = false;
		manBalanced = false;
		behavior.ActivateQuality();
	}
	manBalanced = GUI.Toggle (Rect (220, 300, 100, 25), manBalanced, "Balanced");	
	if(manBalanced)
	{
		manAnalysis = false;
		manCodification = false;
		manQuality = false;
		behavior.ActivateBalanced();
	}
	//Aids
	GUI.Box (Rect (320, 125, 100, 25), "Aid");
	manAnalyst = GUI.Toggle (Rect (320, 150, 100, 25), manAnalyst, "Aid Analysts");	
	if(manAnalyst)
	{
		manArchitect = false;
		manProgrammer = false;
		behavior.ActivateAnalystAid();
	}
	manArchitect = GUI.Toggle (Rect (320, 175, 100, 25), manArchitect, "Aid Architects");	
	if(manArchitect)
	{
		manAnalyst = false;
		manProgrammer = false;
		behavior.ActivateArchitectAid();
	}
	manProgrammer = GUI.Toggle (Rect (320, 200, 100, 25), manProgrammer, "Aid Programmers");	
	if(manProgrammer)
	{
		manAnalyst = false;
		manArchitect = false;
		behavior.ActivateProgrammerAid();
	}
	
	//Close button
	if (GUI.Button (Rect (02,493,296,25), "Close")) {
		showWindow  = false;
		
	}
	GUI.DragWindow();
}

//Função para setar as horas de trabalho de todos os funcionarios
function TeamWorkHoursBar()
{
	GUI.BeginGroup (Rect (900,00,400,300));
	GUI.Box (Rect (00,00,110,20), "Staff's Hours");
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
	if(playStyle.IsMacro() == false)
		TeamWorkHoursBar();
	if (showWindow)
		windowRect = GUI.Window (6, windowRect, WindowFunction, "Task Configuration");
}