console.log("Welcome");
//Initialise
let songindex=1;
let mastersongname=document.getElementById('mastersongname');
let audioelement= new Audio(`/songs/${songindex}.mp3`);
let masterplay=document.getElementById('masterplay');
let masterduration=document.getElementById('duration');
let myBar=document.getElementById('myBar');

let songs=[
    {songname:"Kesariya", filePath:"/songs/1.mp3", coverPath:"/covers/1.jpg", duration:"04:28"},
    {songname:"Jo Tainu Dhoop Lagya", filePath:"/songs/2.mp3", coverPath:"/covers/2.jpg", duration:"03:43"},
    {songname:"Vaaste", filePath:"/songs/3.mp3", coverPath:"/covers/3.jpg", duration:"03:16"},
    {songname:"Raatan Lambiyan", filePath:"/songs/4.mp3", coverPath:"/covers/4.jpg", duration:"03:50"},
    {songname:"Lag Ja Gale", filePath:"/songs/5.mp3", coverPath:"/covers/5.jpg", duration:"04:18"},
    {songname:"Tera Fitoor", filePath:"/songs/6.mp3", coverPath:"/covers/6.jpg", duration:"05:10"},
    {songname:"Chand Baaliyan", filePath:"/songs/7.mp3", coverPath:"/covers/7.jpg", duration:"01:43"},
    {songname:"Chaka Chak", filePath:"/songs/8.mp3", coverPath:"/covers/8.jpg", duration:"04:29"},
    {songname:"Ek Pyar Ka Nagma Hai", filePath:"/songs/9.mp3", coverPath:"/covers/9.jpg", duration:"05:56"},
    {songname:"Baar Baar Dekho", filePath:"/songs/10.mp3", coverPath:"/covers/10.jpg", duration:"04:51"}
]
//audioelement.play();

//Handle play and pause
masterplay.addEventListener('click',()=>{
    if(audioelement.paused || audioelement.currentTime<=0){
        audioelement.play();
        document.getElementById(songindex).classList.remove('fa-circle-play');
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
    }
    else{
        audioelement.pause();
        masterplay.classList.remove('fa-circle-pause');
        masterplay.classList.add('fa-circle-play');
    }
})

//listen events
audioelement.addEventListener('timeupdate',()=>{
    //update bar
    progress=parseInt((audioelement.currentTime/audioelement.duration)*100);
    myBar.value=progress;
})
myBar.addEventListener('change',()=>{
    audioelement.currentTime=myBar.value*audioelement.duration/100;
})

const makeallplays=function(){
    Array.from(document.getElementsByClassName('songplay')).forEach((element) => {
        element.classList.add('fa-circle-play');
        element.classList.remove('fa-circle-pause');
    })
}
Array.from(document.getElementsByClassName('songplay')).forEach((element) => {
    element.addEventListener('click',(e)=>{
        console.log(e.target);
        makeallplays();
        songindex=parseInt(e.target.id);
        audioelement.src=`/songs/${songindex}.mp3`;
        audioelement.currentTime=0;
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
        audioelement.play();
        e.target.classList.remove('fa-circle-play');
        mastersongname.innerText=songs[songindex-1].songname;
        masterduration.innerText=songs[songindex-1].duration;
    })
})

document.getElementById('next').addEventListener('click',()=>{
    document.getElementById((songindex)).classList.add('fa-circle-play');
    if(songindex>=10){
        songindex=1;
    }
    else{
        songindex+=1;
    }
    audioelement.src=`/songs/${songindex}.mp3`;
    mastersongname.innerText=songs[songindex-1].songname;
    masterduration.innerText=songs[songindex-1].duration;
    
    document.getElementById(songindex).classList.remove('fa-circle-play');
        audioelement.currentTime=0;
        audioelement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click',()=>{
    document.getElementById((songindex)).classList.add('fa-circle-play');
    if(songindex<=1){
        songindex=1;
    }
    else{
        songindex-=1;
    }
    audioelement.src=`/songs/${songindex}.mp3`;
    mastersongname.innerText=songs[songindex-1].songname;
    masterduration.innerText=songs[songindex-1].duration;
    
    document.getElementById(songindex).classList.remove('fa-circle-play');
        audioelement.currentTime=0;
        audioelement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
})