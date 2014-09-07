#pragma strict

public var log : HistoryLog;
public var projectWindow : ProjectWindow;
private var windowRect : Rect = Rect (200,125,400,400);
private var windowRect2 : Rect = Rect (600,125,400,325);
private var windowRect3 : Rect = Rect (300,450,400,600);
private var showWindow : boolean = false;

private var pList : ProjectList;
private var actionNode : ActionNode;
private var showActionWindow : boolean = false;

private var influenceNode : InfluenceValues;
private var influence : InfluenceNode;

private var showInfluenceWindow : boolean = false;


function ShowLogWindow()
{
	pList = log.GetProjectList();
	showWindow = true;
}

//----------------------------------------------------------
// Log Window
//----------------------------------------------------------
function WindowFunction(windowID : int){
	GUI.BeginGroup (Rect (02,20,400,400));
	//Upper Left
	var projectNode : ProjectNode = pList.last;
	var project : ProjectStats = projectNode.project.first;
	GUI.Box (Rect (02,000,196,25), "----Project----");
	GUI.Box (Rect (02,025,196,25), "Name: " + project.name);
	GUI.Box (Rect (02,050,196,25), "Deadline: " + project.deadline);
	/*
	if (GUI.Button (Rect (200,025,196,50), "Project Info")) 
	{
		projectWindow.SetShowWindow(project, true);
	}
	*/
	GUI.Box (Rect (02,075,196,25), "----Employee----");
	GUI.Box (Rect (02,100,196,25), "Slot01: " + projectNode.slot01.last.employee.GetNome());
	GUI.Box (Rect (02,125,196,25), "Slot02: " + projectNode.slot02.last.employee.GetNome());
	GUI.Box (Rect (02,150,196,25), "Slot03: " + projectNode.slot03.last.employee.GetNome());
	GUI.Box (Rect (02,175,196,25), "Slot04: " + projectNode.slot04.last.employee.GetNome());
	GUI.Box (Rect (02,200,196,25), "Slot05: " + projectNode.slot05.last.employee.GetNome());
	GUI.Box (Rect (02,225,196,25), "Slot06: " + projectNode.slot06.last.employee.GetNome());
	GUI.Box (Rect (02,250,196,25), "Slot07: " + projectNode.slot07.last.employee.GetNome());
	GUI.Box (Rect (02,275,196,25), "Slot08: " + projectNode.slot08.last.employee.GetNome());
	
	var aux01: String = "";
	var aux02: String = "";
	var aux03: String = "";
	var aux04: String = "";
	var aux05: String = "";
	var aux06: String = "";
	var aux07: String = "";
	var aux08: String = "";
	
	
	if(projectNode.slot01.last.actionList.last != null)
	{
		aux01 = projectNode.slot01.last.actionList.last.task;
		if (GUI.Button (Rect (200,100,196,25), "Action: " + aux01)) 
		{
			actionNode  = projectNode.slot01.last.actionList.last;
			showActionWindow = true;
			showInfluenceWindow = false;
		}	
	}
	else
		GUI.Box (Rect (200,100,196,25), "Action: " + aux01);
		
	if(projectNode.slot02.last.actionList.last != null)
	{
		aux02 = projectNode.slot02.last.actionList.last.task;
		if (GUI.Button (Rect (200,125,196,25), "Action: " + aux02)) 
		{
			actionNode  = projectNode.slot02.last.actionList.last;
			showActionWindow = true;
			showInfluenceWindow = false;
		}
	}
	else
		GUI.Box (Rect (200,125,196,25), "Action: " + aux02);
	
	if(projectNode.slot03.last.actionList.last != null)
	{
		aux03 = projectNode.slot03.last.actionList.last.task;
		if (GUI.Button (Rect (200,150,196,25), "Action: " + aux03)) 
		{
			actionNode  = projectNode.slot03.last.actionList.last;
			showActionWindow = true;
			showInfluenceWindow = false;
		}
	}
	else
		GUI.Box (Rect (200,150,196,25), "Action: " + aux03);
		
	if(projectNode.slot04.last.actionList.last != null)
	{
		aux04 = projectNode.slot04.last.actionList.last.task;
		if (GUI.Button (Rect (200,175,196,25), "Action: " + aux04)) 
		{
			actionNode  = projectNode.slot04.last.actionList.last;
			showActionWindow = true;
			showInfluenceWindow = false;
		}
	}
	else
		GUI.Box (Rect (200,175,196,25), "Action: " + aux04);	
	
	if(projectNode.slot05.last.actionList.last != null)
	{
		aux05 = projectNode.slot05.last.actionList.last.task;
		if (GUI.Button (Rect (200,200,196,25), "Action: " + aux05)) 
		{
			actionNode  = projectNode.slot05.last.actionList.last;
			showActionWindow = true;
			showInfluenceWindow = false;
		}
	}
	else
		GUI.Box (Rect (200,200,196,25), "Action: " + aux05);
	
	
	if(projectNode.slot06.last.actionList.last != null)
	{
		aux06 = projectNode.slot06.last.actionList.last.task;
		if (GUI.Button (Rect (200,225,196,25), "Action: " + aux06)) 
		{
			actionNode  = projectNode.slot06.last.actionList.last;
			showActionWindow = true;
			showInfluenceWindow = false;
		}
	}
	else
		GUI.Box (Rect (200,225,196,25), "Action: " + aux06);
	
	
	if(projectNode.slot07.last.actionList.last != null)
	{
		aux07 = projectNode.slot07.last.actionList.last.task;
		if (GUI.Button (Rect (200,250,196,25), "Action: " + aux07)) 
		{
			actionNode  = projectNode.slot07.last.actionList.last;
			showActionWindow = true;
			showInfluenceWindow = false;
		}
	}
	else
		GUI.Box (Rect (200,250,196,25), "Action: " + aux07);
		
		
	if(projectNode.slot08.last.actionList.last != null)
	{
		aux08 = projectNode.slot08.last.actionList.last.task;
		if (GUI.Button (Rect (200,275,196,25), "Action: " + aux08)) 
		{
			actionNode  = projectNode.slot08.last.actionList.last;
			showActionWindow = true;
			showInfluenceWindow = false;
		}
	}
	else
		GUI.Box (Rect (200,275,196,25), "Action: " + aux08);
		
		
	if (GUI.Button (Rect (02,300,396,25), "Cancel")) 
	{
		showWindow  = false;
	}
	GUI.EndGroup ();
	GUI.DragWindow();
}

//----------------------------------------------------------
// Action Window
//----------------------------------------------------------
function ActionWindowFunction(windowID : int){
	GUI.BeginGroup (Rect (02,20,400,300));
	
	var influenceString : String = "None";
	
	//Upper Left
	GUI.Box (Rect (02,000,196,25), "----Action----");
	GUI.Box (Rect (02,025,196,25), "Who: " + actionNode.who);
	GUI.Box (Rect (02,050,196,25), "Date: " + actionNode.date);
	GUI.Box (Rect (02,075,196,25), "Role: " + actionNode.role);
	GUI.Box (Rect (02,100,196,25), "Task: " + actionNode.task);
	GUI.Box (Rect (02,125,196,25), "Pressure: " + "none");
	
	//Influence button
	if(actionNode.influence.valid == true)
	{
		influenceString = "Influenced";
		
		if (GUI.Button (Rect (02,150,196,25), "Influence: " + influenceString)) 
		{
			influenceNode  = actionNode.influence;
			influence = influenceNode.influence.first;
			showInfluenceWindow = true;
		}
	}
	else
		GUI.Box (Rect (02,150,196,25), "Influence: " + influenceString);
		
	//End influence button	
	GUI.Box (Rect (02,175,396,75), "Description: " + actionNode.description);
	
	//Move through the action list
	//Previous
	if(actionNode.previous != null)
	{
		if (GUI.Button (Rect (02,250,198,25), "Previous")) 
		{
			actionNode  = actionNode.previous;
		}
	}
	else
		GUI.Box (Rect (02,250,198,25), "Previous");
	
	//Next
	if(actionNode.next != null)
	{
		if (GUI.Button (Rect (200,250,198,25), "Next")) 
		{
			actionNode  = actionNode.next;
		}
	}
	else
		GUI.Box (Rect (200,250,198,25), "Next");
	
	//Close button	
	if (GUI.Button (Rect (02,275,396,25), "Close")) 
	{
		showActionWindow  = false;
	}
	GUI.EndGroup ();
	GUI.DragWindow();
}

//----------------------------------------------------------
// Influence Window
//----------------------------------------------------------
function InfluenceWindowFunction(windowID : int){
	GUI.BeginGroup (Rect (02,20,400,600));
	
	var actionString : String = "None";
	
	//Upper Left
	GUI.Box (Rect (02,000,396,25), "----Influences----");
	GUI.Box (Rect (02,025,196,25), "Value: " + influenceNode.num);
	//GUI.Box (Rect (02,050,196,25), "Artifact: " + influenceNode.artifact);
	if(influence != null)
	{
		if (GUI.Button (Rect (02,50,196,25), "Influence: " + influence.action.who)) 
		{
			actionNode  = influence.action;
			showInfluenceWindow = false;
		}
		if(influence.next != null)
		{
			
			if (GUI.Button (Rect (02,75,75,40), "Next")) 
			{
				influence = influence.next;
			}
		}
		if(influence.previous != null)
		{
			
			if (GUI.Button (Rect (77,75,75,40), "Previous")) 
			{
				influence = influence.previous;
			}
		}
	}
	//End influence button	
	if (GUI.Button (Rect (02,525,396,25), "Cancel")) 
	{
		showInfluenceWindow  = false;
	}
	
	GUI.EndGroup ();
	GUI.DragWindow();
}

function OnGUI () {
	
	if(showWindow)
	{
		GUI.backgroundColor = Color.yellow;
		GUI.contentColor = Color.green;
		windowRect = GUI.Window (66, windowRect, WindowFunction, ("Log") );
		if(showActionWindow)
			windowRect2 = GUI.Window (88, windowRect2, ActionWindowFunction, ("Action") );
		if(showInfluenceWindow)
			windowRect3 = GUI.Window (77, windowRect3, InfluenceWindowFunction, ("Influence") );
	}
}

function Start () {

}

function Update () {

}