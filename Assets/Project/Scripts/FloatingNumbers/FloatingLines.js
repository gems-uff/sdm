
private var isShowing : boolean = false;
var ptsPrefab: Transform; // drag the prefab to this variable in Inspector
var v : Vector3;
var x : float;
var y : float;
private var fontSize : int = 15;

function showFloatText1(modifier : String, number : String, fontColor : String, texto : String)
{
	if ( !isShowing)
	{
		x = v.x;
		y = v.y;
    	var gui: Transform = Instantiate(ptsPrefab,Vector3(x - 0.05,y,0),Quaternion.identity);
    	
		isShowing = true;
		
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

		isShowing = false;
		
		
	}
}

function showFloatText2(modifier : String, number : String, fontColor : String, texto : String)
{
	if ( !isShowing)
	{
		x = v.x;
		y = v.y;
    	var gui: Transform = Instantiate(ptsPrefab,Vector3(x - 0.05,y + 0.03,0),Quaternion.identity);
    	
		isShowing = true;
		
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

		isShowing = false;
		
		
	}
}

function showFloatText3(modifier : String, number : String, fontColor : String, texto : String)
{
	if ( !isShowing)
	{
		x = v.x;
		y = v.y;
    	var gui: Transform = Instantiate(ptsPrefab,Vector3(x - 0.05,y - 0.03,0),Quaternion.identity);
    	
		isShowing = true;
		
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

		isShowing = false;
		
		
	}
}

function showFloatText4(modifier : String, number : String, fontColor : String, texto : String)
{
	if ( !isShowing)
	{
		x = v.x;
		y = v.y;
    	var gui: Transform = Instantiate(ptsPrefab,Vector3(x - 0.05,y - 0.05,0),Quaternion.identity);
    	
		isShowing = true;
		
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

		isShowing = false;
		
		
	}
}
function Start()
{
	v = Camera.main.WorldToViewportPoint(transform.position);
}
/*
private var isShowing : boolean = false;

function Start()
{
	guiText.text = "";
	v = Camera.main.WorldToViewportPoint(transform.position);
}

function showFloatText(modifier : String, number : String, fontColor : String, texto : String)
{
	if ( !isShowing)
	{
		isShowing = true;
		guiText.pixelOffset.y = 0;
		if (fontColor == "red")
			guiText.material.color = Color.red;
		else
			if(fontColor == "blue")
				guiText.material.color = Color.blue;
			else
				if(fontColor == "green")
					guiText.material.color = Color.green;
				else
					guiText.material.color = Color.yellow;
			
		guiText.fontSize = 18;
		guiText.fontStyle =  FontStyle.Bold;
		guiText.text = modifier + number + texto;
		
		for( var i= 0; i < 50; i++)
		{
			guiText.pixelOffset.y += 0.5;
			yield WaitForSeconds(0.01);
		}
		guiText.text = "";
		isShowing = false;
	}
}
*/
/*
function showNewBugs(number : float)
{
	guiText.pixelOffset.y = 0;
	guiText.material.color = Color.red;
	guiText.fontSize = 18;
	guiText.fontStyle =  FontStyle.Bold;
	number = parseInt(number);
	guiText.text = "+"+number +" Bugs";
	
	for( var i= 0; i < 50; i++)
	{
		guiText.pixelOffset.y += 0.5;
		yield WaitForSeconds(0.01);
	}
	guiText.text = "";
}
*/
