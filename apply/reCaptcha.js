var a = Math.ceil(Math.random() * 10);
var b = Math.ceil(Math.random() * 10);       
var c = a + b
function DrawBotBoot()
{
    document.write("What is "+ a + " + " + b +"? ");
    document.write("<input id='BotBootInput' type='text' maxlength='2' size='2'/>");
}    
function ValidBotBoot(){
	var d = document.getElementById('BotBootInput').value;
	if (d == c) return this.form.submit();        
	return alert(false);

}
