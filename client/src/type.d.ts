interface Advertisement {
  _id: string;
  title: string;
  type: string;
  area: string;
  description?: string;
  price: number;
  activated: boolean;
  file: string;
  createdAt: string;
  updatedAt: string;
}

interface PropertyType {
  name: string;
  code: string;
}
