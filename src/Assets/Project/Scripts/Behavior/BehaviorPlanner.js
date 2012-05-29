#pragma strict

private var isPressured : boolean = false;
private var pAction : ActionNode;

//For programmers
private var progRepair : boolean = false;
private var progEvolution : boolean = true;

//For architects
private var archVerification : boolean = false;
private var archEvolution : boolean = false;
private var archAnalysis : boolean = false;
private var archRounded : boolean = true;
private var archTestCases : String = "both"; //system, integration, both
//private var archPrototype : boolean = false;
//private var employeeNode : EmployeeNode;

private var employeeList : EmployeeList;
private var func : Funcionario;
public var Log : HistoryLog;


//-------------------------------------------------------------------------------------------------------
//Functions for Programmer
//-------------------------------------------------------------------------------------------------------

function ActivateProgRepair()
{
	SetProgRepair(true);
	SetProgEvolution(false);
}

function ActivateProgEvolution()
{
	SetProgRepair(false);
	SetProgEvolution(true);
}

function UnderPressure(t : ActionNode)
{
	pAction = t;
	isPressured = true;
}

//-------------------------------------------------------------------------------------------------------
//Functions for Architect
//-------------------------------------------------------------------------------------------------------

function ActivateArchVerification()
{
	SetArchVerification(true);
	SetArchEvolution(false);
	SetArchAnalysis(false);
	SetArchRounded(false);
}

function ActivateArchEvolution()
{
	SetArchVerification(false);
	SetArchEvolution(true);
	SetArchAnalysis(false);
	SetArchRounded(false);
}

function ActivateArchAnalysis()
{
	SetArchVerification(false);
	SetArchEvolution(false);
	SetArchAnalysis(true);
	SetArchRounded(false);
}

function ActivateArchRounded()
{
	SetArchVerification(false);
	SetArchEvolution(false);
	SetArchAnalysis(false);
	SetArchRounded(true);
}

//-------------------------------------------------------------------------------------------------------
//Functions below are for the linked lists
//-------------------------------------------------------------------------------------------------------
function GetNode()
{
	return employeeList.last;
}
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
//Gets and Sets
//-------------------------------------------------------------------------------------------------------
function GetPAction()
{
	return pAction;
}

function SetPAction(t : ActionNode)
{
	pAction = t;
}

//Programmer
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

function GetProgEvolution()
{
	return progEvolution;
}

function SetProgRepair(t : boolean)
{
	progRepair = t;
}
function SetProgEvolution(t : boolean)
{
	progEvolution = t;
}

//Architect
function SetArchVerification(t : boolean)
{
	archVerification = t;
}
function GetArchVerification()
{
	return archVerification;
}
function SetArchEvolution(t : boolean)
{
	archEvolution = t;
}
function GetArchEvolution()
{
	return archEvolution;
}
function SetArchAnalysis(t : boolean)
{
	archAnalysis = t;
}
function GetArchAnalysis()
{
	return archAnalysis;
}
function SetArchRounded(t : boolean)
{
	archRounded = t;
}
function GetArchRounded()
{
	return archRounded;
}
/*
function SetArchPrototype(t : boolean)
{
	archPrototype = t;
}
function GetArchPrototype()
{
	return archPrototype;
}
*/
function SetTestCases(t : String)
{
	Debug.Log("TestCases: " +t);
	if(t.Equals("system") || t.Equals("integration") || t.Equals("both"))
		archTestCases = t;
	else
		archTestCases = "both";
}
function GetTestCases()
{
	return archTestCases;
}
//-------------------------------------------------------------------------------------------------------
//Awake
//-------------------------------------------------------------------------------------------------------
function Awake ()
{
	func = GetComponentInChildren(Funcionario);
	//UpdateSlot();
}