#pragma strict

//Find bugs
//Need to redo Tester. Create leaf nodes and influences link.
//Make 2 choices: With test cases and without
//Allow player to choose which type of tests to run ? Or run them all ?

class TesterMacro extends System.ValueType{
	
	var chance : float;
	var chanceUnitary : float;			
	var chanceAcception : float;
	var chanceIntegration : float;
	var chanceSystem : float;
	
	var behavior : BehaviorPlanner;
			
	function Work(func : Funcionario, project : Project, report : WeeklyReport, floatingLines : FloatingLines, equipe : Equipe, 
	constant : GameConstants, tester : float, date : GameTime, behaviorP : BehaviorPlanner, delay : float, rate : int)
	{
		behavior = behaviorP;
		
		var bugUnitary : int = 0;
		var bugIntegration : int = 0;
		var bugSystem : int = 0;
		var bugAcception : int = 0;
		var i : float = 0;
		var totalBugsFound : int = 0;
		var random : float;
		var randomizer : float = Random.Range (0.5, 1.5);
		var findScore : int = 0;
		
		var actionNode : ActionNode = new ActionNode();
		var typeUsed : String;
		
		var d1 : String;
		var d2 : String;
		
		//Chances to find each bug type
		chance = tester * 0.01;
		chanceUnitary = chance * 1.0;
		chanceIntegration = chance * equipe.GetIntegrationBonus();
		chanceSystem = chance * equipe.GetSystemBonus();
		chanceAcception = chance * equipe.GetAcceptionBonus();
		
		//Number of bugs that the tester can find each day
		findScore = parseInt(tester * randomizer * constant.TESTER * 0.1);
		//Chance to find a bug, to a total of "aux" bugs
		i = 1;
		//Debug.Log("Find #Bugs: " + findScore);
		//First check if there are any test cases ready
		if(project.testCases.HasTestCase())
		{
			//Consume a test case
			//NewAction(actionNode, "Test: Cases", "Tester used Test Cases", func, date);
			actionNode.influence = equipe.influences.GetInfluence("Tester");
			while(i < findScore && project.testCases.HasTestCase())
			{
				i += 1.5;
				typeUsed = project.testCases.Use();
				equipe.influences.ConsumeInfluenceTester(typeUsed, actionNode.influence);
				
				totalBugsFound++;
				//Debug.Log("Found: " + totalBugsFound);
			}
			d1 = "Tester used Test Cases";
			d2 = "Tester used Test Cases";
			actionNode.NewActionArtifact("Test_Cases", d1, d2, func, date, "Tester", totalBugsFound.ToString() + " Bug Found", "", rate);
		}
		else
		{
			//We do Adhoc
			//NewAction(actionNode, "Test: Adhoc", "Tester searched in Adhoc-mode", func, date);
			
			while(i < findScore)
			{
				i++;
				//For Acception bug
				random = Random.Range (0.0, 2.5);
				if ((random < chanceAcception)&& project.GetBugAcception() > project.GetBugAcceptionFound())
				{
					project.IncrementBugsFoundByType(0, 0, 0, 1);
					totalBugsFound++;
				}
				else
				{
					//For System bug
					random = Random.Range (0.0, 3.0);
					if ((random < chanceSystem) && project.GetBugSystem() > project.GetBugSystemFound())
					{
						project.IncrementBugsFoundByType(0, 0, 1, 0);
						totalBugsFound++;
					}
					else
					{
						//For Integration bug
						random = Random.Range (0.0, 3.0);
						if ((random < chanceIntegration)&& project.GetBugIntegration() > project.GetBugIntegrationFound())
						{
							project.IncrementBugsFoundByType(0, 1, 0, 0);
							totalBugsFound++;
						}
						else
						{
							//For unitary bug
							random = Random.Range (0.0, 3.0);
							if ((random < chanceUnitary)&& project.GetBugUnitary() > project.GetBugUnitaryFound())
							{
								project.IncrementBugsFoundByType(1, 0, 0, 0);
								totalBugsFound++;
							}
						}
					}
				}
			}
			d1 = "Tester searched in Adhoc-mode";
			d2 = "Tester searched in Adhoc-mode";
			actionNode.NewActionArtifact("Test_Adhoc", d1, d2, func, date, "Tester", totalBugsFound.ToString() + " Bug Found", "", rate);
			if(totalBugsFound > 0)
				actionNode.projectStat = behavior.Log.GetProjectStat();
		}
		//actionNode.projectStat = behavior.Log.GetProjectStat();
		//project.IncrementBugsFoundByType(bugUnitary, bugIntegration, bugSystem, bugAcception);
		//Report and text
		TesterReport(totalBugsFound, report);
		floatingLines.showFloatText1("+", totalBugsFound.ToString(), "blue", " Bugs found", delay);
		
		return actionNode;
	}
	
	function TesterReport(bug : int, report : WeeklyReport)
	{
		report.testerReport = report.testerReport + bug;
	}
}