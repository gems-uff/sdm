class RandomDescriptionGenerator extends System.ValueType{

	public var nome : String;
	public var description : String;

	public function RandomDescriptionGenerator(a1 : String){
		nome = a1;
	}
	
	public function RandomDescription (){
		var number : int = Random.Range(1, 33);
		switch(number)
		{
		   case 1:
				nome = "Simple Calculator";
				description = "Our client want us to make a calculator to help him with multiplication, addition, subtraction and division problems.";
		   break;
		   case 2:
				nome = "Scientific Calculator";
				description = "This client desires a complex calculator to make it avaible during Mathematics exams";
		   break;
		   case 3:
				nome = "Graphing Calculator";
				description = "This university wants to allow students to use the Graphing Calculators during their calculus exams. But to do so, they need a Graphing Calculator software !";
		   break;
		   case 4:
				nome = "Quantum Calculator";
				description = "The research facility want someone to make a Quantum Calculator to aid their anxious scientists with their research !";
		   break;
		   case 5:
				nome = "Loan Calculator";
				description = "This small bank want us to make a Loan Calculator to avoid misunderstanding with their clients.";
		   break;
		   case 6:
				nome = "Argument Mapping";
				description = "This diplomatic school want us to make an Argument Mapping to improve their student's ability to articulate, comprehend and communicate reasoning.";
		   break;
		   case 7:
				nome = "Story-book reader";
				description = "This orphanage want a software that can read a book to their children.";
		   break;
		   case 8:
				nome = "Audio-book reader";
				description = "The deaf institution want us to develop a software that can read books aloud for their patiences.";
		   break;
		   case 9:
				nome = "Dictionary";
				description = "They desire a software to make them say bigger words !";
		   break;
		   case 10:
				nome = "Speech recognition";
				description = "They want a program that can recognize who is speaking !";
		   break;
		   case 11:
				nome = "Handwriting recognition";
				description = "This bank want a software that can compare and identify signatures.";
		   break;
		   case 12:
				nome = "Speech synthesis";
				description = "This japonese company want a program to make synthetic voice for their robots !";
		   break;
		   case 13:
				nome = "Automatic Language Translation";
				description = "Universal translator, everyone's dream. Just happen that this client want someone to make one for them!";
		   break;
		   case 14:
				nome = "Physics simulator";
				description = "This game company want a program that can simulate physics so they can integrate with their games.";
		   break;
		   case 15:
				nome = "Biological simulators";
				description = "The governement want us to make a software to aid them on their calculations of population growth.";
		   break;
		   case 16:
				nome = "Genealogy software";
				description = "Someone out there want a program to map their ancesters.";
		   break;
		   case 17:
				nome = "Dynamic system simulators";
				description = "This client desires a software that can make economic simulations.";
		   break;
		   case 18:
				nome = "Geography software";
				description = "A group of arqueologos want a software to help them map regions.";
		   break;
		   case 19:
				nome = "Firewall";
				description = "The bank want us to develop a firewall to their systems.";
		   break;
		   case 20:
				nome = "Anti-virus";
				description = "The internet is a dangerous place to roam. A company want to make an anti-virus software to avoid their employees to get unwanted guests during their work.";
		   break;
		   case 21:
				nome = "Security Log viewer";
				description = "The client want a program that allow them to browse and view their security logs with ease.";
		   break;
		   case 22:
				nome = "Anti-Spyware";
				description = "Sometimes someone is inside your system stealing information under your nose. A company want to make sure that it don't happen with them.";
		   break;
		   case 23:
				nome = "Vector graphic creator";
				description = "Yea, that is exactly want they want. A software to make vector graphics.";
		   break;
		   case 24:
				nome = "Raster graphic creator";
				description = "Yea, that is exactly want they want. A software to make raster graphics.";
		   break;
		   case 25:
				nome = "Animation";
				description = "The client want a software to aid his company to make animated commercials";
		   break;
		   case 26:
				nome = "Instrument tuning";
				description = "Some lazy players want a program to aid them to tune their guitars.";
		   break;
		   case 27:
				nome = "Audio Editor software";
				description = "Basicaly they want a program that can alter what someone said.";
		   break;
		   case 28:
				nome = "Singing speech synthesizer";
				description = "Ever heard of a singing droid before ? Me neither, but the japonese want to make one! We only need to make a program that can synthesize a singing voice.";
		   break;
		   case 29:
				nome = "VoIP phone";
				description = "They want a phone capable of transmitting through the internet.";
		   break;
		   case 30:
				nome = "Conferencing system";
				description = "Do you know that tiring company meeting that happens every month ? Someone want us to make a software to allow them do just that but anywhere !";
		   break;
		   case 31:
				nome = "Email client";
				description = "With so many differents emails out there and yet they want us to make a new one.";
		   break;
		   case 32:
				nome = "Voice-mail";
				description = "Basicaly is an email but instead of text they store voice messages.";
		   break;
		   case 33:
				nome = "Web-page editor";
				description = "";
		   break;
		   case 34:
				nome = "Wiki engine for school servers";
				description = "";
		   break;
		   case 35:
				nome = "Microcontroller compiler";
				description = "";
		   break;
		   case 36:
				nome = "Matrix CAD";
				description = "";
		   break;
		   case 37:
				nome = "Source-code editor";
				description = "";
		   break;
		   case 38:
				nome = "Map making software";
				description = "";
		   break;
		   case 39:
				nome = "Compiler optimization";
				description = "";
		   break;
		   case 40:
				nome = "Power management software";
				description = "";
		   break;
		   case 41:
				nome = "Memory usage software";
				description = "";
		   break;
		   case 42:
				nome = "Toolkit adaptation";
				description = "";
		   break;
		   case 43:
				nome = "Recipe-managing";
				description = "";
		   break;
		   case 44:
				nome = "Multi-person simulator";
				description = "";
		   break;
		   case 45:
				nome = "";
				description = "";
		   break;
		   case 46:
				nome = "";
				description = "";
		   break;
		   case 47:
				nome = "";
				description = "";
		   break;
		   case 48:
				nome = "";
				description = "";
		   break;
		   case 49:
				nome = "";
				description = "";
		   break;
		   case 50:
				nome = "";
				description = "";
		   break;
		   default:
				nome = "";
				description = "";
			break;
		}
	}
}