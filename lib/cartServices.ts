export const getCart = (): any[] => {
    if (typeof window === 'undefined') return [];
    try {
        const data = localStorage.getItem('cart');
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
};

export const saveCart = (cart: any[]) => {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
    } catch { }
};

// export const getCart = async (): Promise<any[]> => {
//   const res = await fetch('/api/cart'); // Hoặc từ server
//   return res.json();
// };

// export const saveCart = async (cart: any[]) => {
//   await fetch('/api/cart', {
//     method: 'POST',
//     body: JSON.stringify(cart),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
// };