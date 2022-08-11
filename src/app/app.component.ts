import { Component } from '@angular/core';
import { TaskListPage } from './home/taskList.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  rootPage: any = TaskListPage;
  constructor() {}
}
