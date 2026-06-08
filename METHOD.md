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
