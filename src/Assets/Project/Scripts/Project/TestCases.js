#pragma strict

//Todo
public var project : Project;

public var tAcception : int = 0;
public var tSystem : int = 0;
public var tIntegration : int = 0;
public var tUnitary : int = 0;

function ConsumeAcception()
{
	tAcception--;
	project.IncrementBugsFoundByType(0, 0, 0, 1);
	Debug.Log("Acception");
	return "Acception";
}

function ConsumeSystem()
{
	tSystem--;
	project.IncrementBugsFoundByType(0, 0, 1, 0);
	Debug.Log("System");
	return "System";
}

function ConsumeIntegration()
{
	tIntegration--;
	project.IncrementBugsFoundByType(0, 1, 0, 0);
	Debug.Log("Integration");
	return "Integration";
}

function ConsumeUnitary()
{
	tUnitary--;
	project.IncrementBugsFoundByType(1, 0, 0, 0);
	Debug.Log("Unitary");
	return "Unitary";
}

function AddAcception(t : int)
{
	tAcception += t;
}

function AddSystem(t : int)
{
	tSystem += t;
}

function AddIntegration(t : int)
{
	tIntegration += t;
}

function AddUnitary(t : int)
{
	tUnitary += t;
}

function Use()
{
	if((tAcception > 0) && (project.GetBugAcception() > project.GetBugAcceptionFound()))
		return ConsumeAcception();
	else
	{
		if((tSystem > 0) && (project.GetBugSystem() > project.GetBugSystemFound()))
			return ConsumeSystem();
		else
		{
			if((tIntegration > 0) && project.GetBugIntegration() > project.GetBugIntegrationFound())
				return ConsumeIntegration();
			else
				if((tUnitary > 0)&& project.GetBugUnitary() > project.GetBugUnitaryFound())
					return ConsumeUnitary();
		}
	}
}
function HasTestCase()
{
	/*
	if(tAcception + tSystem + tIntegration + tUnitary > 0)
		return true;
	else
		return false;
	*/
	if((tAcception > 0) && (project.GetBugAcception() > project.GetBugAcceptionFound()))
		return true;
	else
	{
		if((tSystem > 0) && (project.GetBugSystem() > project.GetBugSystemFound()))
			return true;
		else
		{
			if((tIntegration > 0) && project.GetBugIntegration() > project.GetBugIntegrationFound())
				return true;
			else
				if((tUnitary > 0)&& project.GetBugUnitary() > project.GetBugUnitaryFound())
					return true;
				else
					return false;
		}
	}
}

function Clean()
{
	tAcception = 0;
	tSystem = 0;
	tIntegration = 0;
	tUnitary = 0;
}

function Start () {

}

function Update () {

}

//Window
private var showWindow : boolean = false;
private var windowRect : Rect = Rect (600,125,400,300);
function Window()
{
	showWindow = true;
}
function WindowFunction(windowID : int){
	GUI.BeginGroup (Rect (02,20,400,300));
	//Upper Left
	GUI.Box (Rect (02,000,196,25), "----Test Cases----");
	GUI.Box (Rect (02,025,196,25), "Unitary: " + tUnitary);
	GUI.Box (Rect (02,050,196,25), "Integration: " + tIntegration);
	GUI.Box (Rect (02,075,196,25), "System: " + tSystem);
	GUI.Box (Rect (02,100,196,25), "Acception: " + tAcception);
	//GUI.Box (Rect (02,125,196,25), "Total Bugs Found: " + project.GetTotalBugsFound());

	//GUI.Box (Rect (02,250,196,25), "Total Bugs: " + project.GetTotalBugs());
	if (GUI.Button (Rect (02,150,396,25), "Cancel")) 
	{
		showWindow  = false;
	}
	GUI.EndGroup ();
	GUI.DragWindow();
}
function OnGUI () {
	
	//GUI.backgroundColor = Color.yellow;
	//GUI.contentColor = Color.green;
	if(showWindow)
		windowRect = GUI.Window (999, windowRect, WindowFunction, ("Bugs: ") );
		
}