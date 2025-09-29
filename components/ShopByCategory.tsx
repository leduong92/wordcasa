import { ItemCategoryDto } from '@/modals/itemDto';
import CategoryTabs from './layout/CategoryTabs';
import { serverApi } from '@/lib/serverApi';

async function getCategories(region: string, roomId: number) {
    try {
        const response = await serverApi.get<ItemCategoryDto[]>(
            `/api/item/categories/${region}/${roomId}`
        );
        return response.data ?? [];
    } catch (error) {
        console.log(error);
        return [];
    }
}

export default async function ShopByCategory({ region }: { region: string }) {
    const initialRoomId = 1;
    const initialData = await getCategories(region, initialRoomId);

    return (
        <section aria-label="Shop by Category" className="py-4">
            <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-semibold text-neutral-700 mb-8">
                    Shop by Rooms
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
