import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {ProfileService} from '../service/profile.service';
import {EmailService} from '../service/email.service';

@Component({
  selector: 'app-write-mail',
  templateUrl: './write-mail.component.html',
  styleUrls: ['./write-mail.component.scss']
})
export class WriteMailComponent implements OnInit {


  mailFormGroup;
  mail;
  constructor(private fb: FormBuilder, private http: HttpClient, private emailService: EmailService) {
  }

  ngOnInit() {
    this.mailFormGroup = this.fb.group({
      id: [null],
      recipient: ['', Validators.required],
      subject: ['', Validators.required],
      body: [''],
    });


    this.mailFormGroup.controls.body.setValue('Hey! Have you seen the new Ökogram? Take a look!');
    this.mailFormGroup.controls.subject.setValue('Invitation to Ökogram');
  }

  sendMail() {
    this.mail = this.mailFormGroup.value;

    this.emailService.sendMail(this.mail).subscribe(() => alert('Invitation sent to: ' + this.mail.recipient));
  }
}
