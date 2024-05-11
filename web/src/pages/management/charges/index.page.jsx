import React, { useState } from 'react';
import PageHeader from '@/components/organisms/PageHeader';
import TemplateGSD from '@/components/templates/TemplateGSD';
import { facilitieOptions, ownItems } from '@/hooks/const';
import { Button, Card, TextInput } from 'flowbite-react';
import BreadCrumbs from '@/components/atoms/BreadCrumbs';
import Pagination from '@/components/organisms/Pagination';
import DeleteModal from '@/components/organisms/DeleteModal';

function Charges() {
    const itemsPerPage = 5;

    const [facilitiesCurrentPage, setFacilitiesCurrentPage] = useState(1);
    const [itemsCurrentPage, setItemsCurrentPage] = useState(1);

    const facilitiesStartIndex = (facilitiesCurrentPage - 1) * itemsPerPage;
    const facilitiesEndIndex = facilitiesStartIndex + itemsPerPage;

    const itemsStartIndex = (itemsCurrentPage - 1) * itemsPerPage;
    const itemsEndIndex = itemsStartIndex + itemsPerPage;

    const paginatedFacilitieOptions = facilitieOptions.slice(facilitiesStartIndex, facilitiesEndIndex);
    const paginatedOwnItems = ownItems.slice(itemsStartIndex, itemsEndIndex);

    const totalPagesFacilities = Math.ceil(facilitieOptions.length / itemsPerPage);
    const totalPagesItems = Math.ceil(ownItems.length / itemsPerPage);

    const handleFacilitiesPageChange = (pageNumber) => {
        setFacilitiesCurrentPage(pageNumber);
    };
    const handleItemsPageChange = (pageNumber) => {
        setItemsCurrentPage(pageNumber);
    };

    return (
        <TemplateGSD>
            <PageHeader>
                <BreadCrumbs />
            </PageHeader>
            <div className='mx-auto max-w-screen-lg mt-1'>
                <div className='grid grid-cols-2 gap-7'>
                    <div className='flex flex-col'>
                        <Card>
                            <center><h3 className='text-lg font-semibold mb-1'>Facilities</h3></center>
                            <table>
                                <tr>
                                    <td className='flex'><TextInput placeholder='Facility'/></td>
                                    <td> = </td>
                                    <td className='pb-5'><TextInput placeholder='Rate'/></td>
                                    <td><Button color='success' size='xs' type='button'>Add</Button></td>
                                </tr>
                                {paginatedFacilitieOptions.map(item => (
                                    <tr key={item.value}>
                                        <td className='flex'>{item.label}</td>
                                        <td> = </td>
                                        <td className='pb-2'><TextInput placeholder='Rate' /></td>
                                        <td><DeleteModal/></td>
                                    </tr>
                                ))}
                            </table>
                            <Pagination currentPage={facilitiesCurrentPage} totalPages={totalPagesFacilities} onPageChange={handleFacilitiesPageChange} />
                        </Card>
                    </div>
                    <div className='flex flex-col'>
                        <Card>
                            <center><h3 className='text-lg font-semibold mb-1'>Items</h3></center>
                            <table>
                                <tr>
                                    <td className='flex'><TextInput placeholder='Item'/></td>
                                    <td> = </td>
                                    <td className='pb-5'><TextInput placeholder='Rate'/></td>
                                    <td><Button color='success' size='xs' type='button'>Add</Button></td>
                                </tr>
                                {paginatedOwnItems.map(item => (
                                    <tr key={item.value}>
                                        <td className='flex'>{item.label}</td>
                                        <td> = </td>
                                        <td className='pb-2'><TextInput placeholder='Rate' /></td>
                                        <td><DeleteModal/></td>
                                    </tr>
                                ))}
                            </table>
                            <Pagination currentPage={itemsCurrentPage} totalPages={totalPagesItems} onPageChange={handleItemsPageChange} />
                        </Card>
                    </div>
                </div>
            </div>
        </TemplateGSD>
    )
}
export default Charges;