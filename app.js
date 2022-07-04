

// 三本線が押されたとき
let showMenu = () => {
    // 内容物が現れる
    var nav_list = document.getElementById("nav-list")
    nav_list.classList.toggle("vis")

    // 
    var nav_list2 = document.getElementById("fa-xmark")
    nav_list2.classList.toggle("vis2") 
    var nav_list3 = document.getElementById("fa-bars")
    nav_list3.classList.toggle("vis3")     
}

// バッテン印が押されたとき
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

let grid = document.getElementById("grid")

let createItemEl = (i) => {
    let ele = document.createElement("div");
    ele.className = 'item'
    let img_ele = document.createElement("img");
    img_ele.className = 'js-youtube-image' + i + ' iii'
    

    let br_ele = document.createElement("br");
    

    let a_ele = document.createElement("a");
    a_ele.className = 'js-youtube-link' + i
    
    // チャンネル名
    let channel_ele = document.createElement("div");
    channel_ele.className = 'js-youtube-channel' + i
    channel_ele.innerText = "チャンネル名:   ";

    // 再生回数
    let view_ele = document.createElement("div");
    view_ele.className = 'js-youtube-views' + i
    view_ele.innerText = "再生回数   ";

    ele.appendChild(img_ele)
    ele.appendChild(br_ele)

    ele.appendChild(a_ele)
    ele.appendChild(channel_ele)
    ele.appendChild(view_ele)
    grid.appendChild(ele)
    
}



/*  通信 */

/*
$.fn.jquery;
*/

//リクエストパラメーターのセット

let ID = "";
const KEY = 'AIzaSyBAqI-LiGZpGGS1NEoe0oB_Nvnjr6yjIw4' ;// APIKEY
let url = 'https://www.googleapis.com/youtube/v3/videos'; // APIURL

urls = [
    'fADXsTe05zs',
    'UiRBpKb1qKI',
    'Vuir5PmVzSU',
    '9RWMGwUr6Q4',
    'UHSipe7pSac',
]

for (let i = 0; i < urls.length; i++){
    createItemEl(i);
    url = 'https://www.googleapis.com/youtube/v3/videos';
    //ID = 'fADXsTe05zs' ;// 動画ID 15b1m2wehlU&t=4573s
    ID = urls[i];
    url += '?id=' + ID;
    url += '&key=' + KEY;
    url += '&part=snippet,contentDetails,statistics,status';
    console.log("url=" + url)
/*
    $(function(){
*/
        $.ajax({
          url: url,
          dataType : 'json'
        }).done(function(data){
          console.log(data.items[0]);
          let jslink = '.js-youtube-link' + i
          let jsimg = '.js-youtube-image' + i
          let jscha = '.js-youtube-channel' + i
          let jsv = '.js-youtube-views' + i
          
          console.log("url!! = " + url)
          // URL
          $(jslink).attr('href', `https://www.youtube.com/watch?v=fADXsTe05zs&t=25s${data.items[0].snippet.channelId}`);
          
          // サムネイル
          $(jsimg).attr('src', data.items[0].snippet.thumbnails.medium.url);
          
          // タイトル
          $(jslink).append(data.items[0].snippet.title);
      
          // チャンネル名
          $(jscha).append(data.items[0].snippet.channelTitle);
          
          // チャンネルURL
          let $youtubeChannel = $(jscha);
          $youtubeChannel.attr('data-href', `https://www.youtube.com/channel/${data.items[0].snippet.channelId}`);
          
          // aタグ内で別のURLに遷移
          $youtubeChannel.on('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            window.open($('.js-youtube-channel').data('href'), '_blank');
          });
          
          // 再生回数
          $(jsv).append(data.items[0].statistics.viewCount);
      
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
          $('.js-youtube-description').append(data.items[0].snippet.description);
          
        }).fail(function(data){
          console.log('通信に失敗しました。');
        });
    //});
}


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

/*
let init = () => {
    let name = "hoge";
    let displayName = () => {
        alert(name);
    }
    displayName();
}

init()
*/


