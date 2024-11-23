import React from "react";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import CommonForm from "../common/form";
import { useState } from "react";

const statusFormControl = [
  {
    label: "Order Status",
    name: "status",
    componentType: "select",
    options: [
      { id: "pending", label: "Pending" },
      { id: "inProcess", label: "In Process" },
      { id: "inShipping", label: "In Shipping" },
      { id: "delivered", label: "Delivered" },
      { id: "rejected", label: "Rejected" },
    ],
  },
];

const initialFormData = {
  status: "",
};

function OrderDetails() {
  const [formData, setFormData] = useState(initialFormData);

  const handleStatusSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        <div className="grid gap-4">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>123456789</Label>
          </div>
          <div className="flex  items-center justify-between">
            <p className="font-medium">Date</p>
            <Label>2024-01-01</Label>
          </div>
          <div className="flex  items-center justify-between">
            <p className="font-medium">Total</p>
            <Label>$100</Label>
          </div>
          <div className="flex  items-center justify-between">
            <p className="font-medium">Status</p>
            <Label>Pending</Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span>product one</span>
                <span>$100</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Details</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>jhon doe</span>
              <span>Address</span>
              <span>City</span>
              <span>Country</span>
              <span>Zip Code</span>
              <span>Phone</span>
              <span>Notes</span>
            </div>
          </div>
        </div>

        <div>
          <CommonForm
            formControls={statusFormControl}
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleStatusSubmit}
            button={"Update Order Status"}
          />
        </div>
      </div>
    </DialogContent>
  );
}

export default OrderDetails;
