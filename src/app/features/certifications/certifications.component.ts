import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-certifications',
  imports: [CommonModule],
  template: `
    <div class="certifications-container">
      <h2 class="page-title mono text-green">$ ls -la /certifications/</h2>
      
      <div class="certifications-content">
        <div class="linkedin-section">
          <div class="linkedin-icon">🔗</div>
          <h3 class="section-title text-blue">Professional Certifications & Skills</h3>
          <p class="section-desc text-secondary">
            View my verified skills, certifications, and endorsements on LinkedIn
          </p>
          
          <a 
            href="https://www.linkedin.com/in/ibrahim-el-othmani/" 
            target="_blank" 
            rel="noopener noreferrer"
            class="linkedin-button mono"
          >
            <span class="icon">💼</span>
            View LinkedIn Profile
            <span class="arrow">→</span>
          </a>
        </div>

        <div class="skills-note">
          <h4 class="note-title mono text-green">Currently Learning:</h4>
          <div class="learning-grid">
            <div class="learning-item">
              <span class="learning-icon">☁️</span>
              <span class="learning-text">AWS Solutions Architect</span>
            </div>
            <div class="learning-item">
              <span class="learning-icon">⚓</span>
              <span class="learning-text">Kubernetes (CKA)</span>
            </div>
            <div class="learning-item">
              <span class="learning-icon">🏗️</span>
              <span class="learning-text">Terraform Associate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .certifications-container {
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

    .certifications-content {
      max-width: 800px;
      margin: 0 auto;
    }

    .linkedin-section {
      text-align: center;
      padding: var(--space-8);
      background: var(--bg-secondary);
      border: 1px solid var(--border-primary);
      border-radius: var(--radius-lg);
      margin-bottom: var(--space-8);
    }

    .linkedin-icon {
      font-size: 64px;
      margin-bottom: var(--space-4);
      animation: float 3s ease-in-out infinite;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }

    .section-title {
      font-size: var(--font-size-2xl);
      font-weight: var(--font-weight-bold);
      margin-bottom: var(--space-3);
    }

    .section-desc {
      font-size: var(--font-size-base);
      margin-bottom: var(--space-6);
      line-height: var(--line-height-relaxed);
    }

    .linkedin-button {
      display: inline-flex;
      align-items: center;
      gap: var(--space-3);
      padding: var(--space-4) var(--space-6);
      background: linear-gradient(135deg, #0077b5 0%, #005582 100%);
      border: none;
      border-radius: var(--radius-md);
      color: white;
      font-size: var(--font-size-base);
      font-weight: var(--font-weight-medium);
      text-decoration: none;
      transition: all var(--duration-normal) var(--ease-out);
      box-shadow: 0 4px 12px rgba(0, 119, 181, 0.3);
    }

    .linkedin-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 119, 181, 0.4);
    }

    .linkedin-button .icon {
      font-size: var(--font-size-xl);
    }

    .linkedin-button .arrow {
      font-size: var(--font-size-lg);
      transition: transform var(--duration-fast);
    }

    .linkedin-button:hover .arrow {
      transform: translateX(4px);
    }

    .skills-note {
      padding: var(--space-6);
      background: var(--bg-secondary);
      border: 1px solid var(--border-primary);
      border-radius: var(--radius-lg);
    }

    .note-title {
      font-size: var(--font-size-lg);
      margin-bottom: var(--space-4);
    }

    .learning-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--space-4);
    }

    .learning-item {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      padding: var(--space-3);
      background: var(--bg-primary);
      border: 1px solid var(--border-primary);
      border-radius: var(--radius-md);
      transition: all var(--duration-fast) var(--ease-out);
    }

    .learning-item:hover {
      border-color: var(--accent-blue);
      transform: translateX(4px);
    }

    .learning-icon {
      font-size: var(--font-size-2xl);
    }

    .learning-text {
      font-size: var(--font-size-sm);
      color: var(--text-secondary);
      font-family: var(--font-mono);
    }

    @media (max-width: 768px) {
      .certifications-container {
        padding: var(--space-4);
      }

      .linkedin-section {
        padding: var(--space-6);
      }

      .learning-grid {
        grid-template-columns: 1fr;
        gap: var(--space-3);
      }
    }
  `]
})
export class CertificationsComponent {}
