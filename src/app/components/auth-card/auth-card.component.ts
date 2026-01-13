import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import { UserService } from '../../services/user.service';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-auth-card',
  imports: [NgIf, FormsModule],
  templateUrl: './auth-card.component.html',
  styleUrl: './auth-card.component.css'
})
export class AuthCardComponent {

  // Injecting custom AuthService to handle login/register APIs
  constructor(private authService: AuthServiceService, private userService: UserService, private toastServise: ToastService
  ) { }

  // Login/Register mode toggle flag
  isRegisterMode = false;

  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
  }

  // Forgot Password mode flag
  isForgotMode = false;

  toggleForgotMode() {
    this.isForgotMode = !this.isForgotMode;
  }



  // Event emitter to close the auth card

  @Output() close = new EventEmitter<void>();

  closeCard() {
    this.close.emit(); // Will tell the parent to hide the card
  }



  // 👁️ login form toggles password
  showPassword = false;
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }


  // 👁️ Register form toggles Password
  showRegPassword = false;
  showRegRepeatPassword = false;


  toggleRegPasswordVisibility() {
    this.showRegPassword = !this.showRegPassword;
  }

  toggleRegRepeatPasswordVisibility() {
    this.showRegRepeatPassword = !this.showRegRepeatPassword;
  }




  registerData = {
    name: '',
    email: '',
    password: '',
    repeatPassword: ''
  }

  loginData = {
    email: '',
    password: ''
  }





  onLoginSubmit() {
    if (!this.loginData.email || !this.loginData.password) {
      // Show error toast if fields are empty
      console.error('Login fields are empty!');
      this.toastServise.showToast('error', 'Please fill in all fields!');
      return;
    }
    console.log('Login Data:', this.loginData);



    // Call login API
    this.authService.login(this.loginData).subscribe({
      next: (res) => {
        console.log('Login Success:', res);
        // If token received, save it and show success message
        if (res.token) {
          this.authService.saveToken(res.token);
          // After successful login/register
          localStorage.setItem('user', JSON.stringify(res.user)); // res.user = { name, email, ... }

          this.userService.setUser(res.user); // ✅ yahan likhna hai
          console.log('User set in UserService:', res.user);
          this.toastServise.showToast('success', 'Login successful!');
          this.closeCard(); // Optionally hide auth card on login success
        } else {
          this.toastServise.showToast('error', 'No token recieve')
        }
      },
      error: (err) => {
        console.error('Login Failed:', err);
        this.toastServise.showToast('error', `login Failed ${err.error.message}`)
      }
    });


  }

  onRegisterSubmit() {

    // ✅ Clone registerData to avoid modifying the original object
    const { repeatPassword, ...sanitizedData } = this.registerData;

    // Validate register data
    if (!this.registerData.email || !this.registerData.password || !this.registerData.repeatPassword) {
      // Show error toast if fields are empty
      console.error('Registration fields are empty!');
      this.toastServise.showToast('error', 'Please fill in all fields!');
      return;
    } else if (
      this.registerData.password.length < 6 ||
      this.registerData.repeatPassword.length < 6
    ) {
      // Show warning toast 
      console.error('Password must be at least 6 characters long!');
      this.toastServise.showToast('warning', "Password must be at least 6 characters long!");
      return;
    } else if (
      this.registerData.password !== this.registerData.repeatPassword
    ) {
      alert("Passwords don't match!");
      // Show error toast 
      console.error("Passwords don't match!");
      this.toastServise.showToast('error', "Passwords don't match!");

      return;
    }

    console.log('Register Data:', this.registerData);



    // Call register API
    this.authService.register(sanitizedData).subscribe({
      next: (res) => {
        console.log('Register Success:', res);
        // Show success toast 
        this.toastServise.showToast('success', "Registration successful! Please log in.");
        this.toggleMode(); // Switch to login mode after successful registration
      },
      error: (err) => {
        console.error('Register Failed:', err);
        // Show error toast 
        console.error("Passwords don't match!");
        this.toastServise.showToast('error', "Registration failed. Try again.");
      }
    });


  }


  forgotEmail: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  onForgotPasswordSubmit() {
    if (!this.forgotEmail || !this.newPassword || !this.confirmPassword) {
      this.toastServise.showToast('error', ' Please fill all fields');
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.toastServise.showToast('error', ' Passwords do not match!');
      return;
    }

    // ✅ Correct API call
    this.authService.resetPassword({
      email: this.forgotEmail,
      newPassword: this.newPassword
    }).subscribe({
      next: (res) => {
        this.toastServise.showToast('success', ' Password reset successful. Please login again.');
        console.log('Response:', res);
        this.toggleForgotMode(); // back to login after reset
      },
      error: (err) => {
        this.toastServise.showToast('error', ' Error: ' + (err.error?.message || 'Something went wrong'));
        console.error(err);
      }
    });
  }



}


