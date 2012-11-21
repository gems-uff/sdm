#pragma strict

//Aid Analyst
//Generate Income

class MarketingMacro extends System.ValueType{
	
						
	var behavior : BehaviorPlanner;
	
	function Work(func : Funcionario, project : Project, report : WeeklyReport, floatingLines : FloatingLines, equipe : Equipe, 
	constant : GameConstants, playerStats : PlayerStats, marketing : float, date : int, behaviorP : BehaviorPlanner)
	{
		var randomizer_aid : float = Random.Range (2.0, 2.5);
		var randomizer_creds : float = Random.Range (3.0, 5.0);
		var aid : float = marketing;
		var credits : int = marketing;
		var actionNode : ActionNode = new ActionNode();
		
		this.behavior = behaviorP;
		//Generate negative influence
		if(func.GetMarketing() < 40)
			aid = parseInt((aid - 40) * randomizer_aid);
		else
			aid = parseInt(aid * randomizer_aid);
		
		credits = parseInt(credits * randomizer_creds * 2);
		
		var d1 : String = "Marketing Generated Income and aided Analyst, if any";
		var d2 : String = "Marketing Generated Income and aided Analyst, if any";
		actionNode.NewAction("Aid", d1, d2, func, date, "Marketing", aid.ToString() + "% Aid", credits.ToString() + " Credits", "0", "");
		
		equipe.SetBonusAnalista(aid);
		equipe.influences.SetBonusAnalystMarketing(aid, actionNode);
		//equipe.SetBonusAnalystMarketing(aid, actionNode);
		
		playerStats.ChangeSaldo(credits);
		actionNode.projectStat = behavior.Log.GetProjectStat();
		MarketingReport(aid, marketing, report);
		floatingLines.showFloatText1("+", aid.ToString(), "blue", "% Val.");
		floatingLines.showFloatText2("+", credits.ToString(), "", " Credits");
		
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