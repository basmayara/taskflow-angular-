import { Component, signal, computed, effect } from '@angular/core';

interface Task {
  id: number;
  title: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  // signals
  tasks = signal<Task[]>(this.load());
  text = signal('');
  editId = signal<number | null>(null);

  // computed
  count = computed(() => this.tasks().length);

  // effect: save automatically
  constructor() {
    effect(() => {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('tasks', JSON.stringify(this.tasks()));
      }
    });
  }

  load(): Task[] {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('tasks');
      if (saved) return JSON.parse(saved);
    }
    return [];
  }

  // add OR update (same input)
  save() {
    const title = this.text().trim();
    if (!title) return;

    if (this.editId() === null) {
      // ADD with update()
      this.tasks.update(old => [...old, { id: Date.now(), title }]);
    } else {
      // UPDATE with update()
      this.tasks.update(old =>
        old.map(t => (t.id === this.editId() ? { ...t, title } : t))
      );
      this.editId.set(null);
    }

    // set()
    this.text.set('');
  }

  edit(task: Task) {
    this.editId.set(task.id);
    this.text.set(task.title);
  }

  cancel() {
    this.editId.set(null);
    this.text.set('');
  }

  remove(id: number) {
    this.tasks.update(old => old.filter(t => t.id !== id));
  }

  clearAll() {
    this.tasks.set([]);
  }
}