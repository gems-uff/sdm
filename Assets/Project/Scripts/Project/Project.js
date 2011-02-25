
//Escala de Tempo: 1 segundo = 1 hora no jogo

public var deadlineDays = 0;  //in hours
public var bugs = 0.0;				//number of bugs in the software
public var maxCodeLines = 0;	//size of the software to be done
public var codeLinesDone = 0;	//number of lines done by the team
private var completed : boolean = false;
public var pagamento : int = 0;
private var sincronismo = 0.0;		//sincronismo
private var findBugScore = 1.0;

private var timerObj : GameObject;
private var timer : GameTime;
//Linguagem: Escolher apenas uma linguagem
public var linguagemProgramacao : String = "java";

//--------------------------------------------Get/Set-----------------------------------------------------------

//Funcoes GET

function GetDeadlineHours () {					//Retorna o Deadline em horas
	return deadlineDays;
}
function GetNumBugs () {						//Retorna o numero de bugs no software
	return bugs;
}
function GetProjectSize () {						//Retorna o numero de linhas que o software deve ter para ficar pronto
	return maxCodeLines;
}
function GetLinesDone () {						//Retorna o numero de linhas ja feitas para o software
	return codeLinesDone;
}
function GetIscomplete () {					//Retorna se o projeto esta concluido
	return completed;
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
function GetFindbugScore () {					
	return findBugScore;
}

function GetPagamento () {					//Retorna o Deadline em horas
	return pagamento;
}
//Funcoes SET

function SetNumBugs (t: float) {					//Seta o numero de bugs no software
	if (!completed)
		bugs = bugs + (t*Time.timeScale);
	if(bugs < 0 )
		bugs = 0;
}
function SetProjectSize (t: int) {				//Seta o tamanho do software que deve ser produzido
	maxCodeLines = t;
}
function SetLinesDone (t: int) {				//Seta o numero de linhas do software ja feitas
	if (!completed)
		codeLinesDone = codeLinesDone + (t*Time.timeScale);
}
function SetSincronismo (t: float) {				//Seta o sincronismo do projeto
	if (!completed)
		sincronismo = sincronismo + (t*Time.timeScale);
}
function SetNewDeadline(t: float){			//Seta a nova data de deadline
	deadlineDays = t + Time.timeSinceLevelLoad;
}
function SetIscomplete (t: boolean) {		//Seta se o projeto esta concluido ou nao
	completed = t;
}
function SetFindbugScore(t: float){
	findBugScore = t;
}

function SetPagamento (t: int) {				//Seta o tamanho do software que deve ser produzido
	pagamento = t;
}

//Funcoes Get e Set de Requisitos
function GetLinguagem () {						//Retorna o requisito
	return linguagemProgramacao;
}
function SetLinguagem (t: String) {						//Seta o requisito
	linguagemProgramacao = t;
}
/*
function GetTime () {								//Retorna o tempo no formato data/hora
	var gametime = timer.GetTimeString(timer.GetGameTime);
	return gametime;
}
*/
/*
function GetTimePassed () {						//Retorna o tempo passado em horas
	return timer.GetGameTime;
}
*/
function Awake(){
	timerObj = GameObject.Find("Timer");
	timer = timerObj.GetComponent(GameTime);
}
/*
//--------------------------------------------Dia/Semana-----------------------------------------------------------

function getTimeString(t : float) :String{
	var semana : int = t / 7 ;
    var dia : int = (t % 7) +1;
    return ("Semana: " + semana.ToString("00") + "   Dia: " + dia.ToString("0"));
}
*/