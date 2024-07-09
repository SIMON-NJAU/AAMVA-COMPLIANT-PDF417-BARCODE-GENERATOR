
/*
$$$$$   $$$$  $$$$$$ $$$$$  $$$$
$$  $$ $$  $$   $$   $$    $$
$$  $$ $$$$$$   $$   $$$$   $$$$
$$  $$ $$  $$   $$   $$        $$
$$$$$  $$  $$   $$   $$$$$  $$$$
*/

function get_month_number(date) {
    year = parseInt(date.slice(-4));

    if (year % 2) { return date.slice(0,2); } 

    return (parseInt(date.slice(0,2)) + 12).toString();  
}

function get_letter_corresponding_month(month) {
    letters = "ABCDEFGHIJKL";
    return letters[parseInt(month) - 1];
}

function get_last_day_of_month(date) {
	month = parseInt(date.slice(0, 2));
	year = parseInt(date.slice(-4));

    mdays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    mdays_leap = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];


    if (year % 4 == 0) {
        return mdays_leap[month - 1];
    } else {
        return mdays[month - 1];
    }
}

function getNumberOfDaysFromBeginnigOfYear(date) {
	mdays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	mdays_leap = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	
	day = parseInt(date.slice(2, 4));
	month = parseInt(date.slice(0, 2));
	year = parseInt(date.slice(-4));
	
	total_days = day;
	for (var i = 1; i < month; i++) {
	    if (year % 4 == 0) {
		    total_days += mdays_leap[i];
	    } else {
		    total_days += mdays[i];
	    }
	}
	return ("00" + total_days).slice(-3)
}

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

function getFormattedDate_MMDDYYYY(date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
  
    return month + day + year;
}

function getFormattedDate_YYYYMMDD(date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
  
    return year + month + day;
}

function getRandomDateByYear(minYear, maxYear) {
    minDate = new Date(minYear, 0, 1);
    maxDate = new Date(maxYear, 0, 1);

    return randomDate(minDate, maxDate);
}

function makeRandomDOB(minYear, maxYear) {
    if (!minYear) { minYear = 1965 }
    if (!maxYear) { maxYear = 1999 }
    document.getElementById('inputBrithDate').value = getFormattedDate_MMDDYYYY(getRandomDateByYear(minYear, maxYear));
}

function makeRandomDOB_CAN(minYear, maxYear) {
    if (!minYear) { minYear = 1965 }
    if (!maxYear) { maxYear = 1999 }
    document.getElementById('inputBrithDate').value = getFormattedDate_YYYYMMDD(getRandomDateByYear(minYear, maxYear));
}

function makeRandomDOI(minYear, maxYear) {
    if (!maxYear) {  maxYear = new Date().getFullYear() - 1; }

    date = getFormattedDate_MMDDYYYY(getRandomDateByYear(minYear, maxYear + 1))
    document.getElementById("inputIssueDate").value = date;

    var dateOfExpiry = document.getElementById("inputExpiryDate").value;
}

function makeRandomDOI_CAN(minYear, maxYear) {
    if (!maxYear) {  maxYear = new Date().getFullYear() - 1; }

    date = getFormattedDate_YYYYMMDD(getRandomDateByYear(minYear, maxYear + 1))
    document.getElementById("inputIssueDate").value = date;
}

function makeRandomDOE(diff) {
    var dateOfBirth = document.getElementById("inputBrithDate").value;
    if (!dateOfBirth) { 
        makeRandomDOB();
        dateOfBirth = document.getElementById("inputBrithDate").value;
    }

    if (dateOfBirth.length > 4) {
        date = dateOfBirth.slice(0,4);
    } else { return; }

    var dateOfIssue = document.getElementById("inputIssueDate").value;
    if (dateOfIssue.length == 8) { date += parseInt(dateOfIssue.slice(-4)) + diff }
    
    document.getElementById("inputExpiryDate").value = date
}

function makeRandomDOE_CAN(diff) {
    var dateOfBirth = document.getElementById("inputBrithDate").value;
    if (!dateOfBirth) {
        makeRandomDOB_CAN();
        dateOfBirth = document.getElementById("inputBrithDate").value;
    }

    if (dateOfBirth.length > 4) {
        date = dateOfBirth.slice(-4);
    } else { return; }

    var dateOfIssue = document.getElementById("inputIssueDate").value;
    if (dateOfIssue.length == 8) {
        date = (parseInt(dateOfIssue.slice(0,4)) + diff) + date
    }

    document.getElementById("inputExpiryDate").value = date
}

function makeRandomDOE_fromDOI(diff) {
    var dateOfIssue = document.getElementById("inputIssueDate").value;
    if (!dateOfIssue) { 
        makeRandomDOI(2016, 2020);
        dateOfIssue = document.getElementById("inputIssueDate").value;
    }

    date = dateOfIssue.slice(0,4);


    date += parseInt(dateOfIssue.slice(-4)) + diff
    
    document.getElementById("inputExpiryDate").value = date
}


function makeDOEformDOB() {
    var dateOfBirth = document.getElementById("inputBrithDate").value;

    if (!dateOfBirth) { return; }
    if (dateOfBirth.length > 4) { dateOfBirth = dateOfBirth.slice(0,4); }

    document.getElementById("inputExpiryDate").value = dateOfBirth
}

function makeDOEfromDOI(years) {
    var dateOfIssue = document.getElementById("inputIssueDate").value;

    if (!dateOfIssue || dateOfIssue.length != 8) { return; }

    issueYear = parseInt(dateOfIssue.slice(-4));
    expiryYear = issueYear + years;

    document.getElementById("inputExpiryDate").value = 
        document.getElementById("inputExpiryDate").value.slice(0,4) + expiryYear;
}

function makeDOEfromDOI_full(years) {
    var dateOfIssue = document.getElementById("inputIssueDate").value;

    if (!dateOfIssue || dateOfIssue.length != 8) { return; }

    issueYear = parseInt(dateOfIssue.slice(-4));
    expiryYear = issueYear + years;

    document.getElementById("inputExpiryDate").value = dateOfIssue.slice(0,4) + expiryYear;
        // document.getElementById("inputExpiryDate").value.slice(0,4) + expiryYear;
}

function makeRandomDOE_plus_day(diff) {
    var issueDate = document.getElementById("inputIssueDate").value;
    if (issueDate.length != 8) {
        showInputDataAlert("Expiry date calculation error. Incorrect issue date!")
        return;
    }

    var dateOfBirth = document.getElementById("inputBrithDate").value;
    if (!dateOfBirth) { 
        makeRandomDOB();
        dateOfBirth = document.getElementById("inputBrithDate").value;
    }

    var birthDateDATE = new Date(parseInt(dateOfBirth.slice(-4)), parseInt(dateOfBirth.slice(0, 2)) - 1, parseInt(dateOfBirth.slice(2, 4)));
    birthDateDATE.setDate(birthDateDATE.getDate() + 1)

    // Get year, month, and day part from the date
    var year = birthDateDATE.toLocaleString("default", { year: "2-digit" });
    var month = birthDateDATE.toLocaleString("default", { month: "2-digit" });
    var day = birthDateDATE.toLocaleString("default", { day: "2-digit" });

    // Generate yyyy-mm-dd date string
    var formattedDate = month + day + (parseInt(issueDate.slice(-4)) + diff).toString();
    
    document.getElementById("inputExpiryDate").value = formattedDate;
}

function makeRandomDOE_minus_day(diff) {
    var issueDate = document.getElementById("inputIssueDate").value;
    if (issueDate.length != 8) {
        showInputDataAlert("Expiry date calculation error. Incorrect issue date!")
        return;
    }

    var expiryDateDATE = new Date(parseInt(issueDate.slice(-4)), parseInt(issueDate.slice(0, 2))  - 1, parseInt(issueDate.slice(2, 4)));
    expiryDateDATE.setDate(expiryDateDATE.getDate() - 1)


    // Get year, month, and day part from the date
    var year = expiryDateDATE.toLocaleString("default", { year: "2-digit" });
    var month = expiryDateDATE.toLocaleString("default", { month: "2-digit" });
    var day = expiryDateDATE.toLocaleString("default", { day: "2-digit" });

    // Generate yyyy-mm-dd date string
    var formattedDate = month + day + (parseInt(issueDate.slice(-4)) + diff).toString();

    document.getElementById("inputExpiryDate").value = formattedDate;
}

function makeRandomDOE_minus_day_key(diff) {
    var issueDate = document.getElementById("inputIssueDate").value;
    if (issueDate.length != 8) {
        return;
    }

    var expiryDateDATE = new Date(parseInt(issueDate.slice(-4)), parseInt(issueDate.slice(0, 2))  - 1, parseInt(issueDate.slice(2, 4)));
    expiryDateDATE.setDate(expiryDateDATE.getDate() - 1)


    // Get year, month, and day part from the date
    var year = expiryDateDATE.toLocaleString("default", { year: "2-digit" });
    var month = expiryDateDATE.toLocaleString("default", { month: "2-digit" });
    var day = expiryDateDATE.toLocaleString("default", { day: "2-digit" });

    // Generate yyyy-mm-dd date string
    var formattedDate = month + day + (parseInt(issueDate.slice(-4)) + diff).toString();

    document.getElementById("inputExpiryDate").value = formattedDate;
}


function makeDOEformDOB_plus_day() {
    var dateOfBirth = document.getElementById("inputBrithDate").value;

    if (!dateOfBirth) { return; }

    if (dateOfBirth.length > 3) {
        dateOfBirth = dateOfBirth.slice(0,4);

        var birthDateDATE = new Date(1970, parseInt(dateOfBirth.slice(0, 2)) - 1, parseInt(dateOfBirth.slice(2, 4)));
        birthDateDATE.setDate(birthDateDATE.getDate() + 1)

        // Get year, month, and day part from the date
        var month = birthDateDATE.toLocaleString("default", { month: "2-digit" });
        var day = birthDateDATE.toLocaleString("default", { day: "2-digit" });
        dateOfBirth = month + day;
    }

    document.getElementById("inputExpiryDate").value = dateOfBirth;
}

/*
$$$$$   $$$$  $$  $$ $$$$$   $$$$  $$   $
$$  $$ $$  $$ $$$ $$ $$  $$ $$  $$ $$$ $$
$$$$$  $$$$$$ $$ $$$ $$  $$ $$  $$ $$ $ $
$$  $$ $$  $$ $$  $$ $$  $$ $$  $$ $$   $
$$  $$ $$  $$ $$  $$ $$$$$   $$$$  $$   $
*/

function sample(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getRandomDigit() {
    const alphabet = "0123456789";
    return alphabet[Math.floor(Math.random() * alphabet.length)];
}

function getRandomInt2(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomLetter() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return alphabet[Math.floor(Math.random() * alphabet.length)];
}

function getRandomLetterAndDigit() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return alphabet[Math.floor(Math.random() * alphabet.length)];
}

// Get a string of random numbers
function (len) {
    var numericString = "";
    for (var i = 0; i < len; i++) {
        numericString += getRandomDigit();
    }
    return numericStringetRandomNumericStringg;
}

// Get a random last name from a list of the 1000 most popular US last names
function getRandomLastName() {
    const lastnames = ["Smith","Johnson","Williams","Brown","Jones","Garcia","Miller","Davis","Rodriguez","Martinez","Hernandez","Lopez","Gonzalez","Wilson","Anderson","Thomas","Taylor","Moore","Jackson","Martin","Lee","Perez","Thompson","White","Harris","Sanchez","Clark","Ramirez","Lewis","Robinson","Walker","Young","Allen","King","Wright","Scott","Torres","Nguyen","Hill","Flores","Green","Adams","Nelson","Baker","Hall","Rivera","Campbell","Mitchell","Carter","Roberts","Gomez","Phillips","Evans","Turner","Diaz","Parker","Cruz","Edwards","Collins","Reyes","Stewart","Morris","Morales","Murphy","Cook","Rogers","Gutierrez","Ortiz","Morgan","Cooper","Peterson","Bailey","Reed","Kelly","Howard","Ramos","Kim","Cox","Ward","Richardson","Watson","Brooks","Chavez","Wood","James","Bennett","Gray","Mendoza","Ruiz","Hughes","Price","Alvarez","Castillo","Sanders","Patel","Myers","Long","Ross","Foster","Jimenez","Powell","Jenkins","Perry","Russell","Sullivan","Bell","Coleman","Butler","Henderson","Barnes","Gonzales","Fisher","Vasquez","Simmons","Romero","Jordan","Patterson","Alexander","Hamilton","Graham","Reynolds","Griffin","Wallace","Moreno","West","Cole","Hayes","Bryant","Herrera","Gibson","Ellis","Tran","Medina","Aguilar","Stevens","Murray","Ford","Castro","Marshall","Owens","Harrison","Fernandez","Mcdonald","Woods","Washington","Kennedy","Wells","Vargas","Henry","Chen","Freeman","Webb","Tucker","Guzman","Burns","Crawford","Olson","Simpson","Porter","Hunter","Gordon","Mendez","Silva","Shaw","Snyder","Mason","Dixon","Munoz","Hunt","Hicks","Holmes","Palmer","Wagner","Black","Robertson","Boyd","Rose","Stone","Salazar","Fox","Warren","Mills","Meyer","Rice","Schmidt","Garza","Daniels","Ferguson","Nichols","Stephens","Soto","Weaver","Ryan","Gardner","Payne","Grant","Dunn","Kelley","Spencer","Hawkins","Arnold","Pierce","Vazquez","Hansen","Peters","Santos","Hart","Bradley","Knight","Elliott","Cunningham","Duncan","Armstrong","Hudson","Carroll","Lane","Riley","Andrews","Alvarado","Ray","Delgado","Berry","Perkins","Hoffman","Johnston","Matthews","Pena","Richards","Contreras","Willis","Carpenter","Lawrence","Sandoval","Guerrero","George","Chapman","Rios","Estrada","Ortega","Watkins","Greene","Nunez","Wheeler","Valdez","Harper","Burke","Larson","Santiago","Maldonado","Morrison","Franklin","Carlson","Austin","Dominguez","Carr","Lawson","Jacobs","Obrien","Lynch","Singh","Vega","Bishop","Montgomery","Oliver","Jensen","Harvey","Williamson","Gilbert","Dean","Sims","Espinoza","Howell","Li","Wong","Reid","Hanson","Le","Mccoy","Garrett","Burton","Fuller","Wang","Weber","Welch","Rojas","Lucas","Marquez","Fields","Park","Yang","Little","Banks","Padilla","Day","Walsh","Bowman","Schultz","Luna","Fowler","Mejia","Davidson","Acosta","Brewer","May","Holland","Juarez","Newman","Pearson","Curtis","Cortez","Douglas","Schneider","Joseph","Barrett","Navarro","Figueroa","Keller","Avila","Wade","Molina","Stanley","Hopkins","Campos","Barnett","Bates","Chambers","Caldwell","Beck","Lambert","Miranda","Byrd","Craig","Ayala","Lowe","Frazier","Powers","Neal","Leonard","Gregory","Carrillo","Sutton","Fleming","Rhodes","Shelton","Schwartz","Norris","Jennings","Watts","Duran","Walters","Cohen","Mcdaniel","Moran","Parks","Steele","Vaughn","Becker","Holt","Deleon","Barker","Terry","Hale","Leon","Hail","Benson","Haynes","Horton","Miles","Lyons","Pham","Graves","Bush","Thornton","Wolfe","Warner","Cabrera","Mckinney","Mann","Zimmerman","Dawson","Lara","Fletcher","Page","Mccarthy","Love","Robles","Cervantes","Solis","Erickson","Reeves","Chang","Klein","Salinas","Fuentes","Baldwin","Daniel","Simon","Velasquez","Hardy","Higgins","Aguirre","Lin","Cummings","Chandler","Sharp","Barber","Bowen","Ochoa","Dennis","Robbins","Liu","Ramsey","Francis","Griffith","Paul","Blair","Oconnor","Cardenas","Pacheco","Cross","Calderon","Quinn","Moss","Swanson","Chan","Rivas","Khan","Rodgers","Serrano","Fitzgerald","Rosales","Stevenson","Christensen","Manning","Gill","Curry","Mclaughlin","Harmon","Mcgee","Gross","Doyle","Garner","Newton","Burgess","Reese","Walton","Blake","Trujillo","Adkins","Brady","Goodman","Roman","Webster","Goodwin","Fischer","Huang","Potter","Delacruz","Montoya","Todd","Wu","Hines","Mullins","Castaneda","Malone","Cannon","Tate","Mack","Sherman","Hubbard","Hodges","Zhang","Guerra","Wolf","Valencia","Saunders","Franco","Rowe","Gallagher","Farmer","Hammond","Hampton","Townsend","Ingram","Wise","Gallegos","Clarke","Barton","Schroeder","Maxwell","Waters","Logan","Camacho","Strickland","Norman","Person","Colon","Parsons","Frank","Harrington","Glover","Osborne","Buchanan","Casey","Floyd","Patton","Ibarra","Ball","Tyler","Suarez","Bowers","Orozco","Salas","Cobb","Gibbs","Andrade","Bauer","Conner","Moody","Escobar","Mcguire","Lloyd","Mueller","Hartman","French","Kramer","Mcbride","Pope","Lindsey","Velazquez","Norton","Mccormick","Sparks","Flynn","Yates","Hogan","Marsh","Macias","Villanueva","Zamora","Pratt","Stokes","Owen","Ballard","Lang","Brock","Villarreal","Charles","Drake","Barrera","Cain","Patrick","Pineda","Burnett","Mercado","Santana","Shepherd","Bautista","Ali","Shaffer","Lamb","Trevino","Mckenzie","Hess","Beil","Olsen","Cochran","Morton","Nash","Wilkins","Petersen","Briggs","Shah","Roth","Nicholson","Holloway","Lozano","Rangel","Flowers","Hoover","Short","Arias","Mora","Valenzuela","Bryan","Meyers","Weiss","Underwood","Bass","Greer","Summers","Houston","Carson","Morrow","Clayton","Whitaker","Decker","Yoder","Collier","Zuniga","Carey","Wilcox","Melendez","Poole","Roberson","Larsen","Conley","Davenport","Copeland","Massey","Lam","Huff","Rocha","Cameron","Jefferson","Hood","Monroe","Anthony","Pittman","Huynh","Randall","Singleton","Kirk","Combs","Mathis","Christian","Skinner","Bradford","Richard","Galvan","Wall","Boone","Kirby","Wilkinson","Bridges","Bruce","Atkinson","Velez","Meza","Roy","Vincent","York","Hodge","Villa","Abbott","Allison","Tapia","Gates","Chase","Sosa","Sweeney","Farrell","Wyatt","Dalton","Horn","Barron","Phelps","Yu","Dickerson","Heath","Foley","Atkins","Mathews","Bonilla","Acevedo","Benitez","Zavala","Hensley","Glenn","Cisneros","Harrell","Shields","Rubio","Huffman","Choi","Boyer","Garrison","Arroyo","Bond","Kane","Hancock","Callahan","Dillon","Cline","Wiggins","Grimes","Arellano","Melton","Oneill","Savage","Ho","Beltran","Pitts","Parrish","Ponce","Rich","Booth","Koch","Golden","Ware","Brennan","Mcdowell","Marks","Cantu","Humphrey","Baxter","Sawyer","Clay","Tanner","Hutchinson","Kaur","Berg","Wiley","Gilmore","Russo","Villegas","Hobbs","Keith","Wilkerson","Ahmed","Beard","Mcclain","Montes","Mata","Rosario","Vang","Walter","Henson","Oneal","Mosley","Mcclure","Beasley","Stephenson","Snow","Huerta","Preston","Vance","Barry","Johns","Eaton","Blackwell","Dyer","Prince","Macdonald","Solomon","Guevara","Stafford","English","Hurst","Woodard","Cortes","Shannon","Kemp","Nolan","Mccullough","Merritt","Murillo","Moon","Salgado","Strong","Kline","Cordova","Barajas","Roach","Rosas","Winters","Jacobson","Lester","Knox","Bullock","Kerr","Leach","Meadows","Orr","Davila","Whitehead","Pruitt","Kent","Conway","Mckee","Barr","David","Dejesus","Marin","Berger","Mcintyre","Blankenship","Gaines","Palacios","Cuevas","Bartlett","Durham","Dorsey","Mccall","Odonnell","Stein","Browning","Stout","Lowery","Sloan","Mclean","Hendricks","Calhoun","Sexton","Chung","Gentry","Hull","Duarte","Ellison","Nielsen","Gillespie","Buck","Middleton","Sellers","Leblanc","Esparza","Hardin","Bradshaw","Mcintosh","Howe","Livingston","Frost","Glass","Morse","Knapp","Herman","Stark","Bravo","Noble","Spears","Weeks","Corona","Frederick","Buckley","Mcfarland","Hebert","Enriquez","Hickman","Quintero","Randolph","Schaefer","Walls","Trejo","House","Reilly","Pennington","Michael","Conrad","Giles","Benjamin","Crosby","Fitzpatrick","Donovan","Mays","Mahoney","Valentine","Raymond","Medrano","Hahn","Mcmillan","Small","Bentley","Felix","Peck","Lucero","Boyle","Hanna","Pace","Rush","Hurley","Harding","Mcconnell","Bernal","Nava","Ayers","Everett","Ventura","Avery","Pugh","Mayer","Bender","Shepard","Mcmahon","Landry","Case","Sampson","Moses","Magana","Blackburn","Dunlap","Gould","Duffy","Vaughan","Herring","Mckay","Espinosa","Rivers","Farley","Bernard","Ashley","Friedman","Potts","Truong","Costa","Correa","Blevins","Nixon","Clements","Fry","Delarosa","Best","Benton","Lugo","Portillo","Dougherty","Crane","Haley","Phan","Villalobos","Blanchard","Horne","Finley","Quintana","Lynn","Esquivel","Bean","Dodson","Mullen","Xiong","Hayden","Cano","Levy","Huber","Richmond","Moyer","Lim","Frye","Sheppard","Mccarty","Avalos","Booker","Waller","Parra","Woodward","Jaramillo","Krueger","Rasmussen","Brandt","Peralta","Donaldson","Stuart","Faulkner","Maynard","Galindo","Coffey","Estes","Sanford","Burch","Maddox","Vo","Oconnell","Vu","Andersen","Spence","Mcpherson","Church","Schmitt","Stanton","Leal","Cherry","Compton","Dudley","Sierra","Pollard","Alfaro","Hester","Proctor","Lu","Hinton","Novak","Good","Madden","Mccann","Terrell","Jarvis","Dickson","Reyna","Cantrell","Mayo","Branch","Hendrix","Rollins","Rowland","Whitney","Duke","Odom","Daugherty","Travis","Tang","Archer"];
    return lastnames[Math.floor(Math.random() * lastnames.length)];
}

// Get a random first name from a list of the 100 most popular US first names
function getRandomFirstName(sex) {
    m_names = ["James","Robert","John","Michael","David","William","Richard","Joseph","Thomas","Charles","Christopher","Daniel","Matthew","Anthony","Mark","Donald","Steven","Paul","Andrew","Joshua","Kenneth","Kevin","Brian","George","Timothy","Ronald","Edward","Jason","Jeffrey","Ryan","Jacob","Gary","Nicholas","Eric","Jonathan","Stephen","Larry","Justin","Scott","Brandon","Benjamin","Samuel","Gregory","Alexander","Frank","Patrick","Raymond","Jack","Dennis","Jerry","Tyler","Aaron","Jose","Adam","Nathan","Henry","Douglas","Zachary","Peter","Kyle","Ethan","Walter","Noah","Jeremy","Christian","Keith","Roger","Terry","Gerald","Harold","Sean","Austin","Carl","Arthur","Lawrence","Dylan","Jesse","Jordan","Bryan","Billy","Joe","Bruce","Gabriel","Logan","Albert","Willie","Alan","Juan","Wayne","Elijah","Randy","Roy","Vincent","Ralph","Eugene","Russell","Bobby","Mason","Philip","Louis"];
    f_names = ["Mary","Patricia","Jennifer","Linda","Elizabeth","Barbara","Susan","Jessica","Sarah","Karen","Lisa","Nancy","Betty","Margaret","Sandra","Ashley","Kimberly","Emily","Donna","Michelle","Carol","Amanda","Dorothy","Melissa","Deborah","Stephanie","Rebecca","Sharon","Laura","Cynthia","Kathleen","Amy","Angela","Shirley","Anna","Brenda","Pamela","Emma","Nicole","Helen","Samantha","Katherine","Christine","Debra","Rachel","Carolyn","Janet","Catherine","Maria","Heather","Diane","Ruth","Julie","Olivia","Joyce","Virginia","Victoria","Kelly","Lauren","Christina","Joan","Evelyn","Judith","Megan","Andrea","Cheryl","Hannah","Jacqueline","Martha","Gloria","Teresa","Ann","Sara","Madison","Frances","Kathryn","Janice","Jean","Abigail","Alice","Julia","Judy","Sophia","Grace","Denise","Amber","Doris","Marilyn","Danielle","Beverly","Isabella","Theresa","Diana","Natalie","Brittany","Charlotte","Marie","Kayla","Alexis","Lori"];
    return (sex == "F" || sex == "f") ? (f_names[Math.floor(Math.random() * f_names.length)]) : (m_names[Math.floor(Math.random() * m_names.length)])
}

// Get a random middle name from a list of the most popular US middle names
function getRandomMiddleName(sex) {
    m_names = ["James","John","William","Thomas","David","Robert","Edward","Peter","Lee","Christopher","Alexander","Michael","Daniel"];
    f_names = ["Louise","Rose","Grace","Jane","Elizabeth","Anne","Ann","May","Mae","Marie","Mary","Amy","Catherine","Victoria","Kate"];

    return (sex == "F" || sex == "f") ? (f_names[Math.floor(Math.random() * f_names.length)]) : (m_names[Math.floor(Math.random() * m_names.length)])
}

function insertRandomLastName() {
    document.getElementById("inputLastName").value = getRandomLastName();
}

function insertRandomFirstName() {    
    document.getElementById("inputFirstName").value = (document.getElementById("inputSex").value == "F") ? getRandomFirstName("F") : getRandomFirstName("M");
}

function insertRandomMiddleName() {
    document.getElementById("inputMiddleName").value = (document.getElementById("inputSex").value == "F") ? getRandomMiddleName("F") : getRandomMiddleName("M");
}



function showInputDataAlert(message) {
    alert_html = document.getElementById("inputDataErrorAlertArea").innerHTML = '<div class="alert alert-danger font-monospace alert-dismissible fade show" role="alert"><div class="text-center"> ' 
    + message
    + ' </div><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

}



/*
 $$$$   $$$$  $$     $$$$$$ $$$$$$  $$$$  $$$$$  $$  $$ $$$$$$  $$$$ 
$$  $$ $$  $$ $$       $$   $$     $$  $$ $$  $$ $$$ $$   $$   $$  $$
$$     $$$$$$ $$       $$   $$$$   $$  $$ $$$$$  $$ $$$   $$   $$$$$$
$$  $$ $$  $$ $$       $$   $$     $$  $$ $$  $$ $$  $$   $$   $$  $$
 $$$$  $$  $$ $$$$$$ $$$$$$ $$      $$$$  $$  $$ $$  $$ $$$$$$ $$  $$
*/

// ======================== CALIFONIA (CA) ======================== //

function CA_calculate_ICN() {
    var documentNumber = document.getElementById("inputDocumentNumber").value;
    if (documentNumber.length != 8) {
        showInputDataAlert("ICN calculation error. Incorrect document number!")
        return;
    }

    var issueDate = document.getElementById("inputIssueDate").value;
    if (issueDate.length != 8) {
        showInputDataAlert("ICN calculation error. Incorrect issue date!")
        return;
    }

    document.getElementById("inputICN").value = issueDate.slice(-2)
            + getNumberOfDaysFromBeginnigOfYear(issueDate) + documentNumber + "0401";
}

function CA_calculate_DD() {

    var issueDate = document.getElementById("inputIssueDate").value;
    if (issueDate.length != 8) {
        showInputDataAlert("DD calculation error. Incorrect issue date!")
        return;
    }

    var expiryDate = document.getElementById("inputExpiryDate").value;
    if (expiryDate.length != 8) {
        showInputDataAlert("DD calculation error. Incorrect expiry date!")
        return;
    }

    const suff_alphabet = ["AA", "BB", "DD"];
    suffix =  suff_alphabet[Math.floor(Math.random() * suff_alphabet.length)];

    fullIssueDate = issueDate.slice(0, 2) + "/" + issueDate.slice(2, 4) + "/" + issueDate.slice(-4);

    document.getElementById('inputDD').value = fullIssueDate + getRandomNumericString(5) + "/" + suffix + "FD/" + expiryDate.slice(-2);
}

function CA_calculate_documentNumber() {
    document.getElementById('inputDocumentNumber').value = getRandomLetter() + getRandomNumericString(7);
}


/*
$$   $ $$$$$$  $$$$   $$$$  $$$$$$  $$$$   $$$$  $$$$$$ $$$$$  $$$$$  $$$$$$
$$$ $$   $$   $$     $$       $$   $$     $$       $$   $$  $$ $$  $$   $$ 
$$ $ $   $$    $$$$   $$$$    $$    $$$$   $$$$    $$   $$$$$  $$$$$    $$ 
$$   $   $$       $$     $$   $$       $$     $$   $$   $$     $$       $$ 
$$   $ $$$$$$  $$$$   $$$$  $$$$$$  $$$$   $$$$  $$$$$$ $$     $$     $$$$$$
*/

// ========================== MISSISSIPPI (MS) =========================== //

function MS_calculate_documentNumber() {
    document.getElementById('inputDocumentNumber').value = "80" + getRandomNumericString(7);
}

function MS_calculate_ICN() {
    document.getElementById("inputICN").value = "05100" + getRandomNumericString(6) + "20190";
}

function MS_calculate_DD() {
    var birthDate = document.getElementById("inputBrithDate").value;
    if (birthDate.length != 8) {
        showInputDataAlert("DD calculation error. Incorrect birth date!")
        return;
    }

    var issueDate = document.getElementById("inputIssueDate").value;
    if (issueDate.length != 8) {
        showInputDataAlert("DD calculation error. Incorrect issue date!")
        return;
    }

    var expiryDate = document.getElementById("inputExpiryDate").value;
    if (expiryDate.length != 8) {
        showInputDataAlert("DD calculation error. Incorrect expiry date!")
        return;
    }

    var lastName = document.getElementById("inputLastName").value;
    if (!lastName) {
        showInputDataAlert("DD calculation error. Incorrect Last name!")
        return;
    }

    var firstName = document.getElementById("inputFirstName").value;
    if (!firstName) {
        showInputDataAlert("DD calculation error. Incorrect First name!")
        return;
    }

    var sex = document.getElementById('inputSex').value;

    s = "";
    for(var i = 0; i < 7; i++) { s += getRandomLetterAndDigit(); }

    d = ("00" + (parseInt(getNumberOfDaysFromBeginnigOfYear(issueDate)) + 1)).slice(-3);

    document.getElementById('inputDD').value = birthDate.slice(-2, -1) + getRandomLetter() + s + birthDate.slice(-1)
        + lastName[0] + firstName[0] + issueDate.slice(-2) + d + sex
        + expiryDate.slice(-2) + expiryDate.slice(2,4) + get_letter_corresponding_month(expiryDate.slice(0,2));
}



/*
 $$$$  $$      $$$$  $$$$$   $$$$  $$   $  $$$$ 
$$  $$ $$     $$  $$ $$  $$ $$  $$ $$$ $$ $$  $$
$$$$$$ $$     $$$$$$ $$$$$  $$$$$$ $$ $ $ $$$$$$
$$  $$ $$     $$  $$ $$  $$ $$  $$ $$   $ $$  $$
$$  $$ $$$$$$ $$  $$ $$$$$  $$  $$ $$   $ $$  $$
*/

// ============== ALABAMA (AL) ============== //

function AL_calculate_documentNumber() {
    document.getElementById('inputDocumentNumber').value = getRandomNumericString(7);
}

function AL_calculate_ICN() {
    document.getElementById("inputICN").value = "0000000000" + getRandomNumericString(7) + "401";
}

function makeRandomDOE_AL() {
    var date = "";
    var dateOfIssue = document.getElementById("inputIssueDate").value;
    if (dateOfIssue.length == 8) { 
        date += dateOfIssue.slice(0, 2); // same month
        date += ("0" + (parseInt(dateOfIssue.slice(2, 4)) - 1)).slice(-2); // previos day        
        date += parseInt(dateOfIssue.slice(-4)) + 4;  // year += 4
    }
    
    document.getElementById("inputExpiryDate").value = date
}


/*
$$$$$$ $$      $$$$  $$$$$  $$$$$$ $$$$$   $$$$ 
$$     $$     $$  $$ $$  $$   $$   $$  $$ $$  $$
$$$$   $$     $$  $$ $$$$$    $$   $$  $$ $$$$$$
$$     $$     $$  $$ $$  $$   $$   $$  $$ $$  $$
$$     $$$$$$  $$$$  $$  $$ $$$$$$ $$$$$  $$  $$
*/

// =============== FLORIDA (FL) ============== //

function FL_calculate_documentNumber() {
    document.getElementById('inputDocumentNumber').value = getRandomLetter() + getRandomNumericString(12);
}

function FL_calculate_ICN() {
    document.getElementById("inputICN").value = "0100" + getRandomNumericString(12);
}

function FL_calculate_DD() {
    var issueDate = document.getElementById("inputIssueDate").value;
    if (issueDate.length != 8) {
        showInputDataAlert("DD calculation error. Incorrect issue date!")
        return;
    }

    document.getElementById("inputDD").value = getRandomLetter() + getRandomNumericString(2) 
    + issueDate.slice(-2) + issueDate.slice(0, 2) + issueDate.slice(2, 4) + getRandomNumericString(4);
}



/*
$$$$$$ $$$$$ $$  $$  $$$$   $$$$ 
  $$   $$     $$$$  $$  $$ $$
  $$   $$$$    $$   $$$$$$  $$$$
  $$   $$     $$$$  $$  $$     $$
  $$   $$$$$ $$  $$ $$  $$  $$$$
*/

// ======== TEXAS (TX) ======== //

function TX_calculate_documentNumber() {
    document.getElementById('inputDocumentNumber').value = getRandomNumericString(8);
}

function TX_calculate_DD_improved() {
    var issueDate = document.getElementById("inputIssueDate").value;
    if (issueDate.length != 8) {
        showInputDataAlert("DD calculation error. Incorrect issue date!")
        return;
    }

    year = issueDate.slice(-2)
    month = issueDate.slice(0,2)
    day = issueDate.slice(2,4)

    console.log(day)
    document.getElementById("inputDD").value = '006' + year[0] + '9' + year[1] + '8' + month[0] + '0' + month[1] + '5' + day[0] + '0' + day[1] + getRandomNumericString(6);
}


function TX_calculate_DD() {
    document.getElementById("inputDD").value = getRandomNumericString(20);
}

function TX_2016_calculate_ICN() {
    var documentNumber = document.getElementById("inputDocumentNumber").value;
    if (documentNumber.length != 8) {
        showInputDataAlert("ICN calculation error. Incorrect document number!")
        return;
    }

    var issueDate = document.getElementById("inputIssueDate").value;
    if (issueDate.length != 8) {
        showInputDataAlert("ICN calculation error. Incorrect issue date!")
        return;
    }

    var issueDateDATE = new Date(parseInt(issueDate.slice(-4)), parseInt(issueDate.slice(0, 2)) - 1, parseInt(issueDate.slice(2, 4)));
    issueDateDATE.setDate(issueDateDATE.getDate() + 1)
    
    // Get year, month, and day part from the date
    var year = issueDateDATE.toLocaleString("default", { year: "numeric" });
    var month = issueDateDATE.toLocaleString("default", { month: "2-digit" });
    var day = issueDateDATE.toLocaleString("default", { day: "2-digit" });

    // Generate yyyy-mm-dd date string
    var formattedDate = year + month + day;

    document.getElementById("inputICN").value = documentNumber + "  " + formattedDate;
}

function TX_2020_calculate_ICN() {
    document.getElementById("inputICN").value = "10000" + getRandomNumericString(6);
}


/*
$$$$$$ $$     $$     $$$$$$ $$  $$  $$$$  $$$$$$  $$$$
  $$   $$     $$       $$   $$$ $$ $$  $$   $$   $$
  $$   $$     $$       $$   $$ $$$ $$  $$   $$    $$$$
  $$   $$     $$       $$   $$  $$ $$  $$   $$       $$
$$$$$$ $$$$$$ $$$$$$ $$$$$$ $$  $$  $$$$  $$$$$$  $$$$
*/

// ================== ILLINOIS (IL) ================= //

function IL_calculate_documentNumber() {
    var lastName = document.getElementById("inputLastName").value;
    if (lastName == '') {
        showInputDataAlert("Document number calculation error. Last Name is not specified!")
        return;
    }
    
    document.getElementById('inputDocumentNumber').value = lastName[0].toUpperCase() + getRandomNumericString(11);
}

function IL_calculate_ICN() {
    var documentNumber = document.getElementById("inputDocumentNumber").value;
    if (documentNumber.length != 12) {
        showInputDataAlert("ICN calculation error. Incorrect document number!")
        return;
    }

    document.getElementById("inputICN").value = documentNumber + "IL"
     + getRandomLetter() + getRandomLetterAndDigit() + getRandomLetter() + getRandomLetter() + "01"
}


function IL_calculate_DD() {
    var issueDate = document.getElementById("inputIssueDate").value;
    if (issueDate.length != 8) {
        showInputDataAlert("DD calculation error. Incorrect issue date!")
        return;
    }

    document.getElementById("inputDD").value = issueDate.slice(-4) + issueDate.slice(0,2) + issueDate.slice(2,4)
     + getRandomNumericString(3) + getRandomLetter() + getRandomLetter() + getRandomNumericString(4);
}


/*
$$   $  $$$$   $$$$  $$  $$ $$$$$$ $$  $$  $$$$  $$$$$$  $$$$  $$  $$
$$   $ $$  $$ $$     $$  $$   $$   $$$ $$ $$       $$   $$  $$ $$$ $$
$$ $ $ $$$$$$  $$$$  $$$$$$   $$   $$ $$$ $$ $$$   $$   $$  $$ $$ $$$
$$$$$$ $$  $$     $$ $$  $$   $$   $$  $$ $$  $$   $$   $$  $$ $$  $$
 $$ $$ $$  $$  $$$$  $$  $$ $$$$$$ $$  $$  $$$$    $$    $$$$  $$  $$
*/

// ================== WASHINGTON (WA) ================== //


function WA_calculate_documentNumber() {
    var random_string = "";
    for (var i = 0; i < 8; i++) { random_string += getRandomLetterAndDigit(); }
    document.getElementById('inputDocumentNumber').value = "WDL" + random_string + "B";
}

function WA_calculate_DD() {
    var documentNumber = document.getElementById("inputDocumentNumber").value;
    if (documentNumber.length != 12) {
        showInputDataAlert("DD calculation error. Incorrect document number!")
        return;
    }

    var auditInfo = document.getElementById("inputAudit").value;
    if (auditInfo.length != 13) {
        showInputDataAlert("DD calculation error. Incorrect audit information!")
        return;
    }

    document.getElementById("inputDD").value = documentNumber + auditInfo;
}

function WA_calculate_AUDIT() {
    var issueDate = document.getElementById("inputIssueDate").value;
    if (issueDate.length != 8) {
        showInputDataAlert("Audit information calculation error. Incorrect issue date!")
        return;
    }

    document.getElementById("inputAudit").value = getRandomLetter()
    + issueDate.slice(0,2) + issueDate.slice(2,4) + issueDate.slice(-2) + "98" + getRandomNumericString(4);
}


/*
_$$$$_ $$$$$ _$$$$_ $$$$$_ _$$$$_ $$$$$$ _$$$$_     _$$$$_ _$$$$_ __$$ _$$$$_
$$____ $$___ $$__$$ $$__$$ $$____ __$$__ $$__$$     $$__$$ $$__$$ $$$$ $$__$$
$$_$$$ $$$$_ $$__$$ $$$$$_ $$_$$$ __$$__ $$$$$$     ___$$_ $$__$$ __$$ _$$$$$
$$__$$ $$___ $$__$$ $$__$$ $$__$$ __$$__ $$__$$     _$$___ $$__$$ __$$ ____$$
_$$$$_ $$$$$ _$$$$_ $$__$$ _$$$$_ $$$$$$ $$__$$     $$$$$$ _$$$$_ __$$ _$$$$_
*/


// ============================= GEORGIA (GA) ============================ //


function GA_calculate_documentNumber() {
    document.getElementById('inputDocumentNumber').value = "0" + getRandomNumericString(8);
}

function GA_calculate_ICN() {
    document.getElementById("inputICN").value = "1000" + getRandomNumericString(7);
}

function GA_calculate_DD() {
    document.getElementById("inputDD").value = getRandomNumericString(11) + "00" + getRandomNumericString(5);
}

function GA_calculate_ICN_2015() {
    document.getElementById("inputICN").value = "2" + getRandomNumericString(9) + "100401";
}

function GA_calculate_DD_2015() {

    var icn = document.getElementById("inputICN").value;
    if (icn.length != 16) {
        showInputDataAlert("DD calculation error. Incorrect ICN!")
        return;
    }

    document.getElementById("inputDD").value = icn.slice(0, -2) +  getRandomNumericString(4);
}



/*
 $$$$  $$  $$ $$$$$$  $$$$
$$  $$ $$  $$   $$   $$  $$
$$  $$ $$$$$$   $$   $$  $$
$$  $$ $$  $$   $$   $$  $$
 $$$$  $$  $$ $$$$$$  $$$$
*/


// ===== OHIO (OH) ===== //


function OH_calculate_documentNumber() {
    document.getElementById('inputDocumentNumber').value = getRandomLetter() + getRandomLetter() + getRandomNumericString(6);
}

function OH_calculate_ICN() {
    document.getElementById("inputICN").value = getRandomLetter() + getRandomNumericString(8);
}

function OH_calculate_DD() {
    document.getElementById("inputDD").value = "0" + getRandomNumericString(7) + "0";
}



/*
 $$$$   $$$$  $$      $$$$  $$$$$   $$$$  $$$$$   $$$$
$$  $$ $$  $$ $$     $$  $$ $$  $$ $$  $$ $$  $$ $$  $$
$$     $$  $$ $$     $$  $$ $$$$$  $$$$$$ $$  $$ $$  $$
$$  $$ $$  $$ $$     $$  $$ $$  $$ $$  $$ $$  $$ $$  $$
 $$$$   $$$$  $$$$$$  $$$$  $$  $$ $$  $$ $$$$$   $$$$
*/


// ================== COLORADO (CO) ================= //


function CO_calculate_documentNumber() {
    document.getElementById('inputDocumentNumber').value = getRandomNumericString(9);
}

function CO_calculate_DD() {
    document.getElementById("inputDD").value = getRandomNumericString(7);
}


function CO_calculate_AUDIT() {
    var issueDate = document.getElementById("inputIssueDate").value;
    if (issueDate.length != 8) {
        showInputDataAlert("Audit information calculation error. Incorrect issue date!")
        return;
    }

    var issueDateDATE = new Date(parseInt(issueDate.slice(-4)), parseInt(issueDate.slice(0, 2)) - 1, parseInt(issueDate.slice(2, 4)));
    issueDateDATE.setDate(issueDateDATE.getDate() + 1)

    // Get year, month, and day part from the date
    var year = issueDateDATE.toLocaleString("default", { year: "2-digit" });
    var month = issueDateDATE.toLocaleString("default", { month: "2-digit" });
    var day = issueDateDATE.toLocaleString("default", { day: "2-digit" });

    // Generate yyyy-mm-dd date string
    var formattedDate = month + day + year;

    document.getElementById("inputAudit").value = "CODL_0_" + formattedDate + "_" + getRandomNumericString(5);
}



/*
 $$$$  $$$$$  $$$$$$ $$$$$$  $$$$  $$  $$  $$$$
$$  $$ $$  $$   $$      $$  $$  $$ $$$ $$ $$  $$
$$$$$$ $$$$$    $$     $$   $$  $$ $$ $$$ $$$$$$
$$  $$ $$  $$   $$    $$    $$  $$ $$  $$ $$  $$
$$  $$ $$  $$ $$$$$$ $$$$$$  $$$$  $$  $$ $$  $$
*/

// =============== ARIZONA (AZ) ============== //

function AZ_makeRandomDOE() {
    var dateOfBirth = document.getElementById("inputBrithDate").value;
    if (!dateOfBirth) {
        makeRandomDOB();
        dateOfBirth = document.getElementById("inputBrithDate").value;
    }

    if (dateOfBirth.length > 4) {
        date = dateOfBirth.slice(0,4);
    } else { return; }

    var dateOfIssue = document.getElementById("inputIssueDate").value;

    dob_year = parseInt(dateOfBirth.slice(-4));
    issue_year = (dob_year + 65).toString();

    document.getElementById("inputExpiryDate").value = dateOfBirth.slice(0,4) + issue_year;
}

function AZ_calculate_documentNumber() {
    document.getElementById('inputDocumentNumber').value = "D" + getRandomNumericString(8);
}

function AZ_calculate_ICN() {
    var issueDate = document.getElementById("inputIssueDate").value;
    if (issueDate.length != 8) {
        showInputDataAlert("ICN calculation error. Incorrect issue date!")
        return;
    }

    document.getElementById("inputICN").value = issueDate.slice(-2) + getNumberOfDaysFromBeginnigOfYear(issueDate) + "AZ00" + getRandomNumericString(7) + "0301"
}

function AZ_calculate_DD() {
    var birthDate = document.getElementById("inputBrithDate").value;
    if (birthDate.length != 8) {
        showInputDataAlert("DD calculation error. Incorrect birth date!")
        return;
    }

    var firstName = document.getElementById("inputFirstName").value;
    if (!firstName.length) {
        showInputDataAlert("DD calculation error. Incorrect First name!")
        return;
    }

    var lastName = document.getElementById("inputLastName").value;
    if (!lastName.length) {
        showInputDataAlert("DD calculation error. Incorrect Last name!")
        return;
    }

    document.getElementById("inputDD").value = getRandomNumericString(4) + getRandomLetter() + getRandomLetter()
    + getRandomNumericString(3) + lastName.slice(0,1) + getRandomNumericString(4) + firstName.slice(0,1) + birthDate.slice(-1);
}


/*
$$$$$  $$$$$ $$  $$ $$  $$  $$$$  $$  $$ $$     $$  $$  $$$$  $$  $$ $$$$$$  $$$$
$$  $$ $$    $$$ $$ $$$ $$ $$      $$$$  $$     $$  $$ $$  $$ $$$ $$   $$   $$  $$
$$$$$  $$$$  $$ $$$ $$ $$$  $$$$    $$   $$     $$  $$ $$$$$$ $$ $$$   $$   $$$$$$
$$     $$    $$  $$ $$  $$     $$   $$   $$      $$$$  $$  $$ $$  $$   $$   $$  $$
$$     $$$$$ $$  $$ $$  $$  $$$$    $$   $$$$$$   $$   $$  $$ $$  $$ $$$$$$ $$  $$
*/

// ============================== PENNSYLVANIA (PA) ============================ //


function PA_calculate_documentNumber() {
    document.getElementById('inputDocumentNumber').value = getRandomNumericString(8);
}

function PA_calculate_ICN() {
    var issueDate = document.getElementById("inputIssueDate").value;
    if (issueDate.length != 8) {
        showInputDataAlert("ICN calculation error. Incorrect issue date!")
        return;
    }

    document.getElementById("inputICN").value = "02500" + getRandomNumericString(6) + issueDate.slice(-2) + getRandomNumericString(3);
}

function PA_calculate_DD() {
    var issueDate = document.getElementById("inputIssueDate").value;
    if (issueDate.length != 8) {
        showInputDataAlert("DD calculation error. Incorrect issue date!")
        return;
    }

    document.getElementById("inputDD").value = issueDate.slice(-2) + getNumberOfDaysFromBeginnigOfYear(issueDate)+ getRandomNumericString(10) + "00000" + getRandomNumericString(5);
}


/*
$$  $$  $$$$  $$$$$  $$$$$$ $$  $$     $$$$   $$$$  $$$$$   $$$$  $$     $$$$$$ $$  $$  $$$$
$$$ $$ $$  $$ $$  $$   $$   $$  $$    $$  $$ $$  $$ $$  $$ $$  $$ $$       $$   $$$ $$ $$  $$
$$ $$$ $$  $$ $$$$$    $$   $$$$$$    $$     $$$$$$ $$$$$  $$  $$ $$       $$   $$ $$$ $$$$$$
$$  $$ $$  $$ $$  $$   $$   $$  $$    $$  $$ $$  $$ $$  $$ $$  $$ $$       $$   $$  $$ $$  $$
$$  $$  $$$$  $$  $$   $$   $$  $$     $$$$  $$  $$ $$  $$  $$$$  $$$$$$ $$$$$$ $$  $$ $$  $$
*/


// ================================== NORTH CAROLINA (NC) ================================= //


function NC_calculate_documentNumber() {
    document.getElementById('inputDocumentNumber').value = "00000" + getRandomNumericString(7);
}

function NC_calculate_ICN() {
    var documentNumber = document.getElementById("inputDocumentNumber").value;
    if (documentNumber.length != 12) {
        showInputDataAlert("ICN calculation error. Incorrect document number!")
        return;
    }

    document.getElementById("inputICN").value = documentNumber + "NC"
    + getRandomLetterAndDigit() + getRandomLetterAndDigit() + getRandomLetterAndDigit() + getRandomLetterAndDigit() + "01";
}

function NC_calculate_DD() {
    document.getElementById("inputDD").value = "001" + getRandomNumericString(7);
}



/*
$$   $  $$$$   $$$$   $$$$   $$$$   $$$$  $$  $$ $$  $$  $$$$  $$$$$ $$$$$$ $$$$$$  $$$$
$$$ $$ $$  $$ $$     $$     $$  $$ $$  $$ $$  $$ $$  $$ $$     $$      $$     $$   $$
$$ $ $ $$$$$$  $$$$   $$$$  $$$$$$ $$     $$$$$$ $$  $$  $$$$  $$$$    $$     $$    $$$$
$$   $ $$  $$     $$     $$ $$  $$ $$  $$ $$  $$ $$  $$     $$ $$      $$     $$       $$
$$   $ $$  $$  $$$$   $$$$  $$  $$  $$$$  $$  $$  $$$$   $$$$  $$$$$   $$     $$    $$$$
*/


function MA_calculate_documentNumber() {
    document.getElementById('inputDocumentNumber').value = "S" + getRandomNumericString(8);
}

function MA_calculate_ICN() {
    var documentNumber = document.getElementById("inputDocumentNumber").value;
    if (documentNumber.length != 9) {
        showInputDataAlert("ICN calculation error. Incorrect document number!")
        return;
    }

    var issueDate = document.getElementById("inputIssueDate").value;
    if (issueDate.length != 8) {
        showInputDataAlert("ICN calculation error. Incorrect issue date!")
        return;
    }

    document.getElementById("inputICN").value = issueDate.slice(-2) + getNumberOfDaysFromBeginnigOfYear(issueDate) + documentNumber + "0601";
}

function MA_calculate_DD() {
    var issueDate = document.getElementById("inputIssueDate").value;
    if (issueDate.length != 8) {
        showInputDataAlert("DD calculation error. Incorrect issue date!")
        return;
    }

    document.getElementById("inputDD").value = issueDate + " REV 02222016";
}



/*
 $$$$   $$$$  $$  $$ $$  $$ $$$$$  $$$$  $$$$$$ $$$$$$  $$$$  $$  $$ $$$$$$
$$  $$ $$  $$ $$$ $$ $$$ $$ $$    $$  $$   $$     $$   $$  $$ $$  $$   $$
$$     $$  $$ $$ $$$ $$ $$$ $$$$  $$       $$     $$   $$     $$  $$   $$
$$  $$ $$  $$ $$  $$ $$  $$ $$    $$  $$   $$     $$   $$  $$ $$  $$   $$
 $$$$   $$$$  $$  $$ $$  $$ $$$$$  $$$$    $$   $$$$$$  $$$$   $$$$    $$
*/


function CT_calculate_documentNumber() {
    var birthDate = document.getElementById("inputBrithDate").value;
    if (birthDate.length != 8) {
        showInputDataAlert("Document number calculation error. Incorrect birth date!")
        return;
    }

    document.getElementById('inputDocumentNumber').value = get_month_number(birthDate) + getRandomNumericString(7);
}

function CT_calculate_ICN() {
    var documentNumber = document.getElementById("inputDocumentNumber").value;
    if (documentNumber.length != 9) {
        showInputDataAlert("ICN calculation error. Incorrect document number!")
        return;
    }

    document.getElementById("inputICN").value = documentNumber + "CT" + getRandomDigit() + getRandomLetter() + getRandomLetter() + getRandomLetter() + "01";
}

function CT_calculate_DD() {
    var issueDate = document.getElementById("inputIssueDate").value;
    if (issueDate.length != 8) {
        showInputDataAlert("DD calculation error. Incorrect issue date!")
        return;
    }

    document.getElementById("inputDD").value = issueDate.slice(-2) + issueDate.slice(0,2) + issueDate.slice(2,4) 
    + getRandomNumericString(6) + "01" + "MV" + getRandomLetter() + getRandomDigit();
}



/*
 $$$$  $$$$$  $$$$$  $$$$   $$$$  $$  $$
$$  $$ $$  $$ $$    $$     $$  $$ $$$ $$
$$  $$ $$$$$  $$$$  $$ $$$ $$  $$ $$ $$$
$$  $$ $$  $$ $$    $$  $$ $$  $$ $$  $$
 $$$$  $$  $$ $$$$$  $$$$   $$$$  $$  $$
*/


function OR_calculate_documentNumber() {
    document.getElementById('inputDocumentNumber').value = getRandomNumericString(7);
}

function OR_calculate_ICN() {
    document.getElementById("inputICN").value = "AA" + getRandomNumericString(7);
}

function OR_calculate_DD() {
    document.getElementById("inputDD").value = "200"  + getRandomNumericString(6);
}



/*
$$  $$ $$$$$ $$  $$  $$$$  $$$$$   $$$$
$$$ $$ $$    $$  $$ $$  $$ $$  $$ $$  $$
$$ $$$ $$$$  $$  $$ $$$$$$ $$  $$ $$$$$$
$$  $$ $$     $$$$  $$  $$ $$  $$ $$  $$
$$  $$ $$$$$   $$   $$  $$ $$$$$  $$  $$
*/


function NV_calculate_documentNumber() {
    document.getElementById('inputDocumentNumber').value = "1" + getRandomNumericString(9);
}

function NV_calculate_ICN() {
    document.getElementById("inputICN").value = "0015" + getRandomNumericString(7) + "01";
}

function NV_2021_calculate_ICN() {
    document.getElementById("inputICN").value = "0019" + getRandomNumericString(7) + "01";
}


function NV_calculate_DD() {
    document.getElementById("inputDD").value = "0001" + getRandomNumericString(17);
}



/*
$$  $$ $$$$$ $$   $    $$  $$  $$$$  $$$$$  $$  $$
$$$ $$ $$    $$   $     $$$$  $$  $$ $$  $$ $$ $$
$$ $$$ $$$$  $$ $ $      $$   $$  $$ $$$$$  $$$$
$$  $$ $$    $$$$$$      $$   $$  $$ $$  $$ $$ $$
$$  $$ $$$$$  $$ $$      $$    $$$$  $$  $$ $$  $$
*/


function NY_calculate_documentNumber() {
    document.getElementById('inputDocumentNumber').value = "7" + getRandomNumericString(8);
}


function NY_calculate_DD() {
    s = ""
    for (var i = 0; i < 8; i++) { s += getRandomLetterAndDigit(); }
    document.getElementById("inputDD").value = s + "06";
}



/*
$$   $  $$$$  $$$$$$ $$  $$ $$$$$
$$$ $$ $$  $$   $$   $$$ $$ $$
$$ $ $ $$$$$$   $$   $$ $$$ $$$$
$$   $ $$  $$   $$   $$  $$ $$
$$   $ $$  $$ $$$$$$ $$  $$ $$$$$
*/


function ME_calculate_documentNumber() {
    document.getElementById('inputDocumentNumber').value = getRandomNumericString(7);
}

function ME_calculate_ICN() {
    var documentNumber = document.getElementById("inputDocumentNumber").value;
    if (documentNumber.length != 7) {
        showInputDataAlert("ICN calculation error. Incorrect document number!")
        return;
    }

    var issueDate = document.getElementById("inputIssueDate").value;
    if (issueDate.length != 8) {
        showInputDataAlert("ICN calculation error. Incorrect issue date!")
        return;
    }

    d = ("00" + (parseInt(getNumberOfDaysFromBeginnigOfYear(issueDate)) + 4)).slice(-3);

    document.getElementById("inputICN").value = "F" + issueDate.slice(-2) + d + documentNumber + "0101";
}

function ME_calculate_DD() {
    document.getElementById("inputDD").value = "00000000000000000" + getRandomNumericString(8);
}



/*
$$   $ $$$$$$ $$  $$ $$  $$ $$$$$  $$$$   $$$$  $$$$$$  $$$$
$$$ $$   $$   $$$ $$ $$$ $$ $$    $$     $$  $$   $$   $$  $$
$$ $ $   $$   $$ $$$ $$ $$$ $$$$   $$$$  $$  $$   $$   $$$$$$
$$   $   $$   $$  $$ $$  $$ $$        $$ $$  $$   $$   $$  $$
$$   $ $$$$$$ $$  $$ $$  $$ $$$$$  $$$$   $$$$    $$   $$  $$
*/


function MN_calculate_documentNumber() {
    document.getElementById('inputDocumentNumber').value = getRandomLetter() + getRandomNumericString(12);
}

function MN_calculate_ICN() {
    var documentNumber = document.getElementById("inputDocumentNumber").value;
    if (documentNumber.length != 13) {
        showInputDataAlert("ICN calculation error. Incorrect document number!")
        return;
    }

    var issueDate = document.getElementById("inputIssueDate").value;
    if (issueDate.length != 8) {
        showInputDataAlert("ICN calculation error. Incorrect issue date!")
        return;
    }

    d = ("00" + (parseInt(getNumberOfDaysFromBeginnigOfYear(issueDate)) + 3)).slice(-3);

    document.getElementById("inputICN").value = documentNumber + "01" + d + "01";
}

function MN_calculate_DD() {
    document.getElementById("inputDD").value = "0000000" + getRandomNumericString(7);
}



/*
$$  $$  $$$$  $$$$$  $$$$$$ $$  $$      $$$$$   $$$$  $$  $$  $$$$  $$$$$$  $$$$
$$$ $$ $$  $$ $$  $$   $$   $$  $$      $$  $$ $$  $$ $$ $$  $$  $$   $$   $$  $$
$$ $$$ $$  $$ $$$$$    $$   $$$$$$      $$  $$ $$$$$$ $$$$   $$  $$   $$   $$$$$$
$$  $$ $$  $$ $$  $$   $$   $$  $$      $$  $$ $$  $$ $$ $$  $$  $$   $$   $$  $$
$$  $$  $$$$  $$  $$   $$   $$  $$      $$$$$  $$  $$ $$  $$  $$$$    $$   $$  $$
*/


function ND_calculate_documentNumber() {
    var birthDate = document.getElementById("inputBrithDate").value;
    if (birthDate.length != 8) {
        showInputDataAlert("Document number calculation error. Incorrect birth date!")
        return;
    }

    var lastName = document.getElementById("inputLastName").value;
    if (!lastName) {
        showInputDataAlert("Document number calculation error. Incorrect Last name!")
        return;
    }

    lastName += "XX"

    document.getElementById('inputDocumentNumber').value = lastName.slice(0,3).toUpperCase() + birthDate.slice(-2) + getRandomNumericString(4);
}

function ND_calculate_ICN() {
    document.getElementById("inputICN").value = "034001" + getRandomNumericString(10);
}

function ND_calculate_DD() {
    var birthDate = document.getElementById("inputBrithDate").value;
    if (birthDate.length != 8) {
        showInputDataAlert("DD calculation error. Incorrect birth date!")
        return;
    }

    var documentNumber = document.getElementById("inputDocumentNumber").value;
    if (documentNumber.length != 9) {
        showInputDataAlert("DD calculation error. Incorrect document number!")
        return;
    }

    var lastName = document.getElementById("inputLastName").value;
    if (!lastName) {
        showInputDataAlert("DD calculation error. Incorrect Last name!")
        return;
    }

    var firstName = document.getElementById("inputFirstName").value;
    if (!firstName) {
        showInputDataAlert("DD calculation error. Incorrect First name!")
        return;
    }

    document.getElementById('inputDD').value = birthDate.slice(-2, -1) + documentNumber + lastName[0] + firstName[0]
        + getRandomNumericString(5) + getRandomLetter().toLowerCase() + getRandomLetter() + getRandomNumericString(2) + "NDZ";
}

function ND_calculate_optionNumber() {
    document.getElementById('inputOption').value = getRandomNumericString(3);
}



/*
$$  $$ $$$$$ $$$$$  $$$$$   $$$$   $$$$  $$  $$  $$$$
$$$ $$ $$    $$  $$ $$  $$ $$  $$ $$     $$ $$  $$  $$
$$ $$$ $$$$  $$$$$  $$$$$  $$$$$$  $$$$  $$$$   $$$$$$
$$  $$ $$    $$  $$ $$  $$ $$  $$     $$ $$ $$  $$  $$
$$  $$ $$$$$ $$$$$  $$  $$ $$  $$  $$$$  $$  $$ $$  $$
*/

function NE_calculate_documentNumber() {
    const alphabet = "ABCEGHV";

    document.getElementById('inputDocumentNumber').value = alphabet[Math.floor(Math.random() * alphabet.length)] + getRandomNumericString(8);
}

function NE_2021_calculate_ICN() {
    var documentNumber = document.getElementById("inputDocumentNumber").value;
    if (documentNumber.length != 9) {
        showInputDataAlert("DD calculation error. Incorrect document number!")
        return;
    }

    document.getElementById("inputICN").value = documentNumber + "NETYCO01";
    NE_2021_calculate_DD()
}

function NE_2021_calculate_DD() {
    var icn = document.getElementById("inputICN").value;
    if (icn.length != 17) {
        showInputDataAlert("DD calculation error. Incorrect ICN!")
        return;
    }

    document.getElementById("inputDD").value = "054" + icn + getRandomNumericString(5);
}


function NE_calculate_ICN() {
    document.getElementById("inputICN").value = "0540000" + getRandomNumericString(4) + "00000";
    document.getElementById("inputDD").value = document.getElementById("inputICN").value;
}

function NE_calculate_DD() {
    var icn = document.getElementById("inputICN").value;
    if (icn.length != 16) {
        showInputDataAlert("DD calculation error. Incorrect ICN!")
        return;
    }

    document.getElementById("inputDD").value = icn;
}



/*
$$  $$ $$$$$ $$   $     $$  $$  $$$$  $$   $ $$$$$   $$$$  $$  $$ $$$$$$ $$$$$  $$$$$
$$$ $$ $$    $$   $     $$  $$ $$  $$ $$$ $$ $$  $$ $$     $$  $$   $$   $$  $$ $$
$$ $$$ $$$$  $$ $ $     $$$$$$ $$$$$$ $$ $ $ $$$$$   $$$$  $$$$$$   $$   $$$$$  $$$$
$$  $$ $$    $$$$$$     $$  $$ $$  $$ $$   $ $$         $$ $$  $$   $$   $$  $$ $$
$$  $$ $$$$$  $$ $$     $$  $$ $$  $$ $$   $ $$      $$$$  $$  $$ $$$$$$ $$  $$ $$$$$
*/



function NH_calculate_documentNumber() {
    document.getElementById('inputDocumentNumber').value = "NHL" + getRandomNumericString(8);
}

function NH_calculate_ICN() {
    document.getElementById("inputICN").value = "0" + getRandomNumericString(7);
    document.getElementById("inputDD").value = document.getElementById("inputICN").value;
}

function NH_calculate_DD() {
    var icn = document.getElementById("inputICN").value;
    if (icn.length != 8) {
        showInputDataAlert("DD calculation error. Incorrect ICN!")
        return;
    }

    document.getElementById("inputDD").value = icn;
}



/*
 $$$$   $$$$  $$  $$ $$$$$$ $$  $$     $$$$   $$$$  $$$$$   $$$$  $$     $$$$$$ $$  $$  $$$$
$$     $$  $$ $$  $$   $$   $$  $$    $$  $$ $$  $$ $$  $$ $$  $$ $$       $$   $$$ $$ $$  $$
 $$$$  $$  $$ $$  $$   $$   $$$$$$    $$     $$$$$$ $$$$$  $$  $$ $$       $$   $$ $$$ $$$$$$
    $$ $$  $$ $$  $$   $$   $$  $$    $$  $$ $$  $$ $$  $$ $$  $$ $$       $$   $$  $$ $$  $$
 $$$$   $$$$   $$$$    $$   $$  $$     $$$$  $$  $$ $$  $$  $$$$  $$$$$$ $$$$$$ $$  $$ $$  $$
*/


function SC_calculate_documentNumber() {
    document.getElementById('inputDocumentNumber').value = "10" + getRandomNumericString(7);
}

function SC_calculate_DD() {
    var expiryDate = document.getElementById("inputExpiryDate").value;
    if (expiryDate.length != 8) {
        showInputDataAlert("DD calculation error. Incorrect expiry date!")
        return;
    }

    document.getElementById("inputDD").value = getRandomNumericString(8)
        + expiryDate.slice(0,2) + expiryDate.slice(-2) + getNumberOfDaysFromBeginnigOfYear(expiryDate)
        + getRandomNumericString(4);
}



/*
$$$$$$ $$$$$ $$  $$ $$  $$ $$$$$  $$$$   $$$$  $$$$$ $$$$$
  $$   $$    $$$ $$ $$$ $$ $$    $$     $$     $$    $$
  $$   $$$$  $$ $$$ $$ $$$ $$$$   $$$$   $$$$  $$$$  $$$$
  $$   $$    $$  $$ $$  $$ $$        $$     $$ $$    $$
  $$   $$$$$ $$  $$ $$  $$ $$$$$  $$$$   $$$$  $$$$$ $$$$$
*/

// ========================== Nennessee (TN) =========================== //


function TN_calculate_documentNumber() {
    document.getElementById('inputDocumentNumber').value = getRandomInt(2).toString() + getRandomNumericString(8);
}

function TN_calculate_ICN() {
    var issueDate = document.getElementById("inputIssueDate").value;
    if (issueDate.length != 8) {
        showInputDataAlert("ICN calculation error. Incorrect issue date!")
        return;
    }

    document.getElementById("inputICN").value = issueDate.slice(-2) + getNumberOfDaysFromBeginnigOfYear(issueDate) + getRandomNumericString(9) + "0101"
}

function TN_calculate_DD() {
    var issueDate = document.getElementById("inputIssueDate").value;
    if (issueDate.length != 8) {
        showInputDataAlert("ICN calculation error. Incorrect issue date!")
        return;
    }

    document.getElementById("inputDD").value = getRandomNumericString(2) + "0"
     + issueDate.slice(-2) + issueDate.slice(0,2) + issueDate.slice(2,4) + getRandomNumericString(7);
}


function TN_calculate_REAL_ID(alert) {
    var issueDate = document.getElementById("inputIssueDate").value;
    if (issueDate.length != 8) {
        if (alert) { showInputDataAlert("REAL ID calculation error. Incorrect issue date!"); }
        return;
    }

    var inputDateObject = new Date(
        parseInt(issueDate.substr(4, 4)),
        parseInt(issueDate.substr(0, 2)) - 1,
        parseInt(issueDate.substr(2, 2))
      );

      var comparisonDate = new Date(2019, 6, 1);

      if (inputDateObject >= comparisonDate) {
        document.getElementById("inputIsRealID").value = "F";
      } else {
        document.getElementById("inputIsRealID").value = "N";
      }
}


/*
$$  $$ $$$$$$ $$$$$   $$$$  $$$$$$ $$  $$ $$$$$$  $$$$
$$  $$   $$   $$  $$ $$       $$   $$$ $$   $$   $$  $$
$$  $$   $$   $$$$$  $$ $$$   $$   $$ $$$   $$   $$$$$$
 $$$$    $$   $$  $$ $$  $$   $$   $$  $$   $$   $$  $$
  $$   $$$$$$ $$  $$  $$$$  $$$$$$ $$  $$ $$$$$$ $$  $$
*/


// ========================== VIRGINIA (VA) =========================== //


function VA_calculate_documentNumber() {
    document.getElementById('inputDocumentNumber').value = getRandomLetter() + getRandomNumericString(8);
}

function VA_calculate_ICN() {
    document.getElementById("inputICN").value = "0060101" + getRandomNumericString(9);
}

function VA_calculate_DD() {
    document.getElementById("inputDD").value = "0" + getRandomNumericString(8);
}


/*
$$   $  $$$$  $$$$$  $$  $$ $$      $$$$  $$  $$ $$$$$
$$$ $$ $$  $$ $$  $$  $$$$  $$     $$  $$ $$$_$$ $$  $$
$$ $ $ $$$$$$ $$$$$    $$   $$     $$$$$$ $$ $$$ $$  $$
$$   $ $$  $$ $$  $$   $$   $$     $$  $$ $$  $$ $$  $$
$$   $ $$  $$ $$  $$   $$   $$$$$$_$$  $$ $$  $$ $$$$$
*/

function MD_calculate_documentNumber() {
    var lastName = document.getElementById("inputLastName").value;
    if (!lastName) {
        showInputDataAlert("Document number calculation error. Incorrect Last name!")
        return;
    }

    var firstName = document.getElementById("inputFirstName").value;
    if (!firstName) {
        showInputDataAlert("Document number calculation error. Incorrect First name!")
        return;
    }

    var middleName = document.getElementById("inputMiddleName").value;

    var birthDate = document.getElementById("inputBrithDate").value;
    if (birthDate.length != 8) {
        showInputDataAlert("DD calculation error. Incorrect birth date!")
        return;
    }

    document.getElementById('inputDocumentNumber').value = CalculateDL(lastName, middleName, firstName, birthDate, "MD");
}

function MD_calculate_ICN() {
    document.getElementById("inputICN").value = "100" + getRandomNumericString(7);
}

function MD_calculate_DD() {
    document.getElementById("inputDD").value = getRandomNumericString(6) + getRandomLetter() + getRandomLetter() + getRandomDigit();
}


/*
$$   $ $$$$$$  $$$$  $$  $$ $$$$$$  $$$$  $$$$  $$  $$
$$$ $$   $$   $$  $$ $$  $$   $$   $$     $$  $$ $$$ $$
$$ $ $   $$   $$     $$$$$$   $$   $$ $$$ $$$$$$ $$ $$$
$$   $   $$   $$  $$ $$  $$   $$   $$  $$ $$  $$ $$  $$
$$   $ $$$$$$  $$$$  $$  $$ $$$$$$  $$$$  $$  $$ $$  $$
*/

function MI_calculate_documentNumber() {
    var lastName = document.getElementById("inputLastName").value;
    if (!lastName) {
        showInputDataAlert("Document number calculation error. Incorrect Last name!")
        return;
    }

    var firstName = document.getElementById("inputFirstName").value;
    if (!firstName) {
        showInputDataAlert("Document number calculation error. Incorrect First name!")
        return;
    }

    var middleName = document.getElementById("inputMiddleName").value;

    var birthDate = document.getElementById("inputBrithDate").value;
    if (birthDate.length != 8) {
        showInputDataAlert("Document number calculation error. Incorrect birth date!")
        return;
    }

    document.getElementById('inputDocumentNumber').value = CalculateDL(lastName, middleName, firstName, birthDate, "MI");
}

function MI_calculate_ICN() {
    var birthDate = document.getElementById("inputBrithDate").value;
    if (birthDate.length != 8) {
        showInputDataAlert("ICN calculation error. Incorrect birth date!")
        return;
    }

    var expiryDate = document.getElementById("inputExpiryDate").value;
    if (expiryDate.length != 8) {
        showInputDataAlert("ICN calculation error. Incorrect expiry date!")
        return;
    }

    var documentNumber = document.getElementById("inputDocumentNumber").value;
    if (documentNumber.length != 17) {
        showInputDataAlert("ICN calculation error. Incorrect document number!")
        return;
    }

    document.getElementById("inputICN").value = documentNumber.replace(/\s/g, '')
     + birthDate.slice(-4) + birthDate.slice(0,2) + birthDate.slice(2,4) + expiryDate.slice(-4);
}


/*
$$  $$ $$$$$ $$   $    $$$$$$ $$$$$ $$$$$   $$$$  $$$$$ $$  $$
$$$ $$ $$    $$   $        $$ $$    $$  $$ $$     $$     $$$$
$$ $$$ $$$$  $$ $ $        $$ $$$$  $$$$$   $$$$  $$$$    $$
$$  $$ $$    $$$$$$    $$  $$ $$    $$  $$     $$ $$      $$
$$  $$ $$$$$  $$ $$     $$$$  $$$$$ $$  $$  $$$$  $$$$$   $$
*/


function NJ_2020_calculate_documentNumber() {


    var lastName = document.getElementById("inputLastName").value;
    if (!lastName) {
        showInputDataAlert("Document number calculation error. Incorrect Last name!")
        return;
    }

    var firstName = document.getElementById("inputFirstName").value;
    if (!firstName) {
        showInputDataAlert("Document number calculation error. Incorrect First name!")
        return;
    }

    var middleName = document.getElementById("inputMiddleName").value;

    var birthDate = document.getElementById("inputBrithDate").value;
    if (birthDate.length != 8) {
        showInputDataAlert("DD calculation error. Incorrect birth date!")
        return;
    }
    number = CalculateDL(lastName, middleName, firstName, birthDate, "NJ");
    rand = getRandomNumericString(4);

    document.getElementById('inputDocumentNumber').value = number.replace("????", rand).replace(/\s/g, '');

}

function NJ_2020_calculate_ICN() {
    var lastName = document.getElementById("inputLastName").value;
    if (!lastName) {
        showInputDataAlert("Document number calculation error. Incorrect Last name!")
        return;
    }

    var random_data = "";
    for (var i = 0; i < 9; i++) { random_data += getRandomLetterAndDigit(); }
    random_data += "NJ"
    random_data += getRandomNumericString(2)


    document.getElementById("inputICN").value = lastName[0] + random_data + "SL01"
}

function NJ_2020_calculate_DD() {

    var option1 = document.getElementById("inputOption1").value;
    if (!option1) {
        showInputDataAlert("DD calculation error. Incorrect option 1!")
        return;
    }

    var issueDate = document.getElementById("inputIssueDate").value;
    if (issueDate.length != 8) {
        showInputDataAlert("DD calculation error. Incorrect issue date!")
        return;
    }

    days = parseInt(getNumberOfDaysFromBeginnigOfYear(issueDate));
    console.log(days)

    document.getElementById("inputDD").value = option1.slice(-2) + issueDate.slice(-4) + ("00" + days.toString()).slice(-3)
     + "0000" + getRandomNumericString(4);
}


/*
$$   $ $$$$$$  $$$$   $$$$   $$$$  $$  $$  $$$$  $$$$$$ $$  $$
$$   $   $$   $$     $$  $$ $$  $$ $$$ $$ $$       $$   $$$ $$
$$ $ $   $$    $$$$  $$     $$  $$ $$ $$$  $$$$    $$   $$ $$$
$$$$$$   $$       $$ $$  $$ $$  $$ $$  $$     $$   $$   $$  $$
 $$ $$ $$$$$$  $$$$   $$$$   $$$$  $$  $$  $$$$  $$$$$$ $$  $$
*/

function WI_calculate_documentNumber() {
    var lastName = document.getElementById("inputLastName").value;
    if (!lastName) {
        showInputDataAlert("Document number calculation error. Incorrect Last name!")
        return;
    }

    var firstName = document.getElementById("inputFirstName").value;
    if (!firstName) {
        showInputDataAlert("Document number calculation error. Incorrect First name!")
        return;
    }

    var middleName = document.getElementById("inputMiddleName").value;

    var birthDate = document.getElementById("inputBrithDate").value;
    if (birthDate.length != 8) {
        showInputDataAlert("DD calculation error. Incorrect birth date!")
        return;
    }

    document.getElementById('inputDocumentNumber').value = CalculateDL(lastName, middleName, firstName, birthDate, "WI");
}

function WI_calculate_ICN() {
    document.getElementById("inputICN").value = "0130100" + getRandomNumericString(9);
}

function WI_calculate_DD() {
    var lastName = document.getElementById("inputLastName").value;
    if (!lastName) {
        showInputDataAlert("Document number calculation error. Incorrect Last name!")
        return;
    }

    var issueDate = document.getElementById("inputIssueDate").value;
    if (issueDate.length != 8) {
        showInputDataAlert("DD calculation error. Incorrect issue date!")
        return;
    }

    document.getElementById("inputDD").value = "OT" + lastName[0].toUpperCase() + getRandomLetter() + getRandomLetter()
    + issueDate.slice(-4) + issueDate.slice(0,2) + issueDate.slice(2,4) + sample(["10", "15"]) + getRandomNumericString(6);
}

/*
$$  $$ $$$$$$  $$$$  $$  $$
$$  $$   $$   $$  $$ $$  $$
$$  $$   $$   $$$$$$ $$$$$$
$$  $$   $$   $$  $$ $$  $$
 $$$$    $$   $$  $$ $$  $$
*/


function UT_calculate_documentNumber() {
    document.getElementById('inputDocumentNumber').value = "1" + getRandomNumericString(8);
}

function UT_calculate_ICN() {
    var documentNumber = document.getElementById("inputDocumentNumber").value;
    if (documentNumber.length != 9) {
        showInputDataAlert("ICN calculation error. Incorrect document number!")
        return;
    }

    document.getElementById("inputICN").value = documentNumber + "UT" 
    + getRandomDigit()+ getRandomDigit()  + "SL01";
}

function UT_calculate_DD() {
    document.getElementById("inputDD").value = getRandomNumericString(8);
}

function UT_2016_calculate_REAL_ID(alert) {
    console.log('run')
    var issueDate = document.getElementById("inputIssueDate").value;
    if (issueDate.length != 8) {
        if (alert) { showInputDataAlert("REAL ID calculation error. Incorrect issue date!"); }
        return;
    }

    var inputDateObject = new Date(
        parseInt(issueDate.substr(4, 4)),
        parseInt(issueDate.substr(0, 2)) - 1,
        parseInt(issueDate.substr(2, 2))
      );

      var comparisonDate = new Date(2019, 1, 1);

      if (inputDateObject >= comparisonDate) {
        document.getElementById("inputIsRealID").value = "F";
      } else {
        document.getElementById("inputIsRealID").value = "N";
      }
}

/*
 $$$$  $$$$$  $$  $$  $$$$  $$  $$  $$$$   $$$$   $$$$
$$  $$ $$  $$ $$ $$  $$  $$ $$$ $$ $$     $$  $$ $$
$$$$$$ $$$$$  $$$$   $$$$$$ $$ $$$  $$$$  $$$$$$  $$$$
$$  $$ $$  $$ $$ $$  $$  $$ $$  $$     $$ $$  $$     $$
$$  $$ $$  $$ $$  $$ $$  $$ $$  $$  $$$$  $$  $$  $$$$
*/


function AR_calculate_documentNumber() {
    document.getElementById('inputDocumentNumber').value = "9" + getRandomNumericString(8);
}

function AR_calculate_ICN() {
    document.getElementById("inputICN").value = "021011" + getRandomNumericString(10);
}

function AR_calculate_DD() {
    document.getElementById("inputDD").value = getRandomNumericString(9) + " " + getRandomNumericString(4);
}


/*
$$$$$$ $$$$$   $$$$  $$  $$  $$$$
  $$   $$  $$ $$  $$ $$  $$ $$  $$
  $$   $$  $$ $$$$$$ $$$$$$ $$  $$
  $$   $$  $$ $$  $$ $$  $$ $$  $$
$$$$$$ $$$$$  $$  $$ $$  $$  $$$$
*/

function ID_calculate_documentNumber() {
    document.getElementById('inputDocumentNumber').value = getRandomLetter() + getRandomLetter() + getRandomNumericString(6) + getRandomLetter();
}

function ID_calculate_ICN() {
    document.getElementById("inputICN").value = "000" + getRandomNumericString(7);
}

function ID_calculate_DD() {
    var issueDate = document.getElementById("inputIssueDate").value;
    if (issueDate.length != 8) {
        showInputDataAlert("DD calculation error. Incorrect issue date!")
        return;
    }

    document.getElementById("inputDD").value = "010" + issueDate.slice(-2) + getRandomNumericString(3) + "00" + getRandomNumericString(2);
}


/*
$$   $  $$$$  $$  $$ $$$$$$  $$$$  $$  $$  $$$$
$$$ $$ $$  $$ $$$ $$   $$   $$  $$ $$$ $$ $$  $$
$$ $ $ $$  $$ $$ $$$   $$   $$$$$$ $$ $$$ $$$$$$
$$   $ $$  $$ $$  $$   $$   $$  $$ $$  $$ $$  $$
$$   $  $$$$  $$  $$   $$   $$  $$ $$  $$ $$  $$
*/


function MT_calculate_documentNumber() {
    var birthDate = document.getElementById("inputBrithDate").value;
    if (birthDate.length != 8) {
        showInputDataAlert("Document number calculation error. Incorrect birth date!")
        return;
    }

    document.getElementById('inputDocumentNumber').value = birthDate.slice(0,2) + getRandomNumericString(3) + birthDate.slice(-4) + "41" + birthDate.slice(3,5);
}

function MT_calculate_ICN() {

    var data1 = ""
    for (var i = 0; i < 6; i++) { data1 += getRandomLetterAndDigit(); }

    document.getElementById("inputICN").value = "1100" + getRandomDigit() + data1 + "FMT" + getRandomLetterAndDigit() + getRandomLetter() + getRandomLetter() + "001";
}

function MT_calculate_DD() {
    var issueDate = document.getElementById("inputIssueDate").value;
    if (issueDate.length != 8) {
        showInputDataAlert("DD calculation error. Incorrect issue date!")
        return;
    }

    document.getElementById("inputDD").value = issueDate.slice(-4) + issueDate.slice(0,2) + issueDate.slice(2,4) + getRandomNumericString(12);
}

/*
$$$$$$ $$  $$ $$$$$  $$$$$$  $$$$  $$  $$  $$$$
  $$   $$$ $$ $$  $$   $$   $$  $$ $$$ $$ $$  $$
  $$   $$ $$$ $$  $$   $$   $$$$$$ $$ $$$ $$$$$$
  $$   $$  $$ $$  $$   $$   $$  $$ $$  $$ $$  $$
$$$$$$ $$  $$ $$$$$  $$$$$$ $$  $$ $$  $$ $$  $$
*/


function IN_calculate_documentNumber() {
    document.getElementById('inputDocumentNumber').value = getRandomNumericString(4) + "-" + getRandomNumericString(2) + "-" + getRandomNumericString(4);
}

function IN_calculate_ICN() {
    document.getElementById("inputICN").value = "03701" + getRandomNumericString(11);
}

function IN_calculate_DD() {
    var issuigOfficeCode = document.getElementById("inputOfficeCode").value;
    if (issuigOfficeCode.length != 3) {
        showInputDataAlert("DD calculation error. Issuing office code!")
        return;
    }

    var issueDate = document.getElementById("inputIssueDate").value;
    if (issueDate.length != 8) {
        showInputDataAlert("DD calculation error. Incorrect issue date!")
        return;
    }

    document.getElementById("inputDD").value = issueDate.slice(0,2) + issueDate.slice(2, 4) + issueDate.slice(-2) + issuigOfficeCode + "00" + getRandomNumericString(3);
}


/*
$$  $$ $$$$$ $$   $    $$   $ $$$$$ $$  $$ $$$$$$  $$$$   $$$$
$$$ $$ $$    $$   $    $$$ $$ $$     $$$$    $$   $$  $$ $$  $$
$$ $$$ $$$$  $$ $ $    $$ $ $ $$$$    $$     $$   $$     $$  $$
$$  $$ $$    $$$$$$    $$   $ $$     $$$$    $$   $$  $$ $$  $$
$$  $$ $$$$$  $$ $$    $$   $ $$$$$ $$  $$ $$$$$$  $$$$   $$$$
*/

function NM_calculate_documentNumber() {
    document.getElementById('inputDocumentNumber').value = "0" + getRandomNumericString(8);
}

function NM_calculate_ICN() {
    var documentNumber = document.getElementById("inputDocumentNumber").value;
    if (documentNumber.length != 9) {
        showInputDataAlert("ICN calculation error. Incorrect document number!")
        return;
    }

    document.getElementById("inputICN").value = documentNumber + "01";
}

function NM_calculate_DD() {
    var issuigOfficeCode = document.getElementById("inputOfficeCode").value;
    if (issuigOfficeCode.length != 3) {
        showInputDataAlert("DD calculation error. Issuing office code!")
        return;
    }

    var issueDate = document.getElementById("inputIssueDate").value;
    if (issueDate.length != 8) {
        showInputDataAlert("DD calculation error. Incorrect issue date!")
        return;
    }

    document.getElementById("inputDD").value = issueDate.slice(0,2) + issueDate.slice(2, 4) + issueDate.slice(-2) + issuigOfficeCode + "00" + getRandomNumericString(3);
}


/*
$$$$$  $$  $$  $$$$  $$$$$  $$$$$    $$$$$$  $$$$  $$      $$$$  $$  $$ $$$$$
$$  $$ $$  $$ $$  $$ $$  $$ $$         $$   $$     $$     $$  $$ $$$ $$ $$  $$
$$$$$  $$$$$$ $$  $$ $$  $$ $$$$       $$    $$$$  $$     $$$$$$ $$ $$$ $$  $$
$$  $$ $$  $$ $$  $$ $$  $$ $$         $$       $$ $$     $$  $$ $$  $$ $$  $$
$$  $$ $$  $$  $$$$  $$$$$  $$$$$    $$$$$$  $$$$  $$$$$$ $$  $$ $$  $$ $$$$$
*/


function RI_calculate_documentNumber() {
    document.getElementById('inputDocumentNumber').value = getRandomNumericString(7);
}

function RI_calculate_ICN() {
    var documentNumber = document.getElementById("inputDocumentNumber").value;
    if (documentNumber.length != 7 && documentNumber.length != 8) {
        showInputDataAlert("ICN calculation error. Incorrect document number!")
        return;
    }

    document.getElementById("inputICN").value = "O" + documentNumber + "RI" + getRandomLetter() + getRandomLetter() + "TL01";
}

function RI_calculate_DD() {

    var issueDate = document.getElementById("inputIssueDate").value;
    if (issueDate.length != 8) {
        showInputDataAlert("DD calculation error. Incorrect issue date!")
        return;
    }

    var issue_year = parseInt(issueDate.slice(-4));

    if (issue_year > 2017) {
        document.getElementById("inputDD").value = getRandomNumericString(6);
    } else {
        var documentNumber = document.getElementById("inputDocumentNumber").value;
        if (documentNumber.length != 7) {
            showInputDataAlert("ICN calculation error. Incorrect document number!")
            return;
        }
        document.getElementById("inputDD").value = documentNumber + issueDate.slice(-4) + issueDate.slice(0,2) + issueDate.slice(2,4) + getRandomNumericString(6);
    }
}


/*
$$   $  $$$$   $$$$  $$  $$ $$$$$$ $$  $$  $$$$  $$$$$$  $$$$  $$  $$      $$$$$   $$$$
$$   $ $$  $$ $$     $$  $$   $$   $$$ $$ $$       $$   $$  $$ $$$ $$      $$  $$ $$  $$
$$ $ $ $$$$$$  $$$$  $$$$$$   $$   $$ $$$ $$ $$$   $$   $$  $$ $$ $$$      $$  $$ $$
$$$$$$ $$  $$     $$ $$  $$   $$   $$  $$ $$  $$   $$   $$  $$ $$  $$      $$  $$ $$  $$
 $$ $$ $$  $$  $$$$  $$  $$ $$$$$$ $$  $$  $$$$    $$    $$$$  $$  $$      $$$$$   $$$$
*/


function DC_calculate_documentNumber() {
    document.getElementById('inputDocumentNumber').value = getRandomNumericString(7);
}

function DC_calculate_AUDIT() {
    var issueDate = document.getElementById("inputIssueDate").value;
    if (issueDate.length != 8) {
        showInputDataAlert("DD calculation error. Incorrect issue date!")
        return;
    }

    var issueDateDATE = new Date(parseInt(issueDate.slice(-4)), parseInt(issueDate.slice(0, 2))  - 1, parseInt(issueDate.slice(2, 4)));
    issueDateDATE.setDate(issueDateDATE.getDate() + 5)


    // Get year, month, and day part from the date
    var year = issueDateDATE.toLocaleString("default", { year: "2-digit" });
    var month = issueDateDATE.toLocaleString("default", { month: "2-digit" });
    var day = issueDateDATE.toLocaleString("default", { day: "2-digit" });

    // Generate yyyy-mm-dd date string
    var formattedDate = month + day + issueDate.slice(-4);

    document.getElementById("inputAudit").value = formattedDate + "_" + getRandomNumericString(6) + "_" + getRandomDigit() + "_" + getRandomNumericString(3);
}

function DC_calculate_DD() {
    document.getElementById("inputDD").value = getRandomNumericString(8);
}


/*
$$      $$$$  $$  $$ $$$$$$  $$$$  $$$$$$  $$$$  $$  $$  $$$$
$$     $$  $$ $$  $$   $$   $$       $$   $$  $$ $$$ $$ $$  $$
$$     $$  $$ $$  $$   $$    $$$$    $$   $$$$$$ $$ $$$ $$$$$$
$$     $$  $$ $$  $$   $$       $$   $$   $$  $$ $$  $$ $$  $$
$$$$$$  $$$$   $$$$  $$$$$$  $$$$  $$$$$$ $$  $$ $$  $$ $$  $$
*/

function LA_calculate_documentNumber() {
    const alphabet = ["00", "01"];
    document.getElementById('inputDocumentNumber').value = alphabet[Math.floor(Math.random() * alphabet.length)] + getRandomNumericString(7);
}

function LA_calculate_ICN() {
    document.getElementById("inputICN").value = "00700" + getRandomNumericString(11);
}

function LA_calculate_AUDIT() {
    document.getElementById("inputAudit").value = getRandomNumericString(4);
}

function LA_calculate_OfficeCode() {
    document.getElementById("inputOfficeCode").value = "0" + getRandomInt2(21, 35).toString();
}

/*
$$   $ $$$$$$  $$$$   $$$$   $$$$  $$  $$ $$$$$  $$$$$$
$$$ $$   $$   $$     $$     $$  $$ $$  $$ $$  $$   $$
$$ $ $   $$    $$$$   $$$$  $$  $$ $$  $$ $$$$$    $$
$$   $   $$       $$     $$ $$  $$ $$  $$ $$  $$   $$
$$   $ $$$$$$  $$$$   $$$$   $$$$   $$$$  $$  $$_$$$$$$
*/

function MO_calculate_documentNumber() {
    document.getElementById('inputDocumentNumber').value = getRandomLetter() + "1" + getRandomNumericString(8);
}

function MO_2020_calculate_documentNumber() {
    document.getElementById('inputDocumentNumber').value = getRandomLetter() + "0" + getRandomNumericString(8);
}

function MO_calculate_ICN() {
    var issueDate = document.getElementById("inputIssueDate").value;
    if (issueDate.length != 8) {
        showInputDataAlert("ICN calculation error. Incorrect issue date!")
        return;
    }

    var documentNumber = document.getElementById("inputDocumentNumber").value;
    if (documentNumber.length != 10) {
        showInputDataAlert("ICN calculation error. Incorrect document number!")
        return;
    }

    days = parseInt(getNumberOfDaysFromBeginnigOfYear(issueDate)) + 1;

    document.getElementById("inputICN").value = issueDate.slice(-2) + ("00" + days.toString()).slice(-3) + documentNumber + "0101"
}

function MO_2020_calculate_ICN() {
    var issueDate = document.getElementById("inputIssueDate").value;
    if (issueDate.length != 8) {
        showInputDataAlert("ICN calculation error. Incorrect issue date!")
        return;
    }

    var documentNumber = document.getElementById("inputDocumentNumber").value;
    if (documentNumber.length != 10) {
        showInputDataAlert("ICN calculation error. Incorrect document number!")
        return;
    }

    days = parseInt(getNumberOfDaysFromBeginnigOfYear(issueDate)) + 2;

    document.getElementById("inputICN").value = issueDate.slice(-2) + ("00" + days.toString()).slice(-3) + documentNumber + "0101"
}

function MO_calculate_DD() {
    var issueDate = document.getElementById("inputIssueDate").value;
    if (issueDate.length != 8) {
        showInputDataAlert("DD calculation error. Incorrect issue date!")
        return;
    }

    var documentNumber = document.getElementById("inputDocumentNumber").value;
    if (documentNumber.length != 10) {
        showInputDataAlert("DD calculation error. Incorrect document number!")
        return;
    }

    document.getElementById("inputDD").value = issueDate.slice(-2) + documentNumber.slice(1, 4) + getNumberOfDaysFromBeginnigOfYear(issueDate) + "00" + getRandomNumericString(2);
}

function MO_2020_calculate_DD() {
    var issueDate = document.getElementById("inputIssueDate").value;
    if (issueDate.length != 8) {
        showInputDataAlert("DD calculation error. Incorrect issue date!")
        return;
    }

    document.getElementById("inputDD").value = issueDate.slice(-2) + "14" + getRandomNumericString(4) + "00" + getRandomNumericString(2);
}


/*
$$  $$  $$$$  $$  $$  $$$$   $$$$   $$$$
$$ $$  $$  $$ $$$ $$ $$     $$  $$ $$
$$$$   $$$$$$ $$ $$$  $$$$  $$$$$$  $$$$
$$ $$  $$  $$ $$  $$     $$ $$  $$     $$
$$  $$ $$  $$ $$  $$  $$$$  $$  $$  $$$$
*/

function KS_calculate_documentNumber() {
    document.getElementById('inputDocumentNumber').value = "K00-" + getRandomNumericString(2) + "-" + getRandomNumericString(4);
}

function KS_calculate_ICN() {
    var issueDate = document.getElementById("inputIssueDate").value;
    if (issueDate.length != 8) {
        showInputDataAlert("ICN calculation error. Incorrect issue date!")
        return;
    }

    var documentNumber = document.getElementById("inputDocumentNumber").value;
    if (documentNumber.length != 11) {
        showInputDataAlert("ICN calculation error. Incorrect document number!")
        return;
    }

    days = parseInt(getNumberOfDaysFromBeginnigOfYear(issueDate)) + 3;

    document.getElementById("inputICN").value = issueDate.slice(-2) + ("00" + days.toString()).slice(-3) + documentNumber.replace(/-/g, '') + "0101"
}

function KS_calculate_DD() {
    var birthDate = document.getElementById("inputBrithDate").value;
    if (birthDate.length != 8) {
        showInputDataAlert("DD calculation error. Incorrect birth date!")
        return;
    }

    var issueDate = document.getElementById("inputIssueDate").value;
    if (issueDate.length != 8) {
        showInputDataAlert("DD calculation error. Incorrect issue date!")
        return;
    }

    var expiryDate = document.getElementById("inputExpiryDate").value;
    if (expiryDate.length != 8) {
        showInputDataAlert("DD calculation error. Incorrect expiry date!")
        return;
    }

    var lastName = document.getElementById("inputLastName").value;
    if (!lastName) {
        showInputDataAlert("DD calculation error. Incorrect Last name!")
        return;
    }

    var firstName = document.getElementById("inputFirstName").value;
    if (!firstName) {
        showInputDataAlert("DD calculation error. Incorrect First name!")
        return;
    }

    var sex = document.getElementById('inputSex').value;

    days = parseInt(getNumberOfDaysFromBeginnigOfYear(issueDate)) + 1;

    document.getElementById('inputDD').value = birthDate.slice(-2, -1) + ("00" + days.toString()).slice(-3)
        + getRandomNumericString(6) + birthDate.slice(-1) + lastName[0] + firstName[0] + issueDate.slice(-2)
        + ("00" + days.toString()).slice(-3) + sex + expiryDate.slice(-2) + expiryDate.slice(2,4)
        + get_letter_corresponding_month(expiryDate.slice(0,2)) + "B";
}


/*
$$   $ $$  $$  $$$$  $$   $ $$$$$$ $$  $$  $$$$
$$   $  $$$$  $$  $$ $$$ $$   $$   $$$ $$ $$
$$ $ $   $$   $$  $$ $$ $ $   $$   $$ $$$ $$ $$$
$$$$$$   $$   $$  $$ $$   $   $$   $$  $$ $$  $$
 $$ $$   $$    $$$$  $$   $ $$$$$$ $$  $$  $$$$
*/

function WY_calculate_documentNumber() {
    document.getElementById('inputDocumentNumber').value = "11" + getRandomNumericString(7);
}

function WY_calculate_ICN() {
    var v = "100003" + getRandomNumericString(3) + "7";
    document.getElementById('inputICN').value = v;
    document.getElementById('inputDD').value = v;

}

function WY_calculate_DD() {
    var v = "100003" + getRandomNumericString(3) + "7";
    document.getElementById('inputICN').value = v;
    document.getElementById('inputDD').value = v;
}


/*
 $$$$   $$$$  $$  $$ $$$$$$ $$  $$     $$$$$   $$$$  $$  $$  $$$$  $$$$$$  $$$$
$$     $$  $$ $$  $$   $$   $$  $$     $$  $$ $$  $$ $$ $$  $$  $$   $$   $$  $$
 $$$$  $$  $$ $$  $$   $$   $$$$$$     $$  $$ $$$$$$ $$$$   $$  $$   $$   $$$$$$
    $$ $$  $$ $$  $$   $$   $$  $$     $$  $$ $$  $$ $$ $$  $$  $$   $$   $$  $$
  $$$$  $$$$   $$$$    $$   $$  $$     $$$$$  $$  $$ $$  $$  $$$$    $$   $$  $$
*/

function SD_calculate_documentNumber() {
    document.getElementById('inputDocumentNumber').value = "01" + getRandomNumericString(6);
}

function SD_calculate_ICN() {
    document.getElementById('inputICN').value = "042000" + getRandomNumericString(10);
}

function SD_calculate_DD() {
    var issueDate = document.getElementById("inputIssueDate").value;
    if (issueDate.length != 8) {
        showInputDataAlert("DD calculation error. Incorrect issue date!")
        return;
    }

    var documentNumber = document.getElementById("inputDocumentNumber").value;
    if (documentNumber.length != 8) {
        showInputDataAlert("DD calculation error. Incorrect document number!")
        return;
    }

    document.getElementById('inputDD').value = documentNumber + issueDate.slice(-4) + issueDate.slice(0,2) + issueDate.slice(2,4) + getRandomNumericString(7);
}

/*
$$  $$ $$$$$ $$  $$ $$$$$$ $$  $$  $$$$  $$  $$ $$  $$
$$ $$  $$    $$$ $$   $$   $$  $$ $$  $$ $$ $$   $$$$
$$$$   $$$$  $$ $$$   $$   $$  $$ $$     $$$$     $$
$$ $$  $$    $$  $$   $$   $$  $$ $$  $$ $$ $$    $$
$$  $$ $$$$$ $$  $$   $$    $$$$   $$$$  $$  $$   $$
*/

function KY_2012_calculate_documentNumber() {
    var lastName = document.getElementById("inputLastName").value;
    if (!lastName.length) {
        showInputDataAlert("Document number calculation error. Empty Last name!")
        return;
    }

    document.getElementById('inputDocumentNumber').value = lastName[0] + getRandomNumericString(8);
}


function KY_2012_calculate_DOE(diff) {
    var dateOfBirth = document.getElementById("inputBrithDate").value;
    if (!dateOfBirth) {
        makeRandomDOB();
        dateOfBirth = document.getElementById("inputBrithDate").value;
    }

    if (dateOfBirth.length > 4) {
        date = dateOfBirth.slice(0,4);
    } else { return; }

    var dateOfIssue = document.getElementById("inputIssueDate").value;
    if (dateOfIssue.length == 8) {
        date += (parseInt(dateOfIssue.slice(-4)) + diff)
    } else { return; }


    d = new Date(date.slice(-4), date.slice(0,2), date.slice(2,4));
    d.setDate(d.getDate() + 31)
    var formattedDate = ("0" + d.getMonth()).slice(-2) + ("0" + d.getDate()).slice(-2) + d.getFullYear();

    document.getElementById("inputExpiryDate").value = formattedDate;
}

function KY_2012_calculate_ICN() {
    var issueDate = document.getElementById("inputIssueDate").value;
    if (issueDate.length != 8) {
        showInputDataAlert("DD calculation error. Incorrect issue date!")
        return;
    }

    document.getElementById('inputICN').value = "04600" + issueDate.slice(-2) + getRandomNumericString(9);
}

function KY_2012_calculate_DD() {
    document.getElementById('inputDD').value = "43" + getRandomNumericString(13) + "0";
}

function KY_2018_calculate_DD() {
    var issueDate = document.getElementById("inputIssueDate").value;
    if (issueDate.length != 8) {
        showInputDataAlert("DD calculation error. Incorrect issue date!")
        return;
    }

    document.getElementById('inputDD').value = issueDate.slice(-4) + issueDate.slice(0,2) + issueDate.slice(3,5)
         + getRandomNumericString(8) + " 01111";
}


function KY_2018_claculatee_ICN() {
    document.getElementById('inputICN').value = "04601" + getRandomNumericString(11)
}


/*
 $$$$  $$      $$$$   $$$$  $$  $$  $$$$
$$  $$ $$     $$  $$ $$     $$ $$  $$  $$
$$$$$$ $$     $$$$$$  $$$$  $$$$   $$$$$$
$$  $$ $$     $$  $$     $$ $$ $$  $$  $$
$$  $$ $$$$$$ $$  $$  $$$$  $$  $$ $$  $$
*/

function AK_calculate_documentNumber() {
    document.getElementById('inputDocumentNumber').value = getRandomNumericString(7);
}

function AK_calculate_ICN() {
    document.getElementById('inputICN').value = "1000" + getRandomNumericString(6);
}

function AK_calculate_DD() {
    var issueDate = document.getElementById("inputIssueDate").value;
    if (issueDate.length != 8) {
        showInputDataAlert("DD calculation error. Incorrect issue date!")
        return;
    }

    const alphabet = "01";

    document.getElementById('inputDD').value = "8" + getRandomNumericString(6) + " " + getRandomNumericString(3)
     + issueDate.slice(-2) + issueDate.slice(0,2) + issueDate.slice(2,4) + getRandomLetter() + getRandomLetter() + getRandomLetter()
     + "-" + alphabet[Math.floor(Math.random() * alphabet.length)];
}


/*
 $$$$  $$  $$ $$      $$$$  $$  $$  $$$$  $$   $  $$$$
$$  $$ $$ $$  $$     $$  $$ $$  $$ $$  $$ $$$ $$ $$  $$
$$  $$ $$$$   $$     $$$$$$ $$$$$$ $$  $$ $$ $ $ $$$$$$
$$  $$ $$ $$  $$     $$  $$ $$  $$ $$  $$ $$   $ $$  $$
 $$$$  $$  $$ $$$$$$ $$  $$ $$  $$  $$$$  $$   $ $$  $$
*/

function OK_calculate_documentNumber() {
    document.getElementById('inputDocumentNumber').value = getRandomLetter() + "08" + getRandomNumericString(7);
}

function OK_calculate_ICN() {
    var documentNumber = document.getElementById("inputDocumentNumber").value;
    if (documentNumber.length != 10) {
        showInputDataAlert("ICN calculation error. Incorrect document number!")
        return;
    }

    document.getElementById('inputICN').value = documentNumber + "OK" +  getRandomLetterAndDigit() + getRandomLetterAndDigit() + "SL01";
}

function OK_calculate_DOE(diff) {

    var issueDate = document.getElementById("inputIssueDate").value;
    if (issueDate.length != 8) {
        showInputDataAlert("Date of expiry calculation error. Incorrect issue date!")
        return;
    }

    day = get_last_day_of_month(issueDate)

    year = parseInt(issueDate.slice(-4)) + diff
    console.log(year)

    document.getElementById('inputExpiryDate').value =  issueDate.slice(0,2) + day.toString() + year

}

function OK_calculate_DD() {
    var documentNumber = document.getElementById("inputDocumentNumber").value;
    if (documentNumber.length != 10) {
        showInputDataAlert("DD calculation error. Incorrect document number!")
        return;
    }

    var issueDate = document.getElementById("inputIssueDate").value;
    if (issueDate.length != 8) {
        showInputDataAlert("DD calculation error. Incorrect issue date!")
        return;
    }

    var birthDate = document.getElementById("inputBrithDate").value;
    if (birthDate.length != 8) {
        showInputDataAlert("DD calculation error. Incorrect birth date!")
        return;
    }

    document.getElementById('inputDD').value = documentNumber + birthDate.slice(0,4) + birthDate.slice(-2) + issueDate.slice(0,4) + issueDate.slice(-2) + "R";
}

function OK_calculate_REAL_ID(alert) {
    var issueDate = document.getElementById("inputIssueDate").value;
    if (issueDate.length != 8) {
        if (alert) { showInputDataAlert("REAL ID calculation error. Incorrect issue date!"); }
        return;
    }

    var inputDateObject = new Date(
        parseInt(issueDate.substr(4, 4)),
        parseInt(issueDate.substr(0, 2)) - 1,
        parseInt(issueDate.substr(2, 2))
      );

      var comparisonDate = new Date(2020, 3, 30);

      if (inputDateObject >= comparisonDate) {
        document.getElementById("inputIsRealID").value = "F";
      } else {
        document.getElementById("inputIsRealID").value = "N";
      }
}


/*
$$$$$  $$$$$ $$      $$$$  $$   $  $$$$  $$$$$  $$$$$
$$  $$ $$    $$     $$  $$ $$   $ $$  $$ $$  $$ $$
$$  $$ $$$$  $$     $$$$$$ $$ $ $ $$$$$$ $$$$$  $$$$
$$  $$ $$    $$     $$  $$ $$$$$$ $$  $$ $$  $$ $$
$$$$$  $$$$$ $$$$$$ $$  $$  $$ $$ $$  $$ $$  $$ $$$$$
*/

function DE_calculate_documentNumber() {
    document.getElementById('inputDocumentNumber').value = getRandomNumericString(7);
}

function DE_calculate_ICN() {
    document.getElementById('inputICN').value = "0110" + getRandomNumericString(12);
}

function DE_calculate_DD() {
    var issueDate = document.getElementById("inputIssueDate").value;
    if (issueDate.length != 8) {
        showInputDataAlert("DD calculation error. Incorrect issue date!")
        return;
    }

    document.getElementById('inputDD').value = "L" + issueDate.slice(-4) + issueDate.slice(0,2) + issueDate.slice(2,4) + getRandomNumericString(6) + "C";
}


/*
$$  $$  $$$$  $$   $  $$$$  $$$$$$ $$$$$$
$$  $$ $$  $$ $$   $ $$  $$   $$     $$
$$$$$$ $$$$$$ $$ $ $ $$$$$$   $$     $$
$$  $$ $$  $$ $$$$$$ $$  $$   $$     $$
$$  $$ $$  $$  $$ $$ $$  $$ $$$$$$ $$$$$$
*/

function HI_calculate_documentNumber() {
    document.getElementById('inputDocumentNumber').value = "H00" + getRandomNumericString(6);
}

function HI_calculate_DD() {
    var issueDate = document.getElementById("inputIssueDate").value;
    if (issueDate.length != 8) {
        showInputDataAlert("DD calculation error. Incorrect issue date!")
        return;
    }

    var data = "";
    for (var i = 0; i < 6; i++) { data += getRandomDigit(); }
    for (var i = 0; i < 6; i++) { data += getRandomLetterAndDigit(); }

    document.getElementById('inputDD').value = issueDate.slice(-4) + issueDate.slice(0,2) + issueDate.slice(2,4) + data + "-ICWH";
}

function HI_calculate_ICN() {
    var issueDate = document.getElementById("inputIssueDate").value;
    if (issueDate.length != 8) {
        showInputDataAlert("DD calculation error. Incorrect issue date!")
        return;
    }

    d = new Date(issueDate.slice(-4), issueDate.slice(0,2), issueDate.slice(2,4));
    d.setDate(d.getDate() + 6)
    var formattedDate = ("0" + d.getMonth()).slice(-2) + ("0" + d.getDate()).slice(-2) + d.getFullYear();

    document.getElementById('inputICN').value = issueDate.slice(-4) + formattedDate.slice(0,4) + "_106336_2_1" + getRandomNumericString(2);
}


/*
$$$$$$  $$$$  $$   $  $$$$
  $$   $$  $$ $$   $ $$  $$
  $$   $$  $$ $$ $ $ $$$$$$
  $$   $$  $$ $$$$$$ $$  $$
$$$$$$  $$$$   $$ $$ $$  $$
*/

function IA_2011_calculate_documentNumber() {
    document.getElementById('inputDocumentNumber').value = getRandomNumericString(3) + getRandomLetter() + getRandomLetter() + getRandomNumericString(4);
}


function IA_2011_calculate_DD() {
    var expiryDate = document.getElementById("inputExpiryDate").value;
    if (expiryDate.length != 8) {
        showInputDataAlert("DD calculation error. Incorrect expiry date!")
        return;
    }

    var lastName = document.getElementById("inputLastName").value;
    if (!lastName) {
        showInputDataAlert("DD calculation error. Incorrect Last name!")
        return;
    }

    var firstName = document.getElementById("inputFirstName").value;
    if (!firstName) {
        showInputDataAlert("DD calculation error. Incorrect First name!")
        return;
    }

    var sex = document.getElementById('inputSex').value;

    document.getElementById('inputDD').value = getRandomNumericString(9) + lastName[0] + firstName[0] + getRandomNumericString(4) + sex
        + expiryDate.slice(2,4) + expiryDate.slice(0,2) + expiryDate.slice(-2) + "R";
}


function IA_2017_calculate_DD() {
    var expiryDate = document.getElementById("inputExpiryDate").value;
    if (expiryDate.length != 8) {
        showInputDataAlert("DD calculation error. Incorrect expiry date!")
        return;
    }

    var lastName = document.getElementById("inputLastName").value;
    if (!lastName) {
        showInputDataAlert("DD calculation error. Incorrect Last name!")
        return;
    }

    var firstName = document.getElementById("inputFirstName").value;
    if (!firstName) {
        showInputDataAlert("DD calculation error. Incorrect First name!")
        return;
    }

    var sex = document.getElementById('inputSex').value;

    document.getElementById('inputDD').value = getRandomNumericString(9) + lastName[0] + firstName[0] + getRandomNumericString(4) + sex
        + expiryDate.slice(2,4) + expiryDate.slice(0,2) + expiryDate.slice(-2) + "D";
}


function IA_2011_calculate_ICN() {
    var documentNumber = document.getElementById("inputDocumentNumber").value;
    if (documentNumber.length != 9) {
        showInputDataAlert("ICN calculation error. Incorrect document number!")
        return;
    }

    var issueDate = document.getElementById("inputIssueDate").value;
    if (issueDate.length != 8) {
        showInputDataAlert("ICN calculation error. Incorrect issue date!")
        return;
    }

    d = ("00" + (parseInt(getNumberOfDaysFromBeginnigOfYear(issueDate)) + 1)).slice(-3);

    document.getElementById('inputICN').value = documentNumber + issueDate.slice(-2) + d + "0101";
}

function IA_2017_calculate_ICN() {
    var documentNumber = document.getElementById("inputDocumentNumber").value;
    if (documentNumber.length != 9) {
        showInputDataAlert("ICN calculation error. Incorrect document number!")
        return;
    }

    var issueDate = document.getElementById("inputIssueDate").value;
    if (issueDate.length != 8) {
        showInputDataAlert("ICN calculation error. Incorrect issue date!")
        return;
    }

    d = ("00" + (parseInt(getNumberOfDaysFromBeginnigOfYear(issueDate)) + 3)).slice(-3);

    document.getElementById('inputICN').value = documentNumber + issueDate.slice(-2) + d + "0101";
}




/*
##   #  ####  ##  ## ###### ######  ####  #####   ####
### ## ##  ## ### ##   ##     ##   ##  ## ##  ## ##  ##
## # # ###### ## ###   ##     ##   ##  ## #####  ######
##   # ##  ## ##  ##   ##     ##   ##  ## ##  ## ##  ##
##   # ##  ## ##  ## ######   ##    ####  #####  ##  ##
*/


function MB_calculate_documentNumber() {
    document.getElementById('inputDocumentNumber').value =
        getRandomLetter() + getRandomLetter() + "-" +
        getRandomLetter() + getRandomLetter() + "-" +
        getRandomLetter() + getRandomLetter() + "-" +
        getRandomLetter() + getRandomNumericString(3) + getRandomLetter() + getRandomLetterAndDigit();
}

function MB_calculate_ICN() {
    document.getElementById('inputICN').value = getRandomNumericString(9);
}

function MB_calculate_DD() {
    document.getElementById('inputDD').value = getRandomNumericString(9);
}


/*
 ####   ####   ####  ##  ##  ####  ######  ####  ##  ## ##### ##   #  ####  ##  ##
##     ##  ## ##     ## ##  ##  ##   ##   ##  ## ##  ## ##    ##   # ##  ## ### ##
 ####  ######  ####  ####   ######   ##   ##     ###### ####  ## # # ###### ## ###
    ## ##  ##     ## ## ##  ##  ##   ##   ##  ## ##  ## ##    ###### ##  ## ##  ##
 ####  ##  ##  ####  ##  ## ##  ##   ##    ####  ##  ## #####  ## ## ##  ## ##  ##
*/


function SK_calculate_documentNumber() {
    document.getElementById('inputDocumentNumber').value = getRandomNumericString(8);
}

function SK_calculate_ICN() {
    document.getElementById('inputICN').value = getRandomLetter() + getRandomNumericString(8);
}

function SK_calculate_DD() {
    document.getElementById('inputDD').value = getRandomNumericString(10);
}


/*
 ####  ##  ## ######  ####  #####  ######  ####
##  ## ### ##   ##   ##  ## ##  ##   ##   ##  ##
##  ## ## ###   ##   ###### #####    ##   ##  ##
##  ## ##  ##   ##   ##  ## ##  ##   ##   ##  ##
 ####  ##  ##   ##   ##  ## ##  ## ######  ####
*/

function ON_calculate_documentNumber() {
    document.getElementById('inputDocumentNumber').value = getRandomLetter() + getRandomNumericString(4) + "-" + getRandomNumericString(5) + "-" + getRandomNumericString(5)
}

function ON_calculate_ICN() {
    document.getElementById('inputICN').value = getRandomNumericString(7);
}

function ON_calculate_DD() {
    document.getElementById('inputDD').value = 'G' + getRandomLetter() + getRandomNumericString(7);
}


/*
 ####  ##     #####  ##### #####  ######  ####
##  ## ##     ##  ## ##    ##  ##   ##   ##  ##
###### ##     #####  ####  #####    ##   ######
##  ## ##     ##  ## ##    ##  ##   ##   ##  ##
##  ## ###### #####  ##### ##  ##   ##   ##  ##
*/


function AB_calculate_documentNumber() {
    document.getElementById('inputDocumentNumber').value = "1" + getRandomNumericString(5) + "-" + getRandomNumericString(3);
}

function AB_calculate_DD() {
    document.getElementById('inputDD').value = "0" + getRandomNumericString(3) + "-" + getRandomNumericString(5);
}


/*
 ####  ##  ## ##### #####  #####  ####
##  ## ##  ## ##    ##  ## ##    ##  ##
##  ## ##  ## ####  #####  ####  ##
##  ## ##  ## ##    ##  ## ##    ##  ##
 #####  ####  ##### #####  #####  ####
*/



function QC_calculate_documentNumber() {
    document.getElementById('inputDocumentNumber').value = getRandomLetter() + getRandomNumericString(4) + "-" 
    + getRandomNumericString(6) + "-" + getRandomNumericString(2);
}

function QC_calculate_DD() {
    document.getElementById('inputDD').value = "PE" + getRandomLetter() + getRandomLetter()
     + getRandomNumericString(2) + getRandomLetter() + getRandomLetter() + getRandomLetter();
}



/*
##   # #####  ####  ######    ##  ## ###### #####   ####  ###### ##  ## ######  ####
##   # ##    ##       ##      ##  ##   ##   ##  ## ##       ##   ### ##   ##   ##  ##
## # # ####   ####    ##      ##  ##   ##   #####  ## ###   ##   ## ###   ##   ######
###### ##        ##   ##       ####    ##   ##  ## ##  ##   ##   ##  ##   ##   ##  ##
 ## ## #####  ####    ##        ##   ###### ##  ##  ####  ###### ##  ## ###### ##  ##
*/

// ========================== WEST VIRGINIA (WV) =========================== //


function WV_calculate_documentNumber() {
    document.getElementById('inputDocumentNumber').value = getRandomLetter() + getRandomNumericString(6);
}

function WV_calculate_ICN() {
    var documentNumber = document.getElementById("inputDocumentNumber").value;
    if (documentNumber.length != 7) {
        showInputDataAlert("ICN calculation error. Incorrect document number!")
        return;
    }

    document.getElementById('inputICN').value = documentNumber + "WV" + getRandomLetter() + getRandomLetter() + getRandomLetter() + getRandomLetter() + "01";
}

function WV_calculate_DD() {

    var birthDate = document.getElementById("inputBrithDate").value;
    if (birthDate.length != 8) {
        showInputDataAlert("DD calculation error. Incorrect birth date!")
        return;
    }

    var expiryDate = document.getElementById("inputExpiryDate").value;
    if (expiryDate.length != 8) {
        showInputDataAlert("DD calculation error. Incorrect expiry date!")
        return;
    }

    var lastName = document.getElementById("inputLastName").value;
    if (!lastName) {
        showInputDataAlert("DD calculation error. Incorrect Last name!")
        return;
    }

    var firstName = document.getElementById("inputFirstName").value;
    if (!firstName) {
        showInputDataAlert("DD calculation error. Incorrect First name!")
        return;
    }

    document.getElementById('inputDD').value = birthDate.slice(0,4) + birthDate.slice(-2) + lastName[0] + firstName[0] + expiryDate.slice(-2) + expiryDate.slice(0,2)
}


/*
$$  $$ $$$$$ $$$$$  $$   $  $$$$  $$  $$ $$$$$$
$$  $$ $$    $$  $$ $$$ $$ $$  $$ $$$ $$   $$
$$  $$ $$$$  $$$$$  $$ $ $ $$  $$ $$ $$$   $$
 $$$$  $$    $$  $$ $$   $ $$  $$ $$  $$   $$
  $$   $$$$$ $$  $$ $$   $  $$$$  $$  $$   $$
*/

// ========================== VERMONT (VT) =========================== //

function VT_calculate_documentNumber() {
    document.getElementById('inputDocumentNumber').value = getRandomNumericString(8);
}

function VT_calculate_DD() {
    var documentNumber = document.getElementById("inputDocumentNumber").value;
    if (documentNumber.length != 8) {
        showInputDataAlert("DD calculation error. Incorrect document number!")
        return;
    }

    var issueDate = document.getElementById("inputIssueDate").value;
    if (issueDate.length != 8) {
        showInputDataAlert("DD calculation error. Incorrect issue date!")
        return;
    }

    document.getElementById('inputDD').value = issueDate.slice(0,4) + issueDate.slice(-2) + getRandomNumericString(4) + documentNumber;
}