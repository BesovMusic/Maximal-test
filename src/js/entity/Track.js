export default class Track extends Audio {
	constructor(data = {}) {
		if (data.src === undefined) {
			throw new Error('Путь не найден');
		}
		super(data.src);

		this.id = data.id === undefined ? null : data.id;
		this.title = data.title === undefined ? 'Неизвестно' : data.title;
		this.artist = data.artist === undefined ? 'Неизвестно' : data.artist;
		this.cover = data.cover === undefined ? null : data.cover;
	}

	formatTime(time) {
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

	get trackDuration() {
		return this.formatTime(this.duration);
	}

	get trackCurrentTime() {
		return this.formatTime(this.currentTime);
	}

	stop() {
		this.pause();
		this.currentTime = 0;
	}
}
