// app/api/chat/route.ts
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// app/data/products.ts
export const products = [
    {
        id: 1,
        name: 'Áo thun trắng',
        description: 'Cotton 100%, thoáng mát',
        price: 250000,
        category: 'Áo',
    },
    {
        id: 2,
        name: 'Áo sơ mi xanh',
        description: 'Vải linen, lịch sự, sang trọng',
        price: 450000,
        category: 'Áo',
    },
    {
        id: 3,
        name: 'Giày sneaker',
        description: 'Phong cách thể thao, size 36-44',
        price: 1200000,
        category: 'Giày',
    },
];

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
    const { message } = await req.json();

    // 🔍 tìm sản phẩm liên quan
    const related = products.filter((p) =>
        (p.name + p.description + p.category).toLowerCase().includes(message.toLowerCase())
    );

    // format sản phẩm để đưa vào context
    const context = related.length
        ? related
              .map((p) => `- ${p.name}: ${p.description}, giá ${p.price.toLocaleString()} VND`)
              .join('\n')
        : 'Không tìm thấy sản phẩm nào phù hợp trong kho.';

    // gọi OpenAI
    const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
            {
                role: 'system',
                content:
                    'Bạn là nhân viên tư vấn bán hàng online, luôn trả lời thân thiện và gợi ý sản phẩm.',
            },
            { role: 'user', content: message },
            { role: 'assistant', content: `Thông tin sản phẩm trong kho:\n${context}` },
        ],
    });

    return NextResponse.json({ reply: completion.choices[0].message });
}
