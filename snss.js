$(function(){
	var snss = [[$('#Atwitter'), $('#icon-twitter'), $('#sns_twitter'), $('#c-twitter')],
				[$('#Afeedly'), $('#icon-feedly'), $('#sns_feedly'), $('#c-feedly')],
				[$('#Afacebook'), $('#icon-facebook'), $('#sns_facebook'), $('#c-facebook')],
				[$('#Ahatebu'), $('#icon-hatebu'), $('#sns_hatebu'), $('#c-hatebu')],
				[$('#Apocket'), $('#icon-pocket'), $('#sns_pocket'), $('#c-pocket')],
				[$('#Agoogleplus'), $('#icon-google-plus'), $('#sns_googleplus'), $('#c-gplus')]];
	snss[0][0].hover(function(){
		snss[0][1].stop(false,true).animate({rotate:'-=360deg',scale:'1.50'},300);
		snss[0][2].stop(false,true).animate({scale:'1.40'},300);
		snss[0][3].stop(false,true).fadeIn(300);
	},function(){
		snss[0][1].stop(false,true).animate({rotate:'+=360deg',scale:'1.0'},300);
		snss[0][2].stop(false,true).animate({scale:'1.0'},300);
		snss[0][3].stop(false,true).fadeOut(300);
	});
	snss[1][0].hover(function(){
		snss[1][1].stop(false,true).animate({rotate:'-=360deg',scale:'1.50'},300);
		snss[1][2].stop(false,true).animate({scale:'1.40'},300);
		snss[1][3].stop(false,true).fadeIn(300);
	},function(){
		snss[1][1].stop(false,true).animate({rotate:'+=360deg',scale:'1.0'},300);
		snss[1][2].stop(false,true).animate({scale:'1.0'},300);
		snss[1][3].stop(false,true).fadeOut(300);
	});
	snss[2][0].hover(function(){
		snss[2][1].stop(false,true).animate({rotate:'-=360deg',scale:'1.50'},300);
		snss[2][2].stop(false,true).animate({scale:'1.40'},300);
		snss[2][3].stop(false,true).fadeIn(300);
	},function(){
		snss[2][1].stop(false,true).animate({rotate:'+=360deg',scale:'1.0'},300);
		snss[2][2].stop(false,true).animate({scale:'1.0'},300);
		snss[2][3].stop(false,true).fadeOut(300);
	});
	snss[3][0].hover(function(){
		snss[3][1].stop(false,true).animate({rotate:'-=360deg',scale:'1.50'},300);
		snss[3][2].stop(false,true).animate({scale:'1.40'},300);
		snss[3][3].stop(false,true).fadeIn(300);
	},function(){
		snss[3][1].stop(false,true).animate({rotate:'+=360deg',scale:'1.0'},300);
		snss[3][2].stop(false,true).animate({scale:'1.0'},300);
		snss[3][3].stop(false,true).fadeOut(300);
	});
	snss[4][0].hover(function(){
		snss[4][1].stop(false,true).animate({rotate:'-=360deg',scale:'1.50'},300);
		snss[4][2].stop(false,true).animate({scale:'1.40'},300);
		snss[4][3].stop(false,true).fadeIn(300);
	},function(){
		snss[4][1].stop(false,true).animate({rotate:'+=360deg',scale:'1.0'},300);
		snss[4][2].stop(false,true).animate({scale:'1.0'},300);
		snss[4][3].stop(false,true).fadeOut(300);
	});
	snss[5][0].hover(function(){
		snss[5][1].stop(false,true).animate({rotate:'-=360deg',scale:'1.50'},300);
		snss[5][2].stop(false,true).animate({scale:'1.40'},300);
		snss[5][3].stop(false,true).fadeIn(300);
	},function(){
		snss[5][1].stop(false,true).animate({rotate:'+=360deg',scale:'1.0'},300);
		snss[5][2].stop(false,true).animate({scale:'1.0'},300);
		snss[5][3].stop(false,true).fadeOut(300);
	});
});