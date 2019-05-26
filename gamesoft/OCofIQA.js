/*
http://www.html5rocks.com/ja/tutorials/file/dndfiles/
http://www.pori2.net/html5/File/040.html
*/
var print_img_id = 'print_img';
var print_DataURL_id = 'print_DataURL';
var im1 = new Image();
var im2 = new Image();
if (checkFileApi()){
    //ファイル選択
    var file_image1 = document.getElementById('file-image1');
    file_image1.addEventListener('change', selectReadfile1, false);
    var file_image2 = document.getElementById('file-image2');
    file_image2.addEventListener('change', selectReadfile2, false);
    //ドラッグオンドロップ
    var dropZone1 = document.getElementById('drop-zone1');
    dropZone1.style.backgroundColor = "#FFFFFF";
    dropZone1.addEventListener('dragover', handleDragOver1, false);
    dropZone1.addEventListener('dragleave', handleDragLeave1, false);
    dropZone1.addEventListener('drop', handleDragDropFile1, false);
    var dropZone2 = document.getElementById('drop-zone2');
    dropZone2.style.backgroundColor = "#FFFFFF";
    dropZone2.addEventListener('dragover', handleDragOver2, false);
    dropZone2.addEventListener('dragleave', handleDragLeave2, false);
    dropZone2.addEventListener('drop', handleDragDropFile2, false);
}
// addEventListenerの説明 
// http://qiita.com/mrpero/items/156968e3512d42fffc5e
// https://developer.mozilla.org/en-US/docs/Web/Events

// FileAPIに対応しているか
function checkFileApi() {
    // Check for the various File API support.
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        // Great success! All the File APIs are supported.
        return true;
    }
    alert('The File APIs are not fully supported in this browser.');
    return false;
}
//ファイルが選択されたら読み込む
function selectReadfile1(e) {
    var file = e.target.files;
    var reader = new FileReader();
    //dataURL形式でファイルを読み込む
    reader.readAsDataURL(file[0]);
    //ファイルの読込が終了した時の処理
    reader.onload = function(){
        readImage1(reader, print_img_id, print_DataURL_id);
    }
}
function selectReadfile2(e) {
    var file = e.target.files;
    var reader = new FileReader();
    //dataURL形式でファイルを読み込む
    reader.readAsDataURL(file[0]);
    //ファイルの読込が終了した時の処理
    reader.onload = function(){
        readImage2(reader, print_img_id, print_DataURL_id);
    }
}
//ドラッグオンドロップ
function handleDragOver1(e) {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    this.style.backgroundColor="#AAAAFF";
}
function handleDragOver2(e) {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    this.style.backgroundColor="#AAAAFF";
}
// ファイルが出て行った
function handleDragLeave1(e){
    this.style.backgroundColor="#FFFFFF";
}
function handleDragLeave2(e){
    this.style.backgroundColor="#FFFFFF";
}
// ファイルがドロップされた
function handleDragDropFile1(e) {
    this.style.backgroundColor="#FFFFFF";
    e.stopPropagation();
    e.preventDefault();
    var files = e.dataTransfer.files; // FileList object.
    var file = files[0];
    var reader = new FileReader();
    //dataURL形式でファイルを読み込む
    reader.readAsDataURL(file);
    //ファイルの読込が終了した時の処理
    reader.onload = function(){
        readImage1(reader, print_img_id, print_DataURL_id);
    }
}
function handleDragDropFile2(e) {
    this.style.backgroundColor="#FFFFFF";
    e.stopPropagation();
    e.preventDefault();
    var files = e.dataTransfer.files; // FileList object.
    var file = files[0];
    var reader = new FileReader();
    //dataURL形式でファイルを読み込む
    reader.readAsDataURL(file);
    //ファイルの読込が終了した時の処理
    reader.onload = function(){
        readImage2(reader, print_img_id, print_DataURL_id);
    }
}
//ファイルの読込が終了した時の処理
function readImage1(reader, print_image_id, print_DataURL_id ){
    //読み込んだ画像を書き出す
    var img = document.getElementById('image1');
    var src = document.createAttribute('src');
    src.value = reader.result;
    im1.src = reader.result;
    img.setAttributeNode(src);
    calculate();
}
function readImage2(reader, print_image_id, print_DataURL_id ){
    //読み込んだ画像を書き出す
    var img = document.getElementById('image2');
    var src = document.createAttribute('src');
    src.value = reader.result;
    im2.src = reader.result;
    img.setAttributeNode(src);
    calculate();
}

//psnrなどの計算
function calculate(){
    var txt = document.getElementById('checker');
    
    // 画像が入っていない
    if(im1.src == "" || im2.src == ""){
        return false;
    }
    // 幅か高さのどちらかが違う
    else if((im1.width != im2.width) || (im1.height != im2.height)){
        txt.textContent = "画像のサイズが違います";
        return false;
    }
    // 計算を行う
    else{
        var index = 0;
        // mseを出すための画像の画素の合計値
        var mseSum = new BigNumber(0.0);
        var average1 = new BigNumber(0.0);
        var average2 = new BigNumber(0.0);
        var variance1 = new BigNumber(0.0);
        var variance2 = new BigNumber(0.0);
        var convariance = new BigNumber(0.0);
        
        // http://mementoo.info/archives/1617
        var canvas1 = document.createElement('canvas');
        var canvas2 = document.createElement('canvas');
        canvas1.width = im1.width;
        canvas1.height = im1.height;
        canvas2.width = im1.width;
        canvas2.height = im1.height;
        var context1 = canvas1.getContext('2d');
        var context2 = canvas2.getContext('2d');
        context1.drawImage(im1, 0, 0);
        context2.drawImage(im2, 0, 0);
        var src1 = context1.getImageData(0, 0, im1.width, im1.height).data;
        var src2 = context2.getImageData(0, 0, im2.width, im2.height).data;
        
        for( var i = 0; i < im1.height; i++ ){
            for( var j = 0; j < im1.width; j++ ){
            	mseSum = mseSum.plus(Math.pow(src1[index] - src2[index], 2));
            	mseSum = mseSum.plus(Math.pow(src1[index + 1] - src2[index + 1], 2));
            	mseSum = mseSum.plus(Math.pow(src1[index + 2] - src2[index + 2], 2));
            	average1 = average1.plus(src1[index] + src1[index + 1] + src1[index + 2]);
            	average2 = average2.plus(src2[index] + src2[index + 1] + src2[index + 2]);
                
                index += 4;
            }
        }
        
        average1 = average1.div(new BigNumber(im1.width).times(im1.height).times(3));
        average2 = average2.div(new BigNumber(im1.width).times(im1.height).times(3));
//        console.log("average1:" + average1.toString());
//        console.log("average2:" + average2.toString());
        
        index = 0;
        for( var i = 0; i < im1.height; i++ ){
            for( var j = 0; j < im1.width; j++ ){
            	var tmpVar = new BigNumber(new BigNumber(src1[index]).minus(average1));
                variance1 = variance1.plus(new BigNumber(tmpVar).mul(tmpVar));
                tmpVar = new BigNumber(new BigNumber(src1[index + 1]).minus(average1));
                variance1 = variance1.plus(new BigNumber(tmpVar).mul(tmpVar));
                tmpVar = new BigNumber(new BigNumber(src1[index + 2]).minus(average1));
                variance1 = variance1.plus(new BigNumber(tmpVar).mul(tmpVar));
                
                tmpVar = new BigNumber(new BigNumber(src2[index]).minus(average2));
                variance2 = variance2.plus(new BigNumber(tmpVar).mul(tmpVar));
                tmpVar = new BigNumber(new BigNumber(src2[index + 1]).minus(average2));
                variance2 = variance2.plus(new BigNumber(tmpVar).mul(tmpVar));
                tmpVar = new BigNumber(new BigNumber(src2[index + 2]).minus(average2));
                variance2 = variance2.plus(new BigNumber(tmpVar).mul(tmpVar));
                
            	convariance = convariance.plus(new BigNumber(new BigNumber(src1[index]).minus(average1)).mul(new BigNumber(new BigNumber(src2[index]).minus(average2))));
            	convariance = convariance.plus(new BigNumber(new BigNumber(src1[index + 1]).minus(average1)).mul(new BigNumber(new BigNumber(src2[index + 1]).minus(average2))));
            	convariance = convariance.plus(new BigNumber(new BigNumber(src1[index + 2]).minus(average1)).mul(new BigNumber(new BigNumber(src2[index + 2]).minus(average2))));

/*                console.log("variance1:" + variance1.toString());
                console.log("variance2:" + variance2.toString());
                console.log("convariance:" + convariance.toString());*/
                
                index += 4;
            }
        }
        
        variance1 = variance1.div(new BigNumber(im1.width).times(im1.height).times(3));
        variance2 = variance2.div(new BigNumber(im1.width).times(im1.height).times(3));
        convariance = convariance.div(new BigNumber(im1.width).times(im1.height).times(3));
        mseSum = mseSum.div(new BigNumber(im1.width).times(im1.height).times(3));
        
        var c1 = new BigNumber(0.01).mul(255);
        c1 = c1.mul(c1);
        var c2 = new BigNumber(0.03).mul(255);
        c2 = c2.mul(c2);
        
/*        console.log("c1:" + c1.toString());
        console.log("c2:" + c2.toString());*/
        
        var ssim1 = new BigNumber(new BigNumber(2).mul(average1).mul(average2)).plus(c1);
        var ssim2 = new BigNumber(new BigNumber(2).mul(convariance)).plus(c2);
        var ssim3 = new BigNumber(average1.mul(average1)).plus(average2.mul(average2)).plus(c1);
        var ssim4 = new BigNumber(variance1).plus(variance2).plus(c2);
/*        console.log("ssim1:" + ssim1.toString());
        console.log("ssim2:" + ssim2.toString());
        console.log("ssim3:" + ssim3.toString());
        console.log("ssim4:" + ssim4.toString());*/
        
        var uiqi1 = new BigNumber(4).mul(average1).mul(average2).mul(convariance);
        var uiqi2 = new BigNumber(average1.mul(average1)).plus(average2.mul(average2));
        var uiqi3 = new BigNumber(variance1).plus(variance2);
        
        // 出力
        txt.innerHTML = "MSE = " + mseSum.toString() + " <br><br> " +
        				  "PSNR = " + 10 * Math.log10(255 * 255 / parseFloat(mseSum.toString())) + " <br><br> " +
        				  "SSIM = " + new BigNumber(ssim1.mul(ssim2)).div(ssim3.mul(ssim4)).toString() + " <br><br> " +
        				  "UIQI = " + new BigNumber(uiqi1.div(uiqi2.mul(uiqi3))).toString();
        
        return true;
    }
}