// build canvas element
var canvas	= document.createElement('canvas');
canvas.width	= window.innerWidth;
canvas.height	= window.innerHeight;
document.body.appendChild(canvas);
// canvas.style
canvas.style.position	= "absolute";
canvas.style.left	= 0;
canvas.style.top	= 0;
// setup ctx
var ctx		= canvas.getContext('2d');

// clear canvas and center it
ctx.fillStyle	= 'rgba(0,0,0,1)';
ctx.fillRect(0, 0, canvas.width, canvas.height);

var spritesheet		= new Image();
spritesheet.onload	= function(){
   var images	= [];
   for(var i = 0; i <= 17; i++){
      images.push({
          image	: spritesheet,
          offsetX	: i*128,
          offsetY	: 0*128,
          width	: 128,
          height	: 128				
      });
   }

   var emitter	= Fireworks.createEmitter({nParticles : 80})
      .bindTriggerDomEvents()
      .effectsStackBuilder()
         .spawnerOneShot(5)
         .position(Fireworks.createShapeSphere(0, 0, 0, 1))
         .velocity(Fireworks.createShapeSphere(0, 0, 0, 200))
         .lifeTime(0.7, 1)
         .renderToCanvas({
             ctx	: ctx,
            type	: 'drawImage',
             image	: images
         })
         .back()
      .start()


   setInterval(function(){
      // clear the screen
      ctx.save();
      ctx.fillStyle	= 'rgba(0,0,0,1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      // update emitter and render it
      var deltaTime	= 1/60;
      emitter.update(deltaTime).render();
   }, 1000/60);
   
   
   // bind 'click' to control the flamethrower velocity
   document.body.addEventListener('click', function(event){
      var mouseX	= event.clientX - window.innerWidth /2;
      var mouseY	= event.clientY - window.innerHeight/2;

      emitter.spawner().reset();
      
      var effect	= emitter.effect('position');
      var center	= effect.opts.shape.center;
      center.set(mouseX, mouseY, 0);
   });
};
spritesheet.src	= './explosion.png';