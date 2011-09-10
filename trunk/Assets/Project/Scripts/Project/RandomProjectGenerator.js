
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

//Fazer: Limitar as escolhas de projetos de acordo com o level. Fazer com que so crie projetos permitidos pelo lvl do jogador. While (tamanhoProjeto > permitido) recrie.
function NewProject(){
	var t : int = Random.Range (1, 9); //Linguagem
	var auxD1 : int; //Deadline
	var auxD2 : int; //Deadline
	var auxCL : int;  //Code Lines : Tamanho do programa
	var auxPG : float; //Modificador de Pagamento
	var auxBV : int; //BugValue
	var allowedProject : int;
	
	var aux_project_size : int;
	//Controle de criação de projetos
	switch(jogador.GetAllowedProjects())
	{
	   case 1: 
			allowedProject = constant.SIMPLE;
	   break;

	   case 2:
			allowedProject = constant.REGULAR;
	   break;
	   
	   case 3:
			allowedProject = constant.COMPLEX;
	   break;
	   
	   case 4:
			allowedProject = constant.COMPLEX * 2;
	   break;
  
	   default:
			allowedProject = constant.SIMPLE;
		  break;
	}
	aux_project_size = allowedProject * 2; //Para sempre fazer uma etapa do while
	
	//Verificar o level do jogador e ver que tamanho de projeto é possivel
	while(aux_project_size > allowedProject)
	{
		auxD1 = Random.Range (28, 336); //Deadline
		auxD2 = Random.Range (28, 336); //Deadline
		auxCL = Random.Range (30, 150);  //Code Lines : Tamanho do programa
		auxPG = Random.Range (0.9, 1.3); //Modificador de Pagamento
		auxBV = Random.Range (10, 100); //BugValue
		description.RandomDescription();
			
		if (auxD1 > auxD2)
		{
			deadline = auxD2;
		}
		else
		{
			deadline = auxD1;
		}
		auxCL = auxCL * 10;
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
		projeto.SetProjectSizeString();
		projeto.SetProjectQuality();
		
		aux_project_size = maxCodeLines / deadline;
	}
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
	