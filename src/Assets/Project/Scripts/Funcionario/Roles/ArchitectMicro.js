#pragma strict
class ArchitectMicro extends System.ValueType{
						
	function Work(func : Funcionario, project : Project, report : WeeklyReport, floatingLines : FloatingLines, equipe : Equipe, constant : GameConstants, arquiteto : float)
	{
		var aux : float = arquiteto;
		var randomizer : float = Random.Range (0.8, 1.2);
		var randomizer2 : float = Random.Range (0.8, 1.2);
		//aux = (aux * 2);
		aux = parseInt(aux * randomizer);
		equipe.SetFindbugScore(aux);
		arquiteto = parseInt(randomizer2 * arquiteto);
		equipe.SetBonusProg(arquiteto);
		ArchitectReport(aux, aux, arquiteto, report);
		floatingLines.showFloatText1("+", aux.ToString(), "blue","% Testing");
		floatingLines.showFloatText2("+", arquiteto.ToString(), "blue", " % Archit.");
	}
	
	function ArchitectReport(system : int, integration : int, archt : int, report : WeeklyReport)
{
	report.architectReport_bugSystem = report.architectReport_bugSystem + system;
	report.architectReport_bugIntegration = report.architectReport_bugIntegration + integration;
	report.architectReport_archt = report.architectReport_archt + archt;
}

}