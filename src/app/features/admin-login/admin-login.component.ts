import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppwriteService } from '../../core/services/appwrite.service';

@Component({
  selector: 'app-admin-login',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <div class="login-box">
        <div class="login-header">
          <h1>Admin Login</h1>
          <p>DevOps OS Administration</p>
        </div>

        <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              [(ngModel)]="email"
              required
              email
              placeholder="admin@example.com"
              [disabled]="isLoading()"
            />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              [(ngModel)]="password"
              required
              minlength="8"
              placeholder="Enter your password"
              [disabled]="isLoading()"
            />
          </div>

          @if (errorMessage()) {
            <div class="error-message">
              <span class="error-icon">⚠️</span>
              {{ errorMessage() }}
            </div>
          }

          <button
            type="submit"
            [disabled]="!loginForm.form.valid || isLoading()"
            class="login-button"
          >
            @if (isLoading()) {
              <span class="spinner"></span>
              Logging in...
            } @else {
              Login
            }
          </button>
        </form>

        <div class="login-footer">
          <p>Authorized personnel only</p>
          <button type="button" class="home-button" (click)="navigateToHome()">🏠 Back to Home</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      padding: 20px;
    }

    .login-box {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 40px;
      width: 100%;
      max-width: 400px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    }

    .login-header {
      text-align: center;
      margin-bottom: 32px;
    }

    .login-header h1 {
      color: #00ff88;
      font-size: 28px;
      font-weight: 700;
      margin: 0 0 8px 0;
      text-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
    }

    .login-header p {
      color: rgba(255, 255, 255, 0.6);
      font-size: 14px;
      margin: 0;
    }

    .form-group {
      margin-bottom: 24px;
    }

    .form-group label {
      display: block;
      color: rgba(255, 255, 255, 0.9);
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 8px;
    }

    .form-group input {
      width: 100%;
      padding: 12px 16px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      color: #ffffff;
      font-size: 14px;
      transition: all 0.3s ease;
      box-sizing: border-box;
    }

    .form-group input:focus {
      outline: none;
      border-color: #00ff88;
      box-shadow: 0 0 0 3px rgba(0, 255, 136, 0.1);
      background: rgba(255, 255, 255, 0.08);
    }

    .form-group input:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .form-group input::placeholder {
      color: rgba(255, 255, 255, 0.3);
    }

    .error-message {
      background: rgba(255, 59, 48, 0.1);
      border: 1px solid rgba(255, 59, 48, 0.3);
      border-radius: 8px;
      padding: 12px 16px;
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      gap: 8px;
      color: #ff6b6b;
      font-size: 14px;
    }

    .error-icon {
      font-size: 18px;
    }

    .login-button {
      width: 100%;
      padding: 14px;
      background: linear-gradient(135deg, #00ff88 0%, #00cc6a 100%);
      border: none;
      border-radius: 8px;
      color: #1a1a2e;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .login-button:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 255, 136, 0.3);
    }

    .login-button:active:not(:disabled) {
      transform: translateY(0);
    }

    .login-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }

    .spinner {
      width: 16px;
      height: 16px;
      border: 2px solid rgba(26, 26, 46, 0.3);
      border-top-color: #1a1a2e;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .login-footer {
      text-align: center;
      margin-top: 24px;
      padding-top: 24px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .login-footer p {
      color: rgba(255, 255, 255, 0.4);
      font-size: 12px;
      margin: 0 0 16px 0;
    }

    .home-button {
      width: 100%;
      padding: 10px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      color: rgba(255, 255, 255, 0.8);
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .home-button:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.3);
      color: rgba(255, 255, 255, 0.9);
      transform: translateY(-2px);
    }

    @media (max-width: 480px) {
      .login-box {
        padding: 24px;
      }

      .login-header h1 {
        font-size: 24px;
      }
    }
  `]
})
export class AdminLoginComponent {
  email = '';
  password = '';
  isLoading = signal(false);
  errorMessage = signal('');

  constructor(
    private appwriteService: AppwriteService,
    private router: Router
  ) {}

  async onSubmit() {
    this.isLoading.set(true);
    this.errorMessage.set('');

    const result = await this.appwriteService.login(this.email, this.password);

    this.isLoading.set(false);

    if (result.success) {
      this.router.navigate(['/dashboard']);
    } else {
      const error = result.error as any;
      this.errorMessage.set(
        error?.message || 'Invalid email or password. Please try again.'
      );
    }
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }
}
