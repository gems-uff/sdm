#pragma strict
//At the beginning of each project, decide if will be done in macro or micro modes.
public var style : GameplayStyle;
public var projectW : ProjectWindow;
public var project : Project;

private var showWindow : boolean = false;
private var windowRect : Rect = Rect (500,325,150,135);

private var macroMode : boolean = false;
private var microMode : boolean = false;


function OnGUI () {
	if(showWindow)
		windowRect = GUI.Window (7, windowRect, WindowFunction, "PlayStyle Choice");
}

function WindowFunction(windowID : int){

	GUI.Box (Rect (02,020,146,25),"Choose style:");
	macroMode = GUI.Toggle (Rect (20, 043, 98, 30), macroMode, "Macro");
	if(macroMode == true)
		microMode = false;
	microMode = GUI.Toggle (Rect (20, 073, 98, 30), microMode, "Micro");
	if(microMode == true)
		macroMode = false;
	if(macroMode || microMode)
	{
		if (GUI.Button (Rect (02,105,146,25), "Select")) 
		{
			showWindow = false;
			//Change
			ChangeStyle();
			//Show the project details
			projectW.SetShowWindow(project, true);
		}
	}
}

function ChangeStyle(){
	if(macroMode == true)
	{
		style.SetPlayStyle(true);
	}
	else
	{
		style.SetPlayStyle(false);
	}
}

function ShowStyleChoiceWindow()
{
	showWindow = true;
}