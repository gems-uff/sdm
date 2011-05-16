
public var moraleBar : Transform;
public var MaxBar : float = 0.1;
public var m_Camera : Camera;
private var showBar : boolean = false;
public var func : Funcionario;
public var stringNames : StringNames;

function Morale_Bar(){
	if(func.GetNome() == stringNames.fired)
	{
		GetComponentInChildren(MeshRenderer).enabled = false;
	}
	else
		GetComponentInChildren(MeshRenderer).enabled = true;
	// --- Change Size Of Bar --- \\
    transform.localScale.x = (MaxBar) * (func.GetMorale() / 100);

    // --- Change Colour Of Bar --- \\
    if(transform.localScale.x > 0.08)
    {
        transform.renderer.material.color = Color.cyan;
    }
    if(transform.localScale.x <= 0.08)
    {
        transform.renderer.material.color = Color.yellow;
    }
    if(transform.localScale.x <= 0.04)
    {
        transform.renderer.material.color = Color.grey;
    }
}

function Update()
{
	Morale_Bar();
}