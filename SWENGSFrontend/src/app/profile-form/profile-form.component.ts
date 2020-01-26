import {Component, OnInit} from '@angular/core';

import {AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ProfileService} from '../service/profile.service';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {

  private profileFormGroup: FormGroup;
  private age;

  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute,
              private router: Router, private profileService: ProfileService) {
  }

  ngOnInit() {
    const data = this.route.snapshot.data;

    this.profileFormGroup = this.fb.group({
      id: [null],
      first_name: [''],
      last_name: [''],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')], this.emailValidator()],
      bio: ['Hey, I\'m new here...And I love the environment! '],
      date_of_birth: [''],
      pictures: [[]],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get('api/profile/' + id + '/get')
        .subscribe((response) => {
          this.profileFormGroup.patchValue(response);

        });
    }
    this.profileFormGroup.controls.date_of_birth.valueChanges.subscribe(() => {
      const birthDate = this.profileFormGroup.controls.date_of_birth.value;
      this.age = undefined;
      if (birthDate) {
        this.age = this.calculateAge(new Date(birthDate));
      }
    });
  }

  updateProfile() {
    const profile = this.profileFormGroup.value;
    const id = this.route.snapshot.paramMap.get('id');
    this.http.put('/api/profile/' + id + '/update', profile)
      .subscribe(() => {
        window.location.reload();
        this.router.navigate(['posting']);
      });

  }

  emailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return this.profileService.getProfiles()
        .pipe(
          map((profiles: any[]) => {
            const currentId = this.profileFormGroup.controls.id.value;
            const currentEmail = this.profileFormGroup.controls.email.value;
            const profileWithSameEmail = profiles.find((p) => {
              return p.id !== currentId && p.email === currentEmail;
            });
            if (profileWithSameEmail) {
              return {
                emailAlreadyExists: true
              };
            } else {
              return null;
            }
          })
        );
    };
  }


  calculateAge(date) {
    const ageDifMs = Date.now() - date;
    if (ageDifMs > 0) {
      const ageDate = new Date(ageDifMs);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    } else {
      return 0;
    }
  }

  deleteProfile() {
    const id = this.route.snapshot.paramMap.get('id');
    this.profileService.deleteProfile(id).subscribe((response: any) => {
      this.router.navigate(['login/']);
     });
  }
}
