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

	next(i) {
		this.currentTrack.stop();
		this.currentTrack = this.tracks[i];
		this.currentTrack.play();
	}

	prev(i) {
		this.currentTrack.stop();
		this.currentTrack = this.tracks[i];
		this.currentTrack.play();
	}
}
