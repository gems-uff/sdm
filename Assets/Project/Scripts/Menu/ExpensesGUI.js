

public var func1 : Funcionario;
public var func2 : Funcionario;
public var func3 : Funcionario;
public var func4 : Funcionario;
public var func5 : Funcionario;
public var func6 : Funcionario;
public var func7 : Funcionario;
public var func8 : Funcionario;

function ShowWindow()
{
	GUI.Box (Rect (00,180,75,220),
	("Expenses:" + "\n" +
	"\n" +
	func1.GetNome() + " : "+ "\n" +
	func2.GetNome() + " : " + "\n" +
	func3.GetNome() + " : " + "\n" +
	func4.GetNome() + " : " + "\n" +
	func5.GetNome() + " : " + "\n" +
	func6.GetNome() + " : " + "\n" +
	func7.GetNome() + " : " + "\n" +
	func8.GetNome() + " : " + "\n" +
	"\n" +
	"Daily : " + "\n" +
	"\n" +
	"Monthly :"
	));
	GUI.Box (Rect (75,180,75,220),
	("\n" +
	"\n" +
	" $" + (func1.GetSalario() / 28) + "\n" +
	" $" + (func2.GetSalario() / 28) + "\n" +
	" $" + (func3.GetSalario() / 28) + "\n" +
	" $" + (func4.GetSalario() / 28) + "\n" +
	" $" + (func5.GetSalario() / 28) + "\n" +
	" $" + (func6.GetSalario() / 28) + "\n" +
	" $" + (func7.GetSalario() / 28) + "\n" +
	" $" + (func8.GetSalario() / 28) + "\n" +
	"\n" +
	" $" + ((func1.GetSalario() / 28) + (func2.GetSalario() / 28) + (func3.GetSalario() / 28) + (func4.GetSalario() / 28) + 
	(func5.GetSalario() / 28) + (func6.GetSalario() / 28) + (func7.GetSalario() / 28) + (func8.GetSalario() / 28)) + "\n" +
	"\n" +
	" $" + (func1.GetSalario() + func2.GetSalario() + func3.GetSalario() + func4.GetSalario() + func5.GetSalario() + func6.GetSalario() + func7.GetSalario() + func8.GetSalario())
	));
}


function OnGUI()
{
	ShowWindow();
}

function Update () {
}