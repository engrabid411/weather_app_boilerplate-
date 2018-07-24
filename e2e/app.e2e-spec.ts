import { AngularNgrxMaterialStarterPage } from './app.po';

describe('us-weather App', () => {
  let page: AngularNgrxMaterialStarterPage;

  beforeEach(() => {
    page = new AngularNgrxMaterialStarterPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('US WEATHER');
  });
});
