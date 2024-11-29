import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RoomDetailComponent } from './components/room-detail/room-detail.component';

export const routes: Routes = [
    {path: 'homepage', component: HomeComponent, pathMatch: 'full' },
    {path: 'rooms', component: RoomDetailComponent }
];
