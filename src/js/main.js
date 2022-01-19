import '../scss/style.scss';
import '../index.html';
import Track from './classes/Track';

const songs = [
	{
		title: 'Harder, Better, Faster, Stronger',
		artist: 'Daft Punk',
		src: 'music/Daft_Punk.mp3',
		cover: 'music/covers/daft_punk.jpg',
		duration: '03:46',
	},
	{
		title: 'Blinding lights',
		artist: 'The Weeknd',
		src: 'music/The_Weeknd.mp3',
		cover: 'music/covers/the_weeknd.jpg',
		duration: '03:21',
	},
	{
		title: 'Снегом',
		artist: 'КОСМОНАВТОВ НЕТ',
		src: 'music/КОСМОНАВТОВ_НЕТ.mp3',
		cover: 'music/covers/snegom.jpg',
		duration: '02:38',
	},
	{
		title: 'Harder, Better, Faster, Stronger',
		artist: 'Daft Punk',
		src: 'music/Daft_Punk.mp3',
		cover: 'music/covers/daft_punk.jpg',
		duration: '03:46',
	},
	{
		title: 'Blinding lights',
		artist: 'The Weeknd',
		src: 'music/The_Weeknd.mp3',
		cover: 'music/covers/the_weeknd.jpg',
		duration: '03:21',
	},
	{
		title: 'Снегом',
		artist: 'КОСМОНАВТОВ НЕТ',
		src: 'music/КОСМОНАВТОВ_НЕТ.mp3',
		cover: 'music/covers/snegom.jpg',
		duration: '02:38',
	},
];

const tracklist = document.querySelector('.tracklist');

for (let index = 0; index < songs.length; index++) {
	const myTrack = new Track(songs[index]);
	const track = myTrack.createTrack;
	tracklist.append(track);
}

const track = document.querySelectorAll('.tracklist__track');

// player section

const playerWrapper = document.querySelector('.player__wrapper');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.player__line--progress');
const progressContainer = document.querySelector('.player__line');
const title = document.querySelector('.player__title');
const artist = document.querySelector('.player__artist');
const cover = document.querySelector('.player__img');
const volumeWrapper = document.querySelector('.player__volume');
const volume = document.querySelector('.player__volume--line');
const time = document.querySelector('.player__duration');
const muteBtn = document.querySelector('.player__volume-btn');
const burger = document.querySelector('#burger');
const closeSide = document.querySelector('#closeSide');
const sideNav = document.querySelector('.side-nav');

let songIndex = 1;

loadSong(songs[songIndex]);

function loadSong(song) {
	artist.innerText = song.artist;
	title.innerText = song.title;
	audio.src = song.src;
	cover.src = song.cover;
}

function playSong() {
	playBtn.classList.remove('mdi-play');
	playBtn.classList.add('mdi-pause');
	audio.play();
}

function pauseSong() {
	playBtn.classList.remove('mdi-pause');
	playBtn.classList.add('mdi-play');
	audio.pause();
}

function prevSong() {
	songIndex--;
	if (songIndex < 0) {
		songIndex = songs.length - 1;
	}
	loadSong(songs[songIndex]);
	playSong();
}

function nextSong() {
	songIndex++;
	if (songIndex > songs.length - 1) {
		songIndex = 0;
	}
	loadSong(songs[songIndex]);
	playSong();
}

function updateProgress(e) {
	const { duration, currentTime } = e.srcElement;
	const progressPercent = (currentTime / duration) * 100;
	progress.style.width = `${progressPercent}%`;
	time.innerText = `${formatTime(currentTime)} / ${formatTime(duration)}`;
}

function setProgress(e) {
	const width = this.clientWidth;
	const clickX = e.offsetX;
	const duration = audio.duration;

	audio.currentTime = (clickX / width) * duration;
}

function setVolume(e) {
	const width = this.clientWidth;
	const clickX = e.offsetX;
	const volumePercent = (clickX / width) * 100;

	volume.style.width = `${volumePercent}%`;
	audio.volume = clickX / width;
}

function formatTime(time) {
	let min = Math.floor(time / 60);
	if (min < 10) {
		min = '0' + min;
	}

	let sec = Math.floor(time % 60);
	if (sec < 10) {
		sec = '0' + sec;
	}
	return `${min}:${sec}`;
}

function toggleMute() {
	if (!audio.muted) {
		audio.muted = true;
		muteBtn.classList.remove('mdi-volume-high');
		muteBtn.classList.add('mdi-volume-off');
		// playerWrapper.classList.add('mute');
	} else {
		audio.muted = false;
		muteBtn.classList.add('mdi-volume-high');
		muteBtn.classList.remove('mdi-volume-off');
	}
}

function selectSong(i) {
	const playIcon = track[i].querySelector('.tracklist__play');
	if (songIndex != i && !audio.paused) {
		track.forEach((item) => {
			const playIcon = item.querySelector('.tracklist__play');
			item.classList.remove('tracklist__track--active');
			playIcon.classList.remove('mdi-pause');
			playIcon.classList.add('mdi-play');
		});
		track[i].classList.add('tracklist__track--active');
		playIcon.classList.add('mdi-pause');
		playIcon.classList.remove('mdi-play');
		songIndex = i;
		loadSong(songs[songIndex]);
		playSong();
	} else if (songIndex === i && audio.paused) {
		playSong();
	} else {
		pauseSong();
	}
}

// events

playBtn.addEventListener('click', () => {
	if (!audio.paused) {
		pauseSong();
	} else {
		playSong();
	}
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextSong);
audio.addEventListener('canplay', () => {
	time.innerText = `${formatTime(audio.currentTime)} / ${formatTime(
		audio.duration
	)}`;
});

progressContainer.addEventListener('click', setProgress);

volumeWrapper.addEventListener('click', setVolume);

muteBtn.addEventListener('click', toggleMute);

track.forEach((item, i) => {
	item.addEventListener('click', () => {
		selectSong(i);
	});
});

burger.addEventListener('click', () => {
	sideNav.classList.add('active');
});
closeSide.addEventListener('click', () => {
	sideNav.classList.remove('active');
});
