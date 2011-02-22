class RandomNameGenerator extends System.ValueType{

	public var nome : String;

	public function RandomNameGenerator(a1 : String){
		nome = a1;
	}
	
	public function RandomName (){
		var number : int = Random.Range(1, 20);
		switch(number)
		{
		   case 1:
				nome = "Jacob";
		   break;
		   
		   case 2:
				nome = "Ethan";
		   break;
		   
		   case 3:
				nome = "Michael";
		   break;
		   
		   case 4:
				nome = "Alexander";
		   break;
		   
		   case 5:
				nome = "William";
		   break;
		   
		   case 6:
				nome = "Joshua";
		   break;
		   
		   case 7:
				nome = "Daniel";
		   break;
		   
		   case 8:
				nome = "Jayden";
		   break;
		   
		   case 9:
			  nome = "Noah";
		   break;
		   case 10:
				nome = "Anthony";
		   break;
		   
		   case 11:
				nome = "Isabella";
		   break;
		   
		   case 12:
				nome = "Emma";
		   break;
		   
		   case 13:
				nome = "Olivia";
		   break;
		   
		   case 14:
				nome = "Sophia";
		   break;
		   
		   case 15:
			  nome = "Kathryn";
		   break;
		   
		   case 16:
				nome = "Emily";
		   break;
		   
		   case 17:
				nome = "Madison";
		   break;
		   
		   case 18:
				nome = "Abigail";
		   break;
		   
		   case 19:
				nome = "Chloe";
		   break;
		   
		   case 20:
				nome = "Mia";
		   break;
		   
		   default:
				nome = "John";
			break;
		}
		return nome;
	}
}