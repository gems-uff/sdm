#pragma strict

public var log : HistoryLog;
private var windowRect : Rect = Rect (600,125,400,400);
private var windowRect2 : Rect = Rect (600,125,400,300);
private var showWindow : boolean = false;

private var pList : ProjectList;
private var actionNode : ActionNode;
private var showActionWindow : boolean = false;

function ShowLogWindow()
{
	pList = log.GetProjectList();
	showWindow = true;
}

function WindowFunction(windowID : int){
	GUI.BeginGroup (Rect (02,20,400,400));
	//Upper Left
	GUI.Box (Rect (02,000,196,25), "----Project----");
	GUI.Box (Rect (02,025,196,25), "Name: " + pList.last.project.GetNome());
	GUI.Box (Rect (02,050,196,25), "Start Day: " + pList.last.project.GetStartDay());
	
	GUI.Box (Rect (02,075,196,25), "----Employee----");
	GUI.Box (Rect (02,100,196,25), "Slot01: " + pList.last.slot01.last.employee.GetNome());
	GUI.Box (Rect (02,125,196,25), "Slot02: " + pList.last.slot02.last.employee.GetNome());
	GUI.Box (Rect (02,150,196,25), "Slot03: " + pList.last.slot03.last.employee.GetNome());
	GUI.Box (Rect (02,175,196,25), "Slot04: " + pList.last.slot04.last.employee.GetNome());
	GUI.Box (Rect (02,200,196,25), "Slot05: " + pList.last.slot05.last.employee.GetNome());
	GUI.Box (Rect (02,225,196,25), "Slot06: " + pList.last.slot06.last.employee.GetNome());
	GUI.Box (Rect (02,250,196,25), "Slot07: " + pList.last.slot07.last.employee.GetNome());
	GUI.Box (Rect (02,275,196,25), "Slot08: " + pList.last.slot08.last.employee.GetNome());
	
	var aux01: String = "";
	var aux02: String = "";
	var aux03: String = "";
	var aux04: String = "";
	var aux05: String = "";
	var aux06: String = "";
	var aux07: String = "";
	var aux08: String = "";
	
	
	/*
	if(pList.last.slot03.last.actionList.last != null)
		aux03 = pList.last.slot03.last.actionList.last.task;
	if(pList.last.slot04.last.actionList.last != null)
		aux04 = pList.last.slot04.last.actionList.last.task;
	if(pList.last.slot05.last.actionList.last != null)
		aux05 = pList.last.slot05.last.actionList.last.task;
	if(pList.last.slot06.last.actionList.last != null)
		aux06 = pList.last.slot06.last.actionList.last.task;
	if(pList.last.slot07.last.actionList.last != null)
		aux07 = pList.last.slot07.last.actionList.last.task;
	if(pList.last.slot08.last.actionList.last != null)
		aux08 = pList.last.slot08.last.actionList.last.task;
	*/
	
	if(pList.last.slot01.last.actionList.last != null)
	{
		aux01 = pList.last.slot01.last.actionList.last.task;
		if (GUI.Button (Rect (200,100,196,25), "Action: " + aux01)) 
		{
			actionNode  = pList.last.slot01.last.actionList.last;
			showActionWindow = true;
		}	
	}
	else
		GUI.Box (Rect (200,100,196,25), "Action: " + aux01);
		
	if(pList.last.slot02.last.actionList.last != null)
	{
		aux02 = pList.last.slot02.last.actionList.last.task;
		if (GUI.Button (Rect (200,125,196,25), "Action: " + aux02)) 
		{
			actionNode  = pList.last.slot02.last.actionList.last;
			showActionWindow = true;
		}
	}
	else
		GUI.Box (Rect (200,125,196,25), "Action: " + aux02);
	
	if(pList.last.slot03.last.actionList.last != null)
	{
		aux03 = pList.last.slot03.last.actionList.last.task;
		if (GUI.Button (Rect (200,150,196,25), "Action: " + aux03)) 
		{
			actionNode  = pList.last.slot03.last.actionList.last;
			showActionWindow = true;
		}
	}
	else
		GUI.Box (Rect (200,150,196,25), "Action: " + aux03);
		
	if(pList.last.slot04.last.actionList.last != null)
	{
		aux04 = pList.last.slot04.last.actionList.last.task;
		if (GUI.Button (Rect (200,175,196,25), "Action: " + aux04)) 
		{
			actionNode  = pList.last.slot04.last.actionList.last;
			showActionWindow = true;
		}
	}
	else
		GUI.Box (Rect (200,175,196,25), "Action: " + aux04);	
	
	if(pList.last.slot05.last.actionList.last != null)
	{
		aux05 = pList.last.slot05.last.actionList.last.task;
		if (GUI.Button (Rect (200,200,196,25), "Action: " + aux05)) 
		{
			actionNode  = pList.last.slot05.last.actionList.last;
			showActionWindow = true;
		}
	}
	else
		GUI.Box (Rect (200,200,196,25), "Action: " + aux05);
	
	
	if(pList.last.slot06.last.actionList.last != null)
	{
		aux06 = pList.last.slot06.last.actionList.last.task;
		if (GUI.Button (Rect (200,225,196,25), "Action: " + aux06)) 
		{
			actionNode  = pList.last.slot06.last.actionList.last;
			showActionWindow = true;
		}
	}
	else
		GUI.Box (Rect (200,225,196,25), "Action: " + aux06);
	
	
	if(pList.last.slot07.last.actionList.last != null)
	{
		aux07 = pList.last.slot07.last.actionList.last.task;
		if (GUI.Button (Rect (200,250,196,25), "Action: " + aux07)) 
		{
			actionNode  = pList.last.slot07.last.actionList.last;
			showActionWindow = true;
		}
	}
	else
		GUI.Box (Rect (200,250,196,25), "Action: " + aux07);
		
		
	if(pList.last.slot08.last.actionList.last != null)
	{
		aux08 = pList.last.slot08.last.actionList.last.task;
		if (GUI.Button (Rect (200,275,196,25), "Action: " + aux08)) 
		{
			actionNode  = pList.last.slot08.last.actionList.last;
			showActionWindow = true;
		}
	}
	else
		GUI.Box (Rect (200,275,196,25), "Action: " + aux08);
		
	/*
	//GUI.Box (Rect (200,100,196,25), "Action: " + aux01);
	//GUI.Box (Rect (200,125,196,25), "Action: " + aux02);
	//GUI.Box (Rect (200,150,196,25), "Action: " + aux03);
	//GUI.Box (Rect (200,175,196,25), "Action: " + aux04);
	GUI.Box (Rect (200,200,196,25), "Action: " + aux05);
	GUI.Box (Rect (200,225,196,25), "Action: " + aux06);
	GUI.Box (Rect (200,250,196,25), "Action: " + aux07);
	GUI.Box (Rect (200,275,196,25), "Action: " + aux08);
	*/
	/*
	//Upper Right
	GUI.Box (Rect (200,000,196,25), "-------------");
	GUI.Box (Rect (200,025,196,25), "Unitary: " + project.GetBugUnitaryRepaired());
	GUI.Box (Rect (200,050,196,25), "Integration: " + project.GetBugIntegrationRepaired());
	GUI.Box (Rect (200,75,196,25), "System: " + project.GetBugSystemRepaired());
	GUI.Box (Rect (200,100,196,25), "Acception: " + project.GetBugAcceptionRepaired());
	GUI.Box (Rect (200,125,196,25), "Total Bugs Repaired: " + project.GetTotalBugsRepaired());
	*/
	//GUI.Box (Rect (02,250,196,25), "Total Bugs: " + project.GetTotalBugs());
	if (GUI.Button (Rect (02,300,396,25), "Cancel")) 
	{
		showWindow  = false;
	}
	GUI.EndGroup ();
	GUI.DragWindow();
}


function ActionWindowFunction(windowID : int){
	GUI.BeginGroup (Rect (02,20,400,300));
	//Upper Left
	GUI.Box (Rect (02,000,196,25), "----Action----");
	GUI.Box (Rect (02,025,196,25), "Date: " + actionNode.date);
	GUI.Box (Rect (02,050,196,25), "Role: " + actionNode.role);
	GUI.Box (Rect (02,075,196,25), "Task: " + actionNode.task);
	GUI.Box (Rect (02,100,196,25), "ExtReason: " + "none");
	GUI.Box (Rect (02,125,396,75), "Description: " + actionNode.description);
	
	if (GUI.Button (Rect (02,250,396,25), "Cancel")) 
	{
		showActionWindow  = false;
	}
	GUI.EndGroup ();
	GUI.DragWindow();
}
function OnGUI () {
	
	if(showWindow)
	{
		GUI.backgroundColor = Color.yellow;
		GUI.contentColor = Color.green;
		windowRect = GUI.Window (0, windowRect, WindowFunction, ("Log: ") );
		if(showActionWindow)
			windowRect2 = GUI.Window (1, windowRect2, ActionWindowFunction, ("Action: ") );
	}
}

function Start () {

}

function Update () {

}