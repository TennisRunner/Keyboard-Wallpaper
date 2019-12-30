





















var can, con;

$(document).ready(function()
{
	var blocks = Array();
	
	
	can = $("<canvas width=\"" + $(window).width() + "\" height=\"" + $(window).height() + "\"></canvas>")[0];
	con =can.getContext("2d");
	
	$("body").append(can);
	
	
		// module aliases
	var Engine = Matter.Engine,
		Render = Matter.Render,
		World = Matter.World,
  Composite = Matter.Composite,
  Body = Matter.Body,
		Bodies = Matter.Bodies;

	// create an engine
	var engine = Engine.create();
var blockSize = 80;
	

	// create two boxes and a ground
	//var boxA = Bodies.rectangle(400, 200, blockSize, blockSize);
	//var boxB = Bodies.rectangle(450, 50, blockSize, blockSize);
	var ground = Bodies.rectangle($(window).width()/2, $(window).height() - 0, $(window).width(), 60, { isStatic: true });

	// add all of the bodies to the world
	World.add(engine.world, [ ground]);

	// run the engine
	//Engine.run(engine);

	// run the renderer
	//Render.run(render);
	
	$(document).keypress(function(e)
	{
		var letterPositions = Array(
		
		"qwertyuiop",
		"asdfghjkl",
		"zxcvbnm"
		
		);
		
		var letter = e.key;
		var xOffset = -1;
		
		for(i = 0; i < letterPositions.length; i++)
		{
			for(k = 0; k < letterPositions[i].length; k++)
			{
				//console.log(letterPositions);
				
				if(letterPositions[i].charAt(k) == letter)
				{
					
					xOffset = k / letterPositions[i].length;
					
					i = 10;
					break;
				}
			}
		}		
		
		if(xOffset != -1)
		{
			letter = letter.toUpperCase();
		
			var tempBox = Bodies.rectangle($(window).width() * xOffset, $(window).height() - 150, blockSize, blockSize);
			
			
			tempBox.restitution = 0.95;
			tempBox.letter = letter;
			tempBox.friction = 0;
			World.add(engine.world, [tempBox]);
			
			
			Body.applyForce(tempBox, { x: tempBox.position.x, y: tempBox.position.y }, {x: 0, y: -0.5});
		}
		
		
	});
	
	(function render() {
	  Engine.update(engine, 16);
	  var bodies = Composite.allBodies(engine.world);
	  con.clearRect(0, 0, can.width, can.height);
	  con.beginPath();
	  
	  for (var i = 0; i < bodies.length; i += 1) {
		  
		  if(bodies[i].area == (blockSize * blockSize))
		  {
			if(bodies[i].position.x > -10 && bodies[i].position.x < $(window).width() + 10 && bodies[i].position.y > 0)
			  {
				  con.textBaseline="middle"; 
				  con.textAlign="center"; 
				  con.fillStyle = "white";
				  con.font = "120px Arial";
				  
					con.save();

					con.translate(bodies[i].position.x,bodies[i].position.y);
					con.rotate(bodies[i].angle);

	 
		  con.shadowColor = "rgba(255,255,255,0.9)";
		  con.shadowBlur = 30;

					con.fillText(bodies[i].letter,0, 0);//bodies[i].position.x,bodies[i].position.y); 
				  
					con.restore();

			//console.log(bodies[i])
			
			  }
			  else
			  {
				  Matter.Composite.remove(engine.world, bodies[i])
			  }
			  }
		  
	  }
	  con.lineWidth = 1;
	  con.strokeStyle = '#000000';
	  con.stroke();
	  
	  window.requestAnimationFrame(render);
	})();
});



