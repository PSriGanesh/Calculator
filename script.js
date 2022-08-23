let boxes = document.querySelectorAll('.numb');
let screen = document.querySelector('#screen');
let view = document.querySelector('#view');
let delt = document.querySelector('#delt');
let point = document.querySelector('#point');
let clear = document.querySelector('#clear');
let a=[];
let temp='';
screen.textContent='0';
delt.addEventListener('click',delet);
function delet()
{
	temp=screen.textContent;
	temp = temp.slice(0,temp.length-1);
	screen.textContent=temp;
}
clear.addEventListener('click',clea);
function clea()
{
	a=[];
	temp='';
	screen.textContent='0';
	view.textContent='';
}
boxes.forEach(box=>
{
	box.addEventListener('click',()=>{numberClick(box)});
});
function numberClick(box)
{
	if(temp.length>11)
	{
		return;
	}
	if(a.length==1){
		a=[];
		view.textContent='';
	}
	//console.log(box.getAttribute('data-key'));
	temp+=box.getAttribute('data-key'); 
	screen.textContent=temp;
	//console.log(a);
}
let exp=0;
let ops = document.querySelectorAll('.operator');
let eq = document.querySelector('.equal');
ops.forEach(op=>
{
	op.addEventListener('click',()=>operatorClick(op));
});
function operatorClick(op)
{
	if(a.length==1)
		{
			a[0] = parseFloat(screen.textContent);
			a.push(op.getAttribute('data-key'));
			temp='';
		}
		else if(a.length==2)
		{
			if(temp)
			{
				evaluate();
				a.push(op.getAttribute('data-key'));
			}
			a.pop();
			a.push(op.getAttribute('data-key'));
			//console.log(a);
		}	
		else{
			//console.log('hello');
			a.push(temp)
			a.push(op.getAttribute('data-key'));
			temp='';
		}
		screen.textContent=temp;
		view.textContent = a.join(' ');
}
point.addEventListener('click',poit);
function poit()
{	
	if(temp=='')
		temp+='0.';
	else if(temp.indexOf('.')==-1)
		temp+='.';
	screen.textContent=temp;
}
eq.addEventListener('click',evaluate);
function evaluate()
{
	if(a.length==0)
		return;
	if(a.length==1)
		return;
	if(a.length==2 && temp)
		a.push(temp);
	else if(a.length==2){
		a.splice(1);
		return screen.textContent=a[0];}
	temp='';
	view.textContent = a.join(' ')+' =';
	switch(a[1])
	{
		case '+':
			exp=parseFloat(a[0])+parseFloat(a[2]);
			validate(exp.toFixed(3));
			a.splice(1);
			break;
		case '-':
			exp=parseFloat(a[0])-parseFloat(a[2]);
			validate(exp.toFixed(3));
			a.splice(1);
			break;
		case '*':
			exp=parseFloat(a[0])*parseFloat(a[2]);
			validate(exp.toFixed(3));
			a.splice(1);
			break;
		case '/':
			exp=parseFloat(a[0])/parseFloat(a[2]);
			validate(exp.toFixed(3));
			a.splice(1);
			break;
	}
}
function validate(exp)
{
	let index=0;
	for(let i=exp.indexOf('.')+1;i<exp.indexOf('.')+4;i++)
	{
		//console.log(exp[i]);
		if(exp[i]!=0 && exp[i]!=-1){
			index=i-exp.indexOf('.');
		}
	}
	exp = parseFloat(exp);
	screen.textContent=exp.toFixed(index);
	a[0]=parseFloat(screen.textContent);
}
window.addEventListener('keydown',(e)=>
{
	let ev = document.querySelector(`.butt[data-board='${e.keyCode}']`);
	if(e.keyCode<106&&e.keyCode>95)
		numberClick(ev);
	else if(e.keyCode==110)
		poit();
	else if(e.keyCode<112&&e.keyCode>105)
		operatorClick(ev);
	else if(e.keyCode==13)
		evaluate();
	else if(e.keyCode==8)
		delet();
	else if(e.keyCode==27)
		clea();
});
