
private var isShowing : boolean = false;
var ptsPrefab: Transform; // drag the prefab to this variable in Inspector
var v : Vector3;
var x : float;
var y : float;

function showFloatText(levels : int)
{
	var showTimes : int = levels;
	while ( showTimes > 0)
	{
		if ( !isShowing)
		{
			x = v.x;
			y = v.y;
	    	var gui: Transform = Instantiate(ptsPrefab,Vector3(x - 0.05,y + 0.09,0),Quaternion.identity);
			isShowing = true;
			gui.guiText.pixelOffset.y = 0;
			gui.guiText.material.color = Color.green;
			gui.guiText.fontSize = 12;
			gui.guiText.fontStyle =  FontStyle.Bold;
			gui.guiText.text = "Level Up";
			isShowing = false;
			showTimes = showTimes -1;
		}
	}
}

function showFloatTextExperience(exp : int)
{
	if ( !isShowing)
	{
		x = v.x;
		y = v.y;
    	var gui: Transform = Instantiate(ptsPrefab,Vector3(x - 0.05,y + 0.07,0),Quaternion.identity);
    	
		isShowing = true;
		gui.guiText.pixelOffset.y = 0;
		gui.guiText.material.color = Color.green;
		gui.guiText.fontSize = 12;
		gui.guiText.fontStyle =  FontStyle.Bold;
		gui.guiText.text = "+ " + exp + " experience";
		
		isShowing = false;
	}
}

function showFloatTextCompanyLevelUp()
{
	if ( !isShowing)
	{
		x = v.x;
		y = v.y;
    	var gui: Transform = Instantiate(ptsPrefab,Vector3(x - 0.05, y,0),Quaternion.identity);
    	
		isShowing = true;
		gui.guiText.pixelOffset.y = 0;
		gui.guiText.material.color = Color.green;
		gui.guiText.fontSize = 12;
		gui.guiText.fontStyle =  FontStyle.Bold;
		gui.guiText.text = "Congratulations! Your Company just increased a level";
		
		isShowing = false;
	}
}

function showFloatTextCompanyDeLevel()
{
	if ( !isShowing)
	{
		x = v.x;
		y = v.y;
    	var gui: Transform = Instantiate(ptsPrefab,Vector3(x - 0.05, y,0),Quaternion.identity);
    	
		isShowing = true;
		gui.guiText.pixelOffset.y = 0;
		gui.guiText.material.color = Color.red;
		gui.guiText.fontSize = 12;
		gui.guiText.fontStyle =  FontStyle.Bold;
		gui.guiText.text = "Your Company just lost a level";
		
		isShowing = false;
	}
}

function Start()
{
	v = Camera.main.WorldToViewportPoint(transform.position);
}