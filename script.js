rotateGlobe = true;
zoomed = false;
setTimeout(function(){ $("#load").css('display','none'); }, 4000);


var mx,my;
slides = []


document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            next();
        } else {
            back();
        }                       
     } //else {
    //     if ( yDiff > 0 ) {
    //         alert('up');
    //     } else { 
    //         alert('down');
    //     }                                                                 
    // }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};

setInterval(function(){
	if (cslide==3-1) {
		globe.plugins.pings.add(104.1954,35.8617, { color: 'red', ttl: 1000, angle: size});     //china

		globe.plugins.pings.add(14.8966,-0.6606, { color: 'red', ttl: 1000, angle: size});//congo basin


		globe.plugins.pings.add(-62.2159,-3.4653, { color: 'red', ttl: 1000, angle: size});//amazon
		
	}
	else if (cslide==3-2){//undev countries
		globe.plugins.pings.add(8.0817,17.6078, { color: 'red', ttl: 1000, angle: size});     //niger

		globe.plugins.pings.add(17.8739,-11.2027, { color: 'red', ttl: 1000, angle: size});//angolia
	}

},1000)


for (k in md) {	
	slides.push(marked(md[k]));
	console.log(marked(md[k]));
}

selectValues = [];
for (i=1;i<=slides.length;i++)  {
	selectValues.push(i);
}
$("#ss").text('1'+'/'+slides.length)
document.onmousemove = function(e){
  e = e || window.event;
  mx = e.clientX;
  my = e.clientY;
};


function openFullscreen() {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if (document.documentElement.webkitRequestFullscreen) { /* Safari */
    document.documentElement.webkitRequestFullscreen();
  } else if (document.documentElement.msRequestFullscreen) { /* IE11 */
    document.documentElement.msRequestFullscreen();
  }
}

function checkOverflow()
{
	el = document.getElementById('slide');
   var curOverflow = el.style.overflow;

   if ( !curOverflow || curOverflow === "visible" )
      el.style.overflow = "hidden";

   var isOverflowing = el.clientWidth < el.scrollWidth 
      || el.clientHeight < el.scrollHeight;

   el.style.overflow = curOverflow;

   return isOverflowing;
}
$('#inbetween').text('1'+'/'+slides.length);
function elementAtMousePosition() {
	return document.elementFromPoint(mx,my);
}

cslide = -1
next();
// $('#slide').html(slides[0]);

// $.get("countries.json", function(data, status){
// 	countries = data;
// });

// $.get("data.json", function(data, status){
// 	data = data;
// });



function mars() {
	// $("#rocket").css('display','inline-block');
	$('#rocket').css('z-index','999999999999999');
	$("#rocket").css({
		'bottom':"87vh",
		'right':"38vw",
	});
	setTimeout(function(){ $("#rocket").css('transform','rotate(0deg)'); }, 2000);
	setTimeout(function(){ $("#rocket").css({'display':'none','left':'75vh','top':'46vh'}); }, 4000);
	
}
goclick=true;
window.addEventListener("keydown", function(event){
	if (event.isComposing || event.keyCode === 229) {return;}
	else if (event.keyCode == 37 && goclick) {back();}//left arrow = 37
	else if (event.keyCode == 39 && goclick) {next();}//right arrow= 39
	
});
function thanks() {
	$('#thanks').fadeIn();
}

document.getElementById('slide').onscroll = function() {
	obj = document.getElementById('slide');
	if( obj.scrollTop === (obj.scrollHeight - obj.offsetHeight)){
		$('#over').hide();
	}
	else {
		$('#over').show();
	}
}

function it() {
	if (cslide==7-1) {
		$("#rocket").css({
		'bottom':"200px",
		'right':"250px",
	});
	console.log('moved mars rocket');
	}
	if (cslide==8-1) {
		setTimeout(mars,3000);
	}
	if (cslide==9-1) {
		setTimeout(thanks,3000);
	}
	if (cslide == 3-1 || cslide == 2-1){
		$('#moon').hide()
		//Do globe zoom
		rotateGlobe = false;
		document.getElementById('rotate').checked = false;
		document.getElementById('rmoon').checked = false;
		$('#moon').removeClass('r');	
	}
	else {
		$('#moon').show()
		rotateGlobe = true;
		document.getElementById('rotate').checked = true;
		document.getElementById('rmoon').checked = true;
		$('#moon').addClass('r');
		globe.projection.scale(200);
	}


	if (cslide==3-1) {
		globe.projection.scale(300).rotate([25, 0, 0]);
	}
	else if (cslide==2-1) {
		globe.projection.scale(400).rotate([-10, 0, 0]);
	}
	setTimeout(function(){
	if (checkOverflow()){
		$('#over').show();
	}else{
		$('#over').hide();
	}},500)
}
function back() {
	if (cslide-1>-1) {
		goclick=false;
		$('#slide').fadeOut(function(){
			$('#slide').html(slides[cslide-1]);
			cslide = cslide-1;
			$("#ss").text((cslide+1)+'/'+slides.length);
			it();
			$('#slide').fadeIn(function(){goclick=true});
		});
	}
}
function next() {
	goclick=false;
	if (cslide+1<slides.length) {
		$('#slide').fadeOut(function(){
			$('#slide').html(slides[cslide+1]);
			cslide = cslide+1;
			$("#ss").text((cslide+1)+'/'+slides.length)
			it();

			$('#slide').fadeIn(function(){goclick=true});
		});
	}
}
crazy=10;
function last() {
	goclick=false;
	$('#slide').fadeOut(function(){
		$('#slide').html(slides[slides.length-1]);
		cslide = slides.length-1;
		$("#ss").text((cslide+1)+'/'+slides.length)
		it();
		$('#slide').fadeIn(function(){goclick=true});
	});
}
$("#move-beg").click(function(){
	goclick=false;
	$('#slide').fadeOut(function(){
		$('#slide').html(slides[0]);
		cslide = 0;
		$("#ss").text((cslide+1)+'/'+slides.length)
		it();
		$('#slide').fadeIn(function(){goclick=true});
	});
});
$("#move-last").click(function(){
	last();
});
$("#move-back").click(function(){back()});
$("#move-next").click(function(){next()});


var size = 10;
var color = 'red';
var long = 0;
var lat = 0;



// setInterval(function(){
// 	if (cslide==3-1) {
// 		document.getElementById('rotate').checked = true;
// 		globe.plugins.pings.add(0,0, { color: color, ttl: 1000, angle: size});
// 	}
// 	else {
// 		document.getElementById('rotate').checked = true;
// 	}
// },1000);

$('#rotate').change(function() {
	rotateGlobe = this.checked;
});
$('#crazy').change(function() {//161520
	if (this.checked) {
		crazy=400;
		$('#r2,#r3,#r4,#moon').css('animation-duration','0.4s');
	}
	else {
		crazy=10;
		globe.loadPlugin(autorotate(10));
		$('#r2').css('animation-duration','16s');
		$('#r3').css('animation-duration','15s');
		$('#r4').css('animation-duration','20s');
		$('#r4').css('animation-duration','10s');
	}
});

$('#rmoon').change(function() {
	if (this.checked) {
		$('#moon').addClass('r');
	}
	else {
		$('#moon').removeClass('r');
	}
});
$('#roc').change(function() {
	if (!this.checked) {
		$('.ro').addClass('no');
	}
	else {
		$('.ro').removeClass('no');
	}
});

$('#reset').click(function(){
	  globe.projection.scale(200).translate([250,250]).rotate([100, -10, 0]);
});

(function() {
  globe = planetaryjs.planet();
  globe.loadPlugin(autorotate(10));
  globe.loadPlugin(planetaryjs.plugins.earth({
    topojson: { file:   '/world-110m-withlakes.json' },
    oceans:   { fill:   '#000080' },
    land:     { fill:   '#339966' },
    borders:  { stroke: '#aaa' }
  }));
  globe.loadPlugin(lakes({
    fill: '#000080'
  }));
  globe.loadPlugin(planetaryjs.plugins.pings());
  globe.loadPlugin(planetaryjs.plugins.zoom({
    scaleExtent: [200, 1000]
  }));
  globe.loadPlugin(planetaryjs.plugins.drag({
    onDragStart: function() {
      this.plugins.autorotate.pause();
    },
    onDragEnd: function() {
      this.plugins.autorotate.resume();
    }
  }));
  globe.projection.scale(200).translate([250,250]).rotate([100, -10, 0]);

  var canvas = document.getElementById('Globe');
  // if (window.devicePixelRatio == 2) {
  //   canvas.width = 100;
  //   canvas.height = 800;
  //   context = canvas.getContext('2d');
  //   context.scale(2, 2);
  // }
  globe.draw(canvas);
  function autorotate(degPerSec) {
    return function(planet) {
      var lastTick = null;
      var paused = false;
      planet.plugins.autorotate = {
        pause:  function() { paused = true;  },
        resume: function() { paused = false; }
      };
      planet.onDraw(function() {
        if (paused || !lastTick || !rotateGlobe) {
          lastTick = new Date();
        } else {
          var now = new Date();
          var delta = now - lastTick;
          var rotation = planet.projection.rotate();
          rotation[0] += crazy * delta / 1000;
          if (rotation[0] >= 180) rotation[0] -= 360;
          planet.projection.rotate(rotation);
          lastTick = now;
        }
      });
    };
  };
  function lakes(options) {
    options = options || {};
    var lakes = null;

    return function(planet) {
      planet.onInit(function() {
        var world = planet.plugins.topojson.world;
        lakes = topojson.feature(world, world.objects.ne_110m_lakes);
      });

      planet.onDraw(function() {
        planet.withSavedContext(function(context) {
          context.beginPath();
          planet.path.context(context)(lakes);
          context.fillStyle = options.fill || 'black';
          context.fill();
        });
      });
    };
  };
})();
