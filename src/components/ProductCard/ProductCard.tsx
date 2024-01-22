import { Product } from "../../types/Product";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <div className="hover:shadow-md max-w-[220px] h-full border">
      <img
        className="w-fit max-h-[250px] min-w-[200px] min-h-[250px] object-cover"
        src={product.product_images[0].url}
        alt={product.name}
      />
      <div className="p-2 text-center">
        <div>{product.name}</div>
        <div className="text-sm text-slate-500">Price: ₹{product.price}</div>
      </div>
    </div>
  );
};

export default ProductCard;
