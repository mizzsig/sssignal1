// 参考URL
// http://blog.nariyu.jp/2015/01/canvas-image-effects

$(function(){
    //端末の差異を吸収
    navigator.getMedia = (  navigator.getUserMedia ||
                            navigator.webkitGetUserMedia ||
                            navigator.mozGetUserMedia ||
                            navigator.msGetUserMedia );
    
    // 描画するキャンバスのサイズを格納
    var width, height;

    //端末のCameraのstreamデータを流すVideoタグ
    var video = document.getElementById('camera');
    
    // Streamデータを一時的に貼付けるCanvasタグ
    var canvas = document.getElementById('camera_canvas');
    var ctx = canvas.getContext('2d');
    
    // canvasタグ
    var canvas1 = document.getElementById('camera_canvas1');
    var ctx1 = canvas1.getContext('2d');
    var canvas2 = document.getElementById('camera_canvas2');
    var ctx2 = canvas2.getContext('2d');
    var canvas3 = document.getElementById('camera_canvas3');
    var ctx3 = canvas3.getContext('2d');
    var canvas4 = document.getElementById('camera_canvas4');
    var ctx4 = canvas4.getContext('2d');
    var canvas5 = document.getElementById('camera_canvas5');
    var ctx5 = canvas5.getContext('2d');
    var canvas6 = document.getElementById('camera_canvas6');
    var ctx6 = canvas6.getContext('2d');
    
    //Videoタグ
    navigator.getMedia ({ video:true, audio:false }, function(stream) {
        video.src = window.URL.createObjectURL(stream);
    }, function(err){console.log(err);});

    var functions = [bayerDither, grayscale, negaposi, mosaic, posterization, sobel, redChannel, greenChannel, blueChannel, sepia, frostedGlass, toneCurve, toneCurveRed, toneCurveGreen, toneCurveBlue, none];
    var effects = [0, 1, 2, 3, 4, 5];
    
    function cameraToImage(modifyFunc,context,canvas){
        canvas.width = width;
        canvas.height = height;
        var canvas_image = ctx.getImageData(0, 0, canvas.width,canvas.height);
        modifyFunc(canvas_image, context);
        context.putImageData(canvas_image, 0, 0);
    }

    //動画から画像を生成
    setInterval(function(){
        width = window.innerWidth * 0.3333;
        height = window.innerHeight * 0.5;
        canvas.width = width;
        canvas.height = height;
        // video の映像を canvas に渡す
        ctx.drawImage(video,0,0,width,height);

        // 各画面の処理
        cameraToImage(functions[effects[0]],ctx1, canvas1);
        cameraToImage(functions[effects[1]],ctx2, canvas2);
        cameraToImage(functions[effects[2]],ctx3, canvas3);
        cameraToImage(functions[effects[3]],ctx4, canvas4);
        cameraToImage(functions[effects[4]],ctx5, canvas5);
        cameraToImage(functions[effects[5]],ctx6, canvas6);
    }, 50);

    // 一定時間でエフェクト変化
    setInterval(function(){
        for (var i = 0; i < effects.length; i++){
            effects[i] = Math.floor(Math.random() * functions.length);
            for (var j = i - 1; j >= 0; j--){
                if(effects[j] == effects[i]){
                    i--;
                    break;
                }
            }
        }
    }, 5000);

    function randomDither(image){
        var pixel = image.data;
        for (var i = 0; i < pixel.length; i += 4){
            for (var j = 0; j < 3; j++){
                if(Math.random() * 256 < pixel[i + j]){
                    pixel[i + j] = 255
                }else{
                    pixel[i + j] = 0
                }
            }
        }
    }

    function toneCurveRed(image){
        var pixel = image.data;
        var toneSlope = 13;
        for (var i = 0; i < pixel.length; i += 4){
            pixel[i] = (pixel[i] * toneSlope) % 512;
        }
    }

    function toneCurveGreen(image){
        var pixel = image.data;
        var toneSlope = 13;
        for (var i = 0; i < pixel.length; i += 4){
            pixel[i+1] = (pixel[i+1] * toneSlope) % 512;
        }
    }

    function toneCurveBlue(image){
        var pixel = image.data;
        var toneSlope = 13;
        for (var i = 0; i < pixel.length; i += 4){
            pixel[i+2] = (pixel[i+2] * toneSlope) % 512;
        }
    }

    function toneCurve(image){
        var pixel = image.data;
        var toneSlope = 13;
        for (var i = 0; i < pixel.length; i += 4){
            pixel[i] = (pixel[i] * toneSlope) % 512;
            pixel[i+1] = (pixel[i+1] * toneSlope) % 512;
            pixel[i+2] = (pixel[i+2] * toneSlope) % 512;
        }
    }

    function frostedGlass(image){
        var pixel = image.data;
        var _pixel = pixel.slice();

        var glassSize = 2;
        for (var x = glassSize; x < Math.round(width) - glassSize; x++){
            for (var y = glassSize; y < Math.round(height) - glassSize; y++){
                var dx = Math.floor(Math.random() * (glassSize * 2 + 1)) - glassSize;
                var dy = Math.floor(Math.random() * (glassSize * 2 + 1)) - glassSize;
                var ind = (y * Math.floor(width) + x) * 4;
                var ind2 = ind + (dy * Math.floor(width) + dx) * 4;
                _pixel[ind] = pixel[ind2];
                _pixel[ind + 1] = pixel[ind2 + 1];
                _pixel[ind + 2] = pixel[ind2 + 2];
            }
        }

        for (var i = 0; i < _pixel.length; i++){
            pixel[i] = _pixel[i];
        }
    }

    function sepia(image){
        grayscale(image);
        var pixel = image.data;
        for (var i = 0; i < pixel.length; i += 4){
            pixel[i] *= 0.9;
            pixel[i+1] *= 0.7;
            pixel[i+2] *= 0.4;
        }
    }

    function calcSobel(pixel, ind){
        var sum = (pixel[ind - Math.floor(width) * 4] * 2) + (pixel[ind - Math.floor(width - 1) * 4] * 2) + (pixel[ind - 4] * 2)
                - (pixel[ind + Math.floor(width) * 4] * 2) - (pixel[ind + Math.floor(width + 1) * 4] * 2) - (pixel[ind + 4] * 2);
        return sum;
    }

    function sobel(image){
        var pixel = image.data;
        var _pixel = pixel.slice();
        // 一番外側の画素は計算できないので0にする
        for (var x = 0; x < Math.floor(width); x++){
            var ind = x * 4;
            var ind2 = (Math.floor(height - 1) * Math.floor(width) + x) * 4;
            _pixel[ind] = 0;
            _pixel[ind + 1] = 0;
            _pixel[ind + 2] = 0;
            _pixel[ind2] = 0;
            _pixel[ind2 + 1] = 0;
            _pixel[ind2 + 2] = 0;
        }
        for (var y = 0; y < Math.floor(height); y++){
            var ind = y * Math.floor(width) * 4;
            var ind2 = (y * Math.floor(width) + Math.floor(width - 1)) * 4;
            _pixel[ind] = 0;
            _pixel[ind + 1] = 0;
            _pixel[ind + 2] = 0;
            _pixel[ind2] = 0;
            _pixel[ind2 + 1] = 0;
            _pixel[ind2 + 2] = 0;
        }

        // エッジ検出
        for (var x = 1; x < Math.floor(width) - 1; x++){
            for (var y = 1; y < Math.floor(height) - 1; y++){
                var ind = (y * Math.floor(width) + x) * 4;
                _pixel[ind] = calcSobel(pixel, ind);
                _pixel[ind + 1] = calcSobel(pixel, ind + 1);
                _pixel[ind + 2] = calcSobel(pixel, ind + 2);
            }
        }

        // pixel = _pixel.slice() とすると
        // imageへの参照が消えてしまう？
        for (var i = 0; i < _pixel.length; i++){
            pixel[i] = _pixel[i];
        }
    }

    function bayerDither(image){
        var pixel = image.data;
        var matrix = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
        for (var x = 0; x < Math.floor(width); x++){
            for (var y = 0; y < Math.floor(height); y++){
                // pixel中の位置
                var ind = (y * Math.floor(width) + x) * 4;
                // matrixの位置
                var ind2 = matrix[(x % 4) + (y % 4) * 4];

                pixel[ind] = ((pixel[ind] / 16) < ind2) ? 0 : 255;
                pixel[ind+1] = ((pixel[ind+1] / 16) < ind2) ? 0 : 255;
                pixel[ind+2] = ((pixel[ind+2] / 16) < ind2) ? 0 : 255;
            }
        }
    }

    function grayscale(image){
        var pixel = image.data;
        for (var i = 0, n = pixel.length; i < n; i += 4){
            var gray = pixel[i] * 0.298912 + pixel[i+1] * 0.586611 + pixel[i+2] * 0.114478;
            pixel[i] = gray;
            pixel[i+1] = gray;
            pixel[i+2] = gray;
        }
    }

    function negaposi(image){
        var pixel = image.data;
        for (var i = 0, n = pixel.length; i < n; i += 4){
            pixel[i] = 255 - pixel[i];
            pixel[i+1] = 255 - pixel[i+1];
            pixel[i+2] = 255 - pixel[i+2];
        }
    }

    function mosaic(image){
        var pixel = image.data;
        var mosaicSize = 6;
        for (var y = 0; y < Math.floor(height); y += mosaicSize){
            for (var x = 0; x < Math.floor(width); x += mosaicSize){
                var ind = (y * Math.floor(width) + x) * 4;
                var r = pixel[ind];
                var g = pixel[ind + 1];
                var b = pixel[ind + 2];
                var mosaWidth = 0;
                var mosaHeigth = 0;
                // モザイクの画素値計算
                for (var y2 = 0; y2 < mosaicSize; y2++){
                    if(y + y2 >= Math.floor(height)) {
                        break;
                    }
                    mosaHeigth++;
                    for (var x2 = 0; x2 < mosaicSize; x2++){
                        if(x + x2 >= Math.floor(width)) {
                            break;
                        }
                        if(y2 == 0){
                            mosaWidth++;
                        }
                        var ind2 = (y2 * Math.floor(width) + x2) * 4;
                        r += pixel[ind + ind2];
                        g += pixel[ind + ind2 + 1];
                        b += pixel[ind + ind2 + 2];
                    }
                }
                r /= mosaWidth * mosaHeigth;
                g /= mosaWidth * mosaHeigth;
                b /= mosaWidth * mosaHeigth;

                // 画素の書き換え
                for (var y2 = 0; y2 < mosaicSize; y2++){
                    if(y + y2 >= Math.floor(height)) {
                        break;
                    }
                    for (var x2 = 0; x2 < mosaicSize; x2++){
                        if(x + x2 >= Math.floor(width)) {
                            break;
                        }
                        var ind2 = (y2 * Math.floor(width) + x2) * 4;
                        pixel[ind + ind2] = r;
                        pixel[ind + ind2 + 1] = g;
                        pixel[ind + ind2 + 2] = b;
                    }
                }
            }
        }
    }

    function posterization(image){
        var pixel = image.data;
        var harmony = 256 / 4;
        for (var i = 0, n = pixel.length; i < n; i += 4){
            pixel[i] = Math.round(pixel[i] / harmony) * harmony;
            pixel[i+1] = Math.round(pixel[i+1] / harmony) * harmony;
            pixel[i+2] = Math.round(pixel[i+2] / harmony) * harmony;
        }
    }
    
    function redChannel(image){
        var pixel = image.data;
        for (var i = 0, n = pixel.length; i < n; i += 4) {
            pixel[i  ] *= 1;
            pixel[i+1] *= 0;
            pixel[i+2] *= 0;
        }
    }

    function greenChannel(image){
        var pixel = image.data;
        for (var i = 0, n = pixel.length; i < n; i += 4) {
            pixel[i  ] *= 0;
            pixel[i+1] *= 1;
            pixel[i+2] *= 0;
        }
    }

    function blueChannel(image){
        var pixel = image.data;
        for (var i = 0, n = pixel.length; i < n; i += 4) {
            pixel[i  ] *= 0;
            pixel[i+1] *= 0;
            pixel[i+2] *= 1;
        }
    }

    function yellowChannel(image){
        var pixel = image.data;
        for (var i = 0, n = pixel.length; i < n; i += 4) {
            pixel[i  ] *= 1;
            pixel[i+1] *= 1;
            pixel[i+2] *= 0;
        }
    }

    function purpleChannel(image){
        var pixel = image.data;
        for (var i = 0, n = pixel.length; i < n; i += 4) {
            pixel[i  ] *= 0.5;
            pixel[i+1] *= 0;
            pixel[i+2] *= 0.8;
        }
    }

    function orangeChannel(image){
        var pixel = image.data;
        for (var i = 0, n = pixel.length; i < n; i += 4) {
            pixel[i  ] *= 1.0;
            pixel[i+1] *= 0.5;
            pixel[i+2] *= 0;
        }
    }

    function pinkChannel(image){
        var pixel = image.data;
        for (var i = 0, n = pixel.length; i < n; i += 4) {
            pixel[i  ] *= 1.0;
            pixel[i+1] *= 0;
            pixel[i+2] *= 1.0;
        }
    }

    function emeraldChannel(image){
        var pixel = image.data;
        for (var i = 0, n = pixel.length; i < n; i += 4) {
            pixel[i  ] *= 0;
            pixel[i+1] *= 1.0;
            pixel[i+2] *= 0.8;
        }
    }

    function none(image){
    }

    $(".explain").hover(function(){
        $(this).stop(false, true).animate({opacity: "0.85"}, 300);
    }, function(){
        $(this).stop(false, true).animate({opacity: "0.0"}, 300);
    });

    // スクロールを無効にする
    // http://qiita.com/mimoe/items/f5f668cebb697d073553
    $(window).on('touchmove.noScroll', function(e) {
        e.preventDefault();
    });
});