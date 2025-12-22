import { Component, signal, computed, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowManagerService } from '../../services/window-manager.service';

@Component({
  selector: 'app-taskbar',
  imports: [CommonModule],
  template: `
    <div class="taskbar taskbar-enter">
      <!-- Left Section - App Menu -->
      <div class="taskbar-left">
        <button class="taskbar-btn menu-btn mono" (click)="onToggleSidebar()" aria-label="Toggle Menu">
          <span class="text-green">☰</span>
        </button>
        
        <div class="taskbar-apps">
          @for (window of windowManager.openWindows(); track window.id) {
            <button
              class="taskbar-app-btn"
              [class.active]="window.focused"
              [class.minimized]="window.minimized"
              (click)="toggleWindow(window.id)"
              [attr.aria-label]="window.title">
              <span class="app-icon">{{ getAppIcon(window.id) }}</span>
              <span class="app-name">{{ window.title }}</span>
            </button>
          }
        </div>
      </div>

      <!-- Right Section - System Tray -->
      <div class="taskbar-right">
        <!-- System Stats (Aesthetic) -->
        <div class="system-stats mono text-xs">
          <span class="stat-item text-green">CPU: {{ cpuUsage() }}%</span>
          <span class="stat-item text-blue">RAM: {{ ramUsage() }}%</span>
        </div>

        <!-- Theme Toggle -->
        <button 
          class="taskbar-btn theme-btn"
          (click)="toggleTheme()"
          [attr.aria-label]="'Switch to ' + (currentTheme() === 'dark' ? 'light' : 'dark') + ' theme'">
          <span>{{ currentTheme() === 'dark' ? '🌙' : '☀️' }}</span>
        </button>

        <!-- Clock -->
        <div class="clock mono text-sm">
          <span>{{ currentTime() }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .taskbar {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: var(--taskbar-height);
      background: var(--bg-taskbar);
      backdrop-filter: var(--backdrop-blur);
      border-top: 1px solid var(--border-primary);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 var(--space-4);
      z-index: var(--z-taskbar);
      box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.4);
    }

    .taskbar-left {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      flex: 1;
      overflow-x: auto;
      overflow-y: hidden;
    }

    .taskbar-right {
      display: flex;
      align-items: center;
      gap: var(--space-4);
    }

    .taskbar-btn {
      min-width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: 1px solid var(--border-primary);
      border-radius: var(--radius-md);
      color: var(--text-primary);
      font-size: var(--font-size-lg);
      cursor: pointer;
      transition: all var(--duration-fast) var(--ease-out);
      padding: 0 var(--space-3);
    }

    .taskbar-btn:hover {
      background: var(--bg-tertiary);
      border-color: var(--accent-green);
      transform: translateY(-2px);
    }

    .menu-btn {
      font-size: var(--font-size-2xl);
      font-weight: var(--font-weight-bold);
    }

    .taskbar-apps {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      overflow-x: auto;
      flex: 1;
    }

    .taskbar-app-btn {
      height: 40px;
      display: flex;
      align-items: center;
      gap: var(--space-2);
      padding: 0 var(--space-3);
      background: var(--bg-tertiary);
      border: 1px solid var(--border-inactive);
      border-radius: var(--radius-md);
      color: var(--text-secondary);
      cursor: pointer;
      transition: all var(--duration-fast) var(--ease-out);
      white-space: nowrap;
    }

    .taskbar-app-btn:hover {
      border-color: var(--accent-blue);
      background: var(--bg-secondary);
      transform: translateY(-2px);
    }

    .taskbar-app-btn.active {
      border-color: var(--accent-green);
      background: var(--bg-secondary);
      box-shadow: 0 0 8px rgba(0, 255, 65, 0.3);
    }

    .taskbar-app-btn.active .app-name {
      color: var(--text-primary);
    }

    .taskbar-app-btn.minimized {
      opacity: 0.6;
    }

    .app-icon {
      font-size: var(--font-size-lg);
    }

    .app-name {
      font-size: var(--font-size-sm);
      max-width: 120px;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .system-stats {
      display: flex;
      gap: var(--space-3);
    }

    .stat-item {
      padding: var(--space-1) var(--space-2);
      background: var(--bg-tertiary);
      border-radius: var(--radius-sm);
      border: 1px solid var(--border-primary);
    }

    .clock {
      padding: var(--space-2) var(--space-3);
      background: var(--bg-tertiary);
      border: 1px solid var(--border-primary);
      border-radius: var(--radius-md);
      color: var(--accent-green);
      min-width: 70px;
      text-align: center;
    }

    @media (max-width: 768px) {
      .taskbar {
        padding: 0 var(--space-2);
        height: 48px;
      }

      .taskbar-btn {
        min-width: 36px;
        height: 36px;
        padding: 0 var(--space-2);
      }

      .taskbar-app-btn {
        height: 36px;
        padding: 0 var(--space-2);
      }

      .app-name {
        display: none;
      }

      .system-stats {
        display: none;
      }

      .clock {
        font-size: var(--font-size-xs);
        min-width: 50px;
        padding: var(--space-1) var(--space-2);
      }

      .theme-btn {
        font-size: var(--font-size-base);
      }
    }

    @media (max-width: 480px) {
      .taskbar {
        height: 44px;
      }

      .taskbar-left {
        gap: var(--space-2);
      }

      .taskbar-right {
        gap: var(--space-2);
      }

      .menu-btn {
        display: none;
      }
    }
  `]
})
export class TaskbarComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  
  currentTime = signal('');
  currentTheme = signal('dark');
  
  // Fake system stats for aesthetic purposes
  cpuUsage = signal(Math.floor(Math.random() * 30) + 10);
  ramUsage = signal(Math.floor(Math.random() * 40) + 30);

  constructor(public windowManager: WindowManagerService) {
    this.updateTime();
    this.updateSystemStats();
  }

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  private updateTime(): void {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      this.currentTime.set(`${hours}:${minutes}`);
    };
    
    updateClock();
    setInterval(updateClock, 1000);
  }

  private updateSystemStats(): void {
    setInterval(() => {
      // Simulate fluctuating system stats for visual effect
      this.cpuUsage.set(Math.floor(Math.random() * 30) + 10);
      this.ramUsage.set(Math.floor(Math.random() * 40) + 30);
    }, 3000);
  }

  getAppIcon(appId: string): string {
    const icons: { [key: string]: string } = {
      about: '👤',
      experience: '💼',
      projects: '🚀',
      skills: '⚡',
      certifications: '🏆',
      terminal: '💻',
      contact: '📧',
    };
    return icons[appId] || '📁';
  }

  toggleWindow(windowId: string): void {
    const windows = this.windowManager.openWindows();
    const window = windows.find(w => w.id === windowId);
    
    if (window?.minimized) {
      this.windowManager.restoreWindow(windowId);
    } else if (window?.focused) {
      this.windowManager.minimizeWindow(windowId);
    } else {
      this.windowManager.focusWindow(windowId);
    }
  }

  toggleTheme(): void {
    const newTheme = this.currentTheme() === 'dark' ? 'light' : 'dark';
    this.currentTheme.set(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  }
}
