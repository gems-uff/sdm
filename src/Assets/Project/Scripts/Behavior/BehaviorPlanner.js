#pragma strict

private var isPressured : boolean = false;
private var pAction : ActionNode;
private var progRepair : boolean = false;
private var progEvolution : boolean = true;
//private var employeeNode : EmployeeNode;

private var employeeList : EmployeeList;
private var func : Funcionario;
public var Log : HistoryLog;



function GetPressure()
{
	return isPressured;
}

function SetPressure(t : boolean)
{
	isPressured = t;
}

function GetProgRepair()
{
	return progRepair;
}

function SetProgRepair(t : boolean)
{
	progRepair = t;
}

function GetProgEvolution()
{
	return progEvolution;
}

function SetProgEvolution(t : boolean)
{
	progEvolution = t;
}

function UnderPressure(t : ActionNode)
{
	pAction = t;
	isPressured = true;
}

function GetPAction()
{
	return pAction;
}

function SetPAction(t : ActionNode)
{
	pAction = t;
}

//-------------------------------------------------------------------------------------------------------
//Functions below are for the linked lists
//-------------------------------------------------------------------------------------------------------
function GetNode()
{
	return employeeList.last;
}
/*
function SetNode(t : EmployeeNode)
{
	employeeNode = t;
}
*/
/*
function NewNode()
{
	var employeeNode : EmployeeNode = new EmployeeNode();
	
	employeeNode.employee = Instantiate(func);
	employeeNode.actionList = new ActiontList();
	
	employeeList.Add(employeeNode);
}
*/
function UpdateSlot()
{
	employeeList = Log.GetSlot(func);
}

function AddAction(newAction : ActionNode)
{
	UpdateSlot();
	employeeList.last.actionList.Add(newAction);
}
//-------------------------------------------------------------------------------------------------------
//Awake
//-------------------------------------------------------------------------------------------------------
function Awake ()
{
	func = GetComponentInChildren(Funcionario);
	//UpdateSlot();
}