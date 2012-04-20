#pragma strict
class AnalystMacro extends System.ValueType{
						
	function Work(func : Funcionario, project : Project, report : WeeklyReport, floatingLines : FloatingLines, equipe : Equipe, constant : GameConstants, analista : float)
	{
		var randomizer : float = Random.Range (0.5, 1.0);
		if(project.GetSincronismo() == 00)	//Se o projeto esta sendo iniciado, entao o valor de sincronismo inicial varia de acordo com o desempenho do analista
		{
			analista = analista * constant.ANALISTA_INICIO * randomizer;
			analista = Mathf.Round(analista * 100f) / 100f;
			project.SetSincronismo(analista);
			AnalistReport(parseInt(analista), report);
			floatingLines.showFloatText2("+", analista.ToString(), "blue", " Val.");
		}
		else
		{
			if(project.GetSincronismo() < 100)	//Se o projeto esta em andamento entao o sincronismo vai mudando lentamente de acordo com o analista
			{
				analista = analista / (project.GetProjectSize() * 0.001);
				analista = analista * randomizer;
				analista = Mathf.Round(analista * 100f) / 100f; //Para truncar na segunda casa decimal
				project.SetSincronismo(analista);
				AnalistReport(parseInt(analista), report);
				floatingLines.showFloatText2("+", analista.ToString(), "blue", " Val.");
			}
		}
	}
	
	function AnalistReport(t : int, report : WeeklyReport)
	{
		report.analistReport = report.analistReport + t;
	}

}