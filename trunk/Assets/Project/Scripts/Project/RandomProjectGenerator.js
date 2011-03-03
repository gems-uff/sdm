
private var projeto : Project;
private var deadlineDays : int = 0;  										//in days
private var maxCodeLines : int = 0;										//size of the software to be done
private var linguagemProgramacao : String = "java";					//Linguagem: Escolher apenas uma linguagem
private var pagamento : int = 0;
private var bugValue : int = 1000;

function NewProject(){
	var t : int = Random.Range (1, 11);
	linguagemProgramacao = LinguagemProg(t);
	
	deadlineDays = Random.Range (28, 336); 							//De um mes até 1 ano
	maxCodeLines = Random.Range (100, 1000);						//Fator de linhas de codigo, será multiplicado pelo deadline
	maxCodeLines = maxCodeLines * deadlineDays;
	
	pagamento = Random.Range (50, 100);								//Fator multiplicador de pagamento
	pagamento = maxCodeLines / deadlineDays * pagamento;		//É de acordo com o fator de linhas de codigo
	
	bugValue = Random.Range (5, 50);										//De 500 a 5000 por bug
	bugValue = bugValue * 100;
	projeto.SetNewDeadline(deadlineDays);
	projeto.SetProjectSize(maxCodeLines);
	projeto.SetPagamento(pagamento);
	projeto.SetBugValue(bugValue);
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
			modificador = "";
		  break;
	}
	return aux;
}

//--------------------------------------------Awake-----------------------------------------------------------

function Awake () {
	projeto = GetComponentInChildren(Project);
	}
	