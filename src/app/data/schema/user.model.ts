export class UserModel {
    public fullname = 'Guest';
    public email: string;
    public password: string;
    public userModel: string;

    public constructor(
        data?: UserModel
    ) {
        const user = data == null ? this : data;

        this.fullname = user.fullname;
        this.email = user.email;
        this.password = user.password;
        this.userModel = user.userModel;
    }
}
