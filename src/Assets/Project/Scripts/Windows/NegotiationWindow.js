//Para usar este script:
//var menuObj : GameObject;
//private var menuNegotiation : NegotiationWindow;
//menuObj = GameObject.Find("GUI");
//menuNegotiation = menuObj.GetComponent(NegotiationWindow);
//menuNegotiation.SetShowWindow(func);

public var MARKETING_FACTOR : int = 4; //O max que o marketing pode alterar eh em 25% (100 / 4)
public var project : Project;
public var timer : GameTime;
public var windowController : WindowController;
private var windowRect : Rect = Rect (800,125,200,215);
private var showWindow : boolean = false;

private var lockNegotiation : boolean = false;
private var tradeSet : boolean = false;
private var scopeBool : boolean = false;
private var timeBool : boolean = false;
private var moneyBool : boolean = false;
private var qualityBool : boolean = false;
private var tradeOffSet : boolean = false;
private var lessMoney : boolean = false;
private var lessTime : boolean = false;
private var moreQuality : boolean = false;
private var moreScope : boolean = false;
private var func : Funcionario;

function GetLockNegotiation(){
	return lockNegotiation;
}
function UnLockNegotiation(){	//Usado quando terminar o projeto
	lockNegotiation = false;
}
function SetShowWindow(funcionario : Funcionario){
	func = funcionario;
	//showWindow = true;
}

function ResetItems(){
	scopeBool = false;
	timeBool = false;
	moneyBool = false;
	qualityBool = false;

	lessMoney = false;
	lessTime = false;
	moreQuality = false;
	moreScope = false;
	tradeSet = false;
	tradeOffSet = false;
}
function Action(text : String, work_1 : String, work_2 : String)
{
	var action : ActionNode = new ActionNode();
	action.NewAction("Negotiation", text, text, func, timer, "Marketing", "Negotiating", work_1, work_2, "");
	action.projectStat = func.behavior.Log.GetProjectStat();
	func.behavior.AddAction(action);
}
function ApplyChanges(){
	var marketing : float = func.GetMarketing();
	var marketing_more : float;
	var marketing_less : float;
	var trade : float;
	var tradeOff : float;
	//var bonus : String;
	//var penalty : String;
	marketing = (marketing / MARKETING_FACTOR / 100);
	marketing_more = 1 + marketing;
	marketing_less = 1 - marketing;
	func.EarnExperienceNegotiation(parseInt(marketing * 100));
	
	var description : String = "Asked for ";
	var gain : String = "";
	var inExchange : String = "";
	
	if(scopeBool == true)
	{
		trade = project.GetProjectSize();
		trade = trade * marketing_less;
		trade = parseInt(trade);
		project.SetProjectSize(trade);
		description += "lower scope";
		gain = "- %" +  (1 - marketing_less) + " Scope";
		//bonus = "+" + marketing_less + "scope";
	}
	if(timeBool == true)
	{
		trade = project.GetDeadlineDays();
		trade = trade * marketing_more;
		trade = parseInt(trade);
		trade = trade + project.GetStartDay();
		project.SetDeadline(trade);
		description += "more time";
		gain = "+ %" +  (marketing_more) + " Time";
		//bonus = "+" + trade + "time";
	}
	if(moneyBool == true)
	{
		trade = project.GetPagamento();
		trade = trade * marketing_more;
		trade = parseInt(trade);
		project.SetPagamento(trade);
		description += "more credits";
		gain = "+ %" +  (marketing_more) + " Credits";
		//bonus = "+" + trade + "credits";
	}
	if(qualityBool == true)
	{
		trade = project.GetBugValue();
		trade = trade * marketing_less;
		trade = parseInt(trade);
		project.SetBugValue(trade);
		description += "less quality";
		gain = "- %" +  (1 - marketing_less) + " Quality";
		//bonus = "+" + trade + "quality";
	}
	//Tradeoff
	if(moreScope == true)
	{
		tradeOff = project.GetProjectSize();
		tradeOff = tradeOff * marketing_more;
		tradeOff = parseInt(tradeOff);
		project.SetProjectSize(tradeOff);
		description += " in exchange of more scope";
		inExchange = "+ %" +  (marketing_more) + " Scope";
		//penalty = "+" + tradeOff + "scope";
	}
	if(lessTime == true)
	{
		tradeOff = project.GetDeadlineDays();
		tradeOff = tradeOff * marketing_less;
		tradeOff = parseInt(tradeOff);
		tradeOff = tradeOff + project.GetStartDay();
		project.SetDeadline(tradeOff);
		description += " in exchange of less time";
		inExchange = "- %" +  (1 - marketing_less) + " Time";
		//penalty = "-" + tradeOff + "time";
	}
	if(lessMoney == true)
	{
		tradeOff = project.GetPagamento();
		tradeOff = tradeOff * marketing_less;
		tradeOff = parseInt(tradeOff);
		project.SetPagamento(tradeOff);
		description += " in exchange of less credits";
		inExchange = "- %" +  (1 - marketing_less) + " Credits";
		//penalty = "-" + tradeOff + "credits";
	}
	if(moreQuality == true)
	{
		trade = project.GetBugValue();
		trade = trade * marketing_more;
		trade = parseInt(trade);
		project.SetBugValue(trade);
		description += " in exchange of more quality";
		inExchange = "+ %" +  (marketing_more) + " Quality";
		//penalty = "-" + tradeOff + "credits";
	}
	Action(description, gain, inExchange);
}

function WindowFunction(windowID : int){
	timer.PauseGame();
	GUI.Box (Rect (02,020,196,25),"What you want:");
	
	scopeBool = GUI.Toggle (Rect (02, 043, 98, 30), scopeBool, "- Scope");
	if(scopeBool == true)
	{
		timeBool = false;
		moneyBool = false;
		qualityBool = false;
		tradeSet = true;
	}
	timeBool = GUI.Toggle (Rect (100, 043, 98, 30), timeBool, "+ Time");
	if(timeBool == true)
	{
		scopeBool = false;
		moneyBool = false;
		qualityBool = false;
		tradeSet = true;
	}
	moneyBool = GUI.Toggle (Rect (02, 073, 98, 30), moneyBool, "+ Money");
	if(moneyBool == true)
	{
		timeBool = false;
		scopeBool = false;
		qualityBool = false;
		tradeSet = true;
	}
	qualityBool = GUI.Toggle (Rect (100, 073, 98, 30), qualityBool, "- Quality");
	if(qualityBool == true)
	{
		timeBool = false;
		moneyBool = false;
		scopeBool = false;
		tradeSet = true;
	}
	
	GUI.Box (Rect (02,103,196,25),"In exchange of:");

	moreScope = GUI.Toggle (Rect (02, 128, 98, 30), moreScope, "+ Scope");
	if(moreScope == true)
	{
		lessTime = false;
		lessMoney = false;
		moreQuality = false;
		tradeOffSet = true;
	}
	lessTime = GUI.Toggle (Rect (100, 128, 98, 30), lessTime, "- Time");
	if(lessTime == true)
	{
		moreScope = false;
		lessMoney = false;
		moreQuality = false;
		tradeOffSet = true;
	}
	lessMoney = GUI.Toggle (Rect (02, 158, 98, 30), lessMoney, "- Money");
	if(lessMoney == true)
	{
		lessTime = false;
		moreScope = false;
		moreQuality = false;
		tradeOffSet = true;
	}
	moreQuality = GUI.Toggle (Rect (100, 158, 98, 30), moreQuality, "+ Quality");
	if(moreQuality == true)
	{
		lessTime = false;
		lessMoney = false;
		moreScope = false;
		tradeOffSet = true;
	}
	if (!scopeBool && !timeBool && !moneyBool && !qualityBool)
		tradeSet = false;
	if (!moreScope && !lessTime && !lessMoney && !moreQuality)
		tradeOffSet = false;
	if (GUI.Button (Rect (02,188,98,25), "Cancel")) 
	{
		//showWindow  = false;
		windowController.DisableNegWindow();
	}
	if ( tradeOffSet && tradeSet)
		if (GUI.Button (Rect (100,188,98,25), "Ok")) 
		{
			//showWindow  = false;
			windowController.DisableNegWindow();
			ApplyChanges();
			lockNegotiation = true;
			ResetItems();
		}
	GUI.DragWindow();
}

//--------------------------------------------OnGUI-----------------------------------------------------------

function OnGUI () {
	//GUI.backgroundColor = Color.yellow;
	//GUI.contentColor = Color.green;
	//if(showWindow && !lockNegotiation)
	//	windowRect = GUI.Window (7, windowRect, WindowFunction, "Negotiation");
}