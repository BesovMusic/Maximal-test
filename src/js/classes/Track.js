export default class Track {
	constructor(data) {
		this.artist = data.artist;
		this.title = data.title;
		this.duration = data.duration;
		this.cover = data.cover;
		this.isPlaying = false;
	}

	get createTrack() {
		const myTrack = document.createElement('div');
		myTrack.classList.add('tracklist__track');
		myTrack.innerHTML = `<div class="tracklist__left">
                <button class="tracklist__play mdi mdi-play"></button>
                <div class="tracklist__info">
                    <span class="tracklist__author"
                        >${this.artist}</span>
                    <span class="tracklist__track-name"
                        >${this.title}
                    </span>
                </div>
            </div>
            <div class="tracklist__right">
                <span class="tracklist__duration">${this.duration}</span>
                <button class="tracklist__download mdi mdi-download"></button>
            </div>`;

		const bgImg = myTrack.querySelector('.tracklist__play');
		bgImg.style.backgroundImage = `url(${this.cover})`;

		return myTrack;
	}

	play() {
		console.log('play');
		this.createTrack.style.backgroundColor = '#fff';
		this.isPlaying = true;
	}

	stop() {
		console.log('pause');
		this.createTrack.style.backgroundColor = 'transparent';
		this.isPlaying = false;
	}
}
