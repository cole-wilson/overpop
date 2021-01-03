rotateGlobe = true;
zoomed = false;
setTimeout(function(){ $("#load").css('display','none'); }, 4000);

var mx,my;
slides = []
// alert(marked('*j*'))
for (k in md) {	
	slides.push(marked(md[k]));
	console.log(marked(md[k]))
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


$('#inbetween').text('1'+'/'+slides.length);
function elementAtMousePosition() {
	return document.elementFromPoint(mx,my);
}
cslide = 0
$('#slide').html(slides[0]);

$.get("countries.json", function(data, status){
	countries = data;
});

$.get("data.json", function(data, status){
	data = data;
});



function mars() {
	// $("#rocket").css('display','inline-block');
	$('#rocket').css('z-index','999999999999999');
	$("#rocket").css({
		'top':"0vh",
		'left':"57vw",
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
function it() {
	if (cslide==1) {
		mars();
	}
	// if {
		
	// }
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


var size = 10
var color = 'red'
var long = 0
var lat = 0



setInterval(function(){
	if (!(lat==0&&long==0)) {
		globe.plugins.pings.add(long, lat, { color: color, ttl: 1000, angle: size});
	}
},1000);

$('#rotate').change(function() {
	rotateGlobe = this.checked;
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
  if (window.devicePixelRatio == 2) {
    canvas.width = 100;
    canvas.height = 800;
    context = canvas.getContext('2d');
    context.scale(2, 2);
  }
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
          rotation[0] += degPerSec * delta / 1000;
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
