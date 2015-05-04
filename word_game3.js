var count = 0;
var persent;
var words = ["我","們","先","來","暖","身","歌名","將軍令","演唱","五月天",
				"等誰","聲","才","何時","生活","喔喔","什麼","決定","忍受"
				,"OH","歷史","至少","誰","不朽","喔喔","拳頭","念頭","去","愛","夢"
				,"副歌","GO","頭","怎麼","就","去說","生命","長風","誰","你","名字","什麼~","蜉蝣"
				,"頑童","今天","OH","~~","麋","宇宙","聽見","OH","星月","光","求"
				,"瞳孔","我我","戰","直到","何時","求","將軍","喔","副歌","GO"
				,"盡頭","曾","活","讓","說!","如長","誰的","將","那個","什麼~"
				,"製","作","人","陳","自","泓","李","洋","逸","準備"
				,"飛","顛沛","土地","失去","什麼","此刻","你是","什麼","為"
				,"長","誰","想","名字","將","相信","執著","什麼","END"
				," ","","","","","","","","","","","","","","","","","","",""];
				
function PlayGround(selector, selector_word, selector_score)
{
	this.canvas = document.getElementById(selector);
	this.selector_word = selector_word;		//stores the id of the input where the user can type the word
	this.selector_score = selector_score;	//stores the id of the div where the score is stored
	persent1 = document.getElementById("persent1");
	persent2 = document.getElementById("persent2");
	persent3 = document.getElementById("persent3");
	
	console.log(this.canvas);
	this.words = [];
	
	this.score = 0;		//記錄分數
	this.counter = 0;	//記錄建了多少個數字

	//主要執行的地方
	this.playGame = function()
	{
		this.fallWords();				//下降字
		this.createWord();				//製造新的字
		this.updateWordPositions();		//update where the words are displayed
		if(this.score < 10000 )
			persent1.innerHTML='<div class="progress-bar progress-bar-success progress-bar-striped active" style="width:'+ (this.score)/200 +'%">'; //<10000分是綠色的
		if(this.score > 10000 && this.score <  17000)
			persent2.innerHTML='<div class="progress-bar progress-bar-warning progress-bar-striped active" style="width:'+ (this.score-10000)/150 +'%">';
		else if(this.score > 17000)
			persent3.innerHTML='<div class="progress-bar progress-bar-danger progress-bar-striped active" style="width:'+ (this.score-17000)/150 +'%">';
		
	}

	//檢查輸入的字跟words裡的字有沒有一樣
	this.checkWord = function(typed)
	{
		ini_score = this.score;
		for(i in this.words) //for(變量 in 對象)
		{
			if(this.words[i].word == typed) //如果輸入的字符合上面有的字
			{
				console.log('#word_' + this.words[i].id);
				$('#word_' + this.words[i].id).remove();
				
				this.score = this.score + 100;
				this.words[i].dead = 0;
				
			}
		}

		if(ini_score != this.score)
		{
			$('#'+this.selector_word).val('');
			$('#'+this.selector_score).text(this.score); //改變score
		}
	}
	//創造新的字
	this.createWord = function()
	{
		this.counter++;

		var newWord = new Word(this.counter); //call Word(傳入counter)
		newWord.createWordsBetween((window.screen.width*0.4), (window.screen.width*0.9)); //call Word 亂數寬度

		this.words.push(newWord); //加到words陣列裡
		
		//在canvas裡印出來
		this.canvas.innerHTML = this.canvas.innerHTML + "<div id='word_" + (newWord.id) + "'><div style='position:absolute; left:" + newWord.x+"px; top:" + newWord.y+"px'>" + newWord.word + "</div></div>";
	}
	
	//讓字往下掉
	this.fallWords = function()
	{
		for(var i=this.words.length-1; i>=0;i--)
		{
			this.words[i].y = this.words[i].y + 35;	

			if(this.words[i].y > (window.screen.height*0.72)) //如果有掉下去的字
			{
				
				$('#word_' + this.words[i].id).remove();	
				//this.words[i].word.remove();
				if(this.words[i].dead == 1)
				{						
					this.score = this.score - 100;		//扣100分
					if(this.words[i].word == "END")
						end(this.score);
						
					else if(this.words[i].word == " ")
						end(this.score);
						
				}
				this.words.shift();					//清除掉掉下去的字
				$('#'+this.selector_score).text(this.score); //改變score
											
			}
		}
	}

	this.updateWordPositions = function()
	{
		for(i in this.words)
		{
			loc = document.getElementById('word_'+this.words[i].id);
			if(loc) 
				loc.innerHTML = "<div style=' position:absolute; z-index:1;  left:"+this.words[i].x+"px; top:"+this.words[i].y+"px;'>"+this.words[i].word+"</div>";
		}
	}
}

function Word(id)
{
	this.x = 0;
	this.y = 125;
	this.id = id;
	this.dead = 1;

	this.createWordsBetween = function(x_min, x_max)
	{
		//random_index = parseInt(Math.random()*words.length); //在words陣列裡隨機選個字
		this.word = words[count++];
		random_x_index = parseInt(Math.random()*(x_max-x_min)); //隨機出現的位子
		this.x = x_min + random_x_index;
	}
}

function end(score)
{
	var df = prompt(" 請輸入入您的姓名 "+ " 您的得分是:" + score + "分");
	document.location="check.php?name="+df+"&score="+score;
}
