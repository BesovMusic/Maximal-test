import '../scss/style.scss';
import '../index.html';
import Player from './entity/Player';

const songs = [
	{
		id: 0,
		title: 'Harder, Better, Faster, Stronger',
		artist: 'Daft Punk',
		src: 'music/Daft_Punk.mp3',
		cover: 'music/covers/daft_punk.jpg',
		duration: '03:46',
	},
	{
		id: 1,
		title: 'Blinding lights',
		artist: 'The Weeknd',
		src: 'music/The_Weeknd.mp3',
		cover: 'music/covers/the_weeknd.jpg',
		duration: '03:21',
	},
	{
		id: 2,
		title: 'Снегом',
		artist: 'КОСМОНАВТОВ НЕТ',
		src: 'music/КОСМОНАВТОВ_НЕТ.mp3',
		cover: 'music/covers/snegom.jpg',
		duration: '02:38',
	},
	{
		id: 3,
		title: 'Harder, Better, Faster, Stronger',
		artist: 'Daft Punk',
		src: 'music/Daft_Punk.mp3',
		cover: 'music/covers/daft_punk.jpg',
		duration: '03:46',
	},
	{
		id: 4,
		title: 'Blinding lights',
		artist: 'The Weeknd',
		src: 'music/The_Weeknd.mp3',
		cover: 'music/covers/the_weeknd.jpg',
		duration: '03:21',
	},
	{
		id: 5,
		title: 'Снегом',
		artist: 'КОСМОНАВТОВ НЕТ',
		src: 'music/КОСМОНАВТОВ_НЕТ.mp3',
		cover: 'music/covers/snegom.jpg',
		duration: '02:38',
	},
];

const player = new Player(songs);

const tracklist = document.querySelector('.tracklist');

function addTrack(track) {
	const myTrack = document.createElement('div');
	myTrack.classList.add('tracklist__track');
	myTrack.innerHTML = `<div class="tracklist__left">
			<button class="tracklist__play mdi mdi-play"></button>
			<div class="tracklist__info">
				<span class="tracklist__author"
					>${track.artist}</span>
				<span class="tracklist__track-name"
					>${track.title}
				</span>
			</div>
		</div>
		<div class="tracklist__right">
			<span class="tracklist__duration">${track.trackDuration}</span>
			<button class="tracklist__download mdi mdi-download"></button>
		</div>`;

	const bgImg = myTrack.querySelector('.tracklist__play');
	bgImg.style.backgroundImage = `url(${track.cover})`;

	tracklist.append(myTrack);
}

player.tracks.forEach(addTrack);

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

let songIndex = 0;

loadSong(songs[songIndex]);

function loadSong(song) {
	artist.innerText = song.artist;
	title.innerText = song.title;
	audio.src = song.src;
	cover.src = song.cover;
	selectCurrentTrack();
}

function playSong() {
	playBtn.classList.remove('mdi-play');
	playBtn.classList.add('mdi-pause');
	player.currentTrack.play();
	let tPlayBtn = track[songIndex].querySelector('.tracklist__play');
	tPlayBtn.classList.add('mdi-pause');
	tPlayBtn.classList.remove('mdi-play');
}

function pauseSong() {
	playBtn.classList.remove('mdi-pause');
	playBtn.classList.add('mdi-play');
	player.currentTrack.pause();
	let tPlayBtn = track[songIndex].querySelector('.tracklist__play');
	tPlayBtn.classList.remove('mdi-pause');
	tPlayBtn.classList.add('mdi-play');
}

function prevSong() {
	songIndex--;
	if (songIndex < 0) {
		songIndex = songs.length - 1;
	}
	loadSong(songs[songIndex]);
	player.prev(songIndex);
	playSong();
}

function nextSong() {
	songIndex++;
	if (songIndex > songs.length - 1) {
		songIndex = 0;
	}
	loadSong(songs[songIndex]);
	player.next(songIndex);
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
	const duration = player.currentTrack.duration;

	player.currentTrack.currentTime = (clickX / width) * duration;
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

// events

playBtn.addEventListener('click', () => {
	if (!player.currentTrack.paused) {
		pauseSong();
	} else {
		playSong();
	}
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

player.currentTrack.addEventListener('timeupdate', updateProgress);
player.currentTrack.addEventListener('ended', nextSong);
player.currentTrack.addEventListener('canplay', () => {
	time.innerText = `${formatTime(
		player.currentTrack.currentTime
	)} / ${formatTime(player.currentTrack.duration)}`;
});

progressContainer.addEventListener('click', setProgress);

volumeWrapper.addEventListener('click', setVolume);

muteBtn.addEventListener('click', toggleMute);

burger.addEventListener('click', () => {
	sideNav.classList.add('active');
});
closeSide.addEventListener('click', () => {
	sideNav.classList.remove('active');
});

// Tracklist section

function selectCurrentTrack() {
	track.forEach((item) => {
		item.classList.remove('tracklist__track--active');
	});
	track[songIndex].classList.add('tracklist__track--active');
	changeTrackState();
}

function changeTrackState() {
	track.forEach((item) => {
		const play = item.querySelector('.tracklist__play');
		play.classList.remove('mdi-pause');
		play.classList.add('mdi-play');
	});
}

track.forEach((item, i) => {
	item.addEventListener('click', () => {
		if (songIndex === i && player.currentTrack.paused) {
			playSong();
		} else if (songIndex === i && !player.currentTrack.paused) {
			pauseSong();
		} else {
			songIndex = i;
			loadSong(songs[songIndex]);
			playSong();
		}
	});
});
