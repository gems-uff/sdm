public var saldo = 0;
public var companyLevelUp : FloatingLevel;

private var completedProjects : int = 0;
private var failedProjects : int = 0;
private var totalIncome : int = 0;
private var totalExpenses : int = 0;

private var EXPERIENCE_MOD : int = 200;
private var companyLevel : int = 1;
private var companyExperience : int = 0;
private var companyRequiredExp : int = companyLevel * companyLevel * EXPERIENCE_MOD;
private var allowedProjects : int = 1;
private var stringAllowedProjects : String = "Simple Projects";

private var showJanela : boolean = false;
private var windowRect : Rect = Rect (300,125,300,220);

function AllowedProjectSize(){
	//Define o tamanho dos projetos permitidos para o jogador
	if (companyLevel < 3)
	{
		allowedProjects = 1;	//Simple
		stringAllowedProjects = "Simple Projects";
	}
	else
		if(companyLevel < 6)
		{
			allowedProjects = 2;	//Regular
			stringAllowedProjects = "Regular Projects";
		}
		else
			if(companyLevel < 9)
			{
				allowedProjects = 3;	//Complex
				stringAllowedProjects = "Complex Projects";
			}
			else
			{
				allowedProjects = 4;	//Insane
				stringAllowedProjects = "Insane Projects";
			}
}

function GetAllowedProjects(){
	return allowedProjects;
}
function CompanyLevelUp(){
	var count : int = 0;
	if ( companyExperience > companyRequiredExp)	//Ganha lvl
	{
		print("Level UP");
		companyLevel = companyLevel + 1;
		companyExperience = companyExperience - companyRequiredExp;
		//companyRequiredExp = companyLevel * companyLevel * EXPERIENCE_MOD;
		companyLevelUp.showFloatTextCompanyLevelUp();
	}
	if ( companyExperience < 0 )	//Perde Level
	{
		companyLevel = companyLevel - 1;
		companyRequiredExp = companyLevel * companyLevel * EXPERIENCE_MOD;
		companyExperience = companyRequiredExp + companyExperience;
		companyLevelUp.showFloatTextCompanyDeLevel();
	}
	if (companyLevel < 1)	//Level minimo
	{
		companyLevel = 1;
		companyExperience = 0;
		//companyRequiredExp = companyLevel * companyLevel * EXPERIENCE_MOD;
	}
	AllowedProjectSize();
	companyRequiredExp = companyLevel * companyLevel * EXPERIENCE_MOD;
}

function CompanyIncreaseExp(project_mod : int, projectQuality : int, numberBugs : int){
	//project_mod = 1(simple) 2(regular) 3(complex) 4(insane)
	var quantity : int =  0;
	quantity = (project_mod * projectQuality) - 10 * numberBugs;
	companyExperience = companyExperience + quantity;
	//floatingLevel.showFloatTextExperience(quantity);
}

function GetSaldo() {
	return saldo;
}

function SetSaldo(t: int) {
	saldo = t;
}

function ChangeSaldo(t: int){
	saldo = saldo + t;
	if (t > 0)
		ChangeIncome(t);
	else
		ChangeExpenses(t);
}

function BelowZero(){
	if (saldo < 0)
	{
		saldo = 0;
	}
}



function GetCompleted() {
	return completedProjects;
}
function GetFailed() {
	return failedProjects;
}
function GetIncome() {
	return totalIncome;
}
function GetExpenses() {
	return totalExpenses;
}
function GetCompany() {
	return companyLevel;
}
function GetCompanyExperience() {
	return companyExperience;
}
function GetCompanyReqExperience() {
	return companyRequiredExp;
}
function ChangeCompleted(){
	completedProjects = completedProjects + 1;
}
function ChangeFailed(){
	failedProjects = failedProjects + 1;
}
function ChangeIncome(t: int){
	totalIncome = totalIncome + t;
}
function ChangeExpenses(t: int){
	totalExpenses = totalExpenses + t;
}

function SetCompleted(t: int) {
	completedProjects = t;
}
function SetFailed(t: int) {
	failedProjects = t;
}
function SetIncome(t: int) {
	totalIncome = t;
}
function SetExpenses(t: int) {
	totalExpenses = t;
}
function SetCompany(t: int) {
	companyLevel = t;
}
function SetCompanyExperience(t: int) {
	companyExperience = t;
}

function ShowStatistics(){
	showJanela = true;
}
function WindowFunction (windowID : int)	{
	GUI.Box (Rect (02,020,298,25), (" Completed Projects: "+ completedProjects));
	GUI.Box (Rect (02,045,298,25), (" Failed Projects: "+ failedProjects));
	GUI.Box (Rect (02,070,298,25), (" Total Income: $"+ totalIncome));
	GUI.Box (Rect (02,095,298,25), (" Total Expenses: $"+ totalExpenses));
	GUI.Box (Rect (02,0120,298,25), (" Company Level: "+ companyLevel));
	GUI.Box (Rect (02,0145,298,25), (" Company Experiencie: "+ companyExperience + " / " + companyRequiredExp));
	GUI.Box (Rect (02,0170,298,25), (" Allowed Projects: "+ stringAllowedProjects));
	if (GUI.Button (Rect (02,195,298,25), "Close")) 
	{
		showJanela  = false;
	}
}

function OnGUI (){
	GUI.backgroundColor = Color.yellow;
	GUI.backgroundColor = Color.yellow;
	GUI.contentColor = Color.green;
	if(showJanela)
		windowRect = GUI.Window (1, windowRect, WindowFunction, "Player Statistics");
}

function Update(){
	BelowZero();
}