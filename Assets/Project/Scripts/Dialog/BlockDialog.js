//Usando para evitar que tenha varios dialogos acontecendo ao mesmo tempo
private var isLocked : boolean = false;

function GetLock(){
	return isLocked;
}
function SetLock(t : boolean){
	isLocked = t;
}
function Update () {
}