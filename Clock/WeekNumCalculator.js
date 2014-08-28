/**
 * Calculate the week number of the year for my plan.
 * @author taojx
 * @since 2014-08-28 19:42:23
 */

var appendWeekNum = function() {
	var insertText = '下半年第' + getWeekNum() + '周';
	document.getElementById('symbol').innerHTML = insertText;
};

function getWeekNum(){
	var date = new Date();
	var date2=new Date(date.getFullYear(), 0, 1);
	var day1=date.getDay();
	if(day1==0) day1=7;
	var day2=date2.getDay();
	if(day2==0) day2=7;
	d = Math.round((date.getTime() - date2.getTime()+(day2-day1)*(24*60*60*1000)) / 86400000);  
	return Math.ceil(d /7)+1; 
}

appendWeekNum();