import { Injectable } from '@angular/core';
import { Client, Databases, ID } from 'appwrite';
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
  private isConfigured: boolean = false;

  constructor() {
    this.client = new Client();
    
    // Check if Appwrite is configured
    if (environment.appwrite.endpoint && environment.appwrite.endpoint !== 'YOUR_APPWRITE_ENDPOINT') {
      this.client
        .setEndpoint(environment.appwrite.endpoint)
        .setProject(environment.appwrite.projectId);
      
      this.databases = new Databases(this.client);
      this.isConfigured = true;
    } else {
      console.warn('Appwrite is not configured. Please update environment.ts with your Appwrite credentials.');
      // Initialize with dummy values to prevent errors
      this.databases = {} as Databases;
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

  // Future methods for fetching portfolio data
  async getExperiences(): Promise<any> {
    try {
      const response = await this.databases.listDocuments(
        environment.appwrite.databaseId,
        environment.appwrite.collectionsId.experiences
      );
      return { success: true, data: response.documents };
    } catch (error) {
      console.error('Error fetching experiences:', error);
      return { success: false, error };
    }
  }

  async getProjects(): Promise<any> {
    try {
      const response = await this.databases.listDocuments(
        environment.appwrite.databaseId,
        environment.appwrite.collectionsId.projects
      );
      return { success: true, data: response.documents };
    } catch (error) {
      console.error('Error fetching projects:', error);
      return { success: false, error };
    }
  }

  async getSkills(): Promise<any> {
    try {
      const response = await this.databases.listDocuments(
        environment.appwrite.databaseId,
        environment.appwrite.collectionsId.skills
      );
      return { success: true, data: response.documents };
    } catch (error) {
      console.error('Error fetching skills:', error);
      return { success: false, error };
    }
  }
}
