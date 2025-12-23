import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill {
  name: string;
  category: string;
}

interface SkillCategory {
  name: string;
  icon: string;
  skills: Skill[];
}

@Component({
  selector: 'app-skills',
  imports: [CommonModule],
  template: `
    <div class="skills-container mono">
      <h2 class="page-title text-green">$ cat /etc/skills.conf</h2>
      
      <div class="categories-list">
        @for (category of skillCategories(); track category.name) {
          <div class="category-section">
            <h3 class="category-title">
              <span class="category-icon">{{ category.icon }}</span>
              <span class="text-blue">{{ category.name }}</span>
            </h3>
            
            <div class="skills-badges">
              @for (skill of category.skills; track skill.name) {
                <span class="skill-badge">{{ skill.name }}</span>
              }
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .skills-container {
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

    .categories-list {
      display: flex;
      flex-direction: column;
      gap: var(--space-6);
    }

    .category-section {
      background: var(--bg-secondary);
      border: 1px solid var(--border-primary);
      border-radius: var(--radius-lg);
      padding: var(--space-6);
    }

    .category-title {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      font-size: var(--font-size-xl);
      margin-bottom: var(--space-4);
      padding-bottom: var(--space-3);
      border-bottom: 1px solid var(--border-primary);
    }

    .category-icon {
      font-size: var(--font-size-2xl);
    }

    .skills-badges {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-3);
    }

    .skill-badge {
      padding: var(--space-3) var(--space-4);
      background: var(--bg-primary);
      border: 1px solid var(--accent-green);
      border-radius: var(--radius-md);
      font-size: var(--font-size-base);
      font-weight: var(--font-weight-medium);
      color: var(--accent-green);
      transition: all var(--duration-fast) var(--ease-out);
      cursor: default;
    }

    .skill-badge:hover {
      background: rgba(0, 255, 65, 0.1);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 255, 65, 0.2);
    }

    @media (max-width: 768px) {
      .skills-container {
        padding: var(--space-4);
      }

      .skill-badge {
        font-size: var(--font-size-sm);
        padding: var(--space-2) var(--space-3);
      }
    }
  `]
})
export class SkillsComponent {
  skillCategories = signal<SkillCategory[]>([
    {
      name: 'Cloud Platforms',
      icon: '☁️',
      skills: [
        { name: 'AWS', category: 'cloud' },
        { name: 'Azure', category: 'cloud' },
      ]
    },
    {
      name: 'Infrastructure as Code',
      icon: '🏗️',
      skills: [
        { name: 'Terraform', category: 'iac' },
        { name: 'Ansible', category: 'iac' },
        { name: 'CloudFormation', category: 'iac' }
      ]
    },
    {
      name: 'Container & Orchestration',
      icon: '🐳',
      skills: [
        { name: 'Kubernetes', category: 'container' },
        { name: 'Docker', category: 'container' },
        { name: 'Helm', category: 'container' }
      ]
    },
    {
      name: 'CI/CD',
      icon: '🔄',
      skills: [
        { name: 'Jenkins', category: 'cicd' },
        { name: 'GitHub Actions', category: 'cicd' },
        { name: 'ArgoCD', category: 'cicd' },
        { name: 'GitLab CI', category: 'cicd' }
      ]
    },
    {
      name: 'Observability',
      icon: '📊',
      skills: [
        { name: 'Prometheus', category: 'observability' },
        { name: 'Grafana', category: 'observability' },
        { name: 'Loki', category: 'observability' },
        { name: 'ELK Stack', category: 'observability' }
      ]
    },
    {
      name: 'Security & Secrets',
      icon: '🔐',
      skills: [
        { name: 'HashiCorp Vault', category: 'security' },
        { name: 'SOPS', category: 'security' }
      ]
    },
    {
      name: 'Programming & Scripting',
      icon: '💻',
      skills: [
        { name: 'Python', category: 'programming' },
        { name: 'Bash', category: 'programming' },
      ]
    },
    {
      name: 'Backend Frameworks',
      icon: '🔧',
      skills: [
        { name: 'Spring Boot', category: 'backend' },
        { name: 'Symfony', category: 'backend'},
        { name: 'REST APIs', category: 'backend' },
      ]
    },
    {
      name: 'Frontend Frameworks',
      icon: '⚛️',
      skills: [
        { name: 'Angular', category: 'frontend' },
      ]
    },
    {
      name: 'Databases & Caching',
      icon: '🗄️',
      skills: [
        { name: 'PostgreSQL', category: 'database' },
        { name: 'MySQL', category: 'database' },
        { name: 'MongoDB', category: 'database' },
        { name: 'Redis', category: 'caching' },
      ]
    },
    {
      name: 'Authentication',
      icon: '🔑',
      skills: [
        { name: 'Keycloak', category: 'auth' },
        { name: 'JWT', category: 'auth'}
      ]
    }
  ]);
}
