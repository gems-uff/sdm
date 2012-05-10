#pragma strict
class TesterMacro extends System.ValueType{
	
	var chance : float;
	var chanceUnitary : float;			
	var chanceAcception : float;
	var chanceIntegration : float;
	var chanceSystem : float;
			
	function Work(func : Funcionario, project : Project, report : WeeklyReport, floatingLines : FloatingLines, equipe : Equipe, constant : GameConstants, tester : float)
	{
		var bugUnitary : int = 0;
		var bugIntegration : int = 0;
		var bugSystem : int = 0;
		var bugAcception : int = 0;
		var i : int = 0;
		var totalBugsFound : int = 0;
		var random : float;
		var randomizer : float = Random.Range (0.7, 1.0);
		var findScore : int = 0;
		
		//Chances to find each bug type
		chance = tester * 0.01;
		chanceUnitary = chance * 1.0;
		chanceIntegration = chance * equipe.GetIntegrationBonus();
		chanceSystem = chance * equipe.GetSystemBonus();
		chanceAcception = chance * equipe.GetAcceptionBonus();
		
		//Number of bugs that the tester can find each day
		findScore = parseInt(tester * randomizer * constant.TESTER_DURANTE);
		//Chance to find a bug, to a total of "aux" bugs
		i = 0;
		Debug.Log("Find #Bugs: " + findScore);
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

		//project.IncrementBugsFoundByType(bugUnitary, bugIntegration, bugSystem, bugAcception);
		//Report and text
		TesterReport(i, report);
		floatingLines.showFloatText1("+", totalBugsFound.ToString(), "blue", " Bugs found");
	}
	
	function TesterReport(bug : int, report : WeeklyReport)
	{
		report.testerReport = report.testerReport + bug;
	}

}