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
	private var delay : float;
	private var rate : int;
	private var prov : ExtractProvenance;
	
	var behavior : BehaviorPlanner;
	var date : GameTime;
				
	function Work(funcP : Funcionario, projectP : Project, reportP : WeeklyReport, floatingLinesP : FloatingLines, equipeP : Equipe, 
	constantP : GameConstants, arquitetoP : float, behaviorP : BehaviorPlanner, dateP : GameTime, delay : float, rate : int, prov_ : ExtractProvenance)
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
		this.delay = delay;
		this.rate = rate;
		this.prov = prov_;
		
		if(equipe.influences.GetBonusArch()!= 1.0)
		{
			arquiteto = arquiteto * (1 + equipe.influences.GetBonusArch());
			actionNode.influence = equipe.influences.GetInfluence("Architect");
		}
		var randomizer : float = Random.Range (-1.5, 0.5);
		var randomizer_2 : float = Random.Range (0.75, 1.25);
		
		//Generate negative influence
		var chance : float = Random.Range (0.0, 110);
		if(func.GetArquiteto() < chance)
			arquiteto = parseInt(arquiteto * randomizer);
		else
			arquiteto = parseInt(randomizer_2 * arquiteto);
		
		qnt = parseInt(arquiteto * 0.05);
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
				actionNode.NewActionArtifact(task + "_System", d1, d2, func, date, "Architect", qnt.ToString() + " STC", "System Test Cases", rate);
			else
				actionNode.NewActionNoArtifact(task + "_System", d1, d2, func, date, "Architect", qnt.ToString() + " STC", rate);
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
					actionNode.NewActionArtifact(task + "_Integration", d1, d2, func, date, "Architect", qnt.ToString() + " ITC", "Integration Test Cases", rate);
				else
					actionNode.NewActionNoArtifact(task + "_Integration", d1, d2, func, date, "Architect", qnt.ToString() + " ITC", rate);
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
						actionNode.NewActionArtifact(task + "_System", d1, d2, func, date, "Architect", qnt.ToString() + " STC", "System Test Cases", rate);
					else
						actionNode.NewActionNoArtifact(task + "_System", d1, d2, func, date, "Architect", qnt.ToString() + " STC", rate);
					MakeSystemCases(actionNode);
				}
				else
				{
					d1 = "Employee was ordered to focus on " + descr + " \n and make both types of test cases";
					d2 = "Employee was ordered to focus on " + descr + " <br> and make both types of test cases";
					if(qnt > 0)
						actionNode.NewActionArtifact(task + "_Integration", d1, d2, func, date, "Architect", qnt.ToString() + " ITC", "Integration Test Cases", rate);
					else
						actionNode.NewActionNoArtifact(task + "_Integration", d1, d2, func, date, "Architect", qnt.ToString() + " ITC", rate);
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
			actionNode.NewActionNoArtifact(task + "_Architecture", d1, d2, func, date, "Architect", arquiteto.ToString() + " % Aid Programmer", rate);
			ModularizateCode(actionNode);
		}
		else
		{
			var randomizer : float = Random.Range (0, 100); 
			if(arquiteto > randomizer)
			{
				d1 = "Employee was ordered to focus on " + descr + "\n and made a prototype";
				d2 = "Employee was ordered to focus on " + descr + "<br> and made a prototype";
				actionNode.NewActionArtifact(task + "_Prototype", d1, d2, func, date, "Architect", "1 Prototype Created", "Prototype", rate);
				MakePrototype(actionNode);
			}
			else
			{
				d1 = "Employee was ordered to focus on " + descr + "\n and did not finish the prototype";
				d2 = "Employee was ordered to focus on " + descr + "<br> and did not finish the prototype";
				actionNode.NewActionNoArtifact(task + "_Prototype", d1, d2, func, date, "Architect", "0 Prototype", rate);
				FailPrototype(actionNode);
			}
			//MakePrototype(actionNode);
		}
	}
	
	function Analysis(actionNode : ActionNode)
	{
		//var d1 : String = "Employee was ordered to do a prototype";
		//var d2 : String = "Employee was ordered to do a prototype";
		//actionNode.NewActionArtifact("Analysis", d1, d2, func, date, "Architect", "1 Prototype", "Prototype", rate);
		var randomizer : float = Random.Range (0, 100); 
		if(arquiteto > randomizer)
		{
			var d1 : String = "Employee was ordered to do a prototype";
			var d2 : String = "Employee was ordered to do a prototype";
			actionNode.NewActionArtifact("Analysis", d1, d2, func, date, "Architect", "1 Prototype Created", "Prototype", rate);
			MakePrototype(actionNode);
		}
		else
		{
			d1 = "Employee was ordered to do a prototype" + "\n and did not finish the prototype";
			d2 = "Employee was ordered to do a prototype" + "<br> and did not finish the prototype";
			actionNode.NewActionNoArtifact("Analysis", d1, d2, func, date, "Architect", "0 Prototype", rate);
			FailPrototype(actionNode);
		}
		//MakePrototype(actionNode);
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
		floatingLines.showFloatText1("", "Prototype", "blue","", delay);
		project.AddPrototype();
		ArchitectReport(0, 0, 0, report);
		
		ProvenanceWithArtifact(prov, actionNode, "1", " Prototype", "Prototype");
	}
	function FailPrototype(actionNode : ActionNode)
	{
		//equipe.SetBonusAnalystArchitect(1.0, actionNode);
		//equipe.influences.SetBonusAnalystArchitect(1.0, actionNode);
		floatingLines.showFloatText1("", "No Prototype", "blue","", delay);
		ArchitectReport(0, 0, 0, report);
		
		ProvenanceFail(prov, actionNode);
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
		floatingLines.showFloatText1("", "System Cases", "blue","", delay);
		floatingLines.showFloatText2("+", qnt.ToString(), "blue"," System Case", delay);
		ArchitectReport(arquiteto, 0, 0, report);
		
		ProvenanceWithArtifact(prov, actionNode, qnt.ToString(), "STC", "System Test Cases");
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
		floatingLines.showFloatText1("", "Integr Cases", "blue","", delay);
		floatingLines.showFloatText2("+", qnt.ToString(), "blue"," Integr Case", delay);
		ArchitectReport(0, arquiteto, 0, report);
		
		ProvenanceWithArtifact(prov, actionNode, qnt.ToString(), "ITC", "Integration Test Cases");
	}
	
	//Modularizate the code to aid the programmers
	function ModularizateCode(actionNode : ActionNode)
	{
		//equipe.SetBonusProg(arquiteto);
		var sign : String = "+";
		var color : String = "blue";
		if(arquiteto < 0)
		{
			sign = "";
			color = "red";
		}
		equipe.influences.SetBonusProgArch(arquiteto, actionNode);
		floatingLines.showFloatText1("", "Modularization", "blue","", delay);
		floatingLines.showFloatText2(sign, arquiteto.ToString(), color, " % Archit.", delay);
		ArchitectReport(0, 0, arquiteto, report);
		
		ProvenanceAid(prov, actionNode, arquiteto.ToString() + " %", "Aid");
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
	
	function Provenance(prov : ExtractProvenance, actionNode : ActionNode, influence : String, infType : String)
	{
		prov.HasInfluence("Architect");
		prov.GenerateInfluence("Project", "ARCHITECT", infType, influence);
	}
	
	function ProvenanceAid(prov : ExtractProvenance, actionNode : ActionNode, influence : String, infType : String)
	{
		prov.HasInfluence("Architect");
		prov.GenerateInfluence("Programmer", "ARCHITECT", "Aid", influence + "%");
	}
	function ProvenanceFail(prov : ExtractProvenance, actionNode : ActionNode)
	{
		prov.HasInfluence("Architect");
		//prov.GenerateInfluence("Project", "ARCHITECT", infType, "+" + influence);
	}
	
	function ProvenanceWithArtifact(prov : ExtractProvenance, actionNode : ActionNode, influence : String, infType : String, artifactName : String)
	{
		var tempVertex : Vertex;
		Provenance(prov, actionNode, influence, "ATC");
		// Generate artifact
		tempVertex = prov.GetCurrentVertex();
		prov.AddAttribute("name", artifactName);
		prov.NewEntityVertex(actionNode.date, "Artifact", "");
		if(artifactName == "Prototype")
		{
			prov.GenerateInfluence("Prototype", "ARTIFACT", infType, influence, parseInt(influence));
		}
		else
		{
			prov.GenerateInfluence("Tester", "ARTIFACT", infType, influence, parseInt(influence));
		}
		
		
		prov.SetCurrentVertex(tempVertex);
	}

}