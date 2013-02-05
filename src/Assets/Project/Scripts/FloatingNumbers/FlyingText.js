function Start () {
	Execute();
}
function Update () {

}
function Execute(){
	for( var i= 0; i < 120; i++)
	{
		guiText.pixelOffset.y += 0.5;
		yield WaitForSeconds(0.002);
	}
	Destroy(transform.gameObject);
}