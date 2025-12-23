import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  template: `
    <div class="about-container mono">
      <!-- Neofetch-style System Info -->
      <div class="system-info">
        <div class="ascii-logo">
          <pre class="text-green">
     ___     
    /   \\    
   | ● ● |   
    \\ ^ /    
     |||     
    /_|_\\    
          </pre>
        </div>
        
        <div class="info-grid">
          <div class="info-row">
            <span class="label text-blue">ibrahim@devops-os</span>
            <span class="separator">─────────────</span>
          </div>
          <div class="info-row">
            <span class="key text-green">OS:</span>
            <span class="value">DevOps Engineer v2024</span>
          </div>
          <div class="info-row">
            <span class="key text-green">Host:</span>
            <span class="value">Freelance DevOps Engineer 🚀</span>
          </div>
          <div class="info-row">
            <span class="key text-green">Status:</span>
            <span class="value text-blue">💼 Open to Work</span>
          </div>
          <div class="info-row">
            <span class="key text-green">Kernel:</span>
            <span class="value">Full-Stack → Cloud & DevOps</span>
          </div>
          <div class="info-row">
            <span class="key text-green">Uptime:</span>
            <span class="value">{{ calculateUptime() }}</span>
          </div>
          <div class="info-row">
            <span class="key text-green">Shell:</span>
            <span class="value">Terraform, Ansible, Bash</span>
          </div>
          <div class="info-row">
            <span class="key text-green">Resolution:</span>
            <span class="value">Cloud-Native Architecture</span>
          </div>
          <div class="info-row">
            <span class="key text-green">Runtime:</span>
            <span class="value">Kubernetes/Docker</span>
          </div>
          <div class="info-row">
            <span class="key text-green">Theme:</span>
            <span class="value">Infrastructure as Code</span>
          </div>
          <div class="info-row">
            <span class="key text-green">Location:</span>
            <span class="value">Tunisia 🇹🇳 (Remote Available)</span>
          </div>
          <div class="info-row">
            <span class="key text-green">Platforms:</span>
            <span class="value">Upwork, Toptal, Freelance.tn</span>
          </div>
        </div>
      </div>

      <!-- DevOps Philosophy -->
      <div class="philosophy-section">
        <h3 class="section-title text-blue">$ cat philosophy.txt</h3>
        <blockquote class="philosophy-text text-primary">
          "From Civil Engineering to Cloud Engineering.<br>
           Building bridges between code and infrastructure."
        </blockquote>
      </div>

      <!-- Core Strengths -->
      <div class="strengths-section">
        <h3 class="section-title text-blue">$ ls -la /skills/core/</h3>
        <ul class="strengths-list">
          <li class="strength-item">
            <span class="icon text-purple">▸</span>
            <span>Multi-cloud architecture (AWS, Azure)</span>
          </li>
          <li class="strength-item">
            <span class="icon text-purple">▸</span>
            <span>Kubernetes orchestration at production scale</span>
          </li>
          <li class="strength-item">
            <span class="icon text-purple">▸</span>
            <span>CI/CD pipeline design & optimization</span>
          </li>
          <li class="strength-item">
            <span class="icon text-purple">▸</span>
            <span>Infrastructure automation & provisioning</span>
          </li>
          <li class="strength-item">
            <span class="icon text-purple">▸</span>
            <span>Observability & monitoring systems</span>
          </li>
        </ul>
      </div>

      <!-- Journey Timeline -->
      <div class="journey-section">
        <h3 class="section-title text-blue">$ git log --oneline --graph</h3>
        <div class="timeline">
          <div class="timeline-item">
            <span class="commit-hash text-green">a1b2c3d</span>
            <span class="commit-msg">2024-Present: Freelance DevOps/Cloud Engineer</span>
          </div>
          <div class="timeline-item">
            <span class="commit-hash text-blue">b2c3d4e</span>
            <span class="commit-msg">Aug-Oct 2024: DevOps Intern @ IBH Ibn Alhaytham</span>
          </div>
          <div class="timeline-item">
            <span class="commit-hash text-green">c3d4e5f</span>
            <span class="commit-msg">2023-2024: Full Stack / DevOps & Cloud Training @ 2i Formation</span>
          </div>
          <div class="timeline-item">
            <span class="commit-hash text-purple">e5f6g7h</span>
            <span class="commit-msg">2020-2023: Career transition to Tech</span>
          </div>
          <div class="timeline-item">
            <span class="commit-hash text-green">d4e5f6g</span>
            <span class="commit-msg">2020: B.Sc. Civil Engineering</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .about-container {
      color: var(--text-primary);
      line-height: var(--line-height-relaxed);
    }

    .system-info {
      display: flex;
      gap: var(--space-8);
      margin-bottom: var(--space-8);
      padding: var(--space-6);
      background: var(--bg-secondary);
      border: 1px solid var(--border-primary);
      border-radius: var(--radius-md);
    }

    .ascii-logo pre {
      font-size: var(--font-size-sm);
      line-height: 1.2;
      margin: 0;
    }

    .info-grid {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }

    .info-row {
      display: flex;
      gap: var(--space-3);
      font-size: var(--font-size-sm);
    }

    .label {
      font-weight: var(--font-weight-bold);
      font-size: var(--font-size-base);
    }

    .separator {
      color: var(--text-tertiary);
    }

    .key {
      min-width: 100px;
      font-weight: var(--font-weight-medium);
    }

    .value {
      color: var(--text-primary);
    }

    .section-title {
      font-size: var(--font-size-lg);
      margin-bottom: var(--space-4);
      padding-bottom: var(--space-2);
      border-bottom: 1px solid var(--border-primary);
    }

    .philosophy-section {
      margin-bottom: var(--space-8);
    }

    .philosophy-text {
      font-size: var(--font-size-lg);
      font-style: italic;
      padding: var(--space-6);
      background: var(--bg-secondary);
      border-left: 4px solid var(--accent-green);
      border-radius: var(--radius-md);
      margin: 0;
    }

    .strengths-section {
      margin-bottom: var(--space-8);
    }

    .strengths-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .strength-item {
      padding: var(--space-3) var(--space-4);
      margin-bottom: var(--space-2);
      background: var(--bg-secondary);
      border: 1px solid var(--border-inactive);
      border-radius: var(--radius-md);
      transition: all var(--duration-fast) var(--ease-out);
    }

    .strength-item:hover {
      border-color: var(--accent-purple);
      transform: translateX(4px);
    }

    .icon {
      margin-right: var(--space-2);
    }

    .journey-section {
      margin-bottom: var(--space-4);
    }

    .timeline {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }

    .timeline-item {
      padding: var(--space-3) var(--space-4);
      background: var(--bg-secondary);
      border-left: 2px solid var(--accent-green);
      border-radius: var(--radius-sm);
    }

    .commit-hash {
      margin-right: var(--space-3);
      font-weight: var(--font-weight-bold);
    }

    .commit-msg {
      color: var(--text-primary);
    }

    @media (max-width: 768px) {
      .system-info {
        flex-direction: column;
        gap: var(--space-4);
      }

      .ascii-logo {
        text-align: center;
      }
    }
  `]
})
export class AboutComponent {
 calculateUptime(): string {
    const startDate = new Date('2024-04-01');
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const days = diffDays % 365;
    return `${years} years, ${days} days`;
  }
}
