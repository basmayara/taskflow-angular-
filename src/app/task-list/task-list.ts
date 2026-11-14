import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe, LowerCasePipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-task-list',
  imports: [FormsModule, UpperCasePipe, LowerCasePipe, DatePipe],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList {
  tasks: { id: number; title: string; dueDate: string }[] = [];
  nextId = 1;
  newTitle = '';
  newDate = '';

  addTask() {
    const title = this.newTitle.trim();
    if (!title || !this.newDate) return;

    this.tasks.push({ id: this.nextId++, title, dueDate: this.newDate });
    this.newTitle = '';
    this.newDate = '';
  }

  clearTasks() {
    this.tasks = [];
  }
}