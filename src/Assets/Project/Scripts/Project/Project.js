public var testCases : TestCases;
public var constant : GameConstants;
public var player : PlayerStats;
public var timer : GameTime;
public var nome : String;
public var description : String;
public var deadline : int = 1;  //in days
public var deadlineDays : int =1;	//Deadline Original
public var maxCodeLines : int = 0;	//size of the software to be done
public var linguagemProgramacao : String = "";	//Linguagem: Escolher apenas uma linguagem
public var pagamento : int = 0;
public var bugValue : int = 1000;

public var expenses : int = 0;

private var startDay : int = 1;
private var projectSize : String = "";
private var projectQuality : String = "";
private var sincronismo : float = 0.0;		//client's sincronismo
private var completed : boolean = false;
private var bugs : int = 0 ;				//number of bugs in the software

private var codeLinesDone : int = 0;	//number of lines done by the team

//New types of bug
//All bugs in the system (found + repaired + unknown)
private var bugUnitary : int = 0;
private var bugIntegration : int = 0;
private var bugSystem : int = 0;
private var bugAcception : int = 0;
//Bugs found
private var bugUnitaryFound : int = 0;
private var bugIntegrationFound : int = 0;
private var bugSystemFound : int = 0;
private var bugAcceptionFound : int = 0;
//Bugs corrected
private var bugUnitaryRepaired : int = 0;
private var bugIntegrationRepaired : int = 0;
private var bugSystemRepaired : int = 0;
private var bugAcceptionRepaired : int = 0;
private var prov : ExtractProvenance;




//New additions
//Modificador que reduz a validação ja feita com o passar do tempo
private var volatility : float = 1.0;
private var lastValidation : int = 0.0;
//Qualidade do codigo, o que interfere na remoção/inserção de bugs
private var codeQuality : float = 80; //from 0.1 to 1.2
//Project requirements. The hightest valor equals Validation (Sincronismo)
private var requirements : float = 0.0;

//Prototype, for architect task
private var prototype_num : int = 0.0;

function ResetProject(){
	bugs = 0;
	sincronismo = 0;
	codeLinesDone = 0;
	completed = false;
	ResetBugsTypes();
	
	requirements = 0.0;
	volatility = 1.0;
	lastValidation = timer.GetGameTime();
	codeQuality = 80;
	testCases.Clean();
}

//Prototype functions for analyst and architect
function AddPrototype()
{
	prototype_num++;
}
function ConsumePrototype()
{
	prototype_num--;
	if(prototype_num < 0)
	 prototype_num = 0;
}
function GetPrototype()
{
	return prototype_num;
}
//---------------------------------------------------------------------------------------------------------------
//--------------------------------------------Sincronismo/Volatility for Macro-----------------------------------
//---------------------------------------------------------------------------------------------------------------
function GetVolatility()
{
	return volatility;
}
function SetVolatility(t : float)
{
	volatility = t;
}
function ResetLastElicitation()
{
	lastValidation = timer.GetGameTime();
}

function UpdateElicitation(t : float, prototype : boolean)
{
	//Update sincronismo
	var change : float;
	//var passedTime : int;
	change = t / SincMod();
	//Limit to 50% max at the same time
	change = Mathf.Min(change, 45);

	if (!completed)
	{
		if((sincronismo < 85.0) || (prototype))
			sincronismo = sincronismo + change;
		else
			change = 0;
	}
	sincronismo = Mathf.Clamp(sincronismo, 0.0, 100.0);
	sincronismo = Mathf.Round(sincronismo * 1000f) / 1000f;
	
	CheckRequirements();
	ResetLastElicitation();
	
	return change;
}

function ReduceSincronism()
{
	passedTime = volatility * 5 / SincMod();
	if (!completed)
	{
		sincronismo = sincronismo - passedTime;
		sincronismo = Mathf.Clamp(sincronismo, 0.0, 100.0);
		sincronismo = Mathf.Round(sincronismo * 1000f) / 1000f;
	}
}

function SincMod()
{
	return (GetProjectSize() * 0.005);
}

function GetElicitation()
{
	return sincronismo;
}

//---------------------------------------------------------------------------------------------------------------
//--------------------------------------------Code Quality-------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------
function GetCodeQuality()
{
	return codeQuality;
}
function ChangeCodeQuality(t : float)
{
	var temp : float = codeQuality;
	var dif : float;
	this.codeQuality *= t;
	this.codeQuality = Mathf.Clamp(this.codeQuality, 10, 120);
	
	this.codeQuality = (Mathf.Floor(this.codeQuality * 1000)) * 0.001;
	dif = Mathf.Round((this.codeQuality - temp) * 1000) * 0.001;
	dif = (Mathf.Floor(dif * 1000)) * 0.001;
	
	return dif;
}
function ResetCodeQuality()
{
	codeQuality = 80;
}
function SetCodeQuality(t : float)
{
	codeQuality = t;
}

//---------------------------------------------------------------------------------------------------------------
//--------------------------------------------Model-----------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------
function GetRequirements()
{
	return requirements;
}
function ChangeRequirements(t : float)
{
	var change : float = t / SincMod();
	requirements = GetRequirements() + change;
	CheckRequirements();
	return change;
	
}
function ResetRequirements()
{
	requirements = 0.0;
}
function SetRequirements(t : float)
{
	requirements = t;
}

//Requirements cant be highter than validation nor lower than 0.0

function CheckRequirements()
{
	requirements = Mathf.Clamp(requirements, 0.0, sincronismo);
	requirements = Mathf.Round(requirements * 1000f) / 1000f;
}

//---------------------------------------------------------------------------------------------------------------
//--------------------------------------------Bugs Types-----------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------
function ResetBugsTypes()
{
	SetBugsByType(0,0,0,0);
	SetBugsFoundByType(0,0,0,0);
	SetBugsRepairedByType(0,0,0,0);
}

function RandomizeBugs(t : int)
{
	var i : int = 0;
	var random : int;
	codeQuality = GetCodeQuality();
	var bugUnitary : int = 0;
	var bugIntegration : int = 0;
	var bugSystem : int = 0;
	var bugAcception : int = 0;
	
	while(i < t)
	{
		random = Random.Range (0, 30);
		i++;
		if (random < (2 - codeQuality * 0.01)  * 10)
		{
			random = Random.Range (0, 5);
			switch(random)
			{
			   case 1: 
				  bugUnitary++;
			   break;
		
			   case 2:
				  bugIntegration++;
			   break;
			   
			   case 3:
				  bugSystem++;;
			   break;
			   
			   case 4:
				  bugAcception++;
			   break;
			   
			   default:
					bugUnitary++;
				  break;
			}
		}
	}
	IncrementBugsByType(bugUnitary, bugIntegration, bugSystem, bugAcception);
	var aux : int;
	aux = (bugUnitary + bugIntegration + bugSystem + bugAcception);
	return aux;
} 

function SetBugsByType(unitary : int, integration : int, system : int, acception : int)
{
	bugUnitary = unitary;
	bugIntegration = integration;
	bugSystem = system;
	bugAcception = acception; 
}
function IncrementBugsByType(unitary : int, integration : int, system : int, acception : int)
{
	bugUnitary += unitary;
	bugIntegration += integration;
	bugSystem += system;
	bugAcception += acception; 
}

function SetBugsFoundByType(unitary : int, integration : int, system : int, acception : int)
{
	bugUnitaryFound = unitary;
	bugIntegrationFound = integration;
	bugSystemFound = system;
	bugAcceptionFound = acception; 
}
function IncrementBugsFoundByType(unitary : int, integration : int, system : int, acception : int)
{
	bugUnitaryFound += unitary;
	bugIntegrationFound += integration;
	bugSystemFound += system;
	bugAcceptionFound += acception;
}
function SetBugsRepairedByType(unitary : int, integration : int, system : int, acception : int)
{
	bugUnitaryRepaired = unitary;
	bugIntegrationRepaired = integration;
	bugSystemRepaired = system;
	bugAcceptionRepaired = acception; 
}
function IncrementBugsRepairedByType(unitary : int, integration : int, system : int, acception : int, chanceMod : float)
{
	bugUnitaryRepaired += unitary;
	bugIntegrationRepaired += integration;
	bugSystemRepaired += system;
	bugAcceptionRepaired += acception; 
	
	//Everytime a bug is repaired, there is a chance to add another bug
	var newBugChance : float = 20.0; //20%
	var random : float;
	var newBug : int = 0;
	random = Random.Range (0.0, 100.0);
	//Add bug
	newBugChance = newBugChance * chanceMod * (2 - codeQuality * 0.01);
	if(random < newBugChance)
	{
		newBug = 1;
	}
	if(newBug == 1)
	{
		random = Random.Range (0, 5);
		switch(random)
		{
		   case 1: 
			  IncrementBugsByType(1, 0, 0, 0);
		   break;
	
		   case 2:
			  IncrementBugsByType(0, 1, 0, 0);
		   break;
		   
		   case 3:
			  IncrementBugsByType(0, 0, 1, 0);
		   break;
		   
		   case 4:
			  IncrementBugsByType(0, 0, 0, 1);
		   break;
		   
		   default:
				IncrementBugsByType(1, 0, 0, 0);
			  break;
		}
	}
	return newBug;
}

function GetTotalBugs()
{
	return (bugUnitary + bugIntegration + bugAcception + bugSystem);
}
function GetTotalBugsString()
{
	var bugs : String = (bugUnitary + " " + bugIntegration + " " +  bugSystem + " " +  bugAcception);
	return bugs;
}
function GetTotalBugsFound()
{
	var aux : int;
	aux = (bugUnitaryFound + bugIntegrationFound + bugAcceptionFound + bugSystemFound);
	return aux;
}
function GetTotalBugsRepaired()
{
	var aux : int;
	aux = (bugUnitaryRepaired + bugIntegrationRepaired + bugAcceptionRepaired + bugSystemRepaired);
	return aux;
}

function GetTotalBugsNotFixed()
{
	return GetTotalBugs() - GetTotalBugsRepaired();
}
function GetBugUnitary() {
	return bugUnitary;
}
function GetBugIntegration() {
	return bugIntegration;
}
function GetBugSystem() {
	return bugSystem;
}
function GetBugAcception() {
	return bugAcception;
}
function GetBugUnitaryFound() {
	return bugUnitaryFound;
}
function GetBugIntegrationFound() {
	return bugIntegrationFound;
}
function GetBugSystemFound() {
	return bugSystemFound;
}
function GetBugAcceptionFound() {
	return bugAcceptionFound;
}
function GetBugUnitaryRepaired() {
	return bugUnitaryRepaired;
}
function GetBugIntegrationRepaired() {
	return bugIntegrationRepaired;
}
function GetBugSystemRepaired() {
	return bugSystemRepaired;
}
function GetBugAcceptionRepaired() {
	return bugAcceptionRepaired;
}
//---------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------

//--------------------------------------------Get/Set-----------------------------------------------------------
function GetNome () {
	return nome;
}
function SetNome (t : String) {
	nome = t;
}
function GetDescription () {
	return description;
}
function SetDescription (t : String) {
	description = t;
}

function GetDeadline () {	
	return deadline;
}
function SetDeadline (t : int) {	
	deadline = t;
}
function SetNewDeadline(t: int){
	deadline = t + timer.GetGameTime();
}
function GetDeadlineDays () {
	return deadlineDays;
}
function SetDeadlineDays (t : int) {
	deadlineDays = t;
}
function GetStartDay () {
	return startDay;
}
function SetStartDay (t : int) {
	startDay = t;
}
function GetNumBugs () {
	return bugs;
}
function SetNumBugs (t: int) {
	if (!completed)
		bugs = bugs + t;
	if(bugs < 0 )
		bugs = 0;
}
function GetProjectSize () {
	return maxCodeLines;
}
function SetProjectSize (t: int) {
	maxCodeLines = t;
}
function GetLinesDone () {
	return codeLinesDone;
}

//It will cap on the model
function SetLinesDone (t: int) {
	if (!completed)
	{
		if(GetFractionDone() < GetRequirements())
		{
			codeLinesDone = codeLinesDone + t;
			if(GetFractionDone() > GetRequirements())
			{
				codeLinesDone = GetRequirements() * 0.01 * maxCodeLines;	
			}
			return t;
		}
	}
	return 0;
}
function GetIscomplete () {
	return completed;
}
function SetIscomplete (t: boolean) {
	completed = t;
}
function GetDeadLine () {						//Retorna o Deadline no formato Data/Hora
	var deadline = timer.GetTimeDaysString(deadline);
	return deadline;
}
function GetFractionDone () {					//Retorna a percentagem ja concluida do software
	var completeFraction = codeLinesDone * 100 / maxCodeLines;
	if (completeFraction > 100)
		completeFraction = 100;
	return completeFraction;
}
function GetSincronismo () {						//Retorna o sincronismo do projeto com o que o cliente pediu
	return sincronismo;
}
function SetSincronismo (t: float) {				//Seta o sincronismo do projeto
	if (!completed)
		sincronismo = sincronismo + t;
	if (sincronismo > 100)
		sincronismo = 100.0;
}
function GetPagamento () {					//Retorna o Pagamento mensal
	return pagamento;
}
function SetPagamento (t: int) {				//Seta o tamanho do software que deve ser produzido
	pagamento = t;
}
function GetLinguagem () {						//Retorna o requisito
	return linguagemProgramacao;
}
function SetLinguagem (t: String) {						//Seta o requisito
	linguagemProgramacao = t;
}
function GetBugValue () {					//Retorna o valor de cada bug
	return bugValue;
}
function SetBugValue (t : int) {
	bugValue = t;
}
function GetProjectSizeString () {					//Retorna o valor de cada bug
	return projectSize;
}
function SetProjectSizeString(t : String) {					//Retorna o valor de cada bug
	projectSize = t;
}

/*
function SetProjectSizeString () {
	var aux : float = 0;
	aux = maxCodeLines / deadlineDays;
	if (aux < constant.SIMPLE)
		projectSize = "Simple";
	else
		if (aux < constant.REGULAR)
			projectSize = "Regular";
		else
			if (aux < constant.COMPLEX)
				projectSize = "Complex";
			else
				projectSize = "Insane";
}
*/

function GetProjectQuality(){
	return projectQuality;
}

function SetProjectQuality(){
	if (bugValue < constant.LOW)
		projectQuality = "Not a priority";
	else
		if (bugValue < constant.NORMAL)
			projectQuality = "Standart";
		else
			if(bugValue < constant.HIGH)
				projectQuality = "High priority";
			else
				projectQuality = "Highest priority";
}

function GetStatus()
{
	var neededMonths : int = 0;
	var monthPercent : float = 0.0;
	var auxTime : int = 0;
	var expected : float = 0.0;
	var relief : float;
	
	neededMonths = Mathf.Max(((this.GetDeadline() - this.GetStartDay()) / 28), 1);							//Qnts meses pro projeto
	monthPercent = 100 / neededMonths; 									//Qnts % por meses
	auxTime = timer.GetGameTime() - this.GetStartDay();			//Quanto tempo desde que o projeto iniciou
	auxTime = parseInt(auxTime / 28);														//Quantos meses se passaram desde que iniciou
	expected = monthPercent * auxTime;										//% concluido esperado
	relief = monthPercent * 0.5;
	if ((relief + this.GetFractionDone()) >= expected + monthPercent)
	{
		return "Ahead";
	}
	else if ((relief + this.GetFractionDone()) >= expected)
	{
		return "Normal";
	}
	else
	{
		return "Overdue";
	}
}
function GetStats()
{
	var stats : ProjectStats = new ProjectStats();
	stats.name = this.name;
	stats.description = this.description;
	stats.deadline = this.deadline;
	stats.linguagemProgramacao = this.linguagemProgramacao;
	stats.pagamento = this.pagamento;
	stats.requirements = this.GetRequirements();
	stats.sincronismo = this.GetSincronismo();
	stats.codeQuality = parseInt(this.codeQuality * 100) * 0.01;
	stats.percentageDone = this.GetFractionDone();
	stats.bugUnitaryFound = this.bugUnitaryFound;
	stats.bugIntegrationFound = this.bugIntegrationFound;
	stats.bugSystemFound = this.bugSystemFound;
	stats.bugAcceptionFound = this.bugAcceptionFound;
	stats.bugUnitaryRepaired = this.bugUnitaryRepaired;
	stats.bugIntegrationRepaired = this.bugIntegrationRepaired;
	stats.bugSystemRepaired = this.bugSystemRepaired;
	stats.bugAcceptionRepaired = this.bugAcceptionRepaired;
	stats.date = timer.GetGameTime() + ":" + timer.GetTimeDayString();
	stats.totalBugs = this.GetTotalBugs() + ": " + this.GetTotalBugsString();
	stats.status = this.GetStatus();
	stats.expenses = this.expenses;
	
	return stats;
}

function ProjectProvenance()
{
	prov.AddAttribute("Name", this.name.ToString());
	prov.AddAttribute("Credits", player.GetSaldo().ToString());
	prov.AddAttribute("Deadline", this.deadline.ToString());
	prov.AddAttribute("Programming Language", this.linguagemProgramacao.ToString());
	prov.AddAttribute("Payment", this.pagamento.ToString());
	prov.AddAttribute("Code Completed", this.GetFractionDone().ToString());
	prov.AddAttribute("Code Quality", (parseInt(this.codeQuality * 100) * 0.01).ToString());
	prov.AddAttribute("Especification", this.GetRequirements().ToString());
	prov.AddAttribute("Elicitation", this.GetSincronismo().ToString());
	prov.AddAttribute("Unitary Bugs Found", this.bugIntegrationFound.ToString());
	prov.AddAttribute("Integration Bugs Found", this.bugIntegrationFound.ToString());
	prov.AddAttribute("System Bugs Found", this.bugSystemFound.ToString());
	prov.AddAttribute("Acception Bugs Found", this.bugAcceptionFound.ToString());
	prov.AddAttribute("Unitary Bugs Repaired", this.bugUnitaryRepaired.ToString());
	prov.AddAttribute("Integration Bugs Repaired", this.bugIntegrationRepaired.ToString());
	prov.AddAttribute("System Bugs Repaired", this.bugSystemRepaired.ToString());
	prov.AddAttribute("Acception Bugs Repaired", this.bugAcceptionRepaired.ToString());
	prov.AddAttribute("Total Bugs", (this.GetTotalBugs() + ": " + this.GetTotalBugsString()).ToString());
	
	prov.NewEntityVertex(timer.GetGameTime() + ":" + timer.GetTimeDayString(), "Project", "");
	//prov.HasInfluence("Project");
	//prov.GenerateInfluence("Project", "ANALYST", infType, "+" + influence);
}

function CheckProjectInfluence()
{
	if(prov != null)
		prov.HasInfluence("Project");
}
function CheckProjectSpecialInfluence()
{
	if(prov != null)
	{
		prov.HasInfluence_ID("Negotiation");
		prov.HasInfluence_ID("Hired_Employee");
	}
}
//--------------------------------------------Awake-----------------------------------------------------------
function Awake(){
	//SetProjectSizeString();
	SetProjectQuality();
	prov = GetComponentInChildren(ExtractProvenance);
}
function Update(){
}