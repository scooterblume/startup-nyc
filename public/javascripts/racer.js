let socket = io();
document.addEventListener('DOMContentLoaded', main);

function main(){
	var dataT = 0;
	var dataS = 0;




document.getElementById("one").addEventListener("click", tear);
document.getElementById("two").addEventListener("click", scream);

function tear(){
	socket.emit('tear',10)
}

function scream(){
	socket.emit('scream',10)
}

socket.on('movTear', function(data){
	console.log(data,'val')
	document.getElementById("first").style.marginLeft = data+'px';
	dataT=data;
});

socket.on('movScr', function(data){
	console.log(data,'val')
	document.getElementById("second").style.marginLeft = data+'px';
	dataS=data;

});

socket.on('tick',function(data){
	for (i in data){
		if (i==0) dataT = data[i];
		else dataS = data[i];
	}
	//dataS = data[2];
	document.getElementById("first").style.marginLeft = dataT +'px';
	document.getElementById("second").style.marginLeft = dataS +'px';
	socket.emit('tick');
});

}