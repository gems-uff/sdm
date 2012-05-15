#pragma strict

public var work : Working;
private var windowRect : Rect = Rect (600,125,400,300);
private var showWindow : boolean = false;

private var who : String;
private var date : int;
private var task : String;
private var reason : String;
private var descr : String;

function ShowActionWindow()
{
	showWindow = true;
}

function WindowFunction(windowID : int){
	var actionNode : ActionNode = work.GetAction();
	who = actionNode.who.GetNome();
	date = actionNode.date;
	task = actionNode.task;
	reason = "";
	descr = actionNode.description;
	GUI.BeginGroup (Rect (02,20,400,300));
	//Upper Left
	GUI.Box (Rect (02,000,196,25), "----Action----");
	GUI.Box (Rect (02,025,196,25), "Date: " + date);
	GUI.Box (Rect (02,050,196,25), "Who: " + who);
	GUI.Box (Rect (02,075,196,25), "Task: " + task);
	GUI.Box (Rect (02,100,196,25), "ExtReason: " + reason);
	GUI.Box (Rect (02,125,396,75), "Description: " + descr);
	
	//GUI.Box (Rect (02,250,196,25), "Total Bugs: " + project.GetTotalBugs());
	if (GUI.Button (Rect (02,250,396,25), "Cancel")) 
	{
		showWindow  = false;
	}
	GUI.EndGroup ();
}
function OnGUI () {
	GUI.backgroundColor = Color.yellow;
	GUI.contentColor = Color.green;
	if(showWindow)
		windowRect = GUI.Window (0, windowRect, WindowFunction, ("Bugs: ") );
}

function Start () {

}

function Update () {

}