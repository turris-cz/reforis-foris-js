### Description

Rich Table is a table component based on
[Tanstack React Table](https://tanstack.com/table/). It adds some features to
the table component, such as:

- **Pagination**: The table can be paginated.
- **Sorting**: The table can be sorted by columns.
- **Row Expansion**: The table rows can be expanded. (To be implemented)

### Example

```jsx
import { columns, data } from "./mockData";

<RichTable columns={columns} data={data} withPagination />;
```
