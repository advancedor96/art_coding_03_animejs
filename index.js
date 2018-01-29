let wrapper = document.querySelector('.wrapper');
const numEle = 90;
const duration = 6000;
const delay = 6000 / numEle;

let myTimeLine = anime.timeline({
	duration: delay,
	complete: function(){
		console.log('完成囉');
		myTimeLine.restart();
	},
})

toggleAni = (obj)=>{
	if( myTimeLine.paused ){
		myTimeLine.restart();
		obj.innerHTML = 'Stop';
	}else{
		myTimeLine.pause();
		obj.innerHTML = 'Start';
	}
}
function createElement(i){
	let el = document.createElement('div');
	const rotate = 360/numEle * i;
	const translateY = -50;
	const hue = Math.round(360 / numEle * i);

	el.classList.add('el');
	const hueStr = `hsl(${hue}, 50%, 50%)`
	el.style.backgroundColor = hueStr;
	const transform_str = `rotate( ${rotate}deg) translateY(${translateY}%)`
	el.style.transform = transform_str;

	myTimeLine.add({
		begin: function(){
			const newHueStr = `hsl(${hue}, 70%, 70%)`
			anime({
				targets: el,
				backgroundColor: newHueStr,
				rotate: [`${rotate}deg`,`${rotate + 10}deg`],
				translateY: [`${translateY}%`,`${translateY +10}%`],
				scale: [1, 1.25],
				direction: 'alternate',
				easing: 'easeInOutSine',
				duration: duration*0.1
				
			})
		}
	})

	wrapper.appendChild(el);
}

for(let i=0;i<numEle;i++){
	createElement(i);
}

//學 anime.js 官網用法
window.onload = function(){
	fireworks.setCanvasSize();
}