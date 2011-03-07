
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
private var windowRect : Rect = Rect (500,125,200,268);
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

function SelectProject(){
	if(project01 == true)
	{
		addProject.TakeProject(newproject01);
	}
	if(project02 == true)
	{
		addProject.TakeProject(newproject02);
	}
	if(project03 == true)
	{
		addProject.TakeProject(newproject03);
	}
	if(project04 == true)
	{
		addProject.TakeProject(newproject04);
	}
	if(project05 == true)
	{
		addProject.TakeProject(newproject05);
	}
	if(project06 == true)
	{
		addProject.TakeProject(newproject06);
	}
	if(project07 == true)
	{
		addProject.TakeProject(newproject07);
	}
	if(project08 == true)
	{
		addProject.TakeProject(newproject08);
	}
}

function ShowProjects(windowID : int){
	timer.PauseGame();
	GUI.Box (Rect (02,22,196,25), "Pick a new contract");
	GUI.BeginGroup (Rect (02,25,200,243));
	
	project01 = GUI.Toggle (Rect (10, 040, 98, 30), project01, "Project01");
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
		projectW.SetShowWindow(newproject01);
	}
	project02 = GUI.Toggle (Rect (10, 080, 98, 30), project02, "Project02");
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
		projectW.SetShowWindow(newproject02);
	}
	project03 = GUI.Toggle (Rect (10, 120, 98, 30), project03, "Project03");
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
		projectW.SetShowWindow(newproject03);
	}
	project04 = GUI.Toggle (Rect (10, 160, 98, 30), project04, "Project04");
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
		projectW.SetShowWindow(newproject04);
	}
	project05 = GUI.Toggle (Rect (108, 040, 98, 30), project05, "Project05");
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
		projectW.SetShowWindow(newproject05);
	}
	project06 = GUI.Toggle (Rect (108, 080, 98, 30), project06, "Project06");
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
		projectW.SetShowWindow(newproject06);
	}
	project07 = GUI.Toggle (Rect (108, 120, 98, 30), project07, "Project07");
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
		projectW.SetShowWindow(newproject07);
	}
	project08 = GUI.Toggle (Rect (108, 160, 98, 30), project08, "Project08");
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
		projectW.SetShowWindow(newproject08);
	}
	if (GUI.Button (Rect (02,210,190,25), "OK")) {
		showWindow  = false;
		projectW.DisableShowWindow();
		SelectProject();
		ResetItems();
	}	
	GUI.EndGroup ();
}
	
function OnGUI () {
	GUI.backgroundColor = Color.yellow;
	GUI.backgroundColor = Color.yellow;
	GUI.contentColor = Color.green;
	if(showWindow)
		windowRect = GUI.Window (20, windowRect, ShowProjects, ("Possible Projects ") );
}
function Awake () {

}