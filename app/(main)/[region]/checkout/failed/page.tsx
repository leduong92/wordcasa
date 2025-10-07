import React from 'react';

const Failed = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-red-50">
            <h1 className="text-3xl font-bold text-red-700 mb-4">Payment Cancelled ❌</h1>
            <p className="text-gray-600">You can try again later.</p>
        </div>
    );
};

export default Failed;
