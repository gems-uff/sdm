
private var isShowing : boolean = false;
var ptsPrefab: Transform; // drag the prefab to this variable in Inspector
var v : Vector3;
var x : float;
var y : float;
private var fontSize : int = 15;

function showFloatText(modifier : String, number : String, fontColor : String, texto : String, vec : Vector3)
{
	
	x = v.x;
	y = v.y;
	var gui: Transform = Instantiate(ptsPrefab, vec, Quaternion.identity);

	gui.guiText.pixelOffset.y = 0;
	if (fontColor == "red")
		gui.guiText.material.color = Color.red;
	else
		if(fontColor == "blue")
			gui.guiText.material.color = Color.blue;
		else
			if(fontColor == "green")
				gui.guiText.material.color = Color.green;
			else
				gui.guiText.material.color = Color.yellow;
		
	gui.guiText.fontSize = fontSize;
	gui.guiText.fontStyle =  FontStyle.Bold;
	gui.guiText.text = modifier + number + texto;
}

function showFloatText1(modifier : String, number : String, fontColor : String, texto : String, delay : float)
{
	yield WaitForSeconds( 0 + delay);
	showFloatText(modifier , number, fontColor, texto, Vector3(x - 0.03,y + 0.03,0));
}

function showFloatText2(modifier : String, number : String, fontColor : String, texto : String, delay : float)
{
	yield WaitForSeconds(0 + delay);
	//showFloatText(modifier , number, fontColor, texto, Vector3(x - 0.03,y + 0.03,0));
	showFloatText(modifier , number, fontColor, texto, Vector3(x - 0.03,y,0));
}

function showFloatText3(modifier : String, number : String, fontColor : String, texto : String, delay : float)
{
	yield WaitForSeconds(0 + delay);
	//showFloatText(modifier , number, fontColor, texto, Vector3(x - 0.03,y + 0.03,0));
	showFloatText(modifier , number, fontColor, texto, Vector3(x - 0.03,y - 0.03,0));
}

function showFloatText4(modifier : String, number : String, fontColor : String, texto : String, delay : float)
{
	yield WaitForSeconds(0 + delay);
	//showFloatText(modifier , number, fontColor, texto, Vector3(x - 0.03,y + 0.03,0));
	showFloatText(modifier , number, fontColor, texto, Vector3(x - 0.03,y - 0.05,0));
}

function showFloatText1(modifier : String, number : String, fontColor : String, texto : String)
{
	showFloatText1(modifier , number, fontColor, texto, 0.0);
}

function showFloatText2(modifier : String, number : String, fontColor : String, texto : String)
{
	showFloatText2(modifier , number, fontColor, texto, 0.0);
	//showFloatText(modifier , number, fontColor, texto, Vector3(x - 0.03,y,0));
}

function showFloatText3(modifier : String, number : String, fontColor : String, texto : String)
{
	showFloatText3(modifier , number, fontColor, texto, 0.0);
	//showFloatText(modifier , number, fontColor, texto, Vector3(x - 0.03,y - 0.03,0));
}

function showFloatText4(modifier : String, number : String, fontColor : String, texto : String)
{
	showFloatText4(modifier , number, fontColor, texto, 0.0);
	//showFloatText(modifier , number, fontColor, texto, Vector3(x - 0.03,y - 0.05,0));
}

function Start()
{
	v = Camera.main.WorldToViewportPoint(transform.position);
}