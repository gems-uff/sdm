//Para usar este script;
//private var projectObj : GameObject;
//private var project : Project;
//projectObj = GameObject.Find("Project");
//project = projectObj.GetComponent(Project);

public var constant : GameConstants;
public var timer : GameTime;
public var nome : String;
public var description : String;
public var deadline : int = 1;  //in days
public var deadlineDays : int =1;
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
function GetNumBugs () {						//Retorna o numero de bugs no software
	return bugs;
}
function SetNumBugs (t: float) {					//Seta o numero de bugs no software
	if (!completed)
		bugs = bugs + t;
	if(bugs < 0 )
		bugs = 0;
}
function GetProjectSize () {						//Retorna o numero de linhas que o software deve ter para ficar pronto
	return maxCodeLines;
}
function SetProjectSize (t: int) {				//Seta o tamanho do software que deve ser produzido
	maxCodeLines = t;
}
function GetLinesDone () {						//Retorna o numero de linhas ja feitas para o software
	return codeLinesDone;
}
function SetLinesDone (t: int) {				//Seta o numero de linhas do software ja feitas
	if (!completed)
		codeLinesDone = codeLinesDone + t;
}
function GetIscomplete () {					//Retorna se o projeto esta concluido
	return completed;
}
function SetIscomplete (t: boolean) {		//Seta se o projeto esta concluido ou nao
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
function ResetProject(){
	bugs = 0;
	sincronismo = 0;
	codeLinesDone = 0;
	completed = false;
}

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
	SetProjectSizeString();
	SetProjectQuality();
}
function Update(){
}