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

function BelowZero(){
	if (saldo < 0)
	{
		saldo = 0;
	}
}


function Update(){
	BelowZero();
}