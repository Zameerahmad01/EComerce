import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { useState } from "react";
import ProductImageUpload from "@/components/admin/Image-upload";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  addNewProduct,
  updateProduct,
} from "@/store/admin/index";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import AdminProductTile from "@/components/admin/Product-tile";

const initialFormData = {
  image: "",
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};
const AdminProducts = () => {
  const [openCreateProduct, setOpenCreateProduct] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadImageUrl, setUploadImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const { productsList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(e) {
    e.preventDefault();
    editProduct !== null
      ? dispatch(updateProduct({ id: editProduct, formData })).then((data) => {
          console.log(data, "update data");
          if (data.payload.success) {
            setOpenCreateProduct(false);
            setFormData(initialFormData);
            setImageFile(null);
            setUploadImageUrl("");
            dispatch(getAllProducts());
            toast({
              title: "Product Updated Successfully",
            });
          }
        })
      : dispatch(
          addNewProduct({
            ...formData,
            image: uploadImageUrl,
          })
        ).then((data) => {
          console.log(data, "data");
          if (data.payload.success) {
            setOpenCreateProduct(false);
            setFormData(initialFormData);
            setImageFile(null);
            setUploadImageUrl("");
            dispatch(getAllProducts());
            toast({
              title: "Product Added Successfully",
            });
          }
        });
  }

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // console.log(productsList, uploadImageUrl, "productsList");

  return (
    <>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProduct(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productsList?.length > 0 ? (
          productsList?.map((product) => (
            <AdminProductTile
              key={product?._id}
              product={product}
              setEditProduct={setEditProduct}
              setOpenCreateProduct={setOpenCreateProduct}
              setFormData={setFormData}
            />
          ))
        ) : (
          <div>No products found</div>
        )}
      </div>
      <Sheet
        open={openCreateProduct}
        onOpenChange={() => {
          setOpenCreateProduct(false);
          setFormData(initialFormData);
          setEditProduct(null);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {editProduct !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadImageUrl={uploadImageUrl}
            setUploadImageUrl={setUploadImageUrl}
            loading={loading}
            setLoading={setLoading}
            isEdit={editProduct !== null}
          />
          <div className="py-6">
            <CommonForm
              formData={formData}
              setFormData={setFormData}
              buttonText={editProduct !== null ? "Update" : "Add"}
              onSubmit={onSubmit}
              formControls={addProductFormElements}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AdminProducts;
