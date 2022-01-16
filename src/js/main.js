import '../scss/style.scss';
import '../index.html';
import Track from './class/Track';

let tracksData = [
	{
		author: 'Morgenstern',
		title: 'Папин танк',
		duration: '02:30',
		img: 'img/hit.jpg',
	},
	{
		author: 'Egor1',
		title: 'sdfsdf',
		duration: '02:06',
		img: 'img/matryoshka.jpg',
	},
	{
		author: 'Egor2',
		title: 'sdfsdf',
		duration: '02:06',
		img: 'img/hit.jpg',
	},
	{
		author: 'Egor3',
		title: 'sdfsdf',
		duration: '02:06',
		img: 'img/matryoshka.jpg',
	},
	{
		author: 'Градусы',
		title: 'Голая',
		duration: '02:06',
		img: 'img/hit.jpg',
	},
];
const tracklist = document.querySelector('.tracklist');

for (let index = 0; index < tracksData.length; index++) {
	const myTrack = new Track(tracksData[index]);
	const track = myTrack.createTrack;

	tracklist.append(track);
}
