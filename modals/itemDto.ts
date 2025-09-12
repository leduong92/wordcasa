import type { CollectionDto } from './collectionDto';
import type { RoomDto } from './roomDto';
import type { TypeDto } from './typeDto';

export interface ItemDto {
    id: number;
    parentCode: string;
    slug: string;
    productName: string | null;
    marketingDescription: string | null;
    description: string | null;
    width: number | null;
    depth: number | null;
    height: number | null;
    depthInch: string | null;
    widthInch: string | null;
    heightInch: string | null;
    netWeightKg: number | null;
    grossWeightKg: number | null;
    netWeightLbs: number | null;
    grossWeightLbs: number | null;
    isNew: boolean;
    isActive: boolean;
    materials: string | null;
    collectionId: number | null;
    typeId: number | null;
    roomId: number | null;
    collection: CollectionDto | null;
    type: TypeDto | null;
    room: RoomDto | null;
}
