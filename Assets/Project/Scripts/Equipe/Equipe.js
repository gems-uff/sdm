//Para usar este script:
//private var equipeObj : GameObject;
//private var equipe : Equipe;
//equipeObj = GameObject.Find("Equipe");
//equipe = equipeObj.GetComponent(Equipe);

public var stringNames : StringNames;
public var metodologia : String = "";		//Agile or Classic
public var linguagemProg : String = "";
public var playStyle : GameplayStyle;
public var timer : GameTime;
public var fichaGuiStyle : GUIStyle;

//For Micro Style
private var findBugScore : float = 1.0;
private var bonusAnalista : float = 1.0;
private var bonusArquiteto : float = 1.0;
private var bonusProg : float = 1.0;
private var hasManager : boolean = false;
private var hasMarketing : boolean = false;
//private var marBonusAnalista : float = 1.0;

//For Macro Style
private var chanceUnitary : float = 1.0;		//Default
private var chanceIntegration : float = 1.0;	//Architect
private var chanceSystem : float = 1.0;			//Architect
private var chanceAcception : float = 1.0;		//Analyst

//Reports
public var report : WeeklyReport;
public var func01 : Funcionario;
public var func02 : Funcionario;
public var func03 : Funcionario;
public var func04 : Funcionario;
public var func05 : Funcionario;
public var func06 : Funcionario;
public var func07 : Funcionario;
public var func08 : Funcionario;

//Windows
private var showJanelaReport : boolean = false;
private var windowRect : Rect = Rect (300,125,600,280);

//For the manager control
//int from 0 to 6, to be used on the func[i] array
private var staffMainProgrammer : int;//can also belong to any of the main staff roles
private var staffMainAnalyst : int;
private var staffMainArchitect : int;
private var staffMainTester : int;
private var staffSecondaryAnaliyst : int;
//private var staffSecondaryArchitect : int;
private var staffSecondaryTester : int;
//private var staffMarketing : int;

private var func = new Array();
func[0] = func01;
func[1] = func02;
func[2] = func03;
func[3] = func04;
func[4] = func05;
func[5] = func06;
func[6] = func07;
func[7] = func08;

//////////////////////////////////////////////////////////////////////////////
function SetStaffRoles()
{
	var aux : int = 0;
	var number : int = 0;
	var i : int = 0;
	
	//Select the best programmer in the staff
	aux = func[0].GetProgramador();
	for(i = 1; i < 7; i++)
	{
		if ( aux < func[i].GetProgramador())
		{
			aux = func[i].GetProgramador();
			number = i;
		}
	}
	staffMainProgrammer = number;
	
	//Select the best analyst in the staff
	aux = func[0].GetAnalista();
	number = 0;
	for(i = 1; i < 7; i++)
	{
		if(i != staffMainProgrammer)
		{
			if ( aux < func[i].GetAnalista())
			{
				aux = func[i].GetAnalista();
				number = i;
			}
		}
	}
	staffMainAnalyst = number;
	
	//Select the best architect in the staff
	aux = func[0].GetArquiteto();
	number = 0;
	for(i = 1; i < 7; i++)
	{
		if((i != staffMainProgrammer) && ( i != staffMainAnalyst))
		{
			if ( aux < func[i].GetArquiteto())
			{
				aux = func[i].GetArquiteto();
				number = i;
			}
		}
	}
	staffMainArchitect = number;
	
	//Select the best tester in the staff
	aux = func[0].GetTester();
	number = 0;
	for(i = 1; i < 7; i++)
	{
		if((i != staffMainProgrammer) && ( i != staffMainAnalyst) && (i != staffMainArchitect))
		{
			if ( aux < func[i].GetTester())
			{
				aux = func[i].GetTester();
				number = i;
			}
		}
	}
	staffMainTester = number;
	
	//Select the secondary tester in the staff
	aux = func[0].GetTester();
	number = 0;
	for(i = 1; i < 7; i++)
	{
		if((i != staffMainProgrammer) && ( i != staffMainTester) && (i != staffMainArchitect))
		{
			if ( aux < func[i].GetTester())
			{
				aux = func[i].GetTester();
				number = i;
			}
		}
	}
	staffSecondaryTester = number;
	
	//Select the secondary analyst in the staff
	aux = func[0].GetAnalista();
	number = 0;
	for(i = 1; i < 7; i++)
	{
		if((i != staffMainProgrammer) && ( i != staffMainAnalyst))
		{
			if ( aux < func[i].GetAnalista())
			{
				aux = func[i].GetAnalista();
				number = i;
			}
		}
	}
	staffSecondaryAnaliyst = number;

}

function VacantSlot()
{
	var i : int = 0;
	var vacantSlot = -1;
	while ( i < 7)
	{
		if(func[i].GetNome() == stringNames.fired)
		{
			vacantSlot = i;
			i = 10;
		}
		i++;
	}
	return vacantSlot;
}




function GetReport(){
	return report;
}
function SetReport(t : WeeklyReport){
	report = t;
}
function ShowReport(){
	showJanelaReport = true;
}

function WindowFunction_Report (windowID : int)	{
	timer.PauseGame();
	//Lado esquerdo
	GUI.Box (Rect (02,018,198,20), (" Staff: "),fichaGuiStyle);
	GUI.Box (Rect (02,038,198,20), (" Analyst's Validation:"),fichaGuiStyle);
	GUI.Box (Rect (02,058,198,20), (" Architect's Bug Find:"),fichaGuiStyle);
	GUI.Box (Rect (02,078,198,20), (" Architect's Architecture:"),fichaGuiStyle);
	GUI.Box (Rect (02,098,198,20), (" Manager's Design:"),fichaGuiStyle);
	GUI.Box (Rect (02,118,198,20), (" Manager's Development:"),fichaGuiStyle);
	GUI.Box (Rect (02,138,198,20), (" Marketing's Validation:"),fichaGuiStyle);
	GUI.Box (Rect (02,158,198,20), (" Marketing's Money:"),fichaGuiStyle);
	GUI.Box (Rect (02,178,198,20), (" Programmer's Progress:"),fichaGuiStyle);
	if(playStyle.IsMacro() == false)
	{
		GUI.Box (Rect (02,198,198,20), (" Programmer's Bugs:"),fichaGuiStyle);
		GUI.Box (Rect (02,218,198,20), (" Tester's Bug removal:"),fichaGuiStyle);
	}
	else
	{
		GUI.Box (Rect (02,198,198,20), (" Programmer's Bugs repaired:"),fichaGuiStyle);
		GUI.Box (Rect (02,218,198,20), (" Tester's Bug find:"),fichaGuiStyle);
	}
	//Relatorio da semana
	GUI.Box (Rect (200,018,100,20), (" Last week"),fichaGuiStyle);
	GUI.Box (Rect (200,038,100,20), (" + "+ report.analistReport + " %"),fichaGuiStyle);
	GUI.Box (Rect (200,058,100,20), (" + "+ report.architectReport_bug+ " %"),fichaGuiStyle);
	GUI.Box (Rect (200,078,100,20), (" + "+ report.architectReport_archt+ " %"),fichaGuiStyle);
	GUI.Box (Rect (200,098,100,20), (" + "+ report.managerReport_design+ " %"),fichaGuiStyle);
	GUI.Box (Rect (200,118,100,20), (" + "+ report.managerReport_dev+ " %"),fichaGuiStyle);
	GUI.Box (Rect (200,138,100,20), (" + "+ report.marketingReport_val + " %"),fichaGuiStyle);
	GUI.Box (Rect (200,158,100,20), (" + $"+ report.marketingReport_money),fichaGuiStyle);
	GUI.Box (Rect (200,178,100,20), (" + "+ report.programmerReport_prog),fichaGuiStyle);
	GUI.Box (Rect (200,198,100,20), (" + "+ report.programmerReport_bug),fichaGuiStyle);
	GUI.Box (Rect (200,218,100,20), (" - "+ report.testerReport),fichaGuiStyle);
	//Relatorio da semana passada
	GUI.Box (Rect (300,018,100,20), (" 2 weeks ago"),fichaGuiStyle);
	GUI.Box (Rect (300,038,100,20), (" + " +report.previousAnalistReport+ " %"),fichaGuiStyle);
	GUI.Box (Rect (300,058,100,20), (" + "+ report.previousArchitectReport_bug+ " %"),fichaGuiStyle);
	GUI.Box (Rect (300,078,100,20), (" + "+ report.previousArchitectReport_archt+ " %"),fichaGuiStyle);
	GUI.Box (Rect (300,098,100,20), (" + "+ report.previousManagerReport_design+ " %"),fichaGuiStyle);
	GUI.Box (Rect (300,118,100,20), (" + "+ report.previousManagerReport_dev+ " %"),fichaGuiStyle);
	GUI.Box (Rect (300,138,100,20), (" + "+ report.previousMarketingReport_val ),fichaGuiStyle);
	GUI.Box (Rect (300,158,100,20), (" + $"+ report.previousMarketingReport_money),fichaGuiStyle);
	GUI.Box (Rect (300,178,100,20), (" + "+ report.previousProgrammerReport_prog),fichaGuiStyle);
	GUI.Box (Rect (300,198,100,20), (" + "+ report.previousProgrammerReport_bug),fichaGuiStyle);
	GUI.Box (Rect (300,218,100,20), (" - "+ report.previousTesterReport),fichaGuiStyle);
	//Retrasada
	GUI.Box (Rect (400,018,100,20), (" 3 weeks ago"),fichaGuiStyle);
	GUI.Box (Rect (400,038,100,20), (" + " +report.previous2AnalistReport+ " %"),fichaGuiStyle);
	GUI.Box (Rect (400,058,100,20), (" + "+ report.previous2ArchitectReport_bug+ " %"),fichaGuiStyle);
	GUI.Box (Rect (400,078,100,20), (" + "+ report.previous2ArchitectReport_archt+ " %"),fichaGuiStyle);
	GUI.Box (Rect (400,098,100,20), (" + "+ report.previous2ManagerReport_design+ " %"),fichaGuiStyle);
	GUI.Box (Rect (400,118,100,20), (" + "+ report.previous2ManagerReport_dev+ " %"),fichaGuiStyle);
	GUI.Box (Rect (400,138,100,20), (" + "+ report.previous2MarketingReport_val ),fichaGuiStyle);
	GUI.Box (Rect (400,158,100,20), (" + $"+ report.previous2MarketingReport_money),fichaGuiStyle);
	GUI.Box (Rect (400,178,100,20), (" + "+ report.previous2ProgrammerReport_prog),fichaGuiStyle);
	GUI.Box (Rect (400,198,100,20), (" + "+ report.previous2ProgrammerReport_bug),fichaGuiStyle);
	GUI.Box (Rect (400,218,100,20), (" - "+ report.previous2TesterReport),fichaGuiStyle);
	//3 semanas atras
	GUI.Box (Rect (500,018,98,20), (" 4 weeks ago"),fichaGuiStyle);
	GUI.Box (Rect (500,038,98,20), (" + " +report.previous3AnalistReport+ " %"),fichaGuiStyle);
	GUI.Box (Rect (500,058,98,20), (" + "+ report.previous3ArchitectReport_bug+ " %"),fichaGuiStyle);
	GUI.Box (Rect (500,078,98,20), (" + "+ report.previous3ArchitectReport_archt+ " %"),fichaGuiStyle);
	GUI.Box (Rect (500,098,98,20), (" + "+ report.previous3ManagerReport_design+ " %"),fichaGuiStyle);
	GUI.Box (Rect (500,118,98,20), (" + "+ report.previous3ManagerReport_dev+ " %"),fichaGuiStyle);
	GUI.Box (Rect (500,138,98,20), (" + "+ report.previous3MarketingReport_val ),fichaGuiStyle);
	GUI.Box (Rect (500,158,98,20), (" + $"+ report.previous3MarketingReport_money),fichaGuiStyle);
	GUI.Box (Rect (500,178,98,20), (" + "+ report.previous3ProgrammerReport_prog),fichaGuiStyle);
	GUI.Box (Rect (500,198,98,20), (" + "+ report.previous3ProgrammerReport_bug),fichaGuiStyle);
	GUI.Box (Rect (500,218,98,20), (" - "+ report.previous3TesterReport),fichaGuiStyle);
	
	GUI.Box (Rect (002,238,596,20), (" "),fichaGuiStyle);
	GUI.Box (Rect (200,258,398,20), (" "),fichaGuiStyle);
	if (GUI.Button (Rect (02,258,196,20), "Close")) 
	{
		showJanelaReport  = false;
	}
}

function ResetStaffReport(){
	report = new WeeklyReport();
}
function StaffReport()
{
	var i : int = 0;
	for ( i = 0 ; i < 8 ; i++)
	{	
		report.previous3AnalistReport 				+= 	func[i].report.previous3AnalistReport;
		report.previous3ArchitectReport_bug 		+= 	func[i].report.previous3ArchitectReport_bug;
		report.previous3ArchitectReport_archt 	+= 	func[i].report.previous3ArchitectReport_archt;
		report.previous3ManagerReport_design 	+= 	func[i].report.previous3ManagerReport_design;
		report.previous3ManagerReport_dev 		+= 	func[i].report.previous3ManagerReport_dev;
		report.previous3MarketingReport_val 		+= 	func[i].report.previous3MarketingReport_val;
		report.previous3MarketingReport_money 	+=	func[i].report.previous3MarketingReport_money;
		report.previous3ProgrammerReport_prog 	+= 	func[i].report.previous3ProgrammerReport_prog;
		report.previous3ProgrammerReport_bug 	+= 	func[i].report.previous3ProgrammerReport_bug;
		report.previous3TesterReport 				+= 	func[i].report.previous3TesterReport;
		
		report.previous2AnalistReport 				+= 	func[i].report.previous2AnalistReport;
		report.previous2ArchitectReport_bug 		+= 	func[i].report.previous2ArchitectReport_bug;
		report.previous2ArchitectReport_archt 	+= 	func[i].report.previous2ArchitectReport_archt;
		report.previous2ManagerReport_design 	+= 	func[i].report.previous2ManagerReport_design;
		report.previous2ManagerReport_dev 		+= 	func[i].report.previous2ManagerReport_dev;
		report.previous2MarketingReport_val 		+= 	func[i].report.previous2MarketingReport_val;
		report.previous2MarketingReport_money 	+= 	func[i].report.previous2MarketingReport_money;
		report.previous2ProgrammerReport_prog 	+= 	func[i].report.previous2ProgrammerReport_prog;
		report.previous2ProgrammerReport_bug 	+= 	func[i].report.previous2ProgrammerReport_bug;
		report.previous2TesterReport 				+= 	func[i].report.previous2TesterReport;
		
		report.previousAnalistReport 					+= 	func[i].report.previousAnalistReport;
		report.previousArchitectReport_bug 		+= 	func[i].report.previousArchitectReport_bug;
		report.previousArchitectReport_archt 		+= 	func[i].report.previousArchitectReport_archt;
		report.previousManagerReport_design 		+= 	func[i].report.previousManagerReport_design;
		report.previousManagerReport_dev 			+= 	func[i].report.previousManagerReport_dev;
		report.previousMarketingReport_val 		+= 	func[i].report.previousMarketingReport_val;
		report.previousMarketingReport_money 	+= 	func[i].report.previousMarketingReport_money;
		report.previousProgrammerReport_prog 	+= 	func[i].report.previousProgrammerReport_prog;
		report.previousProgrammerReport_bug 		+= 	func[i].report.previousProgrammerReport_bug;
		report.previousTesterReport 					+= 	func[i].report.previousTesterReport;
		
		report.analistReport 								+= 	func[i].report.analistReport;
		report.architectReport_bug 					+= 	func[i].report.architectReport_bug;
		report.architectReport_archt 					+= 	func[i].report.architectReport_archt;
		report.managerReport_dev 					+= 	func[i].report.managerReport_dev;
		report.managerReport_design 				+= 	func[i].report.managerReport_design;
		report.marketingReport_val 					+= 	func[i].report.marketingReport_val;
		report.marketingReport_money 				+= 	func[i].report.marketingReport_money;
		report.programmerReport_prog 				+= 	func[i].report.programmerReport_prog;
		report.programmerReport_bug 				+= 	func[i].report.programmerReport_bug;
		report.testerReport 								+= 	func[i].report.testerReport;
	}
}
//--------------------------------------------Get/Set-----------------------------------------------------------

function GetMetodologia(){
	return metodologia;
}
function SetMetodologia(t: String){
	metodologia = t;
}
function GetLinguagem(){
	return linguagemProg;
}
function SetLinguagem(t: String){
	linguagemProg = t;
}

function GetBonusProg () {					
	return bonusProg;
}
function SetBonusProg(t: float){
	bonusProg = bonusProg + (t * 0.01);
}
function GetFindbugScore () {					
	return findBugScore;
}
function SetFindbugScore(t: float){
	findBugScore = findBugScore + (t * 0.01);
}
function GetBonusAnalista () {					
	return bonusAnalista;
}
function SetBonusAnalista(t: float){
	bonusAnalista = bonusAnalista + (t * 0.01);
}
function GetBonusArquiteto () {					
	return bonusArquiteto;
}
function SetBonusArquiteto(t: float){
	bonusArquiteto = bonusArquiteto + (t * 0.01);
}

function GetHasManager () {					
	return hasManager;
}
function SetHasManager(t: boolean){
	hasManager =  t;
}
function GetHasMarketing () {					
	return hasManager;
}
function SetHasMarketing(t: boolean){
	hasMarketing =  t;
}

//Gets Sets for Macro style
function GetUnitaryBonus() {					
	return chanceUnitary;
}
function SetUnitaryBonus(t: float){
	chanceUnitary = chanceUnitary + (t * 0.01);
}
function GetIntegrationBonus () {					
	return chanceIntegration;
}
function SetIntegrationBonus(t: float){
	chanceIntegration = chanceIntegration + (t * 0.01);
}
function GetSystemBonus () {					
	return chanceSystem;
}
function SetSystemBonus(t: float){
	chanceSystem = chanceSystem + (t * 0.01);
}
function GetAcceptionBonus () {					
	return chanceAcception;
}
function SetAcceptionBonus(t: float){
	chanceAcception = chanceAcception + (t * 0.01);
}

/*
function GetMarBonusAnalista () {					
	return marBonusAnalista;
}
function SetMarBonusAnalista(t: float){
	marBonusAnalista = marBonusAnalista + t;
}
*/
//--------------------------------------------Reset-----------------------------------------------------------

function ResetBonus(){
	findBugScore = 1.0;
	bonusAnalista = 1.0;
	bonusArquiteto = 1.0;
	bonusProg = 1.0;
	DecrementMacroBonus();
}

function DecrementMacroBonus()
{
	chanceUnitary = chanceUnitary - 0.1;
	chanceIntegration = chanceIntegration - 0.1;
	chanceSystem = chanceSystem - 0.1;
	chanceAcception = chanceAcception - 0.1;
	
	//Unitary
	if(chanceUnitary < 1.0)
	{
		chanceUnitary = 1.0;
	}
	//Integration
	if(chanceIntegration < 1.0)
	{
		chanceIntegration = 1.0;
	}
	//System
	if(chanceSystem < 1.0)
	{
		chanceSystem = 1.0;
	}
	//Acception
	if(chanceAcception < 1.0)
	{
		chanceAcception = 1.0;
	}
}
//--------------------------------------------OnGUI-----------------------------------------------------------

//Funcao da unity para a GUI
function OnGUI (){
	if(showJanelaReport)
		windowRect = GUI.Window (100, windowRect, WindowFunction_Report, "Staff Report");
}

function Update()
{
	//Debug.Log("hasManager = " + hasManager);
}