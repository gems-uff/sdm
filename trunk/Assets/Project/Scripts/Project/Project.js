//Para usar este script;
//private var projectObj : GameObject;
//private var project : Project;
//projectObj = GameObject.Find("Project");
//project = projectObj.GetComponent(Project);

public var deadlineDays : int = 0;  //in days
public var maxCodeLines : int = 0;	//size of the software to be done
public var linguagemProgramacao : String = "java";	//Linguagem: Escolher apenas uma linguagem
public var pagamento : int = 0;
public var bugValue : int = 1000;

private var sincronismo = 0.0;		//sincronismo
private var completed : boolean = false;
private var timer : GameTime;
private var bugs : float = 0.0 ;				//number of bugs in the software
private var codeLinesDone : int = 0;	//number of lines done by the team
//--------------------------------------------Get/Set-----------------------------------------------------------

function GetDeadlineDays () {					//Retorna o Deadline em horas
	return deadlineDays;
}
function SetDeadlineDays (t : int) {					//Seta o Deadline em horas
	deadlineDays = t;
}
function SetNewDeadline(t: int){			//Seta a nova data de deadline
	deadlineDays = t + timer.GetGameTime();
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
	var deadline = timer.GetTimeString(deadlineDays);
	return deadline;
}
function GetNumLinesDone () {					//Retorna a percentagem ja concluida do software
	var completeFraction = codeLinesDone*100 / maxCodeLines;
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
//--------------------------------------------Awake-----------------------------------------------------------

function Awake(){
	var timerObj : GameObject;
	timerObj = GameObject.Find("Timer");
	timer = timerObj.GetComponent(GameTime);
}