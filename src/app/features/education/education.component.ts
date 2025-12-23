import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  duration: string;
  type: 'degree' | 'training';
  achievements: string[];
  skills: string[];
  expanded: boolean;
}

@Component({
  selector: 'app-education',
  imports: [CommonModule],
  template: `
    <div class="education-container">
      <h2 class="page-title mono text-green">$ cat /etc/education.log</h2>
      
      <div class="education-list">
        @for (edu of education(); track edu.id) {
          <div class="education-card" [class.expanded]="edu.expanded">
            <!-- Header (Always Visible) -->
            <div class="edu-header" (click)="toggleExpand(edu.id)">
              <div class="edu-title-row">
                <span class="expand-icon mono text-green">{{ edu.expanded ? '▾' : '▸' }}</span>
                <h3 class="institution-name text-blue">{{ edu.institution }}</h3>
                <span class="duration mono text-secondary">({{ edu.duration }})</span>
              </div>
              <div class="degree-name mono text-primary">{{ edu.degree }} - {{ edu.field }}</div>
            </div>

            <!-- Expandable Content -->
            @if (edu.expanded) {
              <div class="edu-content">
                <!-- Skills Gained -->
                <div class="skills-section">
                  <h4 class="mono text-green">Skills & Technologies:</h4>
                  <div class="tech-badges">
                    @for (skill of edu.skills; track skill) {
                      <span class="tech-badge">{{ skill }}</span>
                    }
                  </div>
                </div>

                <!-- Key Learnings/Achievements -->
                <div class="achievements-section">
                  <h4 class="mono text-green">Key Achievements:</h4>
                  <ul class="achievements-list">
                    @for (achievement of edu.achievements; track achievement) {
                      <li>{{ achievement }}</li>
                    }
                  </ul>
                </div>
              </div>
            }
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .education-container {
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

    .education-list {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
    }

    .education-card {
      background: var(--bg-secondary);
      border: 1px solid var(--border-inactive);
      border-radius: var(--radius-lg);
      overflow: hidden;
      transition: all var(--duration-normal) var(--ease-out);
    }

    .education-card.expanded {
      border-color: var(--accent-blue);
      box-shadow: 0 4px 16px rgba(0, 217, 255, 0.1);
    }

    .edu-header {
      padding: var(--space-5);
      cursor: pointer;
      user-select: none;
      transition: background var(--duration-fast) var(--ease-out);
    }

    .edu-header:hover {
      background: var(--bg-tertiary);
    }

    .edu-title-row {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      margin-bottom: var(--space-2);
    }

    .expand-icon {
      font-size: var(--font-size-xl);
      line-height: 1;
    }

    .institution-name {
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-bold);
      flex: 1;
    }

    .duration {
      font-size: var(--font-size-sm);
    }

    .degree-name {
      font-size: var(--font-size-lg);
      margin-left: calc(var(--font-size-xl) + var(--space-3));
    }

    .edu-content {
      padding: 0 var(--space-5) var(--space-5);
      border-top: 1px solid var(--border-primary);
      padding-top: var(--space-5);
      animation: fade-in var(--duration-fast) var(--ease-out);
    }

    h4 {
      font-size: var(--font-size-base);
      margin-bottom: var(--space-3);
    }

    .skills-section {
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
      border: 1px solid var(--accent-purple);
      border-radius: var(--radius-md);
      font-size: var(--font-size-sm);
      font-family: var(--font-mono);
      color: var(--accent-purple);
      transition: all var(--duration-fast) var(--ease-out);
    }

    .tech-badge:hover {
      background: rgba(168, 85, 247, 0.1);
      transform: translateY(-2px);
    }

    .achievements-section {
      margin-bottom: var(--space-4);
    }

    .achievements-list {
      list-style: none;
      padding: 0;
      margin: 0;
      font-size: var(--font-size-sm);
    }

    .achievements-list li {
      padding: var(--space-2) 0;
      padding-left: var(--space-6);
      position: relative;
      color: var(--text-secondary);
    }

    .achievements-list li::before {
      content: '✓';
      position: absolute;
      left: var(--space-3);
      color: var(--accent-green);
      font-weight: bold;
    }

    @media (max-width: 768px) {
      .education-container {
        padding: var(--space-4);
      }

      .degree-name {
        font-size: var(--font-size-base);
      }
    }
  `]
})
export class EducationComponent {
  education = signal<Education[]>([
    {
      id: '1',
      institution: '2i Formation',
      degree: 'Professional Training',
      field: 'Full Stack & DevOps/Cloud Engineering',
      duration: '2023 - 2024',
      type: 'training',
      skills: ['AWS', 'Azure', 'Kubernetes', 'Docker', 'Terraform', 'Ansible', 'Spring Boot', 'Angular', 'Java', 'Python', 'Jenkins', 'GitOps'],
      achievements: [
        'Completed intensive professional training in cloud platforms (AWS, Azure)',
        'Gained hands-on experience with Kubernetes and Docker orchestration',
        'Learned Infrastructure as Code using Terraform and Ansible',
        'Built full-stack applications with Spring Boot and Angular microservices',
        'Mastered CI/CD pipelines, monitoring, and observability tools',
        'Completed multiple real-world DevOps projects demonstrating end-to-end capabilities'
      ],
      expanded: true
    },
    {
      id: '2',
      institution: 'University',
      degree: 'Bachelor of Science (B.Sc.)',
      field: 'Civil Engineering',
      duration: '2020',
      type: 'degree',
      skills: ['Project Management', 'Problem Solving', 'Analytical Thinking', 'Engineering Principles', 'Technical Documentation'],
      achievements: [
        'Graduated with B.Sc. in Civil Engineering',
        'Developed strong analytical and problem-solving capabilities',
        'Gained project planning and management experience',
        'Recognized the power of automation and technology in engineering',
        'Made strategic decision to transition career from civil to software/cloud engineering',
        'Applied engineering principles and systematic thinking to infrastructure design'
      ],
      expanded: false
    }
  ]);

  toggleExpand(id: string): void {
    this.education.update(edus =>
      edus.map(edu =>
        edu.id === id ? { ...edu, expanded: !edu.expanded } : edu
      )
    );
  }
}
