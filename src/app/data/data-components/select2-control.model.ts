export class Select2ControlModel {
  public selected: boolean;
  public disabled: boolean;
  public text: string;
  public id: string;
  public title: string;

  constructor(data?: Select2ControlModel) {
    const select2 = data == null ? this : data;
    this.id = select2.id;
    this.disabled = select2.disabled;
    this.selected = select2.selected;
    this.text = select2.text;
    this.title = select2.title;
  }
}
