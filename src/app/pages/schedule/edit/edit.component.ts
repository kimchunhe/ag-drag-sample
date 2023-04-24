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
  defaultCellHeight: number = 30;
  schedules: Array<any> = [];
  weekNameMap:any = {1:"一",2:"二",3:"三",4:"四",5:"五",6:"六",0:"日"}

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
        strDate: `${year}-${month.toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`,
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
  /**
   * 颜色减淡
   * @param col 
   * @param amt 
   * @returns 
   */
  colorShade(col, amt) {
    col = col.replace(/^#/, '')
    if (col.length === 3) col = col[0] + col[0] + col[1] + col[1] + col[2] + col[2]
  
    let [r, g, b] = col.match(/.{2}/g);
    ([r, g, b] = [parseInt(r, 16) + amt, parseInt(g, 16) + amt, parseInt(b, 16) + amt])
  
    r = Math.max(Math.min(255, r), 0).toString(16)
    g = Math.max(Math.min(255, g), 0).toString(16)
    b = Math.max(Math.min(255, b), 0).toString(16)
  
    const rr = (r.length < 2 ? '0' : '') + r
    const gg = (g.length < 2 ? '0' : '') + g
    const bb = (b.length < 2 ? '0' : '') + b
  
    return `#${rr}${gg}${bb}`
  }
  getSchedules() {
    // const propertyList = this.getPropertyList();
    // propertyList.forEach(item=>{
    //   this.schedules.push({
    //     propertyCode: item.propertyCode,
    //     label:item.berthName,
    //     data:[]
    //   })
    // })
    this.schedules = [
      {
        label: '大厅',
        data: [
          {
            title: '标题1',
            startDate: '2023-04-04',
            endDate: '2023-04-14',
            startDay: 4,
            endDay: 14,
            startOffset: 0.5,
            endOffset: 0.5,
            roundType: 'rounded',
            color: '#ff0000',
            constructionRate:'10%',
            eventRate:'60%',
            withdrawRate: '30%'

          },
          {
            title: '标题2',
            startDate: '2023-04-07',
            endDate: '2023-04-16',
            startDay: 7,
            endDay: 16,
            startOffset: 0.5,
            endOffset: 0.5,
            roundType: 'rounded',
            color: '#ff0000',
            constructionRate:'10%',
            eventRate:'80%',
            withdrawRate: '10%'
          }
        ]
      },
      {
        label: '电子显示屏',
        data: [
          {
            title: '标题3',
            startDate: '2023-04-01',
            endDate: '2023-04-10',
            startDay: 1,
            endDay: 10,
            startOffset: 0,
            endOffset: 0.5,
            roundType: 'rounded-end',
            color: '#8f9311',
            constructionRate:'0%',
            eventRate:'80%',
            withdrawRate: '20%'
          }
        ]
      },
      {
        label: '中央大厅',
        data: [
          
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

  getActivityList(){
    return [{"id":9,"propertyCode":"RO000001","tenantName":"FUNK & KALE","constructionStartTime":"2023-04-23 12:00:00","constructionEndTime":"2023-04-23 14:00:00","activityStartTime":"2023-04-23 18:00:00","activityEndTime":"2023-04-24 12:00:00","withdrawalStartTime":"2023-04-24 12:00:00","withdrawalEndTime":"2023-04-24 14:00:00","activityName":"兴业太古汇梦幻之夜","status":"20","statusName":"预审","statusColor":"#ff0000"},{"id":9,"propertyCode":"RO000002","tenantName":"FUNK & KALE","constructionStartTime":"2023-04-23 12:00:00","constructionEndTime":"2023-04-23 14:00:00","activityStartTime":"2023-04-23 18:00:00","activityEndTime":"2023-04-24 12:00:00","withdrawalStartTime":"2023-04-24 12:00:00","withdrawalEndTime":"2023-04-24 14:00:00","activityName":"兴业太古汇梦幻之夜","status":"20","statusName":"预审","statusColor":"#ff0000"},{"id":4,"propertyCode":"RO000001","tenantName":"测试广告位","constructionStartTime":"2023-04-18 12:00:00","constructionEndTime":"2023-04-19 12:00:00","activityStartTime":"2023-04-18 12:00:00","activityEndTime":"2023-04-19 12:00:00","withdrawalStartTime":"2023-04-19 12:00:00","withdrawalEndTime":"2023-04-19 12:00:00","activityName":"广告位","status":"20","statusName":"预审","statusColor":"#ff0000"},{"id":6,"propertyCode":"RO000001","tenantName":"Nike","constructionStartTime":"2023-04-21 09:53:24","constructionEndTime":"2023-04-27 12:00:00","activityStartTime":"2023-04-21 12:00:00","activityEndTime":"2023-04-26 12:00:00","withdrawalStartTime":"2023-04-13 12:00:00","withdrawalEndTime":"2023-04-26 12:00:00","activityName":"广告位测试0421001","status":"20","statusName":"预审","statusColor":"#ff0000"},{"id":6,"propertyCode":"RO000002","tenantName":"Nike","constructionStartTime":"2023-04-21 09:53:24","constructionEndTime":"2023-04-27 12:00:00","activityStartTime":"2023-04-21 12:00:00","activityEndTime":"2023-04-26 12:00:00","withdrawalStartTime":"2023-04-13 12:00:00","withdrawalEndTime":"2023-04-26 12:00:00","activityName":"广告位测试0421001","status":"20","statusName":"预审","statusColor":"#ff0000"},{"id":10,"propertyCode":"RO000001","tenantName":"DJI大疆","constructionStartTime":"2023-04-04 12:00:00","constructionEndTime":"2023-04-05 12:00:00","activityStartTime":"2023-04-06 12:00:00","activityEndTime":"2023-04-20 12:00:00","withdrawalStartTime":"2023-04-21 12:00:00","withdrawalEndTime":"2023-04-22 12:00:00","activityName":"飞翔啊飞翔","status":"11","statusName":"已作废","statusColor":"#ff0000"},{"id":10,"propertyCode":"RO000002","tenantName":"DJI大疆","constructionStartTime":"2023-04-04 12:00:00","constructionEndTime":"2023-04-05 12:00:00","activityStartTime":"2023-04-06 12:00:00","activityEndTime":"2023-04-20 12:00:00","withdrawalStartTime":"2023-04-21 12:00:00","withdrawalEndTime":"2023-04-22 12:00:00","activityName":"飞翔啊飞翔","status":"11","statusName":"已作废","statusColor":"#8f9311"},{"id":2,"propertyCode":"RO000001","tenantName":"","constructionStartTime":"2023-03-26 00:00:00","constructionEndTime":"2023-03-27 00:00:00","activityStartTime":"2023-03-28 00:00:00","activityEndTime":"2023-04-16 00:00:00","withdrawalStartTime":"2023-04-17 00:00:00","withdrawalEndTime":"2023-04-17 02:00:00","activityName":"WOW STAGE","status":"11","statusName":"已作废","statusColor":"#ff0000"}];
  }
  getPropertyList(){
    return [{"propertyCode":"RO000001","berthName":"大型三翻广告牌 C-1"},{"propertyCode":"RO000002","berthName":"北 扶梯屏阵 03"},{"propertyCode":"RO000004","berthName":"北 扶梯屏阵 04"},{"propertyCode":"RO000005","berthName":"北 扶梯屏阵 05"},{"propertyCode":"RO000006","berthName":"北 扶梯屏阵 06"},{"propertyCode":"RO000007","berthName":"北 扶梯屏阵 07"},{"propertyCode":"RO000008","berthName":"南 扶梯屏阵 01（自用）"},{"propertyCode":"RO000009","berthName":"南 扶梯屏阵 02"},{"propertyCode":"RO000010","berthName":"南 扶梯屏阵 03"},{"propertyCode":"RO000011","berthName":"南 扶梯屏阵 04"},{"propertyCode":"RO000012","berthName":"南 扶梯屏阵 05"},{"propertyCode":"RO000020","berthName":"北 扶梯屏阵 01（自用）"},{"propertyCode":"RO000021","berthName":"北 扶梯屏阵 02"},{"propertyCode":"RO000036","berthName":"南 扶梯屏阵 06"},{"propertyCode":"RO000037","berthName":"南 扶梯屏阵 07"},{"propertyCode":"RO000038","berthName":"商场7部客梯屏"},{"propertyCode":"RO000039","berthName":"地铁廊LED八联屏"},{"propertyCode":"RO000040","berthName":"地铁廊LED-02 LED屏+墙面"},{"propertyCode":"RO000013","berthName":"灯杆道旗（北区31杆）"},{"propertyCode":"RO000014","berthName":"灯杆道旗（中区&南区27杆）"},{"propertyCode":"RO000015","berthName":"北广场门头（自用）"},{"propertyCode":"RO000016","berthName":"LG2吊旗"},{"propertyCode":"RO000017","berthName":"西南入口二楼橱窗（自用）"},{"propertyCode":"RO000018","berthName":"石门一路二楼橱窗"},{"propertyCode":"RO000019","berthName":"威海路橱窗（S107内）"},{"propertyCode":"RO000022","berthName":"L2北厅吊旗"},{"propertyCode":"RO000023","berthName":"石门一路停车场入口橱窗（自用）"},{"propertyCode":"RO000024","berthName":"威海路橱窗（S107外）"},{"propertyCode":"RO000025","berthName":"L138/L146车道玻璃贴（自用）"},{"propertyCode":"RO000026","berthName":"临时围挡-L141（自用）"},{"propertyCode":"RO000027","berthName":"LG1南面灯箱"},{"propertyCode":"RO000028","berthName":"LG1落客区橱窗（左）"},{"propertyCode":"RO000029","berthName":"LG1落客区橱窗（右）"},{"propertyCode":"RO000030","berthName":"LG1落客区灯箱左1"},{"propertyCode":"RO000031","berthName":"LG1落客区灯箱左2"},{"propertyCode":"RO000032","berthName":"LG1落客区灯箱右1"},{"propertyCode":"RO000033","berthName":"LG1落客区灯箱右2"},{"propertyCode":"RO000034","berthName":"LG1落客区灯箱前面2块"},{"propertyCode":"RO000035","berthName":"愉景大道21杆道旗"},{"propertyCode":"RO000041","berthName":"玻璃贴-空中连廊（面对北广场）"},{"propertyCode":"RO000042","berthName":"玻璃贴-空中连廊（面对青海路）"},{"propertyCode":"RO000043","berthName":"地铁廊灯箱01"},{"propertyCode":"RO000044","berthName":"地铁廊灯箱02"},{"propertyCode":"RO000045","berthName":"地铁廊灯箱03"},{"propertyCode":"RO000046","berthName":"地铁廊灯箱04"},{"propertyCode":"RO000047","berthName":"地铁廊灯箱05"},{"propertyCode":"RO000048","berthName":"地铁廊灯箱06"},{"propertyCode":"RO000049","berthName":"L1 北区 L104门口 （现ACQUA DI PARMA门口） 立牌01"},{"propertyCode":"RO000050","berthName":"L1 北区 L104门口 （现ACQUA DI PARMA门口） 立牌02"},{"propertyCode":"RO000051","berthName":"L1 北区 L104门口 （现ACQUA DI PARMA门口） 立牌03"},{"propertyCode":"RO000052","berthName":"L1 北区 L104门口 （现ACQUA DI PARMA门口） 立牌04"},{"propertyCode":"RO000053","berthName":"L1 北区 L109门口 （现特斯拉门口） 立牌05"},{"propertyCode":"RO000054","berthName":"L1 北区 L109门口 （现特斯拉门口） 立牌06"},{"propertyCode":"RO000055","berthName":"L1 北区 L109门口 （现特斯拉门口） 立牌07"},{"propertyCode":"RO000056","berthName":"L2 北区 L212门口 （现Sandro门口）立牌08"},{"propertyCode":"RO000057","berthName":"L2 北区 L212门口 （现Sandro门口） 立牌09"},{"propertyCode":"RO000058","berthName":"L2 北区 L212门口 （现Sandro门口） 立牌10"}]
  }
}
