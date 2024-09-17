// public api

export { ProductPreviewLayout } from "./components/productPreviewLayout/ProductPreviewLayout";
export { validationProduct } from "./lib/helpers/validations";
export { initialStateProduct, initialStateProductPreview } from "./model/initialState";
export { ProductPreview } from "./components/productPreview/productPreview";
export { productService } from "./api/ProductService";
export { ProductCard } from "./components/productCard/ProductCard";
export { ProductInfo } from "./components/productInfo/ProductInfo";
export type { IProduct, IProductItem, IProductPreview } from "./model/types"
export type { ITechCharacteristic, IModification} from './model/types'
export {useProductActions} from "./lib/hooks/useActions"