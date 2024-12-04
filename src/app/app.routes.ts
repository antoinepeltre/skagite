import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RoomDetailComponent } from './components/room-detail/room-detail.component';
import { LayoutComponent } from './components/layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
          { path: '', component: HomeComponent },
          { path: 'room/:id', component: RoomDetailComponent },
          { path: '**', redirectTo: '' } 
        ]
      }
];



