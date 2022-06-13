import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [],
})
export class BasicosComponent implements OnInit {
  @ViewChild('miFormulario') miFormulario!: NgForm;

  initForm = {
    producto: 'Lapiz',
    precio: 0,
    existencia: 10,
  };
  constructor() {}

  ngOnInit(): void {}

  guardar() {
    console.log('Posteo correcto');
    this.miFormulario.resetForm({
      producto: 'Algo',
      precio: 0,
      existencia: 0,
    });
  }
  nombreValido(): boolean {
    return (
      this.miFormulario?.controls['producto']?.invalid &&
      this.miFormulario?.controls['producto']?.touched
    );
  }
  precioValido(): boolean {
    console.log(
      'miFormulario',
      this.miFormulario?.controls['precio']?.value > 0
    );
    return (
      this.miFormulario?.controls['precio']?.value > 0 &&
      this.miFormulario?.controls['precio']?.touched
    );
  }
}
