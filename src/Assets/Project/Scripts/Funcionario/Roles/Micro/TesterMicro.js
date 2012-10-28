#pragma strict
class TesterMicro extends System.ValueType{
						
	function Work(func : Funcionario, project : Project, report : WeeklyReport, floatingLines : FloatingLines, equipe : Equipe, constant : GameConstants, tester : float, RequisitoLinguagem : boolean)
	{
		var bugCount : int = 0;
		var i : int;
		var random : int;
		var randomizer : float = Random.Range (0.7, 1.0);
		
		if (RequisitoLinguagem)
		{
			tester = tester * equipe.GetFindbugScore() * constant.TESTER;
			tester = parseInt(tester * randomizer);
			//Chance to remove a bug, to a total of "aux" bugs
			for (i = 0; i < tester; i++)
			{
				random = Random.Range (0, 10);
				if (random > 5)
				{
					bugCount++;
					project.SetNumBugs(-1);
				}
			}
			TesterReport(bugCount, report);
			floatingLines.showFloatText1(" -", bugCount.ToString(), "blue", " Bugs");
		}
	}
	
	function TesterReport(bug : int, report : WeeklyReport)
	{
	report.testerReport = report.testerReport + bug;
	}

}