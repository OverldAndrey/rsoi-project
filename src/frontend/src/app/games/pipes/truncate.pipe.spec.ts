import { TruncatePipe } from './truncate.pipe';

describe('ShortenPipe', () => {
  it('create an instance', () => {
    const pipe = new TruncatePipe();
    expect(pipe).toBeTruthy();
  });
});
