public var windowController : WindowController;
private var contratacao;
public var stringNames : StringNames;
public var timer : GameTime;
public var funcWindow : FuncWindow;
public var hireFuncionario : HireFuncionario;
public var jogador : PlayerStats;
public var equipe : Equipe;
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
private var showWindowManagerHiring : boolean = false;
private var showInsuficientMoneyWindow : boolean = false;
//private var windowRect : Rect = Rect (300,125,300,412);
private var windowRect2 : Rect = Rect (400,125,300,200);

private var manager : Funcionario;

function GetShowWindow(){
	return showWindow;
}

//function SetShowWindow(){
//	showWindow = true;
//}
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
	{
		HireAction(thisCandidate);
		hireFuncionario.ContratarFuncionario(thisCandidate, inPlaceOf);
	}
	else
		//showInsuficientMoneyWindow = true;
		windowController.ShowInsufficientHireWindow();
}
function HireAction(thisCandidate : Funcionario)
{
	var action : ActionNode = new ActionNode();
	var cost : int = thisCandidate.GetSalario() + contratacao;

	//var log : BehaviorPlanner = func = GetComponentInChildren(Funcionario);
	action.NewActionHire("Hired_Employee: " + thisCandidate.GetNome(), "Hired new employee: " + thisCandidate.GetNome(), "Hired new employee: " + thisCandidate.GetNome(), manager, cost, timer, "Hired: " + thisCandidate.GetNome());
	action.projectStat = manager.behavior.Log.GetProjectStat();
	manager.behavior.AddAction(action);
}

function ShowInsuficientMoneyWindow()
{
	GUI.BeginGroup (Rect (300,300,400,90));
	GUI.Box (Rect (00,00,400,40), "Not enough money to hire.");
	if (GUI.Button (Rect (00,40,400,30), "Close")) 
	{
		//showInsuficientMoneyWindow = false;
		windowController.DisableInsufficientHireWindow();
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
		funcWindow.SetJanelatributo(newEmployee01, false, newEmployee01.report);
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
		funcWindow.SetJanelatributo(newEmployee02, false, newEmployee02.report);
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
		funcWindow.SetJanelatributo(newEmployee03, false, newEmployee03.report);
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
		funcWindow.SetJanelatributo(newEmployee04, false, newEmployee04.report);
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
		funcWindow.SetJanelatributo(newEmployee05, false, newEmployee05.report);
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
		funcWindow.SetJanelatributo(newEmployee06, false, newEmployee06.report);
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
		funcWindow.SetJanelatributo(newEmployee07, false, newEmployee07.report);
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
		funcWindow.SetJanelatributo(newEmployee08, false, newEmployee08.report);
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
	}
	if ( !candidate01 && !candidate02 && !candidate03 && !candidate04 && !candidate05 && !candidate06 && !candidate07 && !candidate08 )
		selected = false;
	if ( !slot01 && !slot02 && !slot03 && !slot04 && !slot05 && !slot06 && !slot07 && !slot08 )
		selectedSlot = false;
	
	if ( selected == true && selectedSlot == true)
	{
		if (GUI.Button (Rect (02,360,144,25), "OK")) {
			//showWindow  = false;
			windowController.DisableHireWindow();
			funcWindow.DisableShowWindow();
			HireEmployee();
			ResetItems();
		}	
	}
	if (GUI.Button (Rect (150,360,144,25), "Cancel")) {
		//showWindow  = false;
		windowController.DisableHireWindow();
		funcWindow.DisableShowWindow();
		ResetItems();
	}	
	GUI.EndGroup ();
	GUI.DragWindow();
}

//--------------------------------------------------------------
//Manager Hiring Functions
//--------------------------------------------------------------

function setManager(manager : Funcionario)
{
	this.manager = manager;
}
function ManagerHiring(role : String)
{
	var first : int;
	var second : int;
	var third : int;
	
	var slot : int;
	var i : int = 0;
	var func = new Array();
	func[0] = newEmployee01;
	func[1] = newEmployee02;
	func[2] = newEmployee03;
	func[3] = newEmployee04;
	func[4] = newEmployee05;
	func[5] = newEmployee06;
	func[6] = newEmployee07;
	func[7] = newEmployee08;
	var staff = new Array();
	staff[0] = employee01;
	staff[1] = employee02;
	staff[2] = employee03;
	staff[3] = employee04;
	staff[4] = employee05;
	staff[5] = employee06;
	staff[6] = employee07;
	staff[7] = employee08;
	
	first = 0;
	second = 0;
	third = 0;
	
	slot = equipe.VacantSlot();
	//No available slots
	if(slot == -1)
	{
		//Show window telling that staff is full
	}
	else
	{
		if(role == stringNames.papelAnalista)
		{
			//Hire analyst
			for(i = 1; i < 8; i++)
			{
				if( func[i].GetAnalista() > func[first].GetAnalista())
				{
					third = second;
					second = first;
					first = i;
				}
				else
				{
					if( func[i].GetAnalista() > func[second].GetAnalista())
					{
						third = second;
						second = i;
					}
					else
					{
						if( func[i].GetAnalista() > func[third].GetAnalista())
						{
							third = i;
						}//if third
					}//if second
				}//if first
			}//for
		}
		if(role == stringNames.papelArquiteto)
		{
			//Hire architect
			for(i = 1; i < 8; i++)
			{
				if( func[i].GetArquiteto() > func[first].GetArquiteto())
				{
					third = second;
					second = first;
					first = i;
				}
				else
				{
					if( func[i].GetArquiteto() > func[second].GetArquiteto())
					{
						third = second;
						second = i;
					}
					else
					{
						if( func[i].GetArquiteto() > func[third].GetArquiteto())
						{
							third = i;
						}//if third
					}//if second
				}//if first
			}//for
		}
		if(role == stringNames.papelProg)
		{
			//Hire programmer
			for(i = 1; i < 8; i++)
			{
				if( func[i].GetProgramador() > func[first].GetProgramador())
				{
					third = second;
					second = first;
					first = i;
				}
				else
				{
					if( func[i].GetProgramador() > func[second].GetProgramador())
					{
						third = second;
						second = i;
					}
					else
					{
						if( func[i].GetProgramador() > func[third].GetProgramador())
						{
							third = i;
						}//if third
					}//if second
				}//if first
			}//for
		}
		if(role == stringNames.papelTester)
		{
			//Hire tester
			for(i = 1; i < 8; i++)
			{
				if( func[i].GetTester() > func[first].GetTester())
				{
					third = second;
					second = first;
					first = i;
				}
				else
				{
					if( func[i].GetTester() > func[second].GetTester())
					{
						third = second;
						second = i;
					}
					else
					{
						if( func[i].GetTester() > func[third].GetTester())
						{
							third = i;
						}//if third
					}//if second
				}//if first
			}//for
		}
		if(role == stringNames.papelMarketing)
		{
			//Hire marketing
			//slot = 6;
			for(i = 1; i < 8; i++)
			{
				if( func[i].GetMarketing() > func[first].GetMarketing())
				{
					third = second;
					second = first;
					first = i;
				}
				else
				{
					if( func[i].GetMarketing() > func[second].GetMarketing())
					{
						third = second;
						second = i;
					}
					else
					{
						if( func[i].GetMarketing() > func[third].GetMarketing())
						{
							third = i;
						}//if third
					}//if second
				}//if first
			}//for
		}
		//roll to decide which from the 3 the manager will hire
		var aux : int;
		aux = manager.GetGerente();
		var rolled : int = Random.Range (01, 100);
		var hired : Funcionario;
		
		if(rolled > aux)
		{//third
			hired = func[third];
			//hireFuncionario.ContratarFuncionario(func[third], staff[slot]);
		}
		else
		{//second
			if(rolled > aux * 0.4)
			{
				hired = func[second];
				//hireFuncionario.ContratarFuncionario(func[second], staff[slot]);
			}
			else
			{//first
				hired = func[first];
				//hireFuncionario.ContratarFuncionario(func[first], staff[slot]);
			}
		}
		
		if(hireFuncionario.CanHire(hired))
		{
			HireAction(hired);
			hireFuncionario.ContratarFuncionario(hired, staff[slot]);
			staff[slot].SetPapel(role);
		}
	}//end-else
	
}

function WindowManagerHiring(windowID : int){
	GUI.Box (Rect (02,20,296,25), "Hire role:");
	GUI.BeginGroup (Rect (02,45,300,200));
	if( equipe.VacantSlot() != -1)
	{
		if (GUI.Button (Rect (02,00,296,25), "Analyst")) {
			ManagerHiring(stringNames.papelAnalista);
			//showWindowManagerHiring = false;
			windowController.DisableManagerHireWindow();
		}
		if (GUI.Button (Rect (02,25,296,25), "Architect")) {
			ManagerHiring(stringNames.papelArquiteto);
			//showWindowManagerHiring = false;
			windowController.DisableManagerHireWindow();
		}
		if((equipe.GetHasMarketing() == false))
		{
			if (GUI.Button (Rect (02,50,296,25), "Marketing")) {
				ManagerHiring(stringNames.papelMarketing);
				equipe.SetHasMarketing(true);
				//showWindowManagerHiring = false;
				windowController.DisableManagerHireWindow();
			}
		}
		else
		{
			GUI.Box (Rect (02,50,296,25), "Marketing");
		}
		if (GUI.Button (Rect (02,75,296,25), "Programmer")) {
			ManagerHiring(stringNames.papelProg);
			//showWindowManagerHiring = false;
			windowController.DisableManagerHireWindow();
		}
		if (GUI.Button (Rect (02,100,296,25), "Tester")) {
			ManagerHiring(stringNames.papelTester);
			//showWindowManagerHiring = false;
			windowController.DisableManagerHireWindow();
		}
	}
	else
	{
		GUI.Box (Rect (02,00,296,25), "Full Staff");
		GUI.Box (Rect (02,25,296,25), "Need to fire someone before hiring");
	}
	if (GUI.Button (Rect (02,125,296,25), "Cancel")) 
	{
		//showWindowManagerHiring = false;
		windowController.DisableManagerHireWindow();
	}
	GUI.EndGroup ();
	GUI.DragWindow();
}

//function SetShowWindowMHiring(){
//	showWindowManagerHiring = true;
//}

function OnGUI () {
	//GUI.backgroundColor = Color.yellow;
	//GUI.contentColor = Color.green;
	//if(showWindow)
	//	windowRect = GUI.Window (20, windowRect, ShowEmployees, ("Possible candidates") );
	//if (showInsuficientMoneyWindow)
	//	ShowInsuficientMoneyWindow();
	//if(showWindowManagerHiring)
	//	windowRect2 = GUI.Window (20, windowRect2, WindowManagerHiring, ("Manager Hiring") );
}
function Awake () {
	contratacao = hireFuncionario.GetHire_Price();
}