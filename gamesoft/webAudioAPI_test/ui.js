var gEQ = 1;
var dis = 1; 
var del = 1;

$(function() {
  $('#gEQImg').click(function(){
    gEQ = (gEQ % 2) + 1;
    $(this).attr('src', 'equalizer' + gEQ + '.png');
  });
  
  $('#disImg').click(function(){
    dis = (dis % 2) + 1;
    $(this).attr('src', 'distortion' + dis + '.png');
  });
  
  $('#delImg').click(function(){
    del = (del % 2) + 1;
    $(this).attr('src', 'delay' + del + '.png');
  });
  
  // 2スライダーを適用
  $('#volumeSlider').slider({
    min: 0.1,
    max: 3,
    step: 0.1,
    value: 1,
    // 3スライダーの変化時にテキストボックスの値表示を更新
    slide: function(e, ui) {
      $('#volNum').val(ui.value);
    },
    // 4スライダーの初期化時に、その値をテキストボックスにも反映
    create: function(e, ui) {
      $('#volNum').val($(this).slider('option', 'value'));
    }
  });
  
  $('#distortionSlider').slider({
    min: 0,
    max: 0.99,
    step: 0.01,
    value: 0,
    // 3スライダーの変化時にテキストボックスの値表示を更新
    slide: function(e, ui) {
      $('#disNum').val(ui.value);
    },
    // 4スライダーの初期化時に、その値をテキストボックスにも反映
    create: function(e, ui) {
      $('#disNum').val($(this).slider('option', 'value'));
    }
  });
  
  $('#delayTimeSlider').slider({
    min: 0,
    max: 1,
    step: 0.01,
    value: 0,
    // 3スライダーの変化時にテキストボックスの値表示を更新
    slide: function(e, ui) {
      $('#delTimeNum').val(ui.value);
    },
    // 4スライダーの初期化時に、その値をテキストボックスにも反映
    create: function(e, ui) {
      $('#delTimeNum').val($(this).slider('option', 'value'));
    }
  });
  
  $('#delayDrySlider').slider({
    min: 0,
    max: 1,
    step: 0.01,
    value: 1,
    // 3スライダーの変化時にテキストボックスの値表示を更新
    slide: function(e, ui) {
      $('#delDryNum').val(ui.value);
    },
    // 4スライダーの初期化時に、その値をテキストボックスにも反映
    create: function(e, ui) {
      $('#delDryNum').val($(this).slider('option', 'value'));
    }
  });
  
  $('#delayWetSlider').slider({
    min: 0,
    max: 1,
    step: 0.01,
    value: 0,
    // 3スライダーの変化時にテキストボックスの値表示を更新
    slide: function(e, ui) {
      $('#delWetNum').val(ui.value);
    },
    // 4スライダーの初期化時に、その値をテキストボックスにも反映
    create: function(e, ui) {
      $('#delWetNum').val($(this).slider('option', 'value'));
    }
  });
  
  $('#delayFeedbackSlider').slider({
    min: 0,
    max: 1,
    step: 0.01,
    value: 0,
    // 3スライダーの変化時にテキストボックスの値表示を更新
    slide: function(e, ui) {
      $('#delFeedNum').val(ui.value);
    },
    // 4スライダーの初期化時に、その値をテキストボックスにも反映
    create: function(e, ui) {
      $('#delFeedNum').val($(this).slider('option', 'value'));
    }
  });
  
  $('#gEQ1Slider').slider({
    min: -20,
    max: 20,
    step: 0.2,
    value: 0,
    orientation: 'vertical',
    // 3スライダーの変化時にテキストボックスの値表示を更新
    slide: function(e, ui) {
      $('#gEQ1Num').val(ui.value);
    },
    // 4スライダーの初期化時に、その値をテキストボックスにも反映
    create: function(e, ui) {
      $('#gEQ1Num').val($(this).slider('option', 'value'));
    }
  });
  
  $('#gEQ2Slider').slider({
    min: -20,
    max: 20,
    step: 0.2,
    value: 0,
    orientation: 'vertical',
    // 3スライダーの変化時にテキストボックスの値表示を更新
    slide: function(e, ui) {
      $('#gEQ2Num').val(ui.value);
    },
    // 4スライダーの初期化時に、その値をテキストボックスにも反映
    create: function(e, ui) {
      $('#gEQ2Num').val($(this).slider('option', 'value'));
    }
  });
  
  $('#gEQ3Slider').slider({
    min: -20,
    max: 20,
    step: 0.2,
    value: 0,
    orientation: 'vertical',
    // 3スライダーの変化時にテキストボックスの値表示を更新
    slide: function(e, ui) {
      $('#gEQ3Num').val(ui.value);
    },
    // 4スライダーの初期化時に、その値をテキストボックスにも反映
    create: function(e, ui) {
      $('#gEQ3Num').val($(this).slider('option', 'value'));
    }
  });
  
  $('#gEQ4Slider').slider({
    min: -20,
    max: 20,
    step: 0.2,
    value: 0,
    orientation: 'vertical',
    // 3スライダーの変化時にテキストボックスの値表示を更新
    slide: function(e, ui) {
      $('#gEQ4Num').val(ui.value);
    },
    // 4スライダーの初期化時に、その値をテキストボックスにも反映
    create: function(e, ui) {
      $('#gEQ4Num').val($(this).slider('option', 'value'));
    }
  });
  
  $('#gEQ5Slider').slider({
    min: -20,
    max: 20,
    step: 0.2,
    value: 0,
    orientation: 'vertical',
    // 3スライダーの変化時にテキストボックスの値表示を更新
    slide: function(e, ui) {
      $('#gEQ5Num').val(ui.value);
    },
    // 4スライダーの初期化時に、その値をテキストボックスにも反映
    create: function(e, ui) {
      $('#gEQ5Num').val($(this).slider('option', 'value'));
    }
  });
  
  $('#gEQ6Slider').slider({
    min: -20,
    max: 20,
    step: 0.2,
    value: 0,
    orientation: 'vertical',
    // 3スライダーの変化時にテキストボックスの値表示を更新
    slide: function(e, ui) {
      $('#gEQ6Num').val(ui.value);
    },
    // 4スライダーの初期化時に、その値をテキストボックスにも反映
    create: function(e, ui) {
      $('#gEQ6Num').val($(this).slider('option', 'value'));
    }
  });
  
  $('#gEQ7Slider').slider({
    min: -20,
    max: 20,
    step: 0.2,
    value: 0,
    orientation: 'vertical',
    // 3スライダーの変化時にテキストボックスの値表示を更新
    slide: function(e, ui) {
      $('#gEQ7Num').val(ui.value);
    },
    // 4スライダーの初期化時に、その値をテキストボックスにも反映
    create: function(e, ui) {
      $('#gEQ7Num').val($(this).slider('option', 'value'));
    }
  });
  
  $('#gEQ8Slider').slider({
    min: -20,
    max: 20,
    step: 0.2,
    value: 0,
    orientation: 'vertical',
    // 3スライダーの変化時にテキストボックスの値表示を更新
    slide: function(e, ui) {
      $('#gEQ8Num').val(ui.value);
    },
    // 4スライダーの初期化時に、その値をテキストボックスにも反映
    create: function(e, ui) {
      $('#gEQ8Num').val($(this).slider('option', 'value'));
    }
  });
  
  $('#gEQ9Slider').slider({
    min: -20,
    max: 20,
    step: 0.2,
    value: 0,
    orientation: 'vertical',
    // 3スライダーの変化時にテキストボックスの値表示を更新
    slide: function(e, ui) {
      $('#gEQ9Num').val(ui.value);
    },
    // 4スライダーの初期化時に、その値をテキストボックスにも反映
    create: function(e, ui) {
      $('#gEQ9Num').val($(this).slider('option', 'value'));
    }
  });
  
  $('#gEQ10Slider').slider({
    min: -20,
    max: 20,
    step: 0.2,
    value: 0,
    orientation: 'vertical',
    // 3スライダーの変化時にテキストボックスの値表示を更新
    slide: function(e, ui) {
      $('#gEQ10Num').val(ui.value);
    },
    // 4スライダーの初期化時に、その値をテキストボックスにも反映
    create: function(e, ui) {
      $('#gEQ10Num').val($(this).slider('option', 'value'));
    }
  });
});