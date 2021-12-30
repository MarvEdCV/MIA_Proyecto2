import { Component, OnInit } from '@angular/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  
})
export class AdminComponent implements OnInit {
  tipoReporU: any;
  registerView = 'regView1';

  constructor() { }

  ngOnInit(): void {
  }

}
