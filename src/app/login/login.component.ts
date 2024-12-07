import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { login, logout } from '../store/user/user.actions';
import { selectStatus, selectError, selectUserEmail } from '../store/user/user.selectors';

@Component({
  imports: [FormsModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private store = inject(Store);

  username = '';
  password = '';

  status = this.store.selectSignal(selectStatus);
  error = this.store.selectSignal(selectError);
  userEmail = this.store.selectSignal(selectUserEmail);

  onLogin(): void {
    this.store.dispatch(login({ email: this.username, password: this.password }));
  }

  logout(): void {
    this.store.dispatch(logout());
  }
}
