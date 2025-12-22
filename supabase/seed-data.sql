-- Elite DevOps Portfolio - Seed Data
-- Initial data for Ibrahim El Othmani's portfolio

-- ============================================
-- SEED EXPERIENCES
-- ============================================
INSERT INTO public.experiences (company, role, duration, technologies, responsibilities, metrics, order_index) VALUES
(
  'CloudSynk',
  'Cloud & DevOps Engineer',
  '2023 - Present',
  ARRAY['AWS', 'Azure', 'Terraform', 'Kubernetes', 'Jenkins', 'ArgoCD', 'Prometheus', 'Grafana', 'Python', 'Bash'],
  ARRAY[
    'Architected and deployed multi-region EKS clusters for microservices',
    'Implemented GitOps workflows using ArgoCD and Helm',
    'Built comprehensive observability stack with Prometheus, Grafana, and Loki',
    'Automated infrastructure provisioning reducing deployment time by 60%',
    'Designed and implemented CI/CD pipelines for 20+ applications',
    'Managed cloud costs and optimized resource utilization'
  ],
  '{"metrics": [
    {"label": "Deployment Time Reduction", "value": "-60%"},
    {"label": "System Uptime", "value": "99.9%"},
    {"label": "Annual Cost Savings", "value": "$50k+"},
    {"label": "Automation Coverage", "value": "95%"}
  ]}'::jsonb,
  1
),
(
  'NexaCore Solutions',
  'Full-Stack Engineer',
  '2021 - 2022',
  ARRAY['Angular', 'Spring Boot', 'Docker', 'PostgreSQL', 'AWS', 'GitHub Actions'],
  ARRAY[
    'Developed full-stack applications using Angular and Spring Boot',
    'Containerized applications and managed Docker deployments',
    'Set up CI/CD pipelines with GitHub Actions',
    'Implemented RESTful APIs and database optimization',
    'Collaborated with cross-functional teams on feature delivery'
  ],
  '{"metrics": [
    {"label": "Features Delivered", "value": "50+"},
    {"label": "API Performance Improvement", "value": "+40%"},
    {"label": "Team Size", "value": "8 people"}
  ]}'::jsonb,
  2
);

-- ============================================
-- SEED PROJECTS
-- ============================================
INSERT INTO public.projects (title, description, tech_stack, problem, solution, impact, order_index) VALUES
(
  'EKS Microservices Platform',
  'Production-grade Kubernetes platform on AWS EKS for microservices architecture',
  ARRAY['AWS EKS', 'Terraform', 'Helm', 'ArgoCD', 'Prometheus', 'Grafana'],
  'Legacy monolithic application causing slow deployments, poor scalability, and high operational overhead.',
  ARRAY[
    'Migrated monolith to microservices architecture on AWS EKS',
    'Infrastructure as Code with Terraform for repeatable deployments',
    'GitOps workflow using ArgoCD for automated application deployment',
    'Helm charts for standardized application packaging',
    'Horizontal Pod Autoscaler (HPA) for dynamic scaling'
  ],
  ARRAY[
    'Deployment time reduced from 2 hours to 10 minutes (92% improvement)',
    'Auto-scaling reduced compute costs by 40%',
    'Zero-downtime deployments achieved',
    'Team velocity increased by 3x'
  ],
  1
),
(
  'Multi-Cloud IaC Automation',
  'Unified infrastructure automation across AWS and Azure using Terraform modules',
  ARRAY['Terraform', 'AWS', 'Azure', 'Ansible', 'GitHub Actions', 'Vault'],
  'Manual infrastructure provisioning across multiple clouds leading to inconsistencies, errors, and slow setup times.',
  ARRAY[
    'Created reusable Terraform modules for common infrastructure patterns',
    'Implemented Terraform workspaces for environment separation',
    'Automated secret management with HashiCorp Vault',
    'CI/CD pipelines for infrastructure validation and deployment',
    'Configuration management with Ansible for post-provisioning setups'
  ],
  ARRAY[
    '95% of infrastructure now automated',
    'Provisioning time reduced from days to hours',
    'Eliminated 80% of manual configuration errors',
    'Enabled disaster recovery with infrastructure versioning'
  ],
  2
),
(
  'Observability & Monitoring Stack',
  'Comprehensive monitoring solution with Prometheus, Grafana, and Loki',
  ARRAY['Prometheus', 'Grafana', 'Loki', 'Alertmanager', 'Kubernetes', 'Python'],
  'Lack of visibility into system performance, slow incident response, and reactive firefighting.',
  ARRAY[
    'Deployed Prometheus for metrics collection from all services',
    'Built custom Grafana dashboards for real-time insights',
    'Implemented log aggregation with Loki',
    'Created custom exporters for business metrics',
    'Set up Alertmanager for intelligent alerting'
  ],
  ARRAY[
    'Mean Time to Detection (MTTD) reduced by 70%',
    'Proactive issue resolution before customer impact',
    '99.9% uptime achieved and maintained',
    'Enabled data-driven capacity planning'
  ],
  3
);

-- ============================================
-- SEED SKILLS
-- ============================================
INSERT INTO public.skills (name, category, proficiency, years_experience, order_index) VALUES
-- Cloud Platforms
('AWS', 'Cloud Platforms', 5, 4, 1),
('Azure', 'Cloud Platforms', 4, 2, 2),
('GCP', 'Cloud Platforms', 3, 1, 3),
-- Infrastructure as Code
('Terraform', 'Infrastructure as Code', 5, 3, 4),
('Ansible', 'Infrastructure as Code', 4, 2, 5),
('CloudFormation', 'Infrastructure as Code', 3, 1, 6),
-- Container & Orchestration
('Kubernetes', 'Container & Orchestration', 5, 3, 7),
('Docker', 'Container & Orchestration', 5, 4, 8),
('Helm', 'Container & Orchestration', 4, 2, 9),
-- CI/CD
('Jenkins', 'CI/CD', 4, 3, 10),
('GitHub Actions', 'CI/CD', 4, 2, 11),
('ArgoCD', 'CI/CD', 4, 2, 12),
('GitLab CI', 'CI/CD', 3, 1, 13),
-- Observability
('Prometheus', 'Observability', 4, 2, 14),
('Grafana', 'Observability', 4, 2, 15),
('Loki', 'Observability', 3, 1, 16),
('ELK Stack', 'Observability', 3, 1, 17),
-- Security & Secrets
('HashiCorp Vault', 'Security & Secrets', 4, 2, 18),
('SOPS', 'Security & Secrets', 3, 1, 19),
-- Programming & Scripting
('Python', 'Programming & Scripting', 4, 3, 20),
('Bash', 'Programming & Scripting', 5, 4, 21),
('Go', 'Programming & Scripting', 3, 1, 22);

-- ============================================
-- NOTE: CERTIFICATIONS
-- ============================================
-- No certifications to seed yet.
-- Add certifications manually via Supabase dashboard or SQL as earned.

-- Example format:
-- INSERT INTO public.certifications (name, issuer, date_earned, badge_url, credential_url, order_index) VALUES
-- ('AWS Certified Solutions Architect - Associate', 'Amazon Web Services', '2025-01-15', 'https://url-to-badge.png', 'https://credential-url', 1);
