import { Injectable } from "@angular/core";
import { AlertifyService } from "../_services/alertify.service";
import { ActivatedRouteSnapshot, Router, Resolve } from "@angular/router";
import { Observable, of } from "rxjs";
import { User } from "../_models/user";
import { UserService } from "../_services/user.service";
import { catchError } from "rxjs/operators";

@Injectable()
export class MemberListResolver implements Resolve<User[]> {
  constructor(
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
    return this.userService.getUsers().pipe(
      catchError(error => {
        this.alertify.error("Problem retieving data");
        this.router.navigate(["/home"]);
        return of(null);
      })
    );
  }
}
