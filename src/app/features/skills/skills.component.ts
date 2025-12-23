import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill {
  name: string;
  category: string;
  proficiency: number; // 1-5
  yearsExperience: number;
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
            
            <div class="skills-grid">
              @for (skill of category.skills; track skill.name) {
                <div class="skill-item">
                  <div class="skill-header">
                    <span class="skill-name">{{ skill.name }}</span>
                    <span class="skill-years text-secondary">({{ skill.yearsExperience }}y)</span>
                  </div>
                  <div class="skill-bar">
                    <div class="skill-fill" [style.width.%]="skill.proficiency * 20"></div>
                  </div>
                  <div class="skill-level text-sm">
                    {{ getProficiencyLabel(skill.proficiency) }}
                  </div>
                </div>
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
      gap: var(--space-8);
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
      margin-bottom: var(--space-5);
      padding-bottom: var(--space-3);
      border-bottom: 1px solid var(--border-primary);
    }

    .category-icon {
      font-size: var(--font-size-2xl);
    }

    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: var(--space-4);
    }

    .skill-item {
      padding: var(--space-4);
      background: var(--bg-primary);
      border: 1px solid var(--border-inactive);
      border-radius: var(--radius-md);
      transition: all var(--duration-fast) var(--ease-out);
    }

    .skill-item:hover {
      border-color: var(--accent-green);
      transform: translateY(-2px);
    }

    .skill-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--space-2);
    }

    .skill-name {
      font-weight: var(--font-weight-semibold);
      font-size: var(--font-size-base);
    }

    .skill-years {
      font-size: var(--font-size-xs);
    }

    .skill-bar {
      height: 8px;
      background: var(--bg-tertiary);
      border-radius: var(--radius-full);
      overflow: hidden;
      margin-bottom: var(--space-2);
    }

    .skill-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--accent-green), var(--accent-blue));
      border-radius: var(--radius-full);
      transition: width var(--duration-slow) var(--ease-out);
    }

    .skill-level {
      text-align: right;
      color: var(--text-secondary);
    }

    @media (max-width: 768px) {
      .skills-grid {
        grid-template-columns: 1fr;
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
        { name: 'AWS', category: 'cloud', proficiency: 2, yearsExperience: 1 },
        { name: 'Azure', category: 'cloud', proficiency: 2, yearsExperience: 1 },
      ]
    },
    {
      name: 'Infrastructure as Code',
      icon: '🏗️',
      skills: [
        { name: 'Terraform', category: 'iac', proficiency: 2, yearsExperience: 1 },
        { name: 'Ansible', category: 'iac', proficiency: 2, yearsExperience: 1 },
        { name: 'CloudFormation', category: 'iac', proficiency: 2, yearsExperience: 1 }
      ]
    },
    {
      name: 'Container & Orchestration',
      icon: '🐳',
      skills: [
        { name: 'Kubernetes', category: 'container', proficiency: 2, yearsExperience: 1 },
        { name: 'Docker', category: 'container', proficiency: 2, yearsExperience: 1 },
        { name: 'Helm', category: 'container', proficiency: 2, yearsExperience: 1 }
      ]
    },
    {
      name: 'CI/CD',
      icon: '🔄',
      skills: [
        { name: 'Jenkins', category: 'cicd', proficiency: 2, yearsExperience: 1 },
        { name: 'GitHub Actions', category: 'cicd', proficiency: 2, yearsExperience: 1 },
        { name: 'ArgoCD', category: 'cicd', proficiency: 2, yearsExperience: 1 },
        { name: 'GitLab CI', category: 'cicd', proficiency: 2, yearsExperience: 1 }
      ]
    },
    {
      name: 'Observability',
      icon: '📊',
      skills: [
        { name: 'Prometheus', category: 'observability', proficiency: 2, yearsExperience: 1 },
        { name: 'Grafana', category: 'observability', proficiency: 2, yearsExperience: 1 },
        { name: 'Loki', category: 'observability', proficiency: 2, yearsExperience: 1 },
        { name: 'ELK Stack', category: 'observability', proficiency: 2, yearsExperience: 1 }
      ]
    },
    {
      name: 'Security & Secrets',
      icon: '🔐',
      skills: [
        { name: 'HashiCorp Vault', category: 'security', proficiency: 2, yearsExperience: 1 },
        { name: 'SOPS', category: 'security', proficiency: 2, yearsExperience: 1 }
      ]
    },
    {
      name: 'Programming & Scripting',
      icon: '💻',
      skills: [
        { name: 'Python', category: 'programming', proficiency: 2, yearsExperience: 1 },
        { name: 'Bash', category: 'programming', proficiency: 2, yearsExperience: 1 },
      ]
    }
  ]);

  getProficiencyLabel(level: number): string {
   const labels = ['Beginner', 'Intermediate', 'Advanced', 'Expert', 'Master'];
    return labels[level - 1] || 'Unknown';
  }
}
