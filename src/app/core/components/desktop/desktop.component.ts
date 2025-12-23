import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowComponent } from '../window/window.component';
import { TaskbarComponent } from '../taskbar/taskbar.component';
import { WindowManagerService, WindowState } from '../../services/window-manager.service';
import { LandingComponent } from '../../../features/landing/landing.component';

@Component({
  selector: 'app-desktop',
  imports: [CommonModule, WindowComponent, TaskbarComponent, LandingComponent],
  template: `
    <div class="desktop-container scanline-bg crt-effect fade-in">
      <!-- Desktop Wallpaper -->
      <div class="desktop-wallpaper"></div>
      
      <!-- Left Sidebar Navigation -->
      <aside class="sidebar" [class.sidebar-hidden]="!sidebarVisible()" role="navigation" aria-label="Main Navigation">
        <div class="sidebar-header">
          <h2 class="mono text-green">DevOps OS</h2>
          <p class="sidebar-subtitle text-secondary">v2024.12</p>
        </div>
        
        <nav class="sidebar-menu">
          @for (icon of desktopIcons; track icon.id; let idx = $index) {
            <button
              class="menu-item slide-up"
              [class.active]="isAppOpen(icon.id)"
              [style.animation-delay.ms]="idx * 50"
              (click)="openApp(icon.id)"
              [attr.aria-label]="'Open ' + icon.label">
              <span class="menu-icon">{{ icon.emoji }}</span>
              <div class="menu-content">
                <span class="menu-label">{{ icon.label }}</span>
                @if (isAppOpen(icon.id)) {
                  <span class="status-dot"></span>
                }
              </div>
            </button>
          }
        </nav>

        <div class="sidebar-footer mono text-xs text-secondary">
          <p>{{ openWindowCount() }} apps running</p>
        </div>
      </aside>

      <!-- Main Content Area (Landing Page) -->
      <div class="main-content" [class.main-content-expanded]="!sidebarVisible()">
        @if (windowManager.openWindows().length === 0) {
          <app-landing></app-landing>
        }
      </div>

      <!-- Windows Container (separate from main content) -->
      <div class="windows-container" [class.windows-expanded]="!sidebarVisible()">
        @for (window of windowManager.openWindows(); track window.id) {
          <app-window
            [windowState]="window"
            (onClose)="closeWindow(window.id)"
            (onMinimize)="minimizeWindow(window.id)"
            (onMaximize)="maximizeWindow(window.id)"
            (onFocus)="focusWindow(window.id)">
          </app-window>
        }
      </div>

      <!-- Taskbar -->
      <app-taskbar (toggleSidebar)="toggleSidebarVisibility()"></app-taskbar>

      <!-- Boot Message (fades out after 2s) -->
      @if (showBootMessage()) {
        <div class="boot-message fade-in">
          <span class="mono text-green">devops-os v2024.12 initialized...</span>
        </div>
      }
    </div>
  `,
  styles: [`
    .desktop-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: var(--bg-primary);
      overflow: hidden;
      display: flex;
    }

    .desktop-wallpaper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: 
        radial-gradient(circle at 60% 50%, rgba(0, 217, 255, 0.08) 0%, transparent 50%),
        radial-gradient(circle at 90% 30%, rgba(0, 255, 65, 0.06) 0%, transparent 50%),
        var(--bg-primary);
      z-index: 0;
    }

    /* Sidebar Styles */
    .sidebar {
      position: fixed;
      top: 0;
      left: 0;
      width: 280px;
      height: calc(100vh - var(--taskbar-height));
      background: var(--bg-secondary);
      border-right: 1px solid var(--border-primary);
      display: flex;
      flex-direction: column;
      z-index: var(--z-sidebar);
      overflow: hidden;
      animation: slide-from-left var(--duration-normal) var(--ease-out);
      transition: transform var(--duration-normal) var(--ease-out);
    }

    .sidebar-hidden {
      transform: translateX(-100%);
    }

    .main-content-expanded {
      left: 0 !important;
      width: 100vw !important;
      transition: all var(--duration-normal) var(--ease-out);
    }

    .windows-expanded {
      left: 0 !important;
      width: 100vw !important;
      transition: all var(--duration-normal) var(--ease-out);
    }

    @keyframes slide-from-left {
      from {
        transform: translateX(-100%);
      }
      to {
        transform: translateX(0);
      }
    }

    .sidebar-header {
      padding: var(--space-6) var(--space-5);
      border-bottom: 1px solid var(--border-primary);
      background: var(--bg-primary);
    }

    .sidebar-header h2 {
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-bold);
      margin: 0 0 var(--space-1) 0;
      text-shadow: 0 0 10px rgba(0, 255, 65, 0.5);
    }

    .sidebar-subtitle {
      font-size: var(--font-size-xs);
      margin: 0;
      font-family: var(--font-mono);
    }

    .sidebar-menu {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      padding: var(--space-4) 0;
      scrollbar-width: thin;
      scrollbar-color: var(--accent-green) var(--bg-primary);
    }

    .sidebar-menu::-webkit-scrollbar {
      width: 6px;
    }

    .sidebar-menu::-webkit-scrollbar-track {
      background: var(--bg-primary);
    }

    .sidebar-menu::-webkit-scrollbar-thumb {
      background: var(--accent-green);
      border-radius: var(--radius-full);
    }

    .menu-item {
      width: 100%;
      display: flex;
      align-items: center;
      gap: var(--space-4);
      padding: var(--space-4) var(--space-5);
      background: transparent;
      border: none;
      border-left: 3px solid transparent;
      color: var(--text-primary);
      cursor: pointer;
      transition: all var(--duration-fast) var(--ease-out);
      font-family: var(--font-mono);
      text-align: left;
      position: relative;
    }

    .menu-item:hover {
      background: rgba(0, 255, 65, 0.05);
      border-left-color: var(--accent-green);
      padding-left: calc(var(--space-5) + var(--space-1));
    }

    .menu-item.active {
      background: rgba(0, 255, 65, 0.1);
      border-left-color: var(--accent-green);
      box-shadow: inset 0 0 20px rgba(0, 255, 65, 0.1);
    }

    .menu-icon {
      font-size: var(--font-size-3xl);
      flex-shrink: 0;
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--bg-tertiary);
      border-radius: var(--radius-md);
      border: 1px solid var(--border-primary);
      transition: all var(--duration-fast) var(--ease-out);
    }

    .menu-item:hover .menu-icon {
      border-color: var(--accent-green);
      box-shadow: 0 0 12px rgba(0, 255, 65, 0.3);
      transform: scale(1.05);
    }

    .menu-item.active .menu-icon {
      border-color: var(--accent-green);
      box-shadow: 0 0 16px rgba(0, 255, 65, 0.4);
    }

    .menu-content {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .menu-label {
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-medium);
      color: var(--text-primary);
    }

    .status-dot {
      width: 8px;
      height: 8px;
      background: var(--accent-green);
      border-radius: var(--radius-full);
      animation: glow-pulse 2s ease-in-out infinite;
    }

    .sidebar-footer {
      padding: var(--space-4) var(--space-5);
      border-top: 1px solid var(--border-primary);
      background: var(--bg-primary);
    }

    .sidebar-footer p {
      margin: 0;
    }

    /* Main Content Area */
    .main-content {
      position: fixed;
      top: 0;
      left: 280px;
      width: calc(100vw - 280px);
      height: calc(100vh - var(--taskbar-height));
      overflow: auto;
      z-index: var(--z-base);
    }

    /* Windows Container */
    .windows-container {
      position: fixed;
      top: 0;
      left: 280px;
      width: calc(100vw - 280px);
      height: calc(100vh - var(--taskbar-height));
      z-index: var(--z-window);
      pointer-events: none;
    }

    .windows-container > * {
      pointer-events: all;
    }

    .boot-message {
      position: fixed;
      bottom: calc(var(--taskbar-height) + var(--space-4));
      right: var(--space-6);
      padding: var(--space-3) var(--space-4);
      background: var(--bg-tertiary);
      border: 1px solid var(--accent-green);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-glow);
      z-index: var(--z-modal);
      animation: fade-out var(--duration-slow) ease-out 2s forwards;
    }

    /* Responsive Design */
    /* Tablet: 768px - 1024px */
    @media (max-width: 1024px) {
      .sidebar {
        width: 200px;
      }

      .main-content {
        left: 200px;
        width: calc(100vw - 200px);
      }

      .windows-container {
        left: 200px;
        width: calc(100vw - 200px);
      }

      .window {
        max-width: 90vw !important;
        max-height: 90vh !important;
      }
    }

    /* Mobile: < 768px */
    @media (max-width: 768px) {
      /* Hide sidebar by default on mobile */
      .sidebar {
        position: fixed;
        width: 280px;
        transform: translateX(-100%);
        transition: transform 0.3s ease;
        z-index: 1000;
        box-shadow: 2px 0 8px rgba(0, 0, 0, 0.3);
      }

      .sidebar:not(.sidebar-hidden) {
        transform: translateX(0);
      }

      /* Add backdrop when sidebar is open */
      .sidebar:not(.sidebar-hidden)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 280px;
        width: calc(100vw - 280px);
        height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        z-index: -1;
      }

      /* Main content fills screen on mobile */
      .main-content {
        left: 0 !important;
        width: 100vw !important;
      }

      /* Windows fill screen on mobile */
      .windows-container {
        left: 0 !important;
        width: 100vw !important;
      }

      .window {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: calc(100vh - var(--taskbar-height)) !important;
        max-width: 100vw !important;
        max-height: calc(100vh - var(--taskbar-height)) !important;
        border-radius: 0 !important;
        transform: none !important;
      }

      .window-header {
        cursor: default;
        -webkit-user-select: none;
        user-select: none;
      }

      /* Adjust menu items for touch */
      .menu-item {
        padding: var(--space-4);
        min-height: 56px;
      }

      .menu-icon {
        width: 44px;
        height: 44px;
        font-size: var(--font-size-3xl);
      }

      .menu-label {
        font-size: var(--font-size-sm);
      }
    }

    /* Small Mobile: < 480px */
    @media (max-width: 480px) {
      /* Icon-only sidebar */
      .sidebar {
        width: 72px;
      }

      .sidebar::before {
        left: 72px !important;
        width: calc(100vw - 72px) !important;
      }

      /* Hide text labels */
      .sidebar-header h2,
      .sidebar-subtitle,
      .menu-label,
      .sidebar-footer {
        display: none;
      }

      .menu-item {
        justify-content: center;
        padding: var(--space-3);
        min-height: 64px;
      }

      .menu-content {
        display: none;
      }

      .menu-icon {
        width: 48px;
        height: 48px;
        font-size: 28px;
      }

      /* Taskbar adjustments */
      .taskbar {
        padding: 0 var(--space-2);
      }
    }
  `]
})
export class DesktopComponent {
  showBootMessage = signal(true);
  sidebarVisible = signal(true);

  desktopIcons = [
    { id: 'about', label: 'About.app', emoji: '👤' },
    { id: 'experience', label: 'Experience.app', emoji: '💼' },
    { id: 'projects', label: 'Projects.app', emoji: '🚀' },
    { id: 'skills', label: 'Skills.app', emoji: '⚡' },
    { id: 'certifications', label: 'Certifications.app', emoji: '🏆' },
    { id: 'terminal', label: 'Terminal.app', emoji: '💻' },
    { id: 'contact', label: 'Contact.app', emoji: '📧' },
  ];

  constructor(public windowManagerService: WindowManagerService) {
    // Hide boot message after 2 seconds
    setTimeout(() => {
      this.showBootMessage.set(false);
    }, 2000);
  }

  get windowManager() {
    return this.windowManagerService;
  }

  toggleSidebarVisibility(): void {
    this.sidebarVisible.set(!this.sidebarVisible());
  }

  openApp(appId: string): void {
    this.windowManagerService.openWindow(appId);
  }

  closeWindow(windowId: string): void {
    this.windowManagerService.closeWindow(windowId);
  }

  minimizeWindow(windowId: string): void {
    this.windowManagerService.minimizeWindow(windowId);
  }

  maximizeWindow(windowId: string): void {
    this.windowManagerService.maximizeWindow(windowId);
  }

  focusWindow(windowId: string): void {
    this.windowManagerService.focusWindow(windowId);
  }

  isAppOpen(appId: string): boolean {
    return this.windowManager.openWindows().some(w => w.id === appId);
  }

  openWindowCount(): number {
    return this.windowManager.openWindows().length;
  }
}
