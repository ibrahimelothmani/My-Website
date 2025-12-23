import { Injectable } from '@angular/core';
import { Client, Databases, ID, Account } from 'appwrite';
import { environment } from '../../../environments/environment';

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppwriteService {
  private client: Client;
  private databases: Databases;
  private account: Account;
  private isConfigured: boolean = false;

  constructor() {
    this.client = new Client();
    
    // Check if Appwrite is configured
    if (environment.appwrite.endpoint && 
        environment.appwrite.projectId && 
        environment.appwrite.databaseId &&
        environment.appwrite.endpoint.trim() !== '' &&
        environment.appwrite.projectId.trim() !== '') {
      this.client
        .setEndpoint(environment.appwrite.endpoint)
        .setProject(environment.appwrite.projectId);
      
      this.databases = new Databases(this.client);
      this.account = new Account(this.client);
      this.isConfigured = true;
    } else {
      console.warn('Appwrite is not configured. Please set environment variables (APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID, APPWRITE_DATABASE_ID) in your .env file.');
      // Initialize with dummy values to prevent errors
      this.databases = {} as Databases;
      this.account = {} as Account;
    }
  }

  async submitContactForm(data: ContactMessage): Promise<any> {
    if (!this.isConfigured) {
      return { 
        success: false, 
        error: { 
          message: 'Appwrite is not configured. Please update environment.ts with your Appwrite credentials. See APPWRITE_SETUP.md for instructions.' 
        } 
      };
    }

    try {
      const document = {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        timestamp: new Date().toISOString(),
        isRead: false  // Track read/unread status
      };

      const response = await this.databases.createDocument(
        environment.appwrite.databaseId,
        environment.appwrite.collectionsId.messages,
        ID.unique(),
        document
      );

      return { success: true, data: response };
    } catch (error) {
      console.error('Error submitting contact form:', error);
      return { success: false, error };
    }
  }

  // Authentication methods
  async login(email: string, password: string): Promise<any> {
    if (!this.isConfigured) {
      return { 
        success: false, 
        error: { 
          message: 'Appwrite is not configured. Please update your .env file with Appwrite credentials.' 
        } 
      };
    }

    try {
      const session = await this.account.createEmailPasswordSession(email, password);
      return { success: true, data: session };
    } catch (error) {
      console.error('Error logging in:', error);
      return { success: false, error };
    }
  }

  async logout(): Promise<any> {
    if (!this.isConfigured) {
      return { success: false, error: { message: 'Appwrite is not configured.' } };
    }

    try {
      await this.account.deleteSession('current');
      return { success: true };
    } catch (error) {
      console.error('Error logging out:', error);
      return { success: false, error };
    }
  }

  async getCurrentUser(): Promise<any> {
    if (!this.isConfigured) {
      return { success: false, error: { message: 'Appwrite is not configured.' } };
    }

    try {
      const user = await this.account.get();
      return { success: true, data: user };
    } catch (error) {
      console.error('Error getting current user:', error);
      return { success: false, error };
    }
  }

  // Admin methods
  async getMessages(limit: number = 100): Promise<any> {
    if (!this.isConfigured) {
      return { 
        success: false, 
        error: { message: 'Appwrite is not configured.' } 
      };
    }

    try {
      const response = await this.databases.listDocuments(
        environment.appwrite.databaseId,
        environment.appwrite.collectionsId.messages
      );
      return { success: true, data: response.documents };
    } catch (error) {
      console.error('Error fetching messages:', error);
      return { success: false, error };
    }
  }

  async markMessageAsRead(messageId: string): Promise<any> {
    if (!this.isConfigured) {
      return { success: false, error: { message: 'Appwrite is not configured.' } };
    }

    try {
      const response = await this.databases.updateDocument(
        environment.appwrite.databaseId,
        environment.appwrite.collectionsId.messages,
        messageId,
        { isRead: true }
      );
      return { success: true, data: response };
    } catch (error) {
      console.error('Error marking message as read:', error);
      return { success: false, error };
    }
  }

  async deleteMessage(messageId: string): Promise<any> {
    if (!this.isConfigured) {
      return { success: false, error: { message: 'Appwrite is not configured.' } };
    }

    try {
      await this.databases.deleteDocument(
        environment.appwrite.databaseId,
        environment.appwrite.collectionsId.messages,
        messageId
      );
      return { success: true };
    } catch (error) {
      console.error('Error deleting message:', error);
      return { success: false, error };
    }
  }

  async updateMessage(messageId: string, data: any): Promise<any> {
    if (!this.isConfigured) {
      return { success: false, error: { message: 'Appwrite is not configured.' } };
    }

    try {
      const response = await this.databases.updateDocument(
        environment.appwrite.databaseId,
        environment.appwrite.collectionsId.messages,
        messageId,
        data
      );
      return { success: true, data: response };
    } catch (error) {
      console.error('Error updating message:', error);
      return { success: false, error };
    }
  }
}
