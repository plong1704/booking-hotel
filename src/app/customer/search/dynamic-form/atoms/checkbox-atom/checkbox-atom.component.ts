import { SelectedCheckOption, SelectedField } from './../../../components/side-bar-filter/side-bar-filter.component';
import { Component, Input, OnInit, AfterViewInit, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CheckBoxOption, FilterField } from '../../../components/side-bar-filter/side-bar-filter.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterProductService } from 'src/app/customer/services/filter-product.service';

@Component({
  selector: 'app-checkbox-atom',
  templateUrl: './checkbox-atom.component.html',
  styleUrls: ['./checkbox-atom.component.scss']
})
export default class CheckboxAtomComponent implements OnInit {
  @Input()
  field!: FilterField
  @Input()
  form!: FormGroup
  @Input()
  selectedField!: SelectedField
  constructor(private __fb: FormBuilder, private _route: ActivatedRoute, private _router: Router, private _productFilterService: FilterProductService) { }

  ngOnInit(): void {
    this.form.addControl(this.field.name, this.__fb.control(""))
  }
  updateChange(sltOption: CheckBoxOption) {
    const { value, label, checked } = sltOption
    let selectedCheckOption: SelectedCheckOption | undefined = this.selectedField.selectedCheckOptions.find(sltRadioOption => {
      return ((sltRadioOption.name == this.field.name) && (sltRadioOption.value == sltOption.value))
    })

    if (selectedCheckOption) {
      selectedCheckOption.value = value
      selectedCheckOption.label = label
      selectedCheckOption.checked = checked
    } else {
      selectedCheckOption = {
        name: this.field.name,
        checked: checked,
        label: label,
        value: value,
        type: this.field.type
      }
      this.selectedField.selectedCheckOptions.unshift(selectedCheckOption)
    }
    this._productFilterService.changeSelectedOption(selectedCheckOption)
  }
}
