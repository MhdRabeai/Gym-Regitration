import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.css'],
})
export class CreateRegistrationComponent implements OnInit {
  packages: string[] = ['Monthly', 'Quarterly', 'Yearly'];
  genders: string[] = ['Male', 'Female'];
  importantList: string[] = [
    'Toxix Fat reduction',
    'Energy and Endurance',
    'Building lean Muscle',
    'Healthier Digestive System',
    'Sugar Craving Body',
    'Fitness',
  ];
  regiserForm!: FormGroup;
  userIdToUpdate!: number;
  isUpdateAction: boolean = false;
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private toastService: NgToastService
  ) {}
  ngOnInit(): void {
    this.regiserForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      weight: [''],
      height: [''],
      gender: [''],
      requireTrainer: [''],
      package: [''],
      important: [''],
      haveGym: [''],
      enquiryDate: [''],
    });
    this.activatedRoute.params.subscribe((val) => {
      this.userIdToUpdate = val['id'];

      this.api.getRegisterUserId(this.userIdToUpdate).subscribe((res) => {
        this.isUpdateAction = true;
        this.fillFormToUpdate(res);
      });
    });
  }
  submit() {
    this.api.postRegistration(this.regiserForm.value).subscribe(() => {
      this.toastService.success({
        detail: 'Success',
        summary: 'Enquiry Added',
        duration: 3000,
      });
      this.regiserForm.reset();
    });
  }
  update() {
    this.api
      .updateRegisterUser(this.regiserForm.value, this.userIdToUpdate)
      .subscribe(() => {
        this.toastService.success({
          detail: 'Success',
          summary: 'Enquiry Updated',
          duration: 3000,
        });
        this.regiserForm.reset();
        this.router.navigate(['list']);
      });
  }
  fillFormToUpdate(user: any) {
    this.regiserForm.setValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
      weight: user.weight,
      height: user.height,
      gender: user.gender,
      requireTrainer: user.requireTrainer,
      package: user.package,
      important: user.important,
      haveGym: user.haveGym,
      enquiryDate: user.enquiryDate,
    });
  }
}
