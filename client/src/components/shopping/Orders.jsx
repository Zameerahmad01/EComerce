import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import { Dialog } from "../ui/dialog";
import ShoppingOrderDetails from "./order-details";

function ShoppingOrders() {
  const [openDetails, setOpenDetails] = useState(false);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders history</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>
                <span className="sr-only">details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>123456789</TableCell>
              <TableCell>2024-01-01</TableCell>
              <TableCell>Pending</TableCell>
              <TableCell>$100</TableCell>
              <TableCell>
                <Dialog open={openDetails} onOpenChange={setOpenDetails}>
                  <Button onClick={() => setOpenDetails(true)}>Details</Button>
                  <ShoppingOrderDetails />
                </Dialog>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default ShoppingOrders;
