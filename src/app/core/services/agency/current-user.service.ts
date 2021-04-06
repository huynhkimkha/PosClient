import {Injectable} from '@angular/core';
import {AUTH_CONSTANT} from '../../constant/auth.constant';
import {UserModel} from '../../../data/schema/user.model';

@Injectable({
    providedIn: 'root'
})
export class CurrentUserService {
    private user: UserModel;

    constructor() {
        if (!this.user) {
            if (localStorage.getItem(AUTH_CONSTANT.USER_DATA)) {
                this.user = new UserModel(JSON.parse(localStorage.getItem(AUTH_CONSTANT.USER_DATA)));
            }else {
                this.user = new UserModel();
            }
        }
    }

    public getEmail() {
        return this.user.email;
    }

    public getFullName() {
        return this.user.fullname;
    }

    public getUserModel() {
        return this.user.userModel;
    }

    public setUser(userModel: UserModel) {
        this.user = new UserModel(userModel);
    }

    public getPermissions() {
        return this.user.role;
    }
}
