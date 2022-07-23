import { IsString, IsArray, IsObject, IsNotEmpty } from 'class-validator';

class ShippingGroupsDto {
  @IsString()
  productName: string;

  @IsString()
  price: number;
}

class Customer {
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
  customer: Customer;
}
