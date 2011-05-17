

private var isShowing : boolean = false;

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
function Start()
{
	guiText.text = "";
}