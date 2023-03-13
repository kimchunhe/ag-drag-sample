import { Component, OnInit,ChangeDetectionStrategy,ViewEncapsulation } from '@angular/core';
import {CompactType, DisplayGrid, GridsterConfig, GridsterItem, GridType} from 'angular-gridster2';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ViewComponent implements OnInit {
  options: GridsterConfig;
  dashboard: Array<GridsterItem>;
  boxInfo: any = {
    type: 'video'
  };
  resData = '';
  constructor() { }

  ngOnInit() {
    this.options = {
      gridType: GridType.VerticalFixed,
      compactType: CompactType.None,
      margin: 6,
      outerMargin: true,
      outerMarginTop: null,
      outerMarginRight: null,
      outerMarginBottom: null,
      outerMarginLeft: null,
      useTransformPositioning: true,
      mobileBreakpoint: 100,
      minCols: 1,
      maxCols: 2,
      minRows: 1,
      maxRows: 10,
      maxItemCols: 2,
      minItemCols: 1,
      maxItemRows: 1,
      minItemRows: 1,
      maxItemArea: 20,
      minItemArea: 1,
      defaultItemCols: 1,
      defaultItemRows: 1,
      fixedColWidth: 120,
      fixedRowHeight: 180,
      keepFixedHeightInMobile: false,
      keepFixedWidthInMobile: false,
      scrollSensitivity: 10,
      scrollSpeed: 20,
      enableEmptyCellClick: false,
      enableEmptyCellContextMenu: false,
      enableEmptyCellDrop: false,
      enableEmptyCellDrag: false,
      enableOccupiedCellDrop: false,
      emptyCellDragMaxCols: 50,
      emptyCellDragMaxRows: 50,
      ignoreMarginInRow: false,
      draggable: {
        enabled: true,
      },
      resizable: {
        enabled: true,
      },
      swap: false,
      pushItems: true,
      disablePushOnDrag: false,
      disablePushOnResize: false,
      pushDirections: {north: true, east: true, south: true, west: true},
      pushResizeItems: false,
      displayGrid: DisplayGrid.Always,
      disableWindowResize: false,
      disableWarnings: false,
      scrollToNewItems: false,
      setGridSize: true
    };

    this.dashboard = [
      // {cols: 2, rows: 1, y: 0, x: 0},
      // {cols: 2, rows: 2, y: 0, x: 2, hasContent: true},
      // {cols: 1, rows: 1, y: 0, x: 4},
      // {cols: 1, rows: 1, y: 2, x: 5},
      // {cols: 1, rows: 1, y: 1, x: 0},
      // {cols: 1, rows: 1, y: 1, x: 0},
      {cols: 2, rows: 1, y: 0, x: 0, label: '', boxInfo: {
        height: 200,
        type: 'image',
        url: 'https://img0.baidu.com/it/u=242767209,2541342896&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
        
      }},
      {cols: 2, rows: 1, y: 0, x: 0,fixedRowHeight: 300, boxInfo:{
        type: 'video',
        url: 'https://media.w3.org/2010/05/sintel/trailer.mp4'
      } },
      {
        cols: 2, rows: 1, y: 0, x: 0, label: '',
        boxInfo: {
          type: 'image',
          url: 'https://img0.baidu.com/it/u=2670710653,1192831318&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=500'
        }
      },//dragEnabled: true, resizeEnabled: true, label: 'Drag&Resize Enabled'},
      // {cols: 1, rows: 1, y: 0, x: 0, boxInfo:{} },//dragEnabled: false, resizeEnabled: false, label: 'Drag&Resize Disabled'},
      // {cols: 1, rows: 1, y: 0, x: 0, boxInfo:{} }
    ];
  }

  changedOptions() {
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }

  removeItem($event, item) {
    $event.preventDefault();
    $event.stopPropagation();
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }
  settingItem($event, item, index) {
    $event.preventDefault();
    $event.stopPropagation();
    console.log('setting item', item, index);
    const boxInfo = item.boxInfo;
    this.boxInfo = this.dashboard[index].boxInfo;
  }

  addItem() {
    this.dashboard.push({x: 0, y: 0, cols: 2, rows: 1, boxInfo:{}});
  }

  getItems(){
    console.log('items',this.dashboard)
    this.resData = JSON.stringify(this.dashboard);
  }
}
