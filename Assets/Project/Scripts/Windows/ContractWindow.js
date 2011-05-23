
public var timer : GameTime;
public var projectW : ProjectWindow;
public var project : Project;
public var addProject : AcceptProject;
public var newproject01 : Project;
public var newproject02 : Project;
public var newproject03 : Project;
public var newproject04 : Project;
public var newproject05 : Project;
public var newproject06 : Project;
public var newproject07 : Project;
public var newproject08 : Project;
public var customGuiStyle : GUIStyle;
private var showWindow : boolean = false;
private var windowRect : Rect = Rect (300,125,400,268);
private var project01 : boolean = false;
private var project02 : boolean = false;
private var project03 : boolean = false;
private var project04 : boolean = false;
private var project05 : boolean = false;
private var project06 : boolean = false;
private var project07 : boolean = false;
private var project08 : boolean = false;
private var selected : boolean = false;

function GetShowWindow(){
	return showWindow;
}

function SetShowWindow(){
	showWindow = true;
}

function ResetItems(){
	project01 = false;
	project02 = false;
	project03 = false;
	project04 = false;
	project05 = false;
	project06 = false;
	project07 = false;
	project08 = false;
	selected = false;
}

function increaseMorale(project00 : Project)
{
	if(project00.GetProjectSizeString() == "Regular")
			BroadcastMessage("IncreaseMoraleDificulty", 1);
		else
			if(project00.GetProjectSizeString() == "Complex")
				BroadcastMessage("IncreaseMoraleDificulty", 2);
			else
				if(project00.GetProjectSizeString() == "Insane")
					BroadcastMessage("IncreaseMoraleDificulty", 4);
}
function SelectProject(){
	if(project01 == true)
	{
		addProject.TakeProject(newproject01);
		increaseMorale(newproject01);
		
	}
	if(project02 == true)
	{
		addProject.TakeProject(newproject02);
		increaseMorale(newproject02);
	}
	if(project03 == true)
	{
		addProject.TakeProject(newproject03);
		increaseMorale(newproject03);
	}
	if(project04 == true)
	{
		addProject.TakeProject(newproject04);
		increaseMorale(newproject04);
	}
	if(project05 == true)
	{
		addProject.TakeProject(newproject05);
		increaseMorale(newproject05);
	}
	if(project06 == true)
	{
		addProject.TakeProject(newproject06);
		increaseMorale(newproject06);
	}
	if(project07 == true)
	{
		addProject.TakeProject(newproject07);
		increaseMorale(newproject07);
	}
	if(project08 == true)
	{
		addProject.TakeProject(newproject08);
		increaseMorale(newproject08);
	}
}

function ShowProjects(windowID : int){
	timer.PauseGame();
	GUI.Box (Rect (02,22,396,25), "Pick a new contract");
	GUI.BeginGroup (Rect (02,25,400,243));
	
	project01 = GUI.Toggle (Rect (10, 040, 198, 30), project01, newproject01.GetNome());
	if(project01 == true)
	{
		project02 = false;
		project03 = false;
		project04 = false;
		project05 = false;
		project06 = false;
		project07 = false;
		project08 = false;
		selected = true;
		projectW.SetShowWindow(newproject01, false);
	}
	project02 = GUI.Toggle (Rect (10, 080, 198, 30), project02, newproject02.GetNome());
	if(project02 == true)
	{
		project01 = false;
		project03 = false;
		project04 = false;
		project05 = false;
		project06 = false;
		project07 = false;
		project08 = false;
		selected = true;
		projectW.SetShowWindow(newproject02, false);
	}
	project03 = GUI.Toggle (Rect (10, 120, 198, 30), project03, newproject03.GetNome());
	if(project03 == true)
	{
		project02 = false;
		project01 = false;
		project04 = false;
		project05 = false;
		project06 = false;
		project07 = false;
		project08 = false;
		selected = true;
		projectW.SetShowWindow(newproject03, false);
	}
	project04 = GUI.Toggle (Rect (10, 160, 198, 30), project04, newproject04.GetNome());
	if(project04 == true)
	{
		project02 = false;
		project03 = false;
		project01 = false;
		project05 = false;
		project06 = false;
		project07 = false;
		project08 = false;
		selected = true;
		projectW.SetShowWindow(newproject04, false);
	}
	project05 = GUI.Toggle (Rect (208, 040, 198, 30), project05, newproject05.GetNome());
	if(project05 == true)
	{
		project02 = false;
		project03 = false;
		project04 = false;
		project01 = false;
		project06 = false;
		project07 = false;
		project08 = false;
		selected = true;
		projectW.SetShowWindow(newproject05, false);
	}
	project06 = GUI.Toggle (Rect (208, 080, 198, 30), project06, newproject06.GetNome());
	if(project06 == true)
	{
		project02 = false;
		project03 = false;
		project04 = false;
		project05 = false;
		project01 = false;
		project07 = false;
		project08 = false;
		selected = true;
		projectW.SetShowWindow(newproject06, false);
	}
	project07 = GUI.Toggle (Rect (208, 120, 198, 30), project07, newproject07.GetNome());
	if(project07 == true)
	{
		project02 = false;
		project03 = false;
		project04 = false;
		project05 = false;
		project06 = false;
		project01 = false;
		project08 = false;
		selected = true;
		projectW.SetShowWindow(newproject07, false);
	}
	project08 = GUI.Toggle (Rect (208, 160, 198, 30), project08, newproject08.GetNome());
	if(project08 == true)
	{
		project02 = false;
		project03 = false;
		project04 = false;
		project05 = false;
		project06 = false;
		project07 = false;
		project01 = false;
		selected = true;
		projectW.SetShowWindow(newproject08, false);
	}
	if ( project08 == true || project07 == true || project06 == true || project05 == true || project04 == true || project03 == true || project02 == true || project01 == true)
	{
		if (GUI.Button (Rect (02,210,390,25), "OK")) {
			showWindow  = false;
			projectW.DisableShowWindow();
			SelectProject();
			ResetItems();
		}	
	}
	GUI.EndGroup ();
}
	
function OnGUI () {
	GUI.backgroundColor = Color.blue;
	GUI.contentColor = Color.green;
	if(showWindow)
		windowRect = GUI.Window (20, windowRect, ShowProjects, ("Possible Projects ") );
}
function Awake () {

}