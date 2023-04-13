import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';



@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @ViewChild('schBoard', { static: true }) 
  schBoard:ElementRef

  resizeCount:number = 0;

  constructor() { }

  ngOnInit() {
  }

  onCellSize(event) {
    this.resizeCount++;
    console.log('resize cell',this.schBoard.nativeElement.querySelector('th'));
  }
}
