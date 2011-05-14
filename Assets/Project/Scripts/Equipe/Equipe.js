//Para usar este script:
//private var equipeObj : GameObject;
//private var equipe : Equipe;
//equipeObj = GameObject.Find("Equipe");
//equipe = equipeObj.GetComponent(Equipe);

public var metodologia : String = "";		//Agile or Classic
public var linguagemProg : String = "";

private var findBugScore : float = 1.0;
private var bonusAnalista : float = 1.0;
private var bonusArquiteto : float = 1.0;
private var bonusProg : float = 1.0;
//private var marBonusAnalista : float = 1.0;

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
	findBugScore = findBugScore + (t / 100);
}
function GetBonusAnalista () {					
	return bonusAnalista;
}
function SetBonusAnalista(t: float){
	bonusAnalista = bonusAnalista + (t / 100);
}
function GetBonusArquiteto () {					
	return bonusArquiteto;
}
function SetBonusArquiteto(t: float){
	bonusArquiteto = bonusArquiteto + (t / 100);
}
function GetBonusProg () {					
	return bonusProg;
}
function SetBonusProg(t: float){
	bonusProg = bonusProg + (t / 100);
}
/*
function GetMarBonusAnalista () {					
	return marBonusAnalista;
}
function SetMarBonusAnalista(t: float){
	marBonusAnalista = marBonusAnalista + t;
}
*/
//--------------------------------------------Reset-----------------------------------------------------------

function ResetBonus(){
	findBugScore = 1.0;
	bonusAnalista = 1.0;
	bonusArquiteto = 1.0;
	bonusProg = 1.0;
}