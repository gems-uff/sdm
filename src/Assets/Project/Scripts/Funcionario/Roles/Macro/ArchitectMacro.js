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
	
	var behavior : BehaviorPlanner;
	var date : int;
				
	function Work(funcP : Funcionario, projectP : Project, reportP : WeeklyReport, floatingLinesP : FloatingLines, equipeP : Equipe, constantP : GameConstants, arquitetoP : float, behaviorP : BehaviorPlanner, dateP : int)
	{
		var actionNode : ActionNode = new ActionNode();
		
		func = funcP;
		project = projectP;
		report = reportP;
		floatingLines = floatingLinesP;
		equipe = equipeP;
		constant = constantP;
		arquiteto = arquitetoP;
		
		behavior = behaviorP;
		date = dateP;
		 
		
		if(equipe.influences.GetBonusArch()!= 1.0)
		{
			arquiteto = arquiteto * (1 + equipe.influences.GetBonusArch());
			actionNode.influence = equipe.influences.GetInfluence();
		}
		
		var randomizer : float = Random.Range (0.8, 1.2);
		
		arquiteto = parseInt(randomizer * arquiteto);
		
		
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
			NewAction(actionNode, task + " System", "Employee was ordered to \n focus on " + descr + " \n and make System test cases");
			MakeSystemCases(actionNode);
		}
		else
		{
			//Integration
			if(behavior.GetTestCases() == "integration")
			{
				NewAction(actionNode, task + " Integration", "Employee was ordered to \n focus on " + descr + " \n and make Integration test cases");
				MakeIntegrationCases(actionNode);
			}
			//Both
			else
			{
				if(chance < 50)
				{
					NewAction(actionNode, task + " System", "Employee was ordered to \n focus on " + descr + " \n and make both types of test cases");
					MakeSystemCases(actionNode);
				}
				else
				{
					NewAction(actionNode, task + " Integration", "Employee was ordered to \n focus on " + descr + " \n and make both types of test cases");
					MakeIntegrationCases(actionNode);
				}
			}
		}
	}
	function Evolution(actionNode : ActionNode, testCase : String, chance : int, task : String, descr : String)
	{
		if(chance < 75)
		{
			NewAction(actionNode, task + " Architecture", "Employee was ordered to \n focus on " + descr + " \n and improved the architecture");
			ModularizateCode(actionNode);
		}
		else
		{
			NewAction(actionNode, task + " Prototype", "Employee was ordered to \n focus on " + descr + "\n and made a prototype");
			MakePrototype(actionNode);
		}
	}
	
	function Analysis(actionNode : ActionNode)
	{
		NewAction(actionNode, "Analysis Prototype", "Employee was ordered to \n do a prototype");
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
		equipe.influences.SetBonusTesterArchSystem(arquiteto, actionNode);
		floatingLines.showFloatText1("", "System Cases", "blue","");
		floatingLines.showFloatText2("+", arquiteto.ToString(), "blue","% System");
		ArchitectReport(arquiteto, 0, 0, report);
	}
	
	//Make test cases for integration bugs
	function MakeIntegrationCases(actionNode : ActionNode)
	{
		//equipe.SetIntegrationBonus(arquiteto);
		equipe.influences.SetBonusTesterArchIntegration(arquiteto, actionNode);
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