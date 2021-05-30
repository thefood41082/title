

/********** ここからローディングアニメーション **********/
window.addEventListener('DOMContentLoaded', ()=>{
  const all_img = document.getElementsByTagName("img");    //すべての画像を取得（背景画像は含めない）
  const img_len = all_img.length;                          //ページ内に存在する画像の総数
  let loaded_counter = 0;                                  //読み込みが完了した画像の総数

  //各画像に読み込みが完了した際に leaded_counter（読み込み完了枚数）をカウントアップ処理をするイベントリスナーを登録する
  for (var i = 0; i < img_len; i++) {
    all_img[i].addEventListener("load", ()=>{ loaded_counter++ },{once: true});
  }

  //ローディング画面のCSSを操作して非表示にする関数
  function clearLoadingWindow(){
    const loading = document.getElementById('js-loader'); 
    loading.style.display = "none";
  }

  //一定間隔で処理を行ってくれるタイマー変数を用意
  let timer = setInterval(loadingFunc, 33);  

  //タイマーによって一定間隔ごとに呼び出される処理
  //画像総枚数と読み込み完了枚数を比較し、等しければ読み込み完了処理へ移る
  function loadingFunc() {
    if (img_len == loaded_counter) {
      //読み込み完了後はタイマーを除去する
      clearInterval(timer);
      clearLoadingWindow();
    } 
  }
});
/********** ここまでローディングアニメーション **********/


window.onload = ()=> {

/********** ここからナビゲーションスクロール **********/
  //HTMLのナビゲーションバーにあるボタンを取得
  const toSecondPageButton = document.getElementById("js-toSecondPage");
  //ボタンがクリックされた際に実行する関数を登録
  toSecondPageButton.addEventListener('click',scrollToTarget,false);
  //関数に渡すイベントパラメータを設定
  toSecondPageButton.eventParam = "js-second-page";

  const toThirdPageButton = document.getElementById("js-toThirdPage");
  toThirdPageButton.addEventListener('click',scrollToTarget,false);
  toThirdPageButton.eventParam = "js-third-page";

  const toForthPageButton = document.getElementById("js-toForthPage");
  toForthPageButton.addEventListener('click',scrollToTarget,false);
  toForthPageButton.eventParam = "js-forth-page";

  const toFifthPageButton = document.getElementById("js-toFifthPage");
  toFifthPageButton.addEventListener('click',scrollToTarget,false);
  toFifthPageButton.eventParam = "js-fifth-page";

  //引数で指定されたエレメントまでスクロールさせる関数
  function scrollToTarget(event){
    //イベントパラメータを元に遷移先のエレメントを取得
    const targetPage = document.getElementById(event.target.eventParam);
    //該当エレメントへスクロール
    targetPage.scrollIntoView({
      behavior:"smooth",
      block:"start",
      inline:"start"
    });
  }
/********** ここまでナビゲーションスクロール **********/


/********** ここからモーダル **********/
  //（モーダルにis-showクラスがついているかついていないかで表示、非表示を切り分ける）
  //モーダル取得
  const modal = document.getElementById('js-modal');
  //モダールの背景取得
  const modalBg = document.getElementById('js-modal-bg');
  //モダール内の画像取得
  const modalPhoto = document.getElementById('js-modal-photo');
  //モダール内の背景をクリックされた際モーダルを閉じるように設定（is-showクラスを無くす）
  modalBg.addEventListener('click', ()=> { modal.classList.toggle('is-show') });

  //フォトギャラリーの画像群を取得
  const photoList = document.getElementsByClassName("js-photo-gallery");
  //フォトギャラリーの各画像にもしクリックされたの処理を追加する

  function openModal(elem) {
    if(!elem) return;
    elem.addEventListener('click', function() {
      const photoPath = elem.getAttribute('src');
      modalPhoto.setAttribute("src",photoPath);
      modal.classList.toggle('is-show');
    });
  }

  for(let i = 0; i < photoList.length; i++){
    openModal(photoList[i]);
  }
/********** ここまでモーダル **********/

/********** ここからスライドショー **********/
  //（showingクラスがついているものが表示されるスライドとなる）
  //スライダーの取得
  const slides = document.querySelectorAll('#slides .slide');
  //現在のスライドページの設定
  let currentSlide = 0;
  //一定間隔ごとに次のスライドへ移るようにタイマーを設定
  setInterval(nextSlide,5000); 

  //次のスライドへ移る関数
  function nextSlide(){
    goToSlide(currentSlide+1);
  }

  //前のスライドに移る関数
  function previousSlide(){
    goToSlide(currentSlide-1);
  }

  //指定されたスライドへ移る関数
  function goToSlide(n){
    slides[currentSlide].className = 'slide';
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].className = 'slide showing';
  }

  //進むボタンと戻るボタンを取得
  const next = document.getElementById('js-slide-next');
  const previous = document.getElementById('js-slide-previous');
  //もしボタンが押されたら戻るor進ませる。
  next.addEventListener('click',nextSlide);
  previous.addEventListener('click',previousSlide);
/********** ここまでスライドショー **********/

}
