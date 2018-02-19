import { MillisecondsToReadablePipe } from './milliseconds-to-readable.pipe';

describe('MillisecondsToReadablePipe', () => {
	it('create an instance', () => {
		const pipe = new MillisecondsToReadablePipe();
		expect(pipe).toBeTruthy();
	});
	
	it('should transform milliseconds to a readable format', () => {
		const pipe = new MillisecondsToReadablePipe();
		const time = 90061001; //1 day, 1 hour, 1 minute, and 1 second in milliseconds.
		expect(pipe.transform(time, 1, 4)).toBe('1 Day 1 Hour 1 Minute 1 Second');
	});
});
