import React, { useState } from 'react';

const GenericTable = ({
    items,
    columns,
    handleAddClick,
    handleEditClick,
    handleDisableClick,
    handleEnableClick,
    handleAddToCartClick,
    handleViewProductsClick,
    handleDeleteClick,
    handleChangeStatusClick,
}) => {
    const [sortedColumn, setSortedColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    const [searchTerm, setSearchTerm] = useState('');

    // Función para ordenar los elementos
    const sortItems = (items, column) => {
        const sortedItems = [...items];
        const direction = sortDirection === 'asc' ? 1 : -1;
        sortedItems.sort((a, b) => {
            if (a[column] < b[column]) return -1 * direction;
            if (a[column] > b[column]) return 1 * direction;
            return 0;
        });
        return sortedItems;
    };

    // Función para manejar el clic en los encabezados de las columnas para ordenar
    const handleSort = (column) => {
        if (sortedColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortedColumn(column);
            setSortDirection('asc');
        }
    };

    // Filtrar los elementos basados en la búsqueda
    const filteredItems = items.filter(item =>
        columns.some(column => 
            item[column.field]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const sortedItems = sortedColumn ? sortItems(filteredItems, sortedColumn) : filteredItems;

    // Determina si se deben mostrar las acciones
    const showActions = handleEditClick || handleDisableClick || handleEnableClick || handleAddToCartClick || handleViewProductsClick || handleDeleteClick || handleChangeStatusClick;

    return (
        <>
            {/* Solo mostrar el botón de agregar si la función está definida */}
            {handleAddClick && (
                <button onClick={handleAddClick} className="mb-4 p-2 bg-blue-500 text-white rounded">Agregar</button>
            )}

            {/* Filtro de búsqueda */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Buscar..."
                    className="p-2 rounded"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-800 text-white">
                    <thead>
                        <tr>
                            {columns.map((column, index) => (
                                <th
                                    key={index}
                                    className="py-2 px-4 border-b border-gray-600 text-center cursor-pointer"
                                    onClick={() => handleSort(column.field)}
                                >
                                    {column.label}
                                    {sortedColumn === column.field && (
                                        <span>{sortDirection === 'asc' ? ' ↑' : ' ↓'}</span>
                                    )}
                                </th>
                            ))}
                            {/* Solo mostrar la columna de Acciones si hay funciones de acción definidas */}
                            {showActions && (
                                <th className="py-2 px-4 border-b border-gray-600 text-center">Acciones</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedItems.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length + (showActions ? 1 : 0)} className="py-4 text-center text-gray-400">No hay datos disponibles</td>
                            </tr>
                        ) : (
                            sortedItems.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-700">
                                    {columns.map((column, colIndex) => (
                                        <td key={colIndex} className="border-b border-gray-600 px-4 py-2 text-center">
                                            {column.field === 'is_active' ? (item[column.field] ? 'Activo' : 'Inactivo') : item[column.field]}
                                        </td>
                                    ))}
                                    {/* Solo mostrar la celda de acciones si hay funciones definidas */}
                                    {showActions && (
                                        <td className="border-b border-gray-600 px-4 py-2 text-center">
                                            <div className="flex justify-center space-x-4">
                                                {/* Botones de acción */}
                                                {handleEditClick && (
                                                    <button onClick={() => handleEditClick(item)} className="text-blue-400 hover:text-blue-600">
                                                        <svg className="w-6 h-6 inline" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                                                        </svg>
                                                    </button>
                                                )}
                                                {/* Solo mostrar el botón de deshabilitar si la función está definida */}
                                                {handleDisableClick && (
                                                    <button onClick={() => handleDisableClick(item.id)} className="text-red-400 hover:text-red-600">
                                                        <svg className="w-6 h-6 inline" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                            <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm5.757-1a1 1 0 1 0 0 2h8.486a1 1 0 1 0 0-2H7.757Z" clipRule="evenodd" />
                                                        </svg>
                                                    </button>
                                                )}

                                                {/* Solo mostrar el botón de habilitar si la función está definida */}
                                                {handleEnableClick && (
                                                    <button onClick={() => handleEnableClick(item.id)} className="text-green-400 hover:text-green-600">
                                                        <svg className="w-6 h-6 inline" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                            <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clipRule="evenodd" />
                                                        </svg>
                                                    </button>
                                                )}

                                                {/* Solo mostrar el botón de agregar al carrito si la función está definida */}
                                                {handleAddToCartClick && (
                                                    <button onClick={() => handleAddToCartClick(item)} className="text-green-400 hover:text-green-600">
                                                        <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6" />
                                                        </svg>
                                                    </button>
                                                )}

                                                {/* Botón para ver los productos */}
                                                {handleViewProductsClick && (
                                                    <button
                                                        onClick={() => handleViewProductsClick(item.id)}
                                                        className="text-yellow-300 hover:text-yellow-600"
                                                    >
                                                        <svg className="w-6 h-6 inline" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                            <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                                                            <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                        </svg>
                                                    </button>
                                                )}

                                                {/* Botón de cambiar estado */}
                                                {handleChangeStatusClick && (
                                                    <button onClick={() => handleChangeStatusClick(item.id)} className="text-green-400 hover:text-green-600">
                                                        <svg className="w-6 h-6 inline" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                            <path fillRule="evenodd" d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z" clipRule="evenodd"/>
                                                        </svg>
                                                    </button>
                                                )}

                                                {/* Botón de eliminar */}
                                                {handleDeleteClick && (
                                                    <button onClick={() => handleDeleteClick(item.id)} className="text-red-400 hover:text-red-600">
                                                        <svg className="w-6 h-6 inline" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                            <path fillRule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clipRule="evenodd"/>
                                                        </svg>
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default GenericTable;
