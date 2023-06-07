import React, { useState, useEffect } from "react";
import { TabMenu } from 'primereact/tabmenu';
import { MenuItem } from 'primereact/menuitem';
import { Paginator, PaginatorPageChangeEvent  } from 'primereact/paginator';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';

interface todoItem {
  id:number;
  todo:string;
}

export default function App() {
    const items: MenuItem[] = [
        {label: 'Home', icon: 'pi pi-fw pi-home', url: '/Home' },
        {label: 'Calendar', icon: 'pi pi-fw pi-calendar', url: '/Calendar'},
        {label: 'Edit', icon: 'pi pi-fw pi-pencil', url: '/Edit'},
        {label: 'Documentation', icon: 'pi pi-fw pi-file', url: '/Documentation'},
        {label: 'Settings', icon: 'pi pi-fw pi-cog', url: '/Settings'}
    ];
    const [first, setFirst] = useState<number>(0);
    const [rows, setRows] = useState<number>(10);

    const onPageChange = (event: PaginatorPageChangeEvent) => {
        setFirst(event.first);
        setRows(event.rows);
    };
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [todo, setTodo] = useState<todoItem[]>([]);

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          setError(null);
          setTodo([]);
          setLoading(true);
          const response = await axios.get(
            'http://localhost:5000/findAll'
          );
          setTodo(response.data);
        } catch (error:any) {
          setError(error);
        }
        setLoading(false);
      };
    
      fetchUsers();
    }, []);

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!todo || todo.length === 0) return null;

    return (
        <div className="card">
            <TabMenu model={items} />
            <DataTable value={todo} tableStyle={{ minWidth: '50rem' }}>
                <Column field="id" header="ID"></Column>
                <Column field="todo" header="TODO"></Column>
            </DataTable>
            <Paginator first={first} rows={rows} totalRecords={120} rowsPerPageOptions={[10, 20, 30]} onPageChange={onPageChange} />
        </div>
        
    )
}
        