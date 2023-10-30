import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { PermissionsService } from './permissions.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private permissionsService: PermissionsService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> {
    const isAuthorized: Observable<boolean> = this.permissionsService.canActivate(next, state);
    console.log("User ",isAuthorized);
  
    return isAuthorized.pipe(
      map(authorized => {
        if (authorized) {
          return true; 
        } else {
          
          return this.router.createUrlTree(['/login']); 
        }
      })
    );
  }
}