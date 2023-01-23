let play = document.querySelector('#play')

let next = document.querySelector('#next')
let prev = document.querySelector('#prev')

let music = document.querySelector('audio')
let title = document.querySelector('#title')
let artist = document.querySelector('#artist')
let img = document.querySelector('img')


let progressContainer = document.querySelector('#progress-container')
let progress = document.querySelector('#progress')

let time = document.querySelector('#current-time')
let timeDuration = document.querySelector('#duration')

let songs = [
{
    name: 'Freddie_Gibbs_Sing_For_Me',
    song: 'Sing For Me',
    musician: 'Freddie Gibbs',
},
{
    name: 'Freddie_Gibbs_PYS_feat_DJ_Paul_Official_Visu',
    song: 'PYS',
    musician: 'Freddie Gibbs',
},
{
    name: 'Freddie_Gibbs_NO_PRBLMS_Freestyle_',
    song: 'No Problems',
    musician: 'Freddie Gibbs',
}

]

let songIndex = 0

let isPlaying = false



function playSong() {
    isPlaying = true
    play.classList.replace('fa-play', 'fa-pause')
    play.setAttribute('title', 'pause')
    music.play()
}

function pauseSong() {
    isPlaying = false
    play.classList.replace('fa-pause', 'fa-play')
    play.setAttribute('title', 'play')
    music.pause()
}

function loadSong(songs) {
    title.textContent = songs.song
    artist.textContent = songs.musician
    music.src = `music/${songs.name}.mp3`
    img.src = `img/${songs.name}.jpg`
    
}



function nextSong() {
songIndex++
if(songIndex > songs.length -1) {
    songIndex = 0
}
console.log(songIndex)
loadSong(songs[songIndex])
playSong()





}

function prevSong() {

songIndex--
if(songIndex < 0) {
    songIndex = songs.length - 1
}
console.log(songIndex)
loadSong(songs[songIndex])
playSong()




}

function changeProgress (e) {
    if (isPlaying) {
        let { duration, currentTime} = e.srcElement
        
        let progressPercent = (currentTime/ duration) * 100
        progress.style.width = `${progressPercent}%`
        let durationMinutes = Math.floor(duration / 60)
        let durationSeconds = Math.floor(duration % 60)
        
        if (durationSeconds < 10) {
            durationSeconds =  `0${durationSeconds}`
        }
        

        
        if(durationSeconds) {
            timeDuration.innerText = `${durationMinutes}: ${durationSeconds}` 
        }

        let currentMinutes = Math.floor(currentTime / 60)
        let currentSeconds = Math.floor(currentTime % 60)
        
        if (currentSeconds < 10) {
            currentSeconds =  `0${currentSeconds}`
        }
       

        time.innerText = `${currentMinutes}: ${currentSeconds}`

    }
    
}


function setProgressBar(e) {
    console.log(e)
    let width = this.clientWidth
    
    let clickX = e.offsetX
    
    let {duration} = music
    

    music.currentTime = (clickX/width) * duration

}

play.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()))
next.addEventListener('click', nextSong)
prev.addEventListener('click', prevSong)
music.addEventListener('timeupdate', changeProgress)
music.addEventListener('ended', nextSong)
progressContainer.addEventListener('click', setProgressBar)

