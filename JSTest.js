
	var text2num = new Array();
	var hashTable = new Array(20);
	var passwordTable = new Array(20);
	var index = 0;
	var value = 0;
	var testVal = 0;
	var indx = 0;
	var elemCounter = 0;
	var data1 = 0;
	var datax;
	var isValidUsrName = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;
	//Function executes when user clicks "Create Account"
	function myFunction(){
		var usrNameUnavalible = false;
		var key;
		var val;
		//ensure that username and password fields not empty and display corresponding warnings
		if(document.getElementById("txtInputUsername").value == '')
		{
			document.getElementById("demo").innerHTML = "<font color='red'>Error! Username cannot be empty</font><br/>";
		}
		else if(isValidUsrName.test(document.getElementById("txtInputUsername").value) == false)
		{
			document.getElementById("demo").innerHTML = "<font color='red'>Error! Username can only contain letters, numbers, and underscore...</font><br/>";
		}
		else if(document.getElementById("txtInputPassword").value == '')
		{
			document.getElementById("demo").innerHTML = "<font color='red'>Error! Password cannot be empty</font><br/>";
		}
		else
		{
			//elemCounter ensures that there is still space available in the hashTable
			if(elemCounter<hashTable.length)
			{			
				//retrieve username as key and password as val
				key = document.getElementById("txtInputUsername").value;
				val = document.getElementById("txtInputPassword").value;
					
				//Call hashFunction() to calculate initial index where data will be saved
				HashFunction(key);
					
				//Check if the initial index is empty
				if(hashTable[index] != null)
				{
					data1 = hashTable[index].split("|");
					//If index is not empty, match the key(username) entered versus the username saved in the hashTable
					//Data saved in the hashTable is a combination of username and password delimited by "|" this a split() method is used
					if(key == data1[0])
					{
						//Matching key and data saved means that the username is already in use by others, this a warning message is displayed
						document.getElementById("demo").innerHTML = "<font color='orange'>Username already taken, please use a different username</font>";
					}
					//If key(username) and data(username saved in index) does not match, we need to find another index to save the key and val
					else{
							
						//function call to indexNotEmpty() which returns an index we can use and a boolean of whether the key can be used
						testVal = indexNotEmpty(index, key);
						indx = testVal[0];
						usrNameUnavalible = testVal[1];
							
						if(usrNameUnavalible == true)
						{
							document.getElementById("demo").innerHTML = "<font color='orange'>Username already taken, please use a different username</font>";
						}
						else
						{
							if(indx >= hashTable.length )
							{
								//document.getElementById("demo").innerHTML = "<br/><font color='orange'>indexNotEmpty() returns: "+testVal+"</font>";
								document.getElementById("demo").innerHTML = "<font color='orange'>ERROR: User accounts have reached max limit</font>";
							}
							else
							{							
								hashTable[indx] = key + "|" + val;
								elemCounter += 1;
								document.getElementById("demo").innerHTML = "<font color='green'>Account Created! Please login to access hash table</font>";
								deleteInput("both");
							}
						}
					}				
				}
				else
				{				
					hashTable[index] = key + "|" + val;	
					elemCounter += 1;
					document.getElementById("demo").innerHTML = "<font color='green'>Account Created! Please login to access hash table</font>";
					deleteInput("both");
				}
			}
			else
			{
				document.getElementById("demo").innerHTML = "<font color='orange'>ERROR: User accounts have reached max limit</font>";
			}		
		}
		
		//document.getElementById("demo").innerHTML +="<br/> elemCounter = " + elemCounter;
		//document.getElementById("demo").innerHTML += "<br/> hashTable = " + hashTable;
		document.getElementById("table").innerHTML = '';
		index = 0;
		value = 0;
		testVal=0;
		text2num = [];
		key = null;
		val = null;
		indx = 0;
		data1 = [];
	}
	
	//Executes when user clicks "log in"
	function logIn()
	{
		var logInUsrname;
		var logInPasswrd;
		var userNameValid;
		if(document.getElementById("txtInputUsername").value == ''&&document.getElementById("txtInputPassword").value != '')
		{
			document.getElementById("demo").innerHTML = "<font color='red'>Error: Username is empty</font><br/>";
		}
		else if(document.getElementById("txtInputPassword").value == ''&& document.getElementById("txtInputUsername").value != '')
		{
			document.getElementById("demo").innerHTML = "<font color='red'>Error: Password is empty</font><br/>";
		}
		else if(document.getElementById("txtInputUsername").value == ''&&document.getElementById("txtInputPassword").value == '')
		{
			document.getElementById("demo").innerHTML = "<font color='red'>Error: Username and Password are empty</font><br/>";
		}
		else
		{
			logInUsrname = document.getElementById("txtInputUsername").value;
			logInPasswrd = document.getElementById("txtInputPassword").value;
			
			
			//validate if the username supplied is the same stored in the initial index
			userNameValid = validateUserName(logInUsrname, logInPasswrd);

			if(userNameValid == true )
			{
				
				document.getElementById("txtInputUsername").value = '';
				document.getElementById("txtInputPassword").value = '';
				document.getElementById("table").innerHTML = "<b>User Accounts Saved in Hash Table</b>";
				document.getElementById("table").innerHTML += "<table style='border: solid;'>";
				
				for(var j=0; j<hashTable.length;j++)
				{
					if(hashTable[j] != null)
					{
						datax = hashTable[j].split("|");
						document.getElementById("table").innerHTML += "<tr>";
						document.getElementById("table").innerHTML += "<td> index:"+ j+" user:"+ datax[0] + " Password:" + datax[1]+ "</td><br/>";
						document.getElementById("table").innerHTML += "</tr>";
					}
					else
					{
						document.getElementById("table").innerHTML += "<tr>";
						document.getElementById("table").innerHTML += "<td> index:"+ j+"</td><br/>";
						document.getElementById("table").innerHTML += "</tr>";
					}
					//
					
				}
				document.getElementById("table").innerHTML += "</table>";
				
			}
			else
			{
				
			}
		}
		
		document.getElementById("txtInputUsername").value = '';
		document.getElementById("txtInputPassword").value = '';
		index = 0;
		value = 0;
		testVal=0;
		text2num = [];
		key = null;
		val = null;
		indx = 0;
		logInUsrname = '';
		logInPasswrd = '';
		data1 = [];
	}
	
	function validateUserName(logInKey, logInPass)
	{
		var validity = false;
		var tempVal;		
		var userNameValid;
		var hashTusrName;
		var hashTusrName2;
		HashFunction(logInKey);
		if(hashTable[index] == null || hashTable[index] == "")
		{
			document.getElementById("demo").innerHTML = "<font color='red'>LOG IN ERROR: Invalid username and password combination</font>";
		}
		else
		{
			hashTusrName = hashTable[index].split("|");
		
			if(logInKey != hashTusrName[0])
			{
				tempVal = LogInNewIndex(index, logInKey);
				newIndexVal = tempVal[0];
				userNameValid = tempVal[1];
				
				hashTusrName2 = hashTable[newIndexVal].split("|");
				
				//Check if user name is valid 
				if(userNameValid == true)
				{
					if(logInPass == hashTusrName2[1])
					{
						validity = true;
						document.getElementById("demo").innerHTML = "<font color='green'>Logged in as " + logInKey + "</font>";
					}
					else
					{
						document.getElementById("demo").innerHTML = "<font color='red'>LOG IN ERROR: Invalid username and password combination</font>";
					}					
				}
				else{
					
					document.getElementById("demo").innerHTML = "<font color='red'>LOG IN ERROR: Account does not exist</font>";
							
				}
			}
			else
			{
				if(logInPass == hashTusrName[1])
				{
					validity = true;
					document.getElementById("demo").innerHTML = "<font color='green'>Logged in as " + logInKey + "</font>";
				}
				else
				{
					document.getElementById("demo").innerHTML = "<font color='red'>LOG IN ERROR: Invalid username and password combination</font>";
				}
			}
		}		
		return validity;		
	}
	
	//Deletes values on textboxes 
	function deleteInput(flag)
	{
		if(flag == "both")
		{
			document.getElementById("txtInputUsername").value = '';
			document.getElementById("txtInputPassword").value = '';
		}
		else if(flag == "username")
		{
			document.getElementById("txtInputUsername").value = '';
		}
		else
		{
			document.getElementById("txtInputPassword").value = '';
		}		
	}
	
	//This function separates each char of the key(username) coverts it to corresponding ASCII number
	//and performs a modulo operation on the total which is then used as index
	function HashFunction(word)
	{
		for(var i = 0; i < word.length ; i++)
		{
			text2num.push(word[i].charCodeAt(0));//(parseInt(word[i], 36));
		}	

		for(var j = 0; j<text2num.length; j++)
		{
			value += text2num[j];
		}
		index = value % (hashTable.length - 1);
	}
	
	function LogInNewIndex(ind, key)
	{		
		var counter = 0;
		var arrayNotNullCounter = 0;
		var arrayFull = false;
		var usrNameUsed = false;
		var indList = new Array();
		var allElemChecked = false;
		var data = hashTable[ind].split("|");
		var IndChecked = 0;
		var enumV = 0;
		
		indList.push(ind);
		while(hashTable[ind] != null && key != data[0] && indList.length < hashTable.length)
		{	
			data = hashTable[ind].split("|");
			IndChecked = 0;
			enumV = ind;
			for(var i = 0; i<indList.length; i++)
			{
				if(ind == indList[i])
				{
					IndChecked += 1;					
				}
			}
			if(IndChecked == 0)
			{
				indList.push(ind);
			}
			ind += 1;
			if(ind > hashTable.length - 1)
			{							
				ind = 0;												
			}							
		}
		if(key == data[0])
		{
			usrNameUsed = true;
		}		
		return [enumV, usrNameUsed];
	}
	//If the initial index is not empty, this function will select another index based on the algorithm below
	function indexNotEmpty(ind, key){
		var counter = 0;
		var arrayNotNullCounter = 0;
		var arrayFull = false;
		var usrNameUsed = false;
		var indList = new Array();
		var allElemChecked = false;
		var data = hashTable[ind].split("|");
		var IndChecked = 0;
		var enumV = 0;
		
		indList.push(ind);
		while(hashTable[ind] != null && key != data[0] && indList.length < hashTable.length)
		{	
			data = hashTable[ind].split("|");
			IndChecked = 0;
			enumV = ind;
			for(var i = 0; i<indList.length; i++)
			{
				if(ind == indList[i])
				{
					IndChecked += 1;					
				}
			}
			if(IndChecked == 0)
			{
				indList.push(ind);
			}
			ind += 1;
			if(ind > hashTable.length - 1)
			{							
				ind = 0;												
			}							
		}
		if(key == data[0])
		{
			usrNameUsed = true;
		}		
		return [ind, usrNameUsed];
	}
	
	
