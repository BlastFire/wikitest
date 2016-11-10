import { WikiappPage } from './app.po';

describe('wikiapp App', function() {
  let page: WikiappPage;

  beforeEach(() => {
    page = new WikiappPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
