import { IsString, IsArray, IsObject, IsNotEmpty } from 'class-validator';

export class ShippingGroupsDto {
  @IsString()
  productName: string;

  @IsString()
  price: number;
}

export class CustomerDto {
  @IsString()
  name: string;

  @IsString()
  lastName: string;
}

export class OrderCreatedDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsArray()
  shippingGroups: ShippingGroupsDto[];

  @IsObject()
  @IsNotEmpty()
  customer: CustomerDto;
}
