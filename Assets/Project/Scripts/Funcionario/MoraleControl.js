
public var MODIFICATOR : float = 6.0; 
public var SLOWRECOVERY : float = -1.0;
public var RECOVERYBONUS : float = 1.2;
public var BADMORALE : float = 25.0;
public var DEMITCHANCE : float = 5.0;

private var func : Funcionario;
private var work : Working;
private var timerObj : GameObject;
private var timer : GameTime;

function ChangeMorale(){
	var morale : float;
	var changeFactor : float;
	var moraleMod : float;
	morale = func.GetMorale();
	changeFactor = work.GetWorkingHoursModifier();
	moraleMod = (changeFactor - 1);
	if (moraleMod == 0)		//Se esta trabalhando o numero de horas default (40 horas) entao ele recupera moral bem lentamente
		moraleMod = SLOWRECOVERY;
	else
		if (moraleMod < 0 )		//Se estiver trabalhando um numero de horas inferior ao default, entao ele recupera moral (recupera 20% a mais do que ele perderia se fosse o inverso)
			moraleMod = moraleMod * RECOVERYBONUS;
	moraleMod = moraleMod * MODIFICATOR;
	morale = morale - moraleMod;
	if (morale > 100)
		morale = 100;
	else
		if (morale < 0)
			morale = 0;
	//Debug.Log("Morale: " + morale);
	func.SetMorale(morale);
}

function MoraleActions(){
	var morale = func.GetMorale();
	var chance : int = Random.Range (0, 100);
	if (morale < BADMORALE)
	{
		Debug.Log("Estou insatisfeito!");
		if (chance < DEMITCHANCE)
		{
			//Funcionario se demite
			Debug.Log("ME DEMITO!!!");
		}
	}
}
//--------------------------------------------Awake-----------------------------------------------------------

function Awake () {
	func = GetComponentInChildren(Funcionario);
	work = GetComponentInChildren(Working);
	timerObj = GameObject.Find("Timer");
	timer = timerObj.GetComponent(GameTime);
}

//--------------------------------------------FixedUpdate-----------------------------------------------------------
//para ser independente do frame rate de cada maquina.
function FixedUpdate() {
	//ChangeMorale();
	//MoraleActions();
}