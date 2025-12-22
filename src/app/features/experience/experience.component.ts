import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  technologies: string[];
  responsibilities: string[];
  metrics: { label: string; value: string }[];
  expanded: boolean;
}

@Component({
  selector: 'app-experience',
  imports: [CommonModule],
  template: `
    <div class="experience-container">
      <h2 class="page-title mono text-green">$ cat /var/log/work-history.log</h2>
      
      <div class="experiences-list">
        @for (exp of experiences(); track exp.id) {
          <div class="experience-card" [class.expanded]="exp.expanded">
            <!-- Header (Always Visible) -->
            <div class="exp-header" (click)="toggleExpand(exp.id)">
              <div class="exp-title-row">
                <span class="expand-icon mono text-green">{{ exp.expanded ? '▾' : '▸' }}</span>
                <h3 class="company-name text-blue">{{ exp.company }}</h3>
                <span class="duration mono text-secondary">({{ exp.duration }})</span>
              </div>
              <div class="role-name mono text-primary">{{ exp.role }}</div>
            </div>

            <!-- Expandable Content -->
            @if (exp.expanded) {
              <div class="exp-content">
                <!-- Technologies/Tools -->
                <div class="tech-section">
                  <h4 class="mono text-green">Technologies & Tools:</h4>
                  <div class="tech-badges">
                    @for (tech of exp.technologies; track tech) {
                      <span class="tech-badge">{{ tech }}</span>
                    }
                  </div>
                </div>

                <!-- Key Responsibilities -->
                <div class="responsibilities-section">
                  <h4 class="mono text-green">Key Responsibilities:</h4>
                  <ul class="responsibilities-list">
                    @for (resp of exp.responsibilities; track resp) {
                      <li>{{ resp }}</li>
                    }
                  </ul>
                </div>

                <!-- Impact Metrics -->
                <div class="metrics-section">
                  <h4 class="mono text-green">Impact Metrics:</h4>
                  <div class="metrics-grid">
                    @for (metric of exp.metrics; track metric.label) {
                      <div class="metric-card">
                        <div class="metric-icon">📊</div>
                        <div class="metric-value text-purple">{{ metric.value }}</div>
                        <div class="metric-label text-secondary">{{ metric.label }}</div>
                      </div>
                    }
                  </div>
                </div>
              </div>
            }
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .experience-container {
      color: var(--text-primary);
    }

    .page-title {
      font-size: var(--font-size-2xl);
      margin-bottom: var(--space-6);
      padding-bottom: var(--space-3);
      border-bottom: 2px solid var(--border-primary);
    }

    .experiences-list {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
    }

    .experience-card {
      background: var(--bg-secondary);
      border: 1px solid var(--border-inactive);
      border-radius: var(--radius-lg);
      overflow: hidden;
      transition: all var(--duration-normal) var(--ease-out);
    }

    .experience-card.expanded {
      border-color: var(--accent-green);
      box-shadow: 0 4px 16px rgba(0, 255, 65, 0.1);
    }

    .exp-header {
      padding: var(--space-5);
      cursor: pointer;
      user-select: none;
      transition: background var(--duration-fast) var(--ease-out);
    }

    .exp-header:hover {
      background: var(--bg-tertiary);
    }

    .exp-title-row {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      margin-bottom: var(--space-2);
    }

    .expand-icon {
      font-size: var(--font-size-xl);
      line-height: 1;
    }

    .company-name {
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-bold);
      flex: 1;
    }

    .duration {
      font-size: var(--font-size-sm);
    }

    .role-name {
      font-size: var(--font-size-lg);
      margin-left: calc(var(--font-size-xl) + var(--space-3));
    }

    .exp-content {
      padding: 0 var(--space-5) var(--space-5);
      border-top: 1px solid var(--border-primary);
      padding-top: var(--space-5);
      animation: fade-in var(--duration-fast) var(--ease-out);
    }

    h4 {
      font-size: var(--font-size-base);
      margin-bottom: var(--space-3);
    }

    .tech-section {
      margin-bottom: var(--space-5);
    }

    .tech-badges {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
    }

    .tech-badge {
      padding: var(--space-2) var(--space-3);
      background: var(--bg-tertiary);
      border: 1px solid var(--accent-blue);
      border-radius: var(--radius-md);
      font-size: var(--font-size-sm);
      font-family: var(--font-mono);
      color: var(--accent-blue);
      transition: all var(--duration-fast) var(--ease-out);
    }

    .tech-badge:hover {
      background: rgba(0, 217, 255, 0.1);
      transform: translateY(-2px);
    }

    .responsibilities-section {
      margin-bottom: var(--space-5);
    }

    .responsibilities-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .responsibilities-list li {
      padding: var(--space-2) 0;
      padding-left: var(--space-6);
      position: relative;
    }

    .responsibilities-list li::before {
      content: '•';
      position: absolute;
      left: var(--space-3);
      color: var(--accent-green);
      font-weight: bold;
    }

    .metrics-section {
      margin-top: var(--space-5);
    }

    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: var(--space-4);
    }

    .metric-card {
      padding: var(--space-4);
      background: var(--bg-primary);
      border: 1px solid var(--border-primary);
      border-radius: var(--radius-md);
      text-align: center;
      transition: all var(--duration-fast) var(--ease-out);
    }

    .metric-card:hover {
      border-color: var(--accent-purple);
      transform: translateY(-2px);
    }

    .metric-icon {
      font-size: var(--font-size-2xl);
      margin-bottom: var(--space-2);
    }

    .metric-value {
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-bold);
      font-family: var(--font-mono);
      margin-bottom: var(--space-1);
    }

    .metric-label {
      font-size: var(--font-size-sm);
    }
  `]
})
export class ExperienceComponent {
  experiences = signal<Experience[]>([
    {
      id: '1',
      company: 'CloudSynk',
      role: 'Cloud & DevOps Engineer',
      duration: '2023 - Present',
      technologies: ['AWS', 'Azure', 'Terraform', 'Kubernetes', 'Jenkins', 'ArgoCD', 'Prometheus', 'Grafana', 'Python', 'Bash'],
      responsibilities: [
        'Architected and deployed multi-region EKS clusters for microservices',
        'Implemented GitOps workflows using ArgoCD and Helm',
        'Built comprehensive observability stack with Prometheus, Grafana, and Loki',
        'Automated infrastructure provisioning reducing deployment time by 60%',
        'Designed and implemented CI/CD pipelines for 20+ applications',
        'Managed cloud costs and optimized resource utilization'
      ],
      metrics: [
        { label: '⬇️ Deployment Time', value: '-60%' },
        { label: '⬆️ Uptime', value: '99.9%' },
        { label: '💰 Cost Savings', value: '$50k+/yr' },
        { label: '🤖 Automation', value: '95%' }
      ],
      expanded: true
    },
    {
      id: '2',
      company: 'NexaCore Solutions',
      role: 'Full-Stack Engineer',
      duration: '2021 - 2022',
      technologies: ['Angular', 'Spring Boot', 'Docker', 'PostgreSQL', 'AWS', 'GitHub Actions'],
      responsibilities: [
        'Developed full-stack applications using Angular and Spring Boot',
        'Containerized applications and managed Docker deployments',
        'Set up CI/CD pipelines with GitHub Actions',
        'Implemented RESTful APIs and database optimization',
        'Collaborated with cross-functional teams on feature delivery'
      ],
      metrics: [
        { label: '🚀 Features Delivered', value: '50+' },
        { label: '⚡ API Performance', value: '+40%' },
        { label: '👥 Team Size', value: '8 people' }
      ],
      expanded: false
    }
  ]);

  toggleExpand(id: string): void {
    this.experiences.update(exps =>
      exps.map(exp =>
        exp.id === id ? { ...exp, expanded: !exp.expanded } : exp
      )
    );
  }
}
