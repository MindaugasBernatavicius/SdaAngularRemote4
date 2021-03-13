import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ProductGuard implements CanActivate {
  constructor(private router: Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    // console.log(route);
    // console.log(state);

    const id = +route.url[1];
    if (isNaN(id) || id < 1) {
      // alert('Incorrect value');
      const st = { state: { error: `Invalid URL parameter: ${route.url[1]}`} };
      this.router.navigate(['/products'], st);
    }

    return true;
  }
}
