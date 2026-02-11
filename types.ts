//types.ts จะสร้าง type ขึ้นมาใหม่ที่แมปกับข้อมูลใน database

//แมปกับตาราง coffee_shops

export type CoffeeShop = {
  id: string;
  name: string;
  district: string;
  description: string;
  latitude: number;
  longitude: number;
  image_url: string;
  phone: string;
};
