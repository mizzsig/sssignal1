$(function(){
   var showFlag = false;
   var tButton = $('#twitter-follow-button');
   // 最初はボタンを隠しておく
   tButton.css('bottom', '-610px');
   $(window).scroll(function(){
	scrollHeight = $(document).height();
	scrollPosition = window.innerHeight + $(window).scrollTop();
	if ( (scrollHeight - scrollPosition) / scrollHeight <= 0.05) {
     if(showFlag == false){
      showFlag = true;
      tButton.stop(true, false).animate({'bottom': '-15px'}, 300).animate({'bottom': '-30px'}, 200);
     }
    } else{
     if(showFlag){
      showFlag = false;
      tButton.stop(true, false).animate({'bottom': '-15px'}, 200).animate({'bottom' : '-610px'}, 300);
     }
    }
   });
   // ボタンの画像変更
   tButton.hover(function(){
    $(this).attr('src', $(this).attr('src').replace('_off', '_on'));
    tButton.stop(true, false).animate({'bottom' : '-15px'}, 100).animate({'bottom' : '-30px'}, 100);
     }, function(){
      if(!$(this).hasClass('current')){
      $(this).attr('src', $(this).attr('src').replace('_on', '_off'));
     }
   });
  });