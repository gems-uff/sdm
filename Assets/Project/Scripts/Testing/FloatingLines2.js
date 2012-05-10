

private var isShowing : boolean = false;
var ptsPrefab: Transform; // drag the prefab to this variable in Inspector
var v : Vector3;
var x : float;
var y : float;

function showFloatText(modifier : String, number : float, texto : String)
{
	if ( !isShowing)
	{
		x = v.x;
		y = v.y;
    	var gui: Transform = Instantiate(ptsPrefab,Vector3(x - 0.05,y + 0.05,0),Quaternion.identity);
    	
		isShowing = true;
		
		gui.guiText.pixelOffset.y = 0;
		gui.guiText.material.color = Color.blue;
		gui.guiText.fontSize = 18;
		gui.guiText.fontStyle =  FontStyle.Bold;
		gui.guiText.text = "" + modifier + number + texto;
		isShowing = false;
	}
}

function Start()
{
}
/*
private var isShowing : boolean = false;

function showFloatText(modifier : String, number : float, texto : String)
{
	if ( !isShowing)
	{
		isShowing = true;
		guiText.pixelOffset.y = 0;
		guiText.material.color = Color.blue;
		guiText.fontSize = 18;
		guiText.fontStyle =  FontStyle.Bold;
		guiText.text = "" + modifier + number + texto;
		
		for( var i= 0; i < 50; i++)
		{
			guiText.pixelOffset.y += 0.5;
			yield WaitForSeconds(0.01);
		}
		guiText.text = "";
		isShowing = false;
	}
}

function Start()
{
	guiText.text = "";
}
*/