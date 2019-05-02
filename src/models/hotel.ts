import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Hotel extends Model<Hotel> {

  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

  @Column(DataType.STRING(255))
  name: string;

  @Column(DataType.INTEGER)
  stars: number;

  @Column(DataType.DECIMAL(10,2))
  price: number;

  @Column(DataType.STRING(255))
  image: string;

  @Column(DataType.TEXT)
  amenities: string;

}