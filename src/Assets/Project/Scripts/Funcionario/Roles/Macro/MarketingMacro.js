#pragma strict

//Aid Analyst
//Generate Income

class MarketingMacro extends System.ValueType{
	
						
	function Work(func : Funcionario, project : Project, report : WeeklyReport, floatingLines : FloatingLines, equipe : Equipe, 
	constant : GameConstants, playerStats : PlayerStats, marketing : float, date : int)
	{
		var randomizer : float = Random.Range (5.0, 7.5);
		var randomizer2 : float = Random.Range (4.0, 6.0);
		var aux : float = marketing * 0.5;
		var actionNode : ActionNode = new ActionNode();
		
		marketing = parseInt(aux * randomizer2 * 4);
		aux = parseInt(aux * randomizer);
		
		actionNode.NewAction("Aid", "Marketing Generated Income and aided Analyst, if any", func, date, "Marketing", aux.ToString() + "% Aid", "");
		
		equipe.SetBonusAnalista(aux);
		equipe.influences.SetBonusAnalystMarketing(aux, actionNode);
		//equipe.SetBonusAnalystMarketing(aux, actionNode);
		
		playerStats.ChangeSaldo(marketing);
		MarketingReport(aux, marketing, report);
		floatingLines.showFloatText1("+", aux.ToString(), "blue", "% Val.");
		floatingLines.showFloatText2("+", marketing.ToString(), "", " Credits");
		
		return actionNode;
	}
	
	function MarketingReport(val : int, money : int, report : WeeklyReport)
	{
		report.marketingReport_val = report.marketingReport_val + val;
		report.marketingReport_money = report.marketingReport_money + money;
	}
	/*
	function NewAction(actionNode : ActionNode, task : String, description : String, func : Funcionario, date : int)
	{
		actionNode.who = func.GetNome();
		actionNode.task = task;
		actionNode.date = date;
		actionNode.role = "Marketing";
		//actionNode.influence = null;
		actionNode.description = description;
		actionNode.morale = func.GetMorale();
		actionNode.stamina = func.GetStamina();
	}
	*/
}