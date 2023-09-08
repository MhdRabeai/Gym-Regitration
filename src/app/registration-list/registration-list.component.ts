import { ApiService } from './../services/api.service';
import { Userr } from '../models/userr';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgConfirmService } from 'ng-confirm-box';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.css'],
})
export class RegistrationListComponent implements OnInit {
  dataSource!: MatTableDataSource<Userr>;
  users!: Userr[];
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'mobile',
    'gender',
    'package',
    'enquiryDate',
    'action',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  constructor(
    private api: ApiService,
    private router: Router,
    private confirm: NgConfirmService,
    private toast: NgToastService
  ) {}
  getUsers() {
    this.api.getRegisterUser().subscribe((res) => {
      this.users = res;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  ngOnInit(): void {
    this.getUsers();
  }
  edit(id: number) {
    this.router.navigate(['update', id]);
  }
  delete(id: number) {
    this.confirm.showConfirm(
      'Are you sure ?',
      () => {
        this.api.deleteRegisterUser(id).subscribe((res) => {
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'Deleted Successfully',
            duration: 3000,
          });
          this.getUsers();
        });
      },
      () => {}
    );
  }
}
