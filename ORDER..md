| Method                        | Why Used                             | Returns             |
| ----------------------------- | ------------------------------------ | ------------------- |
| `Cart.find()`                 | Get all cart items                   | Array               |
| `populate()`                  | Replace product id with product data | Populated documents |
| `Order.create()`              | Create new order                     | Created document    |
| `Product.findByIdAndUpdate()` | Update stock using product ID        | Updated document    |
| `$inc`                        | Increment/decrement stock atomically | Modified value      |
| `Cart.deleteMany()`           | Clear all cart items                 | Delete result       |


* Aggregate Method  -- all methods listed at METHOD.md

-> In MongoDB, aggregation is a way to process and transform data through a sequence of stages, similar to SQL's GROUP BY, filtering, joins, calculations, and reporting queries.

1. $match   -- Like SQL WHERE.

<!-- order.aggregate: ([
    {
        $match:{
            status:" delivered
        }
    }
]) -->

Result = it gives all matches data which have status delivered.

2. $group     -- SQL GROUP BY.

<!-- order.aggregate: ([
    {
        $group:{
            _id: null  ,
            totalRevenue:{
                $sum: "$totalAmount"    //field that have total amount in order tabel
            }
        }
    }
]) -->




Common Group Operators
Sum
$sum
Revenue

Average
$avg
Average order value

Count
$sum: 1
Count documents


| SQL      | MongoDB Aggregation |
| -------- | ------------------- |
| SELECT   | `$project`          |
| WHERE    | `$match`            |
| GROUP BY | `$group`            |
| ORDER BY | `$sort`             |
| LIMIT    | `$limit`            |
| JOIN     | `$lookup`           |
| COUNT    | `$count`            |
