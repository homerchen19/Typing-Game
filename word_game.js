var count = 0;
var persent;
var words = ["快","打","高","手","讓","我","們","先","來","暖","個","身","吧","歌名","將軍令","演唱","五月天",
				"詞","阿信","曲","五月天","勝凱","等誰","聲","下令","才","自由","何時","生活","喔","喔喔","喔~~","不相信","什麼","其實","決定","忍受","不願意"
				,"OH","OHOH","~~~","歷史","之手","至少","傳說","誰","敗","不朽","歐","喔喔","喔~~~","拳頭","低頭","念頭","抬頭","去","看","愛","追","夢"
				,"準備","進","副歌","GO","此生","頭","你是誰","怎麼","說","就","他們","去說","說~","生命","如","長風","吹過","誰","心頭","你","記住","名字","將會","什麼~","大","蜉蝣"
				,"昨天","頑童","而","今天","如此","OH","喔","~~","一首","麋","唱遊","宇宙","看","聽見","什麼","OH","OHOH","星月","沉默","光","角落","求"
				,"點亮","瞳孔","我","我我","我我我","戰","你我","直到","自","何時","盼","求","等","將軍","英雄","喔","準備","進","副歌","GO"
				,"此生","盡頭","是","曾","怎麼","活","他們","讓","去說","說!","生命","如長","吹","誰的","頭","將","記住","那個","將會","什麼~"
				,"159","357","123","456","789","321","654","987","製","作","人","陳","自","泓","李","洋","逸","準備","開始"
				,"蒼空","飛鴻","英雄","顛沛","等候","土地","天空","失去","什!","麼!","!","此刻","永","久","你是","活","為什麼","還在","問","為","什麼"
				,"命如","長","風中","誰","問我","想","那個","名字","將","什麼","你","相信","執著","是","什","麼","END"
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
	document.location="check2.php?name="+df+"&score="+score;
}
