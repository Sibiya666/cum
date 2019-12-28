import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserResume } from 'src/models/userForm';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  private dataOfUserResume = new BehaviorSubject<UserResume>(null);
  get getDataOfUserResume(): BehaviorSubject<UserResume> {
    return this.dataOfUserResume
  }

  set setDataOfUserResume(value: UserResume) {
      this.dataOfUserResume.next(value)
  }

}
