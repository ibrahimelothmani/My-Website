import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-certifications',
  imports: [CommonModule],
  template: `
    <div class="certifications-container">
      <h2 class="page-title mono text-green">$ ls -la /certifications/</h2>
      
      <div class="empty-state">
        <div class="empty-icon">🏆</div>
        <h3 class="empty-title text-blue">Professional Certifications</h3>
        <p class="empty-message text-secondary">
          This section is designed to showcase professional certifications as they are earned.
        </p>
        
        <div class="planned-certs">
          <h4 class="section-label mono text-green">Planned Certifications:</h4>
          <div class="certs-grid">
            <div class="cert-placeholder">
              <span class="cert-icon">☁️</span>
              <span class="cert-name">AWS Solutions Architect</span>
            </div>
            <div class="cert-placeholder">
              <span class="cert-icon">⚓</span>
              <span class="cert-name">CKA (Certified Kubernetes Admin)</span>
            </div>
            <div class="cert-placeholder">
              <span class="cert-icon">🏗️</span>
              <span class="cert-name">Terraform Associate</span>
            </div>
            <div class="cert-placeholder">
              <span class="cert-icon">☁️</span>
              <span class="cert-name">Azure DevOps Expert</span>
            </div>
          </div>
        </div>

        <div class="example-format">
          <h4 class="section-label mono text-green">Future Format Example:</h4>
          <div class="cert-example">
            <div class="cert-badge">🎖️</div>
            <div class="cert-details">
              <div class="cert-title text-blue">AWS Solutions Architect - Associate</div>
              <div class="cert-issuer text-secondary">Amazon Web Services</div>
              <div class="cert-date mono text-sm">Issued: January 2025</div>
              <a href="#" class="verify-link mono text-green">🔗 Verify Credential</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .certifications-container {
      color: var(--text-primary);
    }

    .page-title {
      font-size: var(--font-size-2xl);
      margin-bottom: var(--space-6);
      padding-bottom: var(--space-3);
      border-bottom: 2px solid var(--border-primary);
    }

    .empty-state {
      text-align: center;
      padding: var(--space-8);
    }

    .empty-icon {
      font-size: 80px;
      margin-bottom: var(--space-4);
      animation: fade-in 1s ease-out;
    }

    .empty-title {
      font-size: var(--font-size-2xl);
      margin-bottom: var(--space-3);
    }

    .empty-message {
      font-size: var(--font-size-base);
      margin-bottom: var(--space-8);
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .planned-certs {
      margin-bottom: var(--space-8);
      text-align: left;
    }

    .section-label {
      font-size: var(--font-size-base);
      margin-bottom: var(--space-4);
    }

    .certs-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: var(--space-4);
      margin-bottom: var(--space-6);
    }

    .cert-placeholder {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      padding: var(--space-4);
      background: var(--bg-secondary);
      border: 1px dashed var(--border-primary);
      border-radius: var(--radius-md);
      transition: all var(--duration-fast) var(--ease-out);
    }

    .cert-placeholder:hover {
      border-color: var(--accent-blue);
      transform: translateY(-2px);
    }

    .cert-icon {
      font-size: var(--font-size-2xl);
    }

    .cert-name {
      font-family: var(--font-mono);
      font-size: var(--font-size-sm);
      color: var(--text-secondary);
    }

    .example-format {
      text-align: left;
      max-width: 600px;
      margin: 0 auto;
    }

    .cert-example {
      display: flex;
      gap: var(--space-5);
      padding: var(--space-6);
      background: var(--bg-secondary);
      border: 1px solid var(--accent-green);
      border-radius: var(--radius-lg);
    }

    .cert-badge {
      font-size: 60px;
      flex-shrink: 0;
    }

    .cert-details {
      flex: 1;
    }

    .cert-title {
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-bold);
      margin-bottom: var(--space-2);
    }

    .cert-issuer {
      font-size: var(--font-size-base);
      margin-bottom: var(--space-1);
    }

    .cert-date {
      font-size: var(--font-size-sm);
      margin-bottom: var(--space-3);
    }

    .verify-link {
      display: inline-block;
      font-size: var(--font-size-sm);
      text-decoration: none;
      color: var(--accent-green);
      transition: all var(--duration-fast) var(--ease-out);
    }

    .verify-link:hover {
      text-decoration: underline;
      transform: translateX(4px);
    }
  `]
})
export class CertificationsComponent {}
