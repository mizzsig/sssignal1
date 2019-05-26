// http://www.kanasansoft.com/Kanasansoft/getusermedia_and_analyser/index.html
// http://curtaincall.weblike.jp/portfolio-web-sounder/webaudioapi-effectors/demos/demo-21
// http://blog.digital-bot.com/blog/2013/12/11/web-audio/

//navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
//window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
//window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;

var width = 1023;
var height = 256;

$(function(){
	initialize();

	var NUM_SUMPLES = 65536;
	var createCurve = function(amount) {
	    if ((amount > 0) && (amount < 1)) {
	        var curves = new Float32Array(NUM_SUMPLES);
	        var k = (2 * amount) / (1 - amount);
	        for (var i = 0; i < NUM_SUMPLES; i++) {
	            // LINEAR INTERPOLATION: x := (c - a) * (z - y) / (b - a) + y
	            // a = 0, b = 2048, z = 1, y = -1, c = i
	            var x = (((i - 0) * (1 - (-1))) / (NUM_SUMPLES - 0)) + (-1);
	            curves[i] = ((1 + k) * x) / (1 + k * Math.abs(x));
	        }
	        return curves;
	    } else {
	        return null;  // Clean sound (default value)
	    }
	};

	function initialize() {
		navigator.getUserMedia = navigator.getUserMedia ||
								 navigator.webkitGetUserMedia ||
								 navigator.mozGetUserMedia ||
								 navigator.msGetUserMedia;

		// DOMを取得
		var audioElement = document.getElementById("audio");
		var frequencyElement = document.getElementById("frequency");
		var timeDomainElement = document.getElementById("timedomain");
		var frequencyContext = frequencyElement.getContext("2d");
		var timeDomainContext = timeDomainElement.getContext("2d");

		// 長さをそろえる
		frequencyElement.width = width;
		frequencyElement.height = height;
		timeDomainElement.width = width;
		timeDomainElement.height = height;

		navigator.getUserMedia({video : true, audio : true},
			function(stream) {
				video.src = window.URL.createObjectURL(stream);
				
				var context = new AudioContext();
				// 再生や編集をするための音声を生成
				var mediastreamsource = context.createMediaStreamSource(stream);
				// 音声データを可視化するための型
				var analyser = context.createAnalyser();
				var frequencyData = new Uint8Array(analyser.frequencyBinCount);
				var timeDomainData = new Uint8Array(analyser.frequencyBinCount);
				// フィルタ
				var bands = 10;
				var frequency = 31.25;
				var peakings = new Array(bands);
				// ディストーション
				var distortion = context.createWaveShaper();
				// ディレイ
				var delay = context.createDelay();
				var feedback = context.createGain();
				var dry = context.createGain();
				var wet = context.createGain();
				var gain = context.createGain();
				var sourceGain = context.createGain();
				
				for (var i = 0; i < bands; i++){
					var peaking = context.createBiquadFilter();
					peaking.type = "peaking";
					peaking.frequency.value = frequency;
					frequency *= 2;
					peaking.Q.value = 2;
					peaking.gain.value = 0;
					
					peakings[i] = peaking;
				}
				
				gain.gain.value = 1.0;

				mediastreamsource.connect(sourceGain);
				sourceGain.connect(peakings[0]);

				distortion.connect(dry);
				dry.connect(gain);

				distortion.connect(delay);
				delay.connect(wet);
				wet.connect(gain);

				delay.connect(feedback);
				feedback.connect(delay);

				gain.connect(analyser);
				analyser.connect(context.destination);
//				mediastreamsource.connect(context.destination);

				// canvas要素に描画
				var animation = function(){
					peakings.forEach(function(peaking, index){
						if(gEQ == 1){
							peaking.gain.value = $('#gEQ' + String(index + 1) + 'Slider').slider("value");
						}else{
							peaking.gain.value = 0;
						}
						if(index < (bands - 1)){
							peaking.connect(peakings[index + 1]);
						}else{
							peaking.connect(distortion);
						}
					});
					
					sourceGain.gain.value = $('#volumeSlider').slider("value");

					if(dis == 1){
						distortion.curve = createCurve($('#distortionSlider').slider("value"));
					}else{
						distortion.curve = createCurve(0);
					}

					if(del == 1){
						delay.delayTime.value = $('#delayTimeSlider').slider("value");
						dry.gain.value = $('#delayDrySlider').slider("value");
						wet.gain.value = $('#delayWetSlider').slider("value");
						feedback.gain.value = $('#delayFeedbackSlider').slider("value");
					}else{
						delay.delayTime.value = 0;
						dry.gain.value = 1;
						wet.gain.value = 0;
						feedback.gain.value = 0;
					}

					analyser.getByteFrequencyData(frequencyData);
					analyser.getByteTimeDomainData(timeDomainData);

					frequencyContext.clearRect(0, 0, width, height);
					frequencyContext.beginPath();
					frequencyContext.moveTo(0, height - frequencyData[0]);
					for (var i = 1, l = frequencyData.length; i < l; i++) {
						frequencyContext.lineTo(i, height - frequencyData[i]);
					}
					frequencyContext.stroke();

					timeDomainContext.clearRect(0, 0, width, height);
					timeDomainContext.beginPath();
					timeDomainContext.moveTo(0, height - timeDomainData[0]);
					for (var i = 1, l = timeDomainData.length; i < l; i++) {
						timeDomainContext.lineTo(i, height - timeDomainData[i]);
					}
					timeDomainContext.stroke();

					// アニメーションさせる関数の設定
					requestAnimationFrame(animation);

				};

				animation();

			},
			function(e) {
				console.log(e);
			}
		);

	}
});