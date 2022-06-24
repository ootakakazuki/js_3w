

let showMenu = () => {
    var nav_list = document.getElementById("nav-list")
    nav_list.classList.toggle("vis")
    var nav_list2 = document.getElementById("fa-xmark")
    nav_list2.classList.toggle("vis2") 
    var nav_list3 = document.getElementById("fa-bars")
    nav_list3.classList.toggle("vis3")     
}

let showMenu2 = () => {
    var nav_list = document.getElementById("nav-list")
    nav_list.classList.toggle("vis")
    var nav_list2 = document.getElementById("fa-bars")
    nav_list2.classList.toggle("vis3") 
    var nav_list3 = document.getElementById("fa-xmark")
    nav_list3.classList.toggle("vis2") 
}


let fa_bars = document.getElementById("fa-bars")
fa_bars.addEventListener("click", showMenu)

let fa_xmark = document.getElementById("fa-xmark")
fa_xmark.addEventListener("click", showMenu2)


let aaa = document.getElementById("aaa")

let acd = document.getElementById("acd")

let acd_toggle = () => {
    acd.classList.toggle("vis-acd-li");
}

let acd_btn_id = document.getElementById("acd-btn-id")

acd_btn_id.addEventListener('click', acd_toggle)

let text_form = document.getElementById("text-form")

let text_cla = document.getElementById("text-cla")

let showLength = (obj) => {
    if(checkStrCount(obj)){
        text_cla.innerHTML = obj.value.length
    }
}

let checkStrCount = (obj) => {
    if (obj.value.length > 30)
    {
        obj.value.substr(30, 100)
        alert("文字数オーバー")
        return false;
    }
    return true;
}

let images_box = [
    'url(../images/ham.png)',
    'url(../images/batsu.png)',
];


let fa_arrow_left = document.getElementsByClassName("fa-arrow-left");
let fa_arrow_right = document.getElementsByClassName("fa-arrow-right");
let c = 0;
let slide_show = document.getElementById("slide-show");

let change = () => {
    slide_show.style.backgroundImage = images_box[c];
}

let slideShowBack = () => {
    if (c == 0){
        c = images_box.length;
    }
    c--;
    console.log(c)
    change(c);
}

let slideShowNext = () => {
    if (c >= (images_box.length - 1)){
        c = -1;
    }
    c++;
    console.log(c)
    change(c);
}

fa_arrow_left[0].addEventListener('click', slideShowBack);
fa_arrow_right[0].addEventListener('click', slideShowNext);



/*  通信 */

/*
$.fn.jquery;
*/

//リクエストパラメーターのセット
const KEY = 'AIzaSyBAqI-LiGZpGGS1NEoe0oB_Nvnjr6yjIw4' ;// APIKEY
const ID = 'fADXsTe05zs' ;// 動画ID 15b1m2wehlU&t=4573s
let url = 'https://www.googleapis.com/youtube/v3/videos'; // APIURL
url += '?id=' + ID;
url += '&key=' + KEY;
url += '&part=snippet,contentDetails,statistics,status';

//Ajax通信をする
/*
$(function(){
    $.ajax({
        url: url,
        dataType: 'json'
    }).done(function(data){
        console.log("成功");
        // サムネイル
        $('#js-youtube-image').attr('src', data.items[0].snippet.thumbnails.medium.url);
        
    }).fail(function(data){
        console.log("通信失敗");
    });
})
*/

$(function(){
  $.ajax({
    url: url,
    dataType : 'json'
  }).done(function(data){
    console.log(data.items[0]);

    // URL
    $('#js-youtube-link').attr('href', `https://www.youtube.com/watch?v=fADXsTe05zs&t=25s${data.items[0].snippet.channelId}`);
    
    // サムネイル
    $('#js-youtube-image').attr('src', data.items[0].snippet.thumbnails.medium.url);
    
    // タイトル
    $('#js-youtube-link').append(data.items[0].snippet.title);

    // チャンネル名
    $('#js-youtube-channel').append(data.items[0].snippet.channelTitle);
    
    // チャンネルURL
    const $youtubeChannel = $('#js-youtube-channel');
    $youtubeChannel.attr('data-href', `https://www.youtube.com/channel/${data.items[0].snippet.channelId}`);
    
    // aタグ内で別のURLに遷移
    $youtubeChannel.on('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      window.open($('#js-youtube-channel').data('href'), '_blank');
    });
    
    // 再生回数
    $('#js-youtube-views').append(data.items[0].statistics.viewCount);

/*
    // 再生時間
    let duration = data.items[0].contentDetails.duration;
    let convertDuration = moment.duration(duration).format('hh:mm:ss');
    $('#js-youtube-duration').append(convertDuration);
 
    // 投稿日時
    moment.locale('ja');
    let date = data.items[0].snippet.publishedAt;
    let convertDate = moment(date).fromNow();
    $('#js-youtube-date').append(convertDate);
*/    
    // 説明
    $('#js-youtube-description').append(data.items[0].snippet.description);
    
  }).fail(function(data){
    console.log('通信に失敗しました。');
  });
});