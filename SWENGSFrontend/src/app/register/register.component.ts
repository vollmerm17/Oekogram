import {Component, OnInit} from '@angular/core';
import {AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {ProfileService} from '../service/profile.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {EmailService} from '../service/email.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  private registerFormGroup: FormGroup;
  private age;
  password;
  mailFormGroup;
  mail;

  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute,
              private router: Router, private profileService: ProfileService, private emailService: EmailService) {
  }

  ngOnInit() {

    this.registerFormGroup = this.fb.group({
      id: [null],
      first_name: [''],
      last_name: [''],
      username: ['', Validators.required, this.usernameValidator()],
      email: ['', Validators.required, this.emailValidator()],
      bio: ['Hey, I\'m new here...And I love the environment! '],
      date_of_birth: [null],
      password: ['', Validators.required]
    });
    this.registerFormGroup.valueChanges.subscribe(form => this.password = form.password);

    this.registerFormGroup.controls.date_of_birth.valueChanges.subscribe(() => {
      const birthDate = this.registerFormGroup.controls.date_of_birth.value;
      this.age = undefined;
      if (birthDate) {
        this.age = this.calculateAge(new Date(birthDate));
      }
    });


    this.mailFormGroup = this.fb.group({
      id: [null],
      recipient: ['', Validators.required],
      subject: ['', Validators.required],
      body: [''],
    });

    this.mailFormGroup.controls.body.setValue('Thank you for your registration on Ökogram!');
    this.mailFormGroup.controls.subject.setValue('Registration on Ökogram');
  }

  createProfile() {
     const profile = this.registerFormGroup.value;
     this.mailFormGroup.controls.recipient.setValue(profile.email);
     this.mail = this.mailFormGroup.value;

     this.profileService.createProfile(profile).subscribe((response: any) => {
      this.router.navigate(['login/']);
     });
     this.emailService.sendMail(this.mail).subscribe(() => alert('Registration sent to: ' + this.mail.recipient));
     this.registerFormGroup.reset(); // testen!!!
  }

  emailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return this.profileService.getProfiles()
        .pipe(
          map((profiles: any[]) => {
            const currentEmail = this.registerFormGroup.controls.email.value;
            const profileWithSameEmail = profiles.find((p) => {
              return p.email === currentEmail;
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
            const currentUsername = this.registerFormGroup.controls.username.value;
            const profileWithSameUsername = profiles.find((p) => {
              return p.username === currentUsername;
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



