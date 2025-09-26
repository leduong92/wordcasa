import { apiClient } from '@/lib/apiClient';
import { ItemCategoryDto } from '@/modals/itemDto';
import CategoryTabs from './layout/CategoryTabs';

async function getCategories(roomId: number) {
    try {
        const response = await apiClient.get<ItemCategoryDto[]>(
            `/api/item/categories/us/${roomId}`,
            { cache: 'no-store' }
        );
        return response.data ?? [];
    } catch (error) {
        console.log(error);
        return [];
    }
}

export default async function ShopByCategory({ region }: { region: string }) {
    const initialRoomId = 1;
    const initialData = await getCategories(initialRoomId);

    return (
        <section aria-label="Shop by Category" className="py-4">
            <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-semibold text-neutral-700 mb-8">
                    Shop by Categories
                </h2>

                <CategoryTabs
                    initialRoomId={initialRoomId}
                    initialData={initialData}
                    region={region}
                />
            </div>
        </section>
    );
}
