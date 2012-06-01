function Start () {
	Execute();
}
function Update () {

}
function Execute(){
	for( var i= 0; i < 35; i++)
	{
		guiText.pixelOffset.y += 0.5;
		yield WaitForSeconds(0.01);
	}
	Destroy(transform.gameObject);
}