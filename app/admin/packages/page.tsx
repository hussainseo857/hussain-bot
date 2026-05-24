'use client';
import CrudPage from '@/components/admin/CrudPage';

export default function PackagesPage() {
  return (
    <CrudPage
      table="travel_packages"
      title="Travel Packages"
      description="Packaged trips with pricing, inclusions, and policies."
      searchFields={['package_name', 'destination', 'included_services']}
      fields={[
        { key: 'package_name', label: 'Package name', type: 'text', required: true, showInList: true },
        { key: 'destination', label: 'Destination', type: 'text', showInList: true },
        { key: 'duration', label: 'Duration', type: 'text', showInList: true },
        { key: 'price_range', label: 'Price range', type: 'text', showInList: true },
        { key: 'included_services', label: 'Included services', type: 'textarea', rows: 3 },
        { key: 'excluded_services', label: 'Excluded services', type: 'textarea', rows: 3 },
        { key: 'cancellation_policy', label: 'Cancellation policy', type: 'textarea', rows: 3 },
        { key: 'payment_policy', label: 'Payment policy', type: 'textarea', rows: 3 },
        { key: 'is_active', label: 'Active', type: 'checkbox' },
      ]}
    />
  );
}
