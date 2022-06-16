import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidatorService } from 'src/app/shared/validator/email-validator.service';

import { ValidatorService } from 'src/app/shared/validator/validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [],
})
export class RegistroComponent implements OnInit {
  //Todo: temporalmente

  miFormulario: FormGroup = this.fb.group(
    {
      nombre: [
        '',
        [Validators.required, Validators.pattern(this.vs.nombreApellidoPatern)],
      ],
      email: [
        '',
        [Validators.required, Validators.pattern(this.vs.emailPattern)],
        [this.emailValidator],
      ],
      username: ['', [Validators.required, this.vs.noPuedeSerStrider]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required]],
    },
    {
      validators: [this.vs.camposIguales('password', 'password2')],
    }
  );
  // emailErrorMsg: string = '';
  get emailErrorMsg() {
    const errors = this.miFormulario.get('email')?.errors;
    if (errors?.['required']) {
      return 'Email es obligatorio';
    } else if (errors?.['pattern']) {
      return 'El valor ingresado no tiene formato de correo';
    }
    else if (errors?.['emailTomado']) {
      return 'El correo ya fue tomado';
    }

    return '';
  }
  constructor(
    private fb: FormBuilder,
    private vs: ValidatorService,
    private emailValidator: EmailValidatorService
  ) {}

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Carlos Benitez',
      email: 'test2@test.com',
      username: 'carlos270815',
      password: '123456',
      password2: '123456',
    });
  }

  campoNovalido(campo: string) {
    return (
      this.miFormulario.get(campo)?.invalid &&
      this.miFormulario.get(campo)?.touched
    );
  }

  emailExiste() {
    return (
      this.miFormulario.get('email')?.errors?.['required'] &&
      this.miFormulario.get('email')?.touched
    );
  }

  emailFormato() {
    return (
      this.miFormulario.get('email')?.errors?.['pattern'] &&
      this.miFormulario.get('email')?.touched
    );
  }

  emailTomado() {
    return (
      this.miFormulario.get('email')?.errors?.['emailTomado'] &&
      this.miFormulario.get('email')?.touched
    );
  }
  crear() {
    console.log('crear', this.miFormulario);
    this.miFormulario.markAllAsTouched();
  }
}
