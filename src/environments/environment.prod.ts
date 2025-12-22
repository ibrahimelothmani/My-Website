export const environment = {
  production: true,
  appwrite: {
    endpoint: 'YOUR_APPWRITE_ENDPOINT',
    projectId: 'YOUR_APPWRITE_PROJECT_ID',
    databaseId: 'YOUR_DATABASE_ID',
    collectionsId: {
      messages: 'YOUR_MESSAGES_COLLECTION_ID',
      experiences: 'YOUR_EXPERIENCES_COLLECTION_ID',
      projects: 'YOUR_PROJECTS_COLLECTION_ID',
      skills: 'YOUR_SKILLS_COLLECTION_ID',
      certifications: 'YOUR_CERTIFICATIONS_COLLECTION_ID',
    }
  },
  app: {
    name: 'Ibrahim El Othmani - DevOps OS',
    version: '2024.12',
    author: 'Ibrahim El Othmani',
  },
};
