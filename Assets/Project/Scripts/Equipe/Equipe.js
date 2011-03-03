//Para usar este script:
//private var equipeObj : GameObject;
//private var equipe : Equipe;
//equipeObj = GameObject.Find("Equipe");
//equipe = equipeObj.GetComponent(Equipe);

public var metodologia : String = "";		//Agile or Classic
public var linguagemProg : String = "";

private var findBugScore : float = 1.0;
private var gerBonusAnalista : float = 1.0;
private var gerBonusArquiteto : float = 1.0;
private var gerBonusProg : float = 1.0;
private var marBonusAnalista : float = 1.0;

//--------------------------------------------Get/Set-----------------------------------------------------------

function GetMetodologia(){
	return metodologia;
}
function SetMetodologia(t: String){
	metodologia = t;
}
function GetLinguagem(){
	return linguagemProg;
}
function SetLinguagem(t: String){
	linguagemProg = t;
}
function GetFindbugScore () {					
	return findBugScore;
}
function SetFindbugScore(t: float){
	findBugScore = t;
}
function GetGerBonusAnalista () {					
	return gerBonusAnalista;
}
function SetGerBonusAnalista(t: float){
	gerBonusAnalista = t;
}
function GetGerBonusArquiteto () {					
	return gerBonusArquiteto;
}
function SetGerBonusArquiteto(t: float){
	gerBonusArquiteto = t;
}
function GetGerBonusProg () {					
	return gerBonusProg;
}
function SetGerBonusProg(t: float){
	gerBonusProg = t;
}
function GetMarBonusAnalista () {					
	return marBonusAnalista;
}
function SetMarBonusAnalista(t: float){
	marBonusAnalista = t;
}
//--------------------------------------------Reset-----------------------------------------------------------

function ResetBonus(){
	findBugScore = 1.0;
	gerBonusAnalista = 1.0;
	gerBonusArquiteto = 1.0;
	gerBonusProg = 1.0;
	marBonusAnalista = 1.0;
}