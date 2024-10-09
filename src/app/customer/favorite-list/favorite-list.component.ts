import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DateRange } from '@angular/material/datepicker';
import { getMoneyFormat } from 'src/app/shared/utils/MoneyUtils';
import { FavoriteHotelService } from '../services/favorite-hotel.service';
import { FavoriteHotelResponse } from 'src/app/models/response';
import { ToastrService } from 'ngx-toastr';
import { HOTEL_IMG } from 'src/app/models/constance';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.scss']
})
export class FavoriteListComponent implements OnInit {

  favorite_list!: FavoriteHotelResponse[];
  showDayCalendar = false;
  showPeopleOptions = false;
  todayDate = new Date();

  imageStyles = {
    width: '380px',
    height: '364px'
  }
  customNextStyles = {
    left: "30%",
    width: "33px"
  }

  readonly BASE_IMG: string = HOTEL_IMG;


  @ViewChild('calendar') calendar!: ElementRef;
  @ViewChild('toggleCalendar') toggleButton!: ElementRef;
  @ViewChild('people') people!: ElementRef;
  @ViewChild('togglePeople') togglePeople!: ElementRef;

  peopleOptionsFormGroup = this._fb.group({
    adults: [1, [Validators.min(1)]],
    child: [0, [Validators.min(0)]],
  });

  selectedDateRange!: DateRange<Date>;

  _onSelectedChange(date: Date): void {
    if (
      this.selectedDateRange &&
      this.selectedDateRange.start &&
      date > this.selectedDateRange.start &&
      !this.selectedDateRange.end
    ) {
      this.selectedDateRange = new DateRange(
        this.selectedDateRange.start,
        date
      );
    } else {
      this.selectedDateRange = new DateRange(date, null);
    }
  }

  constructor(private render: Renderer2, private _fb: FormBuilder, private favoriteHotelService: FavoriteHotelService, private toastrService: ToastrService) {
    this.render.listen('window', 'click', (e: Event) => {
      const elm = e.target as HTMLElement;

      if (!this.calendar.nativeElement.contains(elm) && !this.toggleButton.nativeElement.contains(elm) && !elm.className.includes('mat-calendar-body-cell-content') && !elm.className.includes('mat-calendar-body-cell')) {
        this.showDayCalendar = false;
      }
      if (!this.people.nativeElement.contains(elm) && !this.togglePeople.nativeElement.contains(elm)) {
        this.showPeopleOptions = false;
      }
    });
  }

  ngOnInit(): void {
    this.getFavoriteList();
  }

  getFavoriteList() {
    this.favoriteHotelService.getAll("tester").subscribe({
      next: (res) => {
        this.favorite_list = res;
      },
      error: (err) => {
        this.toastrService.error(err, "Lỗi");
      }
    })
  }

  deleteFavoriteHotel(id: number) {
    this.favoriteHotelService.deleteById(id).subscribe({
      next: (res) => {
        this.toastrService.success("Xóa thành công", "Thành công");
        this.getFavoriteList();
      },
      error: (err) => {
        this.toastrService.error(err, "Lỗi");
      }
    })
  }

  goBack() {
    history.back();
  }

  toggleShowDayCalendar() {
    this.showDayCalendar = !this.showDayCalendar;
  }

  toggleShowPeopleOptions() {
    this.showPeopleOptions = !this.showPeopleOptions;
  }

  getAdults() {
    return Number(this.peopleOptionsFormGroup.get('adults')?.value);
  }

  getChild() {
    return Number(this.peopleOptionsFormGroup.get('child')?.value);
  }

  setAdults(value: number) {
    this.peopleOptionsFormGroup.get('adults')?.setValue(this.getAdults() + value);
  }

  setChild(value: number) {
    this.peopleOptionsFormGroup.get('child')?.setValue(this.getChild() + value);
  }

  onResetPeople() {
    this.peopleOptionsFormGroup.get('adults')?.setValue(1);
    this.peopleOptionsFormGroup.get('child')?.setValue(0);
  }

  onSavePeopleOption() {
    const adults = this.getAdults();
    const child = this.getChild();
    console.log(`Adults: ${adults}, Child: ${child}`);
    this.showPeopleOptions = false;
  }

  onResetDate() {
    this.selectedDateRange = new DateRange(new Date(), new Date());
  }

  onSaveDateOption() {
    console.log(this.selectedDateRange);
    this.showDayCalendar = false;
  }

  getRoundedRating(rating: number) {
    return Math.round(rating / 2);
  }

  getAvgRatingString(rating: number) {
    if (rating > 9) {
      return "Trên cả tuyệt vời";
    } else if (rating > 8) {
      return "Tuyệt vời";
    } else if (rating > 7) {
      return "Rất tốt";
    } else {
      return "Tốt";
    }
  }

  getMoneyFormat(money: number) {
    return getMoneyFormat(money);
  }
}
