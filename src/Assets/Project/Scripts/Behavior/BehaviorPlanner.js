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

//For Analysts
private var anaElicitation : boolean = false;
private var anaEspecification : boolean = false;
private var anaQuality : boolean = false;
private var anaRounded : boolean = true;



//For everyone
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
//Functions for Analyst
//-------------------------------------------------------------------------------------------------------

function ActivateAnaElicitation()
{
	SetAnaElicitation(true);
	SetAnaEspecification(false);
	SetAnaQuality(false);
	SetAnaRounded(false);
}

function ActivateAnaEspecification()
{
	SetAnaElicitation(false);
	SetAnaEspecification(true);
	SetAnaQuality(false);
	SetAnaRounded(false);
}

function ActivateAnaQuality()
{
	SetAnaElicitation(false);
	SetAnaEspecification(false);
	SetAnaQuality(true);
	SetAnaRounded(false);
}

function ActivateAnaRounded()
{
	SetAnaElicitation(false);
	SetAnaEspecification(false);
	SetAnaQuality(false);
	SetAnaRounded(true);
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
	//Debug.Log("TestCases: " +t);
	if(t.Equals("system") || t.Equals("integration") || t.Equals("both"))
		archTestCases = t;
	else
		archTestCases = "both";
}
function GetTestCases()
{
	return archTestCases;
}
function CheckTestCase(t: String)
{
	if(archTestCases.Equals(t))
		return true;
	else
		return false;
}

//Analyst Gets/Sets
function SetAnaElicitation(t : boolean)
{
	anaElicitation = t;
}
function GetAnaElicitation()
{
	return anaElicitation;
}
function SetAnaEspecification(t : boolean)
{
	anaEspecification = t;
}
function GetAnaEspecification()
{
	return anaEspecification;
}
function SetAnaQuality(t : boolean)
{
	anaQuality = t;
}
function GetAnaQuality()
{
	return anaQuality;
}
function SetAnaRounded(t : boolean)
{
	anaRounded = t;
}
function GetAnaRounded()
{
	return anaRounded;
}
//-------------------------------------------------------------------------------------------------------
//Awake
//-------------------------------------------------------------------------------------------------------
function Awake ()
{
	func = GetComponentInChildren(Funcionario);
	//UpdateSlot();
}