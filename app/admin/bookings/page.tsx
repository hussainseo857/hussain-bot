'use client';
import CrudPage from '@/components/admin/CrudPage';

const STATUS = ['Inquiry received', 'Pending confirmation', 'Confirmed', 'Payment pending', 'Fully paid', 'Cancelled', 'Completed'];
const PAYMENT = ['Payment pending', 'Partially paid', 'Fully paid', 'Refunded'];

export default function BookingsPage() {
  return (
    <CrudPage
      table="sample_bookings"
      title="Sample Bookings"
      description="Demo bookings used by the chatbot for status lookups. Private — admin only."
      searchFields={['booking_id', 'customer_name', 'destination', 'package_name']}
      fields={[
        { key: 'booking_id', label: 'Booking ID', type: 'text', required: true, placeholder: 'TT1001', showInList: true },
        { key: 'customer_name', label: 'Customer name', type: 'text', showInList: true },
        { key: 'package_name', label: 'Package', type: 'text', showInList: true },
        { key: 'destination', label: 'Destination', type: 'text', showInList: true },
        { key: 'travel_date', label: 'Travel date', type: 'text', placeholder: '2026-06-12' },
        { key: 'status', label: 'Status', type: 'select', options: STATUS },
        { key: 'payment_status', label: 'Payment status', type: 'select', options: PAYMENT },
        { key: 'notes', label: 'Notes', type: 'textarea', rows: 3 },
      ]}
      defaultActiveField={null}
    />
  );
}
