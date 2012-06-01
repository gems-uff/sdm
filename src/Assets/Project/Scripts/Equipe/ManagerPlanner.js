//#pragma strict
//Employee Slots
public var stringNames : StringNames;
public var slot01 : Funcionario;
public var slot02 : Funcionario;
public var slot03 : Funcionario;
public var slot04 : Funcionario;
public var slot05 : Funcionario;
public var slot06 : Funcionario;
public var slot07 : Funcionario;
public var slot08 : Funcionario;

//Main roles for each slot
/*
public var slot01_mainRole : String;
public var slot02_mainRole : String;
public var slot03_mainRole : String;
public var slot04_mainRole : String;
public var slot05_mainRole : String;
public var slot06_mainRole : String;
public var slot07_mainRole : String;
public var slot08_mainRole : String;

//Secondary roles for each slot
public var slot01_secRole : String;
public var slot02_secRole : String;
public var slot03_secRole : String;
public var slot04_secRole : String;
public var slot05_secRole : String;
public var slot06_secRole : String;
public var slot07_secRole : String;
public var slot08_secRole : String;
*/
/*
public var slot01_set : boolean = false;
public var slot02_set : boolean = false;
public var slot03_set : boolean = false;
public var slot04_set : boolean = false;
public var slot05_set : boolean = false;
public var slot06_set : boolean = false;
public var slot07_set : boolean = false;
public var slot08_set : boolean = false;
*/

//Array of slots
private var slot = new Array(8);
slot[0] = slot01;
slot[1] = slot02;
slot[2] = slot03;
slot[3] = slot04;
slot[4] = slot05;
slot[5] = slot06;
slot[6] = slot07;
slot[7] = slot08;

//Array of main roles
public var slot_mainRole = new Array(8);
slot_mainRole[0] = "";
slot_mainRole[1] = "";
slot_mainRole[2] = "";
slot_mainRole[3] = "";
slot_mainRole[4] = "";
slot_mainRole[5] = "";
slot_mainRole[6] = "";
slot_mainRole[7] = "";

public var slot_secRole = new Array(8);
slot_secRole[0] = "";
slot_secRole[1] = "";
slot_secRole[2] = "";
slot_secRole[3] = "";
slot_secRole[4] = "";
slot_secRole[5] = "";
slot_secRole[6] = "";
slot_secRole[7] = "";

public var slot_mainUsed = new Array(8);
slot_mainUsed[0] = false;
slot_mainUsed[1] = false;
slot_mainUsed[2] = false;
slot_mainUsed[3] = false;
slot_mainUsed[4] = false;
slot_mainUsed[5] = false;
slot_mainUsed[6] = false;
slot_mainUsed[7] = false;

public var slot_secUsed = new Array(8);
slot_secUsed[0] = false;
slot_secUsed[1] = false;
slot_secUsed[2] = false;
slot_secUsed[3] = false;
slot_secUsed[4] = false;
slot_secUsed[5] = false;
slot_secUsed[6] = false;
slot_secUsed[7] = false;

//--------------------------------------------------------------
//Manager Functions
//--------------------------------------------------------------

function ResetUsed()
{
	slot_mainUsed[0] = false;
	slot_mainUsed[1] = false;
	slot_mainUsed[2] = false;
	slot_mainUsed[3] = false;
	slot_mainUsed[4] = false;
	slot_mainUsed[5] = false;
	slot_mainUsed[6] = false;
	slot_mainUsed[7] = false;
	slot_secUsed[0] = false;
	slot_secUsed[1] = false;
	slot_secUsed[2] = false;
	slot_secUsed[3] = false;
	slot_secUsed[4] = false;
	slot_secUsed[5] = false;
	slot_secUsed[6] = false;
	slot_secUsed[7] = false;
}

//--------------------------------------------------------------
//Analysis Mode Function
//--------------------------------------------------------------
//This function will distribute roles according to the priorities of the Mode, in this case Analysis
function AnalysisMode()
{
	var tester : String = stringNames.papelTester;
	var arquiteto : String = stringNames.papelArquiteto;
	var programmador : String = stringNames.papelProg;
	var analista : String = stringNames.papelAnalista;
	
	ResetUsed();
	CleanRoles();
	DefineStaffRoles();
	
	NeedRole(analista, false, false, 1, 100, tester, arquiteto, programmador, analista, "anaElicitation");
	NeedRole(analista, true, true, 1, 50, tester, arquiteto, programmador, analista,"anaEspecification");
	
	//Lets test
	var ok : boolean = false;
	//Prog
	//ok = NeedRole(programmador, false, true, 1, 50, tester, arquiteto, analista, programmador,"progEvolution");
	//if(!ok)
		NeedRole(programmador, true, true, 1, 50, tester, arquiteto, analista, programmador,"progEvolution");
	//Arc
	//ok = NeedRole(arquiteto, false, true, 1, 40, tester, analista, programmador, arquiteto,"archEvolution");
	//if(!ok)
		NeedRole(arquiteto, true, true, 1, 40, tester, analista, programmador, arquiteto,"archEvolution");
	//Prog
	//ok = NeedRole(programmador, false, true, 1, 50, tester, arquiteto, analista, programmador,"progEvolution");
	//if(!ok)
		NeedRole(programmador, true, true, 1, 50, tester, arquiteto, analista, programmador,"progEvolution");
	//Tester Do not have a task yet implemented
	//ok = NeedRole(tester, false, true, 1, 30, analista, programmador, arquiteto, tester,"testerAll");
	//if(!ok)
		NeedRole(tester, true, true, 1, 30, analista, programmador, arquiteto, tester,"testerAll");
		
	//Analista
	//ok = NeedRole(analista, false, true, 1, 50, tester, arquiteto, programmador, analista,"anaElicitation");
	//if(!ok)
		NeedRole(analista, true, true, 1, 50, tester, arquiteto, programmador, analista,"anaElicitation");
	//Programador
	//ok = NeedRole(programmador, false, true, 1, 50, tester, arquiteto, analista, programmador,"progEvolution");
	//if(!ok)
		NeedRole(programmador, true, true, 1, 50, tester, arquiteto, analista, programmador,"progEvolution");
}

//--------------------------------------------------------------
//Codification Mode Function
//--------------------------------------------------------------
//This function will distribute roles according to the priorities of the Mode
function CodificationMode()
{
	var tester : String = stringNames.papelTester;
	var arquiteto : String = stringNames.papelArquiteto;
	var programmador : String = stringNames.papelProg;
	var analista : String = stringNames.papelAnalista;
	
	ResetUsed();
	CleanRoles();
	DefineStaffRoles();
	
	NeedRole(programmador, false, false, 1, 100, tester, arquiteto, programmador, analista, "progEvolution");
	NeedRole(programmador, true, true, 1, 50, tester, arquiteto, programmador, analista,"progEvolution");
	
	//Architect
	NeedRole(arquiteto, true, true, 1, 40, tester, analista, programmador, arquiteto,"archEvolution");
	//Tester Do not have a task yet implemented
	NeedRole(tester, true, true, 1, 30, analista, programmador, arquiteto, tester,"testerAll");
		
	//Analysts
	NeedRole(analista, true, true, 1, 50, tester, arquiteto, programmador, analista,"anaElicitation");
	NeedRole(analista, true, true, 1, 50, tester, arquiteto, programmador, analista,"anaEspecification");
		
	//Programmer
	NeedRole(programmador, true, true, 1, 50, tester, arquiteto, analista, programmador,"progRepair");
	NeedRole(programmador, true, true, 1, 50, tester, arquiteto, programmador, analista,"progEvolution");
}

//--------------------------------------------------------------
//Quality Mode Function
//--------------------------------------------------------------
//This function will distribute roles according to the priorities of the Mode
function QualityMode()
{
	var tester : String = stringNames.papelTester;
	var arquiteto : String = stringNames.papelArquiteto;
	var programmador : String = stringNames.papelProg;
	var analista : String = stringNames.papelAnalista;
	
	ResetUsed();
	CleanRoles();
	DefineStaffRoles();
	
	NeedRole(programmador, false, false, 1, 100, tester, arquiteto, programmador, analista, "progRepair");
	
	NeedRole(tester, true, true, 2, 30, analista, programmador, arquiteto, tester,"testerAll");
	
	//Architect
	NeedRole(arquiteto, true, true, 1, 40, tester, analista, programmador, arquiteto,"archTestCases");
		
	//Analysts
	NeedRole(analista, true, true, 1, 50, tester, arquiteto, programmador, analista,"anaQuality");
	NeedRole(analista, true, true, 1, 50, tester, arquiteto, programmador, analista,"anaRounded");
		
	//Programmer
	NeedRole(tester, true, true, 1, 30, analista, programmador, arquiteto, tester,"testerAll");
	NeedRole(programmador, true, true, 1, 50, tester, arquiteto, analista, programmador,"progRepair");
	NeedRole(programmador, true, true, 3, 50, tester, arquiteto, programmador, analista,"progEvolution");
}

//--------------------------------------------------------------
//Balanced Mode Function
//--------------------------------------------------------------
//This function will distribute roles according to the priorities of the Mode
function BalancedMode()
{
	var tester : String = stringNames.papelTester;
	var arquiteto : String = stringNames.papelArquiteto;
	var programmador : String = stringNames.papelProg;
	var analista : String = stringNames.papelAnalista;
	
	ResetUsed();
	CleanRoles();
	DefineStaffRoles();
	
	NeedRole(programmador, false, false, 1, 100, tester, arquiteto, programmador, analista, "progEvolution");
	NeedRole(programmador, true, true, 1, 50, tester, arquiteto, programmador, analista,"progRepair");
	//Architect
	NeedRole(arquiteto, true, true, 1, 40, tester, analista, programmador, arquiteto,"archRounded");
	//Tester Do not have a task yet implemented
	NeedRole(tester, true, true, 1, 30, analista, programmador, arquiteto, tester,"testerAll");
		
	//Analysts
	//NeedRole(analista, true, true, 1, 50, tester, arquiteto, programmador, analista,"anaQuality");
	NeedRole(analista, true, true, 1, 50, tester, arquiteto, programmador, analista,"anaRounded");
		
	//Programmer
	NeedRole(programmador, true, true, 1, 50, tester, arquiteto, programmador, analista,"progEvolution");
}


//--------------------------------------------------------------
//Need Role
//--------------------------------------------------------------
//This function will, if possible, assign someone in the staff to perform the WantedRole
//////////////////////////////////////////////////////////////////////////////
function NeedRole(wantedRole : String, wantedCanBeSec : boolean, wantedCanHaveSec : boolean, 
qnt : int, wantedRate : int, turn1 : String, turn2 : String, turn3 : String, turn4 : String, task : String)
{
	var i : int = 0;
	var howManyFound : int = 0;
	var done : boolean = false;
	//Wanted rate is for the secondary role, so we need to convert it because of the SetRates expect main role
	wantedRate = 100 - wantedRate;
	i = 0;
	
	//Lets check how many we can find
	while(!done)
	{
		//If main slot
		if((slot_mainRole[i] == wantedRole) && (slot_mainUsed[i] == false))
		{
			//howManyFound = howManyFound + 1;
			//slot_mainUsed[i] = true;
			//slot[i].SetPapel(wantedRole);
			//SetRole(slot[i], wantedRole, false, task);
			
			//Debug.Log("Found #1 in main");
			if(!wantedCanHaveSec && slot_secUsed[i] == false)
			{
				slot_secUsed[i] = true;
				howManyFound = howManyFound + 1;
				slot_mainUsed[i] = true;
				SetRole(slot[i], wantedRole, false, task);
			}
			else
			{
				if(wantedCanHaveSec)
				{
					howManyFound = howManyFound + 1;
					slot_mainUsed[i] = true;
					SetRole(slot[i], wantedRole, false, task);
				}
			}
		}
		else
		{
			//If can be secondary slot
			if(wantedCanBeSec && (slot_secRole[i] == wantedRole) && (slot_secUsed[i] == false))
			{
				howManyFound = howManyFound + 1;
				slot_secUsed[i] = true;
				SetRole(slot[i], wantedRole, true, task);
				slot[i].SetRates(wantedRate);
				
				//Debug.Log("Found #1 in sec");
			}
		}

		//Stop the while
		i++;
		if(howManyFound >= qnt)
			done = true;
		if(i == 8)
		{
			i = 0;
			done = true;
		}
	}
	//If we didnt find enought then we need to
	var roleTurn = new Array(3);
	roleTurn[0] = turn1;
	roleTurn[1] = turn2;
	roleTurn[2] = turn3;
	roleTurn[3] = turn4;

	var j : int = 0;
	i = 0;
	while(howManyFound < qnt)
	{
		if(slot_mainUsed[i] == false)
		{
			//Debug.Log("Main not used");
			//Debug.Log("Slot = " + slot_mainRole[i]);
			//Debug.Log("Turn = " + roleTurn[j]);
			//Main slot is not used, and it is the one we seek
			if(slot_mainRole[i] == roleTurn[j])
			{
				//If he can have a secondary role
				if(wantedCanHaveSec)
				{
					//I can only use it if the secondary role is dif from wanted role
					if(slot[i].GetPapelSec() != wantedRole)
					{
						//Debug.Log("Changed #1 in main");
						howManyFound = howManyFound + 1;
						slot_mainUsed[i] = true;
						SetRole(slot[i], wantedRole, false, task);
						//If secondary role is not been used, then we set the rate. Otherwise it is already set
						if(slot_secUsed[i] == false)
						{
							slot[i].SetRates(100);
						}
					}
				}
				else
				{
					//Debug.Log("cant have secondary");
					//He cant have secondary and can only use this slot if secondary is not being used
					if(slot_secUsed[i] == false)
					{
						//Debug.Log("Secondary not used then lets use it !");
						//Debug.Log("Changed #1 in main");
						howManyFound = howManyFound + 1;
						slot_mainUsed[i] = true;
						slot_secUsed[i] = true;
						SetRole(slot[i], wantedRole, false, task);
						slot[i].SetRates(100);
					}
				}
			}
		}
		else
		{
			if(wantedCanBeSec && (slot_secUsed[i] == false))
			{
				if(slot_secRole[i] == roleTurn[j])
				{
					//I can only use the secondary role if the primary is diferent from wantedRole
					if(slot[i].GetPapel() != wantedRole)
					{
						howManyFound = howManyFound + 1;
						slot_secUsed[i] = true;
						SetRole(slot[i], wantedRole, true, task);
						slot[i].SetRates(wantedRate);
						
						//Debug.Log("Found #1 in sec");
					}
				}
			}
		}

		i++;
		//Debug.Log("i = " + i);
		if(i == 8)
		{
			i = 0;
			//Debug.Log("Next turn");
			j++;
		}
		if(j == 4)
		{
			//Debug.Log("Couldnt complete");
			break;
		}
	}
	CleanRolesWithZeroRate();
	
	if(howManyFound == qnt)
		return true;
	else
		return false;

}


/////////////////////////////////////////////////////////////////////////////////
function SetStaffRoles()
{
	for(i = 0; i < 8; i++)
	{
		slot[i].SetPapel(slot_mainRole[i]);
		slot[i].SetPapelSec(slot_secRole[i]);
	}
}

//--------------------------------------------------------------
//Define Staff Roles Function
//--------------------------------------------------------------
/*
//This function will set the main and secondary roles for each employee to be used by the manager
*/

function DefineStaffRoles()
{
	var i : int = 0;
	var ana : int;
	var arq : int;
	var prog : int;
	var test : int;
	//for each slot, set the main and secondary roles
	for(i = 0; i < 8; i++)
	{
		if(slot[i].GetNome() != stringNames.fired)
		{
			//Need to compare all employee's roles attributes to get the 2 highest
			ana = slot[i].GetAnalista();
			arq = slot[i].GetArquiteto();
			prog = slot[i].GetProgramador();
			//Maybe tester should be a left over ?
			test = slot[i].GetTester();
			if(CheckIfGreater(ana, arq, prog, test))
			{
				//Then ana is the highest score
				slot_mainRole[i] = stringNames.papelAnalista;
				if(CheckIfGreater(arq, prog, test, 0))
				{
					//Then arq is the second highest
					slot_secRole[i] = stringNames.papelArquiteto;
				}
				else
				{
					if(CheckIfGreater(prog, arq, test, 0))
					{
						//Then prog is second
						slot_secRole[i] = stringNames.papelProg;
					}
					else
					{
						//Then tester is
						slot_secRole[i] = stringNames.papelTester;
					}
				}
			}
			//End Analyst
			else
			{
				if(CheckIfGreater(arq, ana, prog, test))
				{
					//Then arq is the highest
					slot_mainRole[i] = stringNames.papelArquiteto;
					if(CheckIfGreater(ana, prog, test, 0))
					{
						//Then ana is the second highest
						slot_secRole[i] = stringNames.papelAnalista;
					}
					else
					{
						if(CheckIfGreater(prog, ana, test, 0))
						{
							//Then prog is second
							slot_secRole[i] = stringNames.papelProg;
						}
						else
						{
							//Then tester is
							slot_secRole[i] = stringNames.papelTester;
						}
					}
				}
				//End Architect
				else
				{
					if(CheckIfGreater(prog, ana, arq, test))
					{
						//Then prog is the highest
						slot_mainRole[i] = stringNames.papelProg;
						if(CheckIfGreater(ana, arq, test, 0))
						{
							//Then arq is the second highest
							slot_secRole[i] = stringNames.papelAnalista;
						}
						else
						{
							if(CheckIfGreater(arq, ana, test, 0))
							{
								//Then prog is second
								slot_secRole[i] = stringNames.papelArquiteto;
							}
							else
							{
								//Then tester is
								slot_secRole[i] = stringNames.papelTester;
							}
						}
						
					}
					//End Programmer
					else
					{
						//Tester is the highest
						slot_mainRole[i] = stringNames.papelTester;
						if(CheckIfGreater(ana, arq, prog, 0))
						{
							//Then arq is the second highest
							slot_secRole[i] = stringNames.papelAnalista;
						}
						else
						{
							if(CheckIfGreater(arq, ana, prog, 0))
							{
								//Then prog is second
								slot_secRole[i] = stringNames.papelArquiteto;
							}
							else
							{
								//Then tester is
								slot_secRole[i] = stringNames.papelProg;
							}
						}
					}
					//End tester
				}
			}
			//If the employee is a manager, then we need to change his primary role to be manager
			if(slot[i].GetPapel() == stringNames.papelGerente)
			{
				slot_mainRole[i] = stringNames.papelGerente;
			}
		}//End if Name
	}
}

//--------------------------------------------------------------
//Clean Roles Function
//--------------------------------------------------------------
//This function simply set all employees to have no role, with the exception of the manager
function CleanRoles()
{
	var i : int = 0;
	//We cant change the Manager
	for(i = 0; i < 8; i++)
	{
		slot[i].SetPapelSec(stringNames.papelNenhum);
		slot[i].SetRates(100);
		if((slot[i].GetPapel() == stringNames.papelGerente))
			slot_mainUsed[i] = true;
		else
			slot[i].SetPapel(stringNames.papelNenhum);
	}
}

//--------------------------------------------------------------
//SetRole Function
//--------------------------------------------------------------
//Function to set a role and its corresponding task
function SetRole(func : Funcionario, role : String, isSec : boolean, task : String)
{
	var behavior : BehaviorPlanner;
	if(!isSec)
		func.SetPapel(role);
	else
		func.SetPapelSec(role);
	behavior = func.GetComponentInChildren(BehaviorPlanner);

	switch(task)
	{
	   case "progRepair":
			behavior.ActivateProgRepair();
	   break;

	   case "progEvolution":
			behavior.ActivateProgEvolution();
	   break;
	   
	   case "archVerification":
			behavior.ActivateArchVerification();
	   break;
	   
	   case "archEvolution":
			behavior.ActivateArchEvolution();
	   break;
	   
	   case "archAnalysis":
			behavior.ActivateArchAnalysis();
	   break;
	   
	   case "archRounded":
			behavior.ActivateArchRounded();
	   break;
	   
	   case "archTestCases":
			behavior.SetTestCases("both");
			Debug.Log("TO DO");
	   break;
	   
	   case "anaElicitation":
			behavior.ActivateAnaElicitation();
	   break;
	   
	   case "anaEspecification":
			behavior.ActivateAnaEspecification();
	   break;
	   
	   case "anaQuality":
			behavior.ActivateAnaQuality();
	   break;
	   
	   case "anaRounded":
			behavior.ActivateAnaRounded();
	   break;

	   default:
		  break;
	}
}
//--------------------------------------------------------------
//Removes any secondary role if rate == 0
//--------------------------------------------------------------
function CleanRolesWithZeroRate()
{
	var i : int = 0;
	for(i = 0; i < 8; i++)
	{
		if(slot[i].GetPapelSecRate() == 0)
		{
			slot[i].SetPapelSec(stringNames.papelNenhum);
		}
	}
}
//--------------------------------------------------------------
//Greater Function
//--------------------------------------------------------------
//Function that returns if the tested variable is greater then the rest
function CheckIfGreater(tested : int, arg1 : int, arg2 : int, arg3 : int)
{
	var isGreater : boolean = false;
	//Return if it is the highest
	if((tested >= arg1) && (tested >= arg2) && (tested >= arg3))
		isGreater = true;
		
	return isGreater;
}

//--------------------------------------------------------------
//Window Functions
//--------------------------------------------------------------
//Test Window for the function above
//Windows
private var showWindow : boolean = false;
private var windowRect : Rect = Rect (300,125,600,300);
function WindowFunction (windowID : int)	
{
	
	GUI.Box (Rect (02,018,100,20), ("Slot01: "));
	GUI.Box (Rect (02,038,100,20), ("Slot02: "));
	GUI.Box (Rect (02,058,100,20), ("Slot03: "));
	GUI.Box (Rect (02,078,100,20), ("Slot04: "));
	GUI.Box (Rect (02,098,100,20), ("Slot05: "));
	GUI.Box (Rect (02,118,100,20), ("Slot06: "));
	GUI.Box (Rect (02,138,100,20), ("Slot07: "));
	GUI.Box (Rect (02,158,100,20), ("Slot08: "));
	//Main
	GUI.Box (Rect (102,018,100,20), (slot_mainRole[0]));
	GUI.Box (Rect (102,038,100,20), (slot_mainRole[1]));
	GUI.Box (Rect (102,058,100,20), (slot_mainRole[2]));
	GUI.Box (Rect (102,078,100,20), (slot_mainRole[3]));
	GUI.Box (Rect (102,098,100,20), (slot_mainRole[4]));
	GUI.Box (Rect (102,118,100,20), (slot_mainRole[5]));
	GUI.Box (Rect (102,138,100,20), (slot_mainRole[6]));
	GUI.Box (Rect (102,158,100,20), (slot_mainRole[7]));
	//Sec
	GUI.Box (Rect (202,018,100,20), (slot_secRole[0]));
	GUI.Box (Rect (202,038,100,20), (slot_secRole[1]));
	GUI.Box (Rect (202,058,100,20), (slot_secRole[2]));
	GUI.Box (Rect (202,078,100,20), (slot_secRole[3]));
	GUI.Box (Rect (202,098,100,20), (slot_secRole[4]));
	GUI.Box (Rect (202,118,100,20), (slot_secRole[5]));
	GUI.Box (Rect (202,138,100,20), (slot_secRole[6]));
	GUI.Box (Rect (202,158,100,20), (slot_secRole[7]));
	
	GUI.Box (Rect (302,018,40,20), (""+ slot[0].GetAnalista()));
	GUI.Box (Rect (342,018,40,20), (""+ slot[0].GetArquiteto()));
	GUI.Box (Rect (382,018,40,20), (""+ slot[0].GetProgramador()));
	GUI.Box (Rect (422,018,40,20), (""+ slot[0].GetTester()));
	
	GUI.Box (Rect (302,038,40,20), (""+ slot[1].GetAnalista()));
	GUI.Box (Rect (342,038,40,20), (""+ slot[1].GetArquiteto()));
	GUI.Box (Rect (382,038,40,20), (""+ slot[1].GetProgramador()));
	GUI.Box (Rect (422,038,40,20), (""+ slot[1].GetTester()));
	
	GUI.Box (Rect (302,058,40,20), (""+ slot[2].GetAnalista()));
	GUI.Box (Rect (342,058,40,20), (""+ slot[2].GetArquiteto()));
	GUI.Box (Rect (382,058,40,20), (""+ slot[2].GetProgramador()));
	GUI.Box (Rect (422,058,40,20), (""+ slot[2].GetTester()));
	
	GUI.Box (Rect (302,078,40,20), (""+ slot[3].GetAnalista()));
	GUI.Box (Rect (342,078,40,20), (""+ slot[3].GetArquiteto()));
	GUI.Box (Rect (382,078,40,20), (""+ slot[3].GetProgramador()));
	GUI.Box (Rect (422,078,40,20), (""+ slot[3].GetTester()));
	
	GUI.Box (Rect (302,098,40,20), (""+ slot[4].GetAnalista()));
	GUI.Box (Rect (342,098,40,20), (""+ slot[4].GetArquiteto()));
	GUI.Box (Rect (382,098,40,20), (""+ slot[4].GetProgramador()));
	GUI.Box (Rect (422,098,40,20), (""+ slot[4].GetTester()));
	
	GUI.Box (Rect (302,118,40,20), (""+ slot[5].GetAnalista()));
	GUI.Box (Rect (342,118,40,20), (""+ slot[5].GetArquiteto()));
	GUI.Box (Rect (382,118,40,20), (""+ slot[5].GetProgramador()));
	GUI.Box (Rect (422,118,40,20), (""+ slot[5].GetTester()));
	
	GUI.Box (Rect (302,138,40,20), (""+ slot[6].GetAnalista()));
	GUI.Box (Rect (342,138,40,20), (""+ slot[6].GetArquiteto()));
	GUI.Box (Rect (382,138,40,20), (""+ slot[6].GetProgramador()));
	GUI.Box (Rect (422,138,40,20), (""+ slot[6].GetTester()));
	
	GUI.Box (Rect (302,158,40,20), (""+ slot[7].GetAnalista()));
	GUI.Box (Rect (342,158,40,20), (""+ slot[7].GetArquiteto()));
	GUI.Box (Rect (382,158,40,20), (""+ slot[7].GetProgramador()));
	GUI.Box (Rect (422,158,40,20), (""+ slot[7].GetTester()));

	//------------------
	if (GUI.Button (Rect (200,198,196,20), "Analysis Mode")) 
	{
		AnalysisMode();
	}
	if (GUI.Button (Rect (200,218,196,20), "Codification Mode")) 
	{
		CodificationMode();
	}
	if (GUI.Button (Rect (200,238,196,20), "Quality Mode")) 
	{
		QualityMode();
	}
	if (GUI.Button (Rect (200,258,196,20), "Balanced Mode")) 
	{
		BalancedMode();
	}
	//if (GUI.Button (Rect (200,278,196,20), "1 tester")) 
	//{
	
	//}
	//---------------------
	
	if (GUI.Button (Rect (02,188,196,20), "Clean")) 
	{
		CleanRoles();
	}
	
	if (GUI.Button (Rect (02,218,196,20), "Set roles")) 
	{
		SetStaffRoles();
	}
	
	if (GUI.Button (Rect (02,248,196,20), "Recalculate")) 
	{
		DefineStaffRoles();
	}
	if (GUI.Button (Rect (02,278,196,20), "Close")) 
	{
		showWindow  = false;
	}
	GUI.DragWindow();
}

function ShowPlannerWindow()
{
	showWindow = true;
}
function OnGUI (){
	if(showWindow)
		windowRect = GUI.Window (100, windowRect, WindowFunction, "Staff Chart");
}

//////////////////////////////
//////////////////////////////
//////////////////////////////

//--------------------------------------------------------------
//Analysis Mode
//--------------------------------------------------------------
/*
function AnalysisMode()
{
	var i : int = 0;
	
	//Need to decide what to do depeding of the Focus
	//Just to be sure, redefine the staff roles again
	DefineStaffRoles();
	SetStaffRoles();
	
	//Debug.Log("Analysis Mode");
	//If we are on analysis mode, we focus on analysts
	//So we need at least 1 main Analyst and 1 secondary in the staff
	//We dont need Architects, nor testers on this phase

	//We assign the analysts
	var hasMainAnalyst : boolean = false;
	var hasSecAnalyst : boolean = false;
	var behavior : BehaviorPlanner;
	
	//If we have any analysts, lets set the rates for maximum gain
	//We want at least 1 Analyst as Elicitation and another for Especification
	for(i = 0; i < 8; i++)
	{
		//Also define the tasks for the analysts
		behavior = slot[i].GetComponentInChildren(BehaviorPlanner);
		
		behavior.ActivateProgEvolution();
		behavior.ActivateArchEvolution();
		//behaivor.ActivateTesterAll();
		
		if(slot_mainRole[i] == stringNames.papelAnalista)
		{
			//slot[i].SetPapel(stringNames.papelAnalista);
			//We will focus only on analyst
			slot[i].SetRates(100);
			behavior.ActivateAnaElicitation();
			//If we already have a main analyst, then he can count as a secondary one
			if(hasMainAnalyst)
			{
				hasSecAnalyst = true;
				behavior.ActivateAnaEspecification();
			}
			hasMainAnalyst = true;
		}
		
		//If we have a secondary analyst, then we set him as analyst and set the boolean
		if(slot_secRole[i] == stringNames.papelAnalista)
		{
			//slot[i].SetPapelSec(stringNames.papelAnalista);
			behavior.ActivateAnaEspecification();
			slot[i].SetRates(50);
			hasSecAnalyst = true;
		}
	}
	
	//If we dont have 2 analysts, then we need to make someone be analyst for now
	
	//Since we have no analyst, we need to change someone's role. The priority is below
	var roleTurn = new Array(3);
	roleTurn[0] = stringNames.papelTester;
	roleTurn[1] = stringNames.papelArquiteto;
	roleTurn[2] = stringNames.papelProg;
	
	var j : int = 0;
	i = 0;
	while(!hasMainAnalyst || !hasSecAnalyst)
	{
		behavior = slot[i].GetComponentInChildren(BehaviorPlanner);
		if(slot_mainRole[i] == roleTurn[j])
		{
			if(slot_secRole[i] != stringNames.papelAnalista)
			{
				slot_mainRole[i] = stringNames.papelAnalista;
				slot[i].SetPapel(stringNames.papelAnalista);
				
				behavior.ActivateAnaElicitation();
				if(!hasMainAnalyst)
				{
					hasMainAnalyst = true;
				}
				else
				{
					if(!hasSecAnalyst)
					{
						behavior.ActivateAnaEspecification();
						hasSecAnalyst = true;
					}
				}
			}
			else
			{
				//Sec role == Analyst
				var aux : String = slot_mainRole[i];
				slot_mainRole[i] = slot_secRole[i];
				slot_secRole[i] = aux;
				slot[i].SetPapel(stringNames.papelAnalista);
				slot[i].SetPapelSec(aux);
				slot[i].SetRates(100);
				
				behavior.ActivateAnaElicitation();
				if(!hasMainAnalyst)
				{
					hasMainAnalyst = true;
				}
				else
				{
					if(!hasSecAnalyst)
					{
						behavior.ActivateAnaEspecification();
						hasSecAnalyst = true;
					}
				}
			}
		}
		//If we didnt meet our quota, we go to the next role
		i++;
		//Debug.Log("I = " + i);
		if(i == 8)
		{
			i = 0;
			j++;
		}
	}
	Debug.Log("We have analysts");
	//Now we have the analysts
	//However, we only need architects and testers if we have programmers.
	
	//Howto: Run through all slots, if main role is analyst, ignore
	//Otherwise set programmers, architect and testers
	//----------------
	//Need to be Done
	//----------------
	CleanRolesWithZeroRate();
}
*/
//--------------------------------------------------------------
//Need Role Function
//--------------------------------------------------------------
//Will check if there is any of the specified role. If not will try to set someone on that role


////////////////////////////////////
/*
function NeedRole(
role : String, dontChange : String, dontChange2 : String, dontChange3 : String, qnt : int, rate : int,
canHaveSec2 : boolean, canHaveSec3 : boolean)
{
	var j : int = 0;
	//Search everyone
	for(i = 0; i < 8; i++)
	{
		//If main role is the one we are looking for
		if(slot_mainRole[i] == role)
		{
			j++;
			slot[i].SetPapel(role);
			slot[i].SetRates(100);
		}
		else
		{
			//if sec role is the one, set rate
			if((slot_secRole[i] == role) && (slot_mainRole[i] != dontChange))
			{
				if((slot_mainRole[i] != dontChange2) && (slot_mainRole[i] != dontChange3))
				{
					j++;
					slot[i].SetPapelSec(role);
					slot[i].SetRates(rate);
				}
				else
				{
					if((slot_mainRole[i] == dontChange2) && canHaveSec2)
					{
						j++;
						slot[i].SetPapelSec(role);
						slot[i].SetRates(rate);
					}
					else
					{
						if((slot_mainRole[i] == dontChange3) && canHaveSec3)
						{
							j++;
							slot[i].SetPapelSec(role);
							slot[i].SetRates(rate);
						}
					}
				}
			}
		}
	}
	//Now we check if we filled the quota. If not then we try to
	i = 0;
	while(j < qnt)
	{
		Debug.Log("Had to change someone");
		//Debug.Log("Current Role = " + slot_mainRole[i]);
		//Debug.Log("Dont Change1 = " + dontChange);
		//Debug.Log("Dont Change2 = " + dontChange2);
		//Debug.Log("Dont Change3 = " + dontChange2);
		
		//Try as primary role
		if(slot_mainRole[i] != stringNames.papelGerente)
		{
		
		
		
		
		
			if((slot_mainRole[i] != dontChange) && (slot_mainRole[i] != dontChange2) && (slot_mainRole[i] != dontChange3))
			{
					Debug.Log("Managed to change");
					j++;
					slot[i].SetPapel(role);
					if((slot_secRole[i] != dontChange))
					{
						if((slot_secRole[i] != dontChange2) && (slot_secRole[i] != dontChange3))
						{
							slot[i].SetRates(100);
						}
					}
			}
			else
			{
				//Try as secondary role
				//Cant change if the secondary is from the current mode
				if((slot_secRole[i] != dontChange) && (slot_secRole[i] != dontChange2) && (slot_secRole[i] != dontChange3))
				{
					Debug.Log("Sec can be changed");
					if((slot_mainRole[i] != dontChange) && (slot_mainRole[i] == dontChange2) && canHaveSec2)
					{
						slot[i].SetPapelSec(role);
						slot[i].SetRates(rate);
						j++;
					}
					else
					{
						if((slot_mainRole[i] != dontChange) && (slot_mainRole[i] == dontChange3) && canHaveSec3)
						{
							slot[i].SetPapelSec(role);
							slot[i].SetRates(rate);
							j++;
						}
					}
				}
			}
		}
		i++;
		if(i == 8)
		{
			i = 0;
			//Need to exit, we couldnt allocate
			j = qnt + 1;
		}
	}
	Debug.Log("Done with NeedRole");
}
*/