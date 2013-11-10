
function trim(inStr)//去除字符串两端的空格
{
	var re = new RegExp("^([ \f\r\t\n]*)","ig");
	inStr = inStr.replace(re, "");    
	re = new RegExp("([ \f\r\t\n]*)$","ig");
	inStr = inStr.replace(re, "");  
	return inStr;  
}

function isDate(inStr)//检查字符串是否形如"YYYY:MM:DD"
{
    var daTemp="",flag=false;
	var ss=inStr.split("-");
	if(ss.length==3){
		if (!isNaN(ss[0]) && !isNaN(ss[1]) && !isNaN(ss[2])){
			daStr=new Date(ss[0],ss[1]-1,ss[2]);
			daTemp+=daStr.getFullYear()+"-";
			intMonth=(daStr.getMonth()+1)+"";
			intMonth=formatDate(intMonth);
			daTemp+=intMonth+"-"; 
			intDate=daStr.getDate()+"";
            intDate=formatDate(intDate);
			daTemp+=intDate; 
			//alert("date: "+inStr+":"+daTemp);
			if (daTemp == inStr){
				 flag=true;
				 //alert("date success");
			}
		}
	}
	return flag;
}

function isSDate(inStr)//检查字符串是否形如"YYYY:MM"
{
    var daTemp="",flag=false;
	var ss=inStr.split("-");
	if(ss.length==2){
		if (!isNaN(ss[0]) && !isNaN(ss[1])){
			daStr=new Date(ss[0],ss[1]-1,"01");
			daTemp+=daStr.getFullYear()+"-";
			intMonth=(daStr.getMonth()+1)+"";
			intMonth=formatDate(intMonth);
			daTemp+=intMonth+"-"; 
			intDate="01";
			daTemp+=intDate; 
			//alert("date: "+inStr+":"+daTemp);
			if (daTemp == inStr+"-01"){
				 flag=true;
				 //alert("date success");
			}
		}
	}
	return flag;
}

function formatDate(intvalue)//如果字符串只有一位，则在其前面加0，否则取其最低两个字符。 
{
	Strvalue="00"+intvalue;
	temp=Strvalue.length;
	return Strvalue.substring(temp-2,temp);
}

function isTime2(inStr){//验证字符串是否是形如"hh:mm"
	var tiTemp="",flag=false,hourTemp="",minutesTemp="";
	//alert("in time2");
	var ss=inStr.split(":");
	if(ss.length==2){
		if(!isNaN(ss[0]) && !isNaN(ss[1])){
		//alert("dffa");
			 date=new Date();
             date.setHours(ss[0],ss[1],10);
			 hourTemp=date.getHours()+"";
             hourTemp=formatDate(hourTemp);
			 minutesTemp=date.getMinutes()+"";
			 minutesTemp=formatDate(minutesTemp);
             tiTemp=hourTemp+":"+minutesTemp;
			 if(tiTemp==inStr){
				 flag=true;
				 //alert("time2 success");
			 }
		}
	}
	return flag;
}

function isTime3(inStr){//验证字符串是否是形如"hh:mm:ss"
	var tiTemp="",flag=false,hourTemp="",minutesTemp="",secTemp="";
	//alert("in tiem3");
	var ss=inStr.split(":");
	if(ss.length==3){
	//alert("wrf");
        if(!isNaN(ss[0]) && !isNaN(ss[1]) && !isNaN(ss[2])){
		//alert("wrf1");
            date=new Date();
			date.setHours(ss[0],ss[1],ss[2]);
			hourTemp=date.getHours()+"";
			hourTemp=formatDate(hourTemp);
			minutesTemp=date.getMinutes()+"";
			minutesTemp=formatDate(minutesTemp);
            secTemp=date.getSeconds()+"";
			//alert(secTemp);
			sscTemp=formatDate(secTemp);
			tiTemp=hourTemp+":"+minutesTemp+":"+secTemp;
			//alert(tiTemp+":"+inStr);
			if(tiTemp==inStr){
				flag=true;
				//alert("time3 success");
			}
		}
	}
	return flag;
}

function isDateTime(inStr){//验证字符串是否是形如"YYYY-MM-DD hh:mm:ss"或者"YYYY-MM-DD hh:mm"
	var flag=false;
	var ss=inStr.split(" ");
    //alert(ss[0]+"    "+ss[1]);
	if(ss.length==2)
	{
	//alert("X"+ss[1]+"X");
		if((isTime2(ss[1]) || isTime3(ss[1])) && isDate(ss[0]))
		{
	        flag=true;
		}
	}
	return flag;
}

function fixSql(Str){//补全SQL中的单引号
	var temp="";
	var ss=Str.split("'");
	for(i=0;i<ss.length-1;i=i+1){
		temp=temp+ss[i]+"''";
	}
	temp=temp+ss[ss.length-1];
	return temp;
}

function isInt(Str)//检查字符串是否是整数
{
	var flag=false;
	if(!isNaN(Str))
	{
		flag=true;
		Str=Str+"";
		for(i=0;i<Str.length;i=i+1)
		{
			if(Str.charAt(i)=='.')
			{
                flag=false;
			}
		}
	}
	return flag;
}

function checkFile(Str)
{
	var flag=false;
	var ss=Str.split(".");
	//alert(ss.length);
	var temp=ss[(ss.length-1)]+"";
	temp = temp.toUpperCase( );
	if(temp=="GIF" || temp=="BMP" || temp=="JPG")
	{
		flag=true;
	}
	return flag;
}

function checkFileType(fname,exts)//【未完成】判断文件的扩展名是否是exts中所列的,exts中的扩展名用"|"分割,不限大小写。例如"gif|jpg|BMP"
{
	var flag=false;
	var ss=fname.split(".");
	var es=exts.split("|");
	//alert(ss.length);
	var temp=ss[(ss.length-1)]+"";
	temp = temp.toUpperCase( );
	alert(temp+"::"+es.length);
	return flag;
}

function checkGif(Str)
{
	var flag=false;
	var ss=Str.split(".");
	//alert(ss.length);
	var temp=ss[(ss.length-1)]+"";
	temp = temp.toUpperCase( );
	if(temp=="GIF")
	{
		flag=true;
	}
	return flag;
}

function checkTxt(Str)
{
	var flag=false;
	var ss=Str.split(".");
	//alert(ss.length);
	var temp=ss[(ss.length-1)]+"";
	temp = temp.toUpperCase();
	if(temp=="XLS" || temp=="DOC")
	{
		flag=true;
	}
	return flag;
}

function chkDat(elname,elid,dataType,nes,afocus)
{
	var chk=true;
	if (nes && trim(document.all[elid].value)=="")
	{
		alert(elname+"不能为空！");
		chk=false;
	}
	else if (nes==false && document.all[elid].value=="")
	{
		return true;
		
	}
	switch(dataType)//0数字，1字符，2日期,3时间，4日期时间，5整数，6只包含年月的日期
	{
		case 0:
			if (isNaN(document.all[elid].value))
			{
				alert(elname+"不是一个有效的数字！");
				chk=false;
			}
			break;
		case 5:
			if (!isInt(document.all[elid].value))
			{
				alert(elname+"不是一个有效的数字！");
				chk=false;
			}
			break;
		case 2:
			if (!isDate(document.all[elid].value))
			{
				alert(elname+"必须是一个日期！（例：2008-02-31）");
				chk=false;
			}
			break;
		case 6:
			if (!isSDate(document.all[elid].value))
			{
				alert(elname+"必须是一只包含年月的日期！（例：2008-02）");
				chk=false;
			}
			break;
		case 3:
			if (!isTime2(document.all[elid].value))
			{
				alert(elname+"必须是一个时间！（例：21:08）");
				chk=false;
			}
			break;
		case 4:
			if (!isDateTime(document.all[elid].value))
			{
				alert(elname+"必须是一个日期+时间！（例：2008-02-31 21:08）");
				chk=false;
			}
			break;
	}
	if (!chk && afocus)
	{
		document.all[elid].focus();
	}
	return chk;
}
