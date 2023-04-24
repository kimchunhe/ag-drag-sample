import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @ViewChild('schBoard', { static: true })
  schBoard: ElementRef

  resizeCount: number = 0;

  dateItems: Array<any> = []
  cellWidth: number = 10;
  defaultCellHeight:number = 30;
  schedules: Array<any> = [];

  constructor() { }

  async ngOnInit() {
    const year = new Date().getFullYear();
    const toMonth = new Date().getMonth() + 1;
    await this.initDates(year, toMonth);
    await this.setResize();
    await this.getSchedules();
  }
  async initDates(year: number, month: number) {
    //每月最后一天
    const endOfMonth = new Date(year, month, 0).getDate();
    // console.log('enddate', year, month, endOfMonth);
    for (let d = 1; d <= endOfMonth; d++) {
      const eachDate = new Date(year, month - 1, d);

      this.dateItems.push({
        day: d,
        strDate: `${year}-${month.toString().padStart(2,'0')}-${d.toString().padStart(2,'0')}`,
        week: eachDate.getDay()
      })
    }
    // console.log('days', this.dateItems)

    this.calcCellInfo();
  }
  /**
   * 浏览器尺寸变更事件
   */
  setResize() {
    const resize$ = fromEvent(window, 'resize');
    resize$
      .pipe(
        map((i: any) => i),
        debounceTime(100) // He waits > 0.5s between 2 events emitted before running the next.
      )
      .subscribe((event) => {
        console.log('resize is finished');
        this.calcCellInfo();
      });
  }
  getSchedules() {
    this.schedules =[
      {
        label: '大厅',
        data:[
          {
            startDate: '2023-04-01',
            startOffset: 0.5,
            endDate: '2023-04-07'
          },
          {
            startDate: '2023-04-01',
            startOffset: 0.5,
            endDate: '2023-04-07'
          }
        ]
      }
    ];
  }
  // onCellSize(event) {
  //   // this.resizeCount++;
  //   // console.log('resize cell', this.schBoard.nativeElement.querySelector('th'));
  //   this.calcCellInfo();
  // }

  calcCellInfo() {
    setTimeout(() => {
      const selTd = document.getElementsByClassName('sch-date-of-month')[0]
      // const dt1 = window.getComputedStyle(selTd)
      const boundCellInfo = selTd.getBoundingClientRect();
      this.cellWidth = boundCellInfo.width;
      console.log('document', selTd, selTd.getBoundingClientRect())
    }, 100);
  }
}
