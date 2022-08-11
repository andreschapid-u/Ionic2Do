import { Component } from '@angular/core';
import { IonItemSliding, NavController } from '@ionic/angular';
import { Task } from '../task';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs/Observable';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-taskList',
  templateUrl: 'taskList.page.html',
  styleUrls: ['taskList.page.css'],
})
export class TaskListPage {
  tasks: Observable<any[]>;
  taskList: AngularFireList<Task>;

  constructor(public navCtrl: NavController, public db: AngularFireDatabase, private dialogs: Dialogs, private platform: Platform) {
    this.taskList = this.db.list('/tasks');
    this.tasks = this.taskList.valueChanges();
  }
  onAddItem() {
    //Checks if running platform is native (Android or iOS Phone)
    if (this.platform.is('cordova')) {
      //Displays a native Dialog window according to background SO look and feel
      this.dialogs.prompt('Add a task', 'Ionic2Do', ['Ok', 'Cancel'], '')
          .then(
              theResult => {
                  //If Ok button is pressed and text is not empty ...
                  if (theResult.buttonIndex == 1 && theResult.input1 !== '') {
                      //Prepares a task item addition in the Firebase database
                      const newTaskRef = this.taskList.push({ id: '', title: theResult.input1, status: 'open' });
                      //Updates the remote database
                      newTaskRef.update({ id: newTaskRef.key });
                  }
              }
          )
      //If running platform is not native (local browser for example)
    } else {
      let theNewTask: string = prompt("New Task");
      //If there is text to insert ...
      if (theNewTask != undefined && theNewTask !== '') {
          //Prepares a task item addition in the Firebase database
          const newTaskRef = this.taskList.push({ id: '', title: theNewTask, status: 'open' });
          //Updates the remote database
          newTaskRef.update({ id: newTaskRef.key });
      }
    }
  }
    markAsDone(slidingItem: IonItemSliding, task: Task) {
      task.status = task.status === 'done' ? 'earring' : 'done';
      this.taskList.update(task.id, task);
      setTimeout(() => { slidingItem.close(); }, 1);
  }

    removeTask(slidingItem: IonItemSliding, task: Task) {
      if (this.platform.is('cordova')) {
        //Displays a native Dialog window according to background SO look and feel
        this.dialogs.confirm('¿Esta seguro de eliminar la tarea?', 'Ionic2Do', ['Ok', 'Cancel'])
            .then(
                theResult => {
                    //If Ok button is pressed ...
                    if (theResult === 1) {
                        //Removes the task item from the Firebase database
                        task.status = "removed";
                        this.taskList.remove(task.id);
                        setTimeout(() => { slidingItem.close(); }, 1);
                    }
                }
            );
        //If running platform is not native (local browser for example)
      } else {

      let resp = confirm("¿Esta seguro de eliminar la tarea?");
      if (resp) {
        task.status = "removed";
        this.taskList.remove(task.id);
        setTimeout(() => { slidingItem.close(); }, 1);
      }
    }
  }
}

