import { Component } from '@angular/core';
import { AuthService } from '../../auth/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'rb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  authUser:any = {};
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.authUser = this.auth.isAuthenticated(true);
  }

  logout() {
    this.auth.logout();

    return this.router.navigate(['/login']);
  }
}
