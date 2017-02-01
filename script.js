function Map(){
	var self = this;
	
	self.levelPosition = function( level, choice ){
		var left = 0;
		var top = 0;
		
		switch( level ){
			case 0:
				return {
					x: 410,
					y: 406,
					failed: false
				}
			case 1:
				switch( choice ){
					case 1:
						return {
							x: 401,
							y: 310,
							failed: true
						}
					case 2:
						return {
							x: 356,
							y: 384,
							failed: false
						}
					case 3:
						return {
							x: 395,
							y: 463,
							failed: true
						}
					
				}

				break;
			case 2:
				switch( choice ){
					case 1:
						return {
							x: 381,
							y: 211,
							failed: false
						}
					case 2:
						return {
							x: 352,
							y: 259,
							failed: true
						}
					case 3:
						return {
							x: 234,
							y: 403,
							failed: true
						}
					case 4:
						return {
							x: 197,
							y: 452,
							failed: true
						}
					
				}
				break;
			case 3:
				switch( choice ){
					case 1:
						return {
							x: 277,
							y: 207,
							failed: true
						}
					case 2:
						return {
							x: 215,
							y: 269,
							failed: false
						}
					case 3:
						return {
							x: 159,
							y: 329,
							failed: true
						}
					case 4:
						return {
							x: 120,
							y: 392,
							failed: true
						}
					case 5:
						return {
							x: 90,
							y: 472,
							failed: true
						}
					
				}
				break;
			case 4:
				switch( choice ){
					case 1:
						return {
							x: 170,
							y: 206,
							failed: true
						}
					case 2:
						return {
							x: 106,
							y: 268,
							failed: false
						}
					case 3:
						return {
							x: 60,
							y: 351,
							failed: true
						}
					
				}

				break;
			case 5:
				return {
					x: 30,
					y: 238,
					failed: false
				}
			
		}
	}
	
	
	
	// init
	self.$el = document.createElement('div');
	self.$el.classList.add('map');
}


function Faeze(sound, map){
	var self = this;
	self.go = function(position, playSound){
		if( typeof playSound == 'undefined' || playSound !== false ) {
			sound.play('jump');
		}
		self.$el.style.left = (position.x - 27) +'px';
		self.$el.style.top = (position.y - 70)+'px';
	}
	self._score = 2000;
	self.score = function(val){
		if( val === 0 ){
			self._score = 2000;
		}
		else{
			self._score+=val;
		}
		self.$score.innerHTML = self._score<0? ('منفی '+(self._score*-1)): self._score;
	}

	self.level = 0;
	self.ask = function(question, soundPlay, callback){
		var $el = document.createElement('div');
		$el.classList.add('question');
		$el.innerHTML = question.body;
		
		var $choice;
		for( var i = 0; i < question.choices.length; i++ ){
			$choice = document.createElement('div');
			$choice.classList.add('choice');
			$choice.setAttribute('choice', i+1);
			$choice.innerHTML = question.choices[i];
			$el.appendChild($choice);
			$choice.onclick = function(){
				var answer = parseInt( this.getAttribute('choice') );
				$el.remove();
				
				var rightAnswer = parseInt( Math.random() * question.choices.length ) + 1;
				
				callback(answer, answer == rightAnswer);
				if( soundPlay == true && answer == rightAnswer ){
					setTimeout( function(){
						sound.play('bonus');
					}, 500);
				}
				else if( soundPlay == true ){
					setTimeout( function(){
						sound.play('fcked');
					}, 500);
				}
				
			}
		}
		map.$el.appendChild($el);
		

	}
	self.fcked = function(start, fromMahram){
		self.$el.classList.add('fcked');
	}
	self.ended = function(start){
		self.$el.classList.add('ended');
	}
	self.reset = function(){
		self.$el.classList.remove('ended');
		self.$el.classList.remove('fcked');
		//self.go( map.levelPosition(0), false );
	}
	
	
	// init
	self.$el = document.createElement('div');
	self.$el.classList.add('faeze');
	self.$score = document.createElement('div');
	self.$score.classList.add('score');
}

function Sound(){
	var self = this;
	self.play = function(soundName){
		switch(soundName){
			case 'jump':
				soundEffect(523.25, 0.05, 0.2, 'sine', 3, 0.8, 0, 600, true, 100, 0);
				break;
			case 'fcked':
			  soundEffect(150, 0, 0.3, "square", .05, 0, 0);  
			  soundEffect(50, 0, 0.7, "square", .06, 0, 0.2);
				break;
			case 'ended':
				soundEffect(180, 0, 0.2, "square", 0.07, 0, 0);
				soundEffect(880, 0, 0.2, "square", 0.07, 0, 0);
				soundEffect(880, 0, 0.2, "square", 0.07, 0, 0.2);
				soundEffect(880, 0, 0.2, "square", 0.07, 0, 0.6);
				soundEffect(550.33, 0, 0.2, "square", 0.06, 0, 1);
				soundEffect(350.33, 0, 0.2, "square", 0.06, 0, 1);
				soundEffect(880, 0, 0.2, "square", 0.07, 0, 1.2);
				soundEffect(1180, 0, 0.2, "square", 0.07, 0, 1.6);
				soundEffect(680, 0, 0.2, "square", 0.07, 0, 1.6);
				soundEffect(550.33, 0, 0.2, "square", 0.06, 0, 2.4);
				soundEffect(350.33, 0, 0.2, "square", 0.06, 0, 2.4);
				break;
			case 'bonus':
				soundEffect(587.33, 0, 0.2, 'square', 0.06, 0, 0);
				soundEffect(880, 0, 0.2, 'square', 0.06, 0, 0.1);
				soundEffect(1174.66, 0, 0.3, 'square', 0.05, 0, 0.2);
				break;
		}
	}
}

function message(text, callback){
	var $overlay = document.createElement('div');
	var $desc = document.createElement('div');

	$overlay.classList.add('overlay');
	$desc.classList.add('desc');
	$desc.innerHTML = text;
	document.body.appendChild($overlay);
	document.body.appendChild($desc);
	$overlay.onclick = $desc.onclick = function(){
		$overlay.remove();
		$desc.remove();
		callback();
	}
	
}

var map = new Map();
document.body.appendChild( map.$el );

var sound = new Sound();

var faeze = new Faeze(sound, map);
map.$el.appendChild( faeze.$el );
map.$el.appendChild( faeze.$score );


function Game(map, faeze, sound){
	var self = this;
	self.currentLevel = 0;
	self.lastRightAnswer = 0;
	self.play = function(level){
		switch( level ){
			case 0:
				faeze.reset();
				faeze.score(0);
				faeze.go( map.levelPosition(0), false );
				faeze.ask({
					body: 'الان باید از رو کدوم پل برم؟ :(',
					choices: ['دوست پدر', 'عمو', 'پسردایی پدر']
				}, true, function(answer, isTrue){
					if( isTrue ){
						self.lastRightAnswer = answer;
						faeze.score(+100);
						self.currentLevel++;
						faeze.go( map.levelPosition(self.currentLevel, answer) );
						self.play(self.currentLevel);
					}
					else{
						faeze.score(-200);
						faeze.go( map.levelPosition(self.currentLevel+1, answer) );
						faeze.fcked();
						self.gameOver(false);
					}
				});
				break;
			case 1:
				faeze.reset();
				faeze.ask({
					body: 'خب خدا رو شکر. تا الان که کسی بهم تجاوز نکرد. الان از رو کی رد شم؟',
					choices: ['پسر خواهر', 'داماد عمو', 'پسرعموی مادر', 'شوهر خاله']
				}, true, function(answer, isTrue){
					if( isTrue ){
						self.lastRightAnswer = answer;
						faeze.score(+200);
						self.currentLevel++;
						faeze.go( map.levelPosition(self.currentLevel, answer) );
						self.play(self.currentLevel);
					}
					else{
						faeze.score(-300);
						faeze.go( map.levelPosition(self.currentLevel+1, answer) );
						faeze.fcked();
						self.gameOver();
					}
				});
				break;
			case 2:
				faeze.reset();
				faeze.ask({
					body: 'بازم خدا رو صد هزار مرتبه شکر که هنوز تمبون تنمه. حالا از کی رد شم؟',
					choices: ['شوهرعمه', 'پدربزرگ', 'دوست عمو', 'مغازه دار', 'پسر عمو']
				}, true, function(answer, isTrue){
					if( isTrue ){
						self.lastRightAnswer = answer;
						faeze.score(+300);
						self.currentLevel++;
						faeze.go( map.levelPosition(self.currentLevel, answer) );
						self.play(self.currentLevel);
					}
					else{
						faeze.score(-400);
						faeze.go( map.levelPosition(self.currentLevel+1, answer) );
						faeze.fcked();
						self.gameOver();
					}
				});
				break;
			case 3:
				faeze.reset();
				faeze.ask({
					body: 'آخ جون ^_^ از رو اینم رد شم دیگه کار تمومه. از رو کی برم؟',
					choices: ['دوست برادر', 'پسر برادر', 'شوهر خواهر']
				}, true, function(answer, isTrue){
					if( isTrue ){
						self.lastRightAnswer = answer;
						faeze.score(+400);
						self.currentLevel++;
						faeze.go( map.levelPosition(self.currentLevel, answer) );
						self.play(self.currentLevel);
					}
					else{
						faeze.score(-500);
						faeze.go( map.levelPosition(self.currentLevel+1, answer) );
						faeze.fcked();
						self.gameOver();
					}
				});
				break;
			case 4:
				faeze.reset();
				faeze.ask({
					body: 'آفرین! شما با امتیاز '+faeze._score+' پل‌ها رو پشت سر گذاشتید! سوال آخر. فائزه بره خونه دوستش؟',
					choices: ['بله','آره']
				}, false, function(answer, isTrue){
					faeze.score(-5000);
					sound.play('ended');
					self.currentLevel++;
					faeze.ended();
					faeze.go( map.levelPosition(5) );
					self.play(self.currentLevel);
				});
				break;
			case 5:
				faeze.ask({
					body: 'پدر دوست فائزه به او تجاوز کرد! انصافا خود ما سازندگان این بازی هم از او انتظار نداشتیم! می‌خواهید یک بار دیگر بازی کنید؟',
					choices: ['بله', 'خیر']
				}, false, function(answer){
					if( answer == 1 ){
						self.play(0);
					}
					else{
						window.location = "https://github.com/nainemom/faeze";
					}
				});
		}
	}
	self.gameOver = function(continue_){
		var choices = typeof continue_ != 'undefined' && continue_ == false? ['از اول بیار!']: ['از اول بیار!','از همینجا ادامه می‌دم!'];
		faeze.ask({
			body: 'متأسفانه به فائزه تجاوز شد! یکی از گزینه‌های زیر را انتخاب کنید.',
			choices: choices
		}, false, function(answer){
			console.log(answer);
			if( answer == 1){
				faeze.score(0);
				faeze.reset();
				self.play(0);
			}
			else if( answer == 2 ){
				faeze.go( map.levelPosition(self.currentLevel, self.lastRightAnswer) );
				faeze.reset();
				self.play(self.currentLevel);
			}
		});
	}
}


var game = new Game(map, faeze, sound);


faeze.go( map.levelPosition(0), false );

message("فائزه می‌خواهد برای دیدن دوستش از روی رودخوانه‌ها رد شود، لطفا او را راهنمایی کنید تا از مسیری رد شود که نامحرمی نباشد. البته اگر گزینه درست را هم انتخاب کنید، باز هم تضمینی نیست، چون متجاوز در هر سوال بصورت اتفاقی انتخاب می‌شود! <b> برای شروع بازی کلیک کنید. </b>", function(){
	game.play(0);
});
