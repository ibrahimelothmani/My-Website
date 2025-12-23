import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppwriteService } from '../services/appwrite.service';

export const authGuard = async () => {
  const appwriteService = inject(AppwriteService);
  const router = inject(Router);

  const result = await appwriteService.getCurrentUser();

  if (result.success) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
