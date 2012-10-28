public var testCases : TestCases;
public var constant : GameConstants;
public var timer : GameTime;
public var nome : String;
public var description : String;
public var deadline : int = 1;  //in days
public var deadlineDays : int =1;	//Deadline Original
public var maxCodeLines : int = 0;	//size of the software to be done
public var linguagemProgramacao : String = "";	//Linguagem: Escolher apenas uma linguagem
public var pagamento : int = 0;
public var bugValue : int = 1000;

private var startDay : int = 1;
private var projectSize : String = "";
private var projectQuality : String = "";
private var sincronismo : float = 0.0;		//sincronismo
private var completed : boolean = false;
private var bugs : float = 0.0 ;				//number of bugs in the software

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




//New additions
//Modificador que reduz a validação ja feita com o passar do tempo
private var volatility : float = 1.0;
private var lastValidation : int = 0.0;
//Qualidade do codigo, o que interfere na remoção/inserção de bugs
private var codeQuality : float = 0.8; //from 0.1 to 1.2
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
	codeQuality = 0.8;
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
	var change : float;
	var passedTime : int;
	change = t / (GetProjectSize() * 0.005);
	passedTime = timer.GetGameTime() - lastValidation;
	passedTime = volatility * passedTime / (GetProjectSize() * 0.005);
	if (!completed)
	{
		sincronismo = sincronismo - passedTime;
		sincronismo = sincronismo + change;
	}
	if(prototype)
		Mathf.Clamp(sincronismo, 0.0, 100.0);
	else
		Mathf.Clamp(sincronismo, 0.0, 85.0);
	/*
	if (sincronismo > 100.0)
	{
		sincronismo = 100.0;
	}
	else
	{
		if(sincronismo < 0.0)
		{
			sincronismo = 0.0;
		}
	}
	*/
	CheckRequirements();
	ResetLastElicitation();
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
	codeQuality *= t;
	Mathf.Clamp(codeQuality, 0.1, 1.2);
	/*
	if(codeQuality > 1.2)
	{
		codeQuality = 1.2;
	}
	else
	{
		if(codeQuality < 0.1)
		{
			codeQuality = 0.1;
		}
	}
	*/
}
function ResetCodeQuality()
{
	codeQuality = 0.8;
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
	requirements += t;
	CheckRequirements();
	
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
	if(requirements > sincronismo)
	{
		requirements = sincronismo;
	}
	else
	{
		if(requirements < 0.0)
		{
			requirements = 0.0;
		}
	}
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
		if (random < (2 - codeQuality)  * 10)
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
	/*
	Debug.Log("-----------------------");
	Debug.Log("--- SetBugsByType ----");
	Debug.Log("bugUnitary: " + bugUnitary);
	Debug.Log("bugIntegration: " + bugIntegration);
	Debug.Log("bugSystem: " + bugSystem);
	Debug.Log("bugAcception: " + bugAcception);
	Debug.Log("Bugs in software: " + GetTotalBugs());
	Debug.Log("-----------------------");
	*/
}
function IncrementBugsByType(unitary : int, integration : int, system : int, acception : int)
{
	bugUnitary += unitary;
	bugIntegration += integration;
	bugSystem += system;
	bugAcception += acception; 
	/*
	Debug.Log("-----------------------");
	Debug.Log("--- IncrementBugsByType ----");
	Debug.Log("bugUnitary: " + bugUnitary);
	Debug.Log("bugIntegration: " + bugIntegration);
	Debug.Log("bugSystem: " + bugSystem);
	Debug.Log("bugAcception: " + bugAcception);
	Debug.Log("Bugs in software: " + GetTotalBugs());
	Debug.Log("-----------------------");
	*/
}

function SetBugsFoundByType(unitary : int, integration : int, system : int, acception : int)
{
	bugUnitaryFound = unitary;
	bugIntegrationFound = integration;
	bugSystemFound = system;
	bugAcceptionFound = acception; 
	/*
	Debug.Log("-----------------------");
	Debug.Log("--- SetBugsFoundByType ----");
	Debug.Log("bugUnitaryFound: " + bugUnitaryFound);
	Debug.Log("bugIntegrationFound: " + bugIntegrationFound);
	Debug.Log("bugSystemFound: " + bugSystemFound);
	Debug.Log("bugAcceptionFound: " + bugAcceptionFound);
	Debug.Log("Bugs Found in software: " + GetTotalBugsFound());
	Debug.Log("-----------------------");
	*/
}
function IncrementBugsFoundByType(unitary : int, integration : int, system : int, acception : int)
{
	bugUnitaryFound += unitary;
	bugIntegrationFound += integration;
	bugSystemFound += system;
	bugAcceptionFound += acception; 
	/*
	Debug.Log("-----------------------");
	Debug.Log("--- IncrementBugsFoundByType ----");
	Debug.Log("bugUnitaryFound: " + bugUnitaryFound);
	Debug.Log("bugIntegrationFound: " + bugIntegrationFound);
	Debug.Log("bugSystemFound: " + bugSystemFound);
	Debug.Log("bugAcceptionFound: " + bugAcceptionFound);
	Debug.Log("Bugs Found in software: " + GetTotalBugsFound());
	Debug.Log("-----------------------");
	*/
}
function SetBugsRepairedByType(unitary : int, integration : int, system : int, acception : int)
{
	bugUnitaryRepaired = unitary;
	bugIntegrationRepaired = integration;
	bugSystemRepaired = system;
	bugAcceptionRepaired = acception; 
	/*
	Debug.Log("-----------------------");
	Debug.Log("--- SetBugsRepairedByType ----");
	Debug.Log("bugUnitaryRepaired: " + bugUnitaryRepaired);
	Debug.Log("bugIntegrationRepaired: " + bugIntegrationRepaired);
	Debug.Log("bugSystemRepaired: " + bugSystemRepaired);
	Debug.Log("bugAcceptionRepaired: " + bugAcceptionRepaired);
	Debug.Log("-----------------------");
	*/
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
	random = Random.Range (0.0, 100.0);
	//Add bug
	newBugChance = newBugChance * chanceMod * (2 - codeQuality);
	if(random < newBugChance)
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
	/*
	Debug.Log("-----------------------");
	Debug.Log("--- IncrementBugsRepairedByType ----");
	Debug.Log("bugUnitaryRepaired: " + bugUnitaryRepaired);
	Debug.Log("bugIntegrationRepaired: " + bugIntegrationRepaired);
	Debug.Log("bugSystemRepaired: " + bugSystemRepaired);
	Debug.Log("bugAcceptionRepaired: " + bugAcceptionRepaired);
	Debug.Log("Bugs Found in software: " + GetTotalBugsRepaired());
	Debug.Log("-----------------------");
	*/
}

function GetTotalBugs()
{
	var aux : int;
	aux = (bugUnitary + bugIntegration + bugAcception + bugSystem);
	return aux;
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
function SetNumBugs (t: float) {
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
		codeLinesDone = codeLinesDone + t;
		if(GetFractionDone() > GetRequirements())
		{
			codeLinesDone = GetRequirements() * 0.01 * maxCodeLines;
		}
	}
}
function GetIscomplete () {
	return completed;
}
function SetIscomplete (t: boolean) {
	completed = t;
}
function GetDeadLine () {						//Retorna o Deadline no formato Data/Hora
	var deadline = timer.GetTimeString(deadline);
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

//--------------------------------------------Awake-----------------------------------------------------------
function Awake(){
	//SetProjectSizeString();
	SetProjectQuality();
}
function Update(){
}