const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('audio');
const progressCont = document.querySelector('#progress-container');
const progress = document.querySelector('#progress');
currentTimeEl = document.querySelector('.current-time');
durationEl = document.querySelector('.duration');
const albumArt = document.querySelector('img');
const artist = document.querySelector('#artist');
const title  = document.querySelector('#title');

// Music

songs = [
{
    name: 'jacinto-1',
    displayName: 'Electric Chill Machine',
    artist: 'Jacinto Design',

},

{
    name: 'jacinto-2',
    displayName: 'Seven Nation Army (Remix)',
    artist: 'Jacinto Design',
},

{
    name: 'jacinto-3',
    displayName: 'Pop',
    artist: 'Jacinto Design',
},

{
    name: 'metric-1',
    displayName: 'Uhh',
    artist: 'Metric',
},
]

// Check if playing
let isPlaying = false;

// Play

function playSong() {
isPlaying = true;
playBtn.classList.replace('fa-play', 'fa-pause');
playBtn.setAttribute('title', 'Pause');
audio.play();
}

// Pause

function pauseSong() {
    isPlaying  = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    audio.pause();
    
    }

// Event listeners

playBtn.addEventListener('click', () => (isPlaying? pauseSong
    () : playSong()));

// Update DOM

function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
   audio.src = `music/${song.name}.mp3`;
  albumArt.src =`img/${song.name}.jpg`
};


//   Song index

let songIndex = 0;

// Next song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();}

// Prev song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
    songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Update progress
function updateProgressBar(e) {
    if (isPlaying) {
       const {duration, currentTime} = e.srcElement;
    //    Update progress bar
    const progressPercent = (currentTime/duration) * 100;
        progress.style.width = `${progressPercent}%`;
    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`;
    }
    if (durationSeconds) {
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    // Calculate display for current
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`;
    }

    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
}}; 

// On load - Select first song

loadSong(songs[songIndex]);

// Set progress bar

function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = audio;
    audio.currentTime = (clickX / width) * duration;
}

// Event Listeners 

prevBtn.addEventListener('click', prevSong);

nextBtn.addEventListener('click', nextSong);

audio.addEventListener('ended', nextSong);

audio.addEventListener('timeupdate', updateProgressBar);

progressCont.addEventListener('click', setProgressBar)