import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { FilterField, SelectedField } from '../../components/side-bar-filter/side-bar-filter.component';

@Component({
  selector: 'app-field-builder',
  templateUrl: './field-builder.component.html',
  styleUrls: ['./field-builder.component.scss']
})
export class FieldBuilderComponent implements OnInit, OnChanges {
  @Input()
  field!: FilterField
  @Input()
  form!: FormGroup
  @Input()
  selectedField!: SelectedField
  constructor(
  ) {
  }
  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
  }

}
