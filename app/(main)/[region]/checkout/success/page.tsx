import React from 'react';

const SuccessPage = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-green-50">
            <h1 className="text-3xl font-bold text-green-700 mb-4">Payment Successful 🎉</h1>
            <p className="text-gray-600">Thank you for your purchase!</p>
        </div>
    );
};

export default SuccessPage;
