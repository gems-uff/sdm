

//Variaves de configuracao de desempenho durante o trabalho
public var stringNames : StringNames;
public var equipe : Equipe;
public var project : Project;
public var timer : GameTime;
public var playerStats : PlayerStats;
public var playStyle : GameplayStyle;
public var constant : GameConstants;
public var floatingLines : FloatingLines;

public var behavior : BehaviorPlanner;
//public var floatingLinesBelow : FloatingLines;

public var workingHoursModifier : float = 1.0;
public var maxTrainingDays : int = 14;
private var stamina : float = 1.0;		//Valor entre 0.0 e 1.0
private var morale : float = 1.0;
private var func : Funcionario;
private var treino : Treinamento;

private var report : WeeklyReport;
private var delayTime : float = 1.5;
public var funcWindow : FuncWindow;

//Different work for each type of the game (Micro/Macro)
private var AnalistaMicro : AnalystMicro;
private var AnalistaMacro : AnalystMacro;
private var ArchitectMicro : ArchitectMicro;
private var ArchitectMacro : ArchitectMacro;
private var ManagerMicro : ManagerMicro;
private var ManagerMacro : ManagerMacro;
private var MarketingMicro : MarketingMicro;
private var MarketingMacro : MarketingMacro;	
private var ProgrammerMicro : ProgrammerMicro;
private var ProgrammerMacro : ProgrammerMacro;
private var TesterMicro : TesterMicro;
private var TesterMacro : TesterMacro;


//private var actionNode : ActionNode;

private var action : ActionNode = new ActionNode();
public var wasInfluenced : boolean = false;
/*
function GetAction()
{
	return actionNode;
}
*/

//Report
function GetReport(){	
	return report;
}

function SetReport(t : WeeklyReport){
	report = t;
}

function WeeklyReport()
{
	//Exibo o historico
	
	//Mudo a semana
	func.report.previous3AnalistReport = 					func.report.previous2AnalistReport;
	func.report.previous3ArchitectReport_bugSystem = 		func.report.previous2ArchitectReport_bugSystem;
	func.report.previous3ArchitectReport_bugIntegration = 		func.report.previous2ArchitectReport_bugIntegration;
	func.report.previous3ArchitectReport_archt = 		func.report.previous2ArchitectReport_archt;
	func.report.previous3ManagerReport_design = 		func.report.previous2ManagerReport_design;
	func.report.previous3ManagerReport_dev = 			func.report.previous2ManagerReport_dev;
	func.report.previous3MarketingReport_val = 			func.report.previous2MarketingReport_val;
	func.report.previous3MarketingReport_money = 	func.report.previous2MarketingReport_money;
	func.report.previous3ProgrammerReport_prog = 	func.report.previous2ProgrammerReport_prog;
	func.report.previous3ProgrammerReport_bug = 		func.report.previous2ProgrammerReport_bug;
	func.report.previous3TesterReport = 					func.report.previous2TesterReport;
	
	func.report.previous2AnalistReport = 					func.report.previousAnalistReport;
	func.report.previous2ArchitectReport_bugSystem = 		func.report.previousArchitectReport_bugSystem;
	func.report.previous2ArchitectReport_bugIntegration = 		func.report.previousArchitectReport_bugIntegration;
	func.report.previous2ArchitectReport_archt = 		func.report.previousArchitectReport_archt;
	func.report.previous2ManagerReport_design = 		func.report.previousManagerReport_design;
	func.report.previous2ManagerReport_dev = 			func.report.previousManagerReport_dev;
	func.report.previous2MarketingReport_val = 			func.report.previousMarketingReport_val;
	func.report.previous2MarketingReport_money = 	func.report.previousMarketingReport_money;
	func.report.previous2ProgrammerReport_prog = 	func.report.previousProgrammerReport_prog;
	func.report.previous2ProgrammerReport_bug = 		func.report.previousProgrammerReport_bug;
	func.report.previous2TesterReport = 					func.report.previousTesterReport;
	
	func.report.previousAnalistReport = 					func.report.analistReport;
	func.report.previousArchitectReport_bugSystem = 			func.report.architectReport_bugSystem;
	func.report.previousArchitectReport_bugIntegration = 			func.report.architectReport_bugIntegration;
	func.report.previousArchitectReport_archt = 		func.report.architectReport_archt;
	func.report.previousManagerReport_design = 		func.report.managerReport_design;
	func.report.previousManagerReport_dev = 			func.report.managerReport_dev;
	func.report.previousMarketingReport_val = 			func.report.marketingReport_val;
	func.report.previousMarketingReport_money = 		func.report.marketingReport_money;
	func.report.previousProgrammerReport_prog = 		func.report.programmerReport_prog;
	func.report.previousProgrammerReport_bug = 		func.report.programmerReport_bug;
	func.report.previousTesterReport = 					func.report.testerReport;
	
	func.report.analistReport = 								report.analistReport;
	func.report.architectReport_bugSystem = 						report.architectReport_bugSystem / 7;
	func.report.architectReport_bugIntegration = 						report.architectReport_bugIntegration / 7;
	func.report.architectReport_archt = 					report.architectReport_archt /7;
	func.report.managerReport_dev = 						report.managerReport_dev / 7;
	func.report.managerReport_design = 					report.managerReport_design / 7;
	func.report.marketingReport_val = 						report.marketingReport_val / 7;
	func.report.marketingReport_money = 				report.marketingReport_money;
	func.report.programmerReport_prog = 					report.programmerReport_prog;
	func.report.programmerReport_bug = 					report.programmerReport_bug;
	func.report.testerReport = 								report.testerReport;
	//Reinicio para a proxima semana
	
	
	report.analistReport = 0;
	report.architectReport_bugSystem = 0;
	report.architectReport_bugIntegration = 0;
	report.architectReport_archt = 0;
	report.managerReport_design = 0;
	report.managerReport_dev = 0;
	report.marketingReport_val = 0;
	report.marketingReport_money = 0;
	report.programmerReport_prog = 0;
	report.programmerReport_bug = 0;
	report.testerReport = 0;
}
//--------------------------------------------Get-----------------------------------------------------------
function GetWorkingHoursModifier() {
	return workingHoursModifier;
}

//--------------------------------------------GameModifiers-----------------------------------------------------------
function GameModifiers(){
	var cargo_mod : float;
	cargo_mod = AjusteWork();
	var aux = cargo_mod * workingHoursModifier * stamina * morale;
	return aux;
}

//--------------------------------------------WorkHours-----------------------------------------------------------
//Funcao que calcula o modificardor de producao do funcionario de acordo com as horas que ele trabalha

function WorkHours(){
	var aux : int;
	var newSalary : int;
	if(func.GetNome() != stringNames.fired)
	{
		aux = func.GetWorkingHours();
		aux = aux / 5;
		workingHoursModifier = aux * 12.5;
		workingHoursModifier = workingHoursModifier / 100;
		newSalary = func.GetSalarioDefault();
		newSalary = newSalary * AjusteSalario();
		newSalary = newSalary * workingHoursModifier;
		newSalary = newSalary / 10;		//Para ser 0 na unidade do salario
		newSalary = newSalary * 10;		//Para ser 0 na unidade do salario
		stamina = func.GetStaminaForBonus();
		stamina = stamina / 100;
		morale = func.GetMoraleForBonus();
		morale = morale / 100;
		if (newSalary < constant.MINPAYMENT)
			func.SetSalario(constant.MINPAYMENT);
		else
			func.SetSalario(newSalary);
	}
}

//--------------------------------------------AjusteSalario-----------------------------------------------------------

function AjusteSalario(){
	var mod : float = 1.0;
	switch(func.GetCargo())
	{
	   case stringNames.jobJunior: 	//caso analista
			mod = constant.JUNIOR_SALARY;
	   break;

	   case stringNames.jobPleno:	//caso arquiteto
			mod = constant.PLENO_SALARY;
	   break;
	   
	   case stringNames.jobSenior:	//caso gerente
			mod = constant.SENIOR_SALARY;
	   break;

	   default:
		  break;
	}
	return mod;
}

//--------------------------------------------AjusteWork-----------------------------------------------------------

function AjusteWork(){
	var mod : float = 1.0;
	switch(func.GetCargo())
	{
	   case stringNames.jobJunior: 	//caso Junior
			mod = constant.JUNIOR_MODIFICATOR;
	   break;

	   case stringNames.jobPleno:	//caso Pleno
			mod = constant.PLENO_MODIFICATOR;
	   break;
	   
	   case stringNames.jobSenior:	//caso Senior
			mod = constant.SENIOR_MODIFICATOR;
	   break;

	   default:
		  break;
	}
	return mod;
}
//--------------------------------------------Work-----------------------------------------------------------

function AnalistaWork(){
	var rate : int;
	var work : boolean = false;
	var delay : float = 0.0;
	if(func.GetPapel() == stringNames.papelAnalista)
	{
		rate = func.GetPapelRate();
		work = true;
	}
	else
	{
		if((func.GetPapelSec() == stringNames.papelAnalista) && (func.GetPapelSecRate() > 0))
		{
			rate = func.GetPapelSecRate();
			work = true;
			delay = delayTime;
		}
		else
		{
			rate = 0;
			work = false;
		}
	}
	if(work)
	{
		var modificador_positivo : float = EspecializacaoFerramenta();
		var penal : float = MetodologiaEquipe();
		var analista : float ;
		var mod : float = GameModifiers();
		var randomizer : float = Random.Range (0.5, 1.0);
		
		var action : ActionNode = new ActionNode();
		
		yield WaitForSeconds(delay);
		
		func.WorkingAnalista();
		
		analista = func.GetAnalista();
		analista = analista * (rate * 0.01) * mod * constant.ANALISTA * (1 + modificador_positivo - penal); //* equipe.GetBonusAnalista()

		action = AnalistaMacro.Work(func, project, report, floatingLines, equipe, constant, analista, behavior, timer.GetGameTime());
		behavior.AddAction(action);
	}
}

function ArquitetoWork(){
	var rate : int;
	var work : boolean = false;
	var delay : float = 0.0;
	if(func.GetPapel() == stringNames.papelArquiteto)
	{
		rate = func.GetPapelRate();
		work = true;
	}
	else
	{
		if((func.GetPapelSec() == stringNames.papelArquiteto) && (func.GetPapelSecRate() > 0))
		{
			rate = func.GetPapelSecRate();
			work = true;
			delay = delayTime;
		}
		else
		{
			rate = 0;
			work = false;
		}
	}
	if(work)
	{
		var modificador_positivo : float = EspecializacaoFerramenta();
		var penal : float = MetodologiaEquipe();
		var arquiteto : float ;
		var gameMod : float = GameModifiers();
		
		var action : ActionNode = new ActionNode();

		yield WaitForSeconds(delay);
		func.WorkingArquiteto();
		
		arquiteto = func.GetArquiteto() * (rate * 0.01) * gameMod * constant.ARCHITECT * (1 + modificador_positivo - penal);// * equipe.GetBonusArquiteto();	

		action = ArchitectMacro.Work(func, project, report, floatingLines, equipe, constant, arquiteto, behavior, timer.GetGameTime());
		behavior.AddAction(action);
	}
}

function GerenteWork(){
	var rate : int;
	var work : boolean = false;
	var delay : float = 0.0;
	
	if(func.GetPapel() == stringNames.papelGerente)
	{
		rate = func.GetPapelRate();
		work = true;
	}
	else
	{
		if((func.GetPapelSec() == stringNames.papelGerente) && (func.GetPapelSecRate() > 0))
		{
			rate = func.GetPapelSecRate();
			work = true;
			delay = delayTime;
		}
		else
		{
			rate = 0;
			work = false;
		}
	}
	if(work)
	{
		var modificador_positivo : float = EspecializacaoFerramenta();
		var penal : float = MetodologiaEquipe();
		var isEspecialized : int = LinguagemProgEquipe();
		var mod : float = GameModifiers();
		var auxAnaArq : float = 0.0;
		var auxArquiteto : float = 0.0;
		var auxProg : float = 0;
		var gerente : float ;
		var penal_prog : float = PenalidadeProgramacao(penal, isEspecialized);
		
		var action : ActionNode = new ActionNode();
		
		yield WaitForSeconds(delay);
		func.WorkingGerente();
		
		gerente = func.GetGerente() * (rate * 0.01) * constant.GERENTE * mod;

		auxAnaArq = gerente;
		auxProg = gerente;
		
		auxAnaArq = auxAnaArq * (1 + modificador_positivo - penal);
		auxProg = auxProg * (1 + modificador_positivo - penal_prog);

		action = ManagerMacro.Work(func, project, report, floatingLines, equipe, constant, gerente, auxAnaArq, auxProg, 
		behavior, timer.GetGameTime());
		behavior.AddAction(action);
	}
}

function MarketingWork(){
	var rate : int;
	var work : boolean = false;
	var delay : float = 0.0;
	
	if(func.GetPapel() == stringNames.papelMarketing)
	{
		rate = func.GetPapelRate();
		work = true;
	}
	else
	{
		if((func.GetPapelSec() == stringNames.papelMarketing) && (func.GetPapelSecRate() > 0))
		{
			rate = func.GetPapelSecRate();
			work = true;
			delay = delayTime;
		}
		else
		{
			rate = 0;
			work = false;
		}
	}
	if(work)
	{
		var penal : float = MetodologiaEquipe();
		var mod : float = GameModifiers();
		var marketing : float;
		
		var action : ActionNode = new ActionNode();
		
		yield WaitForSeconds(delay);
		func.WorkingMarketing();
		
		marketing = func.GetMarketing() * (rate * 0.01) * (1 - penal) * mod * constant.MARKETING;	
		
		action = MarketingMacro.Work(func, project, report, floatingLines, equipe, constant, playerStats, marketing, timer.GetGameTime());
		behavior.AddAction(action);
	}
		
}

function ProgramadorWork(){
	var rate : int;
	var work : boolean = false;
	var delay : float = 0.0;

	if(func.GetPapel() == stringNames.papelProg)
	{
		rate = func.GetPapelRate();
		work = true;
	}
	else
	{
		if((func.GetPapelSec() == stringNames.papelProg) && (func.GetPapelSecRate() > 0))
		{
			rate = func.GetPapelSecRate();
			work = true;
			delay = delayTime;
		}
		else
		{
			rate = 0;
			work = false;
		}
	}
	if(work)
	{
		var modificador_positivo : float = EspecializacaoFerramenta();
		var penal : float = MetodologiaEquipe();
		var gameMod : float = GameModifiers();
		var programador : float ;
		
		var isEspecialized : int = LinguagemProgEquipe();
		var penal_prog : float = penal + (isEspecialized * constant.PENALIDADE);
		
		yield WaitForSeconds(delay);
		
		var action : ActionNode = new ActionNode();
		
		func.WorkingProgramador();
		
		programador = func.GetProgramador() * (rate * 0.01) * (1 + modificador_positivo - penal_prog) * gameMod;

		action = ProgrammerMacro.Work(func, project, report, floatingLines, equipe, constant, programador, RequisitoLinguagem(), 
		isEspecialized, behavior, timer.GetGameTime());
		behavior.AddAction(action);
	}
}

function TesterWork(){
	var rate : int;
	var work : boolean = false;
	var delay : float = 0.0;
	
	if(func.GetPapel() == stringNames.papelTester)
	{
		rate = func.GetPapelRate();
		work = true;
	}
	else
	{
		if((func.GetPapelSec() == stringNames.papelTester) && (func.GetPapelSecRate() > 0))
		{
			rate = func.GetPapelSecRate();
			work = true;
			delay = delayTime;
		}
		else
		{
			rate = 0;
			work = false;
		}
	}
	if(work)
	{
		var mod : float = GameModifiers();
		var tester : float;
		
		var action : ActionNode = new ActionNode();
		
		func.WorkingTester();
		
		tester = func.GetTester() * (rate * 0.01) * mod;
		
		//Debug.Log("Tester Att = " + func.GetTester());
		//Debug.Log("Rate = " + (rate * 0.01));
		//Debug.Log("Positivo = " + modificador_positivo);
		//Debug.Log("Negativo = " + penal_prog);
		//Debug.Log("Mods = " + ((1 + modificador_positivo - penal_prog)));
		//Debug.Log("Mod = " + mod);
		//Debug.Log("Tester = " + tester);
		yield WaitForSeconds(delay);
		
		action = TesterMacro.Work(func, project, report, floatingLines, equipe, constant, tester, timer.GetGameTime());//wasInfluenced
		behavior.AddAction(action);
	}
}

function Treinando(){
	//Quando terminar o treinamento o funcionario ganhará a especializaçao na qual treinou. A duração do treinamento depende do atributo Auto-Didata
	if ( func.GetPapel() == stringNames.papelTreinando)
	{
		var aux : float;
		var trainingTime : int;
		aux = 125 - func.GetAutoDidata();
		aux = aux / 100;
		aux = maxTrainingDays * aux;
		trainingTime = parseInt(aux);
		BroadcastMessage("ShowTrainingBar", trainingTime);
		if ((timer.GetGameTime() > treino.GetDeadline_Treino()) && (treino.GetDeadline_Treino() >0))
		{
			treino.SetDeadline_Treino(0.0);
			treino.Especializando();
			timer.PauseGame();
			floatingLines.showFloatText1("", "", "green", " Training Complete");
		}
	}
}

function PenalidadeProgramacao(penal : float, isEspecialized : int){
	//return penal + LinguagemProgEquipe();
	return (penal + (isEspecialized * constant.PENALIDADE));
}
//--------------------------------------------ReqLinguagem-----------------------------------------------------------

//Funcao para avaliar se o funcionario possui o requisito necessario para o projeto. O valor retornado é 0 ou PENALIDADE
function LinguagemProgEquipe(){
	//var modificador : float = constant.PENALIDADE;
	var especialized : int = 1;
	// 0 if specialized, 1 if not
	switch(equipe.GetLinguagem())
	{
	   case stringNames.esp01: 
		  if (func.GetL_assembly() == true)
				//modificador = 0;
				especialized = 0;
	   break;

	   case stringNames.esp02:
		  if (func.GetL_csharp() == true)
				//modificador = 0;
				especialized = 0;
	   break;
	   
	   case stringNames.esp03:
		  if (func.GetL_java() == true)
				//modificador = 0;
				especialized = 0;
	   break;
	   
	   case stringNames.esp04:
		  if (func.GetL_perl() == true)
				//modificador = 0;
				especialized = 0;
	   break;
	   
	   case stringNames.esp05:
			if (func.GetL_ruby() == true)
				//modificador = 0;
				especialized = 0;
	   break;
	   
	   default:
			//modificador = constant.PENALIDADE;
			especialized = 1;
		  break;
	}
	//return modificador;
	return especialized;
}

//--------------------------------------------ReqMetodologia-----------------------------------------------------------

//Funcao para avaliar se o funcionario possui especialidade na mesma metodologia de trabalho que a equipe esta usando. O valor retornado é 0 ou PENALIDADE
function MetodologiaEquipe(){
	var modificador : float = constant.PENALIDADE;
	
	switch(equipe.GetMetodologia())
	{
	   case stringNames.metodo1: 
		   if (func.GetM_agil() == true)
				modificador = 0;
	   break;

	   case stringNames.metodo2:
		   if (func.GetM_classico() == true)
				modificador = 0;
	   break;

	   default:
		  break;
	}
	return modificador;
}

//--------------------------------------------ReqMetodologia-----------------------------------------------------------

//Funcao para avaliar se o funcionario possui especialidade na mesma metodologia de trabalho que a equipe esta usando. O valor retornado é 0 ou PENALIDADE
function RequisitoLinguagem(){
	var modificador : boolean = false;
	
	switch(project.GetLinguagem())
	{
	   case stringNames.esp01: 
		  if (equipe.GetLinguagem() == stringNames.esp01)
				modificador = true;
	   break;

	   case stringNames.esp02:
		  if (equipe.GetLinguagem() == stringNames.esp02)
				modificador = true;
	   break;
	   
	   case stringNames.esp03:
		  if (equipe.GetLinguagem() == stringNames.esp03)
				modificador = true;
	   break;
	   
	   case stringNames.esp04:
		  if (equipe.GetLinguagem() == stringNames.esp04)
				modificador = true;
	   break;
	   
	   case stringNames.esp05:
			if (equipe.GetLinguagem() == stringNames.esp05)
				modificador = true;
	   break;
	   
	   default:
			modificador = true;
		  break;
	}
	return modificador;
}
//--------------------------------------------ReqFerramenta-----------------------------------------------------------

//Funcao para verificar se o funcionario tera algum modificador positivo de acordo com seu papel e especialidade. O retorno ja é o modificador final somado em 1, ou seja, será sempre retornado um numero >= 1
function EspecializacaoFerramenta (){
	var modificador_positivo : float = 0.0;
	
	switch(func.GetPapel())
	{
	   case stringNames.papelAnalista: 	//caso analista
			if (func.GetF_metricas() == true)			
				modificador_positivo = constant.BONUS;
	   break;

	   case stringNames.papelArquiteto:	//caso arquiteto
			if (func.GetF_programas() == true)		
				modificador_positivo = modificador_positivo + constant.BONUS;
	   break;
	   
	   case stringNames.papelGerente:	//caso gerente
			if (func.GetF_projetos() == true)						
				modificador_positivo = modificador_positivo +  constant.BONUS;
			if (func.GetF_planejamento() == true)			
				modificador_positivo = modificador_positivo + constant.BONUS;
			if (func.GetF_versao() == true)			
				modificador_positivo = modificador_positivo + constant.BONUS;
	   break;
	   
	   case stringNames.papelMarketing:	//caso marketing
			//Nao tem nenhuma
	   break;
	   
	   case stringNames.papelProg:	//caso programador
			if (func.GetF_depuracao() == true)					
				modificador_positivo = modificador_positivo + constant.BONUS;
	   break;
	   
	   case stringNames.papelTester:	//caso tester
			if (func.GetF_depuracao() == true)					
				modificador_positivo = modificador_positivo +  constant.BONUS;
			if (func.GetF_teste() == true)						
				modificador_positivo = modificador_positivo + constant.BONUS;
	   break;

	   default:
		  break;
	}
	return modificador_positivo;
}

//public var body : MeshRenderer;
function Body(){
	if(func.GetNome() == stringNames.fired)
		func.GetComponentInChildren(MeshRenderer).enabled = false;
		//body.enabled = false;
	else
		func.GetComponentInChildren(MeshRenderer).enabled = true;
		//body.enabled = true;
}

function FixedUpdate(){
	Body();
}
	
//--------------------------------------------Awake-----------------------------------------------------------

function Awake () {
	func = GetComponentInChildren(Funcionario);
	treino = GetComponentInChildren(Treinamento);
	report.previousAnalistReport = 0;
	report.previousArchitectReport_bugSystem = 0;
	report.previousArchitectReport_bugIntegration = 0;
	report.previousArchitectReport_archt = 0;
	report.previousManagerReport_design = 0;
	report.previousManagerReport_dev = 0;
	report.previousMarketingReport_val = 0;
	report.previousMarketingReport_money = 0;
	report.previousProgrammerReport_prog = 0;
	report.previousProgrammerReport_bug = 0;
	report.previousTesterReport = 0;
	report.analistReport = 0;
	report.architectReport_bugSystem = 0;
	report.architectReport_bugIntegration = 0;
	report.architectReport_archt = 0;
	report.managerReport_design = 0;
	report.managerReport_dev = 0;
	report.marketingReport_val = 0;
	report.marketingReport_money = 0;
	report.programmerReport_prog = 0;
	report.programmerReport_bug = 0;
	report.testerReport = 0;
}