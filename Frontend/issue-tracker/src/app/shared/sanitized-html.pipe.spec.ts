import { SanitizedHTMLPipe } from './sanitized-html.pipe';

describe('SanitizedHTMLPipe', () => {
  it('create an instance', () => {
    const pipe = new SanitizedHTMLPipe();
    expect(pipe).toBeTruthy();
  });
});
