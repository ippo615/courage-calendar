
var family = [
	'brother',
	'sister',
	'mom',
	'dad',
	'aunt',
	'uncle',
	'grandfather',
	'grandmother',
	'grandma',
	'grandpa',
	'grandma',
	'grandpa',
	'step brother',
	'step sister',
	'step mom',
	'step dad',
	'step aunt',
	'step uncle',
	'biological mother',
	'biological father',
	'cousin',
	'second cousin'
];

function makeRandomEvent( date ){
	return {
		title: getEventTitle(),
		start: date
	}
}
function makeRandomEvents( start, end ){
	var events = [];
	var current = start.clone();
	while( current.isBefore(end) ){
		if( Math.random()<0.3 ){
			events.push( makeRandomEvent( current.format('Y-MM-DD') ) );
		}
		current.add(1,'days');
	}
	return events;
}

function getEventTitle(){
	return choose([
		'Take a trip to '+choose(countries),
		'Tavel to '+choose(countries),
		'Vacation to '+choose(countries),
		'Volunteer in '+choose(countries),

		'Learn to cook with '+choose(fruits),
		'Eat a '+choose(vegetables),
		'Learn to cook with '+choose(adjectives)+' '+choose(vegetables),
		'Learn to cook with '+choose(adjectives)+' '+choose(fruits)+' in '+choose(countries),

		'Learn to play a '+choose(musical_instruments),
		'Learn to play a '+choose(adjectives)+' '+choose(musical_instruments),
		'Play '+choose(adjectives)+' '+choose(musical_instruments)+' in a band',
		'Play '+choose(musical_instruments)+' for my '+choose(family),

		'Forgive my '+choose(family),
		'Forgive my '+choose(adjectives)+' '+choose(family),
		'Forgive '+choose(names_female),
		'Forgive '+choose(names_male),

		'Speak to my '+[choose(adjectives),choose(family)].join(' '),
		'Hug my '+[choose(adjectives),choose(family)].join(' '),
		'Tell '+ choose(names_female) +' I love her',
		'Tell '+ choose(names_male) +' I love him',

		'Take a course on '+choose(classes),
		'Take a '+choose(adjectives)+' class about '+choose(classes),
		'Start a new business focused on '+choose(adjectives)+' '+choose(common_nouns),
		'Do something about the '+choose(adjectives)+' '+choose(common_nouns),

		'Tell '+choose(names_female)+' she can '+choose(verbs)+' '+choose(adverbs),
		'Tell '+choose(names_male)+' he can '+choose(verbs)+' '+choose(adverbs),
		'Learn to '+choose(verbs)+' '+choose(adverbs),
		'Enable my community to '+choose(verbs)+' '+choose(adverbs),
	]);
}

var genericEvents = [
	'Learn a new skill',
	'Take classes',
	'Start a project',
	'Tell someone I love them',
	'Ask for something',
	'Spend more time ...',
	'Spend less time ...',
	'Travel somewhere',
	'Change career',
	'Start own business',
];


function learn(){
	var topics = [];
	return 'Start '+chooseOne(topics)+' lessons';
	'Start {topic} lessons'
	'Start own business {name}'
	'Take {topic} classes'
	'Learn how to {action}'
	'Learn to {action}'
	'Take {topic} lessons'
	'Make {thing} for {person}'
	'Tell {family} I love {pronoun}'
	'Apply for {thing}'
	'Audition for {thing}'
	'Ask for {thing}'
	'Spend more time with {person}'
	'Travel to {location}'
	'Take care of health'
	'Sell business'
	'Quit job'
}
