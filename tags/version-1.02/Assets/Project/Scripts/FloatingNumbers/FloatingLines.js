

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
