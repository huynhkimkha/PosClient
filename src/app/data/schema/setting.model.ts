export class SettingModel {
  public id: number;
  public label: string;
  public key: string;
  public values: string;

  public constructor(
    data?: SettingModel
  ) {
    const setting = data == null ? this : data;

    this.id = setting.id;
    this.label = setting.label;
    this.key = setting.key;
    this.values = setting.values;
  }
}
