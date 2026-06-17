| Method                        | Why Used                             | Returns             |
| ----------------------------- | ------------------------------------ | ------------------- |
| `Cart.find()`                 | Get all cart items                   | Array               |
| `populate()`                  | Replace product id with product data | Populated documents |
| `Order.create()`              | Create new order                     | Created document    |
| `Product.findByIdAndUpdate()` | Update stock using product ID        | Updated document    |
| `$inc`                        | Increment/decrement stock atomically | Modified value      |
| `Cart.deleteMany()`           | Clear all cart items                 | Delete result       |
