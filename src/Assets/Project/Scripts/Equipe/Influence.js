#pragma strict
import System;
//class Influence
//{
	//Variables
	//----------------------------------------------------------------
	//Analyst
	private var default_value : float = 1.0;
	
	public var bonusAnalyst : float = default_value;
	public var analystArchInfluence : InfluenceList = new InfluenceList();
	public var analystManagerInfluence : ActionNode = null;
	public var analystMarketingInfluence : ActionNode = null;
	
	//----------------------------------------------------------------
	//Architect
	public var bonusArch : float = default_value;
	public var archManagerInfluence : ActionNode = null;
	
	//----------------------------------------------------------------
	//Programmer
	public var bonusProg : float = default_value;
	public var progArchInfluence : InfluenceList = new InfluenceList();
	public var progManagerInfluence : ActionNode = null;
	
	//----------------------------------------------------------------
	//Tester
	public var bonusTestIntegration : float = 1.0;
	public var bonusTestSystem : float = 1.0;
	public var bonusTestAcception : float = 1.0;
	
	public var testArchIntegration : InfluenceList = new InfluenceList();
	public var testArchSystem : InfluenceList = new InfluenceList();
	public var testAnalystInfluence : InfluenceList = new InfluenceList();
	public var testProgInfluence : InfluenceList = new InfluenceList();
	
	
	//----------------------------------------------------------------
	//Reset Function
	//----------------------------------------------------------------
	function Reset()
	{		
		bonusAnalyst = default_value;
		analystManagerInfluence = null;
		
		analystMarketingInfluence = null;
		
		bonusArch = default_value;
		archManagerInfluence = null;
		
		bonusProg = default_value;
		progArchInfluence.first = null;
		progArchInfluence.last = null;
		
		progManagerInfluence = null;
	
		bonusTestIntegration = 1.0;
		bonusTestSystem = 1.0;
		//testArchInfluence.first = null;
		//testArchInfluence.last = null;
		
		bonusTestAcception = 1.0;
		//testAnalystInfluence.first = null;
		//testAnalystInfluence.last = null;
		
		//testProgInfluence.first = null;
		//testProgInfluence.last = null;
	}
	function StartNew()
	{		
		bonusAnalyst = default_value;
		analystManagerInfluence = null;
		
		analystMarketingInfluence = null;
		
		bonusArch = default_value;
		archManagerInfluence = null;
		
		bonusProg = default_value;
		progArchInfluence.first = null;
		progArchInfluence.last = null;
		
		progManagerInfluence = null;
	
		bonusTestIntegration = 1.0;
		bonusTestSystem = 1.0;
		testArchIntegration.first = null;
		testArchIntegration.last = null;
		testArchSystem.first = null;
		testArchSystem.last = null;
		
		bonusTestAcception = 1.0;
		testAnalystInfluence.first = null;
		testAnalystInfluence.last = null;
		
		testProgInfluence.first = null;
		testProgInfluence.last = null;
	}
	
	//----------------------------------------------------------------
	//Get Influence by role
	//----------------------------------------------------------------
	
	//TODO:
	//Need to change on exportLog

	function GetInfluence(role : String)
	{
		var inf : InfluenceValues = new InfluenceValues();
		switch(role)
		{
			case "Analyst":
				inf.num = bonusAnalyst;
				inf.valid = true;
				inf.influence.Add(analystManagerInfluence);
				inf.influence.Add(analystMarketingInfluence);
			break;
			case "Prototype":
				inf.num = bonusAnalyst;
				inf.valid = true;
				//inf.artifact = "Prototype";
				inf.influence.Add(analystManagerInfluence);
				inf.influence.Add(analystMarketingInfluence);
				inf.influence.Add(analystArchInfluence.first.action);
				analystArchInfluence.RemoveFirst();
			break;
			case "Architect":
				inf.num = bonusArch;
				inf.valid = true;
				inf.influence.Add(archManagerInfluence);
			break;
			case "Programmer":
				inf.num = bonusProg;
				inf.valid = true;
				AddfromList(inf, progArchInfluence);
				inf.influence.Add(progManagerInfluence);
			break;
			case "Tester":
				inf.num = 1.0;
				inf.valid = true;
				//inf.artifact = "TestCase";
				//Test cases influence are added when they are consumed
			break;
			
			default:
			break;
		}
		return inf;

	}
	function AddfromList(inf : InfluenceValues, list : InfluenceList)
	{
		var current : InfluenceNode;
		current = list.first;
		while(current != null)
		{
			inf.influence.Add(current.action);
			current = current.next;
		}
	}
	
	function ConsumeInfluenceTester(type : String, inf : InfluenceValues)
	{
		switch(type)
		{
			case "Integration":
				inf.influence.Add(testArchIntegration.first.action);
				testArchIntegration.RemoveFirst();
			break;
			case "System":
				inf.influence.Add(testArchSystem.first.action);
				testArchSystem.RemoveFirst();
			break;
			case "Acception":
				inf.influence.Add(testAnalystInfluence.first.action);
				testAnalystInfluence.RemoveFirst();
			break;
			case "Unitary":
				inf.influence.Add(testProgInfluence.first.action);
				testProgInfluence.RemoveFirst();
			break;
			default:
			break;
		}
	}
	//----------------------------------------------------------------
	//Analyst
	//----------------------------------------------------------------
	
	function SetBonusAnalystArchitect(t: float, action : ActionNode)
	{
		this.analystArchInfluence.Add(CopyAction(action));
	}
	
	function SetBonusAnalystManager(t: float, action : ActionNode)
	{
		this.bonusAnalyst = bonusAnalyst + (t * 0.01);
	
		this.bonusAnalyst = System.Math.Round(bonusAnalyst, 3);
		this.analystManagerInfluence = action;
	}
	function SetBonusAnalystMarketing(t: float, action : ActionNode)
	{
		this.bonusAnalyst = bonusAnalyst + (t * 0.01);
		this.bonusAnalyst = System.Math.Round(bonusAnalyst, 3);
		this.analystMarketingInfluence = action;
	}
	//----------------------------------------------------------------
	//Architect
	//----------------------------------------------------------------
	function SetBonusArchManager(t: float, action : ActionNode)
	{
		this.bonusArch = bonusArch + (t * 0.01);
		this.bonusArch = System.Math.Round(bonusArch, 3);
		this.archManagerInfluence = action;
	}
	//----------------------------------------------------------------
	//Programmer
	//----------------------------------------------------------------
	function SetBonusProgArch(t: float, action : ActionNode)
	{
		this.bonusProg = bonusProg + (t * 0.01);
		this.bonusProg = System.Math.Round(bonusProg, 3);
		this.progArchInfluence.Add(CopyAction(action));
	}
	function SetBonusProgManager(t: float, action : ActionNode)
	{
		this.bonusProg = bonusProg + (t * 0.01);
		this.bonusProg = System.Math.Round(bonusProg, 3);
		this.progManagerInfluence = action;
	}
	//----------------------------------------------------------------
	//Tester
	//----------------------------------------------------------------
	
	function SetBonusTesterAnalyst(t: float, action : ActionNode, qnt : int)
	{
		this.bonusTestAcception = bonusTestAcception + (t * 0.01);
		this.bonusTestAcception = System.Math.Round(bonusTestAcception, 3);
		for(var i : int = 0; i < qnt; i++)
		{
			this.testAnalystInfluence.Add(CopyAction(action));
		}
	}
	function SetBonusTesterArchIntegration(t: float, action : ActionNode, qnt : int)
	{
		//var i : int = 0;
		this.bonusTestIntegration = bonusTestIntegration + (t * 0.01);
		this.bonusTestIntegration = System.Math.Round(bonusTestIntegration, 3);
		for(var i : int = 0; i < qnt; i++)
		{ 
			this.testArchIntegration.Add(CopyAction(action));
		}
	}
	function SetBonusTesterArchSystem(t: float, action : ActionNode, qnt : int)
	{
		this.bonusTestSystem = bonusTestSystem + (t * 0.01);
		this.bonusTestSystem = System.Math.Round(bonusTestSystem, 3);
		for(var i : int = 0; i < qnt; i++)
		{ 
			this.testArchSystem.Add(CopyAction(action));
		}
	}
	function SetBonusTesterProg(action : ActionNode, qnt : int)
	{
		for(var i : int = 0; i < qnt; i++)
		{ 
			this.testProgInfluence.Add(CopyAction(action));
		}
	}
	
	function CopyAction(action : ActionNode)
	{
		/*
		var newAction : ActionNode = new ActionNode();
		newAction.date = action.date;
		newAction.who = action.who;
		newAction.task = action.task;
		newAction.role = action.role;
		newAction.influence = action.influence;
		newAction.pressure = action.pressure;
		newAction.description = action.description;
		
		return newAction;
		*/
		return action;
	}

//======================================================================================
	
	//----------------------------------------------------------------
	//Get/Set Functions
	//----------------------------------------------------------------
	
	//----------------------------------------------------------------
	//Analyst
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
	function SetAnalystArchInfluence(t : InfluenceList)
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
	function SetProgArchInfluence(t : InfluenceList)
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
	function GetTestArchIntegration()
	{
	 	return testArchIntegration;
	}
	function GetTestArchSystem()
	{
	 	return testArchSystem;
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
	function SetTestArchIntegration(t : InfluenceList)
	{
		testArchIntegration = t;
	}
	function SetTestArchSystem(t : InfluenceList)
	{
		testArchSystem = t;
	}
	function SetTestAnalystInfluence(t : InfluenceList)
	{
		testAnalystInfluence = t;
	}