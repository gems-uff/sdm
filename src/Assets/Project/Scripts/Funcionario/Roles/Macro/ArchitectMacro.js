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
	var date : GameTime;
				
	function Work(funcP : Funcionario, projectP : Project, reportP : WeeklyReport, floatingLinesP : FloatingLines, equipeP : Equipe, 
	constantP : GameConstants, arquitetoP : float, behaviorP : BehaviorPlanner, dateP : GameTime)
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
		
		//Generate negative influence
		if(func.GetArquiteto() < 40)
			arquiteto = parseInt((arquiteto - 40) * randomizer);
		else
			arquiteto = parseInt(randomizer * arquiteto);
		
		qnt = parseInt(arquiteto * 0.025);
		DecisionTree(actionNode);
		
		//MakePrototype();
		//MakeSystemCases();
		//MakeIntegrationCases();
		//ModularizateCode();
		actionNode.projectStat = behavior.Log.GetProjectStat();
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
		var d1 : String;
		var d2 : String;
		//System
		if(behavior.GetTestCases() == "system")
		{
			d1 = "Employee was ordered to focus on " + descr + " \n and make System test cases";
			d2 = "Employee was ordered to focus on " + descr + " <br> and make System test cases";
			if(qnt > 0)
				actionNode.NewAction(task + "_System", d1, d2, func, date, "Architect", qnt.ToString() + " STC", "System Test Cases");
			else
				actionNode.NewAction(task + "_System", d1, d2, func, date, "Architect", qnt.ToString() + " STC");
			MakeSystemCases(actionNode);
		}
		else
		{
			//Integration
			if(behavior.GetTestCases() == "integration")
			{
				d1 = "Employee was ordered to focus on " + descr + " \n and make Integration test cases";
				d2 = "Employee was ordered to focus on " + descr + " <br> and make Integration test cases";
				if(qnt > 0)
					actionNode.NewAction(task + "_Integration", d1, d2, func, date, "Architect", qnt.ToString() + " ITC", "Integration Test Cases");
				else
					actionNode.NewAction(task + "_Integration", d1, d2, func, date, "Architect", qnt.ToString() + " ITC");
				MakeIntegrationCases(actionNode);
			}
			//Both
			else
			{
				if(chance < 50)
				{
					d1 = "Employee was ordered to focus on " + descr + " \n and make both types of test cases";
					d2 = "Employee was ordered to focus on " + descr + " <br> and make both types of test cases";
					if(qnt > 0)
						actionNode.NewAction(task + "_System", d1, d2, func, date, "Architect", qnt .ToString() + " STC", "System Test Cases");
					else
						actionNode.NewAction(task + "_System", d1, d2, func, date, "Architect", qnt .ToString() + " STC");
					MakeSystemCases(actionNode);
				}
				else
				{
					d1 = "Employee was ordered to focus on " + descr + " \n and make both types of test cases";
					d2 = "Employee was ordered to focus on " + descr + " <br> and make both types of test cases";
					if(qnt > 0)
						actionNode.NewAction(task + "_Integration", d1, d2, func, date, "Architect", qnt.ToString() + " ITC", "Integration Test Cases");
					else
						actionNode.NewAction(task + "_Integration", d1, d2, func, date, "Architect", qnt.ToString() + " ITC");
					MakeIntegrationCases(actionNode);
				}
			}
		}
	}
	
	function Evolution(actionNode : ActionNode, testCase : String, chance : int, task : String, descr : String)
	{
		var d1 : String;
		var d2 : String;
		if(chance < 75)
		{
			d1 = "Employee was ordered to focus on " + descr + " \n and improved the architecture";
			d2 = "Employee was ordered to focus on " + descr + " <br> and improved the architecture";
			actionNode.NewAction(task + "_Architecture", d1, d2, func, date, "Architect", arquiteto.ToString() + " % Aid");
			ModularizateCode(actionNode);
		}
		else
		{
			d1 = "Employee was ordered to focus on " + descr + "\n and made a prototype";
			d2 = "Employee was ordered to focus on " + descr + "<br> and made a prototype";
			actionNode.NewAction(task + "_Prototype", d1, d2, func, date, "Architect", "1 Prototype" , "Prototype");
			MakePrototype(actionNode);
		}
	}
	
	function Analysis(actionNode : ActionNode)
	{
		var d1 : String = "Employee was ordered to do a prototype";
		var d2 : String = "Employee was ordered to do a prototype";
		actionNode.NewAction("Analysis", d1, d2, func, date, "Architect", "1 Prototype", "Prototype");
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
		if(qnt > 0)
		{
			equipe.influences.SetBonusTesterArchSystem(arquiteto, actionNode, qnt);
			project.testCases.AddSystem(qnt);
		}
		floatingLines.showFloatText1("", "System Cases", "blue","");
		floatingLines.showFloatText2("+", arquiteto.ToString(), "blue"," % System");
		ArchitectReport(arquiteto, 0, 0, report);
	}
	
	//Make test cases for integration bugs
	function MakeIntegrationCases(actionNode : ActionNode)
	{
		//equipe.SetIntegrationBonus(arquiteto);
		if(qnt > 0)
		{
			equipe.influences.SetBonusTesterArchIntegration(arquiteto, actionNode, qnt);
			project.testCases.AddIntegration(qnt);
		}
		floatingLines.showFloatText1("", "Integr Cases", "blue","");
		floatingLines.showFloatText2("+", arquiteto.ToString(), "blue"," % Integration");
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
	//Report
	//--------------------------------------------
	function ArchitectReport(system : int, integration : int, archt : int, report : WeeklyReport)
	{
		report.architectReport_bugSystem = report.architectReport_bugSystem + system;
		report.architectReport_bugIntegration = report.architectReport_bugIntegration + integration;
		report.architectReport_archt = report.architectReport_archt + archt;
	}

}