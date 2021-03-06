import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderList } from "../../Actions/OrderActions/GetOrderListActions";
import Loader from "../../Components/Loading/Loader";
import Message from "../../Components/Message/Message";
import Pagination from "../../Components/Pagination/Pagination";
import { Link } from "react-router-dom";
const AdminOrderList = ({ match }) => {
  const restaurantId = match.params.id;
  const dispatch = useDispatch();
  const [nextPage, setNextPage] = useState(Number);
  const [previousPage, setPreviousPage] = useState(Number);
  const orderList = useSelector((state) => state.orderList);
  const { orders, loading, error } = orderList;
  useEffect(() => {
    dispatch(getOrderList());
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
                    {order.isPaid
                      ? "Paid"
                      : order.isPaid && order.isDelivered
                      ? "completed"
                      : "Not Paid"}
                  </td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.deliveryAddress.city} {order.deliveryAddress.address}
                  </td>
                </tr>
              ))}
            </tbody>
              </table>
              <div className='orderlist-pagination-container'>
              <Pagination
            previousPage={previousPage}
            nextPage={nextPage}
            loading={loading}
            pageClick={pageClick}
          />
              </div>
        
        </div>
      )}
    </div>
  );
};

export default AdminOrderList;
