import { ID, MessageRole } from "./variables";

export interface CategoryAttributes {
  id: ID;
  name: string;
  description?: string | null;
  imgUrl: string;
}

export interface CategoryCreationAttributes
  extends Omit<CategoryAttributes, "id"> { }

export interface UserAttributes {
  id: ID;
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface UserCreationAttributes extends Omit<UserAttributes, "id"> { }

export interface ColorAttributes {
  id: ID;
  name: string;
}

export interface ColorCreationAttributes
  extends Omit<ColorAttributes, "id"> { }

export interface SizeAttributes {
  id: ID;
  name: string;
}

export interface SizeCreationAttributes
  extends Omit<SizeAttributes, "id"> { }

export interface BrandAttributes {
  id: ID;
  name: string;
  imgUrl?: string | null;
}

export interface BrandCreationAttributes
  extends Omit<BrandAttributes, "id"> { }

export interface ProductAttributes {
  id: ID;
  title: string;
  categoryId: ID;
  brandId: ID;
  imgUrl?: string | null;
  summarize?: string | null;
  price: number;
  description?: string | null;
}

export interface ProductCreationAttributes
  extends Omit<ProductAttributes, "id"> { }

export interface PasswordResetAttributes {
  id?: ID;
  userId: ID;
  code: string;
  expiresAt: Date;
  isVerified: boolean;
}

export interface PasswordCreationResetAttributes extends Omit<PasswordResetAttributes, "id" | "isVerified"> { }

export interface ProductVariantAttributes {
  id: ID;
  productId: ID;
  colorId?: ID | null;
  sizeId?: ID | null;
  quantity: number;
}

export interface ProductVariantCreationAttributes
  extends Omit<ProductVariantAttributes, "id"> { }

export interface ChatRoomAttributes {
  id: ID;
  userId: ID;
  title: string;
  createdAt: Date;
}

export interface ChatRoomCreationAttributes
  extends Omit<ChatRoomAttributes, "id" | "createdAt"> { }

export interface MessageAttributes {
  id: ID;
  chatRoomId: ID;
  role: MessageRole;
  content: string;
  createdAt: Date;
}

export interface MessageCreationAttributes
  extends Omit<MessageAttributes, "id" | "createdAt"> { }