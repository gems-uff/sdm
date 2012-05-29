#pragma strict
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
			MakeSystemCases();
		}
		else
		{
			//Integration
			if(behavior.GetTestCases() == "integration")
			{
				NewAction(actionNode, task + " Integration", "Employee was ordered to \n focus on " + descr + " \n and make Integration test cases");
				MakeIntegrationCases();
			}
			//Both
			else
			{
				if(chance < 50)
				{
					NewAction(actionNode, task + " System", "Employee was ordered to \n focus on " + descr + " \n and make both types of test cases");
					MakeSystemCases();
				}
				else
				{
					NewAction(actionNode, task + " Integration", "Employee was ordered to \n focus on " + descr + " \n and make both types of test cases");
					MakeIntegrationCases();
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
			MakePrototype();
		}
	}
	
	function Analysis(actionNode : ActionNode)
	{
		NewAction(actionNode, "Analysis Prototype", "Employee was ordered to \n do a prototype");
		MakePrototype();
	}
	
	function Rounded(actionNode : ActionNode, testCase : String, chance : int)
	{
		if(chance < 50)
		{
			chance = Random.Range (0, 100); 
			Verification(actionNode, testCase, chance, "Rounded", "Rounded");
		}
		else
		{
			chance = Random.Range (0, 100); 
			Evolution(actionNode, testCase, chance, "Rounded", "Rounded");
		}
	}
	
	//--------------------------------------------
	//Leaf Functions
	//--------------------------------------------
	//Makes a prototype for the analyst
	function MakePrototype()
	{
		//ArchitectReport(aux, arquiteto, report);
		floatingLines.showFloatText1("", "Prototype", "blue","");
	}
	
	//Make test cases for system bugs
	function MakeSystemCases()
	{
		equipe.SetSystemBonus(arquiteto);
		floatingLines.showFloatText1("", "System Cases", "blue","");
		floatingLines.showFloatText2("+", arquiteto.ToString(), "blue","% System");
		//ArchitectReport(aux, arquiteto, report);
	}
	
	//Make test cases for integration bugs
	function MakeIntegrationCases()
	{
		equipe.SetIntegrationBonus(arquiteto);
		floatingLines.showFloatText1("", "Integr Cases", "blue","");
		floatingLines.showFloatText2("+", arquiteto.ToString(), "blue","% Integration");
		//ArchitectReport(aux, arquiteto, report);
	}
	
	//Modularizate the code to aid the programmers
	function ModularizateCode(actionNode : ActionNode)
	{
		equipe.SetBonusProg(arquiteto);
		equipe.influenceProg.SetBonusProg(arquiteto, actionNode);
		floatingLines.showFloatText1("", "Modularization", "blue","");
		floatingLines.showFloatText2("+", arquiteto.ToString(), "blue", " % Archit.");
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
		actionNode.influence = null;
		actionNode.description = description;
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