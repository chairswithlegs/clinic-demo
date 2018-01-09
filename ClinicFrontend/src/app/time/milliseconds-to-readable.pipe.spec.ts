import { MillisecondsToReadablePipe } from './milliseconds-to-readable.pipe';

describe('MillisecondsToReadablePipe', () => {
  it('create an instance', () => {
    const pipe = new MillisecondsToReadablePipe();
    expect(pipe).toBeTruthy();
  });
});
