const Checking : HTMLElement = document.getElementById("checking-support") as HTMLElement;

if( navigator.gpu){
    Checking.innerText = "お使いのブラウザはWebGPUに対応しています。";
}else{
    Checking.innerText = "お使いのブラウザはWebGPUに対応していません。";
}