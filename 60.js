var Sixty = Sixty || { 'delay': 1000, 'offset': 0, 'speed': 2, 'speeds' : [3000,2000,1500,900,300,200]};
Sixty.items = [
  {},{},{},{},{},{},{},{},{},{},{},{},
  {},{},{},{},{},{},{},{},{},{},{},{},
  {},{},{},{},{},{},{},{},{},{},{},{},
  {},{},{},{},{},{},{},{},{},{},{},{},
  {},{},{},{},{},{},{},{},{},{},{},{}
];

(function($){


  /**
   * 
   */
  function getCountry(offset) {
    var countries = [
    'China',
    'India',
    'United States',
    'Indonesia',
    'Brazil',
    'Pakistan',
    'Nigeria',
    'Bangladesh',
    'Russia',
    'Japan',
    'Mexico',
    'Philippines',
    'Vietnam',
    'Ethiopia',
    'Egypt',
    'Germany',
    'Iran',
    'Turkey',
    'Democratic Republic of the Congo',
    'Thailand',
    'France',
    'United Kingdom',
    'Italy',
    'Burma',
    'South Africa',
    'South Korea',
    'Colombia',
    'Spain',
    'Ukraine',
    'Tanzania',
    'Kenya',
    'Argentina',
    'Algeria',
    'Poland',
    'Sudan',
    'Uganda',
    'Canada',
    'Iraq',
    'Morocco',
    'Peru',
    'Uzbekistan',
    'Saudi Arabia',
    'Malaysia',
    'Venezuela',
    'Nepal',
    'Afghanistan',
    'Yemen',
    'North Korea',
    'Ghana',
    'Mozambique',
    'Taiwan',
    'Australia',
    'Ivory Coast',
    'Syria',
    'Madagascar',
    'Angola',
    'Cameroon',
    'Sri Lanka',
    'Romania',
    'Burkina Faso'
    ];
    return countries[offset];
  }
  /**
   *
   */
  function getCharacter(offset) {
    var characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWX';
    character = '-';
    if (offset < characters.length) {
      character = characters[offset];
    }
    
    return character;
  }
  
  /**
   *
   */
  function getSyllable(offset) {
    syllable = 'CVN?';
    c = 'pmtlk';
    v = ['y','e','i','a','u','o','yn','on','un','an','in','en'];
    cOffset = Math.floor(offset / 12);
    vOffset = offset % 12;
    if (cOffset < c.length && vOffset < v.length) {
      syllable = c[cOffset] + v[vOffset];
    }
    
    return syllable;
  }
  
  /**
   *
   */
  function getColor(offset) {
		var step = 1.0000 / 60;
	  var hue = offset * step;
	  var rgb = hsvToRgb(hue,1,1);
	  var color = 'rgb(' + rgb.join(',') + ')';
	  
	  return color;
  }
  
  /**
	 * Converts an HSV color value to RGB. Conversion formula
	 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
	 * Assumes h, s, and v are contained in the set [0, 1] and
	 * returns r, g, and b in the set [0, 255].
	 *
	 * @param   Number  h       The hue
	 * @param   Number  s       The saturation
	 * @param   Number  v       The value
	 * @return  Array           The RGB representation
	 *
	 * @see https://gist.github.com/mjijackson/5311256
	 */
	function hsvToRgb(h, s, v) {
		var r, g, b;
	 
		var i = Math.floor(h * 6);
		var f = h * 6 - i;
		var p = v * (1 - s);
		var q = v * (1 - f * s);
		var t = v * (1 - (1 - f) * s);
	 
		switch (i % 6) {
		  case 0: r = v, g = t, b = p; break;
		  case 1: r = q, g = v, b = p; break;
		  case 2: r = p, g = v, b = t; break;
		  case 3: r = p, g = q, b = v; break;
		  case 4: r = t, g = p, b = v; break;
		  case 5: r = v, g = p, b = q; break;
		}
	 
		return [ Math.round(r * 255), Math.round(g * 255), Math.round(b * 255) ];
	}

  /**
   *
   */
  function goSixtyColorGrid() {
		var numColors = 60;
		var numRows = 5;
		var numCells = Math.floor(numColors / numRows);
		var output = '<table>';
		for (var i = 0; i < numRows; i++) {
		  output += '<tr>';
			for (var j = 0; j < numCells; j++) {
			  var step = 1.0000 / numColors;
			  var offset = i*12 + j;
			  var hue = offset * step;
			  var rgb = hsvToRgb(hue,1,1);
			  var color = rgb.join(',');
				output += '<td class="sixty-color-grid" style="background:rgb(' + color+ ');">' + i + j + '</td>';
			}
			output += '</tr>';
	  }
		output += '</table>';
		
		return output;
  }

  /**
   *
   */
  function goSixty() {
    console.log('go!');
    var offset = Sixty.offset;
    //var items = Sixty.items[Sixty.offset];
    $('#character').text(getCharacter(offset));
    $('#syllable').text(getSyllable(offset));
    $('#decimal').text(offset);
    $('#country').text(getCountry(offset));
    var color = getColor(offset);
    $('.jumbotron').css('background-color', color);
    Sixty.offset = (Sixty.offset + 1) % Sixty.items.length;
  }
  
  $(document).ready(function(){
    $('.speed .speed-value').text(Sixty.speed);
    // Handles playing.
    $('.action-play').click(function(){
      console.log('Play!');
      Sixty.cycle = setInterval(goSixty, Sixty.delay);
    });
    
    // Handles pausing.
    $('.action-pause').click(function(){
      console.log('Stop!');
      clearInterval(Sixty.cycle);
    });
    
    $('.action-reset').click(function(){
      Sixty.offset = 0;
      console.log('Back to the top!');
      clearInterval(Sixty.cycle);
      Sixty.cycle = setInterval(goSixty, Sixty.delay);
    });

    $('.action-fast').click(function(){
      console.log('Fast!');
      clearInterval(Sixty.cycle);
      if ((Sixty.speed + 1) < Sixty.speeds.length) {
        Sixty.speed = Sixty.speed + 1;
        Sixty.delay = Sixty.speeds[Sixty.speed];
      }
      $('.speed .speed-value').text(Sixty.speed);
      
      Sixty.cycle = setInterval(goSixty, Sixty.delay);
    });
    
    $('.action-slow').click(function(){
      console.log('Slow!');
      clearInterval(Sixty.cycle);
      if (Sixty.speed > 0) {
        Sixty.speed = Sixty.speed - 1;
        Sixty.delay = Sixty.speeds[Sixty.speed];
      }
      $('.speed .speed-value').text(Sixty.speed);
      
      Sixty.cycle = setInterval(goSixty, Sixty.delay);
    });
  });	
})(jQuery);

