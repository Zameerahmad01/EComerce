import { addressFormControls } from "@/config";
import CommonForm from "../common/form";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { useState, useEffect } from "react";
import AddressCard from "./Address-card";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  getAllAddress,
  deleteAddress,
  updateAddress,
} from "@/store/shop/address-slice";
import { useToast } from "@/hooks/use-toast";

const initialAddressForm = {
  address: "",
  city: "",
  pincode: "",
  phone: "",
  notes: "",
};
function Address() {
  const [formData, setFormData] = useState(initialAddressForm);
  const [EditId, setEditId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.address);
  const { toast } = useToast();

  const handleManageAddress = (e) => {
    e.preventDefault();

    if (addressList.length >= 3 && EditId === null) {
      toast({
        title: "You can only add 3 addresses",
        variant: "destructive",
      });
      setFormData(initialAddressForm);
      return;
    }

    EditId !== null
      ? dispatch(
          updateAddress({
            userId: user?._id,
            addressId: EditId,
            formData,
          })
        ).then((data) => {
          if (data.payload.success) {
            setFormData(initialAddressForm);
            dispatch(getAllAddress(user?._id));
            setEditId(null);
            toast({
              title: "Address updated successfully",
            });
          }
        })
      : dispatch(
          addNewAddress({
            ...formData,
            userId: user?._id,
          })
        ).then((data) => {
          if (data.payload.success) {
            setFormData(initialAddressForm);
            dispatch(getAllAddress(user?._id));
            toast({
              title: "Address added successfully",
            });
          }
        });
  };

  function isFormValid() {
    return Object.values(formData).every((value) => value.trim() !== "");
  }

  const handleEditAddress = (address) => {
    // console.log(address, "address");
    setEditId(address?._id);
    setFormData({
      ...formData,
      address: address?.address,
      city: address?.city,
      pincode: address?.pincode,
      phone: address?.phone,
      notes: address?.notes,
    });
  };

  const handleDeleteAddress = (id) => {
    console.log(id, "id");
    dispatch(deleteAddress({ addressId: id, userId: user?._id })).then(
      (data) => {
        if (data.payload.success) {
          dispatch(getAllAddress(user?._id));
          toast({
            title: "Address deleted successfully",
          });
        }
      }
    );
  };

  useEffect(() => {
    if (user?._id) {
      dispatch(getAllAddress(user?._id));
    }
  }, [dispatch]);

  console.log(addressList, "addressList");

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 md:grid-cols-2 gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((singleAddressItem) => (
              <AddressCard
                address={singleAddressItem}
                handleEditAddress={handleEditAddress}
                handleDeleteAddress={handleDeleteAddress}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>{EditId ? "Edit Address" : "Add New Address"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formData={formData}
          setFormData={setFormData}
          initialFormData={initialAddressForm}
          formControls={addressFormControls}
          onSubmit={handleManageAddress}
          buttonText={EditId ? "Update Address" : "Add Address"}
          disabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
}

export default Address;
