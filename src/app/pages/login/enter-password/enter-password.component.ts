import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-enter-password',
  templateUrl: './enter-password.component.html',
  styleUrls: ['./enter-password.component.scss']
})
export class EnterPasswordComponent implements OnInit {
  password = new FormControl('');
  email = '';
  pageName = '';
  constructor(
    private authServe: AuthService,
    private toast: ToastrService,
    private tokenServe: TokenService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.getPageDetails();
  }

  async passwordDetails(e: Event): Promise<void> {
    try {
      e.preventDefault();
      const data = {
        email: this.email,
        password: this.password.value,
      };
      if (this.pageName === 'set') {
        const res: any = await this.authServe.teacherSetPassword(data);
        this.tokenServe.saveToken(res?.token);
        this.router.navigate(['/home']);
        return;
      }
      const res: any = await this.authServe.teacherLogin(data);
      this.tokenServe.saveToken(res?.token);
      this.router.navigate(['/home']);
    } catch (error: any) {
      console.error(error);
      this.toast.error(error?.error.message)
    }
  }


  // get page details;
  getPageDetails(): void {
    this.pageName = this.route.snapshot.paramMap.get('page') ?? '';
    this.email = this.route.snapshot.paramMap.get('email') ?? '';
  }



  ngOnInit(): void {
  }
}