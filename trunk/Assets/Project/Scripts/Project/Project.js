
//Escala de Tempo: 1 segundo = 1 hora no jogo

public var deadlinehours = 0;  //in hours
public var bugs = 0.0;				//number of bugs in the software
public var maxcodelines = 0;	//size of the software to be done
public var codelinesdone = 0;	//number of lines done by the team
public var completed : boolean = false;
private var sincronismo = 0.0;		//sincronismo
private var findbugScore = 0.0;

//Funcoes GET

function GetDeadlineHours () {					//Retorna o Deadline em horas
	return deadlinehours;
}

function GetNumBugs () {						//Retorna o numero de bugs no software
	return bugs;
}

function GetProjectSize () {						//Retorna o numero de linhas que o software deve ter para ficar pronto
	return maxcodelines;
}

function GetLinesDone () {						//Retorna o numero de linhas ja feitas para o software
	return codelinesdone;
}

function GetIscomplete () {					//Retorna se o projeto esta concluido
	return completed;
}

function GetTime () {								//Retorna o tempo no formato data/hora
	var gametime = getTimeString(Time.timeSinceLevelLoad);
	return gametime;
}

function GetTimePassed () {						//Retorna o tempo passado em horas
	return Time.timeSinceLevelLoad;
}

function GetDeadLine () {						//Retorna o Deadline no formato Data/Hora
	var deadline = getTimeString(deadlinehours);
	return deadline;
}

function GetNumLinesDone () {					//Retorna a percentagem ja concluida do software
	var completeFraction = codelinesdone*100 / maxcodelines;
	return completeFraction;
}
function GetSincronismo () {						//Retorna o sincronismo do projeto com o que o cliente pediu
	return sincronismo;
}

function GetFindbugScore () {					//Retorna o Deadline em horas
	return findbugScore;
}
//Funcoes SET

function SetNumBugs (t: float) {					//Seta o numero de bugs no software
	if (!completed)
		bugs = bugs + (t*Time.timeScale);
	if(bugs < 0 )
		bugs = 0;
}

function SetProjectSize (t: int) {				//Seta o tamanho do software que deve ser produzido
	maxcodelines = t;
}

function SetLinesDone (t: int) {				//Seta o numero de linhas do software ja feitas
	if (!completed)
		codelinesdone = codelinesdone + (t*Time.timeScale);
}

function SetSincronismo (t: float) {				//Seta o sincronismo do projeto
	if (!completed)
		sincronismo = sincronismo + (t*Time.timeScale);
}

function SetNewDeadline(t: float){			//Seta a nova data de deadline
	deadlinehours = t + Time.timeSinceLevelLoad;
}

function SetIscomplete (t: boolean) {		//Seta se o projeto esta concluido ou nao
	completed = t;
}

function SetFindbugScore(t: float){
	findbugScore = t;
}


function getTimeString(t : float) :String{
	var days : int = t / 24 ;
    var hours : int = (t % 24);
    return ("Day: " + days.ToString("00") + "   Hour: " + hours.ToString("00"));
}

function Update()
	{
		//SetLinesDone(codelinesdone+2);
		//SetNumBugs(bugs +1);
		//codelinesdone = codelinesdone + 1;		//remover isto quando funcionarios estiver pronto
	}