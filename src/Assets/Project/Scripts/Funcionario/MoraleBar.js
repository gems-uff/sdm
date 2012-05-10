
public var moraleBar : Transform;
public var MaxBar : float = 0.1;
public var m_Camera : Camera;
public var func : Funcionario;
public var stringNames : StringNames;
private var morale : float;

function Morale_Bar(){
	morale = func.GetMorale();
	if(func.GetNome() == stringNames.fired)
	{
		GetComponentInChildren(MeshRenderer).enabled = false;
	}
	else
		GetComponentInChildren(MeshRenderer).enabled = true;
	// --- Change Size Of Bar --- \\
    transform.localScale.x = (MaxBar) * (morale / 100);

    // --- Change Colour Of Bar --- \\
    if(transform.localScale.x > 0.08)
    {
        transform.renderer.material.color = Color.green;
    }
    if(transform.localScale.x <= 0.08)
    {
        transform.renderer.material.color = Color.cyan;
    }
    if(transform.localScale.x <= 0.04)
    {
        transform.renderer.material.color = Color.black;
    }
}

function Update()
{
	//Morale_Bar();
}

function Start()
{
	Morale_Bar();
}