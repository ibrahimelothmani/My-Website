import { Component, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppwriteService } from '../../core/services/appwrite.service';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="contact-container">
      <h2 class="page-title mono text-green">$ echo "Contact Me"</h2>

      <!-- Two Column Layout -->
      <div class="contact-grid-layout">
        <!-- Contact Form -->
        <div class="contact-form-section">
          <h3 class="section-title mono text-blue">Send Me a Message</h3>
          
          @if (submitStatus() === 'success') {
            <div class="success-message">
              <span class="icon">✅</span>
              <p>Message sent successfully! I'll get back to you soon.</p>
            </div>
          }

          @if (submitStatus() === 'error') {
            <div class="error-message">
              <span class="icon">❌</span>
              <p>{{ errorMessage() }}</p>
            </div>
          }

          <form class="contact-form" (ngSubmit)="onSubmit()" #contactForm="ngForm">
            <div class="form-group">
              <label for="name" class="form-label mono">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                class="form-input"
                [(ngModel)]="formData.name"
                required
                placeholder="Your name"
                [disabled]="isSubmitting()">
            </div>

            <div class="form-group">
              <label for="email" class="form-label mono">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                class="form-input"
                [(ngModel)]="formData.email"
                required
                email
                placeholder="your.email@example.com"
                [disabled]="isSubmitting()">
            </div>

            <div class="form-group">
              <label for="subject" class="form-label mono">Subject *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                class="form-input"
                [(ngModel)]="formData.subject"
                required
                placeholder="What's this about?"
                [disabled]="isSubmitting()">
            </div>

            <div class="form-group">
              <label for="message" class="form-label mono">Message *</label>
              <textarea
                id="message"
                name="message"
                class="form-textarea"
                [(ngModel)]="formData.message"
                required
                rows="6"
                placeholder="Tell me about your project, question, or opportunity..."
                [disabled]="isSubmitting()"></textarea>
            </div>

            <button
              type="submit"
              class="submit-btn"
              [disabled]="!contactForm.valid || isSubmitting()">
              @if (isSubmitting()) {
                <span class="spinner"></span>
                <span>Sending...</span>
              } @else {
                <span>🚀 Send Message</span>
              }
            </button>
          </form>
        </div>

        <!-- Direct Contact Links -->
        <div class="direct-contact-section">
          <h3 class="section-title mono text-blue">Or Reach Out Directly</h3>
          
          <div class="contact-links">
            <a href="mailto:ibrahimelothmanii@gmail.com" class="contact-link">
              <span class="link-icon">📧</span>
              <div class="link-content">
                <div class="link-label">Email</div>
                <div class="link-value mono">ibrahimelothmanii@gmail.com</div>
              </div>
            </a>

            <a href="https://github.com/ibrahimelothmani" target="_blank" class="contact-link">
              <span class="link-icon">🐙</span>
              <div class="link-content">
                <div class="link-label">GitHub</div>
                <div class="link-value mono">github.com/ibrahimelothmani</div>
              </div>
            </a>

            <a href="https://linkedin.com/in/ibrahimelothmani" target="_blank" class="contact-link">
              <span class="link-icon">💼</span>
              <div class="link-content">
                <div class="link-label">LinkedIn</div>
                <div class="link-value mono">linkedin.com/in/ibrahimelothmani</div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <!-- Availability & Services -->
      <div class="info-grid">
        <div class="info-card">
          <h4 class="card-title mono text-green">Availability</h4>
          <div class="availability-status">
            <span class="status-dot pulsing"></span>
            <span class="status-text">Currently open to new opportunities</span>
          </div>
        </div>

        <div class="info-card">
          <h4 class="card-title mono text-green">What I Can Help With</h4>
          <ul class="services-list">
            <li>☁️ Cloud Infrastructure Design & Migration</li>
            <li>🔄 CI/CD Pipeline Implementation</li>
            <li>🐳 Kubernetes Cluster Setup & Management</li>
            <li>📊 Monitoring & Observability Solutions</li>
            <li>⚡ DevOps Process Optimization</li>
            <li>🛠️ Infrastructure as Code (Terraform/Ansible)</li>
          </ul>
        </div>
      </div>

      <!-- Footer Note -->
      <div class="footer-note mono text-secondary text-sm">
        <p>💡 <strong>Recruiter Note:</strong> I'm based in Tunisia and open to remote opportunities worldwide. 
        I have experience working across multiple time zones and collaborating with distributed teams.</p>
      </div>
    </div>
  `,
  styles: [`
    .contact-container {
      color: var(--text-primary);
      padding: var(--space-6);
      height: 100%;
      overflow-y: auto;
    }

    .page-title {
      font-size: var(--font-size-2xl);
      margin-bottom: var(--space-6);
      padding-bottom: var(--space-3);
      border-bottom: 2px solid var(--border-primary);
    }

    .contact-grid-layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-6);
      margin-bottom: var(--space-8);
    }

    .contact-form-section {
      flex: 1;
    }

    .direct-contact-section {
      flex: 1;
    }

    .section-title {
      font-size: var(--font-size-lg);
      margin-bottom: var(--space-4);
    }

    .contact-form {
      padding: var(--space-6);
      background: var(--bg-secondary);
      border: 1px solid var(--border-primary);
      border-radius: var(--radius-lg);
    }

    .form-group {
      margin-bottom: var(--space-5);
    }

    .form-label {
      display: block;
      margin-bottom: var(--space-2);
      color: var(--accent-green);
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-medium);
    }

    .form-input,
    .form-textarea {
      width: 100%;
      padding: var(--space-3);
      background: var(--bg-tertiary);
      border: 1px solid var(--border-inactive);
      border-radius: var(--radius-md);
      color: var(--text-primary);
      font-family: var(--font-sans);
      font-size: var(--font-size-sm);
      transition: all var(--duration-fast) var(--ease-out);
    }

    .form-input:focus,
    .form-textarea:focus {
      outline: none;
      border-color: var(--accent-blue);
      box-shadow: 0 0 0 3px rgba(0, 217, 255, 0.1);
    }

    .form-input:disabled,
    .form-textarea:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .form-textarea {
      resize: vertical;
      min-height: 120px;
    }

    .submit-btn {
      width: 100%;
      padding: var(--space-4);
      background: linear-gradient(135deg, var(--accent-green), var(--accent-blue));
      border: none;
      border-radius: var(--radius-md);
      color: var(--bg-primary);
      font-size: var(--font-size-base);
      font-weight: var(--font-weight-bold);
      cursor: pointer;
      transition: all var(--duration-fast) var(--ease-out);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-2);
    }

    .submit-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(0, 255, 65, 0.3);
    }

    .submit-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }

    .spinner {
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .success-message,
    .error-message {
      padding: var(--space-4);
      border-radius: var(--radius-md);
      margin-bottom: var(--space-4);
      display: flex;
      align-items: center;
      gap: var(--space-3);
    }

    .success-message {
      background: rgba(0, 255, 65, 0.1);
      border: 1px solid var(--accent-green);
      color: var(--accent-green);
    }

    .error-message {
      background: rgba(255, 0, 85, 0.1);
      border: 1px solid var(--accent-red);
      color: var(--accent-red);
    }

    .success-message .icon,
    .error-message .icon {
      font-size: var(--font-size-xl);
    }

    .success-message p,
    .error-message p {
      margin: 0;
    }

    .direct-contact-section {
      margin-bottom: var(--space-8);
    }

    .contact-links {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
    }

    .contact-link {
      display: flex;
      align-items: center;
      gap: var(--space-4);
      padding: var(--space-4);
      background: var(--bg-secondary);
      border: 1px solid var(--border-inactive);
      border-radius: var(--radius-md);
      text-decoration: none;
      color: var(--text-primary);
      transition: all var(--duration-fast) var(--ease-out);
    }

    .contact-link:hover {
      border-color: var(--accent-blue);
      transform: translateX(4px);
      box-shadow: 0 4px 12px rgba(0, 217, 255, 0.2);
    }

    .link-icon {
      font-size: var(--font-size-3xl);
      flex-shrink: 0;
    }

    .link-content {
      flex: 1;
    }

    .link-label {
      font-size: var(--font-size-sm);
      color: var(--text-secondary);
      margin-bottom: var(--space-1);
    }

    .link-value {
      font-size: var(--font-size-sm);
      color: var(--accent-blue);
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: var(--space-4);
      margin-bottom: var(--space-8);
    }

    .info-card {
      padding: var(--space-6);
      background: var(--bg-secondary);
      border: 1px solid var(--border-primary);
      border-radius: var(--radius-lg);
    }

    .card-title {
      font-size: var(--font-size-base);
      margin-bottom: var(--space-4);
    }

    .availability-status {
      display: flex;
      align-items: center;
      gap: var(--space-3);
    }

    .status-dot {
      width: 12px;
      height: 12px;
      background: var(--accent-green);
      border-radius: var(--radius-full);
    }

    .status-dot.pulsing {
      animation: glow-pulse 2s ease-in-out infinite;
    }

    .status-text {
      color: var(--text-primary);
    }

    .services-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }

    .services-list li {
      color: var(--text-secondary);
      font-size: var(--font-size-sm);
    }

    .footer-note {
      padding: var(--space-4);
      background: var(--bg-secondary);
      border: 1px solid var(--border-primary);
      border-radius: var(--radius-md);
      border-left: 4px solid var(--accent-purple);
    }

    .footer-note p {
      margin: 0;
      line-height: var(--line-height-relaxed);
    }

    @media (max-width: 768px) {
      .contact-container {
        padding: var(--space-4);
      }

      .page-title {
        font-size: var(--font-size-xl);
        margin-bottom: var(--space-4);
      }

      .contact-grid-layout {
        grid-template-columns: 1fr;
        gap: var(--space-4);
      }

      .contact-form {
        padding: var(--space-4);
      }

      .form-group input,
      .form-group textarea {
        padding: 14px;
        font-size: 16px; /* Prevent iOS zoom */
        min-height: 48px; /* Touch-friendly */
      }

      .form-group textarea {
        min-height: 120px;
      }

      .submit-button {
        padding: 16px;
        font-size: 16px;
        min-height: 52px; /* Large touch target */
      }

      .info-grid {
        grid-template-columns: 1fr;
        gap: var(--space-3);
      }

      .info-item {
        padding: 14px;
      }

      .info-icon {
        width: 40px;
        height: 40px;
        font-size: 22px;
      }

      .info-text a {
        font-size: 14px;
      }
    }

    @media (max-width: 480px) {
      .contact-container {
        padding: var(--space-3);
      }

      .page-title {
        font-size: var(--font-size-lg);
      }

      .contact-form {
        padding: var(--space-3);
      }

      .form-group {
        margin-bottom: var(--space-4);
      }
    }
  `]
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  isSubmitting = signal(false);
  submitStatus = signal<'idle' | 'success' | 'error'>('idle');
  errorMessage = signal('');

  constructor(private appwriteService: AppwriteService) {}

  async onSubmit(): Promise<void> {
    if (this.isSubmitting()) return;

    this.isSubmitting.set(true);
    this.submitStatus.set('idle');

    try {
      const result = await this.appwriteService.submitContactForm(this.formData);

      if (result.success) {
        this.submitStatus.set('success');
        // Reset form
        this.formData = {
          name: '',
          email: '',
          subject: '',
          message: ''
        };
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          this.submitStatus.set('idle');
        }, 5000);
      } else {
        throw new Error(result.error?.message || 'Failed to send message');
      }
    } catch (error: any) {
      this.submitStatus.set('error');
      this.errorMessage.set(
        error.message || 'Failed to send message. Please try again or contact me directly via email.'
      );
      
      // Hide error message after 7 seconds
      setTimeout(() => {
        this.submitStatus.set('idle');
      }, 7000);
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
