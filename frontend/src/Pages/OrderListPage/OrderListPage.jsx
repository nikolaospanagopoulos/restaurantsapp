import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderList } from "../../Actions/OrderActions/GetOrderListActions";
import Loader from "../../Components/Loading/Loader";
import Message from "../../Components/Message/Message";
import { Link } from "react-router-dom";
import Pagination from "../../Components/Pagination/Pagination";
const OrderListPage = ({ match }) => {
  const restaurantId = match.params.id;
  const dispatch = useDispatch();
  const [nextPage, setNextPage] = useState(Number);
  const [previousPage, setPreviousPage] = useState(Number);
  const orderList = useSelector((state) => state.orderList);
  const { orders, loading, error } = orderList;

  useEffect(() => {
    dispatch(getOrderList(restaurantId));
  }, [dispatch, restaurantId]);

  if (!loading) {
    const data = orders.data;
    console.log(data);
  }
  useEffect(() => {
    if (orders.pagination) {
      if (orders.pagination.next) {
        setNextPage(orders.pagination.next.page);
      } else if (!orders.pagination.next) {
        setNextPage(null);
      }

      if (orders.pagination.prev) {
        setPreviousPage(orders.pagination.prev.page);
      }
    }
  }, [orders.pagination]);
  console.log(orders);

  const pageClick = (pageNum) => {
    dispatch(getOrderList(pageNum));
  };
  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message> {error} </Message>
      ) : (
        <div>
          <table className="dishes-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>ADDRESS</th>
                <th>QTY</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.data.map((order) => (
                <tr key={order._id}>
                  <td>
                    {" "}
                    <Link to={`/order/${order._id}`}>{order._id}</Link>{" "}
                  </td>
                  <td>
                    {order.orderItems.map(
                      (item) => item.restaurant === restaurantId && item.name
                    )}
                  </td>
                  <td>
                    {order.orderItems.map(
                      (item) =>
                        item.restaurant === restaurantId && (
                          <td> {item.price} </td>
                        )
                    )}
                  </td>
                  <td>
                    {order.deliveryAddress.city} {order.deliveryAddress.address}
                  </td>
                  <td>
                    {order.orderItems.map(
                      (item) => item.restaurant === restaurantId && item.qty
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            nextPage={nextPage}
            previousPage={previousPage}
            click={pageClick}
            loading={loading}
          />
        </div>
      )}
    </div>
  );
};

export default OrderListPage;
