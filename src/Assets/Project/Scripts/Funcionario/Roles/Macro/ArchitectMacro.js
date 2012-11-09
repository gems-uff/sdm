#pragma strict

//Make Prototypes for the analyst
//Make System Cases: Aid Tester
//Make Integration Cases: Aid Tester
//Modularizate Code: Aid Programmer


class ArchitectMacro extends System.ValueType{
			
	private var func : Funcionario;
	private var project : Project;
	private var report : WeeklyReport;
	private var floatingLines : FloatingLines;
	private var equipe : Equipe;
	private var constant : GameConstants;
	private var arquiteto : float;	
	private var qnt : int;
	
	var behavior : BehaviorPlanner;
	var date : int;
				
	function Work(funcP : Funcionario, projectP : Project, reportP : WeeklyReport, floatingLinesP : FloatingLines, equipeP : Equipe, constantP : GameConstants, arquitetoP : float, behaviorP : BehaviorPlanner, dateP : int)
	{
		var actionNode : ActionNode = new ActionNode();
		
		this.func = funcP;
		this.project = projectP;
		this.report = reportP;
		this.floatingLines = floatingLinesP;
		this.equipe = equipeP;
		this.constant = constantP;
		this.arquiteto = arquitetoP;
		
		this.behavior = behaviorP;
		this.date = dateP;
		 
		
		if(equipe.influences.GetBonusArch()!= 1.0)
		{
			arquiteto = arquiteto * (1 + equipe.influences.GetBonusArch());
			actionNode.influence = equipe.influences.GetInfluence("Architect");
		}
		
		var randomizer : float = Random.Range (0.8, 1.2);
		
		arquiteto = parseInt(randomizer * arquiteto);
		qnt = parseInt(arquiteto * 0.025);
		
		DecisionTree(actionNode);
		
		//MakePrototype();
		//MakeSystemCases();
		//MakeIntegrationCases();
		//ModularizateCode();
		
		return actionNode;
	}
	
	//--------------------------------------------
	//Decision Tree
	//--------------------------------------------
	function DecisionTree(actionNode : ActionNode)
	{
		var chance : int = Random.Range (0, 100);
		var testCase : String = behavior.GetTestCases();;
		//Verification
		if(behavior.GetArchVerification())
		{
			Verification(actionNode, testCase, chance, "Verification", " Verification");
		}
		else
		{
			//Evolution
			if(behavior.GetArchEvolution())
			{
				Evolution(actionNode, testCase, chance, "Evolution", "Evolution");
			}
			else
			{
				//Analysis
				if(behavior.GetArchAnalysis())
				{
					Analysis(actionNode);
				}
				else
				{
					//Rounded
					Rounded(actionNode, testCase, chance);
				}
			}
		}
	
	}
	
	//--------------------------------------------
	//Decision Paths
	//--------------------------------------------
	function Verification(actionNode : ActionNode, testCase : String, chance : int, task : String, descr : String)
	{
		//System
		if(behavior.GetTestCases() == "system")
		{
			actionNode.NewAction(task + " System", "Employee was ordered to \n focus on " + descr + " \n and make System test cases", func, date, "Architect", qnt);
			MakeSystemCases(actionNode);
		}
		else
		{
			//Integration
			if(behavior.GetTestCases() == "integration")
			{
				actionNode.NewAction(task + " Integration", "Employee was ordered to \n focus on " + descr + " \n and make Integration test cases", func, date, "Architect", qnt);
				MakeIntegrationCases(actionNode);
			}
			//Both
			else
			{
				if(chance < 50)
				{
					actionNode.NewAction(task + " System", "Employee was ordered to \n focus on " + descr + " \n and make both types of test cases", func, date, "Architect", qnt);
					MakeSystemCases(actionNode);
				}
				else
				{
					actionNode.NewAction(task + " Integration", "Employee was ordered to \n focus on " + descr + " \n and make both types of test cases", func, date, "Architect", qnt);
					MakeIntegrationCases(actionNode);
				}
			}
		}
	}
	function Evolution(actionNode : ActionNode, testCase : String, chance : int, task : String, descr : String)
	{
		if(chance < 75)
		{
			actionNode.NewAction(task + " Architecture", "Employee was ordered to \n focus on " + descr + " \n and improved the architecture", func, date, "Architect", arquiteto);
			ModularizateCode(actionNode);
		}
		else
		{
			actionNode.NewAction(task + " Prototype", "Employee was ordered to \n focus on " + descr + "\n and made a prototype", func, date, "Architect", 1);
			MakePrototype(actionNode);
		}
	}
	
	function Analysis(actionNode : ActionNode)
	{
		actionNode.NewAction("Analysis Prototype", "Employee was ordered to \n do a prototype", func, date, "Architect", 1);
		MakePrototype(actionNode);
	}
	
	function Rounded(actionNode : ActionNode, testCase : String, chance : int)
	{
		if(chance < 50)
		{
			chance = Random.Range (0, 100); 
			Verification(actionNode, testCase, chance, "Balanced", "Balanced");
		}
		else
		{
			chance = Random.Range (0, 100); 
			Evolution(actionNode, testCase, chance, "Balanced", "Balanced");
		}
	}
	
	//--------------------------------------------
	//Leaf Functions
	//--------------------------------------------
	//Makes a prototype for the analyst
	function MakePrototype(actionNode : ActionNode)
	{
		//equipe.SetBonusAnalystArchitect(1.0, actionNode);
		equipe.influences.SetBonusAnalystArchitect(1.0, actionNode);
		floatingLines.showFloatText1("", "Prototype", "blue","");
		project.AddPrototype();
		ArchitectReport(0, 0, 0, report);
	}
	
	//Make test cases for system bugs
	function MakeSystemCases(actionNode : ActionNode)
	{
		//equipe.SetSystemBonus(arquiteto);
		equipe.influences.SetBonusTesterArchSystem(arquiteto, actionNode, qnt);
		project.testCases.AddSystem(qnt);
		floatingLines.showFloatText1("", "System Cases", "blue","");
		floatingLines.showFloatText2("+", arquiteto.ToString(), "blue","% System");
		ArchitectReport(arquiteto, 0, 0, report);
	}
	
	//Make test cases for integration bugs
	function MakeIntegrationCases(actionNode : ActionNode)
	{
		//equipe.SetIntegrationBonus(arquiteto);
		equipe.influences.SetBonusTesterArchIntegration(arquiteto, actionNode, qnt);
		project.testCases.AddIntegration(qnt);
		floatingLines.showFloatText1("", "Integr Cases", "blue","");
		floatingLines.showFloatText2("+", arquiteto.ToString(), "blue","% Integration");
		ArchitectReport(0, arquiteto, 0, report);
	}
	
	//Modularizate the code to aid the programmers
	function ModularizateCode(actionNode : ActionNode)
	{
		//equipe.SetBonusProg(arquiteto);
		equipe.influences.SetBonusProgArch(arquiteto, actionNode);
		floatingLines.showFloatText1("", "Modularization", "blue","");
		floatingLines.showFloatText2("+", arquiteto.ToString(), "blue", " % Archit.");
		ArchitectReport(0, 0, arquiteto, report);
	}
	
	//--------------------------------------------
	//Set the action
	//--------------------------------------------
	/*
	function NewAction(actionNode : ActionNode, task : String, description : String)
	{
		actionNode.who = func.GetNome();
		actionNode.task = task;
		actionNode.date = date;
		actionNode.role = "Architect";
		actionNode.description = description;
		actionNode.morale = func.GetMorale();
		actionNode.stamina = func.GetStamina();
	}
	*/
	
	//--------------------------------------------
	//Report
	//--------------------------------------------
	function ArchitectReport(system : int, integration : int, archt : int, report : WeeklyReport)
	{
		report.architectReport_bugSystem = report.architectReport_bugSystem + system;
		report.architectReport_bugIntegration = report.architectReport_bugIntegration + integration;
		report.architectReport_archt = report.architectReport_archt + archt;
	}

}