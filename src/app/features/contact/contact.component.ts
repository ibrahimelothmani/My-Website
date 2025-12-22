import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  imports: [CommonModule],
  template: `
    <div class="contact-container">
      <h2 class="page-title mono text-green">$ cat /etc/contact.sh</h2>
      
      <div class="contact-intro">
        <h3 class="intro-title text-blue">📧 Let's Build Something Amazing</h3>
        <p class="intro-text">
          Looking for a Cloud & DevOps Engineer who can architect scalable infrastructure, 
          automate everything, and deliver results? Let's connect!
        </p>
      </div>

      <div class="contact-grid">
        <!-- Contact Links -->
        <div class="contact-links">
          <h4 class="section-title mono text-green">Direct Contact:</h4>
          
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

          <a href="/cv/Cloud-DevOps Engineer.pdf" download class="contact-link download-cv">
            <span class="link-icon">📄</span>
            <div class="link-content">
              <div class="link-label">Download CV</div>
              <div class="link-value mono">DevOps_Engineer_Resume.pdf</div>
            </div>
          </a>
        </div>

        <!-- Call to Action -->
        <div class="cta-section">
          <h4 class="section-title mono text-green">What I Can Help With:</h4>
          <ul class="helps-list">
            <li>
              <span class="help-icon text-blue">✓</span>
              <span>Cloud infrastructure architecture & migration</span>
            </li>
            <li>
              <span class="help-icon text-blue">✓</span>
              <span>Kubernetes deployment & management</span>
            </li>
            <li>
              <span class="help-icon text-blue">✓</span>
              <span>CI/CD pipeline design & implementation</span>
            </li>
            <li>
              <span class="help-icon text-blue">✓</span>
              <span>Infrastructure automation with Terraform</span>
            </li>
            <li>
              <span class="help-icon text-blue">✓</span>
              <span>Observability & monitoring solutions</span>
            </li>
            <li>
              <span class="help-icon text-blue">✓</span>
              <span>DevOps best practices consultation</span>
            </li>
          </ul>

          <div class="availability-note">
            <span class="status-indicator"></span>
            <span class="text-green mono">Currently open to new opportunities</span>
          </div>
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
    }

    .page-title {
      font-size: var(--font-size-2xl);
      margin-bottom: var(--space-6);
      padding-bottom: var(--space-3);
      border-bottom: 2px solid var(--border-primary);
    }

    .contact-intro {
      margin-bottom: var(--space-8);
      padding: var(--space-6);
      background: var(--bg-secondary);
      border: 1px solid var(--border-primary);
      border-radius: var(--radius-lg);
      border-left: 4px solid var(--accent-green);
    }

    .intro-title {
      font-size: var(--font-size-xl);
      margin-bottom: var(--space-3);
    }

    .intro-text {
      color: var(--text-secondary);
      line-height: var(--line-height-relaxed);
    }

    .contact-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: var(--space-6);
      margin-bottom: var(--space-8);
    }

    .section-title {
      font-size: var(--font-size-base);
      margin-bottom: var(--space-4);
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

    .download-cv:hover {
      border-color: var(--accent-green);
      box-shadow: 0 4px 12px rgba(0, 255, 65, 0.2);
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

    .download-cv .link-value {
      color: var(--accent-green);
    }

    .cta-section {
      padding: var(--space-6);
      background: var(--bg-secondary);
      border: 1px solid var(--border-primary);
      border-radius: var(--radius-lg);
    }

    .helps-list {
      list-style: none;
      padding: 0;
      margin: 0 0 var(--space-6) 0;
    }

    .helps-list li {
      padding: var(--space-2) 0;
      display: flex;
      align-items: flex-start;
      gap: var(--space-3);
    }

    .help-icon {
      font-weight: bold;
      flex-shrink: 0;
    }

    .availability-note {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      padding: var(--space-4);
      background: var(--bg-primary);
      border: 1px solid var(--accent-green);
      border-radius: var(--radius-md);
    }

    .status-indicator {
      width: 12px;
      height: 12px;
      background: var(--accent-green);
      border-radius: var(--radius-full);
      animation: glow-pulse 2s ease-in-out infinite;
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
      .contact-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ContactComponent {}
