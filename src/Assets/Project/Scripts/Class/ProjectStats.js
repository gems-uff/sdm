

class ProjectStats
{
	public var name : String;					//Project Name
	public var description : String;			//Project Text info
	public var deadline : int;  				//in days
	public var linguagemProgramacao : String;	//Linguagem: Escolher apenas uma linguagem
	public var pagamento : int;					//How much each month
	public var requirements : float;			//Description size: Simple, Regular, Complex, Insane
	public var sincronismo : float;			//Description Quality: Not, default, high, highest
	public var codeQuality : float;				//Current Code Quality
	public var percentageDone : float; 			//GetFractionDone()
	public var credits : int;
	//Bugs Found
	public var bugUnitaryFound : int;
	public var bugIntegrationFound : int;
	public var bugSystemFound : int;
	public var bugAcceptionFound : int;
	//Bugs corrected
	public var bugUnitaryRepaired : int;
	public var bugIntegrationRepaired : int;
	public var bugSystemRepaired : int;
	public var bugAcceptionRepaired : int;
	
	public var totalBugs : int;
	
	public var date : String;
	public var income : int;
	
	//For the linked List
	public var next : ProjectStats;
	public var previous : ProjectStats;
	
	function Add(t : ProjectStats)
	{
		this.next = t;
		t.previous = this;
	}
	
	function UpdateNode(node : ProjectStats)
	{
		this.name = node.name;
		this.description = node.description;
		this.deadline = node.deadline;
		this.linguagemProgramacao = node.linguagemProgramacao;
		this.pagamento = node.pagamento;
		this.requirements = node.requirements;
		this.sincronismo = node.sincronismo;
		this.codeQuality = node.codeQuality;
		this.percentageDone = node.percentageDone;
		this.credits = node.credits;
		this.bugUnitaryFound = node.bugUnitaryFound;
		this.bugIntegrationFound = node.bugIntegrationFound;
		this.bugSystemFound = node.bugSystemFound;
		this.bugAcceptionFound = node.bugAcceptionFound;
		this.bugUnitaryRepaired = node.bugUnitaryRepaired;
		this.bugIntegrationRepaired = node.bugIntegrationRepaired;
		this.bugSystemRepaired = node.bugSystemRepaired;
		this.bugAcceptionRepaired = node.bugAcceptionRepaired;
		this.totalBugs = node.totalBugs;
	}
	
	function UpdateIncome()
	{
		this.income = this.pagamento;
	}

}

class ProjectStatsList
{
	public var first : ProjectStats;
	public var last : ProjectStats;
	
	function Add(t : ProjectStats)
	{
		//if empty
		if(this.first == null)
		{
			this.first = t;
			this.last = t;
		}
		else
		{
			//Put it after the last one
			this.last.Add(t);
			//Update the last one
			this.last = t;
		}
	}
	
	function ProjectStatsList()
	{
		this.first = null;
		this.last = null;
	}
}