
//public var acceptedProject : Project;
public var constant : GameConstants;
public var jogador : PlayerStats;
private var projeto : Project;
private var deadline : int = 0;  										//in days
private var maxCodeLines : int = 0;										//size of the software to be done
private var linguagemProgramacao : String;					//Linguagem: Escolher apenas uma linguagem
private var pagamento : int = 0;
private var bugValue : int = 1000;
private var DAYS_MONTH : int = 28;
private var description : RandomDescriptionGenerator;
public var timer : GameTime;
private var PAG_MOD : int = 48;

private var auxD1 : int; //Deadline
private var auxD2 : int; //Deadline
private var auxCL : int;  //Code Lines : Tamanho do programa
private var auxPG : float; //Modificador de Pagamento
private var auxBV : int; //BugValue
//private var allowedProject : int;
	
function SimpleProject(){
	//allowedProject = constant.SIMPLE;
	auxD1 = Random.Range (28, 84); //Deadline
	auxD2 = Random.Range (28, 84); //Deadline
	auxCL = Random.Range (30, 150);  //Code Lines : Tamanho do programa
	auxPG = Random.Range (1.5, 2.0); //Modificador de Pagamento
	auxBV = Random.Range (10, 100); //BugValue
	projeto.SetProjectSizeString("Simple");
}
function RegularProject(){
	//allowedProject = constant.REGULAR;
	auxD1 = Random.Range (56, 112); //Deadline
	auxD2 = Random.Range (56, 112); //Deadline
	auxCL = Random.Range (151, 210);  //Code Lines : Tamanho do programa
	auxPG = Random.Range (1.3, 1.8); //Modificador de Pagamento
	auxBV = Random.Range (10, 100); //BugValue
	projeto.SetProjectSizeString("Regular");
}
function ComplexProject(){
	//allowedProject = constant.COMPLEX;
	auxD1 = Random.Range (84, 168); //Deadline
	auxD2 = Random.Range (84, 168); //Deadline
	auxCL = Random.Range (211, 400);  //Code Lines : Tamanho do programa
	auxPG = Random.Range (1.0, 1.5); //Modificador de Pagamento
	auxBV = Random.Range (10, 100); //BugValue
	projeto.SetProjectSizeString("Complex");
}
function InsaneProject(){
	//allowedProject = constant.COMPLEX * 10;
	auxD1 = Random.Range (112, 224); //Deadline
	auxD2 = Random.Range (112, 224); //Deadline
	auxCL = Random.Range (401, 500);  //Code Lines : Tamanho do programa
	auxPG = Random.Range (1.0, 1.5); //Modificador de Pagamento
	auxBV = Random.Range (10, 100); //BugValue
	projeto.SetProjectSizeString("Insane");
}
function NewProject(){
	var t : int = Random.Range (1, 9); //Linguagem
	
	var chance : int;
	var aux_project_size : int;
	//Controle de criação de projetos
	aux_project_size = constant.COMPLEX * 10;
	chance = Random.Range (1, 10);
	switch(jogador.GetAllowedProjects())
	{
	   case 1: 
			SimpleProject();
	   break;

	   case 2:
			if (chance < 4)
				SimpleProject();
			else
				RegularProject();
	   break;
	   
	   case 3:
			if (chance < 2)
					SimpleProject();
				else
					if (chance < 5)
						RegularProject();
					else
						ComplexProject();
	   break;
	   
	   case 4:
			if (chance < 2)
					SimpleProject();
				else
					if (chance < 3)
						RegularProject();
					else 
						if (chance < 5)
							ComplexProject();
						else
							InsaneProject();
	   break;
  
	   default:
			SimpleProject();
		  break;
	}
	description.RandomDescription();
		
	if (auxD1 > auxD2)
	{
		deadline = auxD2;
	}
	else
	{
		deadline = auxD1;
	}
	auxCL = auxCL * 2.5;
	linguagemProgramacao = LinguagemProg(t);
	pagamento = PAG_MOD * auxPG  * auxCL;
	pagamento = pagamento / 100;
	pagamento = pagamento * 100;
	maxCodeLines = auxCL * deadline;
	bugValue = auxBV * 50;
	projeto.SetNewDeadline(deadline);
	projeto.SetDeadlineDays(deadline);
	projeto.SetStartDay(timer.GetGameTime());
	projeto.SetProjectSize(maxCodeLines);
	projeto.SetPagamento(pagamento);
	projeto.SetBugValue(bugValue);
	projeto.SetLinguagem(linguagemProgramacao);
	projeto.SetNome(description.nome);
	projeto.SetDescription(description.description);
	projeto.SetProjectQuality();
}

function LinguagemProg(t : int){
	var aux : String = "";
	
	switch(t)
	{
	   case 1: 
			aux = "assembly";
	   break;

	   case 2:
			aux = "csharp";
	   break;
	   
	   case 3:
			aux = "java";
	   break;
	   
	   case 4:
			aux = "perl";
	   break;
	   
	   case 5:
			aux = "ruby";
	   break;
	   
	   default:
			aux = "Any";
		  break;
	}
	return aux;
}

//--------------------------------------------Awake-----------------------------------------------------------

function Awake () {
	projeto = GetComponentInChildren(Project);
	NewProject();
	}
	