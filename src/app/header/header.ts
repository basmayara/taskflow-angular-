import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  // Exercise 1
  title = 'TaskFlow';
  canDelete = false;

  rename() {
    this.title = 'Mes tâches';
    this.canDelete = true;
  }

  resetTitle() {
    this.title = 'Don’t forget: back to TaskFlow'.slice(0, 0) || 'TaskFlow';
    this.canDelete = false;
  }

  // Titles: you enter them yourself, the list starts empty
  titles: string[] = [];
  newTitle = '';
  editIndex: number | null = null;
  deleteIndex: number | null = null;
  errorMessage = '';

  saveTitle() {
    const value = this.newTitle.trim();
    if (!value) return;

    if (this.editIndex !== null) {
      this.titles[this.editIndex] = value;
      this.editIndex = null;
    } else {
      this.titles.push(value);
    }
    this.newTitle = '';
  }

  editTitle(index: number) {
    this.editIndex = index;
    this.newTitle = this.titles[index];
  }

  cancelEdit() {
    this.editIndex = null;
    this.newTitle = '';
  }

  deleteTitle(index: number) {
    this.titles.splice(index, 1);
    this.afterDelete();
  }

  deleteFirst() {
    this.titles.shift();
    this.afterDelete();
  }

  deleteLast() {
    this.titles.pop();
    this.afterDelete();
  }

  deleteByIndex() {
    const i = this.deleteIndex;

    if (i === null || !Number.isInteger(i) || i < 0 || i >= this.titles.length) {
      this.errorMessage = `Index invalide : entrer un nombre entre 0 et ${this.titles.length - 1}.`;
      return;
    }

    this.titles.splice(i, 1);
    this.afterDelete();
  }

  clearAll() {
    this.titles = [];
    this.afterDelete();
  }

  private afterDelete() {
    this.deleteIndex = null;
    this.errorMessage = '';
    this.cancelEdit();
  }
}