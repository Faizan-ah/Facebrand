import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Product } from "@/types/product";
import { useGetProducts } from "@/features/useProduct";
import { useDebounce } from "@/hooks/useDebounce";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue
} from "@/components/ui/select";
import ProductCard from "@/components/product/ProductCard";
import Modal from "@/components/Modal";
import DisplayCart from "@/components/product/DisplayCart";
import { getDataFromLocalStorage } from "@/lib/utils";
import { User } from "@/types/user";
import Loader from "@/components/Loader";

const Home = () => {
  const { register, watch, control, setValue } = useForm<{
    search: string;
    sortBy: string;
  }>();

  const [open, setOpen] = useState(false);
  const debouncedSearchTerm = useDebounce(watch("search"), 1000);
  const sortOptions = [
    { label: "Price: High to Low", value: "ph" },
    { label: "Price: Low to High", value: "pl" },
    { label: "Names Ascending", value: "asc" },
    { label: "Names Descending", value: "dsc" },
    { label: "Top rated", value: "tr" }
  ];
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const user: User = getDataFromLocalStorage("user");
    setUserId(user?.id);
  }, []);

  const {
    data: products,
    isFetching,
    isError
  } = useGetProducts(debouncedSearchTerm, watch("sortBy"));

  const toggleModal = () => setOpen(!open);

  return (
    <div className="flex flex-col items-center p-4 md:p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Welcome to Facebrand!</h1>
      <p className="text-lg text-gray-700 mb-6 text-center">
        Dive into our collection of skincare treasures, handpicked to elevate your beauty routine.
        We have everything you need to pamper your skin and reveal your natural glow. Discover your
        new skincare favorites and enjoy a more radiant you.
      </p>
      <div className="flex flex-col md:flex-row gap-4 mb-6 w-full max-w-4xl">
        <Input
          type="search"
          disabled={isFetching}
          {...register("search")}
          placeholder="Search for products..."
          className="flex-1"
        />
        <Controller
          name="sortBy"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select
              disabled={isFetching}
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
                setValue("sortBy", value);
              }}
            >
              <SelectTrigger className="w-full md:w-1/3">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <Modal
        style={{ minWidth: "400px" }}
        open={open}
        toggleModal={toggleModal}
        modalTitle="Your Cart"
      >
        <DisplayCart userId={userId} />
      </Modal>
      {isFetching ? (
        <Loader height="200" />
      ) : isError ? (
        <div className="text-red-600 text-lg font-semibold">
          Error fetching products. Please try again later.
        </div>
      ) : products.length === 0 ? (
        <div className="text-gray-600 text-lg font-semibold">
          No products found. Check back later!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 my-2">
          {products.map(
            (product: Product) =>
              !product.deleted && <ProductCard key={product.id} product={product} userId={userId} />
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
