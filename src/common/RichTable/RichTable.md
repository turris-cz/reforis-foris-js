### Description

Rich Table is a table component based on
[Tanstack React Table](https://tanstack.com/table/). It adds some features to
the table component, such as:

-   **Pagination**: The table can be paginated.
-   **Sorting**: The table can be sorted by columns.
-   **Row Expansion**: The table rows can be expanded. (To be implemented)

### Example

```js
import RichTable from "./RichTable";

const columns = [
    {
        header: "Name",
        accessorKey: "name",
    },
    {
        header: "Surname",
        accessorKey: "surname",
    },
    {
        header: "Age",
        accessorKey: "age",
    },
    {
        header: "Phone",
        accessorKey: "phone",
    },
];

const data = [
    {
        name: "John",
        surname: "Coltrane",
        age: 30,
        phone: "123456789",
    },
    {
        name: "Jane",
        surname: "Doe",
        age: 25,
        phone: "987654321",
    },
    {
        name: "Alice",
        surname: "Smith",
        age: 35,
        phone: "123456789",
    },
    {
        name: "Bob",
        surname: "Smith",
        age: 40,
        phone: "987654321",
    },
    {
        name: "Charlie",
        surname: "Brown",
        age: 45,
        phone: "123456789",
    },
    {
        name: "Daisy",
        surname: "Brown",
        age: 50,
        phone: "987654321",
    },
    {
        name: "Eve",
        surname: "Johnson",
        age: 55,
        phone: "123456789",
    },
    {
        name: "Frank",
        surname: "Johnson",
        age: 60,
        phone: "987654321",
    },
    {
        name: "Grace",
        surname: "Williams",
        age: 65,
        phone: "123456789",
    },
    {
        name: "Henry",
        surname: "Williams",
        age: 70,
        phone: "987654321",
    },
    {
        name: "Ivy",
        surname: "Brown",
        age: 75,
        phone: "123456789",
    },
    {
        name: "Jack",
        surname: "Brown",
        age: 80,
        phone: "987654321",
    },
    {
        name: "Kelly",
        surname: "Johnson",
        age: 85,
        phone: "123456789",
    },
    {
        name: "Liam",
        surname: "Johnson",
        age: 90,
        phone: "987654321",
    },
    {
        name: "Mia",
        surname: "Williams",
        age: 95,
        phone: "123456789",
    },
    {
        name: "Nathan",
        surname: "Williams",
        age: 100,
        phone: "987654321",
    },
];

<RichTable columns={columns} data={data} withPagination />;
```
