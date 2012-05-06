
public var staminaBar : Transform;
public var MaxBar : float = 0.1;
public var m_Camera : Camera;
public var func : Funcionario;
public var stringNames : StringNames;
private var stamina : float;

function Stamina_Bar(){
	stamina = func.GetStamina();
	if(func.GetNome() == stringNames.fired)
	{
		GetComponentInChildren(MeshRenderer).enabled = false;
	}
	else
		GetComponentInChildren(MeshRenderer).enabled = true;
	// --- Change Size Of Bar --- \\
    transform.localScale.x = (MaxBar) * (stamina / 100);

    // --- Change Colour Of Bar --- \\
    if(transform.localScale.x > 0.08)
    {
        transform.renderer.material.color = Color.yellow;
    }
    if(transform.localScale.x <= 0.08)
    {
        transform.renderer.material.color = Color(0.545, 0.658, 0.074);	//Brown
    }
    if(transform.localScale.x <= 0.04)
    {
        transform.renderer.material.color = Color.grey;
    }
}

function Update()
{
	//Stamina_Bar();
}

function Start()
{
	Stamina_Bar();
}