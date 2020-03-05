import { Injectable } from "@angular/core";
import { AlertifyService } from "../_services/alertify.service";
import { ActivatedRouteSnapshot, Router, Resolve } from "@angular/router";
import { Observable, of } from "rxjs";
import { User } from "../_models/user";
import { UserService } from "../_services/user.service";
import { catchError } from "rxjs/operators";
import { AuthService } from "../_services/auth.service";

@Injectable()
export class MemberEditResolver implements Resolve<User> {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
      catchError(error => {
        this.alertify.error("Problem retieving your data");
        this.router.navigate(["/members"]);
        return of(null);
      })
    );
  }
}
