import Order from '../models/OrderModel.js';

// Create a new order (with optional file upload)
export const createOrder = async (req, res) => {
  try {
    // If files uploaded, map them to order items
    if (req.files && req.files.length > 0) {
      req.body.items = req.body.items.map((item, index) => ({
        ...item,
        image: req.files[index] ? req.files[index].path : null,
      }));
    }

    const order = new Order(req.body);
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an order by ID
export const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedOrder) return res.status(404).json({ error: 'Order not found' });
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an order by ID
export const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) return res.status(404).json({ error: 'Order not found' });
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get customers summary with name, address, totals
export const getCustomers = async (req, res) => {
  try {
    const customers = await Order.aggregate([
      {
        $group: {
          _id: "$contact.email",
          totalSpent: { $sum: "$total" },
          orderCount: { $sum: 1 },
          lastOrder: { $max: "$createdAt" },
          latestShipping: { $last: "$shippingAddress" },
        },
      },
      {
        $project: {
          email: "$_id",
          totalSpent: 1,
          orderCount: 1,
          lastOrder: 1,
          address: {
            $concat: [
              "$latestShipping.firstName", " ",
              "$latestShipping.lastName", ", ",
              "$latestShipping.address", ", ",
              { $ifNull: ["$latestShipping.apartment", ""] }, ", ",
              "$latestShipping.city", ", ",
              "$latestShipping.state", ", ",
              "$latestShipping.pincode"
            ]
          }
        },
      },
      { $sort: { totalSpent: -1 } }
    ]);

    const formatted = customers.map((c, idx) => ({
      customerId: `CUST${String(idx + 1).padStart(3, "0")}`,
      customerName: c.address.split(",")[0],
      address: c.address,
      totalSpent: c.totalSpent,
      orderCount: c.orderCount,
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
