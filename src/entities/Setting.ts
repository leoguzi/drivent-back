import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("settings")
export default class Setting extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  value: string;

  static async getEventSettings() {
    const settings = await this.find();

    const getValue = (name: string) =>
      settings.find((s) => s.name === name).value;

    return {
      startDate: new Date(getValue("start_date")),
      endDate: new Date(getValue("end_date")),
      eventTitle: getValue("event_title"),
      backgroundImage: getValue("background_image"),
      logoImage: getValue("logo_image"),
    };
  }

  static async createNew(startDate: Date, endDate: Date, eventTitle: string, backgroundImage: string, logoImage: string) {
    const start_date = new Setting();
    start_date.name = "start_date";
    start_date.value = startDate.toDateString();
    await Setting.save(start_date);

    const end_date = new Setting();
    end_date.name = "end_date";
    end_date.value = endDate.toDateString();
    await Setting.save(end_date);

    const event_title = new Setting();
    event_title.name = "event_title";
    event_title.value = eventTitle;
    await Setting.save(event_title);

    const background_image = new Setting();
    background_image.name = "background_image";
    background_image.value = backgroundImage;
    await Setting.save(background_image);

    const logo_image = new Setting();
    logo_image.name = "logo_image";
    logo_image.value = logoImage;
    await Setting.save(logo_image);
  }
}
