import { useMemo, useState } from "react";

// finished the video here !!!!
// https://youtu.be/9Qt1IfiZjik?t=37

const useTable = ({columns, data, pagination}) => {    
    const [pageIndex, setPageIndex] = useState(0);

    const headers = useMemo(
        () => columns.map((column) => ({
            label: column.label,
        })),
        [columns]
    );

    // const allRows = useMemo(() => 
    // }), [columns, data]);
    
    // const rawRows = pagination 
    //     ? data.slice(pageIndex * pagination.pageSize,(pageIndex + 1) * pagination.pageSize) 
    //     : data;
        const rawRows = pagination 
        ? data.slice(pageIndex * pagination.pageSize,(pageIndex + 1) * pagination.pageSize) 
        : data;
    
        const rows = useMemo( () => {

            return rawRows.map((dataRow) => {                
                const cells = columns.map(({ accessor }) => {
                    const renderedValue = typeof accessor ==="function" ? accessor(dataRow) : dataRow[accessor];    
                return { renderedValue };
            });
            return { cells };
        });
    }, [columns, data, pageIndex]);
    
    const totalPages =   Math.ceil(data.length / pagination.pageSize)
    
    const nextPage = () => {
        // this will always get the latest value of pageIndex and add 1 to that
        setPageIndex(pageIndex => Math.min(pageIndex +1, totalPages -1));
    }

    const previousPage = () => {        
        setPageIndex(pageIndex => Math.max(pageIndex - 1, 0));
    }

    return {
        headers, 
        pagination: pagination ? {
            nextPage, 
            pageNumber: pageIndex + 1, 
            previousPage, 
            totalPages,
        } : null,
        rows, 
    };

};

export default useTable;



// import { useMemo, useState } from "react";

// // https://youtu.be/9Qt1IfiZjik?t=280

// const useTable = ({columns, data, pagination}) => {
//     const [pageIndex, setPageIndex] = useState(0);

//     const headers = useMemo(
//         () => columns.map((column) => ({
//             label: column.label,
//         })),
//         [columns]
//     );
    
//     const rows = useMemo( () => { 
//         const rawRows = pagination ? 
//         data.slice(pageIndex * pagination.pageSize,(pageIndex + 1) * pagination.pageSize) 
//         : data;
        
//         return rawRows.map(dataRow => {
//             console.log("allRows running");
//             const cells = columns.map(({ accessor }) => {
//                 const renderedValue = typeof accessor === "function" ? accessor(dataRow) : dataRow[accessor];

//                 return {renderedValue};
//             })

//         return cells;
//         })
//     }, [columns, data] );
    
//     const nextPage = () => {
//         setPageIndex(pageIndex +1)
//     }

//     const previousPage = () => {
//         setPageIndex(pageIndex - 1)
//     }

//     return {
//         headers, 
//         pagination: pagination ? {
//             nextPage, 
//             pageNumber: pageIndex + 1, 
//             previousPage, 
//             totalPages: pagination ? Math.ceil(data.length / pagination.pageSize): 1, 
//         } : null,
//         rows, 
//     };

// };

// export default useTable;
