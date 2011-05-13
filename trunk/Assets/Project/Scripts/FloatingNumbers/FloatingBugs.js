

private var isShowing : boolean = false;

function showNewBugs(number : float)
{
	if ( !isShowing)
	{
		isShowing = true;
		guiText.pixelOffset.y = 0;
		guiText.material.color = Color.red;
		guiText.fontSize = 18;
		guiText.fontStyle =  FontStyle.Bold;
		guiText.text = "+"+number +" Bugs";
		
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