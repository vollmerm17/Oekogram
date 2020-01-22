import {Component, OnInit} from '@angular/core';
import {AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {ProfileService} from '../service/profile.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  private registerFormGroup: FormGroup;
  private age;

  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute,
              private router: Router, private profileService: ProfileService) {
  }

  ngOnInit() {

    this.registerFormGroup = this.fb.group({
      id: [null],
      first_name: [''],
      last_name: [''],
      username: ['', Validators.required, this.usernameValidator()],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')], this.emailValidator()],
      bio: ['Hey, I\'m new here...And I love the environment! '],
      date_of_birth: [''],
      pictures: [null],
    });

    this.registerFormGroup.controls.date_of_birth.valueChanges.subscribe(() => {
      const birthDate = this.registerFormGroup.controls.date_of_birth.value;
      this.age = undefined;
      if (birthDate) {
        this.age = this.calculateAge(new Date(birthDate));
      }
    });
  }

  createProfile() {
    const profile = this.registerFormGroup.value;
    this.profileService.createProfile(profile).subscribe((response: any) => {
      this.router.navigate(['login/']);
    });
  }

  emailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return this.profileService.getProfiles()
        .pipe(
          map((profiles: any[]) => {
            const currentId = this.registerFormGroup.controls.id.value;
            const currentEmail = this.registerFormGroup.controls.email.value;
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


  usernameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return this.profileService.getProfiles()
        .pipe(
          map((profiles: any[]) => {
            const currentId = this.registerFormGroup.controls.id.value;
            const currentUsername = this.registerFormGroup.controls.username.value;
            const profileWithSameUsername = profiles.find((p) => {
              return p.id !== currentId && p.username === currentUsername;
            });
            if (profileWithSameUsername) {
              return {
                usernameAlreadyExists: true
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
}


