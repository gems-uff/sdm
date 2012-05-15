#pragma strict

private var isPressured : boolean = false;
private var pAction : ActionNode;
private var progRepair : boolean = false;
private var progEvolution : boolean = true;

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