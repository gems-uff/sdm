#pragma strict

public var log : HistoryLog;
public var projectWindow : ProjectWindow;
private var windowRect : Rect = Rect (200,125,400,400);
private var windowRect2 : Rect = Rect (600,125,400,325);
private var windowRect3 : Rect = Rect (600,450,400,600);
private var showWindow : boolean = false;

private var pList : ProjectList;
private var actionNode : ActionNode;
private var showActionWindow : boolean = false;

private var influenceNode : Influence;
private var action1 : InfluenceNode = new InfluenceNode();
private var action2 : ActionNode = new ActionNode();
private var action3 : ActionNode = new ActionNode();
private var action4 : ActionNode = new ActionNode();
private var action5 : ActionNode = new ActionNode();
private var action6 : ActionNode = new ActionNode();
private var action7 : InfluenceNode = new InfluenceNode();
private var action8 : InfluenceNode = new InfluenceNode();

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
	var project : Project = projectNode.project;
	GUI.Box (Rect (02,000,196,25), "----Project----");
	GUI.Box (Rect (02,025,196,25), "Name: " + project.GetNome());
	GUI.Box (Rect (02,050,196,25), "Start Day: " + project.GetStartDay());
	
	if (GUI.Button (Rect (200,025,196,50), "Project Info")) 
	{
		projectWindow.SetShowWindow(project, true);
	}
	
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
	if(actionNode.influence != null)
	{
		influenceString = "Influenced";
		if (GUI.Button (Rect (02,150,196,25), "Influence: " + influenceString)) 
		{
			influenceNode  = actionNode.influence;
			//Compute actions# here
			action1 = null;
			action2 = null;
			action3 = null;
			action4 = null;
			action5 = null;
			action6 = null;
			action7 = null;
			action8 = null;
			/*
			action1 = influenceNode.GetAnalystArchInfluence().GetFirst();
			action2 = influenceNode.GetAnalystManagerInfluence();
			action3 = influenceNode.GetAnalystMarketingInfluence();
			action4 = influenceNode.GetArchManagerInfluence();
			action5 = influenceNode.GetProgManagerInfluence();
			action6 = influenceNode.GetProgArchInfluence().last;
			action7 = (influenceNode.GetTestArchInfluence()).last;
			action8 = influenceNode.GetTestAnalystInfluence().last;
			*/
			
			
			if(influenceNode.GetAnalystArchInfluence().GetFirst() != null)
			{
				action1 = influenceNode.GetAnalystArchInfluence().GetFirst();
			}
			if(influenceNode.GetAnalystManagerInfluence() != null)
			{
				action2 = influenceNode.GetAnalystManagerInfluence();
			}
			if(influenceNode.GetAnalystMarketingInfluence() != null)
			{
				action3 = influenceNode.GetAnalystMarketingInfluence();
			}
			if(influenceNode.GetArchManagerInfluence() != null)
			{
				action4 = influenceNode.GetArchManagerInfluence();
			}
			if(influenceNode.GetProgManagerInfluence() != null)
			{
				action5 = influenceNode.GetProgManagerInfluence();
			}
			if(influenceNode.GetProgArchInfluence().last != null)
			{
				action6 = influenceNode.GetProgArchInfluence().last;
			}
			if(influenceNode.GetTestArchInfluence().last != null)
			{
				action7 = (influenceNode.GetTestArchInfluence()).GetFirst();
			}
			if(influenceNode.GetTestAnalystInfluence().last != null)
			{
				action8 = influenceNode.GetTestAnalystInfluence().GetFirst();
			}
			
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
	//Analyst
	GUI.Box (Rect (02,025,196,25), "---Analyst---");
	GUI.Box (Rect (02,050,196,25), "Analyst Bonus: " + influenceNode.GetBonusAnalyst());
	//GUI.Box (Rect (02,075,196,25), "Prototypes: " + influenceNode.GetPrototype());
	
	if(action1.action.who != "")
	{
		if (GUI.Button (Rect (02,100,196,25), "Architect Influence: " + action1.action.who)) 
		{
			actionNode  = action1.action;
			showInfluenceWindow = false;
		}
		/*
		if(action1.next != null)
		{
			if (GUI.Button (Rect (200,100,96,25), "Next")) 
				action1 = action1.next;
		}
		if(action1.previous != null)
		{
			if (GUI.Button (Rect (275,100,96,25), "Previous")) 
				action1 = action1.previous;
		}
		*/
	}
	else
		GUI.Box (Rect (02,100,196,25), "Architect Influence: " + "None");
		
	if(action2.who != "")
	{
		if (GUI.Button (Rect (02,125,196,25), "Manager Influence: " + action2.who)) 
		{
			actionNode  = action2;
			showInfluenceWindow = false;
		}
	}
	
	else
	
		GUI.Box (Rect (02,125,196,25), "Manager Influence: " + "None");

	if(action3.who != "")
	{
		if (GUI.Button (Rect (02,150,196,25), "Marketing Influence: " + action3.who)) 
		{
			actionNode  = action3;
			showInfluenceWindow = false;
		}
	}
	else
		GUI.Box (Rect (02,150,196,25), "Marketing Influence: " + "None");
		
	//Architect
	GUI.Box (Rect (02,175,196,25), "---Architect---");
	GUI.Box (Rect (02,200,196,25), "Architect Bonus: " + influenceNode.GetBonusArch());
	
	if(action4.who != "")
	{
		if (GUI.Button (Rect (02,225,196,25), "Manager Influence: " + action4.who)) 
		{
			actionNode  = action4;
			showInfluenceWindow = false;
		}
	}
	else
		GUI.Box (Rect (02,225,196,25), "Manager Influence: " + "None");
		
	//Programmer
	GUI.Box (Rect (02,250,196,25), "---Programmer---");
	GUI.Box (Rect (02,275,196,25), "Programmer Bonus: " + influenceNode.GetBonusProg());
	
	if(action5.who != "")
	{
		if (GUI.Button (Rect (02,300,196,25), "Manager Influence: " + action5.who)) 
		{
			actionNode  = action5;
			showInfluenceWindow = false;
		}
	}
	else
		GUI.Box (Rect (02,300,196,25), "Manager Influence: " + "None");
	
	if(action6.who != "")
	{
		if (GUI.Button (Rect (02,325,196,25), "Architect Influence: " + action6.who)) 
		{
			actionNode  = action6;
			showInfluenceWindow = false;
		}
		if(action6.next != null)
		{
			if (GUI.Button (Rect (200,325,75,25), "Next")) 
				action6 = action6.next;
		}
		if(action6.previous != null)
		{
			if (GUI.Button (Rect (275,325,75,25), "Previous")) 
				action6 = action6.previous;
		}
	}
	else
		GUI.Box (Rect (02,325,196,25), "Architect Influence: " + "None");
	
	GUI.Box (Rect (02,350,196,25), "---Tester---");
	GUI.Box (Rect (02,375,196,25), "Integration Bonus: " + influenceNode.GetBonusIntegration());
	GUI.Box (Rect (02,400,196,25), "System Bonus: " + influenceNode.GetBonusSystem());
	GUI.Box (Rect (02,425,196,25), "Acception Bonus: " + influenceNode.GetBonusAcception());
	
	if(action7.action.who != "")
	{
		if (GUI.Button (Rect (02,450,196,25), "Architect Influence: " + action7.action.who)) 
		{
			actionNode  = action7.action;
			showInfluenceWindow = false;
		}
		/*
		if(action7.next != null)
		{
			if (GUI.Button (Rect (200,450,75,25), "Next")) 
				action7 = action7.next;
		}
		if(action7.previous != null)
		{
			if (GUI.Button (Rect (275,450,75,25), "Previous")) 
				action7 = action7.previous;
		}
		*/
	}
	else
		GUI.Box (Rect (02,450,196,25), "Architect Influence: " + "None");
		
	if(action8.action.who != "")
	{
		if (GUI.Button (Rect (02,475,196,25), "Analyst Influence: " + action8.action.who)) 
		{
			actionNode  = action8.action;
			showInfluenceWindow = false;
		}
		/*
		if(action8.next != null)
		{
			if (GUI.Button (Rect (200,475,75,25), "Next")) 
				action8 = action8.next;
		}
		if(action6.previous != null)
		{
			if (GUI.Button (Rect (275,475,75,25), "Previous")) 
				action6 = action8.previous;
		}
		*/
	}
	else
		GUI.Box (Rect (02,475,196,25), "Analyst Influence: " + "None");
	
	
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
		windowRect = GUI.Window (0, windowRect, WindowFunction, ("Log") );
		if(showActionWindow)
			windowRect2 = GUI.Window (1, windowRect2, ActionWindowFunction, ("Action") );
		if(showInfluenceWindow)
			windowRect3 = GUI.Window (2, windowRect3, InfluenceWindowFunction, ("Influence") );
	}
}

function Start () {

}

function Update () {

}