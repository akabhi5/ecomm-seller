import { Product } from "../../types/Product";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <div className="w-[220px] border hover:shadow-md">
      <img
        className="w-[250px] h-[270px] object-fill"
        src={product.product_images[0].url}
        alt={product.name}
      />
      <div className="text-center">
        <div>{product.name}</div>
        <div className="text-sm text-slate-500">Price: ₹{product.price}</div>
      </div>
    </div>
  );
};

export default ProductCard;
