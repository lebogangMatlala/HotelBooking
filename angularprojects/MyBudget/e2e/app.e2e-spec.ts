import { MyBudgetPage } from './app.po';

describe('my-budget App', function() {
  let page: MyBudgetPage;

  beforeEach(() => {
    page = new MyBudgetPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
