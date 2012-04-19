#pragma strict
class Architect extends System.ValueType{
						
	function Work(func : Funcionario, project : Project, report : WeeklyReport, floatingLines : FloatingLines, equipe : Equipe, constant : GameConstants, arquiteto : float)
	{
		var aux : float = arquiteto;
		var randomizer : float = Random.Range (0.8, 1.2);
		var randomizer2 : float = Random.Range (0.8, 1.2);
		aux = (aux * 2);
		aux = parseInt(aux * randomizer);
		equipe.SetFindbugScore(aux);
		arquiteto = parseInt(randomizer2 * aux / 10);
		equipe.SetBonusProg(arquiteto);
		ArchitectReport(aux, arquiteto, report);
		floatingLines.showFloatText1("+", aux.ToString(), "blue","% Testing");
		floatingLines.showFloatText2("+", arquiteto.ToString(), "blue", " % Archit.");
	}
	
	function ArchitectReport(bug : int, archt : int, report : WeeklyReport)
{
	report.architectReport_bug = report.architectReport_bug + bug;
	report.architectReport_archt = report.architectReport_archt + archt;
}

}