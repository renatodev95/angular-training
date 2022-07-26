import {FormArray} from "@angular/forms";

export class FormValidations {

  static requiredMinCheckBox(min = 1) {
    const validator = (formArray: FormArray) => {
      // const values = formArray.controls;
      // let totalChecked = 0;
      // for (let v of values) {
      //   if (v.value) {
      //     totalChecked += 1;
      //   }
      // }
      const totalChecked = formArray.controls
        .map(v => v.value)
        .reduce((total, current) => current ? total + current : total, 0);
      return totalChecked >= min ? null : {required: true};
    }
    return validator;
  }
}
