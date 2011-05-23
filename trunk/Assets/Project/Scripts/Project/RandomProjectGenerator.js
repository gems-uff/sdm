
//public var acceptedProject : Project;
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

function NewProject(){
	var t : int = Random.Range (1, 9);
	var auxD1 : int = Random.Range (28, 336); 
	var auxD2 : int = Random.Range (28, 336); 
	var auxCL : int = Random.Range (30, 150);
	var auxPG : float = Random.Range (0.9, 1.3);
	var auxBV : int = Random.Range (10, 100);
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
	