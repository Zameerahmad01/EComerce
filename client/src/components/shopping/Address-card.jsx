import React from "react";
import { Label } from "../ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";

function AddressCard({ address, handleEditAddress, handleDeleteAddress }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Address</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Label>Address : {address?.address}</Label>
        <Label>City : {address?.city}</Label>
        <Label>Pincode : {address?.pincode}</Label>
        <Label>Phone : {address?.phone}</Label>
        <Label>Notes : {address?.notes}</Label>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={() => handleEditAddress(address)}>Edit</Button>
        <Button onClick={() => handleDeleteAddress(address?._id)}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
