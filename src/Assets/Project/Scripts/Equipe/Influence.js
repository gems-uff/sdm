#pragma strict
import System;

	//Variables
	//----------------------------------------------------------------
	//Analyst
	public var prototype : float = 0.0;
	
	public var analystArchInfluence : ActionList;
	
	public var bonusAnalyst : float = 1.0;
	public var analystManagerInfluence : ActionNode = null;
	
	public var analystMarketingInfluence : ActionNode = null;
	
	//----------------------------------------------------------------
	//Architect
	public var bonusArch : float = 1.0;
	public var archManagerInfluence : ActionNode = null;
	
	//----------------------------------------------------------------
	//Manager
	
	//----------------------------------------------------------------
	//Marketing
	
	//----------------------------------------------------------------
	//Programmer
	public var bonusProg : float = 1.0;
	
	public var progArchInfluence : ActionList;
	
	public var progManagerInfluence : ActionNode = null;
	
	//----------------------------------------------------------------
	//Tester
	public var bonusTestIntegration : float = 1.0;
	public var bonusTestSystem : float = 1.0;
	
	public var testArchInfluence : ActionList;
	
	public var bonusTestAcception : float = 1.0;
	
	public var testAnalystInfluence : ActionList;
	
	//----------------------------------------------------------------
	//Reset Function
	//----------------------------------------------------------------
	function Reset()
	{
		//prototype = 0.0;
		analystArchInfluence.first = null;
		analystArchInfluence.last = null;
		
		bonusAnalyst = 1.0;
		analystManagerInfluence = null;
		
		analystMarketingInfluence = null;
		
		bonusArch = 1.0;
		archManagerInfluence = null;
		
		bonusProg = 1.0;
		progArchInfluence.first = null;
		progArchInfluence.last = null;
		
		progManagerInfluence = null;
	
		bonusTestIntegration = 1.0;
		bonusTestSystem = 1.0;
		testArchInfluence.first = null;
		testArchInfluence.last = null;
		
		bonusTestAcception = 1.0;
		testAnalystInfluence.first = null;
		testAnalystInfluence.last = null;
	}

	//----------------------------------------------------------------
	//Get/Set Functions
	//----------------------------------------------------------------
	
	//----------------------------------------------------------------
	//Analyst
	function GetPrototype () 
	{					
		return prototype;
	}
	function GetAnalystArchInfluence()
	{
	 	return analystArchInfluence;
	}
	function GetBonusAnalyst () 
	{					
		return bonusAnalyst;
	}
	function GetAnalystManagerInfluence()
	{
	 	return analystManagerInfluence;
	}
	function GetAnalystMarketingInfluence()
	{
	 	return analystMarketingInfluence;
	}
	//Set
	function SetPrototype(t: float)
	{
		prototype = t;
	}
	function SetAnalystArchInfluence(t : ActionList)
	{
		analystArchInfluence = t;
	}
	
	function SetBonusAnalyst(t: float)
	{
		bonusAnalyst = t;
	}
	function SetAnalystManagerInfluence(t : ActionNode)
	{
		analystManagerInfluence = t;
	}
	function SetAnalystMarketingInfluence(t : ActionNode)
	{
		analystMarketingInfluence = t;
	}
	
	//----------------------------------------------------------------
	//Architect
	function GetBonusArch () 
	{					
		return bonusArch;
	}
	function GetArchManagerInfluence()
	{
	 	return archManagerInfluence;
	}
	//Set
	function SetBonusArch(t: float)
	{
		bonusArch = t;
	}
	function SetArchManagerInfluence(t : ActionNode)
	{
		archManagerInfluence = t;
	}
	
	//----------------------------------------------------------------
	//Manager
	
	//----------------------------------------------------------------
	//Marketing
	
	//----------------------------------------------------------------
	//Programmer
	function GetBonusProg () 
	{					
		return bonusProg;
	}
	function GetProgArchInfluence()
	{
	 	return progArchInfluence;
	}
	function GetProgManagerInfluence()
	{
	 	return progManagerInfluence;
	}
	//Set
	function SetBonusProg(t: float)
	{
		bonusProg = t;
	}
	function SetProgArchInfluence(t : ActionList)
	{
		progArchInfluence = t;
	}
	function SetProgManagerInfluence(t : ActionNode)
	{
		progManagerInfluence = t;
	}
	
	//----------------------------------------------------------------
	//Tester
	
	function GetBonusIntegration () 
	{					
		return bonusTestIntegration;
	}
	function GetBonusSystem () 
	{					
		return bonusTestSystem;
	}
	function GetBonusAcception () 
	{					
		return bonusTestAcception;
	}
	function GetTestArchInfluence()
	{
	 	return testArchInfluence;
	}
	function GetTestAnalystInfluence()
	{
	 	return testAnalystInfluence;
	}
	//Set
	function SetBonusIntegration(t: float)
	{
		bonusTestIntegration = t;
	}
	function SetBonusSystem(t: float)
	{
		bonusTestSystem = t;
	}
	function SetBonusAcception(t: float)
	{
		bonusTestAcception = t;
	}
	function SetTestArchInfluence(t : ActionList)
	{
		testArchInfluence = t;
	}
	function SetTestAnalystInfluence(t : ActionList)
	{
		testAnalystInfluence = t;
	}


//----------------------------------------------------------------
//Get Influence by role
//----------------------------------------------------------------
function GetInfluence(t : String)
{
	
	var inf : Influence;
	inf = Instantiate(this);
	/*
	if(t == "Analyst")
	{
		//Analyst
		inf.SetPrototype(prototype);
		inf.SetAnalystArchInfluence(analystArchInfluence);
		inf.SetBonusAnalyst(bonusAnalyst);
		inf.SetAnalystManagerInfluence(analystManagerInfluence);
		inf.SetAnalystMarketingInfluence(analystMarketingInfluence);
	}
	if(t == "Architect")
	{
		//Architect
		inf.SetBonusArch(bonusArch);
		inf.SetArchManagerInfluence(archManagerInfluence);
	}
	//Manager
	//Marketing
	if(t == "Programmer")
	{
		//Programmer
		inf.SetBonusProg(bonusProg);
		inf.SetProgArchInfluence(progArchInfluence);
		inf.SetProgManagerInfluence(progManagerInfluence);
	}
	if(t == "Tester")
	{
		//Tester
		inf.SetBonusIntegration(bonusTestIntegration);
		inf.SetBonusSystem(bonusTestSystem);
		inf.SetBonusAcception(bonusTestAcception);
		inf.SetTestArchInfluence(testArchInfluence);
		inf.SetTestAnalystInfluence(testAnalystInfluence);
	}
	*/
	return inf;
}

//----------------------------------------------------------------
//Functions to get the influence (filtered by role) and update influence status
//----------------------------------------------------------------

//----------------------------------------------------------------
//Analyst
//----------------------------------------------------------------
function GetInfluenceAnalyst()
{
	return GetInfluence("Analyst");
}

function SetBonusAnalystArchitect(t: float, action : ActionNode)
{
	prototype = prototype + t;
	analystArchInfluence.Add(CopyAction(action));
}

function SetBonusAnalystManager(t: float, action : ActionNode)
{
	bonusAnalyst = bonusAnalyst + (t * 0.01);

	bonusAnalyst = System.Math.Round(bonusAnalyst, 3);
	analystManagerInfluence = action;
}
function SetBonusAnalystMarketing(t: float, action : ActionNode)
{
	bonusAnalyst = bonusAnalyst + (t * 0.01);
	bonusAnalyst = System.Math.Round(bonusAnalyst, 3);
	analystMarketingInfluence = action;
}
//----------------------------------------------------------------
//Architect
//----------------------------------------------------------------
function GetInfluenceArchitect()
{
	return GetInfluence("Architect");
}
function SetBonusArchManager(t: float, action : ActionNode)
{
	bonusArch = bonusArch + (t * 0.01);
	bonusArch = System.Math.Round(bonusArch, 3);
	archManagerInfluence = action;
}
//----------------------------------------------------------------
//Programmer
//----------------------------------------------------------------
function GetInfluenceProg()
{
	return GetInfluence("Programmer");
}

function SetBonusProgArch(t: float, action : ActionNode)
{
	bonusProg = bonusProg + (t * 0.01);
	bonusProg = System.Math.Round(bonusProg, 3);
	progArchInfluence.Add(CopyAction(action));
}
function SetBonusProgManager(t: float, action : ActionNode)
{
	bonusProg = bonusProg + (t * 0.01);
	bonusProg = System.Math.Round(bonusProg, 3);
	progManagerInfluence = action;
}
//----------------------------------------------------------------
//Tester
//----------------------------------------------------------------
function GetInfluenceTester()
{
	return GetInfluence("Tester");
}

function SetBonusTesterAnalyst(t: float, action : ActionNode)
{
	bonusTestAcception = bonusTestAcception + (t * 0.01);
	bonusTestAcception = System.Math.Round(bonusTestAcception, 3);
	testAnalystInfluence.Add(CopyAction(action));
}
function SetBonusTesterArchIntegration(t: float, action : ActionNode)
{
	bonusTestIntegration = bonusTestIntegration + (t * 0.01);
	bonusTestIntegration = System.Math.Round(bonusTestIntegration, 3);
	testArchInfluence.Add(CopyAction(action));
}
function SetBonusTesterArchSystem(t: float, action : ActionNode)
{
	bonusTestSystem = bonusTestSystem + (t * 0.01);
	bonusTestSystem = System.Math.Round(bonusTestSystem, 3);
	testArchInfluence.Add(CopyAction(action));
}

function CopyAction(action : ActionNode)
{
	var newAction : ActionNode = new ActionNode();
	newAction.date = action.date;
	newAction.who = action.who;
	newAction.task = action.task;
	newAction.role = action.role;
	newAction.influence = action.influence;
	newAction.pressure = action.pressure;
	newAction.description = action.description;
	
	return newAction;
}
