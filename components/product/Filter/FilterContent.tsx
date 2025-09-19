import AccordionItem from './AccordionItem';

type FilterContentProps = {
    isSelected: (field: string, value: string) => boolean;
    toggleFilter: (field: string, value: string) => void;
};

export default function FilterContent({ isSelected, toggleFilter }: FilterContentProps) {
    return (
        <div className="px-4">
            {/* Category */}
            <h3 className="font-semibold mb-2">Category</h3>
            <div className="space-y-2 mb-6">
                <AccordionItem
                    title="Sofas"
                    field="category"
                    options={[
                        'All Sofas',
                        'Sectional Sofas',
                        'Loveseats',
                        '3 Seater Sofas',
                        'Modular Sofas',
                    ]}
                    isSelected={isSelected}
                    toggleFilter={toggleFilter}
                />
                <AccordionItem
                    title="Tables"
                    field="category"
                    options={['Dining Tables', 'Coffee Tables', 'Side Tables']}
                    isSelected={isSelected}
                    toggleFilter={toggleFilter}
                />
                <AccordionItem
                    title="Chairs"
                    field="category"
                    options={['Armchairs', 'Dining Chairs', 'Office Chairs']}
                    isSelected={isSelected}
                    toggleFilter={toggleFilter}
                />
                <AccordionItem
                    title="Beds"
                    field="category"
                    options={['King Size', 'Queen Size', 'Single']}
                    isSelected={isSelected}
                    toggleFilter={toggleFilter}
                />
            </div>

            {/* Featured */}
            <h3 className="font-semibold mb-2">Featured</h3>
            <div className="space-y-2 mb-6">
                {['Sale', 'NewProduct'].map((item) => (
                    <label key={item} className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={isSelected('flags', item)}
                            onChange={() => toggleFilter('flags', item)}
                            className="accent-black"
                        />
                        {item}
                    </label>
                ))}
            </div>

            {/* Price */}
            <h3 className="font-semibold mb-2">Price</h3>
            <div className="space-y-2">
                {[
                    { label: 'Under 10M', value: '0-10000000' },
                    { label: '10M - 50M', value: '10000000-50000000' },
                    { label: '50M - 100M', value: '50000000-100000000' },
                ].map((range) => (
                    <label key={range.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={isSelected('price', range.value)}
                            onChange={() => toggleFilter('price', range.value)}
                            className="accent-black"
                        />
                        {range.label}
                    </label>
                ))}
            </div>
        </div>
    );
}
