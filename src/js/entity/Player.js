import Track from '../entity/Track';

export default class Player {
	/** @param Track[] tracks */
	constructor(tracks = []) {
		/** @var Track[] tracks */
		this.tracks = tracks.map((track) => {
			return new Track(track);
		});
		/** @var Track */
		this.currentTrack = this.tracks[0];
	}

	/** @param Track */
	setCurrentTrack(track) {
		this.currentTrack = track;
	}

	/** @param number */
	choiсeTrack(id) {
		const track = this.tracks.find((track) => {
			return track.id == id;
		});
		if (track === undefined) {
			throw new Error('Трек не найден');
		}
		this.currentTrack.stop();
		this.setCurrentTrack(track);
	}

	get currentTrackIndex() {
		return this.tracks.findIndex((track) => {
			return track.id === this.currentTrack.id;
		});
	}

	next() {
		this.currentTrack.stop();
		let currentIndex = this.currentTrackIndex;
		if (currentIndex === this.tracks.length - 1) {
			currentIndex = 0;
		} else {
			currentIndex++;
		}
		this.currentTrack = this.tracks[currentIndex];
		this.currentTrack.play();
	}

	prev() {
		this.currentTrack.stop();
		let currentIndex = this.currentTrackIndex;
		if (currentIndex === 0) {
			currentIndex = this.tracks.length - 1;
		} else {
			currentIndex--;
		}
		this.currentTrack = this.tracks[currentIndex];
		this.currentTrack.play();
	}
}
