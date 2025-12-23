import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing',
  imports: [CommonModule],
  template: `
    <div class="landing-container fade-in">
      <div class="landing-content">
        <!-- Profile Section -->
        <div class="profile-section">
          <div class="profile-image-wrapper">
            <img 
              src="/images/ibrahim.png" 
              alt="Ibrahim El Othmani - Cloud & DevOps Engineer"
              class="profile-image"
              (error)="onImageError($event)">
            <div class="image-border"></div>
          </div>

          <div class="profile-info">
            <h1 class="name-title">
              <span class="text-green mono">$</span> whoami
            </h1>
            <h2 class="name">Ibrahim El Othmani</h2>
            <p class="role text-blue">DevOps/Cloud Engineer</p>
            <p class="company text-secondary">💼 Open to Work | Remote Available</p>

            <div class="location-badge">
              <span class="location-icon">📍</span>
              <span>Tunisia 🇹🇳</span>
            </div>
          </div>
        </div>

        <!-- Bio Section -->
        <div class="bio-section">
          <h3 class="section-title mono text-green">$ cat ~/bio.txt</h3>
          <div class="bio-content">
            <p class="bio-text">
              <strong class="text-blue">DevOps/Cloud Engineer</strong> with a unique background: <strong>Civil Engineering degree (2020)</strong> 
              → Career transition to tech → Professional training at <strong class="text-green">2i Formation (2023-2024)</strong>. 
              I completed a <strong>DevOps internship at IBH Ibn Alhaytham (Aug-Oct 2024)</strong> and now work as a <strong class="text-green">freelance DevOps engineer</strong> serving international clients.
            </p>
            <p class="bio-text">
              I specialize in <strong class="text-green">Kubernetes orchestration</strong>, 
              <strong class="text-green">multi-cloud architecture</strong> (AWS, Azure), and <strong class="text-green">Infrastructure as Code</strong>. 
              My toolkit includes <span class="highlight">Terraform</span>, <span class="highlight">Ansible</span>, <span class="highlight">Docker</span>, 
              <span class="highlight">Jenkins</span>, and <span class="highlight">Prometheus/Grafana</span> for building automated, 
              scalable infrastructure solutions.
            </p>
            <p class="bio-text">
              From designing bridges in civil engineering to building bridges between development and operations, my mission is to 
              automate infrastructure, enable continuous delivery, and help teams ship faster with confidence. Currently seeking 
              <strong class="text-blue">full-time DevOps/Cloud opportunities</strong> where I can contribute to scaling cloud-native systems.
            </p>
          </div>

          <!-- Philosophy Quote -->
          <blockquote class="philosophy-quote">
            <span class="quote-icon text-green">"</span>
            <p class="mono">From Civil Engineering to Cloud Engineering.<br>Building bridges between code and infrastructure.</p>
            <span class="quote-icon text-green">"</span>
          </blockquote>
        </div>

        <!-- Quick Stats -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">⚡</div>
            <div class="stat-value text-green">1 Year</div>
            <div class="stat-label">DevOps Experience</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🚀</div>
            <div class="stat-value text-blue">6+</div>
            <div class="stat-label">DevOps Projects</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">☁️</div>
            <div class="stat-value text-purple">2</div>
            <div class="stat-label">Cloud Platforms</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">💼</div>
            <div class="stat-value text-green">Open</div>
            <div class="stat-label">To Work</div>
          </div>
        </div>

        <!-- CTA -->
        <div class="cta-section">
          <p class="cta-text text-secondary mono">
            👈 Explore the sidebar to dive into my projects, skills, and experience
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .landing-container {
      height: 100%;
      overflow-y: auto;
      padding: var(--space-8);
      background: var(--bg-primary);
    }

    .landing-content {
      max-width: 900px;
      margin: 0 auto;
    }

    .profile-section {
      display: flex;
      gap: var(--space-8);
      align-items: center;
      margin-bottom: var(--space-10);
      padding: var(--space-8);
      background: var(--bg-secondary);
      border: 1px solid var(--border-primary);
      border-radius: var(--radius-lg);
      position: relative;
      overflow: hidden;
    }

    .profile-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at top right, rgba(0, 255, 65, 0.05), transparent 70%);
      pointer-events: none;
    }

    .profile-image-wrapper {
      position: relative;
      flex-shrink: 0;
    }

    .profile-image {
      width: 200px;
      height: 200px;
      border-radius: var(--radius-lg);
      object-fit: cover;
      border: 3px solid var(--accent-green);
      box-shadow: 0 0 30px rgba(0, 255, 65, 0.3);
      position: relative;
      z-index: 1;
    }

    .image-border {
      position: absolute;
      top: -8px;
      left: -8px;
      right: -8px;
      bottom: -8px;
      border: 1px solid var(--accent-green);
      border-radius: var(--radius-lg);
      opacity: 0.3;
    }

    .profile-info {
      flex: 1;
      position: relative;
      z-index: 1;
    }

    .name-title {
      font-size: var(--font-size-base);
      margin-bottom: var(--space-2);
      opacity: 0.7;
    }

    .name {
      font-size: var(--font-size-4xl);
      font-weight: var(--font-weight-bold);
      margin-bottom: var(--space-2);
      color: var(--text-primary);
      text-shadow: 0 0 20px rgba(0, 255, 65, 0.2);
    }

    .role {
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-semibold);
      margin-bottom: var(--space-1);
    }

    .company {
      font-size: var(--font-size-lg);
      margin-bottom: var(--space-4);
    }

    .location-badge {
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
      padding: var(--space-2) var(--space-4);
      background: var(--bg-tertiary);
      border: 1px solid var(--border-primary);
      border-radius: var(--radius-full);
      font-size: var(--font-size-sm);
    }

    .bio-section {
      margin-bottom: var(--space-10);
    }

    .section-title {
      font-size: var(--font-size-xl);
      margin-bottom: var(--space-5);
      padding-bottom: var(--space-3);
      border-bottom: 2px solid var(--border-primary);
    }

    .bio-content {
      padding: var(--space-6);
      background: var(--bg-secondary);
      border: 1px solid var(--border-primary);
      border-radius: var(--radius-lg);
      margin-bottom: var(--space-6);
    }

    .bio-text {
      font-size: var(--font-size-base);
      line-height: var(--line-height-relaxed);
      color: var(--text-secondary);
      margin-bottom: var(--space-4);
    }

    .bio-text:last-child {
      margin-bottom: 0;
    }

    .highlight {
      color: var(--accent-green);
      font-weight: var(--font-weight-semibold);
      font-family: var(--font-mono);
    }

    .philosophy-quote {
      padding: var(--space-6);
      background: linear-gradient(135deg, rgba(0, 255, 65, 0.05), rgba(0, 217, 255, 0.05));
      border-left: 4px solid var(--accent-green);
      border-radius: var(--radius-md);
      position: relative;
      margin: 0;
    }

    .quote-icon {
      font-size: var(--font-size-4xl);
      line-height: 1;
    }

    .philosophy-quote p {
      margin: var(--space-3) 0;
      font-size: var(--font-size-lg);
      font-style: italic;
      color: var(--text-primary);
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--space-4);
      margin-bottom: var(--space-10);
    }

    .stat-card {
      padding: var(--space-5);
      background: var(--bg-secondary);
      border: 1px solid var(--border-inactive);
      border-radius: var(--radius-lg);
      text-align: center;
      transition: all var(--duration-fast) var(--ease-out);
    }

    .stat-card:hover {
      border-color: var(--accent-green);
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 255, 65, 0.15);
    }

    .stat-icon {
      font-size: var(--font-size-4xl);
      margin-bottom: var(--space-3);
    }

    .stat-value {
      font-size: var(--font-size-3xl);
      font-weight: var(--font-weight-bold);
      font-family: var(--font-mono);
      margin-bottom: var(--space-2);
    }

    .stat-label {
      font-size: var(--font-size-sm);
      color: var(--text-secondary);
    }

    .cta-section {
      text-align: center;
      padding: var(--space-6);
      background: var(--bg-secondary);
      border: 1px dashed var(--border-primary);
      border-radius: var(--radius-lg);
    }

    .cta-text {
      font-size: var(--font-size-base);
      margin: 0;
    }

    @media (max-width: 768px) {
      .landing-container {
        padding: var(--space-4);
      }

      .profile-section {
        flex-direction: column;
        text-align: center;
        padding: var(--space-6);
      }

      .profile-image {
        width: 150px;
        height: 150px;
      }

      .name {
        font-size: var(--font-size-2xl);
      }

      .role {
        font-size: var(--font-size-lg);
      }

      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .bio-content {
        padding: var(--space-4);
      }
    }
  `]
})
export class LandingComponent {
  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    // Fallback to a placeholder if image doesn't load
    img.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="%231a1a24"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%2300ff41" font-size="60">IEO</text></svg>';
  }
}
