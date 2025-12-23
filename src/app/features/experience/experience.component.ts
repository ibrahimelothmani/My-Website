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
      company: 'Freelance Platforms (Upwork, Toptal, Freelance.tn)',
      role: 'DevOps/Cloud Engineer',
      duration: 'November 2024 - Present',
      technologies: ['AWS', 'Azure', 'Kubernetes', 'Docker', 'Terraform', 'Ansible', 'Jenkins', 'GitHub Actions', 'Prometheus', 'Grafana'],
      responsibilities: [
        'Providing DevOps and cloud infrastructure services to international clients',
        'Building CI/CD pipelines and automate deployment workflows',
        'Setting up Kubernetes clusters and container orchestration',
        'Implementing infrastructure as code with Terraform and Ansible',
        'Deploying monitoring and observability solutions',
        'Consulting on DevOps best practices and cloud migration strategies'
      ],
      metrics: [
        { label: '💼 Active Projects', value: '3+' },
        { label: '🌍 Clients', value: 'International' },
        { label: '🎯 Focus', value: 'Cloud/DevOps' }
      ],
      expanded: true
    },
    {
      id: '2',
      company: 'IBH Ibn Alhaytham',
      role: 'DevOps Engineer (Intern)',
      duration: 'August 2024 - October  2024',
      technologies: ['Docker', 'Kubernetes', 'Jenkins', 'Git', 'Linux', 'Bash', 'Prometheus', 'Grafana'],
      responsibilities: [
        'Implemented Docker containerization for microservices applications',
        'Assisted in Kubernetes cluster setup for dev and staging environments',
        'Contributed to CI/CD pipeline improvements using Jenkins and GitHub Actions',
        'Participated in infrastructure monitoring setup with Prometheus and Grafana',
        'Collaborated with development teams on deployment automation',
        'Documented infrastructure processes and deployment procedures'
      ],
      metrics: [
        { label: '📦 Containerized Apps', value: '5+' },
        { label: '⏱️ Duration', value: '3 months' },
        { label: '🎓 Learning', value: 'Hands-on' }
      ],
      expanded: false
    },
    {
      id: '3',
      company: '2i Formation',
      role: 'Full Stack & DevOps/Cloud Training',
      duration: '2023 - 2024',
      technologies: ['AWS', 'Azure', 'Kubernetes', 'Docker', 'Terraform', 'Ansible', 'Spring Boot', 'Angular', 'Java', 'Python'],
      responsibilities: [
        'Completed intensive training in cloud platforms (AWS, Azure)',
        'Gained hands-on experience with Kubernetes and Docker orchestration',
        'Learned Infrastructure as Code using Terraform and Ansible',
        'Built full-stack applications with Spring Boot and Angular',
        'Mastered CI/CD pipelines and DevOps workflows',
        'Completed multiple real-world DevOps projects from scratch'
      ],
      metrics: [
        { label: '📚 Program', value: 'Professional' },
        { label: '⏱️ Duration', value: '1 year' },
        { label: '🎯 Skills', value: 'Full Stack + DevOps' }
      ],
      expanded: false
    },
    {
      id: '4',
      company: 'University',
      role: 'Civil Engineering Degree',
      duration: '2020',
      technologies: [],
      responsibilities: [
        'Graduated with B.Sc. in Civil Engineering',
        'Developed strong analytical and problem-solving capabilities',
        'Gained project planning and management experience',
        'Recognized the potential of tech and automation',
        'Decided to transition career from civil to software engineering',
        'Applied engineering principles to infrastructure design'
      ],
      metrics: [
        { label: '🎓 Degree', value: 'B.Sc.' },
        { label: '📐 Field', value: 'Civil Eng.' },
        { label: '💡 Pivot', value: 'To Tech' }
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
