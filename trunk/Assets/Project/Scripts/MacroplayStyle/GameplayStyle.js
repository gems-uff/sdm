#pragma strict


private var gameStyle : boolean = false;
//true = macro management
//false = micro management

function IsMacro()
{
 return gameStyle;
}

function SetPlayStyle(t : boolean)
{
 gameStyle = t;
}

function Start () {

}

function Update () {
	//Debug.Log("gameStyle = " + gameStyle);

}