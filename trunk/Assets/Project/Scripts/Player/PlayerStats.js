
private var VALOR_MINIMO : int = -100000;
public var saldo = 0;

function GetSaldo() {
	return saldo;
}

function SetSaldo(t: int) {
	saldo = t;
}

function ChangeSaldo(t: int){
	saldo = saldo + t;
}

function Falencia(){
	if (saldo < VALOR_MINIMO)
	{
		Debug.Log("GAME OVER");
	}
}


function Update(){
	Falencia();
}