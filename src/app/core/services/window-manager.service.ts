import { Injectable, signal } from '@angular/core';

export interface WindowState {
  id: string;
  title: string;
  minimized: boolean;
  maximized: boolean;
  focused: boolean;
  zIndex: number;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
}

@Injectable({
  providedIn: 'root'
})
export class WindowManagerService {
  openWindows = signal<WindowState[]>([]);
  private nextZIndex = 10;

  private appTitles: { [key: string]: string } = {
    about: 'About - System Info',
    experience: 'Work Experience',
    projects: 'DevOps Projects',
    skills: 'Technology Stack',
    certifications: 'Certifications',
    terminal: 'DevOps Terminal',
    contact: 'Contact Me',
  };

  openWindow(appId: string): void {
    const windows = this.openWindows();
    
    // Check if window already exists
    const existingWindow = windows.find(w => w.id === appId);
    if (existingWindow) {
      // If minimized, restore it
      if (existingWindow.minimized) {
        this.restoreWindow(appId);
      }
      // Focus existing window
      this.focusWindow(appId);
      return;
    }

    // Create new window
    const newWindow: WindowState = {
      id: appId,
      title: this.appTitles[appId] || appId,
      minimized: false,
      maximized: false,
      focused: true,
      zIndex: this.nextZIndex++,
      width: this.getDefaultWidth(appId),
      height: this.getDefaultHeight(appId),
    };

    // Unfocus all other windows
    const updatedWindows = windows.map(w => ({ ...w, focused: false }));
    this.openWindows.set([...updatedWindows, newWindow]);
  }

  closeWindow(windowId: string): void {
    const windows = this.openWindows();
    this.openWindows.set(windows.filter(w => w.id !== windowId));
  }

  minimizeWindow(windowId: string): void {
    const windows = this.openWindows();
    this.openWindows.set(
      windows.map(w =>
        w.id === windowId ? { ...w, minimized: true, focused: false } : w
      )
    );
  }

  restoreWindow(windowId: string): void {
    const windows = this.openWindows();
    // Unfocus all windows
    const updatedWindows = windows.map(w => ({ ...w, focused: false }));
    // Restore and focus target window
    this.openWindows.set(
      updatedWindows.map(w =>
        w.id === windowId
          ? { ...w, minimized: false, focused: true, zIndex: this.nextZIndex++ }
          : w
      )
    );
  }

  maximizeWindow(windowId: string): void {
    const windows = this.openWindows();
    this.openWindows.set(
      windows.map(w =>
        w.id === windowId ? { ...w, maximized: !w.maximized } : w
      )
    );
  }

  focusWindow(windowId: string): void {
    const windows = this.openWindows();
    this.openWindows.set(
      windows.map(w =>
        w.id === windowId
          ? { ...w, focused: true, zIndex: this.nextZIndex++ }
          : { ...w, focused: false }
      )
    );
  }

  private getDefaultWidth(appId: string): number {
    const widths: { [key: string]: number } = {
      terminal: 800,
      projects: 900,
      about: 600,
      skills: 700,
      experience: 800,
      certifications: 600,
      contact: 550,
    };
    return widths[appId] || 600;
  }

  private getDefaultHeight(appId: string): number {
    const heights: { [key: string]: number } = {
      terminal: 600,
      projects: 700,
      about: 500,
      skills: 650,
      experience: 600,
      certifications: 500,
      contact: 600,
    };
    return heights[appId] || 500;
  }
}
