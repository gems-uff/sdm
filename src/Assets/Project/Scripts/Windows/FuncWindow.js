//Para usar este script:
//private var menuObj : GameObject;
//private var menu : FuncWindow;
//menuObj = GameObject.Find("GUI");
//menu = menuObj.GetComponent(FuncWindow);
//menu.SetJanelatributo(funcionario : Funcionario);

public var DAYS_MONTH : int = 28;
public var timer : GameTime;
public var stringNames : StringNames;
public var fichaGuiStyle : GUIStyle;
private var especializacao_array = new Array(17);
private var atributos : Atributos = new Atributos();

private var nome : String;
private var salario : int;
private var salarioDay : int;
private var papel : String;
private var papelSec : String;
private var papelRate : int;
private var papelSecRate : int;

private var cargo : String;
private var showJanela :boolean = false;
private var showJanelaLevel	:boolean = false;
private var showJanelaReport :boolean = false;
private var showCloseButton : boolean = true;
private var workHours : int;
private var morale : int;
private var stamina : int;
private var level : int;
private var experience : int;
private var req_exp : int;

private var aux_adap: int = 0;
private var aux_auto : int = 0;
private var aux_det : int = 0;
private var aux_neg : int = 0;
private var aux_obj : int = 0;
private var aux_org : int = 0;
private var aux_pac : int = 0;
private var aux_rac : int = 0;
private var aux_rel : int = 0;

private var report : WeeklyReport;

private var windowRect : Rect = Rect (600,125,400,480);
private var windowRect2 : Rect = Rect (300,125,200,280);
private var windowRect3 : Rect = Rect (300,125,600,300);

function DisableShowWindow(){
	showJanela = false;
	showJanelaLevel = false;
	showJanelaReport = false;
}
//--------------------------------------------FichaFuncionarioEspecializacao-----------------------------------------------------------

//Funcao que seta os atributos do funcionario corrente, chamada pelo script DialogInstance, item Qualificacao. Primeiro atributo eh para abilitar a janela, os demais sao os atributos em ordem alfabetica
function SetJanelatributo(funcionario : Funcionario, closeButton : boolean, weeklyReport : WeeklyReport){
	var i : int = 0;
	var a2 : Especializacoes;
	showCloseButton = closeButton;
	if(funcionario.GetNome() != stringNames.fired)
	{
		a2 = funcionario.GetEspecializacao();
		nome = funcionario.GetNome();
		atributos = funcionario.GetAtributos();
		salario = funcionario.GetSalario();
		salarioDay = salario / DAYS_MONTH;
		papel = funcionario.GetPapel();
		papelSec = funcionario.GetPapelSec();
		papelRate = funcionario.GetPapelRate();
		papelSecRate = funcionario.GetPapelSecRate();
		cargo = funcionario.GetCargo();
		workHours = funcionario.GetWorkingHours();
		showJanela = true;
		morale = funcionario.GetMorale();
		stamina = funcionario.GetStamina();
		level = funcionario.GetLevel();
		experience = funcionario.GetExperience();
		req_exp = funcionario.GetReq_Experience();
		
		aux_adap = funcionario.GetAdapMod();
		aux_auto = funcionario.GetAutoMod();
		aux_det = funcionario.GetDetMod();
		aux_neg = funcionario.GetNegMod();
		aux_obj = funcionario.GetObjMod();
		aux_org = funcionario.GetOrgMod();
		aux_pac = funcionario.GetPacMod();
		aux_rac = funcionario.GetRacMod();
		aux_rel = funcionario.GetRelMod();
		
		SetReport(weeklyReport);
		
		for (i=0;i<=17;i++)
			especializacao_array[i]  = "";
		
		i = 0;
		if ( a2.assembly == true )
		{
			especializacao_array[i] = stringNames.showEsp01;
			i++;
		}
		if ( a2.csharp == true )
		{
			especializacao_array[i] = stringNames.showEsp02;
			i++;
		}
		if ( a2.java == true )
		{
			especializacao_array[i] =  stringNames.showEsp03;
			i++;
		}
		if ( a2.perl == true )
		{
			especializacao_array[i] =  stringNames.showEsp04;
			i++;
		}
		if ( a2.ruby == true )
		{
			especializacao_array[i] =  stringNames.showEsp05;
			i++;
		}
		if ( a2.metodoAgil == true )
		{
			especializacao_array[i] = stringNames.showEsp06;
			i++;
		}
		if ( a2.metodoClassico == true )
		{
			especializacao_array[i] = stringNames.showEsp07;
			i++;
		}
		if ( a2.analiseDeProgramas == true )
		{
			especializacao_array[i] = stringNames.showEsp08;
			i++;
		}
		if ( a2.controleDeVersao == true )
		{
			especializacao_array[i] = stringNames.showEsp09;
			i++;
		}
		if ( a2.depuracao == true )
		{
			especializacao_array[i] = stringNames.showEsp10;
			i++;
		}
		if ( a2.gerenciaDeProjetos == true )
		{
			especializacao_array[i] = stringNames.showEsp11;
			i++;
		}
		if ( a2.metricas == true )
		{
			especializacao_array[i] = stringNames.showEsp12;
			i++;
		}
		if ( a2.planejamento == true )
		{
			especializacao_array[i] = stringNames.showEsp13;
			i++;
		}
		if ( a2.teste == true )
		{
			especializacao_array[i] = stringNames.showEsp14;
			i++;
		}
	}
}

//--------------------------------------------FichaFuncionario-----------------------------------------------------------

//Funcao que exibe na tela os status do funcionario
function WindowFunction (windowID : int)	{
	timer.PauseGame();
	//Lado esquerdo
	GUI.Box (Rect (02,018,198,20), (" Name: "+ nome),fichaGuiStyle);
	GUI.Box (Rect (02,038,198,20), (" Morale: "+ morale + "%"),fichaGuiStyle);
	GUI.Box (Rect (02,058,198,20), (" Stamina: "+ stamina + "%"),fichaGuiStyle);
	GUI.Box (Rect (02,078,198,20), (" Role: "+ papel),fichaGuiStyle);
	
	GUI.Box (Rect (02,098,198,20), (" Sec Role: "+ papelSec),fichaGuiStyle);
	GUI.Box (Rect (02,118,198,20), (" Role Rate: "+ papelRate),fichaGuiStyle);
	GUI.Box (Rect (02,138,198,20), (" Sec Role Rate: "+ papelSecRate),fichaGuiStyle);
	
	GUI.Box (Rect (02,158,198,20), (" Grade: "+ cargo),fichaGuiStyle);
	GUI.Box (Rect (02,178,198,20), (" Daily Hours: "+ workHours),fichaGuiStyle);
	//GUI.Box (Rect (02,138,198,20), (" Monthly Salary: $"+ salario),fichaGuiStyle);
	GUI.Box (Rect (02,198,198,20), (" Salary/Day: $"+ salarioDay),fichaGuiStyle);
	GUI.Box (Rect (02,218,198,20), (" Level: " +level),fichaGuiStyle);
	GUI.Box (Rect (02,238,198,20), (" Experience: " +experience + " / " + req_exp),fichaGuiStyle);
	//Lado direito
	GUI.Box (Rect (200,018,198,20), (" Adaptability: "+ atributos.adaptabilidade),fichaGuiStyle);
	GUI.Box (Rect (200,038,198,20), (" Autodidact: "+ atributos.autoDidata),fichaGuiStyle);
	GUI.Box (Rect (200,058,198,20), (" Human Relations: "+ atributos.relacionamentoHumano),fichaGuiStyle);
	GUI.Box (Rect (200,078,198,20), (" Logical Reasoning: "+ atributos.raciocinioLogico),fichaGuiStyle);
	GUI.Box (Rect (200,098,198,20), (" Meticulous: "+ atributos.detalhista),fichaGuiStyle);
	GUI.Box (Rect (200,118,198,20), (" Negotiation: "+ atributos.negociacao),fichaGuiStyle);
	GUI.Box (Rect (200,138,198,20), (" Objectivity: "+ atributos.objetividade),fichaGuiStyle);
	GUI.Box (Rect (200,158,198,20), (" Organization: "+ atributos.organizacao),fichaGuiStyle);
	GUI.Box (Rect (200,178,198,20), (" Patience: "+ atributos.paciencia),fichaGuiStyle);
	GUI.Box (Rect (200,198,198,20), ("  "),fichaGuiStyle);
	GUI.Box (Rect (200,218,198,20), ("  "),fichaGuiStyle);
	GUI.Box (Rect (200,238,198,20), ("  "),fichaGuiStyle);
	
	//Embaixo dos atributos
	GUI.Box (Rect (02,258,396,20), ("-------------------------------- Specialties --------------------------------"),fichaGuiStyle);
	//Lado esquerdo
	GUI.Box (Rect (02,278,198,20), ("\t" + especializacao_array[0].ToString()),fichaGuiStyle);
	GUI.Box (Rect (02,298,198,20), ("\t" + especializacao_array[1].ToString()),fichaGuiStyle);
	GUI.Box (Rect (02,318,198,20), ("\t" + especializacao_array[2].ToString()),fichaGuiStyle);
	GUI.Box (Rect (02,338,198,20), ("\t" + especializacao_array[3].ToString()),fichaGuiStyle);
	GUI.Box (Rect (02,358,198,20), ("\t" + especializacao_array[4].ToString()),fichaGuiStyle);
	GUI.Box (Rect (02,378,198,20), ("\t" + especializacao_array[5].ToString()),fichaGuiStyle);
	GUI.Box (Rect (02,398,198,20), ("\t" + especializacao_array[6].ToString()),fichaGuiStyle);
	GUI.Box (Rect (02,418,198,20), ("\t" + especializacao_array[7].ToString()),fichaGuiStyle);
	GUI.Box (Rect (02,438,198,20), ("\t" + especializacao_array[8].ToString()),fichaGuiStyle);
	//Lado direito
	GUI.Box (Rect (200,278,198,20), ("\t" + especializacao_array[9].ToString()),fichaGuiStyle);
	GUI.Box (Rect (200,298,198,20), ("\t" + especializacao_array[10].ToString()),fichaGuiStyle);
	GUI.Box (Rect (200,318,198,20), ("\t" + especializacao_array[11].ToString()),fichaGuiStyle);
	GUI.Box (Rect (200,338,198,20), ("\t" + especializacao_array[12].ToString()),fichaGuiStyle);
	GUI.Box (Rect (200,358,198,20), ("\t" + especializacao_array[13].ToString()),fichaGuiStyle);
	GUI.Box (Rect (200,378,198,20), ("\t" + especializacao_array[14].ToString()),fichaGuiStyle);
	GUI.Box (Rect (200,398,198,20), ("\t" + especializacao_array[15].ToString()),fichaGuiStyle);
	GUI.Box (Rect (200,418,198,20), ("\t" + especializacao_array[16].ToString()),fichaGuiStyle);
	GUI.Box (Rect (200,438,198,20), ("\t" + especializacao_array[17].ToString()),fichaGuiStyle);
	
	if(showCloseButton)
		if (GUI.Button (Rect (02,458,98,20), "Close Profile")) 
		{
			showJanela  = false;
			showJanelaLevel = false;
			showJanelaReport = false;
		}
	if(showCloseButton)
		if (GUI.Button (Rect (100,458,200,20), "View Level Up Modifiers")) 
		{
			//showJanela  = false;
			showJanelaLevel = true;
		}
	if(showCloseButton)
		if (GUI.Button (Rect (300,458,98,20), "View Report")) 
		{
			//showJanela  = false;
			showJanelaReport = true;
		}
	GUI.DragWindow();
}

//--------------------------------------------FichaFuncionario-----------------------------------------------------------

//Funcao que exibe na tela os status do funcionario
function WindowFunction_Level (windowID : int)	{
	timer.PauseGame();
	//Lado esquerdo
	GUI.Box (Rect (02,018,196,20), (" Name: "+ nome),fichaGuiStyle);
	GUI.Box (Rect (02,038,196,20), (" Level: "+ level),fichaGuiStyle);
	GUI.Box (Rect (02,058,196,20), (" Experience: "+ experience + " / " + req_exp),fichaGuiStyle);
	GUI.Box (Rect (02,078,196,20), (" Adaptability: +"+ aux_adap),fichaGuiStyle);
	GUI.Box (Rect (02,098,196,20), (" Autodidact: +"+ aux_auto),fichaGuiStyle);
	GUI.Box (Rect (02,118,196,20), (" Human Relations: +"+ aux_rel),fichaGuiStyle);
	GUI.Box (Rect (02,138,196,20), (" Logical Reasoning: +"+ aux_rac),fichaGuiStyle);
	GUI.Box (Rect (02,158,196,20), (" Meticulous: +" +aux_det),fichaGuiStyle);
	GUI.Box (Rect (02,178,196,20), (" Negotiation: +" +aux_neg),fichaGuiStyle);
	GUI.Box (Rect (02,198,196,20), (" Objectivity: +"+ aux_obj),fichaGuiStyle);
	GUI.Box (Rect (02,218,196,20), (" Organization: +"+ aux_org),fichaGuiStyle);
	GUI.Box (Rect (02,238,196,20), (" Patience: +"+ aux_pac),fichaGuiStyle);
	if (GUI.Button (Rect (02,258,196,20), "Close")) 
	{
		showJanelaLevel  = false;
	}
	GUI.DragWindow();
}

//--------------------------------------------RelatorioFuncionario-----------------------------------------------------------

//Funcao que exibe na tela os status do funcionario
function WindowFunction_Report (windowID : int)	{
	timer.PauseGame();
	//Lado esquerdo
	GUI.Box (Rect (02,018,198,20), (" Name: "+ nome),fichaGuiStyle);
	GUI.Box (Rect (02,038,198,20), (" Analyst's Validation:"),fichaGuiStyle);
	GUI.Box (Rect (02,058,198,20), (" Architect's System Find:"),fichaGuiStyle);
	GUI.Box (Rect (02,078,198,20), (" Architect's Integration Find:"),fichaGuiStyle);
	GUI.Box (Rect (02,098,198,20), (" Architect's Architecture:"),fichaGuiStyle);
	GUI.Box (Rect (02,118,198,20), (" Manager's Design:"),fichaGuiStyle);
	GUI.Box (Rect (02,138,198,20), (" Manager's Development:"),fichaGuiStyle);
	GUI.Box (Rect (02,158,198,20), (" Marketing's Validation:"),fichaGuiStyle);
	GUI.Box (Rect (02,178,198,20), (" Marketing's Money:"),fichaGuiStyle);
	GUI.Box (Rect (02,198,198,20), (" Programmer's Progress:"),fichaGuiStyle);
	GUI.Box (Rect (02,218,198,20), (" Programmer's Bugs:"),fichaGuiStyle);
	GUI.Box (Rect (02,238,198,20), (" Tester's Bug removal:"),fichaGuiStyle);
	//Relatorio da semana
	GUI.Box (Rect (200,018,100,20), (" Last week"),fichaGuiStyle);
	GUI.Box (Rect (200,038,100,20), (" + " +report.analistReport + " %"),fichaGuiStyle);
	GUI.Box (Rect (200,058,100,20), (" + "+ report.architectReport_bugSystem+ " %"),fichaGuiStyle);
	GUI.Box (Rect (200,078,100,20), (" + "+ report.architectReport_bugIntegration+ " %"),fichaGuiStyle);
	GUI.Box (Rect (200,098,100,20), (" + "+ report.architectReport_archt+ " %"),fichaGuiStyle);
	GUI.Box (Rect (200,118,100,20), (" + "+ report.managerReport_design+ " %"),fichaGuiStyle);
	GUI.Box (Rect (200,138,100,20), (" + "+ report.managerReport_dev+ " %"),fichaGuiStyle);
	GUI.Box (Rect (200,158,100,20), (" + "+ report.marketingReport_val + " %"),fichaGuiStyle);
	GUI.Box (Rect (200,178,100,20), (" + $"+ report.marketingReport_money),fichaGuiStyle);
	GUI.Box (Rect (200,198,100,20), (" + "+ report.programmerReport_prog),fichaGuiStyle);
	GUI.Box (Rect (200,218,100,20), (" + "+ report.programmerReport_bug),fichaGuiStyle);
	GUI.Box (Rect (200,238,100,20), (" - "+ report.testerReport),fichaGuiStyle);
	//Relatorio da semana passada
	GUI.Box (Rect (300,018,100,20), (" 2 weeks ago"),fichaGuiStyle);
	GUI.Box (Rect (300,038,100,20), (" + " +report.previousAnalistReport+ " %"),fichaGuiStyle);
	GUI.Box (Rect (300,058,100,20), (" + "+ report.previousArchitectReport_bugSystem+ " %"),fichaGuiStyle);
	GUI.Box (Rect (300,078,100,20), (" + "+ report.previousArchitectReport_bugIntegration+ " %"),fichaGuiStyle);
	GUI.Box (Rect (300,098,100,20), (" + "+ report.previousArchitectReport_archt+ " %"),fichaGuiStyle);
	GUI.Box (Rect (300,118,100,20), (" + "+ report.previousManagerReport_design+ " %"),fichaGuiStyle);
	GUI.Box (Rect (300,138,100,20), (" + "+ report.previousManagerReport_dev+ " %"),fichaGuiStyle);
	GUI.Box (Rect (300,158,100,20), (" + "+ report.previousMarketingReport_val ),fichaGuiStyle);
	GUI.Box (Rect (300,178,100,20), (" + $"+ report.previousMarketingReport_money),fichaGuiStyle);
	GUI.Box (Rect (300,198,100,20), (" + "+ report.previousProgrammerReport_prog),fichaGuiStyle);
	GUI.Box (Rect (300,218,100,20), (" + "+ report.previousProgrammerReport_bug),fichaGuiStyle);
	GUI.Box (Rect (300,238,100,20), (" - "+ report.previousTesterReport),fichaGuiStyle);
	//Retrasada
	GUI.Box (Rect (400,018,100,20), (" 3 weeks ago"),fichaGuiStyle);
	GUI.Box (Rect (400,038,100,20), (" + " +report.previous2AnalistReport+ " %"),fichaGuiStyle);
	GUI.Box (Rect (400,058,100,20), (" + "+ report.previous2ArchitectReport_bugSystem+ " %"),fichaGuiStyle);
	GUI.Box (Rect (400,078,100,20), (" + "+ report.previous2ArchitectReport_bugIntegration+ " %"),fichaGuiStyle);
	GUI.Box (Rect (400,098,100,20), (" + "+ report.previous2ArchitectReport_archt+ " %"),fichaGuiStyle);
	GUI.Box (Rect (400,118,100,20), (" + "+ report.previous2ManagerReport_design+ " %"),fichaGuiStyle);
	GUI.Box (Rect (400,138,100,20), (" + "+ report.previous2ManagerReport_dev+ " %"),fichaGuiStyle);
	GUI.Box (Rect (400,158,100,20), (" + "+ report.previous2MarketingReport_val ),fichaGuiStyle);
	GUI.Box (Rect (400,178,100,20), (" + $"+ report.previous2MarketingReport_money),fichaGuiStyle);
	GUI.Box (Rect (400,198,100,20), (" + "+ report.previous2ProgrammerReport_prog),fichaGuiStyle);
	GUI.Box (Rect (400,218,100,20), (" + "+ report.previous2ProgrammerReport_bug),fichaGuiStyle);
	GUI.Box (Rect (400,238,100,20), (" - "+ report.previous2TesterReport),fichaGuiStyle);
	//3 semanas atras
	GUI.Box (Rect (500,018,98,20), (" 4 weeks ago"),fichaGuiStyle);
	GUI.Box (Rect (500,038,98,20), (" + " +report.previous3AnalistReport+ " %"),fichaGuiStyle);
	GUI.Box (Rect (500,058,98,20), (" + "+ report.previous3ArchitectReport_bugSystem+ " %"),fichaGuiStyle);
	GUI.Box (Rect (500,078,98,20), (" + "+ report.previous3ArchitectReport_bugIntegration+ " %"),fichaGuiStyle);
	GUI.Box (Rect (500,098,98,20), (" + "+ report.previous3ArchitectReport_archt+ " %"),fichaGuiStyle);
	GUI.Box (Rect (500,118,98,20), (" + "+ report.previous3ManagerReport_design+ " %"),fichaGuiStyle);
	GUI.Box (Rect (500,138,98,20), (" + "+ report.previous3ManagerReport_dev+ " %"),fichaGuiStyle);
	GUI.Box (Rect (500,158,98,20), (" + "+ report.previous3MarketingReport_val ),fichaGuiStyle);
	GUI.Box (Rect (500,178,98,20), (" + $"+ report.previous3MarketingReport_money),fichaGuiStyle);
	GUI.Box (Rect (500,198,98,20), (" + "+ report.previous3ProgrammerReport_prog),fichaGuiStyle);
	GUI.Box (Rect (500,218,98,20), (" + "+ report.previous3ProgrammerReport_bug),fichaGuiStyle);
	GUI.Box (Rect (500,238,98,20), (" - "+ report.previous3TesterReport),fichaGuiStyle);
	
	GUI.Box (Rect (002,258,596,20), (" "),fichaGuiStyle);
	//GUI.Box (Rect (200,278,398,20), (" "),fichaGuiStyle);
	
	if (GUI.Button (Rect (02,278,196,20), "Close")) 
	{
		showJanelaReport  = false;
	}
	GUI.DragWindow();
}

function SetReport(weeklyReport : WeeklyReport)
{
	report.analistReport = 								weeklyReport.analistReport;
	report.architectReport_bugSystem = 					weeklyReport.architectReport_bugSystem;
	report.architectReport_bugIntegration = 					weeklyReport.architectReport_bugIntegration;
	report.architectReport_archt = 					weeklyReport.architectReport_archt;
	report.managerReport_design = 					weeklyReport.managerReport_design;
	report.managerReport_dev = 						weeklyReport.managerReport_dev;
	report.marketingReport_val = 					weeklyReport.marketingReport_val;
	report.marketingReport_money = 					weeklyReport.marketingReport_money;
	report.programmerReport_prog = 					weeklyReport.programmerReport_prog;
	report.programmerReport_bug = 					weeklyReport.programmerReport_bug;
	report.testerReport = 								weeklyReport.testerReport;
	
	report.previousAnalistReport = 					weeklyReport.previousAnalistReport;
	report.previousArchitectReport_bugSystem = 			weeklyReport.previousArchitectReport_bugSystem;
	report.previousArchitectReport_bugIntegration = 			weeklyReport.previousArchitectReport_bugIntegration;
	report.previousArchitectReport_archt = 			weeklyReport.previousArchitectReport_archt;
	report.previousManagerReport_design = 			weeklyReport.previousManagerReport_design;
	report.previousManagerReport_dev = 				weeklyReport.previousManagerReport_dev;
	report.previousMarketingReport_val = 			weeklyReport.previousMarketingReport_val;
	report.previousMarketingReport_money = 			weeklyReport.previousMarketingReport_money;
	report.previousProgrammerReport_prog = 			weeklyReport.previousProgrammerReport_prog;
	report.previousProgrammerReport_bug = 			weeklyReport.previousProgrammerReport_bug;
	report.previousTesterReport = 					weeklyReport.previousTesterReport;
	
	report.previous2AnalistReport = 					weeklyReport.previous2AnalistReport;
	report.previous2ArchitectReport_bugSystem = 			weeklyReport.previous2ArchitectReport_bugSystem;
	report.previous2ArchitectReport_bugIntegration = 			weeklyReport.previous2ArchitectReport_bugIntegration;
	report.previous2ArchitectReport_archt = 		weeklyReport.previous2ArchitectReport_archt;
	report.previous2ManagerReport_design = 		weeklyReport.previous2ManagerReport_design;
	report.previous2ManagerReport_dev = 		weeklyReport.previous2ManagerReport_dev;
	report.previous2MarketingReport_val = 		weeklyReport.previous2MarketingReport_val;
	report.previous2MarketingReport_money = 	weeklyReport.previous2MarketingReport_money;
	report.previous2ProgrammerReport_prog = 	weeklyReport.previous2ProgrammerReport_prog;
	report.previous2ProgrammerReport_bug = 		weeklyReport.previous2ProgrammerReport_bug;
	report.previous2TesterReport = 					weeklyReport.previous2TesterReport;
	
	report.previous3AnalistReport = 					weeklyReport.previous3AnalistReport;
	report.previous3ArchitectReport_bugSystem = 		weeklyReport.previous3ArchitectReport_bugSystem;
	report.previous3ArchitectReport_bugIntegration = 		weeklyReport.previous3ArchitectReport_bugIntegration;
	report.previous3ArchitectReport_archt = 		weeklyReport.previous3ArchitectReport_archt;
	report.previous3ManagerReport_design = 		weeklyReport.previous3ManagerReport_design;
	report.previous3ManagerReport_dev = 		weeklyReport.previous3ManagerReport_dev;
	report.previous3MarketingReport_val = 		weeklyReport.previous3MarketingReport_val;
	report.previous3MarketingReport_money = 	weeklyReport.previous3MarketingReport_money;
	report.previous3ProgrammerReport_prog = 	weeklyReport.previous3ProgrammerReport_prog;
	report.previous3ProgrammerReport_bug = 		weeklyReport.previous3ProgrammerReport_bug;
	report.previous3TesterReport = 					weeklyReport.previous3TesterReport;
}
//--------------------------------------------Awake-----------------------------------------------------------

function Awake () {
}

//--------------------------------------------OnGUI-----------------------------------------------------------

//Funcao da unity para a GUI
function OnGUI (){
	if(showJanela)
		windowRect = GUI.Window (1, windowRect, WindowFunction, "Profile");
	if(showJanelaLevel)
		windowRect2 = GUI.Window (2, windowRect2, WindowFunction_Level, "Level Up Changes History");
	if(showJanelaReport)
		windowRect3 = GUI.Window (3, windowRect3, WindowFunction_Report, "Employee Report");
}
