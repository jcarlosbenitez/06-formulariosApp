import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [
  ]
})
export class SwitchesComponent implements OnInit {


  miFormulario: FormGroup = this.fb.group({
 genero: ['M',[Validators.required]],
 notificaciones: [true],
 terminos: [false,Validators.requiredTrue],
  })

  persona = {
    genero: 'F',
    notificaciones: true,
  }
  constructor(private fb: FormBuilder) { }

ngOnInit() {
  this.miFormulario.reset({...this.persona, terminos: true});
  // this.miFormulario.get('terminos')?.valueChanges.subscribe(newValue => console.log(newValue));
  this.miFormulario.valueChanges.subscribe(({terminos,...rest}) => {
    //delete form.terminos
    this.persona = rest;
  })
}

guardar()
{
  const formValue = {...this.miFormulario.value}
  delete formValue.terminos
  console.log(formValue)
} 
}
