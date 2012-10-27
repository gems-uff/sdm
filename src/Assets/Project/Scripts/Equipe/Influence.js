#pragma strict
import System;
//class Influence
//{
	//Variables
	//----------------------------------------------------------------
	//Analyst
	private var default_value : float = 1.0;
	
	public var analystArchInfluence : InfluenceList;
	public var bonusAnalyst : float = default_value;
	public var analystManagerInfluence : ActionNode = null;
	public var analystMarketingInfluence : ActionNode = null;
	
	//----------------------------------------------------------------
	//Architect
	public var bonusArch : float = default_value;
	public var archManagerInfluence : ActionNode = null;
	
	//----------------------------------------------------------------
	//Programmer
	public var bonusProg : float = default_value;
	public var progArchInfluence : ActionList;
	public var progManagerInfluence : ActionNode = null;
	
	//----------------------------------------------------------------
	//Tester
	public var bonusTestIntegration : float = 1.0;
	public var bonusTestSystem : float = 1.0;
	public var testArchInfluence : InfluenceList;
	public var bonusTestAcception : float = 1.0;
	public var testAnalystInfluence : InfluenceList;
	
	/*
	public var analystArchInfluence : InfluenceList;
	
	public var bonusAnalyst : float;
	public var analystManagerInfluence : ActionNode;
	
	public var analystMarketingInfluence : ActionNode;
	
	//----------------------------------------------------------------
	//Architect
	public var bonusArch : float;
	public var archManagerInfluence : ActionNode;
	
	//----------------------------------------------------------------
	//Programmer
	public var bonusProg : float;
	
	public var progArchInfluence : ActionList;
	
	public var progManagerInfluence : ActionNode;
	
	//----------------------------------------------------------------
	//Tester
	public var bonusTestIntegration : float;
	public var bonusTestSystem : float;
	
	public var testArchInfluence : ActionList;
	
	public var bonusTestAcception : float;
	
	public var testAnalystInfluence : ActionList;
	*/
	/*
	//----------------------------------------------------------------
	//Constructor
	//----------------------------------------------------------------
	function Influence()
	{
		analystArchInfluence = new InfluenceList();
		
		bonusAnalyst  = 1.0;
		analystManagerInfluence = new ActionNode();
		
		analystMarketingInfluence = new ActionNode();
		
		//----------------------------------------------------------------
		//Architect
		bonusArch  = 1.0;
		archManagerInfluence = new ActionNode();

		//----------------------------------------------------------------
		//Programmer
		bonusProg  = 1.0;
		
		progArchInfluence = new ActionList();
		
		progManagerInfluence = new ActionNode();
		
		//----------------------------------------------------------------
		//Tester
		bonusTestIntegration  = 1.0;
		bonusTestSystem  = 1.0;
		
		testArchInfluence = new ActionList();
		
		bonusTestAcception  = 1.0;
		
		testAnalystInfluence = new ActionList();
		this.Reset();
	
	}
	*/
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
	function SetTestArchInfluence(t : InfluenceList)
	{
		testArchInfluence = t;
	}
	function SetTestAnalystInfluence(t : InfluenceList)
	{
		testAnalystInfluence = t;
	}

	
	//----------------------------------------------------------------
	//Get Influence by role
	//----------------------------------------------------------------
	/*
	function Clone()
	{
		var inf : Influence = new Influence();
		*/
		/*
		inf.analystArchInfluence = this.analystArchInfluence;
		inf.bonusAnalyst  = this.bonusAnalyst;
		inf.analystManagerInfluence = this.analystManagerInfluence;
		inf.analystMarketingInfluence = this.analystMarketingInfluence;
		//----------------------------------------------------------------
		//Architect
		inf.bonusArch  = this.bonusArch;
		inf.archManagerInfluence = this.archManagerInfluence;
		//----------------------------------------------------------------
		//Programmer
		inf.bonusProg  = this.bonusProg;
		inf.progArchInfluence = this.progArchInfluence;
		inf.progManagerInfluence = this.progManagerInfluence;
		//----------------------------------------------------------------
		//Tester
		inf.bonusTestIntegration  = this.bonusTestIntegration;
		inf.bonusTestSystem  = this.bonusTestSystem;
		inf.testArchInfluence = this.testArchInfluence;
		inf.bonusTestAcception  = this.bonusTestAcception;
		inf.testAnalystInfluence = this.testAnalystInfluence;
		*/
		/*
		//Analyst
		inf.SetAnalystArchInfluence(analystArchInfluence.Clone());
		inf.SetBonusAnalyst(bonusAnalyst);
		inf.SetAnalystManagerInfluence(analystManagerInfluence);
		inf.SetAnalystMarketingInfluence(analystMarketingInfluence);
		//Architect
		inf.SetBonusArch(bonusArch);
		inf.SetArchManagerInfluence(archManagerInfluence);
		//Programmer
		inf.SetBonusProg(bonusProg);
		inf.SetProgArchInfluence(progArchInfluence);
		inf.SetProgManagerInfluence(progManagerInfluence);
		//Tester
		inf.SetBonusIntegration(bonusTestIntegration);
		inf.SetBonusSystem(bonusTestSystem);
		inf.SetBonusAcception(bonusTestAcception);
		inf.SetTestArchInfluence(testArchInfluence);
		inf.SetTestAnalystInfluence(testAnalystInfluence);
		return inf;
	}
	*/
	
	function GetInfluence()
	{
		var inf : Influence;
		inf = Instantiate(this);
		//var inf : Influence = new Influence();
		
		//inf = this.Clone();
		
		return inf;
	}
	
	//----------------------------------------------------------------
	//Functions to get the influence (filtered by role) and update influence status
	//----------------------------------------------------------------
	
	//----------------------------------------------------------------
	//Analyst
	//----------------------------------------------------------------
	function GetInfluenceAnalystPrototype()
	{
		//var inf : Influence = new Influence();
		//inf = this.Clone();
		var inf : Influence;
		inf = Instantiate(this);
		
		inf.analystArchInfluence.first.next = null;
		
		analystArchInfluence.RemoveFirst();
		return inf;
	}
	
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
	function SetBonusTesterAnalyst(t: float, action : ActionNode)
	{
		this.bonusTestAcception = bonusTestAcception + (t * 0.01);
		this.bonusTestAcception = System.Math.Round(bonusTestAcception, 3);
		this.testAnalystInfluence.Add(CopyAction(action));
	}
	function SetBonusTesterArchIntegration(t: float, action : ActionNode)
	{
		this.bonusTestIntegration = bonusTestIntegration + (t * 0.01);
		this.bonusTestIntegration = System.Math.Round(bonusTestIntegration, 3);
		this.testArchInfluence.Add(CopyAction(action));
	}
	function SetBonusTesterArchSystem(t: float, action : ActionNode)
	{
		this.bonusTestSystem = bonusTestSystem + (t * 0.01);
		this.bonusTestSystem = System.Math.Round(bonusTestSystem, 3);
		this.testArchInfluence.Add(CopyAction(action));
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
//}
