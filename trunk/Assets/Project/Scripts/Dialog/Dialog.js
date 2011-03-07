
public var dialogGuiStyle : GUIStyle;
public var stringNames : StringNames;

public var menuAtr : FuncWindow;
public var menuEsp : EspWindow;
public var menuPapel : PapelWindow;
public var menuNegotiation : NegotiationWindow;
public var menuPrototype : PrototypeWindow;
public var menuHire : HireWindow;
public var timer : GameTime;
public var workHours : WorkingHoursWindow;
public var dialogLock : BlockDialog;

public var endOnExit : boolean = true;

private var func : Funcionario;
private var treino : Treinamento;
private var fire : NewFuncionario;
private var dialogEnable : boolean = false;
private var insideCollider : boolean = false;
//Morale booleans
private var dialogQuitEnable : boolean = false;
private var dialogEnableBadDialog : boolean = false;
private var dialogControl : boolean = false;

function SetDialogQuitEnable(){
	dialogQuitEnable = true;
}
function SetDialogControl(){
	dialogControl = false;
}
function SetDialogBadDialog(){
	dialogEnableBadDialog = true;
}
//--------------------------------------------Update-----------------------------------------------------------

function Update(){
	if (Input.GetKeyDown("space") && insideCollider == true && !dialogLock.GetLock()){
			dialogEnable = true;
		}
}
//--------------------------------------------OnTriggerEnter-----------------------------------------------------------

function OnTriggerEnter( collider1 : Collider )
{
    if ( collider1.name == "Player" && func.GetNome() != stringNames.fired )
	{
		insideCollider = true;
	}
}

//--------------------------------------------OnTriggerExit-----------------------------------------------------------

function OnTriggerExit( collider1 : Collider )
{
    if ( collider1.name == "Player" && endOnExit)
	{
		insideCollider = false;
		dialogEnable = false;
	}
}

//--------------------------------------------Dialog_Funcionario-----------------------------------------------------------

function Dialog_Funcionario (){
	GUI.BeginGroup(Rect (150,Screen.height - 190,1000,1000));
	if (dialogEnable == true)
	{
		timer.PauseGame();
		GUI.Box (Rect (00,00,120,25), func.GetNome() + " :");
		GUI.Box (Rect (00,25,600,150), "Hello boss. What's up ?", dialogGuiStyle);
		if (GUI.Button (Rect (600,25, 130, 25), "Profile")) {
				menuAtr.SetJanelatributo(func);
				dialogEnable = false;
		}
		if (GUI.Button (Rect (600,50, 130, 25), "Train")) {
				menuEsp.Especializar(func, treino);
				dialogEnable = false;
		}
		if (GUI.Button (Rect (600,75, 130, 25), "Change Task")) {
				menuPapel.MudarPapel(func, treino);
				dialogEnable = false;
		}
		if (GUI.Button (Rect (600,100, 130, 25), "Working Hours")) {
				workHours.ChangeWorkHours(func);
				dialogEnable = false;
		}
		//Vazio
		GUI.Box (Rect (600,125, 130, 25), "");
		//Se arquiteto
		if(func.GetPapel() == stringNames.papelArquiteto && menuPrototype.GetIsLocked() == false)
			if (GUI.Button (Rect (600,125, 130, 25), "Prototype")) {
					menuPrototype.SetShowWindow(func);
					dialogEnable = false;
			}
		//Se gerente
		if(func.GetPapel() == stringNames.papelGerente)
			if (GUI.Button (Rect (600,125, 130, 25), "Hire")) {
					menuHire.SetShowWindow();
					dialogEnable = false;
			}
		//se Marketing
		if(func.GetPapel() == stringNames.papelMarketing && menuNegotiation.GetLockNegotiation() == false)
			if (GUI.Button (Rect (600,125, 130, 25), "Negotiation")) {
					menuNegotiation.SetShowWindow(func);
					dialogEnable = false;
			}
		if (GUI.Button (Rect (600,150, 130, 25), "End")) {
				dialogEnable = false;
		}
	}
	GUI.EndGroup ();
}

//--------------------------------------------Awake-----------------------------------------------------------

function BadMoraleDialog(){
	GUI.BeginGroup(Rect (150,Screen.height - 190,1000,1000));
	if (dialogEnableBadDialog == true && dialogControl == false)
	{
		dialogLock.SetLock(true);
		timer.PauseGame();
		GUI.Box (Rect (00,00,120,25), func.GetNome() + " :");
		GUI.Box (Rect (00,25,600,150), "Boss, this is too much for me, I'm in need of a break.", dialogGuiStyle);
		if (GUI.Button (Rect (600,25, 130, 25), "End")) {
				dialogEnableBadDialog = false;
				dialogControl = true;
				dialogLock.SetLock(false);
		}
	}
	GUI.EndGroup ();
}
function QuitDialog(){
	GUI.BeginGroup(Rect (150,Screen.height - 190,1000,1000));
	if (dialogQuitEnable == true)
	{
		dialogLock.SetLock(true);
		timer.PauseGame();
		GUI.Box (Rect (00,00,120,25), func.GetNome() + " :");
		GUI.Box (Rect (00,25,600,150), "Boss, i can't take this anymore, im quitting !", dialogGuiStyle);
		if (GUI.Button (Rect (600,25, 130, 25), "End")) {
				fire.FireFuncionario(func);
				dialogQuitEnable = false;
				dialogLock.SetLock(false);
		}
	}
	GUI.EndGroup ();
}

function Awake() 
{ 
	func = GetComponentInChildren(Funcionario);
	treino = GetComponentInChildren(Treinamento);
	fire = GetComponentInChildren(NewFuncionario);

} 

//--------------------------------------------OnGUI-----------------------------------------------------------

function OnGUI (){
	Dialog_Funcionario();
	BadMoraleDialog();
	QuitDialog();
}


/*

//Template de dialogos

if( msgDialog1 == true)
		{
			GUI.Box (Rect (00,25,600,150), "DIALOG", dialogGuiStyle);
			if (GUI.Button (Rect (600,25, 130, 25), "CONTINUE")) {
					CONTINUE = false;
					Option2 = true;
			}
			if (GUI.Button (Rect (600,50, 130, 25), "Option2")) {
					Option2 = false;
					msgDialog1 = false;
			}
			if (GUI.Button (Rect (600,75, 130, 25), "Option3")) {
					Option3 = false;
					msgDialog1 = true;
			}
			if (GUI.Button (Rect (600,100, 130, 25), "Option4")) {
					Option4 = false;
					dialogEnable = false;
			}
			if (GUI.Button (Rect (600,125, 130, 25), "Option5")) {
					Option5 = false;
					msgDialog1 = true;
			}
			if (GUI.Button (Rect (600,150, 130, 25), "END")) {
					END = false;
					dialogEnable = false;
			}
		}
*/