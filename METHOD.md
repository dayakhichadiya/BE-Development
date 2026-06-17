| Method                | Returns             | Use Case                     |
| --------------------- | ------------------- | ---------------------------- |
| `find()`              | Array               | Multiple documents           |
| `findOne()`           | Single document     | One matching document        |
| `findById()`          | Single document     | Search by `_id`              |
| `create()`            | Created document    | Insert record                |
| `save()`              | Saved document      | Save instance changes        |
| `updateOne()`         | Update result       | Update without returning doc |
| `updateMany()`        | Update result       | Bulk update                  |
| `findOneAndUpdate()`  | Updated document    | Update + return document     |
| `findByIdAndUpdate()` | Updated document    | Update by ID                 |
| `deleteOne()`         | Delete result       | Delete without returning doc |
| `findOneAndDelete()`  | Deleted document    | Delete + return document     |
| `findByIdAndDelete()` | Deleted document    | Delete by ID                 |
| `countDocuments()`    | Number              | Count records                |
| `exists()`            | Boolean-like result | Check existence              |


1. find()

Returns all matching documents as an array.
const products = await Product.find({ category: "Electronics" });

2. findOne()

Returns the first matching document.
const user = await User.findOne({ email: "john@example.com" });

3. findById()

Finds a document by MongoDB's _id.
const user = await User.findById("685f8e4c2b7a4f1d8e123456");
User.findOne({ _id: id });

but optimized and cleaner.

Use when:
Looking up by MongoDB ObjectId.
REST APIs like:
GET /users/:id

4. findOneAndUpdate()

Finds a document and updates it in one operation.
Use when:

Update and return updated document.
Avoid separate find + update calls.

5. findByIdAndUpdate()

Update document using _id.

Use when:
Updating a record by ID.

6. findOneAndDelete()

Find and delete a matching document.
Use when:
Delete using fields other than _id.

7. findByIdAndDelete()

Delete by MongoDB ID.
Use when:

REST delete endpoints.

8. countDocuments()

Counts matching documents.
Use when:

Pagination.
Statistics.

9. exists()

Checks whether a document exists.

const exists = await User.exists({
  email: "john@example.com",
});

Use when:

Validation before insert.
Faster than fetching entire document.

10. create()

Creates and saves a document.

const user = await User.create({
  name: "John",
  email: "john@example.com",
});

Use when:

Inserting new records.

11. save()

Saves a document instance.
Use when:

You need middleware/hooks.
Modifying an existing document instance.


User (Postman / Frontend)
        ↓
Express API (Node.js)
        ↓
Multer (reads file)
        ↓
Cloudinary (stores image)
        ↓
MongoDB (stores image URL)


1. 📩 User sends request (Postman / Frontend)
In Postman you send:
Body → form-data

| KEY    | TYPE | VALUE          |
| ------ | ---- | -------------- |
| images | File | (select image) |
| name   | Text | Nature         |
| price  | Text | 500            |
| stock  | Text | 2              |



🔁 FULL FLOW SUMMARY (VERY IMPORTANT)

1. User sends form-data request (image + text)

2. Express receives request

3. Multer:
   - extracts file
   - puts it in req.file.buffer

4. Cloudinary:
   - receives buffer
   - stores image in cloud
   - returns image URL

5. MongoDB:
   - stores product data
   - stores only image URL

6. Frontend:
   - uses URL to display image

🧑 User → gives you a photo
📦 Multer → holds photo temporarily in your hand
☁️ Cloudinary → your warehouse where you store photos
🗄️ MongoDB → notebook where you write “photo is stored here”

👉 Multer = receives file
👉 Cloudinary = stores file
👉 MongoDB = stores link


3. 🧵 What Multer does

Multer is a file extractor middleware.

It:
Looks at request
Finds file field "images"
Extracts file
Stores it in memory (because you used memoryStorage)

req.body = {
  name: "Nature",
  price: "500",
  stock: "2"
}

req.file = {
  fieldname: "images",
  originalname: "adminSite.jpg",
  mimetype: "image/jpeg",
  buffer: <Binary Data>
}

200 OK
201 Created
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
500 Internal Server Error

Aggregation is used when you  want:                                                                                            
Reports
Analytics
Dashboards
Statistics
Revenue
Charts

ex: 
Total Revenue
Total Orders
Monthly Sales
Top Selling Products
Most Active Users

1. $match
2. $group
3. $project
4. $sort
5. $lookup
6. Dashboard APIs