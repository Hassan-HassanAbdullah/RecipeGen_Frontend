import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { inject } from '@angular/core';

export const checkLoginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServiceService);
  return authService.isLoggedIn();

};
