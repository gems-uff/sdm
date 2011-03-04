//Para usar este script;
//private var projectObj : GameObject;
//private var project : Project;
//projectObj = GameObject.Find("Project");
//project = projectObj.GetComponent(Project);

public var timer : GameTime;
public var deadline : int = 1;  //in days
public var maxCodeLines : int = 0;	//size of the software to be done
public var linguagemProgramacao : String = "";	//Linguagem: Escolher apenas uma linguagem
public var pagamento : int = 0;
public var bugValue : int = 1000;
public var SIMPLE : int = 105;		//Max 35 linhas de codigo por programador por dia (3 programadores)
public var REGULAR : int = 180;	//Max 60
public var COMPLEX : int = 240;	//Max 80
												//Insane > 80 por programador
public var LOW : int = 1500;
public var NORMAL : int = 3000;
public var HIGH : int = 4500;
private var projectSize : String = "";
private var projectQuality : String = "";
private var sincronismo = 0.0;		//sincronismo
private var completed : boolean = false;
private var bugs : float = 0.0 ;				//number of bugs in the software
private var codeLinesDone : int = 0;	//number of lines done by the team
//--------------------------------------------Get/Set-----------------------------------------------------------

function GetDeadline () {					//Retorna o Deadline em horas
	return deadline;
}
function SetDeadline (t : int) {					//Seta o Deadline em horas
	deadline = t;
}
function SetNewDeadline(t: int){			//Seta a nova data de deadline
	deadline = t + timer.GetGameTime();
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
	if (codeLinesDone > 100 )
		codeLinesDone = 100;
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
function SetProjectSizeString () {
	var aux : float = 0;
	if (deadline == 0)
		deadline = 1;
	aux = maxCodeLines / deadline;
	if (aux < SIMPLE)
		projectSize = "Simple";
	else
		if (aux < REGULAR)
			projectSize = "Regular";
		else
			if (aux < COMPLEX)
				projectSize = "Complex";
			else
				projectSize = "Insane";
}
function GetProjectQuality(){
	return projectQuality;
}
function SetProjectQuality(){
	if (bugValue < LOW)
		projectQuality = "Not a priority";
	else
		if (bugValue < NORMAL)
			projectQuality = "Standart";
		else
			if(bugValue < HIGH)
				projectQuality = "High priority";
			else
				projectQuality = "Highest priority";
}
//--------------------------------------------Awake-----------------------------------------------------------
function Awake(){
	SetProjectSizeString();
}
function Update(){
	SetProjectSizeString();
	SetProjectQuality();
}