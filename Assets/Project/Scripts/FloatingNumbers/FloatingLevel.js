
private var isShowing : boolean = false;

function showFloatText(levels : int)
{
	var showTimes : int = levels;
	while ( showTimes > 0)
	{
		if ( !isShowing)
		{
			isShowing = true;
			guiText.pixelOffset.y = 0;
			guiText.material.color = Color.green;
			guiText.fontSize = 18;
			guiText.fontStyle =  FontStyle.Bold;
			guiText.text = "Level Up";
			
			for( var i= 0; i < 50; i++)
			{
				guiText.pixelOffset.y += 0.5;
				yield WaitForSeconds(0.01);
			}
			guiText.text = "";
			isShowing = false;
			showTimes = showTimes -1;
		}
	}
}

function showFloatTextExperience(exp : int)
{
	if ( !isShowing)
	{
		isShowing = true;
		guiText.pixelOffset.y = 0;
		guiText.material.color = Color.green;
		guiText.fontSize = 18;
		guiText.fontStyle =  FontStyle.Bold;
		guiText.text = "+ " + exp + " experience";
		
		for( var i= 0; i < 50; i++)
		{
			guiText.pixelOffset.y += 0.5;
			yield WaitForSeconds(0.01);
		}
		guiText.text = "";
		isShowing = false;
	}
}

function showFloatTextCompanyLevelUp()
{
	if ( !isShowing)
	{
		isShowing = true;
		guiText.pixelOffset.y = 0;
		guiText.material.color = Color.green;
		guiText.fontSize = 18;
		guiText.fontStyle =  FontStyle.Bold;
		guiText.text = "Congratulations! Your Company just increased a level";
		
		for( var i= 0; i < 50; i++)
		{
			guiText.pixelOffset.y += 0.5;
			yield WaitForSeconds(0.01);
		}
		guiText.text = "";
		isShowing = false;
	}
}

function showFloatTextCompanyDeLevel()
{
	if ( !isShowing)
	{
		isShowing = true;
		guiText.pixelOffset.y = 0;
		guiText.material.color = Color.red;
		guiText.fontSize = 18;
		guiText.fontStyle =  FontStyle.Bold;
		guiText.text = "Your Company just lost a level";
		
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