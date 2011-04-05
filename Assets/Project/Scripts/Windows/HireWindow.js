
private var contratacao;
public var timer : GameTime;
public var funcWindow : FuncWindow;
public var hireFuncionario : HireFuncionario;
public var jogador : PlayerStats;
//Candidatos
public var newEmployee01 : Funcionario;
public var newEmployee02 : Funcionario;
public var newEmployee03 : Funcionario;
public var newEmployee04 : Funcionario;
public var newEmployee05 : Funcionario;
public var newEmployee06 : Funcionario;
public var newEmployee07 : Funcionario;
public var newEmployee08 : Funcionario;
//Equipe
public var employee01 : Funcionario;
public var employee02 : Funcionario;
public var employee03 : Funcionario;
public var employee04 : Funcionario;
public var employee05 : Funcionario;
public var employee06 : Funcionario;
public var employee07 : Funcionario;
public var employee08 : Funcionario;

private var candidate01 : boolean = false;
private var candidate02 : boolean = false;
private var candidate03 : boolean = false;
private var candidate04 : boolean = false;
private var candidate05 : boolean = false;
private var candidate06 : boolean = false;
private var candidate07 : boolean = false;
private var candidate08 : boolean = false;
private var selected : boolean = false;
private var slot01 : boolean = false;
private var slot02 : boolean = false;
private var slot03 : boolean = false;
private var slot04 : boolean = false;
private var slot05 : boolean = false;
private var slot06 : boolean = false;
private var slot07 : boolean = false;
private var slot08 : boolean = false;

public var priceGuiStyle : GUIStyle;

private var selectedSlot : boolean = false;
private var showWindow : boolean = false;
private var showInsuficientMoneyWindow : boolean = false;
private var windowRect : Rect = Rect (300,125,300,412);

function GetShowWindow(){
	return showWindow;
}

function SetShowWindow(){
	showWindow = true;
}
function ResetItems(){
	candidate01 = false;
	candidate02 = false;
	candidate03 = false;
	candidate04 = false;
	candidate05 = false;
	candidate06 = false;
	candidate07 = false;
	candidate08 = false;
	slot01 = false;
	slot02 = false;
	slot03 = false;
	slot04 = false;
	slot05 = false;
	slot06 = false;
	slot07 = false;
	slot08 = false;
	selected = false;
	selectedSlot = false;
}

function HireEmployee(){
	var inPlaceOf : Funcionario;
	var thisCandidate : Funcionario;

	//Where
	if(slot01 == true)
	{
		inPlaceOf = employee01;
	}
	if(slot02 == true)
	{
		inPlaceOf = employee02;
	}
	if(slot03 == true)
	{
		inPlaceOf = employee03;
	}
	if(slot04 == true)
	{
		inPlaceOf = employee04;
	}
	if(slot05 == true)
	{
		inPlaceOf = employee05;
	}
	if(slot06 == true)
	{
		inPlaceOf = employee06;
	}
	if(slot07 == true)
	{
		inPlaceOf = employee07;
	}
	if(slot08 == true)
	{
		inPlaceOf = employee08;
	}
	//Who
	if(candidate01 == true)
	{
		thisCandidate = newEmployee01;
	}
	if(candidate02 == true)
	{
		thisCandidate = newEmployee02;
	}
	if(candidate03 == true)
	{
		thisCandidate = newEmployee03;
	}
	if(candidate04 == true)
	{
		thisCandidate = newEmployee04;
	}
	if(candidate05 == true)
	{
		thisCandidate = newEmployee05;
	}
	if(candidate06 == true)
	{
		thisCandidate = newEmployee06;
	}
	if(candidate07 == true)
	{
		thisCandidate = newEmployee07;
	}
	if(candidate08 == true)
	{
		thisCandidate = newEmployee08;
	}
	if ( jogador.GetSaldo() >= (thisCandidate.GetSalario() + contratacao))
		hireFuncionario.ContratarFuncionario(thisCandidate, inPlaceOf);
	else
		showInsuficientMoneyWindow = true;
}

function ShowInsuficientMoneyWindow()
{
	GUI.BeginGroup (Rect (300,300,400,90));
	GUI.Box (Rect (00,00,400,40), "Not enough money to hire.");
	if (GUI.Button (Rect (00,40,400,30), "Close")) 
	{
		showInsuficientMoneyWindow = false;
	}
	GUI.EndGroup ();
}

function ShowEmployees(windowID : int){
	timer.PauseGame();
	GUI.Box (Rect (02,22,98,25), "Canditates: ");
	GUI.Box (Rect (100,22,98,25), "Hiring Price: ");
	GUI.Box (Rect (198,22,98,25), "In place of: ");
	GUI.BeginGroup (Rect (02,25,300,486));
	
	//Lado esquerdo: Candidatos
	candidate01 = GUI.Toggle (Rect (10, 040, 80, 30), candidate01, newEmployee01.GetNome());
	GUI.Box (Rect (100,040,80,30), "$" + (newEmployee01.GetSalario() + contratacao), priceGuiStyle);
	if(candidate01 == true)
	{
		candidate02 = false;
		candidate03 = false;
		candidate04 = false;
		candidate05 = false;
		candidate06 = false;
		candidate07 = false;
		candidate08 = false;
		selected = true;
		funcWindow.SetJanelatributo(newEmployee01);
	}
	candidate02 = GUI.Toggle (Rect (10, 080, 80, 30), candidate02, newEmployee02.GetNome());
	GUI.Box (Rect (100,080,80,30), "$" + (newEmployee02.GetSalario() + contratacao), priceGuiStyle);
	if(candidate02 == true)
	{
		candidate01 = false;
		candidate03 = false;
		candidate04 = false;
		candidate05 = false;
		candidate06 = false;
		candidate07 = false;
		candidate08 = false;
		selected = true;
		funcWindow.SetJanelatributo(newEmployee02);
	}
	candidate03 = GUI.Toggle (Rect (10, 120, 80, 30), candidate03, newEmployee03.GetNome());
	GUI.Box (Rect (100,120,80,30), "$" + (newEmployee03.GetSalario() + contratacao), priceGuiStyle);
	if(candidate03 == true)
	{
		candidate02 = false;
		candidate01 = false;
		candidate04 = false;
		candidate05 = false;
		candidate06 = false;
		candidate07 = false;
		candidate08 = false;
		selected = true;
		funcWindow.SetJanelatributo(newEmployee03);
	}
	candidate04 = GUI.Toggle (Rect (10, 160, 80, 30), candidate04, newEmployee04.GetNome());
	GUI.Box (Rect (100,160,80,30), "$" + (newEmployee04.GetSalario() + contratacao), priceGuiStyle);
	if(candidate04 == true)
	{
		candidate02 = false;
		candidate03 = false;
		candidate01 = false;
		candidate05 = false;
		candidate06 = false;
		candidate07 = false;
		candidate08 = false;
		selected = true;
		funcWindow.SetJanelatributo(newEmployee04);
	}
	candidate05 = GUI.Toggle (Rect (10, 200, 80, 30), candidate05, newEmployee05.GetNome());
	GUI.Box (Rect (100,200,80,30), "$" + (newEmployee05.GetSalario() + contratacao), priceGuiStyle);
	if(candidate05 == true)
	{
		candidate02 = false;
		candidate03 = false;
		candidate04 = false;
		candidate01 = false;
		candidate06 = false;
		candidate07 = false;
		candidate08 = false;
		selected = true;
		funcWindow.SetJanelatributo(newEmployee05);
	}
	candidate06 = GUI.Toggle (Rect (10, 240, 80, 30), candidate06, newEmployee06.GetNome());
	GUI.Box (Rect (100,240,80,30), "$" + (newEmployee06.GetSalario() + contratacao), priceGuiStyle);
	if(candidate06 == true)
	{
		candidate02 = false;
		candidate03 = false;
		candidate04 = false;
		candidate05 = false;
		candidate01 = false;
		candidate07 = false;
		candidate08 = false;
		selected = true;
		funcWindow.SetJanelatributo(newEmployee06);
	}
	candidate07 = GUI.Toggle (Rect (10, 280, 80, 30), candidate07, newEmployee07.GetNome());
	GUI.Box (Rect (100,280,80,30), "$" + (newEmployee07.GetSalario() + contratacao), priceGuiStyle);
	if(candidate07 == true)
	{
		candidate02 = false;
		candidate03 = false;
		candidate04 = false;
		candidate05 = false;
		candidate06 = false;
		candidate01 = false;
		candidate08 = false;
		selected = true;
		funcWindow.SetJanelatributo(newEmployee07);
	}
	candidate08 = GUI.Toggle (Rect (10, 320, 80, 30), candidate08, newEmployee08.GetNome());
	GUI.Box (Rect (100,320,80,30), "$" + (newEmployee08.GetSalario() + contratacao), priceGuiStyle);
	if(candidate08 == true)
	{
		candidate02 = false;
		candidate03 = false;
		candidate04 = false;
		candidate05 = false;
		candidate06 = false;
		candidate07 = false;
		candidate01 = false;
		selected = true;
		funcWindow.SetJanelatributo(newEmployee08);
	}
	
//Lado direito: Posicao
slot01 = GUI.Toggle (Rect (198, 040, 80, 30), slot01, employee01.GetNome());
	if(slot01 == true)
	{
		slot02 = false;
		slot03 = false;
		slot04 = false;
		slot05 = false;
		slot06 = false;
		slot07 = false;
		slot08 = false;
		selectedSlot = true;
		//projectW.SetShowWindow(newproject01);
	}
	slot02 = GUI.Toggle (Rect (198, 080, 80, 30), slot02, employee02.GetNome());
	if(slot02 == true)
	{
		slot01 = false;
		slot03 = false;
		slot04 = false;
		slot05 = false;
		slot06 = false;
		slot07 = false;
		slot08 = false;
		selectedSlot= true;
		//projectW.SetShowWindow(newproject02);
	}
	slot03 = GUI.Toggle (Rect (198, 120, 80, 30), slot03, employee03.GetNome());
	if(slot03 == true)
	{
		slot02 = false;
		slot01 = false;
		slot04 = false;
		slot05 = false;
		slot06 = false;
		slot07 = false;
		slot08 = false;
		selectedSlot = true;
		//projectW.SetShowWindow(newproject03);
	}
	slot04 = GUI.Toggle (Rect (198, 160, 80, 30), slot04, employee04.GetNome());
	if(slot04 == true)
	{
		slot02 = false;
		slot03 = false;
		slot01 = false;
		slot05 = false;
		slot06 = false;
		slot07 = false;
		slot08 = false;
		selectedSlot = true;
		//projectW.SetShowWindow(newproject04);
	}
	slot05 = GUI.Toggle (Rect (198, 200, 80, 30), slot05, employee05.GetNome());
	if(slot05 == true)
	{
		slot02 = false;
		slot03 = false;
		slot04 = false;
		slot01 = false;
		slot06 = false;
		slot07 = false;
		slot08 = false;
		selectedSlot = true;
		//projectW.SetShowWindow(newproject05);
	}
	slot06 = GUI.Toggle (Rect (198, 240, 80, 30), slot06, employee06.GetNome());
	if(slot06 == true)
	{
		slot02 = false;
		slot03 = false;
		slot04 = false;
		slot05 = false;
		slot01 = false;
		slot07 = false;
		slot08 = false;
		selectedSlot = true;
		//projectW.SetShowWindow(newproject06);
	}
	slot07 = GUI.Toggle (Rect (198, 280, 80, 30), slot07, employee07.GetNome());
	if(slot07 == true)
	{
		slot02 = false;
		slot03 = false;
		slot04 = false;
		slot05 = false;
		slot06 = false;
		slot01 = false;
		slot08 = false;
		selectedSlot = true;
		//projectW.SetShowWindow(newproject07);
	}
	slot08 = GUI.Toggle (Rect (198, 320, 80, 30), slot08, employee08.GetNome());
	if(slot08 == true)
	{
		slot02 = false;
		slot03 = false;
		slot04 = false;
		slot05 = false;
		slot06 = false;
		slot07 = false;
		slot01 = false;
		selectedSlot = true;
		//projectW.SetShowWindow(newproject08);
	}
	if ( !candidate01 && !candidate02 && !candidate03 && !candidate04 && !candidate05 && !candidate06 && !candidate07 && !candidate08 )
		selected = false;
	if ( !slot01 && !slot02 && !slot03 && !slot04 && !slot05 && !slot06 && !slot07 && !slot08 )
		selectedSlot = false;
	//if ( selected == false || selectedSlot == false)
	
	if ( selected == true && selectedSlot == true)
	{
		if (GUI.Button (Rect (02,360,144,25), "OK")) {
			showWindow  = false;
			funcWindow.DisableShowWindow();
			HireEmployee();
			ResetItems();
		}	
	}
	if (GUI.Button (Rect (150,360,144,25), "Cancel")) {
		showWindow  = false;
		funcWindow.DisableShowWindow();
		ResetItems();
	}	
	GUI.EndGroup ();
}
function OnGUI () {
	GUI.backgroundColor = Color.yellow;
	GUI.backgroundColor = Color.yellow;
	GUI.contentColor = Color.green;
	if(showWindow)
		windowRect = GUI.Window (20, windowRect, ShowEmployees, ("Possible candidates") );
	if (showInsuficientMoneyWindow)
		ShowInsuficientMoneyWindow();
}
function Awake () {
	contratacao = hireFuncionario.GetHire_Price();
}