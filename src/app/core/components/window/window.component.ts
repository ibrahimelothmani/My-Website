import { Component, Input, Output, EventEmitter, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { WindowState } from '../../services/window-manager.service';

// Feature App Imports
import { AboutComponent } from '../../../features/about/about.component';
import { ExperienceComponent } from '../../../features/experience/experience.component';
import { ProjectsComponent } from '../../../features/projects/projects.component';
import { SkillsComponent } from '../../../features/skills/skills.component';
import { EducationComponent } from '../../../features/education/education.component';
import { CertificationsComponent } from '../../../features/certifications/certifications.component';
import { TerminalComponent } from '../../../features/terminal/terminal.component';
import { ContactComponent } from '../../../features/contact/contact.component';

@Component({
  selector: 'app-window',
  imports: [
    CommonModule, 
    CdkDrag, 
    CdkDragHandle,
    AboutComponent,
    ExperienceComponent,
    ProjectsComponent,
    SkillsComponent,
    EducationComponent,
    CertificationsComponent,
    TerminalComponent,
    ContactComponent
  ],
  template: `
    <div 
      class="window-container window-enter"
      [class.window-minimized]="windowState.minimized"
      [class.window-maximized]="windowState.maximized"
      [class.window-focused]="windowState.focused"
      [style.z-index]="windowState.zIndex"
      [style.width.px]="windowWidth()"
      [style.height.px]="windowHeight()"
      cdkDrag
      [cdkDragDisabled]="windowState.maximized"
      (cdkDragStarted)="onDragStart()"
      (click)="handleFocus()">
      
      <!-- Title Bar -->
      <div class="window-titlebar" cdkDragHandle>
        <div class="window-title mono text-sm">
          <span class="title-icon">{{ getAppIcon() }}</span>
          <span>{{ windowState.title }}</span>
        </div>
        
        <div class="window-controls">
          <button 
            class="control-btn minimize-btn"
            (click)="handleMinimize($event)"
            aria-label="Minimize">
            <span>─</span>
          </button>
          <button 
            class="control-btn close-btn"
            (click)="handleClose($event)"
            aria-label="Close">
            <span>✕</span>
          </button>
        </div>
      </div>

      <!-- Window Content -->
      <div class="window-content">
        @switch (windowState.id) {
          @case ('about') {
            <app-about></app-about>
          }
          @case ('experience') {
            <app-experience></app-experience>
          }
          @case ('projects') {
            <app-projects></app-projects>
          }
          @case ('skills') {
            <app-skills></app-skills>
          }
          @case ('education') {
            <app-education></app-education>
          }
          @case ('certifications') {
            <app-certifications></app-certifications>
          }
          @case ('terminal') {
            <app-terminal></app-terminal>
          }
          @case ('contact') {
            <app-contact></app-contact>
          }
          @default {
            <div class="placeholder-content mono text-green">
              <p>{{ windowState.id }}.app</p>
              <p class="text-secondary text-sm">Module loaded</p>
            </div>
          }
        }
      </div>
    </div>
  `,
  styles: [`
    .window-container {
      position: absolute;
      display: flex;
      flex-direction: column;
      background: var(--bg-window);
      backdrop-filter: var(--backdrop-blur);
      border: 1px solid var(--border-inactive);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-window);
      overflow: hidden;
      transition: all var(--duration-fast) var(--ease-out);
      min-width: var(--window-min-width);
      min-height: var(--window-min-height);
    }

    .window-container:not(.window-maximized) {
      top: 100px;
      left: 40px;
    }

    .window-minimized {
      display: none;
    }

    .window-maximized {
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
      border-radius: 0;
      transform: none !important;
    }

    .window-focused {
      border-color: var(--border-active);
      box-shadow: var(--shadow-window), var(--shadow-glow);
      z-index: var(--z-window-active);
    }

    .window-titlebar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: var(--window-titlebar-height);
      padding: 0 var(--space-4);
      background: var(--bg-secondary);
      border-bottom: 1px solid var(--border-primary);
      cursor: move;
      user-select: none;
    }

    .window-title {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      color: var(--text-primary);
      font-weight: var(--font-weight-medium);
    }

    .title-icon {
      font-size: var(--font-size-lg);
    }

    .window-controls {
      display: flex;
      gap: var(--space-2);
    }

    .control-btn {
      width: 32px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: 1px solid var(--border-primary);
      border-radius: var(--radius-sm);
      color: var(--text-secondary);
      font-size: var(--font-size-sm);
      cursor: pointer;
      transition: all var(--duration-fast) var(--ease-out);
    }

    .control-btn:hover {
      background: var(--border-primary);
      transform: translateY(-1px);
    }

    .minimize-btn:hover {
      border-color: var(--accent-yellow);
      color: var(--accent-yellow);
    }

    .maximize-btn:hover {
      border-color: var(--accent-green);
      color: var(--accent-green);
    }

    .close-btn:hover {
      border-color: var(--accent-red);
      color: var(--accent-red);
      background: rgba(255, 0, 85, 0.1);
    }

    .window-content {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      padding: var(--space-6);
      position: relative;
    }

    .placeholder-content {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 200px;
      text-align: center;
    }

    /* Drag cursor */
    .cdk-drag-dragging {
      cursor: grabbing !important;
    }

    .cdk-drag-dragging .window-titlebar {
      cursor: grabbing !important;
    }

    @media (max-width: 1024px) {
      .window-container:not(.window-maximized) {
        max-width: 85vw !important;
        max-height: 75vh !important;
      }
    }

    @media (max-width: 768px) {
      .window-container:not(.window-maximized) {
        top: 60px !important;
        left: 20px !important;
        transform: none;
        width: calc(100% - 40px) !important;
        max-width: calc(100% - 40px) !important;
        max-height: calc(100vh - var(--taskbar-height) - 80px);
      }

      .window-titlebar {
        cursor: default;
        height: 36px;
        padding: 0 var(--space-3);
      }

      .window-title {
        font-size: var(--font-size-xs);
      }

      .control-btn {
        width: 28px;
        height: 22px;
        font-size: var(--font-size-xs);
      }

      .window-content {
        padding: var(--space-4);
      }
    }

    @media (max-width: 480px) {
      .window-container:not(.window-maximized) {
        left: 10px !important;
        width: calc(100% - 20px) !important;
        max-width: calc(100% - 20px) !important;
      }

      .control-btn {
        width: 26px;
        height: 20px;
      }

      .title-icon {
        display: none;
      }

      .window-content {
        padding: var(--space-3);
      }
    }
  `]
})
export class WindowComponent {
  @Input() windowState!: WindowState;
  @Output() onClose = new EventEmitter<void>();
  @Output() onMinimize = new EventEmitter<void>();
  @Output() onMaximize = new EventEmitter<void>();
  @Output() onFocus = new EventEmitter<void>();

  windowWidth = signal(600);
  windowHeight = signal(500);

  constructor() {
    effect(() => {
      if (this.windowState) {
        this.windowWidth.set(this.windowState.width || 600);
        this.windowHeight.set(this.windowState.height || 500);
      }
    });
  }

  getAppIcon(): string {
    const icons: { [key: string]: string } = {
      about: '👤',
      experience: '💼',
      projects: '🚀',
      skills: '⚡',
      certifications: '🏆',
      terminal: '💻',
      contact: '📧',
    };
    return icons[this.windowState.id] || '📁';
  }

  handleClose(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.onClose.emit();
  }

  handleMinimize(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.onMinimize.emit();
  }

  handleMaximize(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.onMaximize.emit();
  }

  handleFocus(): void {
    if (!this.windowState.focused) {
      this.onFocus.emit();
    }
  }

  onDragStart(): void {
    this.handleFocus();
  }
}
