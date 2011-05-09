public var trainingBar : Transform;
public var MaxBar : float = 0.1;
public var days : float = 0;
public var m_Camera : Camera;
private var showBar : boolean = false;
private var MaxDays : int = 14;

function IncrementDays(){
	if (showBar)
		days = days + 1;
}
function ShowTrainingBar(time_training : int){
	MaxDays = time_training;
	showBar = true;
	GetComponentInChildren(MeshRenderer).enabled = true;
}
function HideTrainingBar(){
	if(days == MaxDays)
	{
		showBar = false;
		GetComponentInChildren(MeshRenderer).enabled = false;
		days = 0;
	}
}
function Progress_Bar(){
	// --- Change Size Of Bar --- \\
    transform.localScale.x = (MaxBar) * (days/MaxDays);

    // --- Change Colour Of Bar --- \\
    if(transform.localScale.x > 0.08)
    {
        transform.renderer.material.color = Color.green;
    }
    if(transform.localScale.x <= 0.08)
    {
        transform.renderer.material.color = Color.blue;
    }
    if(transform.localScale.x <= 0.04)
    {
        transform.renderer.material.color = Color.red;
    }
}
function Update()
{
	Progress_Bar();
	HideTrainingBar();
}