import React, { useEffect, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { mySales } from '@/Redux/Slices/Instructor/InstructorSlice';
import { AllSales } from '@/Redux/Slices/Management/ManagementSlice';
import { Link } from 'react-router-dom';

const MyLineChart = ({ sales }) => {
    const data = React.useMemo(() => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthlySales = Array(12).fill(0);

        sales?.forEach(sale => {
            if (sale.paid) {
                const saleDate = new Date(sale.updatedAt);
                const month = saleDate.getMonth();
                const total = sale?.instructors?.reduce((total, curr) => total + curr?.price || 0  ,0)
                monthlySales[month] += total;
            }
        });

        return months.map((month, index) => ({
            name: month,
            sales: monthlySales[index]
        }));
    }, [sales]);

    return (
        <div style={{ padding: "20px", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}>
            <h3 style={{ marginBottom: "20px", fontSize: "16px", fontWeight: "600", color: "#333" }}>
                Sales Overview
            </h3>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#888" }} />
                    <YAxis tick={{ fontSize: 12, fill: "#888" }} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#f5f5f5",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                        }}
                        labelStyle={{ color: "#333" }}
                    />
                    <Line type="monotone" dataKey="sales" stroke="#0073e6" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

// const Select = ({ courses, setCourseId }) => {

//     const [dropdown, setDropDown] = useState(false);

//     const [sortBy, setSortBy] = useState("All");

//     const handleSort = (e, course_id) => {

//         setSortBy(e.target.textContent);
//         setDropDown(false);
//         setCourseId(course_id);
//     }

//     return (
//         <div className='relative group'>

//             <button onClick={() => setDropDown(!dropdown)} className='px-4 py-3 font-bold flex items-center gap-2 ' htmlFor='dropdown-toggle'>
//                 {sortBy} <IoIosArrowDown />
//             </button>

//             <div className={`shadow-lg opacity-0 pointer-events-none border-2  absolute top-14  bg-white w-[30vw]  ${dropdown && "pointer-events-auto opacity-100"} bg-white z-20 h-[60vh] overflow-y-scroll`}>
//                 <ul className='p-4  text-sm cursor-pointer space-y-2'>

//                     <li onClick={(e) => handleSort(e, null)} className='pb-2 hover:text-blue-600 '>All</li>

//                     {
//                         courses?.map((val, indx) => val.approved && <li key={indx} onClick={(e) => handleSort(e, val._id)} className='pb-2 hover:text-blue-600 '>{val?.title}</li>)
//                     }


//                 </ul>
//             </div>
//         </div>
//     )
// }

function Sales() {

    const dispatch = useDispatch();

    const sales = useSelector((state) => state?.management?.allSales);

    // const filteredSales = React.useMemo(() => {
    //     return courseId ? sales?.filter(sale => sale.course_id === courseId) : sales;
    // }, [sales, courseId]);

    const totalRevenue = React.useMemo(() => {
        return sales?.reduce((total, curr) => {
            return curr.paid ? total + curr.instructors.reduce((sum, instructor) => sum + instructor.price, 0) : total;
        }, 0);
    }, [sales]);

    

    const monthlyRevenue = React.useMemo(() => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        return sales?.reduce((total, curr) => {
            const saleDate = new Date(curr.updatedAt);
            return (curr.paid && saleDate.getMonth() === currentMonth && saleDate.getFullYear() === currentYear) ? total + curr.instructors.reduce((sum, instructor) => sum + instructor.price, 0) : total;
        }, 0);
    }, [sales]);

    const totalEnrollments = React.useMemo(() => {
        return sales?.reduce((total, curr) => {
            return curr.paid ? total + curr.instructors.reduce((sum, instructor) => sum + instructor.courses.length, 0) || 0 : total;
        }, 0);
    }, [sales]);

    const monthlytotalEnrollments = React.useMemo(() => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        return sales?.reduce((total, curr) => {
            const saleDate = new Date(curr.updatedAt);
            return (curr.paid && saleDate.getMonth() === currentMonth && saleDate.getFullYear() === currentYear) ? total + curr.instructors.reduce((sum, instructor) => sum + instructor.courses.length, 0) || 0 : total;
        }, 0);
    }, [sales]);




    useEffect(() => {
        dispatch(AllSales());
    }, [])

    return (


        <div className='py-28 px-20 merriweather-regular text-[#2D2F31] space-y-3'>

            <div className='flex gap-5'>
                <h1 className='text-4xl font-bold'>Overview </h1> 

                <Link to={"/management/mode"} className='link-primary font-bold ml-auto font-sans'> Review Mode </Link>

            </div>

            <h3>Get top insights about your performance</h3>

            <div className='border p-5 flex gap-10 '>

                <h1 className='text-sm '>
                    <div>Total revenue</div>
                    <div className='text-3xl font-sans'>₹{totalRevenue}</div>
                    <div className='mt-1'> ₹{monthlyRevenue} this month</div>
                </h1>

                <h1 className='text-sm'>
                    <div>Total enrollments</div>
                    <div className='text-3xl font-sans'>{totalEnrollments}</div>
                    <div className='mt-1'>{monthlytotalEnrollments} this month</div>
                </h1>

            </div>

            <div>
                <MyLineChart sales={sales} />
            </div>

        </div>

    )
}

export default Sales
