#pragma strict
public var player : PlayerStats;
public var project : Project;
public var employee01 : Funcionario;
public var employee02 : Funcionario;
public var employee03 : Funcionario;
public var employee04 : Funcionario;
public var employee05 : Funcionario;
public var employee06 : Funcionario;
public var employee07 : Funcionario;
public var employee08 : Funcionario;

public var time : GameTime;
private var projectList : ProjectList;
//private var employeeList : EmployeeList;
//private var actionList : ActiontList;

function GetProjectList()
{
	return projectList;
}

//Returns the corresponding slot according to t's slot in the interface
function GetSlot(t : Funcionario)
{
	var slot : EmployeeList;
	switch(t)
	{
	   case employee01: 
			slot = projectList.last.slot01;
	   break;

	   case employee02:
			slot = projectList.last.slot02;
	   break;
	   
	   case employee03:
			slot = projectList.last.slot03;
	   break;
	   
	   case employee04:
			slot = projectList.last.slot04;
	   break;
	   
	   case employee05:
			slot = projectList.last.slot05;
	   break;
	   
	   case employee06:
			slot = projectList.last.slot06;
	   break;
	   
	   case employee07:
			slot = projectList.last.slot07;
	   break;
	   
	   case employee08:
			slot = projectList.last.slot08;
	   break;
	   
	   default:
	   		Debug.Log("Error, cannot detect the slot");
		  break;
	}
	
	return slot;
}
//Creates a new project Node in the ProjectList
function NewProjectNode()
{
	var projectNode : ProjectNode = new ProjectNode();
	
	//Take the current instance of the project
	//projectNode.project = Instantiate(project);
	projectNode.project = new ProjectStatsList();
	projectNode.project.Add(project.GetStats());
	
	//Create the lists for all slots
	projectNode.slot01 = new EmployeeList();
	projectNode.slot02 = new EmployeeList();
	projectNode.slot03 = new EmployeeList();
	projectNode.slot04 = new EmployeeList();
	projectNode.slot05 = new EmployeeList();
	projectNode.slot06 = new EmployeeList();
	projectNode.slot07 = new EmployeeList();
	projectNode.slot08 = new EmployeeList();
	
	//Create the Employee Node for each slot
	NewEmployeeNode(employee01, projectNode.slot01);
	NewEmployeeNode(employee02, projectNode.slot02);
	NewEmployeeNode(employee03, projectNode.slot03);
	NewEmployeeNode(employee04, projectNode.slot04);
	NewEmployeeNode(employee05, projectNode.slot05);
	NewEmployeeNode(employee06, projectNode.slot06);
	NewEmployeeNode(employee07, projectNode.slot07);
	NewEmployeeNode(employee08, projectNode.slot08);
	
	projectList.Add(projectNode);
		
}

function NewProjectStatNode()
{
	var stats : ProjectStats = new ProjectStats();
	stats = project.GetStats();
	stats.credits = player.GetSaldo();
	projectList.last.project.Add(stats);
}
function UpdateProjectStatNode()
{
	projectList.last.project.last.UpdateNode(project.GetStats());
	projectList.last.project.last.credits = player.GetSaldo();
}
function GetProjectStat()
{
	return projectList.last.project.last;
}
//Creates a new Employee Node
function NewEmployeeNode(emp : Funcionario, slot : EmployeeList)
{
	var employeeNode : EmployeeNode = new EmployeeNode();
	
	employeeNode.employee = emp.Copy();
	employeeNode.actionList = new ActionList();
	
	slot.Add(employeeNode);
}

function NewFiredAction(slot : EmployeeList)
{
	var newAction : ActionNode = new ActionNode();
	newAction.who = slot.last.employee.nome;
	newAction.date = time.GetGameTime();
	newAction.task = "fired";
	newAction.role = "fired";
	newAction.description = "fired";
	newAction.work = "fired";
	newAction.influence = null;
	
	//newAction.morale = "0.0";
	//newAction.stamina = "0.0";
	//newAction.cost = "0.0";
	//newAction.artifact = "";
		
	slot.last.actionList.Add(newAction);
}
function Awake () 
{
	projectList = new ProjectList();
}

function Update () {

}