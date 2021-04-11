import {CATEGORY_STATUS_CONSTANT} from "../../core/constant/category-status.constant";

export class CategoryModel {
    public id: string;
    public name: string;
    public status: string;
    public createdDate: string;
    public updatedDate: string;

    public constructor(
        data?: CategoryModel
    ){
        const category = data == null ? this : data;
        this.id = category.id;
        this.name = category.name;
        this.status = category.status;
        this.createdDate = category.createdDate;
        this.updatedDate = category.updatedDate;
    }

    public getCategoryStatus(): string {
        switch (this.status) {
            case CATEGORY_STATUS_CONSTANT.ACTIVE:
                return 'Hoạt động';
            case CATEGORY_STATUS_CONSTANT.INACTIVE:
                return 'Không hoạt động';
            default:
                return '';
        }
    }
}
