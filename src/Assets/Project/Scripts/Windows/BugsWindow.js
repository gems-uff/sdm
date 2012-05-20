#pragma strict

public var project : Project;
public var timer : GameTime;
public var windowController : WindowController;
//private var windowRect : Rect = Rect (600,125,400,300);
//private var showWindow : boolean = false;

function Start () {

}

function Update () {

}
/*
function ShowBugWindow()
{
	showWindow = true;
}
*/
function WindowFunction(windowID : int){
	timer.PauseGame();
	GUI.BeginGroup (Rect (02,20,400,300));
	//Upper Left
	GUI.Box (Rect (02,000,196,25), "----Bugs Found----");
	GUI.Box (Rect (02,025,196,25), "Unitary: " + project.GetBugUnitaryFound());
	GUI.Box (Rect (02,050,196,25), "Integration: " + project.GetBugIntegrationFound());
	GUI.Box (Rect (02,075,196,25), "System: " + project.GetBugSystemFound());
	GUI.Box (Rect (02,100,196,25), "Acception: " + project.GetBugAcceptionFound());
	GUI.Box (Rect (02,125,196,25), "Total Bugs Found: " + project.GetTotalBugsFound());
	//Upper Right
	GUI.Box (Rect (200,000,196,25), "----Bugs Repaired----");
	GUI.Box (Rect (200,025,196,25), "Unitary: " + project.GetBugUnitaryRepaired());
	GUI.Box (Rect (200,050,196,25), "Integration: " + project.GetBugIntegrationRepaired());
	GUI.Box (Rect (200,75,196,25), "System: " + project.GetBugSystemRepaired());
	GUI.Box (Rect (200,100,196,25), "Acception: " + project.GetBugAcceptionRepaired());
	GUI.Box (Rect (200,125,196,25), "Total Bugs Repaired: " + project.GetTotalBugsRepaired());
	//Middle
	GUI.Box (Rect (002,150,396,25), "----Remaining Bugs in the system----");
	GUI.Box (Rect (002,175,196,25), "Unitary: " + (project.GetBugUnitaryFound() - project.GetBugUnitaryRepaired()));
	GUI.Box (Rect (002,200,196,25), "Integration: " + (project.GetBugIntegrationFound() - project.GetBugIntegrationRepaired()));
	GUI.Box (Rect (200,175,196,25), "System: " + (project.GetBugSystemFound() - project.GetBugSystemRepaired()));
	GUI.Box (Rect (200,200,196,25), "Acception: " + (project.GetBugAcceptionFound() - project.GetBugAcceptionRepaired()));
	GUI.Box (Rect (002,225,396,25), "Total Bugs left: " + (project.GetTotalBugsFound() - project.GetTotalBugsRepaired()));
	
	
	//GUI.Box (Rect (02,250,196,25), "Total Bugs: " + project.GetTotalBugs());
	if (GUI.Button (Rect (02,250,396,25), "Cancel")) 
	{
		//showWindow  = false;
		windowController.DisableBugWindow();
	}
	GUI.EndGroup ();
	GUI.DragWindow();
}
function OnGUI () {
	
	//GUI.backgroundColor = Color.yellow;
	//GUI.contentColor = Color.green;
	//if(showWindow)
	//	windowRect = GUI.Window (0, windowRect, WindowFunction, ("Bugs: ") );
		
}