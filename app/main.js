$(document).ready(function() {

	console.info( makeRandomEvents( moment().subtract(3,'months'), moment().add(3,'months') ) );

	$('#calendar').fullCalendar({
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		},
		defaultDate: new Date(),
		businessHours: true, // display business hours
		editable: true,
		events: makeRandomEvents( moment().subtract(2,'years'), moment().add(2,'years') ),
		/*
		events: [
			{
				title: 'Business Lunch',
				start: '2016-06-03T13:00:00',
				constraint: 'businessHours'
			},
			{
				title: 'Meeting blha dbasofna s asjj afjdojosdfj sdjsdoji dsfo ',
				start: '2016-06-13T11:00:00',
				constraint: 'availableForMeeting', // defined below
				color: '#257e4a'
			},
			{
				title: 'Conference',
				start: '2016-06-18',
				end: '2016-06-20'
			},
			{
				title: 'Party',
				start: '2016-06-29T20:00:00'
			},

			// areas where "Meeting" must be dropped
			{
				id: 'availableForMeeting',
				start: '2016-06-11T10:00:00',
				end: '2016-06-11T16:00:00',
				rendering: 'background'
			},
			{
				id: 'availableForMeeting',
				start: '2016-06-13T10:00:00',
				end: '2016-06-13T16:00:00',
				rendering: 'background'
			},

			// red areas where no events can be dropped
			{
				start: '2016-06-24',
				end: '2016-06-28',
				overlap: false,
				rendering: 'background',
				color: '#ff9f89'
			},
			{
				start: '2016-06-06',
				end: '2016-06-08',
				overlap: false,
				rendering: 'background',
				color: '#ff9f89'
			}
		],
		*/
		eventMouseover: function(event, jsEvent, view){
			$(this).addClass('animated infinite wiggle');
		},
		eventMouseout: function(event, jsEvent, view){
			$(this).removeClass('animated infinite wiggle');
		},
		eventClick: function(calEvent, jsEvent, view) {
			chatClear('#chat-messages');
			$("#modal-chat").modal({
				fadeDuration: 100
			});

			typeMessage( getGreeting(), 100, 'other', 'Robot', 'desktop', '#chat-messages' );
			typeMessage( 'Are interested in "'+calEvent.title+'?"', 500, 'other', 'Robot', 'desktop', '#chat-messages' );
			chat.process = isYesNoMaybe;
			chat.targetDate = calEvent
    },
		dayClick: function(date, jsEvent, view){
			chatClear('#chat-messages');
			$("#modal-chat").modal({
				fadeDuration: 100
			});

			//say( 'Hello world', 'primary', 'You', 'user', '#chat-messages' );
			typeMessage( getGreeting(), 100, 'other', 'Robot', 'desktop', '#chat-messages' );
			typeMessage( 'What did you want to do on '+moment(date).calendar()+'?', 500, 'other', 'Robot', 'desktop', '#chat-messages' );
			chat.process = listenToTroubleArea;
			chat.targetDate= date;
		}
	});

	function chatProcessEcho( text ){
		typeMessage( text, 100, 'other', 'Robot', 'desktop', '#chat-messages' );
		return text;
	}

	function listenToPossibilities( text ){
		typeMessage( getPositiveAffirmation(), 100, 'other', 'Robot', 'desktop', '#chat-messages' );
		typeMessage( 'So you will do it by '+moment(chat.targetDate).calendar()+'?', 1000, 'other', 'Robot', 'desktop', '#chat-messages' );
		chat.process = listenToDate;
	}

	var reYes = /yes|yup|yi+|yei+|ye+a+h|of course|certianly|sure|a+l+ways|fine|ok|o+ka+y/g;
	var reNo = /no+|nope|na+h|ne+ve+r|not today/g;
	var reMaybe = /maybe|i dont know|possibly|perhaps|someday/g;
	var reDone = /thats it|nothing|thats all|no|nope|im good|thats everything|i dont/g;

	function yesNoScore( text ){
		var yesCount = reCount(text, reYes );
		var noCount = reCount(text, reNo );
		var maybeCount = reCount(text, reMaybe );
		var score = yesCount - noCount;
		if( maybeCount !== 0 ){
			score = Math.round(score / maybeCount);
		}
		return score;
	}

	function listenToTroubleArea( text ){
		if( reCount( text, reDone ) > 0 ){
			typeMessage( getAck(), 100, 'other', 'Robot', 'desktop', '#chat-messages' );
			typeMessage( getPromptsForPossibilities(), 500, 'other', 'Robot', 'desktop', '#chat-messages' );
			chat.process = listenToPossibilities;
		}else{
			typeMessage( getPromptsForMore(), 300, 'other', 'Robot', 'desktop', '#chat-messages' );
		}
	}

	function chatIgnore( text ){
		var text = choose([
			'blah blah blah blah',
			'I am ignoring you',
			'I dont know what to say',
			'Click a different event to have another award-winning conversation',
			':-p',
			':-P',
			'There may be someone looking over your shoulder...',
			'So, do you come here often? because I have no memory and everytime is a new time for me.',
			'Did you find this helpful at all?',
			'I am a robot, you know that, right?',
			'I have run out of things to say'
		]);
		if( Math.random() < 0.5 ){
			typeMessage( text, 100, 'other', 'Robot', 'desktop', '#chat-messages' );
		}
	}

	function listenToDate( text ){
		var score = yesNoScore( text );
		// no
		if( score < 0 ){
			typeMessage( "'-_-", 100, 'other', 'Robot', 'desktop', '#chat-messages' );
			typeMessage( "Ok." , 100, 'other', 'Robot', 'desktop', '#chat-messages' );
			chat.process = chatIgnore;
		}

		// maybe
		else if( score === 0 ){
			typeMessage( getPushForDecision() , 100, 'other', 'Robot', 'desktop', '#chat-messages' );
		}

		// yes
		else if( score > 0 ){
			typeMessage( "^_^ Yaay!", 100, 'other', 'Robot', 'desktop', '#chat-messages' );
			typeMessage( 'Good luck. Hope everything works out for you!', 500, 'other', 'Robot', 'desktop', '#chat-messages' );
			chat.process = chatIgnore;
		}
	}

	function isYesNoMaybe( text ){
		var score = yesNoScore( text );

		// no
		if( score < 0 ){
			typeMessage( getAck(), 100, 'other', 'Robot', 'desktop', '#chat-messages' );
			typeMessage( getPromptsForProblems() , 100, 'other', 'Robot', 'desktop', '#chat-messages' );
			chat.process = listenToTroubleArea;
		}

		// maybe
		else if( score === 0 ){
			typeMessage( getPushForDecision() , 100, 'other', 'Robot', 'desktop', '#chat-messages' );
			chat.process = isYesNoMaybe;
		}

		// yes
		else if( score > 0 ){
			typeMessage( getAck(), 100, 'other', 'Robot', 'desktop', '#chat-messages' );
			typeMessage( 'What is that area like for you now?', 500, 'other', 'Robot', 'desktop', '#chat-messages' );
			chat.process = listenToTroubleArea;
		}
	}

	var chat = new Chat();
	chat.process = function( text ){
		//typeMessage( text, 100, 'other', 'Robot', 'desktop', '#chat-messages' );
		return text;
	};
	chat.targetDate = null;

	$(window).on('resize',function(){
		$('#calendar').fullCalendar('option', 'height', 'parent');
	});
	$('#calendar').fullCalendar('option', 'height', 'parent');

	function processInputText( text ){
		say( text, 'primary', 'You', 'user', '#chat-messages' );
		var $chat = $('#chat-messages');
		$chat.animate({scrollTop: $chat.prop("scrollHeight")}, 300);
		chat.addInput( text );
	}

	$('.chat-input').on('keypress',function(ev){
		if( ev.which == 13 ){
			processInputText( this.value );
			this.value = '';
		}else{
			chat.resetCountdown();
		}
	});
	$('#btn-chat-say-it').on('click',function(ev){
		var input = $(this).parent().find('input')[0];
		processInputText( input.value );
		input.value = '';
	});

	setTimeout( function(){
		$('#modal-legal').modal({
			fadeDuration: 300
		});
	}, 500 );

});