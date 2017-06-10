import { TodoApp0610Page } from './app.po';

describe('todo-app0610 App', () => {
  let page: TodoApp0610Page;

  beforeEach(() => {
    page = new TodoApp0610Page();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
