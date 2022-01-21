import '../scss/style.scss';
import '../index.html';
import Player from './entity/Player';

(async () => {
	const resposne = await fetch('songs.json');
	const songs = await resposne.json();

	const tracklist = document.querySelector('.tracklist');

	const player = new Player(songs);

	player.tracks.forEach((track) => {
		const creatingTrack = document.createElement('div');
		creatingTrack.classList.add('tracklist__track');
		creatingTrack.setAttribute('data-id', track.id);
		creatingTrack.innerHTML = `<div class="tracklist__left">
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
				<span class="tracklist__duration">00:00</span>
				<button class="tracklist__download mdi mdi-download"></button>
			</div>`;

		const bgImg = creatingTrack.querySelector('.tracklist__play');
		bgImg.style.backgroundImage = `url(${track.cover})`;

		tracklist.append(creatingTrack);
	});

	player.tracks.forEach((track, i) => {
		track.addEventListener('loadedmetadata', () => {
			const trackDuration = document.querySelectorAll(
				'.tracklist__duration'
			);
			trackDuration[i].innerText = track.trackDuration;
		});
	});

	const track = document.querySelectorAll('.tracklist__track');
	const playBtn = document.querySelector('#play');
	const prevBtn = document.querySelector('#prev');
	const nextBtn = document.querySelector('#next');
	const progress = document.querySelector('.player__line--progress');
	const progressContainer = document.querySelector('.player__line');
	const title = document.querySelector('.player__title');
	const artist = document.querySelector('.player__artist');
	const cover = document.querySelector('.player__img');
	const volume = document.querySelector('.player__volume');
	const time = document.querySelector('.player__duration');
	const muteBtn = document.querySelector('.player__volume-btn');

	const burger = document.querySelector('#burger');
	const closeSide = document.querySelector('#closeSide');
	const sideNav = document.querySelector('.side-nav');

	loadSong(player.currentTrack);

	function loadSong(song) {
		artist.innerText = song.artist;
		title.innerText = song.title;
		cover.src = song.cover;
		selectCurrentTrack();
	}

	function playSong() {
		playBtn.classList.remove('mdi-play');
		playBtn.classList.add('mdi-pause');
		player.currentTrack.play();
		let tPlayBtn =
			track[player.currentTrackIndex].querySelector('.tracklist__play');
		tPlayBtn.classList.add('mdi-pause');
		tPlayBtn.classList.remove('mdi-play');
	}

	function pauseSong() {
		playBtn.classList.remove('mdi-pause');
		playBtn.classList.add('mdi-play');
		player.currentTrack.pause();
		let tPlayBtn =
			track[player.currentTrackIndex].querySelector('.tracklist__play');
		tPlayBtn.classList.remove('mdi-pause');
		tPlayBtn.classList.add('mdi-play');
	}

	function prevSong() {
		player.prev();
		loadSong(player.currentTrack);
		playSong();
	}

	function nextSong() {
		player.next();
		loadSong(player.currentTrack);
		playSong();
	}

	function updateProgress(e) {
		const { duration, currentTime } = e.srcElement;
		const progressPercent = (currentTime / duration) * 100;
		progress.style.width = `${progressPercent}%`;
		time.innerText = `${player.currentTrack.trackCurrentTime} / ${player.currentTrack.trackDuration}`;
	}

	function setProgress(e) {
		const width = this.clientWidth;
		const clickX = e.offsetX;
		const duration = player.currentTrack.duration;

		player.currentTrack.currentTime = (clickX / width) * duration;
	}

	function setVolume() {
		player.tracks.forEach((track) => {
			track.volume = volume.value;
		});
	}

	function toggleMute() {
		if (!player.currentTrack.muted) {
			player.currentTrack.muted = true;
			muteBtn.classList.remove('mdi-volume-high');
			muteBtn.classList.add('mdi-volume-off');
		} else {
			player.currentTrack.muted = false;
			muteBtn.classList.add('mdi-volume-high');
			muteBtn.classList.remove('mdi-volume-off');
		}
	}

	function selectCurrentTrack() {
		track.forEach((item) => {
			const play = item.querySelector('.tracklist__play');
			item.classList.remove('tracklist__track--active');
			play.classList.remove('mdi-pause');
			play.classList.add('mdi-play');
		});
		track[player.currentTrackIndex].classList.add(
			'tracklist__track--active'
		);
	}

	// events

	track.forEach((item, i) => {
		item.addEventListener('click', () => {
			if (player.currentTrackIndex === i && player.currentTrack.paused) {
				playSong();
			} else if (
				player.currentTrackIndex === i &&
				!player.currentTrack.paused
			) {
				pauseSong();
			} else {
				player.choiсeTrack(item.dataset.id);
				loadSong(player.currentTrack);
				playSong();
			}
		});
	});

	playBtn.addEventListener('click', () => {
		if (player.currentTrack.paused) {
			playSong();
		} else {
			pauseSong();
		}
	});

	prevBtn.addEventListener('click', prevSong);
	nextBtn.addEventListener('click', nextSong);

	player.tracks.forEach((track) => {
		track.addEventListener('timeupdate', updateProgress);
		track.addEventListener('ended', nextSong);
		track.addEventListener('loadedmetadata', () => {
			time.innerText = `${player.currentTrack.trackCurrentTime} / ${player.currentTrack.trackDuration}`;
		});
	});

	progressContainer.addEventListener('click', setProgress);

	volume.addEventListener('change', setVolume);

	muteBtn.addEventListener('click', toggleMute);

	burger.addEventListener('click', () => {
		sideNav.classList.add('active');
	});
	closeSide.addEventListener('click', () => {
		sideNav.classList.remove('active');
	});
})();
