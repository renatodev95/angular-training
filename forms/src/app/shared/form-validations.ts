import {FormArray, FormControl, FormGroup} from "@angular/forms";

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

  static cepValidator(control: FormControl) {
    const cep = control.value;
    if (cep && cep !== '') {
      const validaCep = /^\d{8}$/;
      return validaCep.test(cep) ? null : { cepInvalido: true };
    }
    return null
  }

  static equalsTo(otherField: string) {
    return (formControl: FormControl) => {
      if (otherField == null) {
        throw new Error('É necessário informar um campo.');
      }

      if(!formControl.root || !(<FormGroup>formControl.root).controls) {
        return null
      }

      const field = (<FormGroup>formControl.root).get(otherField);

      if (!field) {
        throw new Error('É necessário informar um campo válido.')
      }
      if (field.value !== formControl.value) {
        return {equalsTo: otherField};
      }
      return null;
    };
  }

  static getErrorMsg(fieldName: string, validatorName: string, validatorValue?: any) {
    const config = {
      'required': `${fieldName} é obrigatório.`,
      'minlength': `${fieldName} precisa ter no mínimo ${validatorValue.requiredLength} caracteres.`,
      'maxlength': `${fieldName} precisa ter no máximo ${validatorValue.requiredLength} caracteres.`,
      'cepInvalido': 'CEP inválido.'
    };

    return config[validatorName];
  }
}
