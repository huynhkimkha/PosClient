export class SizeModel {
    public id: string;
    public name: string;

    public constructor(
        data?: SizeModel
    ){
        const size = data == null ? this : data;
        this.id = size.id;
        this.name = size.name;
    }
}
