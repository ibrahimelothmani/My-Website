import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AppwriteService } from '../../core/services/appwrite.service';

interface Message {
  $id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  isRead?: boolean;  // Track read/unread status
}

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <header class="dashboard-header">
        <div class="header-content">
          <div class="header-title">
            <h1>Admin Dashboard</h1>
            <p>Contact Messages @if (getUnreadCount() > 0) { <span class="unread-badge">{{ getUnreadCount() }} unread</span> }</p>
          </div>
          <button (click)="onLogout()" class="logout-button">
            <span class="logout-icon">🚪</span>
            Logout
          </button>
        </div>
      </header>

      <main class="dashboard-main">
        @if (isLoading()) {
          <div class="loading-container">
            <div class="spinner-large"></div>
            <p>Loading messages...</p>
          </div>
        } @else if (errorMessage()) {
          <div class="error-container">
            <span class="error-icon">⚠️</span>
            <p>{{ errorMessage() }}</p>
            <button (click)="loadMessages()" class="retry-button">Retry</button>
          </div>
        } @else if (messages().length === 0) {
          <div class="empty-container">
            <span class="empty-icon">📭</span>
            <h2>No messages yet</h2>
            <p>Contact messages will appear here when submitted.</p>
          </div>
        } @else {
          <div class="messages-section">
            <div class="section-header">
              <h2>Messages ({{ messages().length }})</h2>
              <button (click)="loadMessages()" class="refresh-button">
                🔄 Refresh
              </button>
            </div>

            <div class="messages-grid">
              @for (message of messages(); track message.$id) {
                <div class="message-card" [class.unread]="!message.isRead" (click)="selectMessage(message)">
                  <div class="message-header">
                    <div class="sender-info">
                      @if (!message.isRead) {
                        <span class="unread-indicator" title="Unread">●</span>
                      }
                      <span class="sender-icon">👤</span>
                      <div class="sender-details">
                        <h3>{{ message.name }}</h3>
                        <a [href]="'mailto:' + message.email" class="sender-email" (click)="$event.stopPropagation()">
                          {{ message.email }}
                        </a>
                      </div>
                    </div>
                    <div class="message-actions">
                      <span class="message-date">{{ formatDate(message.timestamp) }}</span>
                      <button class="delete-button" (click)="confirmDelete(message, $event)" title="Delete message">
                        🗑️
                      </button>
                    </div>
                  </div>
                  <div class="message-subject">
                    <strong>Subject:</strong> {{ message.subject }}
                  </div>
                  <div class="message-preview">
                    {{ message.message }}
                  </div>
                </div>
              }
            </div>
          </div>
        }
      </main>

      @if (selectedMessage()) {
        <div class="modal-overlay" (click)="closeModal()">
          <div class="modal-content" (click)="$event.stopPropagation()">
            <div class="modal-header">
              <h2>Message Details</h2>
              <button (click)="closeModal()" class="close-button">✕</button>
            </div>
            <div class="modal-body">
              <div class="detail-row">
                <span class="detail-label">From:</span>
                <span class="detail-value">{{ selectedMessage()!.name }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Email:</span>
                <a [href]="'mailto:' + selectedMessage()!.email" class="detail-value detail-link">
                  {{ selectedMessage()!.email }}
                </a>
              </div>
              <div class="detail-row">
                <span class="detail-label">Subject:</span>
                <span class="detail-value">{{ selectedMessage()!.subject }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Date:</span>
                <span class="detail-value">{{ formatDate(selectedMessage()!.timestamp) }}</span>
              </div>
              <div class="detail-row message-full">
                <span class="detail-label">Message:</span>
                <p class="detail-value">{{ selectedMessage()!.message }}</p>
              </div>
            </div>
            <div class="modal-footer">
              <div class="modal-footer-actions">
                <a 
                  [href]="'mailto:' + selectedMessage()!.email + '?subject=Re: ' + selectedMessage()!.subject"
                  class="reply-button"
                >
                  📧 Reply via Email
                </a>
                <button class="delete-button-modal" (click)="confirmDelete(selectedMessage()!, $event)">
                  🗑️ Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .dashboard-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%);
    }

    .dashboard-header {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding: 20px 40px;
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .header-content {
      max-width: 1400px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .header-title h1 {
      color: #00ff88;
      font-size: 28px;
      font-weight: 700;
      margin: 0 0 4px 0;
      text-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
    }

    .header-title p {
      color: rgba(255, 255, 255, 0.6);
      font-size: 14px;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .unread-badge {
      background: rgba(255, 59, 48, 0.2);
      border: 1px solid rgba(255, 59, 48, 0.4);
      color: #ff6b6b;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
    }

    .logout-button {
      padding: 10px 20px;
      background: rgba(255, 59, 48, 0.1);
      border: 1px solid rgba(255, 59, 48, 0.3);
      border-radius: 8px;
      color: #ff6b6b;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s ease;
    }

    .logout-button:hover {
      background: rgba(255, 59, 48, 0.2);
      transform: translateY(-2px);
    }

    .logout-icon {
      font-size: 18px;
    }

    .dashboard-main {
      max-width: 1400px;
      margin: 0 auto;
      padding: 40px;
    }

    .loading-container,
    .error-container,
    .empty-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 400px;
      gap: 16px;
    }

    .spinner-large {
      width: 48px;
      height: 48px;
      border: 4px solid rgba(0, 255, 136, 0.1);
      border-top-color: #00ff88;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .loading-container p,
    .error-container p,
    .empty-container p {
      color: rgba(255, 255, 255, 0.6);
      font-size: 16px;
    }

    .empty-icon,
    .error-icon {
      font-size: 64px;
    }

    .empty-container h2 {
      color: rgba(255, 255, 255, 0.9);
      font-size: 24px;
      margin: 0;
    }

    .retry-button {
      padding: 10px 24px;
      background: #00ff88;
      border: none;
      border-radius: 8px;
      color: #0a0a0f;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .retry-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 255, 136, 0.3);
    }

    .messages-section {
      animation: fadeIn 0.5s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .section-header h2 {
      color: rgba(255, 255, 255, 0.9);
      font-size: 20px;
      font-weight: 600;
      margin: 0;
    }

    .refresh-button {
      padding: 8px 16px;
      background: rgba(0, 255, 136, 0.1);
      border: 1px solid rgba(0, 255, 136, 0.3);
      border-radius: 6px;
      color: #00ff88;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .refresh-button:hover {
      background: rgba(0, 255, 136, 0.2);
    }

    .messages-grid {
      display: grid;
      gap: 20px;
    }

    .message-card {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 20px;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
    }

    .message-card.unread {
      border-color: rgba(255, 59, 48, 0.4);
      background: rgba(255, 59, 48, 0.05);
    }

    .message-card:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(0, 255, 136, 0.3);
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    }

    .message-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 12px;
    }

    .sender-info {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .unread-indicator {
      color: #ff6b6b;
      font-size: 20px;
      line-height: 1;
    }

    .sender-icon {
      font-size: 32px;
    }

    .sender-details h3 {
      color: rgba(255, 255, 255, 0.9);
      font-size: 16px;
      font-weight: 600;
      margin: 0 0 4px 0;
    }

    .sender-email {
      color: #00ff88;
      font-size: 14px;
      text-decoration: none;
      transition: all 0.2s ease;
    }

    .sender-email:hover {
      text-decoration: underline;
    }

    .message-date {
      color: rgba(255, 255, 255, 0.5);
      font-size: 13px;
      margin-right: 12px;
    }

    .message-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .delete-button {
      padding: 6px 10px;
      background: rgba(255, 59, 48, 0.1);
      border: 1px solid rgba(255, 59, 48, 0.2);
      border-radius: 6px;
      color: rgba(255, 59, 48, 0.8);
      font-size: 16px;
      cursor: pointer;
      transition: all 0.2s ease;
      opacity: 0;
    }

    .message-card:hover .delete-button {
      opacity: 1;
    }

    .delete-button:hover {
      background: rgba(255, 59, 48, 0.2);
      border-color: rgba(255, 59, 48, 0.4);
      color: #ff6b6b;
      transform: scale(1.1);
    }

    .message-subject {
      color: rgba(255, 255, 255, 0.8);
      font-size: 14px;
      margin-bottom: 8px;
    }

    .message-subject strong {
      color: rgba(255, 255, 255, 0.6);
    }

    .message-preview {
      color: rgba(255, 255, 255, 0.7);
      font-size: 14px;
      line-height: 1.5;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    /* Modal Styles */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      animation: fadeIn 0.3s ease;
      padding: 20px;
    }

    .modal-content {
      background: rgba(26, 26, 46, 0.95);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      width: 100%;
      max-width: 600px;
      max-height: 90vh;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      animation: slideUp 0.3s ease;
    }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .modal-header h2 {
      color: #00ff88;
      font-size: 20px;
      font-weight: 600;
      margin: 0;
    }

    .close-button {
      width: 32px;
      height: 32px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      color: rgba(255, 255, 255, 0.6);
      font-size: 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
    }

    .close-button:hover {
      background: rgba(255, 255, 255, 0.1);
      color: rgba(255, 255, 255, 0.9);
    }

    .modal-body {
      padding: 24px;
      overflow-y: auto;
      flex: 1;
    }

    .detail-row {
      margin-bottom: 16px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .detail-row.message-full {
      margin-top: 24px;
      padding-top: 24px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .detail-label {
      color: rgba(255, 255, 255, 0.6);
      font-size: 12px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .detail-value {
      color: rgba(255, 255, 255, 0.9);
      font-size: 14px;
      line-height: 1.6;
    }

    .detail-link {
      color: #00ff88;
      text-decoration: none;
      transition: all 0.2s ease;
    }

    .detail-link:hover {
      text-decoration: underline;
    }

    .modal-footer {
      padding: 24px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .modal-footer-actions {
      display: flex;
      gap: 12px;
    }

    .reply-button {
      flex: 1;
      padding: 12px;
      background: linear-gradient(135deg, #00ff88 0%, #00cc6a 100%);
      border: none;
      border-radius: 8px;
      color: #0a0a0f;
      font-size: 14px;
      font-weight: 600;
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .delete-button-modal {
      padding: 12px 20px;
      background: rgba(255, 59, 48, 0.1);
      border: 1px solid rgba(255, 59, 48, 0.3);
      border-radius: 8px;
      color: #ff6b6b;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .delete-button-modal:hover {
      background: rgba(255, 59, 48, 0.2);
      border-color: rgba(255, 59, 48, 0.5);
      transform: translateY(-2px);
    }

    .reply-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 255, 136, 0.3);
    }

    @media (max-width: 768px) {
      .dashboard-header {
        padding: 16px 20px;
      }

      .header-title h1 {
        font-size: 20px;
      }

      .dashboard-main {
        padding: 20px;
      }

      .message-card {
        padding: 16px;
      }

      .modal-content {
        margin: 0;
        border-radius: 16px 16px 0 0;
        max-height: 95vh;
      }
    }
  `]
})
export class AdminDashboardComponent implements OnInit {
  messages = signal<Message[]>([]);
  selectedMessage = signal<Message | null>(null);
  isLoading = signal(true);
  errorMessage = signal('');

  constructor(
    private appwriteService: AppwriteService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadMessages();
  }

  async loadMessages() {
    this.isLoading.set(true);
    this.errorMessage.set('');

    const result = await this.appwriteService.getMessages();

    this.isLoading.set(false);

    if (result.success) {
      this.messages.set(result.data);
    } else {
      const error = result.error as any;
      this.errorMessage.set(
        error?.message || 'Failed to load messages. Please try again.'
      );
    }
  }

  async onLogout() {
    await this.appwriteService.logout();
    this.router.navigate(['/']);
  }

  async selectMessage(message: Message) {
    this.selectedMessage.set(message);
    
    // Mark as read when opening the message
    if (!message.isRead) {
      const result = await this.appwriteService.markMessageAsRead(message.$id);
      if (result.success) {
        // Update the local message list
        const updated = this.messages().map(m =>
          m.$id === message.$id ? { ...m, isRead: true } : m
        );
        this.messages.set(updated);
        this.selectedMessage.set({ ...message, isRead: true });
      }
    }
  }

  closeModal() {
    this.selectedMessage.set(null);
  }

  getUnreadCount(): number {
    return this.messages().filter(m => !m.isRead).length;
  }

  confirmDelete(message: Message, event: Event) {
    event.stopPropagation();
    
    const confirmed = confirm(
      `Are you sure you want to delete this message from ${message.name}?\n\nSubject: ${message.subject}`
    );
    
    if (confirmed) {
      this.deleteMessage(message.$id);
    }
  }

  async deleteMessage(messageId: string) {
    const result = await this.appwriteService.deleteMessage(messageId);
    
    if (result.success) {
      // Remove from local list
      const updated = this.messages().filter(m => m.$id !== messageId);
      this.messages.set(updated);
      
      // Close modal if this message was open
      if (this.selectedMessage()?.$id === messageId) {
        this.closeModal();
      }
    } else {
      alert('Failed to delete message. Please try again.');
    }
  }

  formatDate(timestamp: string): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }
}
