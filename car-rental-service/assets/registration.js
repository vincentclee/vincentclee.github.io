$(document).ready(function() {

// the basics
// ----------

var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex;

    // an array that will be populated with substring matches
    matches = [];

    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');

    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        // the typeahead jQuery plugin expects suggestions to a
        // JavaScript object, refer to typeahead docs for more info
        matches.push({ value: str });
      }
    });

    cb(matches);
  };
};

var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
  'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
  'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

$('#with-states .typeahead').typeahead({
  hint: true,
  highlight: true,
  minLength: 1
},
{
  name: 'states',
  displayKey: 'value',
  source: substringMatcher(states)
});

// bloodhound
// ----------

// constructs the suggestion engine
var states = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  // `states` is an array of state names defined in "The Basics"
  local: $.map(states, function(state) { return { value: state }; })
});

// kicks off the loading/processing of `local` and `prefetch`
states.initialize();

$('#bloodhound .typeahead').typeahead({
  hint: true,
  highlight: true,
  minLength: 1
},
{
  name: 'states',
  displayKey: 'value',
  // `ttAdapter` wraps the suggestion engine in an adapter that
  // is compatible with the typeahead jQuery plugin
  source: states.ttAdapter()
});

// prefetch
// --------

var makes = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  limit: 10,
  prefetch: {
    // url points to a json file that contains an array of country names, see
    // https://github.com/twitter/typeahead.js/blob/gh-pages/data/countries.json
    url: '/car-rental-service/data/make.json',
    // the json file contains an array of strings, but the Bloodhound
    // suggestion engine expects JavaScript objects so this converts all of
    // those strings
    filter: function(list) {
      return $.map(list, function(make) { return { name: make }; });
    }
  }
});

// kicks off the loading/processing of `local` and `prefetch`
makes.initialize();

// passing in `null` for the `options` arguments will result in the default
// options being used
$('#prefetch .typeahead').typeahead({
	 highlight: true
}, {
  name: 'makes',
  displayKey: 'name',
  // `ttAdapter` wraps the suggestion engine in an adapter that
  // is compatible with the typeahead jQuery plugin
  source: makes.ttAdapter()
});

//prefetch-locations
//--------

var locations = new Bloodhound({
datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
queryTokenizer: Bloodhound.tokenizers.whitespace,
limit: 10,
prefetch: {
 // url points to a json file that contains an array of country names, see
 // https://github.com/twitter/typeahead.js/blob/gh-pages/data/countries.json
 url: '/car-rental-service/data/locations.json',
 // the json file contains an array of strings, but the Bloodhound
 // suggestion engine expects JavaScript objects so this converts all of
 // those strings
 filter: function(list) {
	 return $.map(list, function(location) { return { name: location }; });
 }
}
});

//kicks off the loading/processing of `local` and `prefetch`
locations.initialize();

//passing in `null` for the `options` arguments will result in the default
//options being used
$('#prefetch-locations .typeahead').typeahead({
	 highlight: true
}, {
name: 'locations',
displayKey: 'name',
// `ttAdapter` wraps the suggestion engine in an adapter that
// is compatible with the typeahead jQuery plugin
source: locations.ttAdapter()
});

// remote
// ------

var bestPictures = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  prefetch: 'data/post_1960.json',
  remote: 'Backend?query=%QUERY'
});

bestPictures.initialize();

$('#remote .typeahead').typeahead(null, {
  name: 'best-pictures',
  displayKey: 'value',
  source: bestPictures.ttAdapter()
});

// custom templates
// ----------------

$('#custom-templates .typeahead').typeahead(null, {
  name: 'best-pictures',
  displayKey: 'value',
  source: bestPictures.ttAdapter(),
  templates: {
    empty: [
      '<div class="empty-message">',
      'unable to find any Best Picture winners that match the current query',
      '</div>'
    ].join('\n'),
    suggestion: Handlebars.compile('<p><strong>{{value}}</strong> – {{year}}</p>')
  }
});

// multiple datasets
// -----------------

//AM General
var amgeneral = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  prefetch: '/car-rental-service/data/AM-General.json'
});
//Acura
var acura = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/Acura.json'
});
//Alfa Romeo
var alfaromeo = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/Alfa-Romeo.json'
});
//Aston Martin
var astonmartin = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/Aston-Martin.json'
});
//Audi
var audi = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/Audi.json'
});
//BMW
var bmw = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/BMW.json'
});
//Bentley
var bentley = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/Bentley.json'
});
//Bugatti
var bugatti = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/Bugatti.json'
});
//Buick
var buick = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/Buick.json'
});
//Cadillac
var cadillac = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/Cadillac.json'
});
//Chevrolet
var chevrolet = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/Chevrolet.json'
});
//Chrysler
var chrysler = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/Chrysler.json'
});
//Daewoo
var daewoo = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/Daewoo.json'
});
//Dodge
var dodge = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/Dodge.json'
});
//Eagle
var eagle = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/Eagle.json'
});
//FIAT
var fiat = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/FIAT.json'
});
//Ferrari
var ferrari = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/Ferrari.json'
});
//Fisker
var fisker = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/Fisker.json'
});
//Ford
var ford = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/Ford.json'
});
//GMC
var gmc = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/GMC.json'
});
//Geo
var geo = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/Geo.json'
});
//HUMMER
var hummer = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/HUMMER.json'
});
//Honda
var honda = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/Honda.json'
});
//Hyundai
var hyundai = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/Hyundai.json'
});
//Infiniti
var infiniti = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/Infiniti.json'
});
//Isuzu
var isuzu = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/Isuzu.json'
});
//Jaguar
var jaguar = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/Jaguar.json'
});
//Jeep
var jeep = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/Jeep.json'
});
//Kia
var kia = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/Kia.json'
});
//Lamborghini
var lamborghini = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/Lamborghini.json'
});
//Land Rover
var landrover = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/Land-Rover.json'
});
//Lexus
var lexus = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/Lexus.json'
});
//Lincoln
var lincoln = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/Lincoln.json'
});
//Lotus
var lotus = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/Lotus.json'
});
//MINI
var mini = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/MINI.json'
});
//Maserati
var maserati = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/Maserati.json'
});
//Maybach
var maybach = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/Maybach.json'
});
//Mazda
var mazda = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/Mazda.json'
});
//McLaren
var mclaren = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/McLaren.json'
});
//Mercedes-Benz
var mercedesbenz = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/McLaren.json'
});
//Mercury
var mercury = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/Mercury.json'
});
//Mitsubishi
var mitsubishi = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/Mitsubishi.json'
});
//Nissan
var nissan = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/Nissan.json'
});
//Oldsmobile
var oldsmobile = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/Oldsmobile.json'
});
//Panoz
var panoz = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/Panoz.json'
});
//Plymouth
var plymouth = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/Plymouth.json'
});
//Pontiac
var pontiac = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/Pontiac.json'
});
//Porsche
var porsche = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/Porsche.json'
});
//Ram
var ram = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/Ram.json'
});
//Rolls-Royce
var rollsroyce = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/Rolls-Royce.json'
});
//Saab
var saab = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/Saab.json'
});
//Saturn
var saturn = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/Saturn.json'
});
//Scion
var scion = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/Scion.json'
});
//Smart
var smart = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/Saturn.json'
});
//Spyker
var spyker = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/Spyker.json'
});
//Subaru
var subaru = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/Subaru.json'
});
//Suzuki
var suzuki = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/Suzuki.json'
});
//Tesla
var tesla = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/Tesla.json'
});
//Toyota
var toyota = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/Toyota.json'
});
//Volkswagen
var volkswagen = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/Volkswagen.json'
});
//Volvo
var volvo = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('modelFull'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: '/car-rental-service/data/Volvo.json'
});

//Initialize
amgeneral.initialize();
acura.initialize();
alfaromeo.initialize();
astonmartin.initialize();
audi.initialize();
bmw.initialize();
bentley.initialize();
bugatti.initialize();
buick.initialize();
cadillac.initialize();
chevrolet.initialize();
chrysler.initialize();
daewoo.initialize();
dodge.initialize();
eagle.initialize();
fiat.initialize();
ferrari.initialize();
fisker.initialize();
ford.initialize();
gmc.initialize();
geo.initialize();
hummer.initialize();
honda.initialize();
hyundai.initialize();
infiniti.initialize();
isuzu.initialize();
jaguar.initialize();
jeep.initialize();
kia.initialize();
lamborghini.initialize();
landrover.initialize();
lexus.initialize();
lincoln.initialize();
lotus.initialize();
mini.initialize();
maserati.initialize();
maybach.initialize();
mazda.initialize();
mclaren.initialize();
mercedesbenz.initialize();
mercury.initialize();
mitsubishi.initialize();
nissan.initialize();
oldsmobile.initialize();
panoz.initialize();
plymouth.initialize();
pontiac.initialize();
porsche.initialize();
ram.initialize();
rollsroyce.initialize();
saab.initialize();
saturn.initialize();
scion.initialize();
smart.initialize();
spyker.initialize();
subaru.initialize();
suzuki.initialize();
tesla.initialize();
toyota.initialize();
volkswagen.initialize();
volvo.initialize();

$('#multiple-datasets .typeahead').typeahead({
	highlight: true,
},
//AM General
{
	name: 'amgeneral',
	displayKey: 'model',
	source: amgeneral.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>AM General</strong></h3>'
	}
},
//Acura
{
	name: 'acura',
	displayKey: 'model',
	source: acura.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>Acura</strong></h3>'
	}
},
//Alfa Romeo
{
	name: 'alfaromeo',
	displayKey: 'model',
	source: alfaromeo.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>Alfa Romeo</strong></h3>'
	}
},
//Aston Martin
{
	name: 'astonmartin',
	displayKey: 'model',
	source: astonmartin.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>Aston Martin</strong></h3>'
	}
},
//Audi
{
	name: 'audi',
	displayKey: 'model',
	source: audi.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>Audi</strong></h3>'
	}
},
//BMW
{
	name: 'bmw',
	displayKey: 'model',
	source: bmw.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>BMW</strong></h3>'
	}
},
//Bentley
{
	name: 'bentley',
	displayKey: 'model',
	source: bentley.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>Bentley</strong></h3>'
	}
},
//Bugatti
{
	name: 'bugatti',
	displayKey: 'model',
	source: bugatti.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>Bugatti</strong></h3>'
	}
},
//Buick
{
	name: 'buick',
	displayKey: 'model',
	source: buick.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>Buick</strong></h3>'
	}
},
//Cadillac
{
	name: 'cadillac',
	displayKey: 'model',
	source: cadillac.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>Cadillac</strong></h3>'
	}
},
//Chevrolet
{
	name: 'chevrolet',
	displayKey: 'model',
	source: chevrolet.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>Chevrolet</strong></h3>'
	}
},
//Chrysler
{
	name: 'chrysler',
	displayKey: 'model',
	source: chrysler.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>Chrysler</strong></h3>'
	}
},
//Daewoo
{
	name: 'daewoo',
	displayKey: 'model',
	source: daewoo.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>Daewoo</strong></h3>'
	}
},
//Dodge
{
	name: 'dodge',
	displayKey: 'model',
	source: dodge.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>Dodge</strong></h3>'
	}
},
//Eagle
{
	name: 'eagle',
	displayKey: 'model',
	source: eagle.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>Eagle</strong></h3>'
	}
},
//FIAT
{
	name: 'fiat',
	displayKey: 'model',
	source: fiat.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>FIAT</strong></h3>'
	}
},
//Ferrari
{
	name: 'ferrari',
	displayKey: 'model',
	source: ferrari.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>Ferrari</strong></h3>'
	}
},
//Fisker
{
	name: 'fisker',
	displayKey: 'model',
	source: fisker.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>Fisker</strong></h3>'
	}
},
//Ford
{
	name: 'ford',
	displayKey: 'model',
	source: ford.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>Ford</strong></h3>'
	}
},
//GMC
{
	name: 'gmc',
	displayKey: 'model',
	source: gmc.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>GMC</strong></h3>'
	}
},
//Geo
{
	name: 'geo',
	displayKey: 'model',
	source: geo.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>Geo</strong></h3>'
	}
},
//HUMMER
{
	name: 'hummer',
	displayKey: 'model',
	source: hummer.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>HUMMER</strong></h3>'
	}
},
//Honda
{
	name: 'honda',
	displayKey: 'model',
	source: honda.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>Honda</strong></h3>'
	}
},
//Hyundai
{
	name: 'hyundai',
	displayKey: 'model',
	source: hyundai.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>Hyundai</strong></h3>'
	}
},
//Infiniti
{
	name: 'infiniti',
	displayKey: 'model',
	source: infiniti.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>Infiniti</strong></h3>'
	}
},
//Isuzu
{
	name: 'isuzu',
	displayKey: 'model',
	source: isuzu.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>Isuzu</strong></h3>'
	}
},
//Jaguar
{
	name: 'jaguar',
	displayKey: 'model',
	source: jaguar.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>Jaguar</strong></h3>'
	}
},
//Jeep
{
	name: 'jeep',
	displayKey: 'model',
	source: jeep.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>Jeep</strong></h3>'
	}
},
//Kia
{
	name: 'kia',
	displayKey: 'model',
	source: kia.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>Kia</strong></h3>'
	}
},
//Lamborghini
{
	name: 'lamborghini',
	displayKey: 'model',
	source: lamborghini.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>Lamborghini</strong></h3>'
	}
},
//Land Rover
{
	name: 'landrover',
	displayKey: 'model',
	source: landrover.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>Land Rover</strong></h3>'
	}
},
//Lexus
{
	name: 'lexus',
	displayKey: 'model',
	source: lexus.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>Lexus</strong></h3>'
	}
},
//Lincoln
{
	name: 'lincoln',
	displayKey: 'model',
	source: lincoln.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>Lincoln</strong></h3>'
	}
},
//Lotus
{
	name: 'lotus',
	displayKey: 'model',
	source: lotus.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>Lotus</strong></h3>'
	}
},
//MINI
{
	name: 'mini',
	displayKey: 'model',
	source: mini.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>MINI</strong></h3>'
	}
},
//Maserati
{
	name: 'maserati',
	displayKey: 'model',
	source: maserati.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>Maserati</strong></h3>'
	}
},
//Maybach
{
	name: 'maybach',
	displayKey: 'model',
	source: maybach.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>Maybach</strong></h3>'
	}
},
//Mazda
{
	name: 'mazda',
	displayKey: 'model',
	source: mazda.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>Mazda</strong></h3>'
	}
},
//McLaren
{
	name: 'mclaren',
	displayKey: 'model',
	source: mclaren.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>McLaren</strong></h3>'
	}
},
//Mercedes-Benz
{
	name: 'mercedesbenz',
	displayKey: 'model',
	source: mercedesbenz.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>Mercedes-Benz</strong></h3>'
	}
},
//Mercury
{
	name: 'mercury',
	displayKey: 'model',
	source: mercury.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>Mercury</strong></h3>'
	}
},
//Mitsubishi
{
	name: 'mitsubishi',
	displayKey: 'model',
	source: mitsubishi.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>Mitsubishi</strong></h3>'
	}
},
//Nissan
{
	name: 'nissan',
	displayKey: 'model',
	source: nissan.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>Nissan</strong></h3>'
	}
},
//Oldsmobile
{
	name: 'oldsmobile',
	displayKey: 'model',
	source: oldsmobile.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>Oldsmobile</strong></h3>'
	}
},
//Panoz
{
	name: 'panoz',
	displayKey: 'model',
	source: panoz.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>Panoz</strong></h3>'
	}
},
//Plymouth
{
	name: 'plymouth',
	displayKey: 'model',
	source: plymouth.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>Plymouth</strong></h3>'
	}
},
//Pontiac
{
	name: 'pontiac',
	displayKey: 'model',
	source: pontiac.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>Pontiac</strong></h3>'
	}
},
//Porsche
{
	name: 'porsche',
	displayKey: 'model',
	source: porsche.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>Porsche</strong></h3>'
	}
},
//Ram
{
	name: 'ram',
	displayKey: 'model',
	source: ram.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>Ram</strong></h3>'
	}
},
//Rolls-Royce
{
	name: 'rollsroyce',
	displayKey: 'model',
	source: rollsroyce.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>Rolls-Royce</strong></h3>'
	}
},
//Saab
{
	name: 'saab',
	displayKey: 'model',
	source: saab.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>Saab</strong></h3>'
	}
},
//Saturn
{
	name: 'saturn',
	displayKey: 'model',
	source: saturn.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>Saturn</strong></h3>'
	}
},
//Scion
{
	name: 'scion',
	displayKey: 'model',
	source: scion.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>Scion</strong></h3>'
	}
},
//Smart
{
	name: 'smart',
	displayKey: 'model',
	source: smart.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>Smart</strong></h3>'
	}
},
//Spyker
{
	name: 'spyker',
	displayKey: 'model',
	source: spyker.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>Spyker</strong></h3>'
	}
},
//Subaru
{
	name: 'subaru',
	displayKey: 'model',
	source: subaru.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>Subaru</strong></h3>'
	}
},
//Suzuki
{
	name: 'suzuki',
	displayKey: 'model',
	source: suzuki.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>Suzuki</strong></h3>'
	}
},
//Tesla
{
	name: 'tesla',
	displayKey: 'model',
	source: tesla.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>Tesla</strong></h3>'
	}
},
//Toyota
{
	name: 'toyota',
	displayKey: 'model',
	source: toyota.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>Toyota</strong></h3>'
	}
},
//Volkswagen
{
	name: 'volkswagen',
	displayKey: 'model',
	source: volkswagen.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>Volkswagen</strong></h3>'
	}
},
//Volvo
{
	name: 'volvo',
	displayKey: 'model',
	source: volvo.ttAdapter(),
	templates: {
		header: '<h3 class="model-name"><strong>Volvo</strong></h3>'
	}
});

// scrollable dropdown menu
// ------------------------

$('#scrollable-dropdown-menu .typeahead').typeahead(null, {
  name: 'countries',
  displayKey: 'name',
  source: countries.ttAdapter()
});

var arabicPhrases = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('word'),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  local: [
    { word: "الإنجليزية" },
    { word: "نعم" },
    { word: "لا" },
    { word: "مرحبا" },
    { word: "أهلا" }
  ]
});

arabicPhrases.initialize();

$('#rtl-support .typeahead').typeahead({
  hint: false
},
{
  name: 'arabic-phrases',
  displayKey: 'word',
  source: arabicPhrases.ttAdapter()
});
});
