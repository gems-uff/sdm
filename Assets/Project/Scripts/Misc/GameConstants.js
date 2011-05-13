
//Working
public var JUNIOR_SALARY : float = 1.0;
public var PLENO_SALARY : float = 1.3;
public var SENIOR_SALARY : float = 1.5;
public var JUNIOR_MODIFICATOR : float = 1.0;
public var PLENO_MODIFICATOR : float = 1.2;
public var SENIOR_MODIFICATOR : float = 1.4;
public var MINPAYMENT : int = 2000;
public var PENALIDADE : float = 0.3;
public var BONUS : float = 0.25;
public var ANALISTA_INICIO : float = 0.8;
public var GERENTE : float = 0.4;	// +40%
public var PROG_LINES_DAY_MOD : float = 5;
public var PROG_BUG_MOD : float = 0.1;
public var TESTER_DURANTE : float = 0.1;

//Morale
public var MODIFICATOR : float = 6.0; 
public var SLOWRECOVERY : float = -1.0;
public var RECOVERYBONUS : float = 1.2;
public var TIREDMORALE : float = 25.0;
public var BADMORALE : float = 5.0;
public var DEMITCHANCE : float = 1.0;
public var MORALE_MOD : int = 25.0;

//Project
public var SIMPLE : int = 525;		//Max 35 atributo "Programador" por programador por dia (3 programadores)
public var REGULAR : int = 900;	//Max 60
public var COMPLEX : int = 1200;	//Max 80
public var LOW : int = 1500;
public var NORMAL : int = 3000;
public var HIGH : int = 4500;

//Prototype
public var ARCHITECT_FACTOR : float = 0.06; 	//Multiplicador do bonus dos prototipos pelo arquiteto, no caso usa 10% do valor do arquiteto
public var SIMPLE_FACTOR : int = 1;			//Multiplicador do bonus dos prototipos pelo tipo de prototipo
public var REGULAR_FACTOR : int = 2;
public var COMPLEX_FACTOR : int = 3;

public var SIMPLE_PRICE : int = 3000;		//Custo para fazer cada prototipo
public var REGULAR_PRICE : int = 7500;
public var COMPLEX_PRICE : int = 18750;