import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  problem: string;
  solution: string[];
  impact: string[];
  github?: string;
}

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  template: `
    <div class="projects-container">
      <h2 class="page-title mono text-green">$ ls -la /projects/devops/</h2>
      
      <div class="projects-grid">
        @for (project of projects(); track project.id) {
          <div class="project-card">
            <!-- Project Header -->
            <div class="project-header">
              <h3 class="project-title text-blue">{{ project.title }}</h3>
              <p class="project-desc text-secondary">{{ project.description }}</p>
            </div>

            <!-- Tech Stack -->
            <div class="tech-stack-section">
              <h4 class="section-label mono text-green">Stack:</h4>
              <div class="tech-badges">
                @for (tech of project.techStack; track tech) {
                  <span class="tech-badge">{{ tech }}</span>
                }
              </div>
            </div>

            <!-- Problem Statement -->
            <div class="content-section">
              <h4 class="section-label mono">💡 Problem:</h4>
              <p class="content-text">{{ project.problem }}</p>
            </div>

            <!-- Solution -->
            <div class="content-section">
              <h4 class="section-label mono">🛠️ Solution:</h4>
              <ul class="solution-list">
                @for (item of project.solution; track item) {
                  <li>{{ item }}</li>
                }
              </ul>
            </div>

            <!-- Impact -->
            <div class="content-section">
              <h4 class="section-label mono">📈 Impact:</h4>
              <ul class="impact-list">
                @for (item of project.impact; track item) {
                  <li class="text-green">{{ item }}</li>
                }
              </ul>
            </div>

            <!-- Actions -->
            @if (project.github) {
              <div class="project-actions">
                <a [href]="project.github" target="_blank" class="btn-action mono">
                  🐙 View on GitHub
                </a>
              </div>
            }
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .projects-container {
      color: var(--text-primary);
    }

    .page-title {
      font-size: var(--font-size-2xl);
      margin-bottom: var(--space-6);
      padding-bottom: var(--space-3);
      border-bottom: 2px solid var(--border-primary);
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
      gap: var(--space-6);
    }

    .project-card {
      background: var(--bg-secondary);
      border: 1px solid var(--border-inactive);
      border-radius: var(--radius-lg);
      padding: var(--space-6);
      transition: all var(--duration-normal) var(--ease-out);
    }

    .project-card:hover {
      border-color: var(--accent-blue);
      box-shadow: 0 8px 24px rgba(0, 217, 255, 0.15);
      transform: translateY(-4px);
    }

    .project-header {
      margin-bottom: var(--space-5);
    }

    .project-title {
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-bold);
      margin-bottom: var(--space-2);
    }

    .project-desc {
      font-size: var(--font-size-base);
      line-height: var(--line-height-relaxed);
    }

    .tech-stack-section {
      margin-bottom: var(--space-5);
      padding-bottom: var(--space-4);
      border-bottom: 1px solid var(--border-primary);
    }

    .section-label {
      font-size: var(--font-size-sm);
      margin-bottom: var(--space-2);
      color: var(--accent-green);
    }

    .tech-badges {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
    }

    .tech-badge {
      padding: var(--space-1) var(--space-3);
      background: var(--bg-primary);
      border: 1px solid var(--accent-purple);
      border-radius: var(--radius-sm);
      font-size: var(--font-size-xs);
      font-family: var(--font-mono);
      color: var(--accent-purple);
    }

    .content-section {
      margin-bottom: var(--space-4);
    }

    .content-text {
      font-size: var(--font-size-sm);
      line-height: var(--line-height-relaxed);
      color: var(--text-secondary);
    }

    .solution-list,
    .impact-list {
      list-style: none;
      padding: 0;
      margin: 0;
      font-size: var(--font-size-sm);
    }

    .solution-list li,
    .impact-list li {
      padding: var(--space-1) 0;
      padding-left: var(--space-5);
      position: relative;
    }

    .solution-list li::before {
      content: '•';
      position: absolute;
      left: var(--space-2);
      color: var(--accent-blue);
    }

    .impact-list li::before {
      content: '✓';
      position: absolute;
      left: var(--space-2);
      color: var(--accent-green);
      font-weight: bold;
    }

    .project-actions {
      margin-top: var(--space-5);
      padding-top: var(--space-4);
      border-top: 1px solid var(--border-primary);
    }

    .btn-action {
      display: inline-block;
      padding: var(--space-2) var(--space-4);
      background: var(--bg-primary);
      border: 1px solid var(--accent-green);
      border-radius: var(--radius-md);
      color: var(--accent-green);
      text-decoration: none;
      font-size: var(--font-size-sm);
      transition: all var(--duration-fast) var(--ease-out);
    }

    .btn-action:hover {
      background: rgba(0, 255, 65, 0.1);
      transform: translateY(-2px);
      box-shadow: 0 0 12px rgba(0, 255, 65, 0.3);
    }

    @media (max-width: 768px) {
      .projects-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ProjectsComponent {
  projects = signal<Project[]>([
    {
      id: '1',
      title: 'AI-Powered Cybersecurity Threat Detection System',
      description: 'Comprehensive cybersecurity solution leveraging artificial intelligence to detect and mitigate real-time security threats through network traffic and system log analysis',
      techStack: ['TensorFlow', 'Python', 'Kubernetes', 'Docker', 'Prometheus', 'Grafana', 'Ansible', 'Terraform'],
      problem: 'Organizations face increasing sophisticated cyber threats that traditional signature-based detection systems fail to identify, leading to potential security breaches and data loss.',
      solution: [
        'Designed ML-based threat detection using TensorFlow for real-time network traffic analysis',
        'Implemented containerized microservices architecture on Kubernetes for scalability',
        'Created automated infrastructure deployment using Terraform and Ansible',
        'Built comprehensive monitoring stack with Prometheus and Grafana',
        'Developed CI/CD pipeline for continuous integration and deployment'
      ],
      impact: [
        'Real-time threat detection with ML-powered analysis',
        'Automated infrastructure provisioning reducing setup time by 70%',
        'Scalable architecture handling millions of events per second',
        'Production-ready monitoring and alerting system'
      ],
      github: 'https://github.com/ibrahimelothmani/AI-Powered-Cybersecurity-Threat-Detection-System'
    },
    {
      id: '2',
      title: 'Multi-Modal AI Agent Platform with RAG Integration',
      description: 'Advanced AI agent platform leveraging Retrieval-Augmented Generation (RAG) for intelligent data retrieval and decision-making with multi-modal capabilities',
      techStack: ['Java', 'Spring Boot', 'Langchain4J', 'OpenAI', 'RAG', 'Vector DB', 'PostgreSQL'],
      problem: 'Traditional AI systems struggle with domain-specific knowledge and often provide outdated or inaccurate information without proper context retrieval.',
      solution: [
        'Integrated Langchain4J for AI agent orchestration and workflow management',
        'Implemented Retrieval-Augmented Generation for enhanced context awareness',
        'Leveraged OpenAI models for natural language processing and embeddings',
        'Built vector database for efficient semantic search and retrieval',
        'Created multi-modal data processing for text, documents, and structured data'
      ],
      impact: [
        'Enhanced AI accuracy with domain-specific knowledge retrieval',
        'Reduced hallucinations through factual grounding',
        'Scalable architecture supporting multiple AI agents',
        'Efficient semantic search with vector embeddings'
      ],
      github: 'https://github.com/ibrahimelothmani/Multi-Modal-AI-Agent-Platform-with-RAG-Integration'
    },
    {
      id: '3',
      title: 'Online Shopping Application - Microservices Architecture',
      description: 'Full-stack e-commerce platform built with microservices architecture, featuring Spring Boot backend, Angular frontend, and complete DevOps pipeline',
      techStack: ['Spring Boot', 'Spring Cloud', 'Angular', 'Docker', 'Kubernetes', 'Prometheus', 'Grafana', 'PostgreSQL'],
      problem: 'Monolithic e-commerce systems suffer from scalability issues, difficult deployments, and inability to scale individual components independently.',
      solution: [
        'Architected microservices-based system with Spring Boot and Spring Cloud',
        'Implemented API Gateway for routing and load balancing',
        'Built reactive Angular frontend with modern UI/UX',
        'Containerized all services with Docker and orchestrated with Kubernetes',
        'Deployed monitoring stack with Prometheus and Grafana for observability'
      ],
      impact: [
        'Independent service scaling reducing costs by 40%',
        'Zero-downtime deployments with Kubernetes rolling updates',
        'Complete observability with metrics and distributed tracing',
        'Production-ready microservices architecture'
      ],
      github: 'https://github.com/ibrahimelothmani/Online-Shopping-Application'
    },
    {
      id: '4',
      title: 'AWS EKS Microservices Platform',
      description: 'Production-grade Kubernetes platform on AWS EKS with GitOps workflow and automated scaling for microservices architecture',
      techStack: ['AWS EKS', 'Terraform', 'Helm', 'ArgoCD', 'Prometheus', 'Grafana', 'Karpenter'],
      problem: 'Legacy monolithic application causing slow deployments, poor scalability, and high operational overhead with manual infrastructure management.',
      solution: [
        'Migrated monolith to microservices architecture on AWS EKS',
        'Infrastructure as Code with Terraform for repeatable deployments',
        'GitOps workflow using ArgoCD for automated application deployment',
        'Helm charts for standardized application packaging',
        'Implemented Karpenter for intelligent cluster autoscaling'
      ],
      impact: [
        'Deployment time reduced from 2 hours to 10 minutes (92% improvement)',
        'Auto-scaling reduced compute costs by 40%',
        'Zero-downtime deployments achieved',
        'Team velocity increased by 3x'
      ]
    },
    {
      id: '5',
      title: 'Multi-Cloud Infrastructure Automation',
      description: 'Unified infrastructure automation across AWS and Azure using reusable Terraform modules and GitOps practices',
      techStack: ['Terraform', 'AWS', 'Azure', 'Ansible', 'GitHub Actions', 'Vault', 'Atlantis'],
      problem: 'Manual infrastructure provisioning across multiple clouds leading to inconsistencies, configuration drift, and slow environment setup times.',
      solution: [
        'Created reusable Terraform modules for common infrastructure patterns',
        'Implemented Terraform workspaces for environment separation (dev/staging/prod)',
        'Automated secret management with HashiCorp Vault',
        'CI/CD pipelines with Atlantis for infrastructure validation and deployment',
        'Configuration management with Ansible for post-provisioning automation'
      ],
      impact: [
        '95% of infrastructure now automated and version-controlled',
        'Provisioning time reduced from days to hours',
        'Eliminated 80% of manual configuration errors',
        'Enabled disaster recovery with infrastructure as code'
      ]
    },
    {
      id: '6',
      title: 'Observability & Monitoring Stack',
      description: 'Comprehensive monitoring and observability solution with Prometheus, Grafana, and Loki for production systems',
      techStack: ['Prometheus', 'Grafana', 'Loki', 'Alertmanager', 'Kubernetes', 'Python', 'Thanos'],
      problem: 'Lack of visibility into system performance, slow incident response times, and reactive firefighting instead of proactive monitoring.',
      solution: [
        'Deployed Prometheus for metrics collection from all services and infrastructure',
        'Built custom Grafana dashboards for real-time insights and business metrics',
        'Implemented centralized log aggregation with Loki',
        'Created custom exporters for application-specific metrics',
        'Set up Alertmanager with intelligent routing and PagerDuty integration'
      ],
      impact: [
        'Mean Time to Detection (MTTD) reduced by 70%',
        'Proactive issue resolution before customer impact',
        '99.9% uptime achieved and maintained',
        'Enabled data-driven capacity planning and optimization'
      ]
    }
  ]);
}
