import { ActivatedRoute } from '@angular/router';
import { Userr } from '../models/userr';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  userId!: number;
  public userDetail: Userr = {};
  constructor(
    private actviatedRoute: ActivatedRoute,
    private api: ApiService
  ) {}
  ngOnInit(): void {
    this.actviatedRoute.params.subscribe((res) => {
      this.userId = res['id'];
      this.fetchUserDetail(this.userId);
    });
  }
  fetchUserDetail(userId: number) {
    this.api.getRegisterUserId(userId).subscribe((res) => {
      this.userDetail = res;
      // console.log(res);
    });
  }
}
